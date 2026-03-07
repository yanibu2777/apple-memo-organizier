# Decision Log

## 2026-03-07 — Derive action plan at runtime, persist user decisions separately

### Context
The project is moving from audit and analysis into interactive review and action execution.
The system needs to stay reusable while preserving user-confirmed choices across runs.

### Options considered
- Persist full derived action plans
- Derive action plans at runtime and persist only user decisions

### Decision
Derive action plans at runtime and persist user decisions in `user-decisions.json`.

### Why
- Keeps derived output fresh as source data changes
- Avoids storing stale action plans
- Separates computed state from durable user intent

### Tradeoffs
- Requires runtime derivation logic
- Needs stable keys such as `appleId` and possibly content hash

### Revisit when
Revisit if runtime derivation becomes too expensive or if user decisions need richer historical state.