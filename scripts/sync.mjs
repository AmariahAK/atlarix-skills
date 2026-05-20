#!/usr/bin/env node
/**
 * Sync Atlarix skills registry from upstream cursor-rule repos.
 * Writes skills/<id>/SKILL.md + index.json (URL-compatible with Atlarix app install flow).
 */

import { readFile, writeFile, mkdir, readdir } from "fs/promises";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { collectAwesomeCursorrules } from "./sources/awesome-cursorrules.mjs";
import { collectFabric } from "./sources/fabric.mjs";
import {
  deriveDescription,
  makeManifestEntry,
  parseSimpleFrontmatter,
} from "./lib/normalize-skill.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_FILE = join(ROOT, "sync.config.json");
const OVERRIDES_FILE = join(ROOT, "skills.overrides.json");
const OUT_INDEX = join(ROOT, "index.json");
const SKILLS_DIR = join(ROOT, "skills");

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry-run");

const stats = {
  curated: 0,
  awesomeConsidered: 0,
  awesomeAccepted: 0,
  awesomeTooShort: 0,
  awesomeFetchFail: 0,
  fabricConsidered: 0,
  fabricAccepted: 0,
  fabricFiltered: 0,
  fabricTooShort: 0,
  fabricFetchFail: 0,
  skippedProtected: 0,
  skippedDupId: 0,
  overrideKeys: 0,
  written: 0,
};

function deepMerge(base, patch) {
  if (patch === undefined || patch === null) return base;
  if (Array.isArray(patch)) return patch.slice();
  if (typeof patch !== "object" || patch === null) return patch;
  const out = { ...(base && typeof base === "object" ? base : {}) };
  for (const k of Object.keys(patch)) {
    const pv = patch[k];
    const bv = out[k];
    if (
      pv !== null &&
      typeof pv === "object" &&
      !Array.isArray(pv) &&
      bv !== null &&
      typeof bv === "object" &&
      !Array.isArray(bv)
    ) {
      out[k] = deepMerge(bv, pv);
    } else {
      out[k] = pv;
    }
  }
  return out;
}

async function loadJson(path, fallback) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return fallback;
  }
}

/** Curated skills only — dirs with SKILL.md but no .sync-source.json (hand-maintained). */
async function loadProtectedIds() {
  const ids = new Set();
  if (!existsSync(SKILLS_DIR)) return ids;
  for (const name of await readdir(SKILLS_DIR, { withFileTypes: true })) {
    if (!name.isDirectory()) continue;
    const skillPath = join(SKILLS_DIR, name.name, "SKILL.md");
    const syncMeta = join(SKILLS_DIR, name.name, ".sync-source.json");
    if (existsSync(skillPath) && !existsSync(syncMeta)) ids.add(name.name);
  }
  return ids;
}

async function loadCuratedEntries(config, protectedIds) {
  const index = await loadJson(OUT_INDEX, { skills: [] });
  const indexById = new Map((index.skills || []).map((s) => [s.id, s]));
  const entries = [];

  for (const id of [...protectedIds].sort()) {
    const skillPath = join(SKILLS_DIR, id, "SKILL.md");
    const raw = await readFile(skillPath, "utf8");
    const existing = indexById.get(id);
    const { meta, body } = parseSimpleFrontmatter(raw);

    const entry = existing
      ? {
          ...existing,
          verified: true,
          needsReview: false,
          files: existing.files?.length
            ? existing.files
            : [
                {
                  name: "SKILL.md",
                  url: `https://raw.githubusercontent.com/${config.registryOwner}/${config.registryRepo}/${config.registryBranch}/skills/${id}/SKILL.md`,
                },
              ],
        }
      : makeManifestEntry({
          id,
          name: meta.name || id,
          description: meta.description || deriveDescription(body, meta, id),
          author: meta.author || "NorahLabs",
          tags: [id],
          registryOwner: config.registryOwner,
          registryRepo: config.registryRepo,
          registryBranch: config.registryBranch,
          source: `https://github.com/${config.registryOwner}/${config.registryRepo}/tree/${config.registryBranch}/skills/${id}`,
          verified: true,
          needsReview: false,
        });

    entries.push({ entry, skillMd: raw, _curated: true });
    stats.curated++;
  }
  return entries;
}

