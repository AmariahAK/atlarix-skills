---
name: Node.js Debugger
version: 1.0.0
author: NorahLabs
tags: [nodejs, bun, debugging, errors, async]
compatibleModes: [Debug]
atlarixMinVersion: "7.0.0"
---

# Node.js Debugger (Node + Bun)

## When to use this skill
Use this skill when debugging runtime failures in Node.js or Bun: stack traces, async errors, startup crashes, port conflicts, and memory leaks.

## Core patterns

### Reading stack traces (find the first app frame)
Rule: the top frames are often internal wrappers. Find the first frame in your project path.

Checklist:
- identify the thrown error type/message
- find the earliest application frame
- trace inputs to that frame (request payload, file path, env var)

### Unhandled promise rejections
Common causes:
- forgetting `await`
- `Promise.all` where one rejects and the rejection isn’t handled upstream

Fix patterns:
- always `await` async calls in request handlers
- add top-level `process.on("unhandledRejection")` logging in services (carefully)

### Async error propagation
Prefer explicit boundaries:
- validate input early
- catch and wrap errors at module boundaries (DB, HTTP, FS)

### Common error codes
- `ENOENT`: missing file → check path + cwd + packaging
- `EADDRINUSE`: port in use → pick a new port or kill existing process
- `ECONNREFUSED`: service not reachable → check host/port, local service running
- `MODULE_NOT_FOUND`: missing dependency/build output → reinstall or rebuild

### Memory leak patterns
Frequent culprits:
- event listener leaks (never removed)
- global caches that grow unbounded
- retaining large objects in closures

Fix patterns:
- add caps/TTL to caches
- remove listeners on teardown
- avoid caching per-request data globally

### Debugger usage (`--inspect`)
When reproduction is hard, use a debugger:
- start with `--inspect` or `--inspect-brk`
- set breakpoints at boundary code
- inspect inputs and invariants

### Structured logging over console spam
Prefer:
- consistent log keys
- request IDs / correlation IDs
- log errors with context

Example (structured):

```ts
logger.error("db.connect_failed", { host, port, cause: String(err) });
```

### Reproduction discipline
Before changing code:
- reduce to the smallest failing command
- capture exact inputs (env vars, args, payload)
- confirm the failure is still present after restarting the process

### Port conflicts (`EADDRINUSE`)
Workflow:
1. identify the port (`:3000`, `:5173`, etc.)
2. find the running process
3. stop the old process or switch ports intentionally

Avoid “random port hopping” without understanding why the port is busy.

## Atlarix tool notes
- In Debug mode, use the terminal tools to reproduce the error and capture the full output.
- Use `grep` to locate error strings and catch blocks.
- Use small targeted changes; re-run the failing command quickly.

When reporting issues:
- include exact error message + stack trace
- include reproduction steps
- include environment (Node/Bun version)
- include whether it reproduces on a clean install

## Bun vs Node notes
- Bun can behave differently for module resolution and some Node APIs.
- If a bug reproduces only in Bun, isolate the runtime-specific behavior before refactoring app logic.

## Common mistakes to avoid
- Chasing the last stack frame instead of the first app frame
- Swallowing errors in `catch` without rethrowing or returning failure
- Adding retries without backoff/timeouts
- Logging secrets (tokens, API keys)
- “Fixing” by adding `try/catch` everywhere without understanding the root cause

## Mini-checklist
- Reproduction is deterministic
- First app frame identified
- Boundary inputs validated
- Errors logged with context (no secrets)

