---
name: deploy-release
description: Prepare deployment plans before release readiness, then execute, verify, and recover the exact authorized release after READY_FOR_RELEASE. Use for deployment engineering across application, configuration, infrastructure, schema/data, traffic, feature exposure, environment protections, rollout strategy, progressive verification, and recovery. Do not use to design cloud architecture, write application or CI/CD pipeline code, approve release readiness, choose providers, author runbooks, or command active incidents.
---

# Deployment Engineering

Own deployment engineering for one delivery candidate across three modes:

```text
PREPARE -> release-gate -> EXECUTE -> VERIFY_RECOVER
```

`PREPARE` engineers how the change can be deployed and verified. `EXECUTE` applies the exact
approved plan after release eligibility. `VERIFY_RECOVER` establishes actual state and closes or
recovers the transaction. Mode changes do not transfer Product, QA/UAT, release-readiness,
architecture, provider-selection, implementation, or incident-command authority into this Skill.

<!-- runtime-context:start -->
## Runtime context

- **Before returning a final state or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md).
- **When authority, incident command, release ownership, or another role could change the action:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md).
- **Before persisting a deployment plan/execution record or handing off residual work:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md).
- **Before deployment, rollback, provider mutation, traffic/feature exposure change, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md).
- **Before selecting a deployment/observability provider or fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md).
- **Immediately before any mutation:** use [Capability Execution Policy](../../resources/shared/references/capability-execution-policy.md) after `/capability-resolver` resolves the required semantic capability.
<!-- runtime-context:end -->

## Ownership boundary

Canonical owner: **deployment engineering mechanics and deployment/exposure transaction state**.

This Skill owns:

- deployment change-graph and dependency sequencing;
- deployment archetype/risk classification;
- rollout strategy and environment/protection requirements;
- deployment-versus-exposure modeling;
- migration/backfill ordering as deployment mechanics;
- capability requirements and staged operation envelopes;
- progressive verification and observed-state recovery;
- final deployment/exposure/residual-state handoff.

This Skill does **not** own:

- cloud/system/application architecture -> `codebase-design`;
- application, IaC, migration, or CI/CD pipeline implementation -> `implement`;
- Product, QA, or UAT decision truth;
- release-readiness decision -> `release-gate`;
- provider selection/translation -> `capability-resolver` / integration layer;
- operator procedure authoring -> `runbook`;
- active incident command -> `incident-response`.

A planning requirement may identify missing pipeline/infra/application work. Hand that work to the
canonical implementation/design owner instead of implementing it here.

## Select exactly one mode

Select from trustworthy artifact/runtime state, never from the word `deploy` alone.

### `PREPARE`

Use when a release-bound change has enough approved architecture/implementation/environment truth
to engineer deployment mechanics, but no current Deployment Plan exists or the plan is stale.

`PREPARE` **must not execute deployment mutations or external writes and must not establish
`READY_FOR_RELEASE` or release eligibility**. It may inspect read-only source, project capability
truth, environment state, provider capabilities, and policy needed to produce a plan.

### `EXECUTE`

Use only when all are available and current:

- exact Deployment Plan revision/digest/identity;
- exact candidate/build/config identities;
- exact target environment scope;
- exact Release Gate record ID plus exact record revision and digest (or equivalent immutable identity);
- Release Gate fixed-point validity `CURRENT`, exact readiness `READY_FOR_RELEASE`, and fixed candidate/environment match;
- current observed target state;
- live semantic deployment capability and current operation authority.

Provider availability is not authority. Any fixed-point drift invalidates execution authorization.

A logical Release Gate ID, a floating `READY_FOR_RELEASE` label, owner/date metadata, or an
unresolved record reference is insufficient mutation evidence. `STALE`, `UNVERIFIED`,
`CONFLICTING`, mismatched, or superseded Release Gate truth blocks deployment mutation and must
return to `release-gate` for the current release decision. A `CURRENT` `NOT_READY` or
`CONDITIONALLY_READY` record also cannot authorize mutation. Do not re-run UAT/QA, recompute
release readiness, or rewrite Release Gate state inside Deployment Engineering. If a canonical
release-record revision/digest cannot be established, do not invent or fabricate one. Even an
exact current `READY_FOR_RELEASE` record does not grant deployment authority; capability,
operation policy, approval/authority, concurrency and postconditions remain independently live.

### `VERIFY_RECOVER`

Use when a deployment operation has started, provider state is pending/partial/unknown, required
postconditions remain unverified, progressive evidence is being evaluated, or recovery/closure is
needed. Operate from observed residual state, not from the original desired plan.

If active production impact becomes an incident, preserve deployment facts and hand command
authority to `incident-response`; do not continue as incident commander.

## Progressive disclosure

Load only the branch-specific depth needed now:

