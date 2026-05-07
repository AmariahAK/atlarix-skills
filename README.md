# Atlarix Skills Registry

Community skill registry for the **Atlarix** desktop AI coding environment.

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Made by NorahLabs](https://img.shields.io/badge/Made%20by-NorahLabs-black)](https://norahlabs.com)

## What is this?
This repository is the community skill registry for Atlarix. Skills teach Atlarix agents language patterns, framework conventions, and workflow automation **without bloating every session’s context**.

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
Settings → Skills → Browse → Install

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
