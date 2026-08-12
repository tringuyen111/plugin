# Visual QA Report

```markdown
# Visual QA — <scope/version>

## Fixed point
- Implementation version / commit / build:
- Environment and route:
- Visual Contract / reference version:
- AC/NFR links:
- Accepted differences before verification:
- Capture manifest:
- Required states:
- Required viewports:
- Content stress / locale / data:
- Excluded scope:

## Matrix
| State | Viewport | Reference | Screenshot + SHA-256 | Result | Findings / limitation |
|---|---|---|---|---|---|

Allowed results: PASS, FAIL, INCONCLUSIVE, NOT_RUN, NOT_APPLICABLE.

## Findings

### VQA-<n> — <title>
- Category: CONTRACT_MISMATCH | RUNTIME_STATE_FAILURE | RESPONSIVE_FAILURE | CONTENT_STRESS_FAILURE | VISIBLE_ACCESSIBILITY_RISK | EVIDENCE_GAP
- Severity: BLOCKING | WARNING
- State / viewport / route:
- Expected reference:
- Observed:
- User impact:
- Evidence path and SHA-256:
- Smallest correction or owner decision:
- Owner:
- Re-verification target:
- Confidence:

## Accepted differences
- Difference:
- Design/Product approver:
- Decision artifact:
- Affected states/viewports:

## Complementary probes
| Claim | Source / traceability | Required evidence | Evidence link / identity | Status | Owner / next route |
|---|---|---|---|---|---|

Composition context: PARENT_QA | STANDALONE


## Unreviewed scope and residual risk

## Visual QA conclusion
- Workflow state: READY | PARTIAL | BLOCKED | FAILED
- Visual QA verdict: PASS | FAIL | INCONCLUSIVE | NOT_RUN
- Acceptance readiness: READY_FOR_ACCEPTANCE | NOT_READY_FOR_ACCEPTANCE
- What is proven:
- What is not proven:
- Residual visual/accessibility risk:
- Next owner / route:
```

A completed Visual QA workflow may be `READY` with Visual QA verdict `FAIL` and acceptance readiness `NOT_READY_FOR_ACCEPTANCE`. Under `PARENT_QA`, complementary requirements return to the parent rather than recursively invoking it; under `STANDALONE`, unresolved non-visual claims hand off to the next QA owner and keep readiness non-ready until bound evidence returns.
