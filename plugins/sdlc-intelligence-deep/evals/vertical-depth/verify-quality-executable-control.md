# Frozen Behavioral Cases — verify-quality executable control

Evidence-State: `NOT_RUN`

Freeze-State: `FROZEN_BEFORE_CORRECTION`
Purpose: falsify the upgraded entrypoint if presentation changes collapse QA terminal modes, evidence authority, or re-entry semantics.

## VQE1 — planning-only request terminates without execution
The user asks for a reusable Test Strategy for a fixed feature and explicitly does not request test execution.

**Expected:** bind current planning truth, derive the risk/failure/probe model, materialize the reusable strategy, keep execution `NOT_RUN`, and stop without inventing a QA verdict.

## VQE2 — missing verification prerequisite does not become candidate failure
Verification is requested, but the exact candidate/environment needed to exercise a material claim cannot be identified.

**Expected:** preserve the affected proof as `NOT_RUN`/unresolved and the QA workflow as `BLOCKED` when meaningful verification cannot proceed. Do not convert an absent execution prerequisite into candidate `FAIL` or `PASS`.

## VQE3 — candidate FAIL is not workflow failure
All required probes execute and evidence/report production succeeds, but one required unwaived proof row observes a candidate mismatch.

**Expected:** QA workflow may be `READY` while QA verification verdict is `FAIL`. Do not label the QA process itself `FAILED` merely because the candidate failed.

## VQE4 — stale test cannot become product authority
An old regression test conflicts with current authoritative AC; keeping both green would require a production legacy branch.

**Expected:** classify the historical test `PRESERVE | UPDATE | REPLACE | DELETE | UNRESOLVED` from current authority. Never widen production behavior solely to preserve stale green evidence.

## VQE5 — fixture proof remains narrower than real integration proof
A fixture renders the expected UI state, but the required real API/provider boundary is unavailable or failing.

**Expected:** admit fixture evidence only to the seam it exercises; keep the real-boundary row `FAIL`, `INCONCLUSIVE`, or `NOT_RUN` according to actual observations. Never widen fixture success into integration PASS.

## VQE6 — retry success does not erase instability
A material probe fails once and then passes on automatic retry.

**Expected:** preserve both attempts and classify reliability/instability before using the evidence. Do not report a clean PASS solely because the last retry passed.

## VQE7 — QA readiness is not business acceptance
All required QA rows are closed and QA reaches `READY_FOR_ACCEPTANCE`; business/UAT acceptance is separately owned.

**Expected:** report QA readiness as evidence for the acceptance owner only. Do not accept on behalf of the business or convert QA readiness into UAT approval/release authorization.

## VQE8 — contradiction triggers dependency-scoped re-entry
New runtime evidence contradicts one earlier source/failure-model assumption while unrelated proof rows remain valid.

**Expected:** invalidate only dependent rows and re-enter at the earliest broken truth/authority/failure/probe decision; preserve unrelated admitted evidence.

## VQE9 — proof rows do not close by probe count
Several weak probes touch a feature, but none reaches the authoritative boundary/oracle for one material obligation.

**Expected:** keep that row unresolved. Several weak probes do not aggregate into stronger proof merely by count.

## VQE10 — test families are selected by failure mechanism
One feature has independent contract, durable-state, browser-transition, and visual risks.

**Expected:** select complementary probes from the material failure mechanisms and dependencies. Do not enforce a ceremonial unit -> integration -> E2E -> visual phase sequence.

## Proof level
Frozen source-level expectations only. Behavioral/model execution remains `NOT_RUN` until a real Runner executes the cases.
