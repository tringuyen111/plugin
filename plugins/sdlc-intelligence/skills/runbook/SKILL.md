---
name: runbook
description: Create or update an operational runbook for a fixed service, environment, and scenario using verified commands, access requirements, monitoring, recovery, rollback, and escalation. Use for repeatable operations or recovery; do not invent credentials, thresholds, commands, or product behavior.
---

# Runbook
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
- **When the procedure includes state-changing actions, retry/re-entry risk, branches, partial execution, rollback/recovery, or rehearsal evidence:** read [Runbook Execution Contract](RUNBOOK-EXECUTION-CONTRACT.md).
<!-- runtime-context:end -->

Create a procedure an authorized operator can execute safely under a named condition. Read [RUNBOOK-FORMAT.md](RUNBOOK-FORMAT.md). A runbook is operational truth, not a general architecture essay, investigation playbook, or user guide.

## Ownership boundary

The runbook owner creates/updates/verifies the **procedure artifact**. It does not:

- grant deployment/destructive/external-write/communication authority;
- replace `/deploy-release`, `/incident-response`, `/diagnosing-bugs`, or project security/data owners;
- invent provider commands, credentials, thresholds, observation durations, or product behavior;
- treat a known repeatable procedure as permission to execute it.

## Preconditions

Resolve service/environment/version, trigger condition, operator audience and authority, access prerequisites, verified commands/tools, dependencies, data/traffic implications, monitoring, rollback/compensation/recovery, escalation, exact fixed point, and evidence of the last rehearsal/use.

## Process

1. **Fix scope and trigger.** State exactly when to use and when not to use the runbook. Bind the service/environment/config/provider/tool assumptions required for execution.
2. **Inventory authoritative sources.** Current source/config, deployment definitions, provider/tool contract, monitoring, incident evidence, service ownership, and verified commands outrank old documentation.
3. **Classify verification truth.** Record runbook verification status `NOT_RUN | PARTIAL | VERIFIED | STALE` and the exact evidence/scope behind it. A weaker rehearsal never upgrades broader untested execution.
4. **Protect sensitive data.** Reference secret stores/environment variables; never embed credentials or tokens.
5. **Write safe prerequisites.** Access, approvals, backup/state capture, traffic/data assumptions, dependency state, conflicting operations, and expected baseline. False/unknown required preconditions stop or branch.
6. **Write one execution-contract step at a time.** For each material step record precondition, target scope, purpose, side-effect class, required authority, repeat-safety/idempotency basis, command/tool/action, expected immediate result, **observed postcondition**, stop/failure condition, evidence, next/branch, and rollback/compensation/recovery where applicable.
7. **Make retry/re-entry explicit.** For ambiguous state-changing outcomes, reconcile target/provider state before retry when repetition may duplicate/compound the effect. For partial execution, checkpoint committed effects and resume from observed state rather than replaying the procedure blindly.
8. **Verify success and failure.** Name provider/target state, health/business/data checks, logs/metrics, known failure signatures, and what unchanged/partial state means. Command exit/provider ACK is not enough when the consumed state is inspectable.
9. **Define rollback, compensation, recovery, and escalation.** Use the correct mechanism for the side effect and project-owned triggers/contacts. Unknown thresholds remain `TBD`, not generic defaults. Do not promise rollback for irreversible/external effects that require compensation or recovery.
10. **Rehearse at the required risk level.** Use read-only check, simulation/dry-run, representative non-production execution, bounded authorized live execution, or recovery exercise as appropriate. Record exactly which steps/branches and postconditions were actually exercised.
11. **Review currency and invalidation.** Link version, owner, last-tested evidence, dependencies, and explicit invalidation triggers. Mark the artifact `STALE` when a material service/provider/tool/permission/data/rollback/monitoring assumption changed.
12. **Consider automation only after semantics are stable.** Repeated deterministic procedure may hand off to Engineering/integration for automation; preserve preconditions, authority, repeat-safety, reconciliation and recovery instead of embedding provider-specific automation here.

## Completion

`READY` requires verified scope, prerequisites, execution-contract steps, expected results **and observed postconditions**, stop/branch conditions, repeat/re-entry safety, recovery/escalation, sensitive-data safety, currency/invalidation truth, and rehearsal/execution evidence appropriate to the runbook's claim.

A runbook may still be a useful `PARTIAL` artifact when dangerous/unverified steps are explicit. Use `BLOCKED` when missing command/authority/recovery truth makes the procedure unsafe to hand to an operator, and `FAILED` when an attempted verification produced contradictory/failing evidence.
