---
name: Kotlin Patterns
version: 1.0.0
author: NorahLabs
tags: [kotlin, backend, gradle, coroutines, jvm]
compatibleModes: [Build, Debug, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# Kotlin Patterns

## When to use this skill
Use this skill when working on Kotlin JVM projects and you want consistent patterns for null-safety, coroutines, and clean module boundaries.

## Core patterns

### Null-safety as a design tool
Prefer:
- non-null types by default
- validating external inputs early
- avoiding `!!` (it’s a runtime crash)

### Coroutines (when used)
Rules:
- structured concurrency
- cancellation-aware design
- avoid blocking calls in coroutine contexts

### Gradle structure
- keep build scripts readable
- avoid copy-pasting plugin config across modules; share via convention plugins if needed

### Testing
- unit tests for pure logic
- integration tests for wiring and persistence

## Atlarix tool notes
- **Explore**: detect Gradle Kotlin DSL (`build.gradle.kts`) and locate entry points.
- **Build**: run `./gradlew test` / `./gradlew build`.
- **Debug**: follow stack traces; confirm coroutine context + dispatcher usage.
- **Review**: check null-safety and coroutine cancellation.

## Common mistakes to avoid
- Using `!!` to “fix” nullability
- Blocking in coroutines
- God modules with unclear dependencies

## Mini-checklist
- Nullability is intentional
- Coroutines are structured
- Tests cover critical paths

