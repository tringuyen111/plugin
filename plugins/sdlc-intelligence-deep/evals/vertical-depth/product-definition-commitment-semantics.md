# Frozen Qualification — Product Definition Commitment Semantics

Evidence-State: `NOT_RUN`

These cases are frozen before candidate edits. They are behavioral falsifiers for Product Definition Prompt/Context semantics, not executed results.

## P1 — Contribution and learning coexist

Input: A team will expose one missing recovery capability that materially reduces customer downtime but does not complete the whole recovery outcome. The release is also intentionally instrumented to discriminate whether customers can self-recover without support.

Expected: preserve an Outcome Claim of `CONTRIBUTION` and a material Learning Commitment at the same time. Scope must both advance the outcome and discriminate the learning question.

Falsifier: force the Product definition to choose either `CONTRIBUTION` or `LEARNING`, erasing the other obligation.

## P2 — Whole-outcome claim can still carry a learning obligation

Input: Product owns every material blocker for a bounded onboarding outcome and claims the target condition can be achieved. One adoption-mechanism assumption remains decision-critical and must be learned from the release.

Expected: retain the whole `OUTCOME` claim while separately preserving the learning obligation and its evidence path.

Falsifier: downgrade the outcome claim merely because learning remains, or suppress the learning obligation because scope is outcome-complete.

## P3 — Pure learning does not fabricate an outcome claim

Input: Product runs a deliberately non-production prototype solely to test whether a target segment understands a proposed capability concept. It is not intended to improve the user outcome yet.

Expected: represent no current Product outcome claim and a material Learning Commitment. Scope sufficiency is judged by discrimination of the assumption, not production completeness.

Falsifier: invent a `CONTRIBUTION`/`OUTCOME` claim just because Product is doing work, or require production completeness for the learning slice.

## P4 — Changing learning obligation does not erase established outcome scope

Input: A contribution-sized capability and its outcome rationale remain unchanged, but new evidence resolves the learning question before implementation.

Expected: remove/resolve the Learning Commitment and dependent measurement/experiment obligations while preserving the independent Contribution scope and rationale.

Falsifier: reopen or discard the contribution claim merely because the learning dimension changed.

## P5 — Narrowing outcome claim does not silently remove learning

Input: New dependency evidence shows Product can only contribute to the larger outcome rather than own it end-to-end, while the same decision-critical assumption still needs evidence.

Expected: narrow Outcome Claim from whole outcome to `CONTRIBUTION` while keeping the Learning Commitment intact and re-evaluating only dependent scope/measurement/recommendation truth.

Falsifier: treat a single commitment-type change as replacing the learning obligation too.

## P6 — Durable projection preserves both dimensions

Input: The Product decision is `CONTRIBUTION + LEARNING` and must be serialized for cross-session governance.

Expected: the durable Product artifact contains distinct fields for outcome claim and learning commitment/question; serialization adds no new Product truth.

Falsifier: write one `Type: CONTRIBUTION | LEARNING` field that forces one dimension to disappear.