- Before materializing or validating a plan, read [Deployment Plan](DEPLOYMENT-PLAN.md).
- When the change type affects strategy/risk, read [Deployment Archetypes](references/DEPLOYMENT-ARCHETYPES.md).
- When choosing rollout strategy or sequencing compatibility-sensitive changes, read [Deployment Strategy and Change Compatibility](references/DEPLOYMENT-STRATEGY.md).
- When environment protections, artifact promotion, CI/CD requirements, secrets/config drift, or concurrency are material, read [Deployment Automation and Environments](references/DEPLOYMENT-AUTOMATION-ENVIRONMENTS.md).
- When defining/assessing signals, progressive analysis, failure, rollback, roll-forward, containment, or closure, read [Deployment Verification and Recovery](references/DEPLOYMENT-VERIFICATION-RECOVERY.md).
- Before persisting execution/verification/recovery evidence, read [Deployment Execution Record](DEPLOYMENT-EXECUTION-RECORD.md).

## PREPARE — engineer the deployment before release approval

### 1. Bind the planning fixed point

Record what is trustworthy now:

- canonical project and Project Capability Profile revision;
- candidate/source/artifact/build/config identities available at planning time;
- target environment/population/region/tenant scope;
- current deployed/exposure/schema/infrastructure state;
- approved architecture/technical constraints and implementation state;
- release risk, availability/SLO, compliance/change-window constraints;
- known provider/capability facts without treating availability as permission.

If the candidate or target is still too undefined to choose deployment mechanics, return
`PARTIAL`/`BLOCKED` with the exact missing owner/fact. Do not fill technical gaps with generic
best practices.

### 2. Classify deployment archetypes and build the change graph

Read `references/DEPLOYMENT-ARCHETYPES.md` when any branch is non-trivial. A release can compose
multiple archetypes; do not classify by provider brand.

Build a directed graph across affected surfaces such as:

```text
artifact/runtime -> configuration/secrets references -> infrastructure/routing
                 -> schema/data/backfill -> traffic/exposure -> cleanup/contract
```

Each edge must state why ordering/compatibility exists. Include current/known-good state and
which nodes can coexist during rollout or recovery.

### 3. Choose or validate rollout strategy

Read `references/DEPLOYMENT-STRATEGY.md`. Solve from constraints:

- availability/downtime tolerance;
- blast radius and population control;
- parallel/surge capacity and cost;
- traffic/tenant/region switching capability;
- old/new state and protocol compatibility;
- warm-up and state transfer;
- signal attribution/observation delay;
- rollback/roll-forward feasibility;
- change window and concurrency policy.

A strategy whose required primitives or evidence are unavailable is not a valid strategy. For
example, do not plan automated canary promotion when no attributable progressive signal can be
observed; choose a safer strategy or preserve the blocker.

### 4. Engineer state, data, and exposure transitions

Keep **deployment state** and **exposure state** separate from planning onward. A binary may be
deployed while feature/traffic exposure remains inactive or partial.

For schema/data/stateful changes, establish the mixed-version window and compatibility sequence.
Use expand-compatible/backfill/switch/contract or an equivalent project-valid transition when
needed. If rollback becomes unsafe after an irreversible boundary, the plan must name
roll-forward/containment/manual recovery instead of inheriting a generic rollback statement.

### 5. Define automation and environment requirements

Read `references/DEPLOYMENT-AUTOMATION-ENVIRONMENTS.md` when applicable. The plan may require:

- immutable artifact promotion/digest binding;
- environment protection/approval rules;
- deployment serialization/concurrency group/lease;
- scoped credential and secret/config version handling;
- pre/post deployment checks and provider capability classes;
- change-window or regional sequencing;
- manual approval/hold points;
- deployment history/audit evidence.

These are **requirements on deployment automation**, not permission for this Skill to write a
workflow/pipeline/provider script. Missing implementation routes to Engineering/integration.

### 6. Freeze verification and recovery before release gate

Read `references/DEPLOYMENT-VERIFICATION-RECOVERY.md`. Name the evidence the chosen strategy
requires: startup/readiness/liveness, exact consumed state, synthetic/functional checks,
metrics/logs/traces, business guardrails, exposure, observation window, sample adequacy and
failure/inconclusive bounds.

Precompute safe recovery options and the state boundary at which each remains valid. Recovery
planning must distinguish rollback, traffic restore, feature disablement, roll-forward/repair,
manual containment, and incident handoff.

### 7. Materialize the Deployment Plan

Use `DEPLOYMENT-PLAN.md`. Bind the plan revision to the planning fixed point and mark unresolved
assumptions/blockers explicitly. A material candidate/config/environment/strategy/evidence change
stales the plan and requires revalidation or a new plan revision.

A complete plan means **deployment engineering is ready for release assessment**. It does not
mean the release is approved, the provider is authorized, or deployment may begin.

## EXECUTE — apply the exact approved deployment plan

### 1. Rebind the execution fixed point

Before mutation, verify all of these still match:

