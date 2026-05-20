import { fetchText, listRepoFiles, rawGithubUrl } from "../lib/github.mjs";
import {
  buildSkillMarkdown,
  deriveDescription,
  deriveTags,
  makeManifestEntry,
  parseSimpleFrontmatter,
  slugifyId,
  stripBodyForLengthCheck,
} from "../lib/normalize-skill.mjs";

export async function collectAwesomeCursorrules(config, ctx) {
  const src = config.sources["awesome-cursorrules"];
  if (!src?.enabled) return [];

  const { owner, repo, path, idPrefix = "acr" } = src;
  const files = await listRepoFiles(owner, repo, path);
  const out = [];
  let skipped = 0;

  for (const file of files) {
    if (ctx.stats.awesomeConsidered >= (config.maxPerSource ?? 9999)) break;
    if (!/\.(mdc|md)$/i.test(file.name)) continue;
    ctx.stats.awesomeConsidered++;

    const url = rawGithubUrl(owner, repo, "main", file.path);
    let raw;
    try {
      raw = await fetchText(url);
    } catch {
      ctx.stats.awesomeFetchFail++;
      continue;
    }

    const { meta, body } = parseSimpleFrontmatter(raw);
    const plain = stripBodyForLengthCheck(body);
    if (plain.length < config.minBodyLength) {
      ctx.stats.awesomeTooShort++;
      continue;
    }

    const baseSlug = slugifyId(file.name.replace(/-cursorrules-prompt-file$/i, ""));
    const id = slugifyId(`${idPrefix}-${baseSlug}`);
    const name =
      meta.description?.split(".")[0]?.trim()?.slice(0, 80) ||
      baseSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const description = deriveDescription(body, meta, name);
    const tags = deriveTags(meta, guessStackFromName(file.name), ["cursorrules"]);
    const skillMd = buildSkillMarkdown({
      name,
      description,
      author: "community",
      tags,
      body,
      source: `https://github.com/${owner}/${repo}/tree/main/${file.path}`,
    });

    const entry = makeManifestEntry({
      id,
      name,
      description,
      author: "community",
      tags,
      registryOwner: config.registryOwner,
      registryRepo: config.registryRepo,
      registryBranch: config.registryBranch,
      source: `https://github.com/${owner}/${repo}/tree/main/${file.path}`,
      verified: false,
      needsReview: true,
    });

    out.push({ entry, skillMd, _synced: true });
    ctx.stats.awesomeAccepted++;
  }

  return out;
}

function guessStackFromName(filename) {
  const n = filename.toLowerCase();
  const stacks = [
    "nextjs",
    "react",
    "angular",
    "vue",
    "svelte",
    "python",
    "fastapi",
    "django",
    "rails",
    "ruby",
    "go",
    "rust",
    "java",
    "kotlin",
    "swift",
    "flutter",
    "dotnet",
    "php",
    "laravel",
    "node",
    "typescript",
    "javascript",
    "terraform",
    "kubernetes",
    "docker",
  ];
  return stacks.find((s) => n.includes(s)) || null;
}
