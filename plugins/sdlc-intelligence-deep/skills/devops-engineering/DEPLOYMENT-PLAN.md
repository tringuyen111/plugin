# Deployment Plan — Semantic Contract

Use this contract for the durable output of `PREPARE`. The headings below express required
meanings, not a mandatory presentation template. Bind one plan revision to one planning fixed point.

## Identity and scope
- Deployment Plan identity and revision/digest.
- Canonical project identity and material provider/tool assumptions or bindings that constrain the plan.
- Candidate/source/build/artifact/config identities available at planning time.
- Target environment/region/cluster/tenant/population.
- Current deployed/exposure/schema/infrastructure state and known-good identity when available.
- Approved architecture/technical constraints and source evidence.

## Deployment archetypes and change graph
- Applicable deployment archetypes and why each applies.
- Changed nodes across application/runtime, configuration/secret references, infrastructure,
  schema/data/backfill, traffic/routing and feature exposure.
- Dependency/compatibility edges and required order.
- Old/new coexistence assumptions and unsupported combinations.

## Rollout strategy
- Selected strategy or composed stages.
- Availability/downtime and blast-radius constraints.
- Parallel/surge capacity and cost assumptions.
- Traffic/tenant/region control capability.
- Warm-up/state-transfer constraints.
- Strategy-specific provider/capability requirements.
- Why rejected alternatives do not fit current constraints.

## State, schema, data and exposure
- Deployment state model and exposure state model as separate axes.
- Mixed-version compatibility requirements.
- Migration/schema/data expand/backfill/switch/contract or equivalent transition.
- Idempotency/resumability/checkpoint requirements.
- Irreversible boundaries and rollback-window closure.
- Feature flag/traffic activation order and verification requirements.

## Automation and environment requirements
- Immutable artifact/promotion identity requirements.
- Environment protection/approval/change-window rules.
- Concurrency/serialization/lease policy.
- Credential scope and secret/config reference/version handling; never persist secret values.
- CI/CD/provider automation requirements, required source changes, and any unresolved implementation blockers.
- Audit/deployment-history evidence requirements.

## Verification and progressive analysis
- Observability plan and signal ownership/availability.
- Startup/readiness/liveness/identity/functional evidence required by risk.
- Metrics/logs/traces/business/exposure signals and attribution dimensions.
- Warm-up and observation windows.
- Sample/traffic adequacy and `PASS | FAIL | INCONCLUSIVE` bounds.
- Post-deployment monitoring/recheck conditions and owner.

## Recovery model
- Known-good identities and recovery window.
- Rollback feasibility conditions.
- Traffic restore / feature disablement options.
- Roll-forward/repair preauthorization, if any.
- Manual containment and incident-handoff triggers.
- Recovery verification requirements.

## Capability and authority requirements
- Semantic capabilities required for planning/execution/verification/recovery.
- Expected provider/runtime limitations when known.
- Required decision owners/approvals at release and execution time.
- Explicit statement that provider availability is not mutation authority.

## Plan state and blockers
- `PLAN_READY | PLAN_PARTIAL | PLAN_BLOCKED`.
- Unresolved assumptions/blockers with owner and closure evidence.
- Staleness triggers: candidate/config/target environment/current state/strategy/evidence/policy
  changes that require revalidation or a new plan revision.

`PLAN_READY` means deployment engineering is complete enough for release assessment. The plan
**does not establish release eligibility or `READY_FOR_RELEASE`, does not grant deployment
authority, and does not authorize deployment mutation**.