```text
Deployment Plan revision
candidate/build/config identities
target environment/scope
Release Gate record ID + exact revision/digest/immutable identity
Release Gate fixed-point validity + exact READY_FOR_RELEASE state
Project Capability Profile revision
current deployment/exposure/schema state
```

Any mismatch returns to the owning planning/release decision. A Release Gate record revision,
identity, validity, or fixed-candidate/environment change after this execution fixed point was
bound invalidates mutation authorization; rebind from current upstream truth before continuing.
Do not silently patch the plan at execution time and do not repair Release Gate truth here.

### 2. Resolve live capabilities and operation authority

Use `/capability-resolver` for the semantic operations required by the plan, such as
`deploy.plan`, `deploy.execute`, `deploy.rollback` or project-mapped equivalents. Bind exact
resolution records to Capability Operation Envelopes and apply shared operation policy.

Tool/provider presence never grants authority. Planning approval never grants mutation authority.
Missing verification or mandatory recovery capability can block an otherwise callable deploy.

### 3. Execute the dependency graph as a staged transaction

For each stage:

1. re-check precondition/current state;
2. check concurrency/lease/change-window truth;
3. execute the narrowest authorized semantic operation;
4. persist operation identity/result;
5. read back provider/consumed state;
6. evaluate the stage checkpoint before advancing.

A timeout is ambiguous until reconciled. Query the provider operation/current state before retrying
so idempotency is based on evidence rather than hope.

Do not treat applied subset + unresolved required changes as success. Safe independent partial
progress must have been declared before execution; otherwise preserve `FAILED` and residual state.

## VERIFY_RECOVER — prove actual state or recover from it

### 1. Establish actual deployment and exposure state

Keep these layers distinct:

```text
request accepted
operation created
provider operation completed
target/consumed state observed
service/behavior verified
exposure population verified
```

Claim only the deepest layer actually observed. Provider success is not a substitute for
readiness, correct config/schema, functional behavior, or user exposure evidence.

### 2. Evaluate progressive evidence

Use the plan's frozen signal identities/windows/thresholds. Outcome is:

- `PASS` — evidence supports advancing the declared stage;
- `FAIL` — blocking evidence contradicts the stage postcondition/guardrail;
- `INCONCLUSIVE` — missing/conflicting/too-early/too-sparse/non-attributable evidence.

`INCONCLUSIVE` never auto-promotes. Pause, observe, seek the named decision owner, or recover as
the plan permits.

### 3. Choose recovery from residual state

Freeze further rollout unless progression is required to reach a safe checkpoint. Then choose from
actual compatibility/authority/evidence:

- rollback to known-good;
- traffic/route restore;
- feature exposure disablement;
- roll-forward/repair;
- manual containment/recovery;
- incident handoff.

A rollback/fix-forward that is not already inside the approved recovery contract may itself become
a new candidate/change and require the appropriate release/authority gates.

### 4. Verify recovery and close the transaction

Recovery needs independent postconditions: restored/repaired identity, traffic/exposure, service
health, schema/data compatibility and required critical behavior. A rollback command exit code is
not recovery evidence.

Persist final deployment state, exposure state, residual mutations/risk, monitoring window and
canonical next owner. Do not remain active merely to consume monitoring, learning, documentation,
cleanup or incident/postmortem work owned elsewhere.

## Domain output semantics

### PREPARE

Return/persist a revision-bound Deployment Plan with plan state:

```text
PLAN_READY | PLAN_PARTIAL | PLAN_BLOCKED
```

`PLAN_READY` means the deployment mechanics/evidence/recovery plan is complete enough for
`release-gate` to assess it. It does not establish `READY_FOR_RELEASE`.

### EXECUTE / VERIFY_RECOVER

Persist one Deployment Execution Record bound to the exact plan and release eligibility.
Deployment state and exposure state remain separate. Use the domain states in
`DEPLOYMENT-EXECUTION-RECORD.md`; preserve `UNKNOWN`, `FAILED`, `ROLLED_BACK`, residual mutations
and evidence limitations instead of manufacturing closure.

## Completion

Use the shared Workflow Result Contract for workflow control state, but do not collapse domain
state into it.

- `READY` — the selected mode completed truthfully for its scope. PREPARE may be workflow `READY`
  with `PLAN_BLOCKED` when the plan assessment conclusively identifies a blocker; VERIFY_RECOVER
  may be workflow `READY` with deployment `FAILED` when the failure/recovery truth is fully
  established.
- `PARTIAL` — useful plan/transaction evidence exists but a required fact/check/state remains
  unresolved.
- `BLOCKED` — a required source, authority, provider capability, environment fact, or decision
  owner prevents safe continuation.
- `FAILED` — the attempted workflow/operation failed its contract; preserve the underlying domain
  failure and residual state.

Never infer release approval, deployment authority, successful deployment, exposure, recovery, or
incident resolution from workflow `READY` alone.
