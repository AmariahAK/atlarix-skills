---
name: Deno Patterns
version: 1.0.0
author: NorahLabs
tags: [deno, typescript, runtime, tooling]
compatibleModes: [Build, Debug, Review, Ask]
atlarixMinVersion: "7.0.0"
---

# Deno Patterns

## When to use this skill
Use this skill when working on Deno projects and you want predictable module imports, permission-aware runtime behavior, and clean project structure.

## Core patterns

### Permissions are part of the contract
Deno requires explicit permissions. Make them intentional:
- `--allow-net` for network
- `--allow-read` for filesystem reads
- avoid `--allow-all` in production scripts

### Project structure
Common:
- `deno.json` / `deno.jsonc`
- `mod.ts` as entrypoint for libraries
- `main.ts` for apps

### Dependency management
- prefer import maps
- keep third-party imports centralized

### Testing
- use `deno test`
- keep tests deterministic

## Atlarix tool notes
- **Ask**: inspect `deno.json` and entrypoints; trace imports.
- **Build**: run `deno test` and `deno fmt` if configured.
- **Debug**: check permission errors first; they’re common.
- **Review**: verify permission flags are minimal and documented.

## Common mistakes to avoid
- Using `--allow-all` by default
- Scattering dependencies across files
- Ignoring permission failures and “fixing” by widening permissions

## Mini-checklist
- Minimal permissions
- Imports centralized
- Tests use deno tooling

