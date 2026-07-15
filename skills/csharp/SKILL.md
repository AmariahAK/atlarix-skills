---
name: C# Patterns
version: 1.0.0
author: NorahLabs
tags: [csharp, dotnet, backend, aspnet, testing]
compatibleModes: [Build, Debug, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# C# Patterns

## When to use this skill
Use this skill when working in C# projects (.NET) and you want patterns for async correctness, clear layering, and safe dependency injection.

## Core patterns

### Async correctness
- avoid `.Result` / `.Wait()`
- propagate `CancellationToken`
- set timeouts for external calls

### Layering
- controllers/handlers: request/response wiring only
- services: business logic
- repositories: persistence and queries

### Exceptions
- throw meaningful exceptions at boundaries
- don’t catch and ignore
- log with context (no secrets)

### Testing
- unit tests for pure logic
- integration tests for DB/wiring

## Atlarix tool notes
- **Explore**: locate `*.csproj` and key entry points; inspect DI registrations.
- **Build**: run `dotnet test`.
- **Debug**: follow the first app frame in stack traces; check DI and config.
- **Review**: check async/cancellation correctness and error handling.

## Common mistakes to avoid
- Blocking on async tasks
- Missing cancellation tokens
- Controllers that embed business logic

## Mini-checklist
- Async end-to-end
- Layers separated
- Tests cover critical behavior

