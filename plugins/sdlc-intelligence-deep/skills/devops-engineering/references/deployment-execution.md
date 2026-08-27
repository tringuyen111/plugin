# Deployment Execution Transaction

Load this reference only after mode selection resolves to `EXECUTE`, or when a pending deployment operation must be reconciled before `VERIFY_RECOVER` can continue. Do not load it during `PREPARE` merely because execution may happen later.

## Contents

1. Rebind the execution fixed point
2. Resolve live capability and operation authority
3. Execute the declared change graph
4. Reconcile ambiguous provider outcomes
5. Preserve partial progress and residual state
6. Hand verification/recovery forward

## 1. Rebind the execution fixed point

Before any mutation, verify the exact current identities that authorize this transaction:

```text
Deployment Plan revision/digest
candidate/build/config identities
target environment/scope
Release Decision Record ID + exact revision/digest
Release Decision fixed-point validity = CURRENT
Release Decision readiness = READY_FOR_RELEASE
material provider/tool binding identity when provider choice controls execution
current deployment/exposure/schema state
```

A logical record ID, floating readiness label, owner/date metadata, or unresolved record reference is insufficient. `STALE`, `UNVERIFIED`, `CONFLICTING`, mismatched, superseded, `NOT_READY`, or `CONDITIONALLY_READY` release truth blocks deployment mutation and requires a current release assessment before execution can continue.

A material candidate, config, environment, plan, release-record, or authority change after this fixed point was bound invalidates mutation admission. Rebind current upstream truth; do not silently patch the plan or repair release-decision truth inside execution.

## 2. Resolve live capability and operation authority

For each semantic operation, identify the exact live project/provider primitive that can perform it. Use `provider-source-selection` only when provider/source/fidelity/fallback ambiguity is material; an already-known exact project primitive does not need a synthetic resolution record. Examples include project-mapped equivalents of:

- `deploy.execute`;
- `deploy.rollback`;
- traffic or exposure mutation;
- configuration/infrastructure/schema transition required by the approved plan.

Immediately before mutation, bind exact target/scope, current provider/tool contract, current authority/approval, concurrency/change-window protections, repeat-safety/idempotency, expected postconditions, and recovery capability. Provider availability is never authority. Planning approval is not mutation approval. A callable deployment operation is still blocked when current authority, mandatory verification capability, concurrency protection, or required recovery capability is missing.

## 3. Execute the declared change graph

Treat the approved plan as a staged transaction. For each graph node or stage:

1. re-read the current precondition/state that makes the stage eligible;
2. verify concurrency/lease/change-window truth;
3. invoke only the narrowest authorized semantic operation;
4. persist provider operation identity and immediate result;
5. read back provider state and consumed/target state where supported;
6. evaluate the declared checkpoint before advancing.

Do not reorder stages merely because a provider can execute them. Preserve the plan's compatibility edges and mixed-version window. Do not merge deployment state with exposure state: artifact/config/schema may be deployed while traffic, tenant, region, or feature exposure remains inactive or partial.

### Contrastive SHOW — provider accepted is not stage complete

```text
Provider: deployment job accepted, operation_id=op-42
Observed target: old config digest still consumed
Checkpoint: intended config digest must be active before exposure

=> stage state = INCONCLUSIVE / pending reconciliation
=> do not advance traffic exposure
=> do not report deployment success
```

## 4. Reconcile ambiguous provider outcomes

A timeout, lost response, disconnect, or unknown job result is ambiguous until reconciled. Query the provider operation and current target state before retrying.

Use this evidence ladder:

```text
request accepted
-> operation/job created
-> provider operation completed
-> expected target/consumed state observed
-> service/behavior checkpoint passed
-> intended exposure observed
```

Claim only the deepest layer actually observed. Retry only when the operation contract and observed state make that retry safe/idempotent. Never assume "timeout = not applied" or "provider success = consumed state correct".

### Contrastive SHOW — timeout after a schema step

```text
Migration call timed out.
Database reports migration version already applied.
Application readiness is not yet verified.

Wrong: retry migration immediately.
Right: reconcile migration identity/state, then continue from observed residual state and run the declared postcondition before any retry or next stage.
```

## 5. Preserve partial progress and residual state

Safe independent partial progress is valid only when the plan declared that independence before execution and canonical state remains coherent. Otherwise:

```text
some required mutations applied + another required mutation failed/unresolved
=> deployment transaction FAILED
=> freeze unsafe progression
=> compensate / rollback / contain where authorized and safe
=> persist every applied operation and residual state
```

A successful compensation restores a state boundary; it does not convert the attempted deployment into success.

If the transaction crosses an irreversible boundary, do not inherit a generic rollback. Use the plan's declared roll-forward, containment, traffic restore, feature disablement, or manual recovery path.

## 6. Hand verification/recovery forward

After each material stage and whenever execution becomes pending, partial, failed, or ambiguous, load [Deployment Verification and Recovery](deployment-verification-recovery.md) from `SKILL.md` and evaluate the frozen proof target, signal attribution, progressive outcome, residual state, and recovery choice.

If active production impact meets the project's incident boundary, preserve exact deployment facts and hand command authority to `incident-response`. Do not continue as incident commander merely because deployment initiated the impact.
