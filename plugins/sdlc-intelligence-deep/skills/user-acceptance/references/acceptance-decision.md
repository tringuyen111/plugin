# Acceptance Decision

## Contents
1. Evaluation sequence
2. Exception and condition authority
3. Overall decision
4. QA evidence admission
5. Human-decision composition
6. Contrastive examples

## 1. Evaluation sequence

For each material acceptance obligation, decide in this order:

1. **Applicability / requiredness.** Does this item apply to the exact scope, and is it required for the requested acceptance truth? `NOT_APPLICABLE` needs an authoritative reason/source.
2. **Observed/evidence truth.** Preserve exact result/currentness: `PASS | FAIL | INCONCLUSIVE | NOT_RUN | NOT_APPLICABLE`, plus `CURRENT | STALE | UNVERIFIED | CONFLICTING` where relevant.
3. **Exception authority.** If unsatisfied, is this exact obligation/risk waivable/deferrable under current policy, and does the named authority own that exception?
4. **Disposition.** Use `SATISFIED | BOUNDED_CONDITION | AUTHORIZED_WAIVER | HARD_BLOCKER | EVIDENCE_PENDING | NOT_APPLICABLE`.
5. **Terminal result.** For `EVALUATE`, stop with the evidence/disposition package. For `DECIDE`, only the authorized acceptance owner records the overall business decision.

Do not count passes or average evidence. One applicable non-waivable blocker remains a blocker.

## 2. Exception and condition authority

A bounded condition must include:
- exact scope/obligation;
- remaining work or closure proof;
- owner;
- deadline/expiry/review point;
- recheck/reverification trigger;
- effect on current acceptance meaning.

An authorized waiver additionally requires:
- policy basis permitting waiver of this exact class;
- correct current authority;
- rationale/residual risk;
- scope and applicability;
- expiry/review point.

A waiver/condition changes disposition, not observed truth. `FAIL` stays `FAIL`; `NOT_RUN` stays `NOT_RUN`.

## 3. Overall decision

Only in the protected `DECIDE` branch:

| Evidence/disposition state | Valid overall decision consequence |
|---|---|
| All applicable required obligations satisfied; no bounded condition/waiver | may support `ACCEPTED` |
| No hard blocker; only explicit current bounded conditions/policy-valid waivers | may support `ACCEPTED_WITH_CONDITIONS` |
| Missing/stale/inconclusive/unrun required evidence without valid exception | `PENDING`, unless authorized owner explicitly rejects |
| Non-waivable blocker or unacceptable business outcome | cannot support acceptance; authorized owner may record `REJECTED` |

`REJECTED` is an explicit authorized business decision; do not infer it from a QA or UAT `FAIL` alone.

## 4. QA evidence admission

Admit QA only when required/material for the current acceptance truth. When admitted, bind the exact `/verify-quality` report/candidate/currentness and preserve:
- workflow state;
- verification verdict;
- acceptance-readiness field supplied by QA;
- evidence cutoff/revision/digest;
- fixed-point validity/invalidation triggers;
- separation/provenance/attestation if policy makes them material;
- known defects/gaps.

If required QA is stale/unverified/conflicting/mismatched, keep the **dependent evaluation or decision** pending/blocked. Do not invalidate unrelated witnessed business observations or design automatically.

Do not independently recompute QA freshness from Test Strategy/Test Condition/Defect artifacts; `/verify-quality` owns QA truth.

## 5. Human-decision composition

If a bounded trade-off is unresolved (for example condition scope, acceptable operational pain, or whether a policy-valid residual risk is acceptable), use `decision-interview` when available. The interview improves the decision and returns a decision packet; it does not become acceptance authority.

If no correct decision owner is present, stop at `EVALUATE`/`PENDING`. Do not nominate the requester or agent as owner by convenience.

## 6. Contrastive examples

**Required scenario NOT_RUN:** disposition=`EVIDENCE_PENDING`; decision remains `PENDING`. Do not relabel expected future execution as a condition.

**Known defect accepted within authority:** scenario=`FAIL`; policy permits this exact bounded business risk; owner has authority and records scope/residual risk/expiry/recheck. Disposition=`AUTHORIZED_WAIVER`; overall may be `ACCEPTED_WITH_CONDITIONS`, never `ACCEPTED`; scenario remains `FAIL`.

**Same defect outside authority:** regulatory/safety obligation fails and Product cannot waive it. Disposition=`HARD_BLOCKER`; neither `ACCEPTED` nor `ACCEPTED_WITH_CONDITIONS` is valid.

**QA missing but only design requested:** do not block acceptance design. If final acceptance later requires QA, activate that dependency then.
