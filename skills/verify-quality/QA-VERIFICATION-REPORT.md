# QA Verification Report

```markdown
# QA Verification — <scope>

## Fixed point
- Canonical work item:
- Implementation version / commit / build / artifact hash:
- Environment, configuration, and data identity:
- Acceptance / NFR / design revisions:
- Evidence cutoff / evaluated at:
- QA separation requirement / policy:
- Actual separation mode:
- QA executor / relation to implementation-review:
- Independence / attestation status and provenance:
- Change scope:
- Excluded scope:
- Verdict invalidation triggers:

## Supporting QA contract admission
| Artifact role | Artifact ID | Exact revision / digest | Source fixed point | Freshness / classification | Bounded authority in this QA run | Disposition |
|---|---|---|---|---|---|---|
| Test Strategy | | Strategy revision: | Material source revisions / digests: | CURRENT / STALE / CONFLICTING / UNVERIFIED | Coverage planning only | |
| Test Condition | | Condition revision: | Material source revisions / digests: | CURRENT / STALE / CONFLICTING / UNVERIFIED | Oracle / proof target definition only | |
| Defect Report | | Defect revision: | Observation fixed point: | SUSPECTED / CONFIRMED / BLOCKED_BY_REQUIREMENT; relationship: NEW / DUPLICATE_OF / RELATED_TO / UNKNOWN | Downstream deviation handoff only; never QA result authority | |

A persisted Test Strategy or Test Condition is authoritative only at the exact revision/fixed point and `CURRENT` freshness consumed by this run. Revalidate stale/conflicting/unverified support truth through its canonical owner or keep the affected QA scope non-positive. Defect classification/relationship/lifecycle does not replace condition execution truth.

## Evidence admission
| Evidence | Producer / command | Bounded claim / condition | Probe authority / substituted boundary | Candidate and acceptance binding | Environment / data binding | Executed at | Integrity / raw reference | Disposition |
|---|---|---|---|---|---|---|---|---|

Allowed dispositions: ADMITTED, STALE, UNBOUND, MISSING, CONFLICTING.

## Risk summary
| Risk | Source | Impact | Likelihood | Required coverage | Residual risk |
|---|---|---|---|---|---|

## Execution summary
| Test condition | Condition revision / source fixed point | Definition freshness | Required / criticality | Traceability | Result | Evidence identity | Falsifier / authority closure | Evidence freshness | Environment | Limitation | Waiver |
|---|---|---|---|---|---|---|---|---|---|---|---|

Allowed results: PASS, FAIL, INCONCLUSIVE, NOT_RUN, NOT_APPLICABLE.

## Defects
- DEF-...

## Waivers
| Condition and original result | Authorized owner | Candidate / scope | Rationale | Residual risk | Expiry / recheck trigger | Downstream consumers |
|---|---|---|---|---|---|---|

A waiver never changes the original condition result to PASS.

## Coverage gaps and unverified areas

## Verdict derivation
- Unwaived required FAIL conditions:
- Required INCONCLUSIVE conditions:
- Required NOT_RUN conditions:
- Unsupported NOT_APPLICABLE conditions:
- Invalidated or stale evidence:
- Evidence/report contract defects:
- Conditions closed by valid waiver:

## QA conclusion
- Workflow state: READY | PARTIAL | BLOCKED | FAILED
- QA verification verdict: PASS | FAIL | INCONCLUSIVE | NOT_RUN
- Acceptance readiness: READY_FOR_ACCEPTANCE | NOT_READY_FOR_ACCEPTANCE
- What is proven:
- What is not proven:
- Residual risk:
- Fixed-point validity:
- Next owner / route:
```

Do not use a percentage score as a substitute for evidence admission, traceability, condition closure, defects, waivers, and residual risk.


The workflow state reports whether QA executed this verification contract truthfully. The QA verification verdict reports candidate evidence. Acceptance readiness reports whether the candidate may proceed to the separately owned acceptance decision. A completed verification may therefore be `READY` with QA verification verdict `FAIL` and acceptance readiness `NOT_READY_FOR_ACCEPTANCE`. A waiver never changes the original condition result or QA verification verdict to `PASS`.
