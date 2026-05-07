---
name: TypeScript Patterns
version: 1.0.0
author: NorahLabs
tags: [typescript, types, generics, patterns, narrowing, tsconfig]
compatibleModes: [Build, Review, Ask]
atlarixMinVersion: "7.0.0"
---

# TypeScript Patterns (Strict)

## When to use this skill
Use this skill when working in a strict TypeScript codebase and you want reliable patterns for modeling data, narrowing, generics, and configuration—without papering over errors with `as` casts.

## Core patterns

### Strict mode is the baseline
Prefer `strict: true` and keep these on unless you have a strong reason:
- `noUncheckedIndexedAccess`
- `exactOptionalPropertyTypes`
- `noImplicitOverride` (when using classes)

Treat any relaxation as a conscious decision with a documented reason.

### `unknown` over `any`
Use `unknown` at boundaries:
- JSON parsing
- tool outputs
- external SDK payloads

Then narrow:

```ts
function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}
```

### Narrowing patterns
Use the built-in primitives:
- `typeof` for primitives
- `instanceof` for classes/errors
- `"in"` for structural checks
- discriminated unions for complex state

```ts
type Result =
  | { ok: true; value: string }
  | { ok: false; error: string };

function handle(r: Result) {
  if (!r.ok) return r.error;
  return r.value;
}
```

### Discriminated unions for UI state
Avoid boolean soup (`isLoading`, `hasError`, `isEmpty` …).
Prefer:

```ts
type LoadState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ready"; items: string[] };
```

### Utility types (use them deliberately)
Useful:
- `Pick`, `Omit` for DTO shaping
- `ReturnType`, `Parameters` for typed wrappers
- `Partial` only for “patch” objects (not for real domain models)

Anti-pattern:
- `Partial<Model>` to “get around” missing required fields

### `satisfies` > type assertions
Prefer:

```ts
const routes = {
  home: "/",
  settings: "/settings",
} satisfies Record<string, string>;
```

Avoid:
- `as Record<string, string>` (it can lie)

### `as const` for literal preservation
Use `as const` to keep literals and readonly tuples:

```ts
const roles = ["admin", "user"] as const;
type Role = (typeof roles)[number];
```

### Generics: when to add, when to stop
Add generics when:
- the function is truly reusable across types
- you can’t express it with overloads or unions

Stop adding generics when:
- it makes callsites harder to read than the benefit
- a domain-specific function would be clearer

Good generic:

```ts
export function groupBy<T, K extends string | number>(
  items: T[],
  key: (item: T) => K,
): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const k = key(item);
    (acc[k] ??= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}
```

### Avoid `as` casts (make invalid states unrepresentable)
Prefer:
- parse/validate data at boundaries (zod, valibot, bespoke guards)
- represent optionality explicitly
- use `never` to enforce exhaustiveness

```ts
function assertNever(x: never): never {
  throw new Error("Unexpected: " + String(x));
}
```

## tsconfig guidance (practical)
Recommended baseline:
- `strict: true`
- `skipLibCheck: true` (usually OK)
- `noEmit: true` in typecheck scripts
- `moduleResolution` aligned with your runtime/bundler

If using ESM:
- prefer NodeNext/Node16 module resolution
- avoid mixed CJS/ESM exports in the same package

## Atlarix tool notes
- **Ask**: use `search_code` to find `any`/`unknown` boundaries, and track how a value flows through modules.
- **Build**: fix types at boundaries first; avoid sprinkling casts. Use surgical edits for minimal diffs.
- **Review**: require exhaustiveness for important unions (request/response shapes, state machines).

## Common mistakes to avoid
- Using `any` for convenience instead of writing a small guard
- Using `Partial<T>` as a general-purpose escape hatch
- Repeating `as` casts instead of validating once
- Over-abstracting with generics that obscure intent
- Ignoring tsconfig drift across packages in a monorepo

## Mini-checklist
- Boundary inputs validated (`unknown` → narrowed)
- Domain types represent real invariants
- No “stringly typed” enums when a union would work
- Exhaustive `switch`/`if` for key unions
