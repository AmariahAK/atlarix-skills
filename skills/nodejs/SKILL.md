---
name: Node.js Patterns
version: 1.0.0
author: NorahLabs
tags: [nodejs, backend, typescript, runtime, tooling]
compatibleModes: [Build, Debug, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# Node.js Patterns

## When to use this skill
Use this skill when working in Node.js services/CLIs and you want predictable async behavior, safe boundaries, and good operational defaults.

## Core patterns

### Async all the way
Rules:
- `await` IO
- set timeouts on network calls
- handle rejection paths explicitly

### Boundary validation
Validate:
- request payloads
- env vars
- filesystem paths

Prefer a single validation point over scattered checks.

### Structured logging
Prefer:
- consistent event names
- correlation IDs
- avoid logging secrets

### Shutdown and cleanup
Services should handle:
- SIGINT/SIGTERM
- closing DB pools
- stopping servers gracefully

### Dependency hygiene
- avoid huge transitive deps for small tasks
- keep lockfiles committed

## Atlarix tool notes
- **Explore**: locate `package.json` scripts, entry points, and config.
- **Build**: run the project’s test/lint scripts; keep diffs small.
- **Debug**: reproduce errors in terminal; capture complete stack traces.
- **Review**: check for missing timeouts and unsafe input handling.

## Common mistakes to avoid
- No timeouts on outbound requests
- Logging secrets
- Global mutable state that grows unbounded

## Mini-checklist
- Inputs validated
- Errors handled
- Logs structured
- Shutdown graceful

