---
name: extract-dev-notes
description: Extract durable, repository-level technical learnings from the current session and append them to docs/dev-notes.md.
allowed-tools: Read, Edit, MultiEdit, Write, Glob, Grep
---

Your job is to extract only the durable, repo-relevant technical insights from the current session and write them into `docs/dev-notes.md`.

This file is for:
- reusable debugging lessons
- implementation constraints discovered during development
- durable technical findings
- repo-relevant lessons that would help future work in this repository

This file is NOT for:
- generic tutorials
- trivial one-off mistakes
- long conversation summaries
- personal mindset reflection
- broad learning-system discussion unless it directly affects this repository

Workflow:
1. Read `docs/dev-notes.md` if it exists.
2. Inspect nearby docs if needed to avoid duplication:
   - `docs/status.md`
   - `docs/decision-log.md`
   - `docs/performance-notes.md`
   - `CLAUDE.md`
3. Extract only session outcomes that are worth preserving at the repo level.
4. Append a new dated section if there is durable value.
5. If there is no durable repo-level insight, do not add filler.

Use this format:

## YYYY-MM-DD — <short topic>

### Context
- what problem or task this related to

### What changed / what was learned
- 2-6 concrete bullets

### Reusable insight
- 1-3 bullets that would help future work in this repo

### Follow-up
- unresolved repo-level follow-ups only, if relevant

Selection rule:
Only include an item if it passes at least 2 of these:
- likely useful again in this repo
- expensive lesson if forgotten
- changed implementation or debugging behavior
- revealed a constraint, tradeoff, or failure mode
- worth more than 20 minutes if recovered later

Rules:
- Prefer concrete technical statements.
- Be conservative.
- Avoid duplication with decision-log or performance-notes.
- If something should really be promoted to `docs/decision-log.md` or `docs/performance-notes.md`, mention that after the edit.

After editing, briefly tell me:
- what you added
- what you left out on purpose
- whether anything should be promoted elsewhere