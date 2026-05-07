---
name: Playwright E2E Testing
version: 1.0.0
author: NorahLabs
tags: [testing, e2e, playwright, frontend, web]
compatibleModes: [Build, Debug, Review]
atlarixMinVersion: "7.0.0"
---

# Playwright E2E Testing

## When to use this skill
Use this skill when you need high-confidence coverage of user flows (auth, uploads, payments, chat flows) and you want stable, debuggable Playwright tests.

## Core patterns

### Test user behavior, not implementation
Prefer:
- interactions by role/label/text
- assertions on visible behavior

Avoid:
- brittle CSS selectors
- tests that depend on internal component structure

### Deterministic test data
- seed DB or use fixtures
- avoid reliance on external APIs in CI (mock where needed)

### Waits: rely on Playwright auto-waiting
Prefer:
- `await expect(locator).toBeVisible()`

Avoid:
- arbitrary `sleep` calls

### Debugging failures
- run headed locally when needed
- capture trace/video/screenshots in CI
- keep failure artifacts easy to access

## Atlarix tool notes
- **Build**: add one e2e test per critical flow; keep them fast.
- **Debug**: reproduce the failing spec locally first; use trace viewer.
- **Review**: check selectors are resilient and assertions match user intent.

## Common mistakes to avoid
- Using brittle selectors
- Global shared state between tests
- Flaky waits and timing-based sleeps

## Mini-checklist
- Locators use roles/labels
- Data seeded deterministically
- Traces enabled in CI

