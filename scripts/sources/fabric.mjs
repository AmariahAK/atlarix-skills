import { fetchText, listRepoDirs, rawGithubUrl } from "../lib/github.mjs";
import {
  buildSkillMarkdown,
  deriveDescription,
  deriveTags,
  makeManifestEntry,
  parseSimpleFrontmatter,
  slugifyId,
  stripBodyForLengthCheck,
} from "../lib/normalize-skill.mjs";

export async function collectFabric(config, ctx) {
  const src = config.sources.fabric;
  if (!src?.enabled) return [];

  const { owner, repo, patternsPath, idPrefix = "fabric", nameInclude = [] } = src;
  const dirs = await listRepoDirs(owner, repo, patternsPath);
  const out = [];

  for (const dir of dirs) {
    if (ctx.stats.fabricConsidered >= (config.maxPerSource ?? 9999)) break;
    const lower = dir.toLowerCase();
    if (nameInclude.length && !nameInclude.some((k) => lower.includes(k.toLowerCase()))) {
      ctx.stats.fabricFiltered++;
      continue;
    }

    ctx.stats.fabricConsidered++;
    const filePath = `${patternsPath}/${dir}/system.md`;
    const url = rawGithubUrl(owner, repo, "main", filePath);
    let raw;
    try {
      raw = await fetchText(url);
    } catch {
      ctx.stats.fabricFetchFail++;
      continue;
    }

    const { meta, body } = parseSimpleFrontmatter(raw);
    const plain = stripBodyForLengthCheck(body);
    if (plain.length < config.minBodyLength) {
      ctx.stats.fabricTooShort++;
      continue;
    }

    const id = slugifyId(`${idPrefix}-${dir}`);
    const name = dir.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const description = deriveDescription(body, meta, name);
    const tags = deriveTags(meta, "pattern", ["fabric"]);
    const skillMd = buildSkillMarkdown({
      name,
      description,
      author: "Fabric (community)",
      tags,
      body,
      source: `https://github.com/${owner}/${repo}/tree/main/${filePath}`,
    });

    const entry = makeManifestEntry({
      id,
      name,
      description,
      author: "Fabric (community)",
      tags,
      registryOwner: config.registryOwner,
      registryRepo: config.registryRepo,
      registryBranch: config.registryBranch,
      source: `https://github.com/${owner}/${repo}/tree/main/${filePath}`,
      verified: false,
      needsReview: true,
    });

    out.push({ entry, skillMd, _synced: true });
    ctx.stats.fabricAccepted++;
  }

  return out;
}
