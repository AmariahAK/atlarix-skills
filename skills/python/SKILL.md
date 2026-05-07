---
name: Python Patterns
version: 1.0.0
author: NorahLabs
tags: [python, backend, async, typing, packaging, testing]
compatibleModes: [Build, Debug, Review, Ask]
atlarixMinVersion: "7.0.0"
---

# Python Patterns

## When to use this skill
Use this skill when writing or reviewing modern Python code and you want consistent patterns for typing, async, structure, packaging, and correctness (especially in services, scripts, CLIs, and data tooling).

## Core patterns

### Type hints everywhere (and no bare `dict`)
Rules:
- Prefer precise types: `dict[str, Any]`, `Mapping[str, Any]`, `Sequence[T]`
- Use `Any` only at boundaries, not internally
- Prefer `Protocol` or `TypedDict` for structural contracts

Examples:

```py
from typing import Any

def parse_payload(payload: dict[str, Any]) -> tuple[str, int]:
    user_id = str(payload["user_id"])
    count = int(payload.get("count", 0))
    return user_id, count
```

### Dataclasses vs TypedDict vs Pydantic
Use:
- `dataclass`: internal domain objects, immutable-ish value types
- `TypedDict`: dict-shaped external payloads (JSON) when you want structural typing
- `pydantic` (or similar): validation + parsing at boundaries (API inputs, configs)

Pattern:
- Validate at boundaries, keep core logic on typed objects.

### Async patterns (avoid mixing sync/async)
Rules:
- If a call chain is async, keep it async.
- Do not call blocking IO inside `async def` (use thread pool or async libs).
- Prefer `httpx.AsyncClient`, async DB drivers, async queues.

Good:

```py
import httpx

async def fetch_json(url: str) -> dict[str, object]:
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.get(url)
        r.raise_for_status()
        return r.json()
```

Avoid:
- `requests` inside `async def`
- `time.sleep()` inside async code (use `await asyncio.sleep()`)

### Project structure (`src/` layout)
Prefer:

```
repo/
  pyproject.toml
  src/
    mypkg/
      __init__.py
      api.py
      services/
      cli/
  tests/
```

Benefits:
- prevents accidental imports from repo root
- clearer packaging boundaries

### Virtual environments
Preferred:
- `uv` for fast env + installs (if team agrees)

Fallback:
- `python -m venv .venv`
- `pip install -r requirements.txt`

Pattern:
- document setup in README
- pin with lockfiles when possible

### `pathlib` over `os.path`
`pathlib.Path` is more readable and composable.

```py
from pathlib import Path

def load_text(p: Path) -> str:
    return p.read_text(encoding="utf-8")
```

### Standard library power tools
Useful modules:
- `contextlib`: context managers, cleanup
- `itertools`: streaming transforms
- `functools`: caching, partials
- `dataclasses`: value objects
- `enum`: explicit categories

### `__all__` (use when you want a stable public API)
Use `__all__` for:
- library modules you expect others to import
- intentionally curated exports

Avoid `__all__` in internal-only modules unless it improves clarity.

## Atlarix tool notes
- **Ask**: use `search_code` to find where types are missing, where sync/async boundaries are crossed, and how modules are structured.
- **Build**: add typing and boundary validation incrementally with small edits; run `pytest` and linters if configured.
- **Debug**: reproduce with minimal input; inspect stack traces for the first application frame; log structured context.
- **Review**: check correctness at boundaries: input validation, error messages, and that async code doesn’t block.

Tool suggestions:
- Use Blueprint tools to locate entry points (`main`, CLI commands, web app factories) and follow the call graph.
- Use `run_command` (Build) for `pytest`, `ruff`, and `mypy` when present.

## Packaging and configuration patterns

### `pyproject.toml` basics
- Keep build metadata and tool config in one place.
- Prefer `ruff` for linting and formatting; prefer `mypy` for type checking when the project benefits from it.
- Treat tool warnings as action items, not noise.

### Dependency boundaries
- App/service code should depend on libs; libs should not depend on app wiring.
- Prefer injecting clients (HTTP/DB) instead of creating them globally.

## Common mistakes to avoid
- Leaving boundary payloads untyped (`dict` everywhere)
- Using `Any` internally instead of narrowing
- Mixing blocking IO into async code
- Overusing exceptions for control flow
- Hidden global state (module-level singletons) without clear lifecycle
- Large functions that mix parsing/validation with business logic

## Mini-checklist (before merging)
- Public functions have return types
- Boundary payloads validated (Pydantic/TypedDict + checks)
- Async code uses async libraries end-to-end
- Errors include actionable context (what failed + why)
