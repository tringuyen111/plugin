---
name: service-operations
description: Operate a released service in normal non-incident conditions by binding current service/environment truth, assessing evidence-grounded operational health, performing only bounded authorized routine actions, verifying consumed-state postconditions, and routing incidents, diagnosis, runbook changes, deployment changes, or Product learning to their owners. Use for post-deploy monitoring, routine service maintenance, health/recheck decisions, capacity/backlog risk, and known operational tasks; do not invent SLOs, thresholds, provider commands, authority, or root cause.
---

# Service Operations

Own **normal service operation** after a deployment transaction closes and outside active incident
command. Turn current operational evidence into a health/risk decision, a bounded routine-operation
decision when action is justified, verified postconditions, and a truthful recheck or cross-owner
handoff.

<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to keep operational health, action state, missing evidence, and workflow completion distinct.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) so routine operation does not absorb incident, deployment, diagnosis, Product, or runbook ownership.
- **Before persisting, superseding, or handing off an operational record:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to preserve exact source/evidence identity, residual risk, invalidation, and the next owner without shadow truth.
- **Before any local/external write, deployment/destructive action, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) and preserve the operation's real side-effect class, authority, postcondition, partial-state, and compensation truth.
- **Before choosing an observability source, provider, runbook execution tool, tracker, or action capability:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) and resolve live project truth/capability/policy instead of assuming a provider.
<!-- runtime-context:end -->

Read [Operational Health Model](references/OPERATIONAL-HEALTH-MODEL.md) when health, post-deploy
monitoring, signal conflict, capacity/backlog, dependency state, or recheck sufficiency is material.
Read [Routine Operation Execution](references/ROUTINE-OPERATION-EXECUTION.md) before any state-changing
routine operation, ambiguous retry, partial action, recovery/compensation, or automation/toil handoff.
Persist durable operational truth with [Service Operations Record](SERVICE-OPERATIONS-RECORD.md).

## Ownership boundary

This Skill owns the **normal non-incident service-operations loop**. It does not:

- author or silently rewrite a runbook; `/runbook` owns the procedure artifact;
- own release readiness or a deployment transaction; `/release-gate` and `/deploy-release` keep those decisions/actions;
- command an active incident; `/incident-response` owns incident command and stabilization;
- invent technical root cause or implement a fix; `/diagnosing-bugs` and Engineering own diagnosis/change truth;
- turn service-health evidence into a Product outcome/experiment verdict; `/metrics-review` owns Product measurement interpretation;
- invent architecture, SLOs, thresholds, alert policy, on-call policy, credentials, provider commands, or operation authority;
- downgrade a deployment, destructive, security/identity, communication, or other protected operation merely by calling it “routine”.

A runbook is reusable **procedure truth**. This Skill is the runtime owner that may consume an
exact current runbook when a routine action is actually needed; runbook existence is never mutation
authority.

## Modes

Choose from current service truth, not from wording alone.

### `OBSERVE`

Use for post-deploy monitoring, health/recheck, routine service review, capacity/backlog/dependency
assessment, or a non-incident anomaly where no state-changing action has yet been justified.

`OBSERVE` is read-only. It may resolve bounded logs/metrics or other available operational evidence,
but it must not mutate the service merely because degradation or uncertainty exists.

### `ACT`

Use only for a bounded normal operational action after the operational fixed point is current, the
trigger/action rationale is explicit, the exact procedure semantics are current when a runbook is
used, the semantic capability is available, and current project policy/authority permits the action.

A familiar action is not automatically routine. If the real change is deployment/release,
destructive, incident mitigation, architecture/implementation, security/identity, or another
protected owner's work, preserve that classification and hand it off.

### `VERIFY_HANDOFF`

Use after an operation attempt, ambiguous provider result, monitoring-window expiry/recheck, or
material state change. Operate from **observed residual state**. Verify postconditions, re-assess
health/risk, preserve remaining unknowns, and choose the current next owner.

## Operational fixed point

