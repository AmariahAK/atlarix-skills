---
name: Next.js App Patterns
version: 1.0.0
author: NorahLabs
tags: [nextjs, react, fullstack, app-router, server-components, typescript]
compatibleModes: [Build, Debug, Review, Explore]
atlarixMinVersion: "7.0.0"
---

# Next.js App Patterns (App Router)

## When to use this skill
Use this skill when working in a Next.js **App Router** codebase (Next.js 14+) and you need safe patterns for server vs client components, data fetching, routing, and deployment without introducing hydration bugs or accidental client bundles.

## Core patterns

### Decision tree: Server vs Client component
Rule: **start server, add `"use client"` only when needed**.

Use a Server Component when you:
- fetch data (DB/API) and can render on the server
- need to keep secrets on the server
- want smaller client bundles

Use a Client Component when you:
- use React state/effects (`useState`, `useEffect`, `useRef`)
- attach event handlers (`onClick`, `onChange`)
- use browser-only APIs (`window`, `localStorage`)
- use client-only libs (most UI animation libs, some charts)

Pattern:
- `page.tsx` / `layout.tsx` typically server
- interactive leaf components client

### Data fetching patterns
Prefer server fetching:
- Fetch in Server Components with `fetch()` (or a server SDK)
- Use `cache`, `revalidate`, and route segment config intentionally

Client fetching (when needed):
- Use SWR/React Query for interactive UIs that need refetching
- Keep request boundaries small; avoid fetching “entire page” on client

### Route Handlers vs Server Actions
Use **Route Handlers** (`app/api/.../route.ts`) when:
- you need an API surface for multiple clients
- you need webhooks
- you need fine control over HTTP (status, headers)

Use **Server Actions** when:
- the action is primarily triggered from your UI
- you want type-safe form submissions and simpler wiring

Avoid:
- putting business logic directly in route handlers; call shared services

Example: route handler boundary:

```ts
// app/api/health/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true });
}
```

Example: server action boundary:

```ts
// app/actions.ts
"use server";

export async function updateProfile(_formData: FormData) {
  // validate input, call server service, redirect or return structured result
}
```

### Caching and revalidation (be explicit)
Key ideas:
- `fetch()` caching defaults can surprise you; be explicit when correctness matters.
- Prefer cache semantics close to the callsite, not as global magic.

Rules of thumb:
- For mostly-static data: `revalidate` periodically.
- For user-specific data: avoid caching unless you’re sure it’s keyed correctly.
- For pages that must always be fresh: opt out of caching at the relevant boundary.

### Environment variables
Rules:
- `NEXT_PUBLIC_*` is exposed to the browser
- server-only vars must never be referenced in client components

Pattern:
- create a `env.ts` module for server-only validation
- read client vars only where needed

### Layout vs Page pitfalls
Remember:
- `layout.tsx` persists across routes in the segment; state can persist too
- `page.tsx` re-renders per navigation

Common pitfall:
- placing per-page transient UI state in a layout, then wondering why it persists

### Metadata API
Use `generateMetadata()` for dynamic metadata, but keep it cheap:
- avoid heavy DB calls unless required
- prefer deriving metadata from already-fetched data when possible

### Avoiding hydration errors
Typical causes:
- rendering `Date.now()`, random IDs, or locale-dependent formatting on server
- using `window`/`document` in server components
- conditional rendering that differs between server and client

Fix patterns:
- compute unstable values in client `useEffect`
- use `suppressHydrationWarning` only as a last resort

### File + module boundaries
Good structure:
- `app/` routing + UI
- `src/server/` services, DB, auth (server-only)
- `src/shared/` types and utilities safe for both

Enforce boundaries:
- avoid importing server modules from client components

## Atlarix tool notes
Use Atlarix tools to stay tool-driven and avoid guessing Next.js internals:

- **Explore**: use `grep`/`glob` to find route segments, route handlers, server actions, and data fetching patterns; inspect `layout.tsx` boundaries.
- **Build**: use `read_file` + surgical edit tools for small changes, then run the project’s checks (often `next lint`, `vitest`, `playwright`).
- **Debug**: when you see hydration errors, follow the stack trace to the component path and confirm server/client boundaries.
- **Review**: check accidental client bundle growth (client components importing large deps) and secret exposure (server-only envs in client code).

Useful checks:
- Are we fetching on the server when we can?
- Did we accidentally add `"use client"` too high in the tree?
- Are env vars referenced in the correct layer?
- Are we relying on unstable values during server render?

## Deployment notes (Vercel vs self-hosted)
- **Vercel**: defaults work well; be mindful of edge/runtime settings and `revalidate` behavior.
- **Self-hosted**: ensure Node version matches Next requirements; set correct `NODE_ENV`, and validate `output`/standalone config if used.
- Prefer explicit runtime choices: Node vs Edge (Edge has limitations: some Node APIs unavailable).

## Common mistakes to avoid
- Marking an entire page/route segment as `"use client"` to “make it work”
- Fetching secrets on the client
- Importing server-only modules into client components (even indirectly)
- Creating hydration mismatches with unstable values
- Putting per-page transient state in a persistent layout segment unintentionally
- Over-caching or under-caching: not setting `revalidate`/cache semantics intentionally

## Quick checklist (review pass)
- Server/client boundaries are intentional and minimal
- Data fetching is done at the correct layer
- Route handlers are used for API/webhooks; server actions for UI-driven mutations
- Env vars are correctly scoped (`NEXT_PUBLIC_` only when needed)
- Hydration risk points are addressed (dates/randomness/browser APIs)
