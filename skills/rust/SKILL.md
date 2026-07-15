---
name: Rust Patterns
version: 1.0.0
author: NorahLabs
tags: [rust, backend, safety, error-handling, cargo]
compatibleModes: [Build, Debug, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# Rust Patterns

## When to use this skill
Use this skill when writing Rust crates/services and you want reliable patterns for error handling, module structure, ownership boundaries, and maintainable APIs.

## Core patterns

### Prefer Result/Option over panics
Panics are for programmer bugs, not expected failures.

Pattern:
- return `Result<T, E>` from fallible functions
- use `thiserror`/`anyhow` depending on library vs app

### Error context matters
When bubbling errors, add context at boundaries:
- IO
- parsing
- network

### Ownership boundaries
Prefer:
- passing references `&T` where possible
- cloning only when it improves clarity or lifetimes become complex

### Module layout
Common:
- `src/lib.rs` for library
- `src/main.rs` for binary
- `src/<module>.rs` or `src/<module>/mod.rs`

### Testing
Patterns:
- unit tests in module files
- integration tests in `tests/`
- avoid relying on global state

## Atlarix tool notes
- **Explore**: scan `Cargo.toml` and entry points (`main.rs`, `lib.rs`).
- **Build**: run `cargo test` and `cargo clippy` if configured.
- **Debug**: minimize repro; use feature flags intentionally.
- **Review**: check error boundaries and public API clarity.

## Common mistakes to avoid
- Using panics for expected failures
- Exposing internal types publicly without intent
- Overusing `Rc<RefCell<...>>` instead of redesigning ownership

## Mini-checklist
- Fallible functions return `Result`
- Errors have context
- Public API is intentional
- Tests cover error paths

