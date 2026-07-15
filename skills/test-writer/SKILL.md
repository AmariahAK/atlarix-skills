---
name: Test Writer
version: 1.0.0
author: NorahLabs
tags: [testing, jest, vitest, pytest, tdd, e2e]
compatibleModes: [Build, Review]
atlarixMinVersion: "7.0.0"
---

# Test Writer

## When to use this skill
Use this skill when you’re adding features or fixing bugs and you want tests that lock in **behavior**, are easy to read, and fail with useful diagnostics.

## Core patterns

### Test behavior, not implementation
Prefer assertions on:
- outputs and return values
- observable side-effects (DB writes, network calls via mocked boundary)
- rendered UI behavior

Avoid asserting:
- internal helper calls
- private state
- exact call order unless it’s part of the contract

### Arrange / Act / Assert (AAA)
Structure tests so readers can skim:
- Arrange: setup inputs + mocks
- Act: execute
- Assert: verify outcomes

```ts
it("returns 401 when token is missing", async () => {
  // Arrange
  const req = makeRequest({ headers: {} });

  // Act
  const res = await handler(req);

  // Assert
  expect(res.status).toBe(401);
});
```

### Naming conventions
Use readable test names:
- `describe("<unit>")`
- `it("does <behavior> when <condition>")`

Bad:
- `it("works")`
- `it("test1")`

### Mocking philosophy: mock at the boundary
Mock:
- HTTP clients
- DB adapters/repositories
- filesystem
- time

Avoid mocking deep internals; that freezes implementation and makes refactors painful.

### Testing async code
Rules:
- always `await` promises
- assert rejection paths explicitly

```ts
await expect(fn()).rejects.toThrow("missing");
```

### Snapshot tests (use intentionally)
Use snapshots when:
- large stable output (markdown rendering, formatted AST)
- you want quick diff review

Avoid snapshots for:
- small outputs (write explicit asserts)
- unstable values (timestamps, random IDs)

### Error paths are first-class
Every critical function should have tests for:
- invalid input
- missing resources (ENOENT)
- permission denied
- timeouts / retries

### Unit vs integration vs e2e
Use:
- **Unit**: pure logic, fast, lots of cases
- **Integration**: modules wired together (DB in memory, API route handler with mocked network)
- **E2E**: user flows (Playwright/Cypress), fewer tests but high confidence

Rule of thumb:
- fix bugs with unit/integration tests first; add e2e for regressions in critical flows

## Tool-specific notes

### Vitest vs Jest (common differences)
- Vitest tends to be faster with Vite projects
- Jest ecosystem is broad, but config can be heavier
- Prefer project-native tooling (don’t introduce a second runner)

### Pytest fixtures
Use fixtures to reduce duplication:
- `@pytest.fixture` for setup
- `@pytest.mark.parametrize` for cases

## Atlarix tool notes
- **Review**: use Review mode to check test coverage for edge cases and error paths.
- **Build**: use `run_command` to run the smallest test scope first (single file), then full suite.
- Use `grep`/`glob` to find existing test patterns and match conventions.

Practical workflow:
- Reproduce bug → write failing test → implement fix → watch test pass.

## Common mistakes to avoid
- Tests that assert internal implementation details
- Over-mocking (mocking every function call)
- Flaky tests due to time/randomness
- Snapshot abuse (snapshots for everything)
- Not testing error handling paths

## Mini-checklist
- Test names explain behavior
- AAA structure is clear
- Mocks are at boundaries
- Async is awaited
- Error paths covered

