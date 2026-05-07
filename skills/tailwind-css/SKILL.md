---
name: Tailwind CSS Patterns
version: 1.0.0
author: NorahLabs
tags: [css, tailwind, ui, frontend, design-system]
compatibleModes: [Build, Review, Ask]
atlarixMinVersion: "7.0.0"
---

# Tailwind CSS Patterns

## When to use this skill
Use this skill when styling UI with Tailwind and you want consistent design tokens, maintainable class composition, and good accessibility defaults.

## Core patterns

### Prefer composition over duplication
Patterns:
- extract reusable components
- use `clsx`/`classnames` utilities
- define design tokens in Tailwind config (colors, spacing)

### Avoid “utility soup”
If a class list is too long:
- extract a component
- extract a `const` className
- use variants (cva) if the project supports it

### Accessibility defaults
Checklist:
- focus styles visible
- color contrast acceptable
- form inputs labeled

### Responsive design
- mobile-first classes
- keep breakpoints consistent

## Atlarix tool notes
- **Ask**: find Tailwind config and existing component patterns.
- **Build**: keep styles close to components; avoid global CSS unless needed.
- **Review**: check accessibility and consistency with design system.

## Common mistakes to avoid
- Inconsistent spacing/colors across components
- Removing focus styles
- Using arbitrary values everywhere instead of tokens

## Mini-checklist
- Reusable components extracted
- Tokens used consistently
- Focus/labels present

