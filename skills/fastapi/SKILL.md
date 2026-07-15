---
name: FastAPI Patterns
version: 1.0.0
author: NorahLabs
tags: [python, fastapi, backend, api, pydantic, async]
compatibleModes: [Build, Debug, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# FastAPI Patterns

## When to use this skill
Use this skill when building Python APIs with FastAPI and you want consistent boundary validation, async correctness, and maintainable dependency injection patterns.

## Core patterns

### Pydantic at boundaries
- validate request/response models explicitly
- avoid returning raw dicts from endpoints
- keep internal domain models separate from API schemas

### Async correctness
- prefer async DB/HTTP libraries when using async endpoints
- avoid blocking calls inside `async def`

### Dependencies (DI)
- use dependencies for auth, DB sessions, feature flags
- keep dependencies small and composable

### Error handling
- raise HTTPException for boundary errors
- wrap lower-level errors with context; log server-side details, keep user messages safe

### Testing
- unit tests for pure logic
- integration tests with TestClient / httpx
- test error paths explicitly

## Atlarix tool notes
- **Explore**: map routers and dependencies; locate schema models.
- **Build**: run `pytest`; keep endpoint changes small and typed.
- **Debug**: reproduce with a single request; inspect validation errors first.
- **Review**: check schema correctness, authz, and async blocking.

## Common mistakes to avoid
- Mixing domain logic into endpoint functions
- Returning raw dicts everywhere
- Blocking IO in async endpoints

## Mini-checklist
- Typed schemas at boundaries
- DI used intentionally
- Error paths tested
- Async is consistent

