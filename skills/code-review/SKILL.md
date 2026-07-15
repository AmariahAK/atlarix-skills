---
name: Code Review
version: 1.0.0
author: NorahLabs
tags: [review, quality, security, performance, readability]
compatibleModes: [Review]
atlarixMinVersion: "7.0.0"
---

# Code Review (Structured)

## When to use this skill
Use this skill when reviewing a PR or a set of changes and you want a consistent, production-grade review pass: security first, then correctness, then performance, then style.

## Core patterns

### Review in passes (order matters)
1. **Security**: injection, auth, secrets, validation
2. **Correctness**: edge cases, nullability, error handling, idempotency
3. **Performance**: N+1, unnecessary re-renders, large allocations, slow queries
4. **Readability**: naming, structure, complexity, comments that explain why

### Security checklist
- Input validation at boundaries (HTTP, CLI, IPC)
- Parameterized queries (no SQL concat)
- AuthZ checks (not just auth)
- No secrets committed/logged
- Safe file paths (no path traversal)

### Correctness checklist
- Error paths handled (and user sees useful errors)
- Off-by-one / null / undefined cases covered
- Async operations awaited and cancellable where needed
- Invariants enforced (types + runtime guards)

### Performance checklist
- Avoid N+1 query loops
- Avoid loading entire files/blobs when a slice will do
- For React: avoid unnecessary re-renders and huge client bundles

### Correctness in distributed systems (quick reminders)
- Retries must be bounded and idempotent
- Timeouts should exist on network calls
- Errors should propagate with enough context to act

### Review output expectations
Good review comments include:
- risk (“this can break when…”)
- evidence (line reference / concrete scenario)
- suggestion (what to change or test)

### Suggesting tests (high leverage)
When you see risk, ask for one of:
- a unit test for pure logic
- an integration test for wiring
- an e2e test for user-critical flows

### Readability checklist
- Names match domain meaning
- Small focused functions
- Comments explain intent/tradeoffs, not narration

### What NOT to nitpick
- formatting (use formatter/linter)
- minor style preference that doesn’t impact maintainability
- “rewrite in my style” feedback

### How to phrase feedback
Prefer:
- “This may break when X…”
- “Can we add a test for Y?”
- “Consider extracting Z to reduce coupling”

Avoid:
- absolute statements without reasoning

## Atlarix tool notes
- Use `git diff` and `git log` to understand scope and intent.
- Use `read_file` + `grep` to confirm a change doesn’t break callsites.
- Use `grep`/`glob` to find entry points and cross-file coupling when reviewing bigger refactors.

Good reviewer flow:
1. read PR description (what/why/test plan)
2. scan diff for scope and risk
3. deep-dive the riskiest areas
4. suggest tests for edge cases and error paths

## Common mistakes to avoid
- Reviewing only the happy path
- Missing security boundary issues (authz, validation)
- Suggesting large rewrites instead of incremental improvements
- Leaving feedback without a concrete suggestion
- Not checking error handling and user-visible failure states

## Mini-checklist
- Security boundaries checked
- Correctness + error paths checked
- Performance hotspots checked
- Review feedback is actionable and kind

