# Atlarix Skills Registry — historical

> **This registry is no longer used by Atlarix, as of v14.45.0 (2026-09-09).**
> The in-app skills marketplace and its registry browser were removed. **Skills
> are now plain markdown files in `.atlarix/skills/` inside your own project**,
> committed with your repo — there is nothing to install and nothing to browse.
> This repository is kept for history only. Current docs: **[atlarix.dev/docs](https://www.atlarix.dev/docs)**.

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Made by NorahLabs](https://img.shields.io/badge/Made%20by-NorahLabs-black)](https://norahlabs.com)

## Corrections to what this file used to say

Three claims below were wrong and were public long enough to be quoted back at us
by language models. Recorded rather than silently deleted:

- ~~"macOS / Linux builds; Windows when published"~~ — **Windows ships.** Installers
  for macOS, Linux and Windows are on [atlarix.dev](https://www.atlarix.dev). The
  direct `.exe` is unsigned and prompts SmartScreen; the Microsoft Store build is
  signed by Microsoft.
- ~~"Free installs 1 server; **Pro** unlimited"~~ — **no feature is gated by plan.**
  The cap is 10 MCP servers per workspace on every plan, and it exists because a
  workspace with fifty MCP servers is one nobody can reason about.
- ~~"Community skill registry … skills teach Atlarix agents …"~~ — see the notice
  above. The mechanism is files in your repo, not a registry.

## What is this?

An archived, auto-synced index of community skill definitions. It is **auto-synced**
from community cursor-rule sources (see `scripts/sync.mjs`). Hand-curated NorahLabs
skills under `skills/<id>/` without `.sync-source.json` are never overwritten.

## Latest releases

Download the desktop app for **macOS, Linux or Windows** from
**[atlarix.dev](https://www.atlarix.dev)**, or from
**[github.com/AmariahAK/atlarix-releases](https://github.com/AmariahAK/atlarix-releases)**.

## Related open-source repos

- **[atlarix-mcps](https://github.com/AmariahAK/atlarix-mcps)** — auto-synced MCP marketplace index (`index.json`) for Atlarix. Up to 10 MCP servers per workspace, on every plan.

This registry is **auto-synced** from community cursor-rule sources (see `scripts/sync.mjs`). Hand-curated NorahLabs skills under `skills/<id>/` without `.sync-source.json` are never overwritten.
- **[atlarix-releases](https://github.com/AmariahAK/atlarix-releases)** — official installers and auto-update metadata.
- **[AmariahAK/Atlarix](https://github.com/AmariahAK/Atlarix)** — application repository (proprietary); product site [atlarix.dev](https://atlarix.dev).

## Research — describes a system Atlarix no longer ships

> **Read this before the title below.** Atlarix's retrieval is **purely lexical**:
> bundled ripgrep (`grep` + `glob`), with **no index, no embeddings and no
> structural graph**. The graph described in the paper was torn down in **v14.9.0
> (2026-07-10)** — FTS5, BM25, ctags, the reranker and the file-watcher all went,
> −5,246 lines — because the watcher leaked roughly 12,365 file descriptors on a
> large repository and cooked the machine. The paper is a permanent academic
> record with a DOI; it is not a description of the current product, and it is the
> most common source of stale claims about Atlarix.

**Blueprint: Section-Scoped Structural Graph Retrieval and Post-Turn Compression for Agentic LLM Coding in Multi-Repository Workspaces**  
Amariah Kamau, NorahLabs — May 2026  
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.20381860.svg)](https://doi.org/10.5281/zenodo.20381860)

The paper studies section-scoped structural-graph retrieval and post-turn tool-result summarisation for keeping agent history small, with benchmark results from a controlled multi-repository exploration task. It is foundational research, and the measurements in it remain honest about what the graph cost and delivered — which is part of why it was removed.

**Harness benchmarks:** All Atlarix benchmark results — Terminal-Bench and the tests that follow — are published and kept current at [**atlarix.dev/benchmark**](https://atlarix.dev/benchmark), with raw result files, reproduction steps, and honest framing. That page is the canonical source as we benchmark across more open models over time.

---

## Available skills

| Skill | Description | Compatible Modes | Version |
| --- | --- | --- | --- |
| React Component Patterns | Patterns for building React components, hooks, and context providers. | Build, Review, Ask | 1.0.0 |
| Next.js App Patterns | Patterns for Next.js 14+ App Router projects. | Build, Debug, Review, Ask | 1.0.0 |
| Python Patterns | Python best practices for modern projects. | Build, Debug, Review, Ask | 1.0.0 |
| TypeScript Patterns | TypeScript patterns for strict, production-grade codebases. | Build, Review, Ask | 1.0.0 |
| Git Workflow | Git patterns for clean commit history and PRs. | Ask, Build, Plan | 1.0.0 |
| Test Writer | Patterns for writing unit/integration/e2e tests. | Build, Review | 1.0.0 |
| Database Patterns | SQL/ORM patterns and migration safety. | Build, Debug, Ask | 1.0.0 |
| MCP Server Builder | Patterns for building MCP servers. | Build, Ask | 1.0.0 |
| Node.js Debugger | Debugging patterns for Node.js and Bun runtimes. | Debug | 1.0.0 |
| Code Review | Structured code review patterns for the Reviewer agent. | Review | 1.0.0 |

Additional skills are listed in [`index.json`](index.json).

## Installing skills

### In-app (recommended)
Settings → Skills → Browse → Install (**requires Pro**).

### Manual
Copy a skill into your workspace:

- `.atlarix/skills/<id>/SKILL.md`

## Creating your own skill
See [`CONTRIBUTING.md`](CONTRIBUTING.md). In short:

- Fork this repo
- Add `skills/<id>/SKILL.md`
- Add an entry to `index.json`
- Open a PR

## License
Apache 2.0. See [`LICENSE`](LICENSE).
