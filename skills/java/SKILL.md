---
name: Java Patterns
version: 1.0.0
author: NorahLabs
tags: [java, backend, gradle, maven, spring, testing]
compatibleModes: [Build, Debug, Review, Ask]
atlarixMinVersion: "7.0.0"
---

# Java Patterns

## When to use this skill
Use this skill when working on Java services/libs and you want clean layering, safe null handling, predictable build structure (Maven/Gradle), and testable code.

## Core patterns

### Null handling (be explicit)
Prefer:
- returning empty collections over null
- `Optional<T>` for return values (not for fields)
- null checks at boundaries (inputs)

Avoid:
- `Optional` in fields/DTOs as a general rule (depends on ecosystem)

### Layering
Keep boundaries clear:
- controllers/handlers (HTTP, RPC)
- services (business logic)
- repositories/DAOs (persistence)

### Immutability by default
Prefer:
- final fields
- constructors that enforce invariants
- builders only when needed

### Exceptions
Rules:
- throw exceptions with actionable messages
- don’t catch-and-ignore
- wrap lower-level exceptions with context

### Tests
Patterns:
- JUnit for unit tests
- integration tests for persistence and wiring
- avoid heavy mocks; mock at boundaries

## Atlarix tool notes
- **Ask**: identify build system (`pom.xml` vs `build.gradle`) and entry points.
- **Build**: run `mvn test` or `gradle test` depending on project.
- **Debug**: inspect stack traces; find first application frame.
- **Review**: verify layering and that exceptions don’t leak secrets.

## Common mistakes to avoid
- God services with too many responsibilities
- Catching `Exception` broadly and hiding failures
- NPEs due to missing boundary validation

## Mini-checklist
- Clear layers
- Nulls handled intentionally
- Tests cover critical paths
- Build commands documented