async function loadOverrides() {
  const doc = await loadJson(OVERRIDES_FILE, { skills: {} });
  return doc.skills || {};
}

function applyOverrides(map, overrides) {
  const keys = Object.keys(overrides);
  stats.overrideKeys = keys.length;
  for (const id of keys) {
    const patch = overrides[id];
    if (patch?.exclude) {
      map.delete(id);
      continue;
    }
    const cur = map.get(id) || { entry: { id }, skillMd: "" };
    cur.entry = deepMerge(cur.entry, patch);
    if (!cur.entry.id) cur.entry.id = id;
    if (patch.content) cur.skillMd = patch.content;
    map.set(id, cur);
  }
}

function mergeUpstream(map, rows, protectedIds) {
  for (const row of rows) {
    const id = row.entry.id;
    if (protectedIds.has(id)) {
      stats.skippedProtected++;
      continue;
    }
    if (map.has(id)) {
      stats.skippedDupId++;
      continue;
    }
    map.set(id, row);
  }
}

async function writeSkillArtifacts(row) {
  const id = row.entry.id;
  const dir = join(SKILLS_DIR, id);
  if (row._curated) return;
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "SKILL.md"), row.skillMd.endsWith("\n") ? row.skillMd : `${row.skillMd}\n`, "utf8");
  await writeFile(
    join(dir, ".sync-source.json"),
    `${JSON.stringify({ source: row.entry.source, syncedAt: new Date().toISOString() }, null, 2)}\n`,
    "utf8",
  );
  stats.written++;
}

async function main() {
  const config = await loadJson(CONFIG_FILE, {});
  const protectedIds = await loadProtectedIds();
  const overrides = await loadOverrides();

  console.log("atlarix-skills sync: loading curated skills…");
  const curated = await loadCuratedEntries(config, protectedIds);

  const ctx = { stats };
  console.log("Fetching upstream sources…");
  const upstream = [
    ...(await collectAwesomeCursorrules(config, ctx)),
    ...(await collectFabric(config, ctx)),
  ];

  const map = new Map();
  for (const row of curated) map.set(row.entry.id, row);
  mergeUpstream(map, upstream, protectedIds);
  applyOverrides(map, overrides);

  const skills = [...map.values()]
    .map((r) => r.entry)
    .filter((e) => e.id && e.files?.length)
    .sort((a, b) => a.id.localeCompare(b.id));

  const index = {
    version: "1.0.0",
    updatedAt: new Date().toISOString().slice(0, 10),
    skills,
  };

  console.log("\n--- sync summary ---");
  console.log(`curated (protected dirs): ${stats.curated}`);
  console.log(`awesome considered: ${stats.awesomeConsidered}, accepted: ${stats.awesomeAccepted}`);
  console.log(`awesome too short / fetch fail: ${stats.awesomeTooShort} / ${stats.awesomeFetchFail}`);
  console.log(`fabric considered: ${stats.fabricConsidered}, accepted: ${stats.fabricAccepted}`);
  console.log(`fabric filtered / too short / fetch fail: ${stats.fabricFiltered} / ${stats.fabricTooShort} / ${stats.fabricFetchFail}`);
  console.log(`skipped (protected id): ${stats.skippedProtected}`);
  console.log(`skipped (duplicate id): ${stats.skippedDupId}`);
  console.log(`override keys: ${stats.overrideKeys}`);
  console.log(`final skills in index: ${skills.length}`);
  console.log("--------------------\n");

  if (DRY_RUN) {
    console.log("[dry-run] not writing files");
    return;
  }

  for (const row of map.values()) {
    await writeSkillArtifacts(row);
  }

  await writeFile(OUT_INDEX, `${JSON.stringify(index, null, 2)}\n`, "utf8");
  console.log(`Wrote ${OUT_INDEX} (${skills.length} skills)`);
  console.log(`Wrote ${stats.written} synced skill directories`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
