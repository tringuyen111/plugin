# Technical Design Representations

Use this reference only when the reasoning shape contains a material relation that plain prose would hide. Representation is a semantic tool, not a deliverable quota.

## Selection rule

Start with prose. Add or substitute the **smallest** representation that makes a decision-changing relation easier to inspect or falsify:

| Reasoning shape | Prefer | What it must expose |
|---|---|---|
| Simple or linear decision | Prose / compact interface sketch | Decision, owner, contract, proof without ceremonial structure |
| Multiple owners, dependencies, blockers, or proof edges | Ownership/dependency graph | Nodes with truthful owners; labeled edge meaning; blockers and proof dependencies |
| Alternatives interact across several decision-driving dimensions | Decision matrix/table | Frozen alternatives against the same material dimensions; conflicts and trade-offs before recommendation |
| Replacement, coexistence, migration, recovery, or governed lifecycle | State/transition model | Allowed states, guarded transitions, cutover/removal conditions, rollback/recovery, terminal truth |
| Timing, ordering, retry, concurrency, callback, or ambiguous external effect | Sequence/dynamic view | Actors, durable points, effect timing, timeout/retry ambiguity, error/recovery path |

Do not emit all representations by default. Combine two only when they answer different material questions, such as a state model for migration truth plus a sequence view for retry ambiguity.

## Ownership and dependency graph

Use a graph when a flat list would imply false independence or arbitrary order.

Every material edge must have a declared semantic meaning. Example vocabulary may include:

- `requires` — target cannot be valid before source obligation holds;
- `owned-by` — artifact or decision has a named canonical owner;
- `blocks` — unresolved item prevents the dependent decision/proof;
- `proved-by` — evidence is required to support the linked claim;
- `calls` / `reads` / `writes` — runtime relation when that distinction changes design.

Do not use unlabeled arrows when multiple edge meanings are plausible. Do not invent nodes, owners, or dependencies that are absent from source evidence.

## Decision matrix or table

Use a matrix when at least two materially different alternatives interact across multiple decision-driving dimensions.

- Freeze alternatives before comparison; do not mutate one option while scoring another.
- Compare the same dimensions for every option.
- Prefer qualitative evidence and explicit trade-offs over unexplained numeric scores.
- Include only dimensions that can change the recommendation: ownership, interface knowledge, locality, leverage, compatibility, migration/rollback, coupling, consistency, observability, risk, or another source-grounded constraint.
- Keep the final recommendation and rationale outside the matrix when prose is clearer.

A table that merely reformats identical prose without exposing interaction is decoration.

## State and transition model

Use a state model when validity depends on lifecycle state rather than a simple ordered checklist.

For each material state, define:

- what is true in that state;
- allowed next states;
- guards/evidence required for each transition;
- rollback/recovery destination when applicable;
- terminal/removal conditions.

For replacement work, preserve `REPLACEMENT_IN_PROGRESS`, intentional `SUPPORTED_COEXISTENCE`, and `REMOVE` semantics when applicable. Never let a diagram imply removal while current consumers, parity, cutover, or rollback obligations remain unresolved.

## Sequence or dynamic view

Use a sequence/dynamic view when order in time changes correctness.

Show only actors/events necessary to reason about the decision. Make durable state, external effects, retries, timeouts/callbacks, and recovery points visible when material. A timeout or missing response must not be drawn as proof that an external effect did not happen.

Bind the sequence back to the operation/interface contract; a happy-path picture is insufficient when retry or ambiguity is the design question.

## Compression and consistency checks

Before keeping a representation, ask:

1. What decision-changing relation becomes visible here that the prose did not preserve cleanly?
2. Are all nodes, states, alternatives, actors, and edges source-grounded or explicitly proposed?
3. Can a reviewer tell what each edge/transition/cell means without guessing?
4. Does the representation reveal a blocker, trade-off, invalid transition, ownership fact, or proof obligation?
5. Can any duplicated prose or decorative element be removed without losing meaning?

If the answer to the first question is "none", use prose instead.

## Failure modes

Reject or revise representations that:

- add diagrams because architecture work is expected to look visual;
- use a flat checklist where hard dependency or lifecycle semantics matter;
- use unlabeled arrows that hide ownership or dependency type;
- score alternatives with arbitrary weights or precision;
- omit rollback, recovery, invalid transitions, or terminal conditions from a stateful migration;
- show only the happy path when timing/retry ambiguity is load-bearing;
- duplicate the same meaning across prose and diagrams without increasing checkability;
- treat a cleaner diagram as proof that the module, migration, or runtime behavior is correct.
