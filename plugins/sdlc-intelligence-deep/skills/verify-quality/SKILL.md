---
name: verify-quality
description: Own fixed-scope QA from source-grounded planning and reusable Test Strategy/Test Condition artifacts through authoritative probe execution, evidence admission, durable defect recording, and one QA verdict. Use when a candidate must be proven beyond developer tests/code review, or when the user specifically asks for a QA Test Strategy, reusable Test Condition, QA Verification Report, or Defect Report. Do not implement fixes, redefine requirements, accept UAT, or authorize release.
---

# Verify Quality

Own one QA cognition and, when verification is executed, one QA verdict for the declared scope. Planning, condition design, defect recording, and visual conformance are parts/outputs of this capability rather than mandatory sibling handoffs. `visual-capture` remains a separate evidence-acquisition capability; capture never owns conformance or the QA verdict.

Do not implement fixes, silently redefine expected behavior, approve Design, accept on behalf of the business, or authorize release. When project policy requires separation from implementation/review, record the actual executor relationship and inspectable provenance; same-agent sequential QA is procedural separation only.

## Load depth only when decision-material

- **WHEN** producing a material QA conclusion/report, **USE** [QA Verification Report template](templates/qa-verification-report.md) **BECAUSE** fixed-point, evidence, and verdict axes must remain explicit.
- **WHEN** the user asks for a reusable Test Strategy or risk-to-probe planning itself is the terminal job, **READ** [QA Test Planning](references/test-planning.md) and **USE** [Test Strategy template](templates/test-strategy.md); stop before execution unless the user also requested verification.
- **WHEN** a reusable Test Condition is the requested artifact or a proof row needs deeper oracle/fixed-point design, **READ** [Test Condition and Oracle Design](references/condition-oracle-design.md) and **USE** [Test Condition template](templates/test-condition.md); authored/revised conditions remain `NOT_RUN` until evidence is admitted.
- **WHEN** an observed/suspected deviation must become a durable record, **READ** [Defect Recording](references/defect-recording.md) and **USE** [Defect Report template](templates/defect-report.md); recording never diagnoses or closes the defect.
- **WHEN** a known risk maps only to a generic test level or weak falsifier, **READ** [Probe Design Tactics](references/probe-design-tactics.md).
- **WHEN** retry/flakiness, stochastic/sequence behavior, eventual consistency, non-hermetic runtime, or conflicting success signals can change evidence meaning, **READ** [Evidence Reliability and Oracle Composition](references/evidence-reliability.md).
- **WHEN** browser interaction is a material proof boundary, **READ** [Browser Test Planning](references/browser-test-planning.md).
- **WHEN** evidence authority, substitution, staleness, or process-assurance can change the conclusion, **READ** [QA Evidence Admission](references/evidence-admission.md).
- **WHEN** harness validity, retries, synchronization, shared state, fault injection, or environment mismatch affects execution, **READ** [Probe Execution Discipline](references/probe-execution-discipline.md).
- **WHEN** rendered/perceivable Design obligations are material, **READ** [Visual Conformance](references/visual-conformance.md) before selecting or closing visual proof rows.
- **WHEN** pattern transfer is the problem, load only the matching example: [real API vs fixture](examples/real-api-vs-fixture.md), [stale test vs current truth](examples/stale-test-vs-current-truth.md), or [multi-probe proof ledger](examples/multi-probe-proof-ledger.md).

## Always-active QA truth contract

### 1. Bind reality before inference

Bind both sides of the verification claim:

- **expected truth** — exact approved AC, Rules, NFRs, Design/Visual contracts, ADR/interface/data semantics, accepted waivers;
- **candidate truth** — exact build/commit/artifact/environment/config/data plus decision-material implementation source, generated/configuration path, tests, and runtime evidence for the behavior under test.

