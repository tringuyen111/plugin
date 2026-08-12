# Runbook Execution Contract

Use this reference when a runbook contains state-changing operations, multiple dependent steps, retry/re-entry risk, branches, rollback/recovery, or rehearsal evidence. The runbook remains an authored procedure for an authorized operator; this contract does not grant execution authority or replace provider integrations.

## Contents

1. Runbook fixed point and verification status
2. Step contract
3. Repeat-safety and idempotency
4. Partial execution, checkpoints, and resume
5. Ambiguous results and reconciliation
6. Branches, stop conditions, and recovery
7. Verification and consumed-state evidence
8. Rehearsal evidence
9. Currency and invalidation
10. Automation boundary
11. Anti-patterns

## 1. Runbook fixed point and verification status

Bind the runbook to the operational truth it was verified against:

- service/workload and environment class;
- scenario/trigger and non-trigger;
- source/config/deployment revision when relevant;
- command/tool/adapter/provider contract revision when known;
- required permissions/roles and authority source;
- data/traffic/dependency assumptions;
- monitoring/verification surfaces;
- rollback/recovery assumptions;
- last verification evidence.

Keep runbook verification status separate from workflow-control state:

- `NOT_RUN` — procedure authored/revised but no meaningful rehearsal/test evidence exists;
- `PARTIAL` — only part of the procedure or a weaker environment/mode was exercised;
- `VERIFIED` — the required procedure scope was exercised at the declared risk/environment level and its observed postconditions matched;
- `STALE` — a known invalidation trigger means old verification no longer supports current execution.

`VERIFIED` never means universal across all environments or future versions. State exactly what was exercised.

## 2. Step contract

Each material step should answer these questions before an operator reaches it:

```text
step id
-> precondition / current state
-> target scope
-> purpose
-> side-effect class
-> required authority
-> repeat-safety / idempotency basis
-> command / tool / adapter or manual action
-> expected immediate result
-> observed postcondition
-> stop condition / failure signature
-> evidence to retain
-> next step / branch
-> rollback / compensation / recovery if this step changes state
```

### Precondition

Use observable state where possible. Examples:

- exact active version/config matches the runbook fixed point;
- backup/snapshot exists and is readable;
- traffic is below/above a project-defined condition;
- no conflicting deployment/migration is active;
- required dependency is available;
- operator role/approval is valid;
- previous step's observed postcondition is PASS.

If a required precondition is false or unknown, stop or take an explicit branch. Do not continue because the runbook sequence says “Step 4”.

### Target scope

Name what the step can affect: service, region, tenant, queue, database/schema, resource set, traffic cohort, feature exposure, artifact, or other bounded target. Broad/globbed targets need stronger verification than a single expected output string.

### Side-effect class and authority

Use canonical project side-effect classes/policy. A runbook may document a deployment, destructive action, external write, paging/communication, or source-control step, but the runbook **does not grant** the authority to perform it. An emergency context does not convert documentation into permission.

### Expected immediate result vs observed postcondition

Separate:

- **Immediate result** — command exit code, provider acknowledgement, request ID, task queued, CLI output.
- **Observed postcondition** — target/consumed system state after the operation.

A step is complete only when the required observed postcondition is evidenced. `exit 0`, HTTP 2xx, “accepted”, or “queued” may be necessary but are not sufficient when the resulting state can be inspected.

## 3. Repeat-safety and idempotency

For every state-changing step, declare one of:

- **IDEMPOTENT_BY_CONTRACT** — repeating the exact operation against the same target is defined to converge to the same state;
- **DUPLICATE_PREVENTED** — operation uses a request/change/idempotency key or provider mechanism that prevents duplicate effect;
- **RECONCILE_BEFORE_REPEAT** — repeat may be safe only after inspecting current state and deriving the remaining delta;
- **NON_REPEATABLE** — repeat can duplicate/compound effect; stop and escalate/recover rather than replay;
- **UNKNOWN** — repeat semantics are not established; runbook cannot instruct blind retry.

Do not infer idempotency because a command “usually works” or because the previous invocation returned an error.

Examples of common non-repeat risks:

- creating duplicate resources/jobs/messages;
- increment/decrement or additive capacity operations;
- data backfills/migrations with non-idempotent writes;
- traffic-weight adjustments expressed as deltas;
- repeated external notifications;
- one-time credential/key rotation;
- destructive delete/purge actions.

## 4. Partial execution, checkpoints, and resume

A real operator may lose a session, hand off, hit a provider outage, or discover unexpected state after Step N.

Add checkpoints after material state transitions. A checkpoint records:

- last completed step ID;
- observed postcondition and evidence;
- current target state;
- side effects already committed;
- pending/ambiguous operations;
- temporary divergence;
- safe resume decision.

### Resume rule

On resume:

1. re-read the runbook fixed point and current target state;
2. compare current state with the last checkpoint;
3. re-evaluate invalidation/staleness triggers;
4. do not blindly replay completed state-changing steps;
5. reconcile ambiguous steps before retry;
6. branch to recovery/escalation if the current state no longer matches a valid runbook path;
7. continue only from the earliest step whose preconditions are currently true and whose prior required postconditions are evidenced.

