# Engineering Evidence Discipline

Use this reference inside the workflow that already owns the engineering task.
It is not an invokable skill, route, verdict owner, tracker, or second ledger.
Implementation, diagnosis, specification, architecture, QA, and release owners
retain their decisions and completion state.

## Evidence order

Trust engineering claims in this order:

```text
1. Real source code
2. Actual runtime behavior
3. Tests, probes, and reproducible commands
4. User-visible or machine-consumed artifacts
5. Logs, traces, telemetry, and manifests
6. Documentation and handoff summaries
```

Requirements and approved artifacts define intended behavior. When intent and
runtime disagree, record the conflict rather than selecting the more convenient
truth source.

## Compact process

1. **Define the claim and proof target.** Name the behavior, why it matters,
   success evidence, failure evidence, and what must not change.
2. **Map related surfaces.** Inspect direct callers, contracts, runtime
   entrypoints, adapters/persistence, tests, configuration, generated outputs,
   observability, and affected documentation. Scale the map to risk.
3. **Establish a baseline.** Run the smallest workflow that observes current
   behavior. Separate pre-existing failures from the target gap.
4. **Inspect consumed output.** Match evidence to the consumer: visual states,
   API responses/errors, data invariants, idempotency, generated artifacts, or
   operational health and rollback.
5. **Check truth ownership.** Detect duplicate calculations, competing status
   sources, hidden fallback, stale cache, or adapters that own core truth.
6. **Check blast radius.** Rerun affected paths and inspect cross-workstream,
   manifest, audit, and contract consistency.
7. **Report truthfully.** Return the owner workflow's truthful state and name
   commands, outputs, unverified areas, risks, and the smallest unblock action.

## Completion boundary

Evidence is sufficient only for the declared scope. Do not generalize a unit
pass into an E2E claim, a screenshot into Design approval, developer tests into
QA acceptance, or documentation into runtime truth.
