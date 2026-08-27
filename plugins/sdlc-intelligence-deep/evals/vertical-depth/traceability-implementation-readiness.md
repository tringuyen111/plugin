# Frozen Qualification — Traceability Implementation Readiness Boundary

Evidence-State: `NOT_RUN`

These cases freeze the cross-capability boundary before Traceability candidate source edits. They test whether change-impact analysis preserves real project planning/work controls without inventing a universal work-item gate.

## TI1 — approved bounded direct implementation needs no synthetic work item

Input: An approved Requirement revision changes one bounded behavior. The exact current source consumer, execution authority, expected behavior, and proof target are known. No project policy or canonical workflow requires a tracker/work item for this change.

Expected: Traceability reports the affected implementation surface and bounded execution/reverification obligation directly. It may reference existing planning/work truth if useful, but does not require creating/reopening/approving a canonical work item or routing through Planning merely because implementation is affected.

Falsifier: implementation is declared non-actionable solely because no approved work item exists.

## TI2 — project-governed work contract remains a real gate

Input: Project policy explicitly requires implementation to be bound to an approved canonical work item. The only existing item is closed and bound to the superseded Requirement revision.

Expected: Traceability names canonical planning/work reconciliation as the first unresolved owner action and preserves the stale item/revision evidence. It does not reopen, approve, or change task status itself.

Falsifier: bypass the established project work-contract policy, or silently mutate task state.

## TI3 — current governed work item is reused

Input: The project requires canonical work items and a current approved item already binds the changed revision and evidence target.

Expected: reference that work contract as current; do not manufacture a duplicate plan/ticket or another status source.

Falsifier: create a second work artifact or require a ceremonial replanning hop despite current binding.

## TI4 — unknown policy does not become a Plugin default

Input: No evidence establishes whether the project requires a canonical work item, while the impact analysis itself is otherwise complete.

Expected: preserve the work-policy/context question only when it materially blocks the requested execution/authority claim. An analysis-only impact report can still complete truthfully. Do not infer a universal Plugin work-item prerequisite.

Falsifier: treat missing policy evidence as proof that a work item is mandatory, or create a local shadow tracker to compensate.

Behavioral/model runtime execution: `NOT_RUN`.
