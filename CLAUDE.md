# Apple Memo Organizer

## Project Overview
Tool to organize Apple Notes: fetch, audit via LLM, suggest deletions/merges, execute actions.

## Architecture
- `scripts/fetch-memo.js` - JXA script (runs via osascript, NOT Node.js)
- `scripts/audit.js` - Node.js, calls OpenAI API
- `scripts/analyze.js` - Node.js, pure JS aggregation
- `prompts/audit.js` - LLM system prompts
- `utils/progress.js` - Node.js utilities (cannot be shared with JXA)

## Key Patterns

### JXA (JavaScript for Automation)
- Runs via `osascript -l JavaScript`, NOT Node.js
- No `import` — inline all helpers or use eval()
- Write to stderr for logging: `$.NSFileHandle.fileHandleWithStandardError.writeData(...)`
- stdout is for output (JSON), stderr is for logs

### Apple Notes Integration
- Get note ID: `note.id()` returns `x-coredata://UUID/ICNote/pXXX`
- Open specific note: `osascript -e 'tell application "Notes" to show note id "..."'`
- URL scheme `notes://showNote?identifier=` does NOT work

#### Opening Notes Programmatically (Solved)
**Problem:** Need to open Apple Notes and navigate to a specific note from Node.js.

**What didn't work:** `open "notes://showNote?identifier=..."` — opens app but doesn't navigate.

**What works:**
```bash
# Shell
osascript -e 'tell application "Notes" to show note id "x-coredata://..."'
```
```javascript
// Node.js
import { exec } from "child_process";
exec(`osascript -e 'tell application "Notes" to show note id "${appleId}"'`);
```

**Why:** URL schemes are unreliable. AppleScript commands the app directly via its scripting dictionary.

### JSON Files
- May have BOM: check `raw.charCodeAt(0) === 0xFEFF` and slice if needed

### LLM Usage
- OpenAI gpt-4o-mini: batch 20, parallel 5, ~100 notes/min
- Local LLM (Ollama 7B): context window issues, unreliable JSON — avoid for batch work

## User Preferences
- Coaching mode: give syntax examples, not full solutions
- Let user write the code, guide with patterns

## Current State
**Last updated**: 2026-03-06

**Accomplished this session**:
- Built full pipeline: fetch → audit → analyze
- Added `appleId` to enable opening notes in Apple Notes app
- Tested AppleScript approach for deep linking (works)
- Created action plan with delete/review/merge lists
- Set up CLAUDE.md and `/save-state` command
- Documented Apple Notes navigation solution in CLAUDE.md

**Current status**:
- Pipeline complete through analysis step
- 532 notes fetched, audited, action plan generated
- Data files: `data/notes-data.json`, `data/stage1-audit-report.json`, `data/action-plan.json`

**Next steps**:
- [ ] Build `scripts/actions.js` — interactive delete with batch preview
- [ ] Open each note in Notes app for review before confirming delete
- [ ] Add merge execution (combine notes with same hint)
- [ ] Improve merge_hint normalization (handle synonyms like "personal growth" vs "personal reflection")