Partial execution is a state to manage, not a reason to restart from the beginning.

## 5. Ambiguous results and reconciliation

A timeout, lost client connection, ambiguous provider error, or incomplete output can occur after the remote side effect was accepted.

For state-changing operations:

- capture request/task/change identifiers;
- inspect provider/target state after ambiguity;
- determine `APPLIED | PARTIAL | NOT_APPLIED | QUEUED | UNKNOWN`;
- **reconcile before retry** if repetition could duplicate or compound effect;
- retry only under the declared repeat-safety and authority contract;
- preserve `UNKNOWN`/`PARTIAL` rather than turning uncertainty into success.

When target state cannot be inspected, the runbook should say what evidence is missing and where execution stops/escalates.

## 6. Branches, stop conditions, and recovery

A safe runbook is not always one linear happy path.

For material failure signatures, define:

```text
observed condition
-> interpretation bounded to evidence
-> stop/continue rule
-> branch target
-> recovery/compensation action
-> escalation owner when unresolved
```

### Rollback, compensation, and recovery are not synonyms

- **Rollback** — restore a prior version/config/state when the old state remains compatible and restorable.
- **Compensation** — apply a new action that offsets an already committed side effect when true rollback is impossible.
- **Recovery** — restore acceptable service/operational behavior; may use rollback, compensation, repair, failover, or another authorized action.

A runbook must preserve when rollback cannot undo:

- external messages/payments/third-party effects;
- irreversible schema/data transformation;
- consumed queue/event effects;
- deleted data without a valid restore point;
- credential exposure;
- customer-visible actions already observed.

Do not promise rollback when the procedure only has a compensating/recovery path.

## 7. Verification and consumed-state evidence

Success verification should prove the intended operational outcome, not merely that commands ran.

Use applicable layers:

- provider/target configuration state;
- service/component health;
- logs/metrics/traces where they directly support the claim;
- critical user/business behavior;
- data/integrity checks for stateful operations;
- dependency/traffic behavior;
- absence of known failure signature;
- expected cleanup/no orphaned partial resources.

A local syntax validator or dry-run may prove command/config shape but not provider permission, remote state, credentials, runtime behavior, or consumed business outcome.

## 8. Rehearsal evidence

Record what was actually exercised. Useful categories include:

- **READ_ONLY_CHECK** — inspected current truth/commands without state change;
- **SIMULATION_OR_DRY_RUN** — tool/provider simulation or validation path with no committed state change;
- **NON_PROD_EXECUTION** — procedure executed against a representative non-production target;
- **BOUNDED_LIVE_EXECUTION** — authorized live procedure/step executed with observed postconditions;
- **RECOVERY_EXERCISE** — failure/rollback/compensation/recovery branch was actually exercised.

These are evidence descriptions, not universal assurance levels. A read-only check cannot prove a destructive step executes safely; non-production success does not automatically prove production permissions/capacity/data scale; live success without the recovery path does not prove rollback.

Record:

- exact runbook/fixed-point revision;
- environment/target class;
- steps/branches exercised;
- provider/tool versions when material;
- side effects actually performed;
- observed postconditions;
- limitations/gaps;
- evidence location/hash when available.

## 9. Currency and invalidation

Mark verification `STALE` or re-verification required when a material assumption changes, for example:

- service/application architecture or ownership;
- deployment/config/schema/data model;
- provider/tool/API/CLI contract;
- permissions/role/approval model;
- secret location/interface;
- trigger/alert/failure signature;
- dependency/traffic topology;
- rollback/restore mechanism;
- monitoring/health/business verification;
- command output/exit semantics;
- environment naming/target selection.

Do not use “reviewed recently” as proof that a changed dependency is still valid.

## 10. Automation boundary

A stable, frequent, deterministic runbook may be a candidate for automation, but the runbook Skill does not silently create an automation owner or execute provider writes.

When proposing automation, preserve:

- same preconditions and authority;
- same repeat-safety/idempotency semantics;
- target/state verification;
- partial-success/reconciliation;
- rollback/compensation/recovery;
- observability/audit evidence;
- safe human handoff for unsupported branches.

Route implementation to the appropriate Engineering/integration owner instead of embedding provider-specific automation code in the runbook.

## 11. Anti-patterns

Reject these patterns:

- “run command, expect success” without observed postcondition;
- restart from Step 1 after partial execution;
- retry after timeout without reconciliation;
- treating exit 0/provider ACK as consumed-state proof;
- hiding placeholders inside copy-paste commands;
- embedding secret/token values;
- a destructive step with no explicit authority/target/stop/recovery boundary;
- generic threshold or **generic timeout** invented because project truth is missing;
- claiming production safety from read-only or non-production rehearsal alone;
- global rollback claim when only compensation is possible;
- keeping `VERIFIED` after a material invalidation trigger;
- turning a runbook into an investigation playbook for unknown root cause;
- treating the runbook itself as permission to execute.
