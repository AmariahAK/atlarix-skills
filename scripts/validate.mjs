#!/usr/bin/env node
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const INDEX = join(ROOT, "index.json");
const REQUIRED_FM = ["name:", "version:", "author:", "tags:", "compatibleModes:"];

const index = JSON.parse(await readFile(INDEX, "utf8"));
const errors = [];

for (const skill of index.skills || []) {
  const dir = join(ROOT, "skills", skill.id);
  for (const f of skill.files || []) {
    const path = join(dir, f.name);
    if (!existsSync(path)) errors.push(`Missing file: skills/${skill.id}/${f.name}`);
    const url = f.url || "";
    if (!url.includes("raw.githubusercontent.com")) {
      errors.push(`${skill.id}: files[].url must be raw GitHub URL`);
    }
    if (!url.includes(`/skills/${skill.id}/`)) {
      errors.push(`${skill.id}: files[].url path must match skill id`);
    }
  }
  if (existsSync(join(dir, "SKILL.md"))) {
    const content = await readFile(join(dir, "SKILL.md"), "utf8");
    for (const field of REQUIRED_FM) {
      if (!content.includes(field)) errors.push(`skills/${skill.id}/SKILL.md: missing ${field}`);
    }
  }
}

if (errors.length) {
  console.error("Validation failed:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`✓ ${index.skills.length} skills validated`);
