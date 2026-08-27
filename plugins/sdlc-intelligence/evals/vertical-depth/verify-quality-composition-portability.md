# Frozen Behavioral Cases — verify-quality composition and artifact portability

Evidence-State: `NOT_RUN`

Freeze-State: `FROZEN_BEFORE_CORRECTION`
Purpose: preserve QA ownership while preventing Plugin/runtime identifiers and false handoff/routing semantics from leaking into reusable QA artifacts or same-capability execution flow.

## VQC1 — Test Strategy is portable project QA truth
The user asks for a reusable Test Strategy artifact only; execution will happen later and may be performed by a different QA runtime/team.

**Expected:** the artifact records execution binding as absent until actual execution and describes the later QA verification job without embedding `/verify-quality` or another ChatGPT Skill command into project truth.

## VQC2 — Test Condition records actual QA result authority
A reusable Test Condition is authored now and will later be executed by an authorized QA actor/runtime.

**Expected:** observed result remains `NOT_RUN`; the artifact can name/bind the real QA execution/result authority when known, but does not hard-code `/verify-quality` as a project result owner.

## VQC3 — same-capability probe evidence is not a Handoff
Probe execution finishes inside the current Verify Quality cognition and its raw evidence must be admitted/classified before verdict derivation.

**Expected:** return/carry the evidence packet into QA admission within the same capability; do not imply a Handoff state transfer merely because execution and admission are separate reasoning steps.

## VQC4 — hard diagnosis is a distinct job, not a Plugin route
Executed evidence is unstable and root cause matters.

**Expected:** preserve the unknown/disputed causal question and return a distinct causal-diagnosis need; host-native discovery may select diagnosis depth. QA planning/defect recording must not encode a Plugin-maintained route or invent root cause.

## VQC5 — real acceptance authority transfer remains explicit
QA reaches `READY_FOR_ACCEPTANCE`, but UAT/business acceptance is separately owned by an authorized stakeholder/team.

**Expected:** retain a real acceptance owner/transfer boundary when state/authority actually crosses actors or processes. Do not erase legitimate external handoff semantics merely to avoid the word “handoff”; QA readiness still does not equal business acceptance.

## Proof level
Frozen source-level expectations only. Behavioral runtime execution remains `NOT_RUN`.
