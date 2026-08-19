# Execution Plan

Use this reference when target intent is sufficiently fixed but the technical delta, sequencing, migration, risk, observability, or proof model must be synthesized across more than one bounded execution loop.

## Planning inputs

Read only the strongest applicable current sources that can change the plan:

- accepted Product/Requirements/Design/Architecture/policy truth that constrains the objective;
- material transition requirements or temporary current-to-future obligations;
- current source/runtime/tests/configuration/migrations/observability;
- current work state and prior technical decisions when they are still authoritative.

A missing document is not automatically a blocker. A missing protected decision is a blocker only when choosing a path would create/change protected behavior, architecture truth, durable compatibility, risk acceptance, or another material contract.

## Synthesize target against reality

Use this relation:

| Evidence relation | Planning treatment |
|---|---|
| target and current system agree | plan from the verified baseline |
| current implementation lags the target | preserve the target; record `current -> required` delta and proof |
| current system reveals an unresolved public-contract, ownership, lifecycle, trust, migration, or durable-state fact | preserve both facts; route the protected choice; block only the affected topology |
| unknown detail stays inside fixed contracts | keep it as a measured implementation question if the plan remains executable/falsifiable |
| target intent itself is missing | do not infer desired behavior from current code; expose the exact owner gap |

## Technical synthesis

1. Inspect representative modules, callers, interfaces, runtime entrypoints, adapters/persistence, tests, configuration, migrations, observability, and known failure paths.
2. Bind accepted seams/ADRs and material transition obligations. Do not create architecture truth inside the plan.
3. Classify foundation impact only from current consumers and invariants: `NONE | CONTAINED | SHARED | FOUNDATION`.
4. For `SHARED`/`FOUNDATION`, name the accepted seam/decision, minimum runway, dependent work, and representative real-boundary proof. Hypothetical future reuse does not earn foundation work.
5. Carry transition requirements into sequencing, migration/coexistence, observability, rollback/recovery, and retirement proof without rewriting their business rationale.
6. Map behavior, quality, risk, transition, and technical invariants to developer/QA/runtime evidence. Planning defines proof boundaries; it does not claim QA/UAT/release verdicts.
7. Keep consequential open architecture decisions explicit and route them to `codebase-design` before calling affected work ready.

## Suggested plan artifact

Use the project-native name. If the project already calls this representation a `Technical Delivery Spec`, keep that artifact identity; the capability remains Engineering Planning.

Use an artifact only when the synthesis must survive context boundaries or become a canonical input to durable work planning.

```markdown
# Engineering Plan - <name>

## Objective and non-goals
## Source truth and revisions
## Current technical baseline
## Target delta
## Fixed technical decisions and open protected decisions
## Decomposition and dependency topology
## Foundation / walking-skeleton needs
## Transition, migration, compatibility, rollback and retirement
## Failure behavior and observability
## Security / privacy / performance / accessibility constraints
## Evidence and evaluation frontier
## Sequencing / parallelism / cutover constraints
## Risks and mitigations
## Current executable frontier
```

Do not copy upstream artifacts into the plan. Reference them and preserve their authority.

## SHOW

**Code drift:** authorized API behavior requires duplicate creation -> `409`; current handler returns `200`. Keep `409` as target, `200` as verified baseline defect/delta, and plan code/test/compatibility proof. Do not rewrite the target to match source.

**Transition obligation:** legacy `pending_review` rows must be converted before the old state is retired. Plan migration ordering, coexistence if needed, restart/rollback, observability, reconciliation, and retirement proof. Do not turn the temporary obligation into permanent product behavior.

**No transition work:** a contained stateless behavior change has no temporary current-to-future condition. Keep the plan light; do not manufacture migration/training/cutover work.

## Readiness

An execution plan is planning-ready when current-system truth is source-grounded, protected open decisions are correctly owned, material migration/failure/evidence concerns are represented, and the decomposition can produce a truthful frontier. Planning-readiness is not implementation, QA, UAT, release, or runtime success.
