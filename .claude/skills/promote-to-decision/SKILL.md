---
name: promote-to-decision
description: Promote a clearly established repo-level decision from current session context or existing repo notes into docs/decision-log.md.
allowed-tools: Read, Edit, MultiEdit, Write, Glob, Grep
---

Your job is to add a formal decision entry to `docs/decision-log.md`, but only when a real repo-level technical decision has actually been established.

Use `$ARGUMENTS` as an optional focus hint for which decision to promote.

A valid decision should satisfy most of these:
- a real option tradeoff existed
- one option was actually chosen
- the choice affects implementation or future work
- the reason is clear enough to explain
- the decision is stable enough to be worth formalizing

Do NOT create a decision entry for:
- vague preferences
- open questions
- brainstorming ideas
- temporary guesses
- half-formed discussion

Workflow:
1. Read `docs/decision-log.md` if it exists.
2. Read nearby context if useful:
   - `docs/dev-notes.md`
   - `docs/status.md`
   - `docs/performance-notes.md`
   - `CLAUDE.md`
3. Identify the candidate decision from the current session and/or existing notes.
4. If no real decision is established, do not edit the file. Say so clearly.
5. If a valid decision exists, append a new entry using the format below.

Use this format:

## YYYY-MM-DD — <short decision title>

### Context
1-3 concise lines describing the problem or situation.

### Options considered
- option A
- option B
- option C (if relevant)

### Decision
State clearly what was chosen.

### Why
- 2-5 bullets explaining the reasoning

### Tradeoffs
- 1-4 bullets describing costs, limitations, or downsides

### Revisit when
Describe when this decision should be revisited, if relevant.

Rules:
- Be concrete.
- Do not invent certainty.
- Do not rewrite existing entries unless explicitly needed.
- Avoid duplication.
- If the material is not mature enough for a decision-log entry, say:
  "This is not yet a stable enough decision to promote."

After editing, briefly tell me:
- what decision you added
- why it qualified as a real decision
- whether anything remains unresolved