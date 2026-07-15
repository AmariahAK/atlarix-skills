---
name: MCP Server Builder
version: 1.0.0
author: NorahLabs
tags: [mcp, tools, integrations, typescript, protocol]
compatibleModes: [Build, Explore]
atlarixMinVersion: "7.0.0"
---

# MCP Server Builder

## When to use this skill
Use this skill when building a Model Context Protocol (MCP) server to expose tools/resources/prompts to Atlarix (or other MCP clients), and you want correct schemas, safe handlers, and reliable local testing.

## Core patterns

### MCP server anatomy
MCP servers usually expose:
- **Tools**: callable functions with `inputSchema`
- **Resources**: addressable data (URI templates), with MIME types
- **Prompts**: reusable prompt templates (optional)

### Tool definitions (name, description, inputSchema)
Rules:
- Names are stable, lowercase, snake_case or kebab-case
- Descriptions are action-oriented (“Use this to…”)
- `inputSchema` is strict enough to prevent garbage input

Validate input *even if* schema exists—treat schema as first line of defense.

### Tool handlers: return structured results
Rules:
- Always validate input
- Always return structured JSON (or well-typed content) on success
- Never throw raw errors; wrap into `{ success: false, error: "..." }` where appropriate

Example result shape:

```ts
return {
  success: true,
  result: { id: "123", status: "ok" }
};
```

### Resources: URI templates + MIME types
Pattern:
- `resource://logs/{id}`
- return `text/plain`, `application/json`, etc.

Avoid:
- returning huge blobs by default (add pagination or “summary then expand”)

### Transport: stdio vs HTTP
Use **stdio** when:
- local tools
- launched by a desktop client

Use **HTTP** when:
- remote service
- multi-tenant environment
- you need auth, rate limiting, observability

### Testing with mcp-inspector
Run locally and verify:
- tool list appears
- schemas validate
- error cases are readable

Common errors:
- schema mismatch (client sends `{}` but server expects `string`)
- handler returns wrong shape
- transport not wired (stdio streams not flushed)

### Safety patterns for mutating tools
If a tool can mutate state (filesystem, DB, deployments):
- require explicit parameters that make the operation unambiguous
- add a “dry run” mode where possible
- return a preview/plan object the client can display
- avoid “delete everything” endpoints

### Versioning tools
When you change a tool:
- keep name stable if semantics are compatible
- otherwise add a new tool name and deprecate the old
- document breaking changes in the repo and in tool descriptions

## Atlarix tool notes
- Add the MCP server via **Settings → Tools → MCP**.
- Prefer small, composable tools over a single “do everything” tool.
- If a tool can mutate user data, design it to require explicit confirmation in the UI.

Recommended development loop:
- implement tool → test in mcp-inspector → add to Atlarix → run a real workflow

When designing tools for Atlarix agents:
- keep outputs concise by default (IDs + summaries; add “expand” tools if needed)
- prefer deterministic outputs (stable keys, predictable structures)

## Common mistakes to avoid
- Overly permissive schemas that allow invalid input
- Throwing raw errors (leads to unclear UX)
- Returning massive payloads without pagination
- Creating tools that do multiple unrelated things
- Shipping tools without local test coverage
- Returning unvalidated input downstream
- Building a single mega-tool instead of small composable tools

## Mini-checklist
- Input validated
- Output structured
- Error messages actionable
- Resource payloads bounded
- Tested via mcp-inspector
- Mutating tools are safe-by-design

