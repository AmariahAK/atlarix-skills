const GITHUB_API = "https://api.github.com";
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

export function githubHeaders() {
  const h = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  return h;
}

export async function githubFetchJson(path) {
  const res = await fetch(`${GITHUB_API}${path}`, { headers: githubHeaders() });
  if (!res.ok) throw new Error(`${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return res.text();
}

export async function listRepoFiles(owner, repo, dirPath, ref = "main") {
  const data = await githubFetchJson(
    `/repos/${owner}/${repo}/contents/${dirPath}?ref=${ref}`,
  );
  if (!Array.isArray(data)) return [];
  return data.filter((x) => x.type === "file").map((x) => ({ name: x.name, path: x.path }));
}

export async function listRepoDirs(owner, repo, dirPath, ref = "main") {
  const data = await githubFetchJson(
    `/repos/${owner}/${repo}/contents/${dirPath}?ref=${ref}`,
  );
  if (!Array.isArray(data)) return [];
  return data.filter((x) => x.type === "dir").map((x) => x.name);
}

export async function listTreePaths(owner, repo, ref = "main") {
  const data = await githubFetchJson(`/repos/${owner}/${repo}/git/trees/${ref}?recursive=1`);
  return (data.tree || []).map((t) => t.path);
}

export function rawGithubUrl(owner, repo, branch, filePath) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
}
