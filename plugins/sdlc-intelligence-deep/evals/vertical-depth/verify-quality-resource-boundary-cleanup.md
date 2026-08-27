# Frozen Behavioral Cases — Verify Quality Resource/Boundary Cleanup

Evidence-State: `NOT_RUN`

Frozen before removing first-class `test-strategy`, `test-condition`, and `defect-report`.
Behavioral execution status at freeze: `NOT_RUN`.

## QRC1 — Ordinary QA does not require sibling planning Skills
**Prompt:** Verify a fixed candidate against current AC and runtime behavior. No Test Strategy or Test Condition artifact exists.
**Strong behavior:** `verify-quality` binds truth, derives failure/falsifier/probe/oracle rows locally, executes/adopts admissible evidence, and derives one QA verdict. It does not block merely because no strategy/condition artifact exists.
**Failure:** asks to invoke another planning Skill before it can reason about QA.

## QRC2 — Direct Test Strategy request remains supported
**Prompt:** Create a reusable Test Strategy for this fixed feature; do not execute tests yet.
**Strong behavior:** `verify-quality` stops at a planning-only terminal scope, binds the planning fixed point, maps claims/risks/failure mechanisms/probe boundaries/environment/data/evidence needs and stop criteria, and emits the local Test Strategy template. Runtime/test results stay `NOT_RUN`; no QA PASS/FAIL is invented.
**Failure:** refuses because the former `test-strategy` Skill is absent, or runs QA despite the planning-only request.

## QRC3 — Direct Test Condition request remains supported
**Prompt:** Materialize one reusable Test Condition for “retry cannot create a duplicate payment”; do not execute it.
**Strong behavior:** emits a durable condition containing source/revision, bounded claim, falsifier, preconditions/data/history, probe/boundary/substitutions, positive/negative oracle, evidence contract, limitations, and observed result `NOT_RUN`.
**Failure:** loses durable condition semantics, or treats definition as execution evidence.

## QRC4 — Direct Defect Report request remains supported
**Prompt:** Turn this already observed API mismatch into a defect record; do not diagnose root cause or file externally.
**Strong behavior:** emits a defect record with authoritative expected fixed point, candidate/environment/evidence-bound actual observation, reproduction/frequency, impact/severity, traceability/regression condition, root-cause state, canonical relationship truth, and persistence `NOT_RUN` unless write authority exists.
**Failure:** loses fixed-point/evidence semantics, diagnoses cause, or treats report creation as defect closure/QA verdict.

## QRC5 — Fake API data cannot widen proof
**Prompt:** `/models` returns HTTP 500, but a realistic fixture renders five models in the UI.
**Strong behavior:** component-rendering claim may PASS from fixture evidence; real API/provider integration claim FAILs/NOT_RUN/INCONCLUSIVE according to observed evidence. It never substitutes fixture truth for the real-boundary claim.

## QRC6 — Stale historical test cannot redefine product truth
**Prompt:** Approved current behavior contradicts an old regression test. Keeping both green would require a legacy branch.
**Strong behavior:** classify the test `UPDATE | REPLACE | DELETE | UNRESOLVED` from current authority; never add production legacy solely for stale green.

## QRC7 — Worked example is loaded only when pattern transfer matters
**Prompt:** A team repeatedly mistakes fixture success for integration success.
**Strong behavior:** use the relevant worked/contrastive example for pattern transfer while keeping the universal QA kernel compact; do not preload all examples for unrelated QA.

## QRC8 — Test types fan out by failure mechanism, not lifecycle ceremony
**Prompt:** One claim depends on API contract, durable state, browser transition, and rendered visual state.
**Strong behavior:** derive complementary proof rows and fan out independent probes when safe; sequence shared-state/history probes when required. It does not run unit→integration→E2E→visual as a fixed phase order.

## QRC9 — Visual conformance remains QA methodology, capture remains independent mechanics
**Prompt:** Review a rendered candidate against a semantic visual contract; screenshots are stale.
**Strong behavior:** `verify-quality` owns visual conformance reasoning/verdict; `visual-capture` may acquire current evidence only. Capture success does not become conformance PASS.

## QRC10 — Visual capture schema truth is consistently v4
**Prompt:** Prepare/validate a visual capture job after the visual-conformance migration.
**Strong behavior:** control instructions, JSON Schema identity, runtime constants, README/docs, and manifest all identify schema v4; `visual-conformance` is the supported QA-related intent and legacy `visual-qa` is rejected.
**Failure:** any active v3 identity/doc wording or silent legacy intent alias remains.

## QRC11 — Removed sub-skill names are not active routing dependencies
**Prompt:** “Write the Test Strategy and then verify this candidate.”
**Strong behavior:** one `verify-quality` capability first materializes/uses the strategy representation, then continues QA if requested and evidence permits. No removed Skill slug is required for routing or completion.

## QRC12 — Fresh-reader resource architecture is coherent
**Inspection case:** Open only final `verify-quality/SKILL.md` as a new agent.
**Strong behavior:** control surface explains when to load each reference/template/example with a decision-material WHEN/WHY pointer; output templates and pattern examples are discoverable without bloating `SKILL.md`; there is no stale pointer to removed Skills.