Before making a current health claim or executing a routine action, bind the material facts that give
that claim meaning:

```text
service/workload identity + exact environment/scope
current release/deployment/config identity when material
current operational-objective / SLO / health-policy revisions when defined
signal definitions + source + evidence window/cutoff + freshness/coverage
critical dependency state + capacity/backlog/data expectations when applicable
known temporary divergence + expiry/recheck condition
current maintenance/change/concurrency state
current incident state / incident-policy context
exact runbook revision + verification state when an action consumes a runbook
current Project Capability Profile / operation-policy revision when acting
```

Do not fabricate a revision, threshold, evidence window, or provider identity merely to complete the
fixed point. A material service/config/dependency/objective/signal/change/incident/runbook fact change
**invalidates the bound operational fixed point** for affected claims/actions and requires rebind from
current truth. Non-material documentation/format metadata does not automatically invalidate it.

## Operational health truth

Operational health uses these domain states:

```text
HEALTHY | DEGRADED | AT_RISK | UNKNOWN
```

They describe service operational evidence, not workflow completion and not incident authority.

Assess only **applicable health dimensions** using project truth. Common dimensions include critical
availability/journeys, latency/responsiveness, errors/correctness, saturation/capacity/backlog,
dependency behavior, data integrity, and explicit operational objectives/guardrails.

- `HEALTHY` requires enough applicable current evidence to support the claimed scope; **one green
  signal does not prove service health** when other material dimensions are missing or contradictory.
- `DEGRADED` means current evidence supports impaired behavior/guardrails, without automatically
  establishing an incident.
- `AT_RISK` means the service may still function but current evidence shows material headroom,
  backlog, dependency, expiry, maintenance, or guardrail risk requiring action/recheck.
- `UNKNOWN` means evidence definition, freshness, coverage, applicability, or conflict prevents a
  defensible state claim.

Do not invent an SLO, threshold, acceptable error rate, capacity headroom, observation window, or
incident trigger. If project policy does not define one, report the observation and uncertainty and
name the owner/evidence required.

## Process

1. **Fix mode and scope.** Resolve service, environment, operation reason, current deployment/release
   context when material, and whether an active incident or deployment transaction already owns the
   situation.
2. **Bind the operational fixed point.** Record the exact facts above. Preserve missing/conflicting
   facts as `UNKNOWN`, `PARTIAL`, or `BLOCKED`; never silently inherit a stale prior state.
3. **Resolve expected state/objectives.** Use project SLO/health/alert/capacity/data/dependency truth.
   Separate explicit policy from inferred engineering expectations. Never invent a threshold.
4. **Acquire only needed evidence.** Resolve bounded observability capabilities through
   `/capability-resolver`. For every material signal preserve identity, source, definition, scope,
   time window, freshness, coverage and caveats. Provider availability is not evidence quality.
5. **Build an applicability-driven health matrix.** Compare current evidence against applicable
   expected behavior across the material health dimensions. Preserve conflicts rather than choosing
   the most convenient signal.
6. **Classify operational health.** Return `HEALTHY | DEGRADED | AT_RISK | UNKNOWN` with the evidence
   boundary. `DEGRADED` or `AT_RISK` does **not automatically establish an incident**. When project
   incident criteria/authority establish active impact, preserve the fixed point/evidence and hand
   command to `/incident-response`.
7. **Choose the smallest owned next action.** Select one of: no action; observe/recheck; bounded
   routine operation; runbook update request; deployment/release/Engineering handoff; technical
   diagnosis; incident handoff; or Product-learning handoff. Do not create work merely because this
   Skill is active.
8. **When a routine action uses a runbook, admit exact procedure truth.** Bind the runbook ID/revision,
   `VERIFIED`/current evidence appropriate to the action, preconditions, branches, repeat-safety,
   postconditions, recovery/compensation and invalidation state. A runbook does **not grant authority**
   and a `STALE`/unverified procedure cannot be treated as current execution truth.
