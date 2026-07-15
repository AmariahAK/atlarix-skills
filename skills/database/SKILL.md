---
name: Database Patterns
version: 1.0.0
author: NorahLabs
tags: [database, sql, postgresql, sqlite, drizzle, prisma, migrations]
compatibleModes: [Build, Debug, Explore]
atlarixMinVersion: "7.0.0"
---

# Database Patterns

## When to use this skill
Use this skill when designing schemas, writing queries, or shipping migrations—especially when correctness and safety matter more than clever SQL.

## Core patterns

### Always parameterize queries (never string concat)
Bad:
- `"... WHERE id = " + userId`

Good:
- placeholders / prepared statements
- ORM query builders

### Index strategy (minimal and intentional)
Add indexes for:
- foreign keys used in joins
- columns used in frequent filters (`WHERE`)
- columns used in sorting (`ORDER BY`) on large tables

Avoid:
- indexing everything (writes get slower)
- redundant composite indexes

### Migration safety (backward compatible)
Rules:
- additive first: add column nullable → backfill → enforce NOT NULL later
- don’t drop columns in the same migration as adding replacements
- avoid long locks on hot tables (use online patterns where possible)

### Transactions
Use transactions for:
- multi-step writes that must succeed/fail together
- invariants across rows/tables

Avoid:
- long-running transactions that hold locks during network calls

Example (pseudo-SQL):

```sql
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = :from_id;
  UPDATE accounts SET balance = balance + 100 WHERE id = :to_id;
COMMIT;
```

### N+1 detection
Symptoms:
- a loop that queries per item
- slow endpoints that scale with list size

Fix patterns:
- join + aggregate
- `IN (...)` query
- preloading/relations in ORM

### SQLite-specific quirks
- Consider WAL mode for concurrency
- Be careful with “type affinity” (validate types at boundaries)
- Prefer STRICT tables if available in your SQLite version

### Connection pooling
- Use pooling for server apps
- Use one-off connections for scripts (but close them)

### Schema design: constraints are your friend
Prefer database-enforced invariants:
- NOT NULL for required fields
- UNIQUE for natural keys where appropriate
- CHECK constraints for bounded enums / ranges

Why:
- catches bugs earlier than application code
- prevents “invalid state” from ever being stored

### Query hygiene: return only what you need
Avoid:
- `SELECT *` in hot paths
- returning huge JSON blobs by default

Prefer:
- selecting columns intentionally
- pagination for large lists
- summaries + drill-down endpoints

### Safe backfills
Backfill patterns:
1. add nullable column
2. backfill in batches
3. deploy code that writes new column
4. enforce constraint later

For large tables:
- batch with a stable ordering key
- avoid long transactions
- monitor locks

## Atlarix tool notes
- Use `run_command` to run the project's database CLI or ORM for reads and diagnostics (e.g. `psql`, `sqlite3`, `prisma studio`).
- Use `run_command` for writes (migrations, seeds) only when you’re confident—destructive statements still pause for approval.
- In Explore mode, reason about schema/queries without mutating.

When debugging:
- start with a minimal repro query
- inspect query plan when possible
- check indexes and cardinality
- confirm the shape of returned data matches the caller’s expectations

## Common mistakes to avoid
- SQL injection via string concatenation
- Non-idempotent migrations
- Dropping columns too early
- N+1 query loops
- Missing indexes on join keys
- Long transactions that include network calls
- “Fixing” performance by adding indexes without understanding the query pattern

## Mini-checklist
- Queries parameterized
- Migrations are backward compatible
- Transactions used for invariants
- Indexes are intentional
- No N+1 loops in hot paths

