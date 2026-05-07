---
name: Ruby Patterns
version: 1.0.0
author: NorahLabs
tags: [ruby, rails, backend, bundler, testing]
compatibleModes: [Build, Debug, Review, Ask]
atlarixMinVersion: "7.0.0"
---

# Ruby Patterns

## When to use this skill
Use this skill when working in Ruby projects (Rails or otherwise) and you want clean object boundaries, predictable dependency management, and maintainable code organization.

## Core patterns

### Keep objects small and focused
- prefer small classes and modules
- keep methods short and intention-revealing

### Dependency management with Bundler
- `Gemfile` describes dependencies
- `Gemfile.lock` pins versions (commit it)
- avoid unpinned production dependencies

### Error handling
- raise exceptions with context
- don’t rescue broadly unless you rethrow or return a clear failure

### Testing
- unit tests for pure logic
- integration tests for DB/wiring
- keep fixtures small and readable

## Rails notes (if applicable)
- controllers: thin
- models: avoid fat models; extract domain services when logic grows
- background jobs: idempotent and retry-safe

## Atlarix tool notes
- **Ask**: locate `Gemfile`, `config/routes.rb`, and entry points.
- **Build**: run `bundle install` and the project’s test suite.
- **Debug**: follow stack traces; identify boundary errors.
- **Review**: check for security issues (SQL injection, params handling) and N+1 queries.

## Common mistakes to avoid
- Fat controllers + fat models
- Rescue-everything blocks that hide failures
- Not committing `Gemfile.lock`

## Mini-checklist
- Dependencies pinned
- Layers are clear
- Tests cover behavior

