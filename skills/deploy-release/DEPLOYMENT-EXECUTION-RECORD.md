# Deployment Execution Record — Semantic Contract

Use this contract for a durable `EXECUTE` / `VERIFY_RECOVER` record. These are required meanings,
not a mandatory user-facing layout. Bind one record to one exact Deployment Plan and release fixed
point; append factual stage evidence rather than rewriting history.

For mutation admission, the Release Gate evidence must be one exact record revision/digest (or
equivalent immutable identity) whose fixed-point validity is `CURRENT`, whose readiness is
`READY_FOR_RELEASE`, and whose fixed candidate/environment matches execution. A logical release
ID or readiness label is insufficient. Preserve non-current/superseded release evidence as
history and return it to `release-gate`; do not rewrite upstream release truth from this record.

## Identity and upstream fixed points
- deployment/change-set identity;
- exact Deployment Plan identity + revision/digest;
- canonical project identity and Project Capability Profile revision;
- fixed candidate revision/digest/build/config identities;
- target environment/region/cluster/tenant/population scope;
- Release-gate record ID:
- Release-gate record revision:
- Release-gate record digest / immutable identity:
- Release-gate fixed-point validity: CURRENT | STALE | UNVERIFIED | CONFLICTING
- Release-gate readiness state: READY_FOR_RELEASE required for execution
- Release-gate fixed candidate / environment match:
- Release-gate drift / revalidation evidence:
- current/previous known-good deployment identity when available.

## Plan revalidation
- plan fixed-point match/mismatch;
- current deployment/exposure/schema/infrastructure state versus planned precondition;
- environment/config/policy drift observed before mutation;
- concurrency/change-window/lease facts;
- action when the plan/release fixed point is stale.

## Change graph and strategy
- changed nodes/surfaces and dependency order;
- application/config/infrastructure/schema-data/exposure classifications;
- selected rollout strategy and why it still fits current availability/blast-radius/capacity/compatibility facts;
- irreversible or conditionally reversible boundaries;
- planned checkpoints and progressive-analysis criteria.

## Authority and provider execution
- required decision owners/approvers and observed authority state;
- resolved semantic capabilities/providers with availability/scope evidence;
- Capability Operation Envelope identities/verdicts;
- operation/deployment job identities;
- per-stage result and observed postconditions.

## Verification evidence
- startup/readiness/liveness evidence when relevant;
- consumed artifact/config/infrastructure identity;
- functional/synthetic checks;
- metrics/logs/traces and observation window/adequacy;
- user/business guardrails when release risk requires them;
- progressive analysis outcome: `PASS | FAIL | INCONCLUSIVE`;
- evidence limitations/missing signals.

## Domain state

Record **deployment state** independently from **exposure state**.

Deployment state:
`AUTHORIZED | EXECUTING | VERIFYING | DEPLOYED_VERIFIED | BLOCKED | PARTIAL | FAILED | ROLLED_BACK | ROLLBACK_FAILED | UNKNOWN`

Exposure state:
`NOT_APPLICABLE | INACTIVE | PARTIAL | ACTIVE | RESTORED | FAILED | UNKNOWN`

When schema/data migration exists, record migration/backfill/checkpoint state and whether old/new
revisions remain compatible.

## Failure and recovery
- failure classification and first contradictory evidence;
- rollout freeze/containment point;
- selected recovery mode: rollback, traffic restore, feature disablement, roll-forward/repair,
  manual recovery, or incident handoff;
- recovery authority/provider operation/result;
- restored/repaired state evidence;
- residual mutations that recovery did not reverse.

## Closure and handoff
- final observed deployment state and exposure state;
- residual risk, monitoring window, expiry/recheck condition;
- unresolved blockers/unknown state;
- canonical downstream owner (`OPERATE`, `INCIDENT`, Product learning, documentation, etc.);
- links to Deployment Plan, runbook/incident/release/QA/UAT/project artifacts without copying their decision truth.
