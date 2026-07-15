---
name: Elixir Patterns
version: 1.0.0
author: NorahLabs
tags: [elixir, phoenix, otp, concurrency, mix]
compatibleModes: [Build, Debug, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# Elixir Patterns

## When to use this skill
Use this skill when working on Elixir/Phoenix projects and you want maintainable OTP-friendly structure, clear boundaries, and robust error handling.

## Core patterns

### Mix project hygiene
- `mix.exs` is the source of truth
- keep deps minimal and explicit
- avoid runtime config surprises (document env vars)

### OTP mindset
Prefer:
- supervision trees
- isolated processes for state
- message passing over shared mutable state

### Function clarity
- small functions
- pattern matching for branching
- use guard clauses for fast validation

### Testing
- ExUnit for unit tests
- keep tests deterministic

## Atlarix tool notes
- **Explore**: inspect `mix.exs` and `lib/` modules; locate supervision tree.
- **Build**: run `mix test`.
- **Debug**: inspect crash logs; confirm supervision restarts aren’t hiding repeated failures.
- **Review**: check boundaries and that errors include enough context.

## Common mistakes to avoid
- Putting too much state in a single process
- Silent failures under supervisors
- Overusing macros instead of plain functions

## Mini-checklist
- Supervision is intentional
- Boundaries are clear
- Tests cover critical behavior

