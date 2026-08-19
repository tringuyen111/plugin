# QA Verification Report

```markdown
# QA Verification — <scope>

## Fixed point
- Canonical work item / declared QA scope:
- Candidate version / commit / build / artifact hash:
- Environment / configuration / data identity:
- Expected-truth sources and exact revisions/digests:
- Evidence cutoff / evaluated at:
- QA separation requirement / actual executor relation / provenance:
- Change scope / exclusions:
- Verdict invalidation triggers:

## Reality / authority notes
| Claim or dependency | Truth state | Evidence / source | Authority / limitation | Consequence |
|---|---|---|---|---|

Truth states: FACT, INFERENCE, PROPOSAL, UNKNOWN.

## Supporting artifact admission
| Artifact role | Exact artifact / revision | Source fixed point | Freshness / authority | Use in this run |
|---|---|---|---|---|

Use only when a persisted Test Strategy, Test Condition, Defect Report, capture manifest, waiver, or other governed artifact is actually consumed. Their existence is not mandatory for local QA reasoning.

## Proof ledger
| Obligation / bounded claim | Source | Failure mechanism / falsifier | Probe + real boundary | Substitution / limitation | Oracle | Evidence identity | Result | Gap / waiver |
|---|---|---|---|---|---|---|---|---|

Allowed results: PASS, FAIL, INCONCLUSIVE, NOT_RUN, NOT_APPLICABLE.

## Execution / evidence notes
- Failed attempts and retries preserved:
- Probe/harness/environment failures:
- Real boundaries not exercised:
- Synthetic/mock/fixture-only evidence and narrower claims:
- Shared-state / ordering / concurrency constraints:
- Visual-conformance evidence/capture limitations when applicable:

## Historical test disposition
| Existing test / fixture | Current semantic claim | Disposition | Reason / authority | Follow-up owner |
|---|---|---|---|---|

Dispositions: PRESERVE, UPDATE, REPLACE, DELETE, UNRESOLVED.

## Defects / waivers
- Durable defect references:
- Waivers: owner, exact scope, rationale, residual risk, expiry/recheck trigger.

A waiver never rewrites the observed QA row to PASS.

## Coverage challenge
- Material obligations omitted/unresolved:
- Weakest admitted proof:
- Contradictory oracles / stale evidence:
- Residual risks and unverified areas:

## QA conclusion
- Workflow state: READY | PARTIAL | BLOCKED | FAILED
- QA verification verdict: PASS | FAIL | INCONCLUSIVE | NOT_RUN
- Acceptance readiness: READY_FOR_ACCEPTANCE | NOT_READY_FOR_ACCEPTANCE
- What is proven:
- What is not proven:
- Controlling failures/gaps/waivers:
- Next authority/action if needed:
```

Do not use pass percentage, test count, code-review cleanliness, capture success, or a generated report as a substitute for bound proof rows and admitted evidence. A completed QA workflow may be `READY` with candidate verdict `FAIL`; acceptance readiness remains separately derived and does not grant UAT or release authority.
