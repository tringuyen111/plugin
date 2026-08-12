# Routine Operation Execution

## Table of contents

1. Routine-operation boundary
2. Procedure/runbook admission
3. Capability and operation envelope
4. Fixed point and preconditions
5. Side-effect classification
6. Repeat-safety and idempotency
7. Ambiguous outcomes and reconciliation
8. Postcondition verification
9. Partial state, compensation and recovery
10. Concurrency and change windows
11. Cross-owner handoff
12. Toil and automation
13. Decision examples
14. Primary domain references

## 1. Routine-operation boundary

“Routine” means the operation is expected, bounded, understood for the current service/environment,
and has an owned authority/recovery/verification path. It does **not** mean low risk by definition.

Examples may include a project-approved maintenance task, bounded restart/drain, queue operation,
capacity adjustment, cache maintenance, certificate/credential operation, controlled failover or
another recurring action. These examples do not assign side-effect classes or authority; the exact
project capability/operation decides those facts.

Before acting ask:

- Is this normal operations, or is it actually a new deployment/release/change?
- Is active impact already incident command?
- Is technical diagnosis needed before action?
- Is the operation semantics known/current for this exact service/environment?
- Can success and failure be verified from consumed state?
- Is recovery/compensation understood for the actual side effect?

If the answer moves ownership elsewhere, hand off instead of stretching `service-operations`.

## 2. Procedure/runbook admission

When a runbook defines the procedure, consume it as exact current artifact truth:

```text
runbook ID + exact revision/identity
verification state appropriate to the claimed action
fixed service/environment/tool assumptions
preconditions and expected baseline
step/branch semantics
side-effect class per material step
repeat-safety/idempotency basis
observed postconditions
stop/failure conditions
rollback/compensation/recovery
invalidation triggers
```

A runbook does **not grant authority**. A correct command copied from a `STALE` runbook is still stale
procedure truth until revalidated. Do not silently patch the runbook inside runtime operations;
record the mismatch and hand the artifact correction to `/runbook`.

If no runbook exists but the project has another authoritative bounded operation contract, consume
that contract explicitly. If operation semantics are unresolved, block mutation rather than invent a
procedure from provider familiarity.

## 3. Capability and operation envelope

Resolve the semantic capability through `/capability-resolver` using current Project Capability
Profile truth. Bind the exact capability-resolution `record_ref` + SHA-256, schema/limits, canonical side-effect class, and current profile revision before execution.

Then construct/use the canonical Capability Operation Envelope:

```text
semantic capability + exact capability-resolution record/SHA-256
exact profile revision
concrete bounded operation + operation_parameters_sha256
exact target/resource scope
canonical side-effect class
preconditions
current policy verdict
required authority/approval
idempotency/repeat-safety basis
expected result/postconditions
failure/partial-state semantics
compensation/recovery
```

Provider/tool presence is not authority. `ALLOW`/`ALLOW_WITH_LIMITS`/`REQUIRE_APPROVAL`/`BLOCK`
semantics come from project policy; do not invent an extra approval or skip one that policy requires.

If the semantic action has no supported capability mapping, preserve `UNSUPPORTED`/capability-gap
truth. Do not substitute a vaguely similar provider call.

## 4. Fixed point and preconditions

Immediately before mutation rebind:

- exact service/environment/target resource;
- current release/deployment/config when relevant;
- current observed target state;
- exact current procedure/operation semantics;
- capability resolution and provider schema;
- policy/authority;
- concurrency/maintenance/change-window state;
- data/traffic/dependency assumptions;
- recovery/compensation prerequisites.

A material mismatch invalidates the action fixed point. Rebind/return to the owner rather than
silently editing the desired plan at execution time.

## 5. Side-effect classification

Never let the phrase “routine operation” weaken canonical safety.

A concrete action may actually be:

- read-only analysis;
- guarded external write;
- source-control change;
- deployment/release mutation;
- destructive data/infrastructure operation;
- security/identity change;
- external communication.

Use the canonical side-effect/policy semantics for what the action **does**, not how often operators
perform it. A deployment/destructive operation remains deployment/destructive even if a runbook runs
it every week.

If the action crosses another domain owner (for example a new release rollout), hand it off before
mutation.

## 6. Repeat-safety and idempotency

Classify repetition before the first mutation:

- **idempotent by provider contract** — repeating the same operation identity has the same effect;
- **idempotent by observed target state** — action is safe only after current state proves it is not
  already applied;
- **deduplicated by key/lease** — provider/project prevents duplicate operation identities;
- **non-idempotent** — repeating can compound/duplicate effects;
- **UNKNOWN** — repeat-safety cannot be established.

`UNKNOWN` is a retry blocker for state-changing actions unless project recovery policy explicitly
handles the ambiguity.