For an existing system, inspect the smallest relevant docs/source/config/runtime chain that can change the QA model. Do not reconstruct a current feature from issue text, naming, screenshot, fixture, or familiar framework patterns when inspectable evidence exists. Stop traversal when more context cannot materially change expected meaning, failure model, probe choice, or evidence authority.

Keep unresolved material claims typed:

```text
FACT       bound to inspectable current evidence
INFERENCE  derived from facts but not directly observed
PROPOSAL   an authorized probe/test idea, never current-system fact
UNKNOWN    missing, conflicting, stale, or uninspected truth
```

`UNKNOWN` current-state truth never becomes `FACT` because a plausible implementation can be imagined.

### 2. Every material obligation needs a falsifiable proof row

Before choosing a test type, state the smallest row that can change the verdict:

```text
source/obligation
-> bounded claim
-> plausible failure mechanism
-> falsifier / negative outcome
-> probe + real boundary exercised
-> substituted/bypassed boundary
-> oracle / postcondition
-> evidence
-> result + remaining gap
```

If the failure mechanism is unclear, inspect more source/runtime or keep the row unresolved; do not manufacture generic “add E2E/integration coverage” activity as proof.

### 3. Execution truth is not prose truth

Preserve:

```text
SPECIFIED != IMPLEMENTED != EXECUTED != OBSERVED != PASS
```

A Markdown scenario, configured CI job, test file, mock, screenshot command, or planned probe does not prove execution. A command supports only the boundary it actually reached with a valid oracle. Preserve failed attempts and retries; retry-until-green does not erase instability.

Synthetic data, mocks, fakes, stubs, simulators, snapshots, and fixtures are valid only for the narrower seam they intentionally exercise. If acceptance requires a real API/provider/database/browser/runtime boundary, failure or absence of that boundary is evidence to classify or re-enter; it is not permission to substitute a fake and claim the wider feature passed. Explicit demo/offline/test-harness scopes may use synthetic truth, but their result stays scoped to that mode.

### 4. Existing tests are evidence, not permanent product authority

When a historical test conflicts with current authoritative truth, classify it before using the failure:

```text
PRESERVE | UPDATE | REPLACE | DELETE | UNRESOLVED
```

Preserve valid invariants. Update/replace/delete superseded or wrong-boundary proof. Keep `UNRESOLVED` when authority is unclear. Never require production fallback, compatibility behavior, fixture-specific branching, or hardcoded values solely to keep a stale test green. Challenge example-shaped green behavior with another valid instance when overfitting is plausible.

### 5. Contradiction forces re-entry; missing material proof blocks PASS

When source/runtime/evidence contradicts the QA model, invalidate dependent proof rows and return to the earliest broken reality/authority/failure-model/probe decision while preserving unaffected evidence.

No pass percentage, clean code review, developer summary, historical PASS, or neighboring green row overrides a material `FAIL`, `INCONCLUSIVE`, `NOT_RUN`, stale result, or unexplained missing obligation unless an authorized waiver/disposition explicitly applies.

## Fixed point and proof ledger

For verification, record candidate/build, environment/config/data, expected-truth revisions, evidence cutoff, exclusions, separation mode, and invalidation triggers before deriving a verdict.

Maintain one compact proof ledger; it may stay internal unless reporting requires it:

| Obligation / claim | Source | Failure / falsifier | Probe + boundary | Substitution / limitation | Oracle | Evidence | Result | Gap / waiver |
|---|---|---|---|---|---|---|---|---|

Allowed row results: `PASS | FAIL | INCONCLUSIVE | NOT_RUN | NOT_APPLICABLE`.

The ledger is coverage control, not bureaucracy. Add only material rows. One probe may close several rows only when its oracle/boundary actually falsify all of them; several weak probes do not become strong evidence by count.

## Process

