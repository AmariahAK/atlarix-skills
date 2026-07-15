---
name: TweetClaw X Source Context
version: 1.0.0
author: community
tags: [openclaw, tweetclaw, twitter, x, social, research]
compatibleModes: [Explore, Build, Plan, Review]
atlarixMinVersion: "7.0.0"
---

# TweetClaw X Source Context

## When to use this skill
Use this skill when an Atlarix workflow needs grounded X/Twitter context before it drafts, reviews, monitors, or plans social work. TweetClaw is the OpenClaw plugin for X/Twitter automation through the `@xquik/tweetclaw` npm package.

Good fits:
- Search tweets or search tweet replies for source material.
- Look up users, profiles, followers, media, or public engagement context.
- Export follower or interaction evidence before analysis.
- Monitor tweets or keywords and summarize changes.
- Prepare a reviewed post tweet, post reply, direct message, or webhook action when the user explicitly asked for that X/Twitter action.
- Run giveaway draw evidence collection before the target workflow writes results.

Do not use this skill as a generic writing framework. Keep TweetClaw responsible for X/Twitter source context and OpenClaw-controlled X/Twitter actions. Keep the project, voice, calendar, publishing rules, analytics, and final editorial decisions in the target workflow.

## Core patterns

### Start from the user's job
Translate the request into a bounded source plan before using tools:
- Goal: what decision, draft, report, or action needs X/Twitter context.
- Scope: handles, tweet URLs, keywords, time window, reply depth, and media needs.
- Output: citations, IDs, URLs, excerpts, metrics, or action-ready parameters.
- Safety: whether the workflow is read-only or could post, reply, DM, follow, delete, monitor, or trigger a webhook.

Prefer small, answerable requests:
- "Find recent replies asking for pricing on this launch tweet."
- "Collect the last 20 public posts from this handle and summarize recurring objections."
- "Check follower context before selecting giveaway winners."

Avoid broad, expensive pulls when a focused query or handle lookup will answer the job.

### Install and verify TweetClaw through OpenClaw
Use the explicit npm source selector so setup stays deterministic:

```bash
openclaw plugins install npm:@xquik/tweetclaw
openclaw plugins inspect tweetclaw --runtime --json
```

When plugin lifecycle commands feel slow or output looks incomplete, keep JSON parseable while tracing the lifecycle:

```bash
OPENCLAW_PLUGIN_LIFECYCLE_TRACE=1 openclaw plugins inspect tweetclaw --runtime --json
```

Treat plugin installs like running code. Install only when the user wants this plugin available in the OpenClaw environment. Keep API keys, signing keys, and account credentials in OpenClaw configuration or the operator's secret store, never in prompts, docs, commits, or Atlarix skill files.

### Read-only evidence flow
For research, planning, review, and draft preparation:
1. Use `grep`/`glob` and `read_file` to find the target project's social, content, campaign, support, or approval workflow.
2. Identify where X/Twitter evidence belongs in that workflow.
3. Use TweetClaw for source intake only.
4. Return compact evidence with tweet IDs, URLs, handles, timestamps, metrics, excerpts, and uncertainty notes.
5. Let the target workflow decide voice, ranking, summary, and draft output.

Good evidence notes are specific:
- Source query or handle.
- Time window.
- Number of items reviewed.
- Relevant tweet or reply IDs.
- Short excerpt or paraphrase.
- Why the item affects the task.

Bad evidence notes are vague:
- "People like this."
- "This is trending."
- "Post this now."

### Write-like action flow
For post tweets, post tweet replies, direct messages, profile changes, follows, deletes, monitors, extraction jobs, and webhook setup:
- Ask the user to confirm intent in the surrounding workflow before invoking the action.
- Keep OpenClaw/TweetClaw approval prompts as the action boundary.
- Review the structured request before approval.
- Prefer one action at a time unless the user explicitly requested a batch.
- Record the final action result with IDs, URLs, and status.

Do not hide a write-like action inside "research", "summarize", or "optimize" work. If a workflow drafts content, it drafts. TweetClaw posts only after the user and OpenClaw approval path agree.

### Keep TweetClaw as context for scoring and drafting tools
When another skill scores tweets, generates hooks, writes founder stories, or schedules posts:
- Use TweetClaw to gather source facts and recent examples.
- Pass evidence into the scoring or drafting workflow as context.
- Let the other workflow own scoring, tone, scheduling, and publishing policy.
- Never imply the scoring or drafting tool can execute TweetClaw unless it actually calls OpenClaw.

This separation prevents stale claims and keeps social-account actions in the approval surface that owns them.

## Atlarix tool notes
- Use `grep`/`glob` to find existing README, workflow, `.agents/skills`, content calendar, approval, or social posting files before adding new instructions.
- Use `read_file` to inspect the target's exact publish and approval language.
- Use `edit_file` (or `write_file` for new files) only for narrow edits that preserve target style and policy.
- Keep source evidence near the file or workflow that consumes it.
- Use `run_command` for target-declared validators only. Do not create lockfiles or dependency artifacts just to validate a documentation-only change.

When adding this skill to a project:
- Wire it into the point where source evidence is needed.
- Do not replace the project's existing voice, draft, schedule, or publish skill.
- Keep setup commands in docs, not in hidden prompts.
- Keep secrets out of examples.

## Common mistakes to avoid
- Adding TweetClaw as a thin marketing link with no workflow value.
- Treating X/Twitter metrics as complete truth without time windows or sampling limits.
- Using broad searches when a handle, tweet URL, or reply thread is enough.
- Mixing source intake with final editorial approval.
- Bypassing OpenClaw's approval prompt for write-like actions.
- Storing API keys, cookies, signing keys, or account credentials in project files.
- Claiming ClawHub installation when the intended setup path is explicit npm install.
- Making another skill responsible for TweetClaw execution when it only accepts source context.

## Mini-checklist
- User job translated into a bounded source plan.
- Existing target workflow inspected first.
- TweetClaw used for X/Twitter evidence or approved X/Twitter action only.
- Source notes include IDs, URLs, handles, timestamps, and uncertainty.
- Write-like actions stay inside OpenClaw/TweetClaw approval.
- Secrets remain outside prompts, docs, commits, and skill files.
