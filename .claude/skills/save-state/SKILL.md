---
name: save-state
description: Update docs/status.md with the latest project progress, current state, and next steps from the current session.
allowed-tools: Read, Edit, MultiEdit, Write, Glob, Grep
---

Your job is to update `docs/status.md` based on the current Claude Code session.

Purpose:
- Make it easy for a future session to quickly understand where the project stands.
- Keep project state out of `CLAUDE.md`.
- Record only concise, project-relevant status.

Instructions:
1. Read `docs/status.md` if it exists.
2. Infer the most important project progress from the current session.
3. Update or create `docs/status.md` with exactly these sections:

# Current Status

## Last updated
<today's date>

## Accomplished this session
- concise bullet points of what was done
- focus on implementation progress, meaningful discussion outcomes, or repo-documentation changes
- avoid trivial steps

## Current status
1-3 concise lines describing where the project currently stands.

## Next steps
- 2-5 concrete next actions
- phrased as near-term implementation steps

Rules:
- Keep it concise.
- Do not modify `CLAUDE.md`.
- Do not add long summaries of the conversation.
- Do not include personal mindset or life-system reflections unless they directly changed the implementation path.
- Prefer concrete facts over vague phrasing.
- If the session did not materially change project state, update only the date if appropriate and say so clearly.

After editing, briefly tell me:
- what you updated
- any ambiguity you had about current status