1. **Bind expected truth and real candidate reality.** Inspect decision-material docs/source/config/generated/runtime paths instead of imagining the feature. Record conflicts/unknowns explicitly.
2. **Build the minimal risk/proof model.** Derive material claims from acceptance, NFR, Design, architecture/data semantics, change impact, prior defects/incidents, and runtime risk. Name a plausible failure and falsifier before choosing a probe. If planning is the requested terminal output, materialize the Test Strategy and stop.
3. **Define reusable conditions only when they add value.** A proof row can remain local/ephemeral. When a durable condition is requested, materialize exact source binding, bounded claim/falsifier, probe authority/substitution, oracle, evidence contract, cleanup, and `NOT_RUN` result before execution.
4. **Choose or author the smallest authoritative probes.** Prefer the lowest boundary containing every material failure mechanism, then add complementary real-boundary probes for anything substituted/bypassed. Test families are tools, not lifecycle stages.
5. **Execute by dependency, not ceremony.** Fan out independent probes when resources permit. Sequence/isolate probes whose shared mutable state, history, concurrency, migration order, or dependency coupling is material. Establish controlled starting state and condition-driven synchronization.
6. **Admit evidence and classify rows.** Confirm candidate/environment/data binding, producer/command, execution time, raw artifact identity, probe validity, falsifier reach, substitutions, retries, and limitations. Admit narrower truth when appropriate; never widen evidence by wording.
7. **Record deviations/waivers when useful.** Keep the QA row result unchanged. A defect record preserves an observation and may be persisted only with exact destination/write authority. A waiver never converts the observed condition to PASS.
8. **Challenge coverage and the weakest proof.** Search for omitted obligations, stale/overfit tests, fake-replaced real boundaries, contradictory oracles, untested state/history, and evidence that proves only a narrower claim.
9. **Derive one QA conclusion when verification was requested/executed.** Reconcile every material row, then derive the three axes below. Artifact-only Strategy/Condition/Defect requests stop with their own truthful completion state and do not invent a QA verdict.

## Completion semantics

Artifact-only outputs stay inside QA but have distinct completion proof:

- **Test Strategy `READY`**: current source-bound planning fixed point, risk/claim/failure/probe map, authority/limitations, priorities, environment/data/evidence needs, omissions, and source-backed stop criteria are complete. Execution remains `NOT_RUN`.
- **Test Condition `READY`**: current source-bound definition, bounded claim/falsifier, reproducible probe with substitutions, positive/negative oracle, evidence/limitations, cleanup/repeatability, and result semantics are complete. Fresh/revised observed result remains `NOT_RUN`.
- **Defect Report `READY`**: expected/observation fixed points, finding classification, actual behavior, reproduction, evidence, impact/severity, traceability/regression condition, root-cause state, canonical relationship, and truthful persistence status are complete. It does not close/reject the defect.

For verification, keep these axes separate:

```text
workflow state:           READY | PARTIAL | BLOCKED | FAILED
QA verification verdict:  PASS | FAIL | INCONCLUSIVE | NOT_RUN
acceptance readiness:     READY_FOR_ACCEPTANCE | NOT_READY_FOR_ACCEPTANCE
```

Verdict precedence for required unwaived rows: any `FAIL` -> `FAIL`; else any `INCONCLUSIVE` -> `INCONCLUSIVE`; else any `NOT_RUN` -> `NOT_RUN`; else all required rows `PASS` or justified `NOT_APPLICABLE` -> `PASS`. A completed workflow can therefore be `READY` with candidate verdict `FAIL`.

`READY_FOR_ACCEPTANCE` additionally requires required rows closed by `PASS`, justified `NOT_APPLICABLE`, or current authorized waiver; fixed-point evidence and any required separation/provenance must remain valid. QA readiness is evidence for separately owned UAT, not business acceptance.

Use workflow `PARTIAL` when useful current verification exists but required truth/coverage/evidence remains unresolved; `BLOCKED` when missing source/candidate/environment/authority/capability prevents meaningful verification; and `FAILED` only when the QA execution/evidence/report contract itself failed. Never map a candidate mismatch to workflow failure.
