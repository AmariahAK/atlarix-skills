---
name: Django Patterns
version: 1.0.0
author: NorahLabs
tags: [python, django, backend, api, orm, testing]
compatibleModes: [Build, Debug, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# Django Patterns

## When to use this skill
Use this skill when working on Django apps/APIs and you want safe model design, query performance awareness, and clean view/service structure.

## Core patterns

### Settings and environments
- keep secrets out of repo
- separate settings for dev/staging/prod
- validate required env vars on startup

### Models: constraints + indexes
- use DB constraints for invariants
- add indexes for common filters/joins
- avoid “magic” implicit behavior without tests

### Query performance (avoid N+1)
- use `select_related` / `prefetch_related` intentionally
- avoid per-row queries in loops

### Views: thin, services: thick
- views/DRF viewsets should parse input and return responses
- business logic belongs in services/domain modules

### Migrations
- additive first
- backfill safely
- enforce constraints in later migrations

### Testing
- unit tests for pure logic
- integration tests for ORM queries and views

## Atlarix tool notes
- **Explore**: locate settings, apps, and urls; map core models and their relations.
- **Build**: run `pytest`/`manage.py test`; keep migrations small and reversible.
- **Debug**: inspect stack traces; reproduce failing query patterns.
- **Review**: check query count and migration safety.

## Common mistakes to avoid
- N+1 queries hidden in serializers/templates
- Fat models with unrelated responsibilities
- Unsafe migrations on large tables

## Mini-checklist
- Constraints/indexes intentional
- Query count sane
- Views thin, services clear
- Migrations safe

