---
name: .NET Patterns
version: 1.0.0
author: NorahLabs
tags: [dotnet, csharp, backend, aspnet, testing]
compatibleModes: [Build, Debug, Review, Ask]
atlarixMinVersion: "7.0.0"
---

# .NET Patterns

## When to use this skill
Use this skill when working in .NET projects (C#) and you want clean layering, safe async usage, and maintainable dependency injection patterns.

## Core patterns

### Async all the way
Rules:
- use `async/await` end-to-end for IO
- avoid blocking waits (`.Result`, `.Wait()`)
- use cancellation tokens in long-running operations

### Dependency injection boundaries
Prefer:
- services with clear responsibilities
- interfaces at boundaries (HTTP, DB, external APIs)

Avoid:
- service locator patterns
- DI containers used as “global state”

### Configuration and secrets
- use environment-specific config
- never commit secrets
- validate required configuration on startup

### Testing
- unit tests for pure logic
- integration tests for DB/wiring
- avoid over-mocking

## Atlarix tool notes
- **Ask**: locate `.sln` / `*.csproj` and startup entry points.
- **Build**: run `dotnet test` and `dotnet build`.
- **Debug**: follow stack traces; check first app frame and DI registration.
- **Review**: ensure async correctness and cancellation support.

## Common mistakes to avoid
- Blocking on async tasks
- Missing cancellation tokens
- Controllers doing business logic

## Mini-checklist
- Async end-to-end
- Layers are separated
- Config validated
- Tests run in CI

