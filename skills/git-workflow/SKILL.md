---
name: Git Workflow
version: 1.0.0
author: NorahLabs
tags: [git, workflow, commits, branching, pr, code-review]
compatibleModes: [Explore, Build, Plan]
atlarixMinVersion: "7.0.0"
---

# Git Workflow

## When to use this skill
Use this skill when you want a clean Git history (easy reviews, easy rollbacks) and consistent PR hygiene—especially when an agent is helping you make changes across multiple files.

## Core patterns

### Conventional commits (recommended)
Format:

`<type>(<scope>): <summary>`

Types:
- `feat`: new behavior or capability
- `fix`: bug fix
- `refactor`: behavior-preserving code change
- `docs`: documentation only
- `test`: tests only
- `chore`: tooling, deps, CI, non-product changes

Examples:
- `fix(chat): always emit response end on errors`
- `feat(skills): add registry scaffolding and validation`
- `refactor(compaction): centralize execution path`

Breaking changes:
- Add `!` after type/scope: `feat(api)!: change auth token format`
- Or add `BREAKING CHANGE:` in body

### Branch naming
Use a consistent prefix:
- `feat/<short-kebab>`
- `fix/<short-kebab>`
- `docs/<short-kebab>`
- `chore/<short-kebab>`

Examples:
- `feat/skills-registry`
- `fix/stream-terminal-event`

### Atomic commits
Rule: **one logical change per commit**.

Good:
- Commit 1: “Add tool contract block”
- Commit 2: “Update read_attachment prompt examples”

Bad:
- “Fix everything” commit that mixes UI, backend, and docs

### Squash vs merge vs rebase
- **Squash merge**: best for feature branches with messy WIP commits
- **Merge commit**: best when you want to preserve full branch context (rare for small changes)
- **Rebase**: good for keeping a linear history, but be careful on shared branches

Guideline:
- If a PR has 10+ micro commits (“fix lint”, “oops”), squash before merging.
- If commits are already atomic and readable, merge without squashing.

### Writing PR descriptions (what/why/how/testing)
Good PRs are reviewable because they explain intent:

Template:
- **What changed**: the user-visible / system-visible behavior
- **Why**: the problem or constraint
- **How**: the approach (short)
- **Test plan**: exact commands + manual steps

### Conflict resolution workflow
When conflicts happen:
1. Rebase or merge main into your branch
2. Resolve conflicts by choosing **intent**, not just “keep both”
3. Re-run tests
4. Confirm build/typecheck

Avoid:
- resolving conflicts by “accept theirs” blindly
- shipping conflict markers

### `.gitignore` hygiene
Always ignore:
- build outputs (`dist/`, `out/`, `.next/`)
- local env (`.env`, `.env.local`)
- OS/editor noise (`.DS_Store`, `.vscode/` as appropriate)
- secrets (`*.pem`, `credentials.json`)

## Atlarix tool notes
In Atlarix, Git workflows are best when you keep the agent honest about what’s staged and why:

- Before committing: inspect **unstaged vs staged** changes
- Keep PR scope small; split large work into multiple PRs
- Don’t commit secrets; treat `.env` as untracked

Suggested Git tool flow (Build mode):
- `git status` → confirm scope
- `git diff` → review what you’re about to stage
- `git add <paths>` → stage only relevant files
- `git diff --staged` → final review
- `git commit -m ...` → message that explains why

## Common mistakes to avoid
- “Drive-by refactors” inside bug-fix PRs
- Committing generated files unintentionally
- Mixing dependency updates with feature code
- Large PRs with no test plan
- Commit messages that describe “what” but not “why”

## Mini-checklist
- Branch name matches intent
- Commits are atomic
- PR description includes test plan
- Diff reviewed before commit
- No secrets or local env committed

