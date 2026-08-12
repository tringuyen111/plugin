---
name: incident-response
description: Coordinate an active production incident through command, impact assessment, controlled stabilization, factual communication, recovery confidence, and handoff. Use when users or critical operations are currently affected; do not guess severity policy, technical root cause, or perform external paging/communication/production mutation without authority.
---

# Incident Response
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
- **When active impact requires production mitigation, concurrent responders, ambiguous operation outcomes, security/data-integrity handling, recovery judgment, or command handoff:** read [Incident Command and Stabilization Model](INCIDENT-COMMAND-STABILIZATION.md).
<!-- runtime-context:end -->

Coordinate the incident; do not become every responder. Read [INCIDENT-RECORD.md](INCIDENT-RECORD.md). Stabilization and factual communication take priority over a polished diagnosis.

## Command boundary

Incident response owns the live **incident command state**: impact, objective, role/authority map, coordinated mutation lane, mitigation evidence, recovery confidence, communications state, command handoff, and residual operational divergence.

It does not own:

- technical hypothesis/reproduction/root-cause evidence — `/diagnosing-bugs`;
- release-readiness truth — `/release-gate`;
- normal deployment engineering outside active incident command — `/deploy-release`;
- provider translation — capability resolver/integration;
- project severity/SLO/update/notification/security/legal policy;
- specialist forensic/security/data investigation.

Incident command coordinates protected operations but **does not grant side-effect authority**. A role assignment, incident severity, urgency, or commander request never substitutes for the project capability-execution policy and named authority.

## First response

1. **Declare the incident fixed point.** Record detection time, current time/timezone, affected environment, source alert/report, incident identifier, current command state, and evidence revision.
2. **Assess impact, not blame.** Who/what is affected, start time, scope, critical journeys/operations, business effect, data/security implications, dependency propagation, capacity/backlog, and uncertainty.
3. **Resolve command, roles, and authority.** Incident commander, mutation/operations owner, technical responders, communications, specialist owners, scribe, and decision rights. If roles/authority are absent, record the gap; do not infer permission from urgency.
4. **Use project severity policy.** Link the actual policy. If none exists, describe impact and urgency without presenting generic SEV thresholds as organizational truth.
5. **Set one current stabilization objective.** State the incident outcome sought, not merely the action to run.
6. **Establish the mutation lane.** Coordinate state-changing production actions through one visible lane by default. Read-only diagnosis may proceed in parallel. Parallel mutations require explicit independence/interaction reasoning, owner, authority, and attribution evidence.
7. **Create a mitigation action card before each material state change.** Record action ID, objective, target, preconditions, expected signal, falsifier/stop condition, side-effect class, owner/authority, mutation-lane relation, recovery option, and required evidence.
8. **Execute only under resolved capability and authority.** Provider/tool availability is not permission. External communication, deployment, destructive operations, paging, source-control actions, and other writes obey their canonical policy.
9. **Observe, reconcile, and correct.** Record the observed outcome. Provider acknowledgement or request submission is not success. If a state-changing request is ambiguous or times out, reconcile consumed/provider state **before retry** when repetition could duplicate or compound the action. Choose `continue | stop | replan | escalate | handoff` from evidence.
10. **Communicate factually.** Separate known, unknown, changed-since-last-update, current action, and next update. Use the project's chosen cadence. Do not fabricate root cause, ETA, recovery confidence, or disclosure authority.
11. **Maintain one timeline.** Append timestamped observations, decisions, actions, evidence, owners, authorities, and outcomes. Do not rewrite history.
12. **Route technical diagnosis.** When root cause is not obvious, `/diagnosing-bugs` owns red-capable reproduction, hypotheses, instrumentation, and technical root-cause evidence. Incident coordination consumes its findings without delaying an obvious safe stabilization action.
13. **Use the protected security/data-integrity branch when applicable.** Preserve relevant evidence, minimize uncontrolled mutation, contain ongoing harm, keep availability separate from integrity/security recovery, and hand specialist investigation to the project security/data owner. Do not invent forensic conclusions or generic compliance obligations.
14. **Verify recovery with an applicability-driven confidence matrix.** Check applicable technical health, user journey, business/operations, data/security, capacity/backlog, and recurrence/stability evidence. Derive the observation window from project policy/system dynamics/evidence; **do not invent a generic observation duration**. One recovered metric cannot imply full recovery.
15. **Resolve and hand off.** Named authority chooses `MONITORING` or `RESOLVED`. Preserve temporary mitigations, residual divergence, remaining risk/unknowns, cleanup owner, communications/support obligations, and `/postmortem` handoff after stabilization.

## Stabilization outcome semantics

Keep these separate:

```text
CONTAINED     blast radius/propagation bounded; impact may remain
MITIGATED     an intervention reduced impact; fault/divergence may remain
RECOVERED     applicable recovery-confidence axes support acceptable behavior
RESOLVED      named authority accepts recovery + residual risk/divergence + handoff
```

Never infer an upward state automatically. `MONITORING` is an active incident state, not a synonym for `RESOLVED`.

## Command handoff

A command handoff transfers a fixed snapshot: impact, objective, active/recent actions, observed outcomes/falsifiers, mutation owner, pending side effects, communications commitment, recovery gaps, residual divergence, risks, and next decisions. Require receiving-command **acknowledgement** before recording handoff complete.

## State

```text
DETECTED → INVESTIGATING → MITIGATING → MONITORING → RESOLVED
```

The domain incident state is separate from workflow-control state. Use `PARTIAL`, `BLOCKED`, or `FAILED` when impact, authority, environment, execution, or recovery evidence is insufficient. Never report resolved because one metric recovered, a provider acknowledged a request, or a mitigation reduced only one impact axis.
