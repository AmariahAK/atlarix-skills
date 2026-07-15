---
name: PHP Patterns
version: 1.0.0
author: NorahLabs
tags: [php, backend, composer, laravel, testing]
compatibleModes: [Build, Debug, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# PHP Patterns

## When to use this skill
Use this skill when working in modern PHP (8+) codebases and you want predictable structure, safe IO boundaries, and maintainable application/service design.

## Core patterns

### Types and strictness
Prefer:
- `declare(strict_types=1);` in new code where compatible
- typed properties and return types
- explicit DTOs for request/response boundaries

### Composer hygiene
- keep dependencies minimal
- prefer stable versions
- document required PHP version and extensions

### Error handling
- handle exceptions at module boundaries
- avoid swallowing errors
- log with context (no secrets)

### Laravel-specific notes (if applicable)
- controllers: thin
- services: business logic
- requests: validation
- policies: authorization

### Testing
- unit tests for logic
- integration tests for DB/wiring
- keep fixtures small and deterministic

## Atlarix tool notes
- **Explore**: locate `composer.json`, framework entry points, and configuration.
- **Build**: run `composer install` + the project’s test runner (`phpunit`/pest).
- **Debug**: read stack traces and confirm config/env.
- **Review**: check for injection risks and missing validation.

## Common mistakes to avoid
- Untyped arrays everywhere at boundaries
- Mixing rendering, IO, and business logic
- Swallowing exceptions

## Mini-checklist
- Boundary validation present
- Types used for key functions
- Tests cover critical flows