9. **Resolve live capability and live policy/authority.** Resolve the exact semantic action capability
   at execution time, bind the Capability Operation Envelope, and apply project policy. Tool/provider
   presence is not authority. If the semantic action has no supported capability, preserve the
   operational decision and return a capability/integration gap instead of substituting a similar call.
10. **Preserve side-effect class and concurrency.** Re-check target state, maintenance/change window,
    lease/concurrency/conflicting operation, data/traffic implications and action side-effect class.
    A “routine” label must not launder a deployment or destructive operation into a weaker gate.
11. **Execute the narrowest authorized operation.** Bind operation identity and repeat-safety basis.
    After timeout/ambiguous acknowledgement, **reconcile provider/target state before retry** when
    repetition could duplicate or compound the effect.
12. **Read back consumed state and verify postconditions.** Provider `ACK`, exit `0`, or request
    acceptance is **not a verified postcondition** when target state is inspectable. Read back the
    changed resource/state and verify applicable service, business/critical-path, data, dependency,
    capacity/backlog and operational-objective effects before calling the action successful.
13. **Re-assess after action or recheck.** Rebind any material changed fixed-point facts, recompute the
    applicable health matrix from current evidence, and preserve residual mutations/risk/unknowns.
14. **Route ownership truthfully.** Active incident -> `/incident-response`; technical cause/fix ->
    `/diagnosing-bugs`; deployment/release change -> `/deploy-release`/`release-gate`; procedure change
    -> `/runbook`; Product outcome interpretation -> `/metrics-review`; unsupported capability ->
    system integration/capability-gap handoff.
15. **Record recurring toil without owning its implementation.** When repetitive manual work, scale,
    risk or operator burden is evidenced, record a toil/automation candidate and hand it to Engineering
    or the appropriate system owner. Do not implement automation or reprioritize the backlog here.
16. **Persist current operational truth.** Finalize one Service Operations Record with the exact fixed
    point, evidence, health state, operation state/result/postconditions, residual risk/unknowns,
    monitoring/recheck condition and canonical next owner.

## Post-deploy handoff

When `deploy-release` closes with residual risk, a monitoring window, expiry/recheck condition, and
final observed deployment/exposure state, `service-operations` may consume that exact Deployment
Execution Record as an input. It must not reopen deployment execution merely to keep observing.

If health worsens after deployment transaction closure, assess current service evidence first. Hand
back to `/deploy-release` only when the work is truly deployment/recovery ownership; hand to
`/incident-response` only when the current condition meets the project's incident command boundary.

## Domain output semantics

Persist one [Service Operations Record](SERVICE-OPERATIONS-RECORD.md). Keep these axes separate:

```text
record validity:   CURRENT | STALE | UNVERIFIED | CONFLICTING
health state:      HEALTHY | DEGRADED | AT_RISK | UNKNOWN
operation state:   NO_ACTION | OBSERVING | BLOCKED | EXECUTED | FAILED | PARTIAL | HANDED_OFF
workflow control:  READY | PARTIAL | BLOCKED | FAILED
```

A workflow may be `READY` after truthfully establishing `DEGRADED`, `AT_RISK`, `UNKNOWN`, a blocked
routine action, or a cross-owner handoff; workflow completion never upgrades domain health/action
truth.

## Completion

`READY` requires a current or explicitly non-current **operational fixed point**, enough applicable
current evidence for the health state actually claimed, visible signal coverage/conflicts, truthful
operation state and **observed postconditions** for any executed action, preserved residual risk/
unknowns, and a named monitoring/recheck condition or next owner when one remains.

Use `PARTIAL` when useful health/action evidence exists but a required non-safety fact remains
unresolved; `BLOCKED` when missing authority/capability/current procedure/critical evidence prevents
safe owned continuation; `FAILED` when an attempted owned operation failed its contract. Never infer
`HEALTHY`, successful operation, incident resolution, deployment completion, or Product success from
workflow `READY` alone.
