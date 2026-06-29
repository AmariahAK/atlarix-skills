# Atlarix Skills Registry

Community skill registry for the **Atlarix** desktop AI coding environment.

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Made by NorahLabs](https://img.shields.io/badge/Made%20by-NorahLabs-black)](https://norahlabs.com)

## What is this?
This repository is the community skill registry for Atlarix. Skills teach Atlarix agents language patterns, framework conventions, and workflow automation **without bloating every session’s context**.

## Latest releases

Download the desktop app from **[github.com/AmariahAK/atlarix-releases](https://github.com/AmariahAK/atlarix-releases)** (macOS / Linux builds; Windows when published).

## Related open-source repos

- **[atlarix-mcps](https://github.com/AmariahAK/atlarix-mcps)** — auto-synced MCP marketplace index (`index.json`) for Atlarix (**Pro / Workforce** marketplace installs).

This registry is **auto-synced** from community cursor-rule sources (see `scripts/sync.mjs`). Hand-curated NorahLabs skills under `skills/<id>/` without `.sync-source.json` are never overwritten.
- **[atlarix-releases](https://github.com/AmariahAK/atlarix-releases)** — official installers and auto-update metadata.
- **[AmariahAK/Atlarix](https://github.com/AmariahAK/Atlarix)** — application repository (proprietary); product site [atlarix.dev](https://atlarix.dev).

## Research

The context management approach behind Atlarix's Blueprint system is documented in a published technical paper:

**Blueprint: Section-Scoped Structural Graph Retrieval and Post-Turn Compression for Agentic LLM Coding in Multi-Repository Workspaces**  
Amariah Kamau, NorahLabs — May 2026  
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.20381860.svg)](https://doi.org/10.5281/zenodo.20381860)

The paper covers how Blueprint builds section-scoped structural graphs from ctags and ast-grep, how post-turn tool-result summarisation reduces history size, and benchmark results from a controlled multi-repository exploration task.

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
Settings → Skills → Browse → Install (**requires Pro or Workforce**).

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
