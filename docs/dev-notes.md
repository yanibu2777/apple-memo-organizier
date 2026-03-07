# Dev Notes

## 2026-03-07 — Repo doc split and state handling

### Context
- Clarified the role split between `CLAUDE.md`, `docs/status.md`, and repo knowledge docs.
- Needed a cleaner way to let future Claude Code sessions quickly load project state without overloading root instructions.

### What changed / what was learned
- `CLAUDE.md` should act as a repo collaboration guide, not a running state log.
- Fast-changing project progress should live in `docs/status.md`.
- Durable technical learnings should live in `docs/dev-notes.md`.
- Performance evidence should be kept separate from general repo notes.

### Reusable insight
- Separate stable repo instructions from fast-changing project state.
- Same session can mix coding, learning, and design discussion, but saved outputs should still be split by destination.

### Follow-up
- Keep future repo learnings concise and durable.
- Promote major implementation choices into `docs/decision-log.md` when the tradeoff is clear.

## 2026-03-07 — Apple Notes opening should use scripting, not URL schemes

### Context
- Needed a reliable way to open a specific Apple Note programmatically from Node.js.

### What changed / what was learned
- `notes://showNote?identifier=...` is not reliable for navigating to a specific note.
- AppleScript / Notes scripting with `show note id` works reliably for this repo's use case.
- Node.js can trigger this through `osascript`.

### Reusable insight
- When app URL schemes are unreliable, prefer the app's scripting interface if available.
- For Apple Notes note navigation in this repo, use AppleScript with note id.

### Follow-up
- Keep note-opening behavior consistent in `scripts/actions.js`.

## 2026-03-07 — JXA and Node.js assumptions must stay separate

### Context
- This repo uses both JXA and Node.js in different parts of the pipeline.

### What changed / what was learned
- JXA scripts should not be treated as normal Node.js scripts.
- Shared assumptions about imports, runtime APIs, and utility reuse can break if runtime boundaries are ignored.
- Output discipline matters when a JXA script is part of a machine-readable pipeline.

### Reusable insight
- Confirm runtime before suggesting code changes.
- Keep JXA-specific constraints explicit when working on `fetch-memo.js`.

### Follow-up
- Maintain a clear separation between JXA-specific code and shared Node utilities.