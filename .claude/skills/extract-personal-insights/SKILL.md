---
name: extract-personal-insights
description: Extract useful personal learning, workflow, and builder-pattern insights from the current session without writing them into repository docs.
allowed-tools: Read, Glob, Grep
---

Your job is to extract personal learning and workflow insights from the current session that are useful for the user, but should NOT be stored in repository docs.

This is for:
- learning-method insights
- builder workflow lessons
- personal debugging habits
- useful AI collaboration patterns
- recurring behavioral patterns that affect execution
- reflection that helps the user build more steadily

This is NOT for:
- repo-specific status tracking
- implementation details that belong in repo docs
- broad emotional journaling
- fluff or motivational language
- full conversation summaries

Output directly in chat using this structure:

## Personal insights from this session

### What seems to work
- 2-5 bullets

### Friction or recurring pattern
- 1-4 bullets

### AI collaboration pattern worth reusing
- 1-3 bullets

### Next personal operating adjustment
- 1-3 concrete actions

Rules:
- Do not edit repo files.
- Do not restate everything from the session.
- Focus on insights that could help the user in future sessions or projects.
- Be honest and concise.
- Distinguish clearly between:
  - project facts
  - personal execution patterns
  - reusable AI collaboration methods