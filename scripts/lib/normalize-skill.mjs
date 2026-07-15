const DEFAULT_MODES = ["Build", "Review", "Explore"];

export function slugifyId(input, maxLen = 64) {
  let s = String(input)
    .toLowerCase()
    .replace(/\.(mdc|md|txt)$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (s.length > maxLen) s = s.slice(0, maxLen).replace(/-+$/g, "");
  return s || "skill";
}

export function parseSimpleFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw.trim() };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    let val = kv[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    meta[kv[1]] = val;
  }
  return { meta, body: m[2].trim() };
}

export function stripBodyForLengthCheck(body) {
  return body.replace(/\s+/g, " ").trim();
}

export function deriveDescription(body, meta, fallbackName) {
  if (meta.description?.trim()) return meta.description.trim().slice(0, 500);
  const first = body
    .split("\n")
    .map((l) => l.replace(/^#+\s*/, "").trim())
    .find((l) => l.length > 20);
  if (first) return first.slice(0, 500);
  return `${fallbackName} — community skill synced for Atlarix.`;
}

export function deriveTags(meta, stackTag, extra = []) {
  const tags = new Set(extra.filter(Boolean));
  if (stackTag) tags.add(stackTag);
  if (meta.tags) {
    const raw = meta.tags;
    if (Array.isArray(raw)) raw.forEach((t) => tags.add(String(t).toLowerCase()));
    else if (typeof raw === "string") {
      raw.split(/[,\s\[\]]+/).forEach((t) => {
        const x = t.trim().toLowerCase();
        if (x) tags.add(x);
      });
    }
  }
  if (meta.globs) tags.add("cursorrules");
  tags.add("community");
  return [...tags].slice(0, 12);
}

export function buildSkillMarkdown({
  name,
  description,
  author,
  tags,
  body,
  source,
}) {
  const tagYaml = tags.map((t) => (t.includes(" ") ? `"${t}"` : t)).join(", ");
  const header = `---
name: ${name}
version: 1.0.0
author: ${author}
tags: [${tagYaml}]
compatibleModes: [${DEFAULT_MODES.join(", ")}]
atlarixMinVersion: "7.0.0"
---

# ${name}

## When to use this skill
${description}

## Source
Synced from ${source}.

`;

  const whenIdx = body.search(/##\s+when to use/i);
  const core = whenIdx >= 0 ? body : body;
  return `${header}${core}`.trimEnd() + "\n";
}

export function makeManifestEntry({
  id,
  name,
  description,
  author,
  tags,
  registryOwner,
  registryRepo,
  registryBranch,
  source,
  verified = false,
  needsReview = true,
}) {
  const url = `https://raw.githubusercontent.com/${registryOwner}/${registryRepo}/${registryBranch}/skills/${id}/SKILL.md`;
  return {
    id,
    name,
    description,
    version: "1.0.0",
    author,
    tags,
    compatibleModes: [...DEFAULT_MODES],
    source,
    verified,
    needsReview,
    files: [{ name: "SKILL.md", url }],
  };
}
