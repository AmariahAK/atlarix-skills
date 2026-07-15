---
name: GitHub Actions CI Patterns
version: 1.0.0
author: NorahLabs
tags: [ci, github-actions, workflows, automation, devops]
compatibleModes: [Build, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# GitHub Actions CI Patterns

## When to use this skill
Use this skill when adding or debugging GitHub Actions workflows and you want repeatable CI behavior, minimal permissions, and clear failure logs.

## Core patterns

### Keep workflows small and composable
Prefer:
- multiple jobs with clear responsibilities
- reusable workflows for shared logic

### Permissions: least privilege
Set `permissions:` explicitly:
- default to read-only
- elevate only when needed (releases, writing checks)

### Caching (only when it helps)
Cache:
- dependency directories (npm/pip/cargo)

Avoid caching build outputs unless you understand invalidation.

### Deterministic installs
- use lockfiles
- use pinned tool versions where possible

### Fail fast with good logs
- print tool versions
- print key environment info
- surface the failing command output

### Local reproduction
When debugging:
- run the same commands locally
- match Node/Python versions from CI

## Atlarix tool notes
- **Explore**: inspect `.github/workflows/*.yml` and identify triggers and permissions.
- **Build**: implement the minimal change; keep steps explicit.
- **Review**: check permissions and secrets handling.

## Common mistakes to avoid
- Missing lockfiles leading to non-deterministic installs
- Overly broad permissions (`write-all`)
- Hidden failures due to `continue-on-error`

## Mini-checklist
- Permissions minimal
- Steps deterministic
- Logs useful
- Workflow names and job names clear

