# Experience and Interaction

## Contents
- Experience topology
- Typed local flow
- Continuity and recovery
- Representation discipline
- Failure patterns and corrections

Use this reference when the active Design question is about journey/IA, navigation/grouping topology, or local user-task progression.

## Truth altitude

Keep these states distinct when material:

- `CURRENT_OBSERVED` — what users can actually do/perceive now; evidence, not automatic target authority.
- `TARGET_AUTHORIZED` — interaction supported by approved Product/behavior/Design truth.
- `PROPOSED_EXPLORATION` — a candidate used to resolve an open Design decision; not silently approved.

When current and target differ, preserve the delta rather than merging them into one convenient flow.

## Experience topology: organize by user progress, not implementation shape

Start from the user-recognisable goal and the wider journey that makes the scoped experience useful. Use approved behavior plus actual user/project evidence to decide boundaries.

Prefer grouping/navigation boundaries that reduce one or more real costs:

- orientation cost — knowing where the user is and what is possible;
- switching cost — moving between related tasks/subjects/channels;
- reconstruction cost — having to recover context after a handoff;
- decision load — comparing or choosing without relevant context;
- continuity risk — losing progress, ownership, or state across a transition.

Do not copy organization structure, backend boundaries, URL structure, or familiar page templates into IA without evidence that they match the user's task model.

### Topology falsifier

If two information/grouping structures are plausible, ask which user decision or continuity relation differs. If nothing material differs, do not manufacture IA variants. If evidence cannot distinguish them, keep the decision unresolved.

## Typed local flow

For a scoped task, model:

```text
Scoped task -> Typed transition -> Perceivable state -> Valid continuation
```

A useful transition row identifies:

| Field | Question |
|---|---|
| Type | user choice, rule decision, response-state, wait/event, handoff, terminal? |
| Trigger | what action/event moves the task? |
| Perceivable state | what can the user truthfully see/know now? |
| Valid continuation | what can they safely do next? |
| Governing truth | which approved behavior/rule authorizes this? |

Do not encode backend orchestration, retry mechanics, queues, locks, or transaction design into a user flow.

## Continuity and recovery

Activate deeper continuity reasoning only when interruption, unknown outcome, partial effect, retry, duplicate intent, multi-actor conflict, or time-dependent rules can change what the user understands or can safely do.

Distinguish user-visible truth such as:

```text
definitely not started
completed
partially applied
unknown / pending / reconciling
```

For an unknown or partial outcome, show what remains safe to do. A retry control needs authorized business meaning: re-attempt the same intent, create a new intent, query status, or enter reconciliation. If the behavior source does not define that meaning, keep it unresolved rather than inventing it.

## Representation discipline

A direct flow request should normally end with the typed flow plus material open Design decisions. Do not add wireframes or visual styling unless a spatial/visual question is actually blocking the task.

A flow is not a use case, acceptance test, backend sequence diagram, or navigation sitemap. Keep its local task boundary explicit.

## Failure patterns -> correction

| Failure | Why it fails | Corrective move |
|---|---|---|
| One happy-path arrow chain | hides waits, alternate decisions, recovery, and user-perceivable states | add only branches that change valid continuation or user knowledge |
| Screen names used as flow states | confuses navigation containers with semantic state | name the user-visible condition/result, then map screens later |
| Backend status becomes user truth automatically | technical acknowledgement may not equal business completion | state only what the user can truthfully know |
| IA mirrors company/team structure | optimizes internal ownership instead of user progress | regroup around user goals, context, switching and reconstruction cost |
| Every branch gets its own page | artifact explosion without task need | separate behavior state from representation choice |
