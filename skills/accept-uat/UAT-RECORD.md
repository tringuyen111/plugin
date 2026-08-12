# UAT Record

```markdown
# UAT — <scope / candidate>

## UAT record identity and validity
- UAT record ID:
- UAT record revision:
- UAT record digest / equivalent immutable identity:
- Supersedes UAT record revision:
- UAT decision evidence cutoff / finalized at:
- UAT fixed-point validity: CURRENT | STALE | UNVERIFIED | CONFLICTING
- UAT invalidation triggers:
- Changed since decision cutoff:

## Fixed point
- Candidate version / build / environment:
- Product scope / release slice:
- Stories / Use Cases / AC / Rules / NFRs:
- QA reports / evidence package:
- QA report revision / digest / immutable identity:
- QA report candidate / build:
- QA evidence cutoff:
- QA fixed-point validity (as reported by QA):
- QA invalidation triggers / changed since cutoff:
- QA supporting-contract admission summary / limitations:
- QA report admission: ADMITTED_CURRENT | STALE | UNVERIFIED | CONFLICTING
- QA workflow state: READY | PARTIAL | BLOCKED | FAILED
- QA verification verdict: PASS | FAIL | INCONCLUSIVE | NOT_RUN
- QA acceptance readiness: <domain readiness from QA report>
- QA separation requirement / policy:
- QA actual separation mode:
- QA executor / relation to implementation-review / provenance:
- QA independence / attestation status:
- Open defects / evidence gaps:
- Included scope:
- Excluded scope:

## Authority
- Approver:
- Role / decision authority:
- Decision date:

## Scenario results
| Scenario | Business goal | Result | Evidence | Limitation / condition |
|---|---|---|---|---|

Allowed scenario results: PASS, FAIL, INCONCLUSIVE, NOT_RUN, NOT_APPLICABLE.

## Decision
- UAT state: PENDING | ACCEPTED | ACCEPTED_WITH_CONDITIONS | REJECTED | WAIVED
- Decision statement:
- Conditions / waived criteria:
- Risk owner:
- Due date / review point:
- Reverification required:

## Traceability and affected artifacts

## Known limitations

## Release handoff
- UAT record revision / digest / immutable identity handed to Release:
- UAT fixed-point validity at handoff:
- Fixed candidate / environment match:
- Decision conditions / waivers still applicable:
- Eligible for release assessment: YES | NO | CONDITIONAL
- Release gate still required:
```

A QA workflow/control state cannot substitute for the QA verification verdict or acceptance-readiness axis. A QA verdict cannot populate the approver or UAT decision fields automatically, and UAT risk acceptance never rewrites failed/unrun QA evidence to PASS. A logical QA report ID without an exact revision/digest is not current evidence. `STALE | UNVERIFIED | CONFLICTING` QA report admission keeps UAT `PENDING` until `/verify-quality` re-verifies or supplies a current fixed-point report; UAT does not independently recompute Test Strategy/Test Condition/Defect Report freshness.

A UAT record is current for release handoff only when its exact revision/digest (or equivalent immutable identity) is known, its fixed candidate/environment and accepted scope still match, its admitted QA evidence remains current for the decision meaning, and its UAT fixed-point validity is `CURRENT`. A superseded, stale, unverified, or conflicting record remains historical evidence and must not be silently rewritten into a current handoff.
