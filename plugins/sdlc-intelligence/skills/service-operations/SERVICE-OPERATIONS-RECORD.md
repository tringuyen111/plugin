# Service Operations Record

Use this semantic record for one normal-operations assessment/action cycle. Presentation may vary,
but preserve the meanings below. Do not copy secrets or provider credentials.

## Record identity and validity

- Service Operations Record ID:
- Record revision:
- Digest / equivalent immutable identity:
- Supersedes revision:
- Record validity: `CURRENT | STALE | UNVERIFIED | CONFLICTING`
- Evidence cutoff / finalized at / timezone:
- Material invalidation triggers:
- Changed since finalization:

Historical records remain historical. Do not rewrite an old record to look current after a material
fixed-point change; rebind/reassess and create a new revision when current operational truth changes.

## Operational fixed point

- Service/workload identity:
- Environment / scope:
- Current release / deployment / config identity when material:
- Deployment Execution Record identity/revision if this is a post-deploy handoff:
- Operational objective / SLO / health-policy source revisions:
- Evidence window / cutoff:
- Critical dependencies:
- Capacity/backlog/data expectations when applicable:
- Known temporary divergence and expiry/recheck condition:
- Current maintenance/change/concurrency state:
- Current incident state / incident-policy context:
- Consumed runbook ID / exact revision / verification state when applicable:
- Project Capability Profile / operation-policy revision when acting:

## Evidence quality and applicability

| Evidence / signal | Source / identity | Scope / population | Window | Freshness | Coverage | Applicable health dimension | Result | Conflict / caveat |
|---|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |  |

A provider response alone does not prove freshness, coverage, applicability, or current service
health. Preserve missing/contradictory evidence.

## Operational health

- Health state: `HEALTHY | DEGRADED | AT_RISK | UNKNOWN`
- Availability / critical-path evidence:
- Latency / responsiveness evidence:
- Error / correctness evidence:
- Saturation / capacity / backlog evidence:
- Dependency evidence:
- Data-integrity evidence:
- Operational objective / guardrail evidence:
- Non-applicable dimensions and why:
- Missing/conflicting dimensions:
- Incident handoff required under project policy?:
- Health rationale and evidence boundary:

Health state and incident command are separate. `DEGRADED` does not automatically mean an incident;
`HEALTHY` requires enough applicable evidence for the claimed scope.

## Operational decision

- Decision: no action | observe/recheck | bounded routine action | runbook update | deployment/release handoff | diagnosis handoff | incident handoff | Product-learning handoff | capability gap
- Trigger / rationale:
- Named next owner when not owned here:
- Recheck / expiry condition:

## Routine operation transaction

Complete only when a state-changing operation is attempted.

- Operation state: `BLOCKED | EXECUTED | FAILED | PARTIAL | HANDED_OFF`
- Semantic capability:
- Provider / executor identity:
- Side-effect class:
- Capability resolution record / revision:
- Operation envelope / policy verdict:
- Required authority / approval status:
- Exact runbook revision consumed, if any:
- Preconditions / current target state:
- Concurrency / change-window evidence:
- Repeat-safety / idempotency basis:
- Operation identity / request identity:
- Provider result / acknowledgement:
- Ambiguous outcome reconciliation evidence:
- Resources / state touched:
- Partial/residual mutations:
- Compensation / recovery status:

A runbook does not grant authority. Provider `ACK` or exit `0` is not a verified postcondition.

## Observed postconditions

| Postcondition | Expected current truth | Observed consumed state | Evidence identity | PASS / FAIL / INCONCLUSIVE / N/A |
|---|---|---|---|---|
| Target resource/state | | | | |
| Critical service behavior | | | | |
| Data correctness/integrity | | | | |
| Dependency state | | | | |
| Capacity/backlog | | | | |
| Operational objective/guardrail | | | | |

- Postcondition summary:
- Operation success claim supported to what depth?:
- Evidence gaps:

## Closure and handoff

- Re-assessed health state:
- Residual risk / unknowns:
- Temporary divergence / expiry:
- Monitoring/recheck owner and condition:
- Toil / automation candidate evidence, if any:
- Canonical next owner:
- Linked incident / diagnosis / deploy / release / runbook / Product artifacts:

Workflow completion must not rewrite the health state, operation state, or missing evidence.
