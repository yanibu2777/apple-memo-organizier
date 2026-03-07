# Apple Memo Organizer

## Project Overview
Tool to organize Apple Notes: fetch notes, audit them via LLM, suggest deletions or merges, and execute user-confirmed actions.

This repo may involve coding help, architecture discussion, learning discussion, and workflow discussion in the same Claude Code session. That is fine. However, only **repo-relevant outputs** should be written into repo docs.

## Architecture
- `scripts/fetch-memo.js` - JXA script for fetching Apple Notes data
- `scripts/audit.js` - Node.js script that calls OpenAI
- `scripts/audit-local-llm.js` - local-model audit experiments
- `scripts/analyze.js` - Node.js aggregation / analysis
- `scripts/enrich-audit.js` - maps audit results to `appleId`
- `scripts/actions.js` - interactive review and action execution flow
- `prompts/audit.js` - system prompt definitions
- `utils/` - shared Node.js utilities
- `docs/status.md` - latest project state and next steps
- `docs/dev-notes.md` - durable repo-level technical learnings
- `docs/performance-notes.md` - performance experiments and benchmark evidence
- `docs/decision-log.md` - important technical decisions and tradeoffs

## Collaboration Preferences
- Coaching mode by default.
- Prefer syntax examples, patterns, and reasoning over full end-to-end solutions unless explicitly requested.
- Help the user write the code rather than silently doing large chunks for them.
- Be concrete and technically precise.
- Clearly distinguish between:
  - repo-level output
  - personal learning / reflection
  - temporary discussion noise

## Repo Guardrails
- `scripts/fetch-memo.js` runs in JXA, not standard Node.js.
- When helping with JXA code, avoid generic Node-only assumptions.
- For opening Apple Notes by note id, use AppleScript / Notes scripting, not `notes://showNote?identifier=...`.

## Documentation Rules
Use the right destination for the right kind of information.

### `docs/status.md`
Use for:
- current focus
- accomplished this session
- current status
- next steps

### `docs/dev-notes.md`
Use for:
- durable repo-level technical learnings
- reusable debugging lessons
- implementation constraints discovered during development
- technical findings worth preserving for future work in this repo

### `docs/performance-notes.md`
Use for:
- benchmark results
- throughput comparisons
- model/runtime experiments
- performance evidence

### `docs/decision-log.md`
Use for:
- major technical decisions
- tradeoffs
- why one option was chosen over another

Do not store in repo docs:
- generic tutorial content
- trivial one-off mistakes
- long conversational summaries
- personal mindset reflection unless it directly affects repo collaboration or implementation
- broad life-system planning

## Session Start Rule
At the beginning of a new session:
1. Read this file.
2. Read `docs/status.md`.
3. Check other docs only if needed for the current task.

## Documentation Map
- Latest project state: `docs/status.md`
- Durable repo learnings: `docs/dev-notes.md`
- Performance experiments: `docs/performance-notes.md`
- Major decisions: `docs/decision-log.md`