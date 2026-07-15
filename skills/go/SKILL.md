---
name: Go Patterns
version: 1.0.0
author: NorahLabs
tags: [go, backend, concurrency, testing, modules]
compatibleModes: [Build, Debug, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# Go Patterns

## When to use this skill
Use this skill when building Go services/CLIs and you want practical patterns for package layout, error handling, concurrency, and testing that keep code readable and reliable.

## Core patterns

### Errors: wrap with context, don’t hide them
Use `%w` to wrap:

```go
return fmt.Errorf("load config: %w", err)
```

Prefer returning errors over panics for expected failure modes.

### Context propagation
For servers and clients:
- accept `context.Context` as the first parameter
- honor cancellation and deadlines

### Interfaces: small and consumer-defined
Prefer:
- defining interfaces at the point of use
- small method sets

Avoid:
- “god interfaces” shared across packages

### Package structure
Common structure:
- `cmd/<app>/main.go`
- `internal/...` for private app packages
- `pkg/...` only for truly reusable libs (optional)

### Concurrency: start simple
Prefer:
- a goroutine per independent unit of work
- `errgroup` (or equivalent) for fan-out with cancellation
- bounded concurrency via semaphores

Avoid:
- unbounded goroutine creation
- shared mutable state without clear ownership

### Testing
Patterns:
- table-driven tests
- keep test data small and explicit
- compare errors and output deterministically

## Atlarix tool notes
- **Explore**: locate entry points under `cmd/` and critical packages under `internal/` with `grep`/`glob`.
- **Build**: make small edits and run `go test ./...`.
- **Debug**: reproduce with `go test -run <name> -count=1` or run the binary with flags.
- **Review**: check context cancellation, error wrapping, and package boundaries.

## Common mistakes to avoid
- Ignoring context cancellation in IO calls
- Returning sentinel errors without context
- Over-using interfaces (interface for everything)
- Global variables holding state across requests

## Mini-checklist
- Errors wrapped with context
- Context is propagated
- Concurrency is bounded
- Tests are table-driven where appropriate