Do not assume HTTP method, CLI exit status or a friendly provider name proves idempotency.

## 7. Ambiguous outcomes and reconciliation

Timeout, disconnect, cancelled client request, partial provider response or lost ACK can mean:

```text
not started | accepted | running | partially applied | completed | failed after partial effect | unknown
```

Before retry:

1. query operation identity/status when possible;
2. read current target/resource state;
3. compare with preconditions/postconditions;
4. inspect residual/partial effects;
5. decide whether retry, continue, compensate, recover or handoff is safe.

**Reconcile provider/target state before retry** whenever repetition can duplicate or compound the
effect. Do not convert uncertainty into `FAILED` merely because the client did not receive an ACK.

## 8. Postcondition verification

Provider `ACK`, request acceptance, job creation, workflow completion status or command exit `0` is
not enough when the consumed state can be inspected.

Verify layers independently as applicable:

```text
operation accepted/created
provider operation terminal state
intended resource/state observed
critical service behavior remains/returns acceptable
data integrity/correctness preserved
capacity/backlog/dependency effect acceptable
operational objective/guardrail effect acceptable
```

Claim only the deepest verified layer. If the provider says success but consumed state contradicts
it, the operation is not verified successful.

## 9. Partial state, compensation and recovery

When a material operation partially applies:

- freeze further dependent actions unless progression is needed to reach a declared safe checkpoint;
- record every resource/state already changed;
- preserve unknown state instead of assuming rollback;
- select rollback, compensation, roll-forward/repair, manual recovery or cross-owner handoff from
  actual side-effect semantics and authority;
- verify recovery/compensation postconditions separately.

A successful compensation does not rewrite the attempted operation as if it never failed.

Irreversible/destructive effects may have no rollback. Never promise rollback merely because the
runbook has a section with that name.

## 10. Concurrency and change windows

Normal operation can collide with deployment, maintenance, incident mitigation, background repair or
another operator.

Before mutation inspect project-owned lease/concurrency/change-window truth. If a conflicting owner
has an active transaction, coordinate/handoff rather than racing.

Useful controls may include provider operation identity, lock/lease, maintenance state, change
window, resource version/precondition, compare-and-set token, queue ownership or another current
project mechanism. Do not invent one if it does not exist.

## 11. Cross-owner handoff

### To `incident-response`

When project incident policy establishes active impact/incident command. Preserve exact operation
facts, residual state and observed service evidence.

### To `diagnosing-bugs`

When technical cause/fix investigation is required beyond normal operational evidence. Do not infer
root cause from a successful/failed operational action alone.

### To `deploy-release` / `release-gate`

When the requested action is actually a release/deployment/recovery transaction or requires a new
candidate/release decision.

### To `runbook`

When the procedure is missing, stale, contradictory or needs correction based on observed runtime
truth.

### To Product learning

When service operation is complete but released-product metrics/support patterns require Product
interpretation; hand to `metrics-review`/Product rather than declaring Product success.

## 12. Toil and automation

Repeated manual work is evidence, not an automatic automation mandate. Record:

- frequency/volume;
- operator time/interrupt cost;
- variance/error rate;
- side-effect/recovery risk;
- scaling relationship with service growth;
- whether procedure semantics are stable enough to automate;
- provider/capability gap;
- expected verification/recovery after automation.

Hand a bounded automation candidate to Engineering/integration ownership. Preserve the semantic
preconditions, authority, repeat-safety, reconciliation and postconditions rather than automating a
fragile sequence verbatim.

## 13. Decision examples

### Stale runbook + urgent but non-incident task

Do not execute from stale procedure truth. Preserve current service evidence, block the mutation,
and request runbook/procedure revalidation. Incident policy remains separate.

### Timeout after a non-idempotent action

Do not retry. Reconcile operation/target state and residual effects first.

### Provider says success, state unchanged

Operation is not verified successful. Investigate provider operation/current target state and decide
retry/recovery/handoff from evidence.

### “Routine” database purge

Frequency does not remove destructive semantics. Apply destructive authority/recovery controls or
block/handoff.

### Capacity increase during rising backlog

Verify the actual bottleneck, downstream capacity and postcondition. More capacity is not success if
backlog age/retry amplification/dependency pressure continues to worsen.

## 14. Primary domain references

Informative grounding; project policy remains authoritative:

- Google SRE Book, Eliminating Toil: https://sre.google/sre-book/eliminating-toil/
- Google SRE Book, service responsibilities and monitoring/operations principles: https://sre.google/sre-book/introduction/
- AWS Well-Architected Operational Excellence, Operate: https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/operate.html
- AWS Well-Architected, runbooks as procedures: https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_ready_to_support_use_runbooks.html
