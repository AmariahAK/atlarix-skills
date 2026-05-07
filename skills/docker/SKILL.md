---
name: Docker Patterns
version: 1.0.0
author: NorahLabs
tags: [docker, devops, containers, deployment, compose]
compatibleModes: [Build, Debug, Review, Ask]
atlarixMinVersion: "7.0.0"
---

# Docker Patterns

## When to use this skill
Use this skill when containerizing an app or debugging container behavior (build failures, missing deps, runtime env differences).

## Core patterns

### Minimal images
Prefer:
- multi-stage builds
- smallest base image that fits requirements

Avoid:
- copying the entire repo when you can copy only what’s needed

### Deterministic builds
- pin base images when possible
- avoid `latest` in production
- keep build context small with `.dockerignore`

### Runtime vs build dependencies
Separate:
- build tooling (compilers, dev deps)
- runtime deps only in final stage

### Compose for local dev
Use `docker-compose.yml` for:
- local DB/cache
- multi-service integration

### Debugging containers
Checklist:
- confirm env vars inside container
- confirm file paths and working directory
- confirm ports exposed and mapped
- inspect logs

## Atlarix tool notes
- **Ask**: inspect `Dockerfile`, `docker-compose.yml`, and entrypoint scripts.
- **Build**: run docker build/run commands and capture output.
- **Debug**: reproduce locally with the smallest container steps; check logs first.
- **Review**: verify secrets aren’t baked into images; check for overly-permissive settings.

## Common mistakes to avoid
- Using `latest` tags in production
- Leaking secrets via `ENV` or copied files
- Forgetting `.dockerignore`
- Shipping dev tools in runtime image

## Mini-checklist
- Multi-stage build used when appropriate
- `.dockerignore` present
- Secrets handled safely
- Logs + ports verified

