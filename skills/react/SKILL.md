---
name: React Component Patterns
version: 1.0.0
author: NorahLabs
tags: [react, frontend, components, hooks, context, typescript, performance]
compatibleModes: [Build, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# React Component Patterns

## When to use this skill
Use this skill when you’re building or refactoring React components in a production app and want **consistent patterns** for typing, composition, state, and performance without introducing premature abstraction.

## Core patterns

### Functional components only
- Prefer function components with named exports.
- Keep props explicit and stable (avoid `...rest` unless you’re building a wrapper that truly forwards).

Example:

```tsx
export interface ButtonProps {
  variant?: "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ variant = "primary", disabled, onClick, children }: ButtonProps) {
  return (
    <button data-variant={variant} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
```

### Prop typing with interfaces (and when to use `type`)
- Use `interface` for public component props (extends well, readable in IDEs).
- Use `type` for unions, helpers, and composition.
- Prefer **narrow** props over “god props”.

Patterns:
- `interface XProps { ... }`
- `type Variant = "a" | "b"`
- `type Props = XProps & { ... }` when combining.

### Controlled inputs (default for forms)
Controlled inputs make state explicit and testable.

Pattern:
- Keep the source of truth in parent.
- Child receives `value` + `onChange(next)`.

```tsx
export interface TextFieldProps {
  value: string;
  onChange: (next: string) => void;
  label?: string;
}

export function TextField({ value, onChange, label }: TextFieldProps) {
  return (
    <label>
      {label}
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
```

### Component file structure (predictable + scalable)
For `components/Foo/`:
- `Foo.tsx` (component)
- `Foo.test.tsx` (tests)
- `Foo.stories.tsx` (storybook if used)
- `types.ts` (shared types) only if it grows

Avoid:
- gigantic `index.ts` barrels that hide imports
- “utils.ts dumping ground”

### Custom hooks: naming + return shapes
Rules:
- Hook names start with `use`.
- Prefer returning an object for long-lived hooks (easier to add fields without breaking callsites).
- Prefer returning a tuple only when it’s a small, stable pair (like `[value, setValue]`).

```ts
export function useDisclosure(initial = false) {
  const [open, setOpen] = React.useState(initial);
  return {
    open,
    openNow: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen((v) => !v),
  };
}
```

### Dependency arrays (the rule of “prove it needs to be memoized”)
Most apps do not need `useMemo`/`useCallback` everywhere.

Use memoization when:
- passing callbacks to memoized children that re-render often
- expensive computations (measurable)
- stable references needed for `useEffect` / subscriptions

Avoid memoization when:
- it adds complexity but provides no measurable benefit
- it hides stale closure bugs

### `memo`, `useMemo`, `useCallback`: when they help
Guideline:
- Start simple.
- Add memoization only after you have a reason (profiling, observed re-render hotspots).

Common anti-pattern:
- wrapping everything in `useCallback` “just in case”

### Context: when to use it vs Zustand/Redux
Use React Context for:
- truly global-ish app concerns: auth user, theme, feature flags, i18n, routing helpers
- stable, low-frequency updates

Avoid Context for:
- high-frequency state (typing, dragging)
- large mutable collections that trigger wide re-renders

If you need app-wide, high-frequency state:
- consider a store (Zustand/Redux/Jotai) with selector-driven renders

### Avoiding prop drilling (without over-abstracting)
Options in order:
1. Lift state only as far as needed (nearest common parent)
2. Split components (parent handles state, child is presentational)
3. Use a local context scoped to a feature subtree
4. Use a store only when multiple distant subtrees truly need it

### Compound components (good for flexible UI APIs)
Pattern:
- `<Menu>` provides context
- `<Menu.Button>` and `<Menu.Items>` consume it

Benefits:
- flexible composition
- clear usage at callsite

### Render props (use sparingly)
Render props are useful when you want to expose internal state without forcing component structure.
Prefer hooks first; use render props when you need to interleave layout and control.

## Atlarix tool notes
- In **Explore** mode: use `grep`/`glob` to find component usage patterns; use `read_file` to inspect existing props and state flow.
- In **Build** mode: make small, atomic edits with `edit_file`, then run tests.
- For large refactors: use `grep`/`glob` to locate entry points and affected components, then read them with `read_file`.
- For UI regressions: use `run_command` (Build mode) to run `vitest`/`playwright` or the project’s test scripts.

When reviewing a component, check:
- prop surface area (can we split?)
- state ownership (is it in the right place?)
- effects (are dependencies correct?)
- accessibility (labels, keyboard, focus)

## Common mistakes to avoid
- Adding `useMemo`/`useCallback` everywhere “for performance” without measuring
- Using Context for rapidly changing state and causing app-wide re-renders
- Creating hooks that return unstable functions/objects without a reason
- Overusing `any` in props; prefer precise unions and `unknown` where needed
- Mixing data fetching responsibilities inside presentational components
- Hiding complexity in barrels and circular imports
