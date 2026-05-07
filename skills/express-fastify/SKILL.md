---
name: Express/Fastify Backend Patterns
version: 1.0.0
author: NorahLabs
tags: [nodejs, express, fastify, backend, api, validation]
compatibleModes: [Build, Debug, Review, Ask]
atlarixMinVersion: "7.0.0"
---

# Express/Fastify Backend Patterns

## When to use this skill
Use this skill when building Node.js HTTP APIs with Express or Fastify and you want safe request validation, predictable error handling, and maintainable routing/service layering.

## Core patterns

### Boundary validation
Validate at the edge (request body/params/query):
- reject invalid shapes early
- normalize types (numbers, booleans)
- avoid passing raw request objects into services

### Layering
Keep:
- routes/controllers: parsing + HTTP response
- services: business logic
- repositories/adapters: DB/external APIs

### Error handling
Rules:
- throw domain errors in services
- map to HTTP status codes in one place (middleware/error handler)
- include request IDs in logs

### Timeouts and retries
- apply timeouts to outbound HTTP/DB calls
- retries must be bounded and idempotent

### Observability
- structured logs (no secrets)
- basic metrics for request duration/error rates (if available)

## Atlarix tool notes
- **Ask**: locate route registration and middleware order with `search_code`.
- **Build**: make small edits; run API tests; keep handlers thin.
- **Debug**: capture full error + stack; reproduce with a single curl/HTTP request.
- **Review**: check validation, authz, and that errors don’t leak secrets.

## Common mistakes to avoid
- No validation (passing raw JSON deep into code)
- Controllers doing business logic
- Swallowing errors in catch blocks
- Missing timeouts on outbound calls

## Mini-checklist
- Validation at boundaries
- Centralized error mapping
- Clear layering
- Timeouts on outbound calls

