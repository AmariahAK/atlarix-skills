---
name: Swift Patterns
version: 1.0.0
author: NorahLabs
tags: [swift, ios, macos, concurrency, swiftpm]
compatibleModes: [Build, Debug, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# Swift Patterns

## When to use this skill
Use this skill when working on Swift projects (SwiftPM packages, iOS/macOS apps) and you want consistent patterns for concurrency, structure, and safety.

## Core patterns

### SwiftPM structure
- `Package.swift` is the source of truth
- keep targets small and focused
- avoid circular dependencies between targets

### Concurrency (async/await)
Rules:
- use `async/await` for IO
- keep cancellation in mind
- avoid blocking work on the main thread

### Value types by default
Prefer:
- `struct` for value semantics
- `class` when identity/shared mutable state is required

### Error handling
- throw typed errors where helpful
- add context at boundaries

### Testing
- keep tests deterministic
- prefer unit tests for pure logic

## Atlarix tool notes
- **Explore**: inspect `Package.swift` and target layout.
- **Build**: run `swift test` or Xcode build scripts depending on project.
- **Debug**: follow crash logs and stack traces; find the first app frame.
- **Review**: check concurrency correctness and API clarity.

## Common mistakes to avoid
- Doing heavy work on the main thread
- Overusing reference types
- Ignoring cancellation

## Mini-checklist
- Targets are small and layered
- Concurrency is used correctly
- Tests run reliably

