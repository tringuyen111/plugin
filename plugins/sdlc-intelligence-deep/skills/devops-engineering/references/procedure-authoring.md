# Procedure Authoring

Use this reference when `AUTHOR_PROCEDURE` is selected. A runbook/procedure is a durable executable instruction artifact for a named condition; it is not an authority grant, incident diagnosis, architecture essay, or generic checklist.

Read [../RUNBOOK-FORMAT.md](../RUNBOOK-FORMAT.md) for the artifact shape. For every state-changing step, apply [Operational Action](operational-action.md); this reference adds only procedure-specific authoring, rehearsal and currency semantics.

## 1. Bind the procedure fixed point

Bind:

- service/system and environment;
- version/config/provider/tool assumptions;
- trigger and explicit non-trigger conditions;
- intended operator/audience;
- required access/authority/approval;
- verified commands/actions and tool/API version where material;
- dependencies/data/traffic assumptions;
- monitoring/postconditions;
- recovery/escalation;
- last rehearsal/execution evidence;
- invalidation triggers.

Classify procedure verification separately from workflow completion:

```text
procedure verification: NOT_RUN | PARTIAL | VERIFIED | STALE
artifact validity:      CURRENT | STALE | UNVERIFIED | CONFLICTING
```

Do not infer currentness from "reviewed recently" if a controlling dependency/provider/permission/config changed.

## 2. Scope the trigger narrowly

State exactly:

- when to enter;
- when **not** to enter;
- what fixed point must hold;
- what evidence distinguishes the intended scenario from a diagnosis/incident/deployment case.

A known repeatable recovery may be runbook-worthy. An unknown-cause investigation is not a deterministic procedure simply because it contains commands.

## 3. Preconditions before steps

Write inspectable prerequisites:

- access/authority;
- target/resource/environment identity;
- backup/state capture where required;
- dependency and traffic/data assumptions;
- conflicting-operation/concurrency state;
- baseline/expected starting state;
- current procedure revision.

A false or unknown required precondition stops or takes an explicit branch. Do not continue because the document says "Step 4".

## 4. Step contract

For each material step record:

```text
precondition
-> exact target scope
-> purpose
-> side-effect class + required authority
-> repeat-safety/idempotency basis
-> command/tool/action
-> expected immediate result
-> observed postcondition
-> stop/failure condition
-> evidence to capture
-> next step/branch
-> rollback | compensation | recovery when applicable
```

Do not duplicate the detailed action/retry/recovery method here; use `operational-action.md` as the canonical execution kernel.

Commands should be verified against current source/provider/tool truth. Never invent credentials, tokens, provider endpoints, thresholds or destructive flags from memory.

## 5. Branches, checkpoints and re-entry

A safe procedure is rarely one unconditional happy path. Encode the branches that materially change action:

- precondition false/unknown;
- provider operation pending/unknown;
- partial state after step N;
- postcondition mismatch;
- rollback unavailable;
- escalation/incident threshold crossed.

For long/multi-step procedures, mark checkpoints containing committed effects and current target state. Resume from observed state; never instruct an operator to replay all previous state-changing steps blindly.

## 6. Recovery semantics

Use the correct term:

- **rollback** restores a previously known state when the effect is reversible;
- **compensation** applies another effect to offset an external/non-reversible action;
- **roll-forward/repair** moves residual state to a coherent target;
- **containment** limits blast radius while preserving state for recovery/diagnosis;
- **manual recovery** is explicit when automation is unsafe/unsupported.

Do not promise rollback for irreversible data/external effects.

## 7. Verification and evidence capture

The procedure must say what proves each material success condition. Prefer consumed target state over command/provider acknowledgement.

Capture enough non-secret evidence to establish:

- exact procedure revision/fixed point used;
- steps/branches actually executed;
- operation identities;
- observed postconditions;
- skipped/not-run branches;
- residual state/risk;
- final monitoring/escalation condition.

A rehearsal of a subset proves only that subset.

## 8. Rehearsal depth

Choose the smallest rehearsal that can falsify the procedure's claim at its risk level:

```text
read-only prerequisite check
-> syntax/dry-run/simulation
-> representative non-production execution
-> bounded authorized live execution
-> recovery exercise
```

Record exactly which steps, branches and postconditions were exercised. Do not call a destructive production branch `VERIFIED` because the non-destructive happy path ran in staging.

## 9. Currency and invalidation

Invalidate/revalidate when a material assumption changes, such as:

- service/config/provider/tool/API version;
- permissions/auth mechanism;
- target naming/topology;
- data/traffic behavior;
- command semantics;
- monitoring/postconditions;
- rollback/compensation path;
- incident/escalation policy.

Preserve older procedure revisions as history where the artifact system does so, but do not leave an old active compatibility procedure discoverable as current truth.

## 10. Automation transition

A stable, frequent, deterministic procedure can become automation. Because DevOps owns both procedure semantics and delivery/operational automation, do not create an organizational handoff solely to cross that representation boundary.

Before automating, preserve the same contract: preconditions, authority, repeat-safety, operation identity, reconciliation, postconditions, recovery and evidence. The automated path must be verified at the real consumed seam before replacing the manual procedure.

Only after replacement parity and proof should the obsolete manual active path be removed or explicitly retained for a named contingency.

## Contrastive cases

### Stale command in an otherwise good runbook

A provider CLI command was removed. The runbook becomes stale for that branch. Rebind the current provider primitive, update/rehearse the affected branch, and preserve what remains untested. Do not execute the removed command and do not keep a hidden alias just to avoid migration.

### Procedure authored, user did not ask to execute

Return the current procedure artifact and its verification status. Do not perform the production mutation merely because all commands are available.

### Ambiguous retry after session loss

The runbook must instruct the operator to reconcile operation/target state before retry when the previous action may have committed. "Run Step 5 again" is unsafe without repeat-safety evidence.
