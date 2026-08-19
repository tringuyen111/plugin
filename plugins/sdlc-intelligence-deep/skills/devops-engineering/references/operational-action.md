# Operational Action

Use this reference for any non-incident DevOps action that can change provider/runtime/service state, including routine operations and state-changing steps inside a runbook. The same safety kernel applies whether the action is initiated manually, by a provider API, or by automation.

## Contents

1. Classify the action
2. Bind procedure/current truth
3. Bind capability and authority
4. Fixed point and concurrency
5. Side-effect/repeat-safety
6. Execute and preserve identity
7. Ambiguous outcome reconciliation
8. Postcondition verification
9. Partial state and recovery
10. Toil-to-automation
11. Boundary transitions
12. Contrastive cases

## 1. Classify the action

Name the semantic operation before choosing a command/tool:

```text
observe only
bounded reversible operational mutation
release/deployment/exposure mutation
stateful/data mutation
external/destructive action
incident-command action
```

A friendly "routine" label or a runbook step does not weaken the true side-effect class. If the action is actually a release/deployment/exposure transaction, switch to `RELEASE_CHANGE`. If incident criteria are met, transfer active command to the incident capability.

## 2. Bind procedure and current truth

If a runbook/procedure exists, bind its exact revision/currentness, fixed service/environment/config/provider assumptions, verified/rehearsed scope, preconditions, branches, repeat-safety, postconditions and invalidation triggers.

A stale procedure is evidence of intended semantics, not current execution truth. Because procedure authoring is within the same DevOps capability, revalidate/update it when authorized and useful; do not execute stale instructions merely to avoid changing documentation.

If no runbook exists, another current authoritative operation contract may be sufficient. A runbook is not mandatory for every bounded action.

## 3. Bind capability and authority

Resolve the exact semantic primitive at execution time. Bind:

- provider/tool/action and version-sensitive contract when material;
- exact target/scope/parameters;
- current auth context without exposing secrets;
- project policy and required confirmation/approval;
- expected immediate result and consumed postcondition;
- recovery/reconciliation path.

Tool/provider presence is not authority. If no current primitive faithfully performs the semantic action, preserve `UNSUPPORTED`/capability-gap truth rather than substituting a vaguely similar call.

## 4. Fixed point and concurrency

Immediately before mutation inspect:

- target version/resource identity/state;
- relevant service/environment/config state;
- maintenance/change-window constraints;
- active leases/concurrent operations;
- dependency/data/traffic preconditions;
- material recent changes that affect safety.

A material mismatch invalidates the action fixed point. Rebind/replan rather than pushing through a stale assumption.

Use an actual project/provider concurrency primitive where required. Do not invent a lock that exists only in prose.

## 5. Side-effect and repeat-safety

Determine repeat semantics from the actual operation:

- naturally idempotent under the exact target/version;
- idempotent only with a provider idempotency key/operation token;
- safely repeatable after target-state reconciliation;
- compensatable but not repeatable;
- irreversible/non-repeatable;
- unknown.

Do not infer idempotency from HTTP method, CLI exit status, or a command name.

For destructive/data/external effects, make the loss/compensation/recovery boundary explicit before execution.

## 6. Execute and preserve identity

Execute the narrowest authorized operation. Persist enough safe identity to reconcile it later:

- semantic action + target;
- request/operation/idempotency identity;
- provider acknowledgement/result;
- start/end/checkpoint timestamps where material;
- committed effects/partial state;
- evidence links.

Do not issue broader mutation merely because a provider primitive makes it convenient.

## 7. Ambiguous outcome reconciliation

After timeout, disconnect, lost session, client crash, or contradictory provider response:

```text
preserve original operation identity
-> inspect provider operation state
-> inspect target/consumed state
-> identify committed/partial effects
-> compare to intended postcondition
-> decide retry | continue | compensate | recover | stop
```

Do not convert uncertainty into `FAILED` just because no ACK reached the client, and do not assume "no response" means "no change".

## 8. Postcondition verification

Separate immediate command/provider result from the state the consumer depends on.

After mutation, inspect applicable:

- provider/target resource state;
- service availability/error/latency/capacity;
- business/critical path behavior when part of the operational claim;
- dependency/data integrity effects;
- queue/backlog/replica/config state;
- exposure/traffic state if relevant.

Provider ACK or exit `0` is not a verified postcondition when the target is inspectable.

Rebind changed facts and re-assess operational health after action.

## 9. Partial state and recovery

Reason from observed residual state. Choose among:

- continue from a valid checkpoint;
- rollback to known-good where actually reversible;
- compensate external/non-reversible effects;
- roll forward/repair;
- contain/disable exposure;
- manual recovery;
- incident escalation.

Do not promise rollback when only compensation or repair can restore an acceptable state.

Record residual mutations, divergence, unknowns and next verification condition explicitly.

## 10. Toil to automation

Evidence of repetitive manual work, scale limits, high operator burden or recurring risk may justify automation.

When semantics are stable and the user/project authorizes implementation, switch to `ENGINEER_SYSTEM` and materialize the automation while preserving:

- preconditions and authority;
- side-effect class;
- repeat-safety/idempotency;
- provider operation identity;
- ambiguous-outcome reconciliation;
- observed postconditions;
- recovery/compensation.

Do not keep a manual handoff merely because the old topology treated automation as a different owner.

## 11. Boundary transitions

- **Release/deployment/exposure:** switch to `RELEASE_CHANGE` inside DevOps.
- **Procedure artifact change:** switch to `AUTHOR_PROCEDURE` inside DevOps when the procedure itself needs authoring/revalidation.
- **Unknown technical cause:** use diagnosis as supporting depth; if diagnosis itself becomes the user's terminal job, the diagnosis capability may own it.
- **Incident:** transfer active command when the project incident boundary is met; preserve current operation/residual-state facts for incident command.
- **Product/security/data-policy decision:** stop only the affected mutation and request/consume the actual authority; do not invent it.

## 12. Contrastive cases

### Timeout after non-idempotent operation

Do not retry. Reconcile operation/target state and committed effects first, then decide recovery from evidence.

### Provider says success, target unchanged

Keep provider completion and target postcondition as separate facts. Do not report the operational action successful until the target state is verified or the mismatch is truthfully classified.

### "Routine" database purge

The name does not make it routine. Classify the destructive/data side effect, bind authority/recovery/retention policy, and stop if those truths are missing.

### Capacity increase while backlog rises

Scaling may be a bounded operation, but verify the intended queue/service effect after readback. If backlog continues to worsen, preserve `DEGRADED`/`AT_RISK` and re-enter diagnosis/capacity reasoning rather than calling the scale action successful because replica count changed.
