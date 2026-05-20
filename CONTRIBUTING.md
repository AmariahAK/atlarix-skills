## Contributing to Atlarix Skills Registry

Thanks for your interest in contributing to the official **Atlarix Skills Registry**.
We welcome contributors of all skill levels.

### 1) Who can contribute
- Anyone can contribute.
- First-time open source contributors are welcome.
- If you’re unsure where to start, open a “New Skill Request” issue.

### 2) What makes a good skill
A good skill:
- Solves a **real, recurring** developer problem.
- Is **tool-aware**: references Atlarix tools where relevant (e.g. `read_file`, `write_file`, `search_code`, Blueprint tools, `db_query`, `db_mutate`, etc.).
- Is **100–400 lines** (not a cheatsheet, not a textbook).
- Has a clear, specific **“When to use this skill”** section.
- Has been tested against **at least one real project** (even a small toy repo).

### 3) Skill structure
Every skill must be a `skills/<id>/SKILL.md` file with frontmatter and sections:

```markdown
---
name: <display name>
version: 1.0.0
author: NorahLabs
tags: [tag1, tag2, ...]
compatibleModes: [Build, Review, Ask, Debug, Plan]
atlarixMinVersion: "7.0.0"
---

# <Skill Name>

## When to use this skill
...

## Core patterns
...

## Atlarix tool notes
...

## Common mistakes to avoid
...
```

### 4) Submitting a new skill
1. Fork the repo.
2. Create a new skill directory: `skills/<id>/`
3. Add `skills/<id>/SKILL.md`
4. Add an entry to `index.json` (see rules below).
5. Open a PR using the PR template.

### 5) Updating an existing skill
1. Update `skills/<id>/SKILL.md`.
2. Bump the `version` in the skill frontmatter.
3. Bump the matching `version` for that skill entry in `index.json`.
4. In the PR description, explain what changed and why.

### 6) Auto-sync vs hand-curated skills

- **Hand-curated:** `skills/<id>/SKILL.md` with **no** `.sync-source.json` — maintained via PR; never overwritten by `npm run sync`.
- **Synced:** added by `scripts/sync.mjs` from upstream repos; includes `.sync-source.json`. Marked `needsReview: true` in `index.json`. Patch via `skills.overrides.json` (`exclude: true` to remove).

```bash
npm run sync:dry-run
npm run sync
```

### 7) `index.json` rules
- `id` must be **lowercase kebab-case** and match the folder name under `skills/`.
- The `files[].url` must be the **raw GitHub URL** (not the repo page URL), e.g.:\n  `https://raw.githubusercontent.com/AmariahAK/atlarix-skills/main/skills/<id>/SKILL.md`\n+- All fields in each skill entry are required.

### 8) Review process
- Maintainers aim to review PRs within **7 days**.
- Feedback is given via GitHub review comments.
- Please respond to feedback and push updates in the same PR.

### 9) What we won’t accept
- Skills that reference non-existent Atlarix tools.
- Placeholder content (“TODO”, “lorem ipsum”, empty sections).
- Duplicates of existing skills without clear differentiation.
- Skills that are primarily marketing or vendor promotion.

### 10) License
By contributing, you agree that your contributions are licensed under the
**Apache 2.0** license (see `LICENSE`).

