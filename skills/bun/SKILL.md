---
name: Bun Patterns
version: 1.0.0
author: NorahLabs
tags: [bun, nodejs, runtime, tooling, typescript]
compatibleModes: [Build, Debug, Review, Ask]
atlarixMinVersion: "7.0.0"
---

# Bun Patterns

## When to use this skill
Use this skill when working in Bun-based projects (or Node projects running on Bun) and you want reliable runtime expectations, dependency management, and debugging workflows.

## Core patterns

### Runtime compatibility awareness
Bun aims for Node compatibility, but differences exist:
- module resolution edge cases
- some Node APIs behave differently
- performance characteristics differ

When debugging a bug:
- confirm whether it reproduces in Node
- isolate runtime-specific behavior before refactoring app logic

### Dependency management
- Bun uses `bun.lockb`
- prefer consistent package manager usage per repo

Avoid mixing `npm`/`yarn`/`pnpm` and `bun` unless the project explicitly supports it.

### Tests
- use the project’s configured runner
- if using Bun’s test runner, keep expectations consistent

## Atlarix tool notes
- **Ask**: inspect `bun.lockb` and scripts; locate entrypoints.
- **Build**: run `bun install` and the relevant `bun run <script>`.
- **Debug**: compare behavior in Node if the issue is unclear.
- **Review**: ensure scripts and tooling are consistent and documented.

## Common mistakes to avoid
- Treating Bun as perfectly identical to Node
- Mixing package managers and lockfiles
- Hiding runtime differences behind broad try/catch

## Mini-checklist
- Lockfile committed
- Scripts documented
- Runtime differences acknowledged in debugging

