---
name: devops-engineering
description: Engineer CI/CD, build and promotion automation, IaC, environment/configuration, observability-as-code, deployment, progressive delivery, rollback/recovery, release readiness, and normal service operations. Use when software-to-production mechanics are the primary outcome; not for ordinary application-only coding, Product/QA/UAT decisions, policy invention, or active incident command.
---

# DevOps Engineering

Own one delivery/production objective across the representation changes needed to finish it. A YAML, Terraform, Helm, workflow, monitoring-config, script, provider call, or runtime mutation does not create a new owner merely because the medium changed.

The governing loop is:

```text
bind current truth
-> choose the smallest DevOps objective
-> engineer/act under current authority
-> observe the consumed state
-> compare with the declared postcondition
-> reconcile/recover from residual state
-> close or re-enter from the earliest invalidated truth
```

Do not simulate an organizational handoff inside one objective. Use another capability only when its distinct decision mechanism can materially improve the work or a real authority boundary requires it; supporting capability output returns to this owner unless the user's terminal job changes.

## Job boundary

Own:

- delivery-system engineering: CI/build/test integration, artifact lineage/promotion, deployment automation, IaC/environment/configuration, observability-as-code, environment protection, concurrency and provider delivery seams;
- one release transaction: deployment plan, release-evidence disposition, authorized deployment/exposure, progressive verification, reconciliation and recovery;
- normal non-incident service operations: health assessment, bounded routine action, readback/recheck, capacity/config operational change and toil-reduction automation;
- procedure/runbook authoring or revalidation when a repeatable operation/recovery needs an executable artifact.

Do not invent or override:

- Product behavior or scope;
- QA verification or UAT acceptance truth;
- security/privacy/data/business policy or risk authority;
- provider credentials or protected-write authority;
- active incident command/stabilization/communications;
- a broader internal developer platform product/roadmap merely because it contains DevOps primitives.

`implement`, `codebase-design`, `verify-quality`, `security-engineering`, `data-persistence-engineering`, provider-specific Skills/tools, or diagnosis can supply deeper methods. **Repository representation does not force ownership transfer:** when the terminal outcome is a delivery/production objective, this Skill may materialize the required workflow/IaC/config/observability code and use those capabilities as supporting depth.

## Select one current objective before loading depth

Select from inspected current state, not lifecycle order or the word "deploy".

| Objective | Enter when | Load | Important non-action |
|---|---|---|---|
| `ENGINEER_SYSTEM` | The software-to-production path is missing, manual, unsafe, stale, unobservable, non-reproducible, or must change. | [Delivery System Engineering](references/delivery-system-engineering.md) | Do not claim a live provider path changed until the real consumed seam was exercised or truthfully left `NOT_RUN`/`BLOCKED`. |
| `RELEASE_CHANGE` | One exact candidate/change needs deployment mechanics, release assessment, execution/exposure, verification or recovery. | [Deployment Plan](DEPLOYMENT-PLAN.md), then branch-specific deployment/release references below | Do not split release assessment into a separate owner; planning, assessment and execution are one transaction with separate artifact fixed points. |
| `OPERATE_SERVICE` | A released service needs non-incident health assessment, routine action, recheck, capacity/config adjustment, or normal operational recovery. | [Operational Health](references/operational-health.md); load [Operational Action](references/operational-action.md) only for state-changing action | Do not launder a deployment, destructive action, or incident into a weaker "routine" class. |
| `AUTHOR_PROCEDURE` | A repeatable operation/recovery needs a new/current runbook or procedure. | [Procedure Authoring](references/procedure-authoring.md) + [Runbook Format](RUNBOOK-FORMAT.md); load [Operational Action](references/operational-action.md) for state-changing step semantics | Authoring a procedure never grants authority to execute it. |

If the current condition crosses the project's incident boundary, preserve exact delivery/runtime/residual-state evidence and transfer **active command** to `incident-response`. DevOps may continue as technical/operation support under incident command.

## Universal reality and operation kernel

Apply these before any branch-specific heuristic.

### 1. Bind current system truth

For every decision-changing current-system claim, inspect the smallest sufficient authoritative surface:

```text
repository/source/config
+ immutable candidate/artifact identity
+ environment/provider/runtime state
+ current evidence/records
+ live capability + policy/authority
= current DevOps fixed point
```

Plans, handoffs, docs, old runbooks, provider-friendly labels, validator output and memory are evidence inputs, not substitutes for inspectable current truth. Separate `FACT | INFERENCE | PROPOSAL | UNKNOWN` when the distinction matters. If an old document conflicts with current source/runtime, preserve the conflict rather than forcing reality to match the document.

### 2. Bind identities, currentness and invalidation

When an identity controls a decision, bind the exact revision/digest/operation/environment scope rather than a logical label. Candidate/build/config, Deployment Plan, release decision, operation record, UAT/QA evidence, runbook, provider operation and target state may each have independent currentness.

Material drift in a controlling input invalidates the dependent decision. Do not rewrite a historical record to make it look current; issue/recompute a new current record when needed.

### 3. Separate evidence from authority

Tool availability, repository write access, plan readiness, QA/UAT evidence, release readiness, provider ACK and current health are different axes. An authorized exception does not convert `FAIL`, `NOT_RUN`, `STALE`, `MISMATCHED` or `INCONCLUSIVE` evidence into `PASS`. A correct runbook does not grant execution authority.

Before a protected/live mutation, bind exact target/scope, side-effect class, policy/authority, required confirmation, concurrency/change-window facts and recovery/reconciliation path. If authority is missing, preserve the engineering decision and return `BLOCKED`; do not weaken the action class.

### 4. Treat provider results as operation evidence, not target truth

Preserve the ladder:

```text
request sent
-> provider accepted
-> operation identity exists
-> provider reports completion
-> target state observed
-> behavior/health verified
-> exposure verified when applicable
```

Claim only the strongest rung actually observed. Exit `0`, HTTP success, or a green provider status is insufficient when the consumed target state is inspectable.

### 5. Reconcile ambiguity before retry

For timeout, disconnect, partial apply, lost session, stale lease, or unknown provider outcome:

1. preserve the original operation identity and intended postcondition;
2. inspect provider/target state and already-committed effects;
3. determine repeat-safety/idempotency from the actual semantic operation, not the HTTP verb or command name;
4. choose retry, continue, compensate, rollback, roll-forward/repair, contain, or stop from observed residual state;
5. never blindly replay a state-changing step whose outcome is unknown.

### 6. Observe postconditions and re-enter from residual state

After mutation, read back the affected resource/runtime and verify the claim-relevant postconditions. Rebind changed fixed-point facts, then re-evaluate health/release state. A partial transaction starts from what actually happened, not from the desired plan.

Deployment state and exposure state remain separate. A binary/config can be deployed while traffic/tenant/region/feature exposure is zero, partial, or stale.

### 7. Keep proof strength explicit

Use `PASS | FAIL | INCONCLUSIVE | NOT_RUN` for evidence results and currentness such as `CURRENT | STALE | UNVERIFIED | CONFLICTING | MISMATCHED` where useful. Structural validation proves structure only. Static IaC/workflow checks do not prove provider execution; provider execution does not prove service behavior; service health does not prove Product success.

## `ENGINEER_SYSTEM`

Read [Delivery System Engineering](references/delivery-system-engineering.md).

Treat the delivery path as a production-affecting system, not a YAML document. Inspect the existing source and provider/runtime seam before choosing changes. When authorized, implement the smallest coherent change to workflows, IaC, deployment manifests, environment/config automation, observability configuration or operational automation; validate locally where meaningful, then exercise/read back the real provider seam when the claim requires it.

Prefer a provider/platform-native primitive when it satisfies the required semantics with less custom state and failure surface. Do not create custom orchestration merely to keep DevOps logic inside the repo.

**SHOW — representation does not change ownership:** a GitHub Actions workflow rebuilds separately for production, breaking artifact provenance. The DevOps objective is reproducible promotion. Inspect the actual workflow and artifact registry, change the workflow/config required to promote the verified artifact, validate it, then observe the actual run/provider state if available. Do not stop at "design a fix" and hand the YAML edit away solely because it is code.

## `RELEASE_CHANGE`

The transaction is continuous:

```text
bind candidate/environment
-> engineer Deployment Plan/change graph
-> assess release evidence
-> execute authorized graph/exposure
-> verify progressive/post-release evidence
-> reconcile/recover residual state
-> close with current records
```

Use [Deployment Plan](DEPLOYMENT-PLAN.md). Load only the depth that changes the current decision:

- unfamiliar or composite change type -> [Deployment Archetypes](references/deployment-archetypes.md);
- strategy, mixed-version/data/config/infrastructure compatibility, exposure or concurrency -> [Deployment Strategy](references/deployment-strategy.md);
- release eligibility/currentness/waiver disposition -> [Release Assessment](references/release-assessment.md) + [Release Decision Record](RELEASE-DECISION-RECORD.md);
- live mutation or pending provider operation -> [Deployment Execution](references/deployment-execution.md) + [Deployment Execution Record](DEPLOYMENT-EXECUTION-RECORD.md);
- progressive analysis, failure, partial state or recovery -> [Deployment Verification and Recovery](references/deployment-verification-recovery.md).

Rebind release evidence and live authority immediately before mutation. A current `READY_FOR_RELEASE` decision is evidence for admission, not deployment permission by itself.

**SHOW — stale acceptance:** UAT accepted candidate A and explicitly depended on QA revision Q7; the release assessment now depends on Q8. Keep the historical UAT decision and classify the current release as not eligible until `user-acceptance` re-admits/reconfirms the changed dependency. If UAT never depended on QA, do not stale UAT merely because QA changed; Release may still require current QA independently. Do not turn real acceptance staleness into a "condition" simply because the deployment plan is ready.

**SHOW — provider ACK mismatch:** provider reports rollout complete but target readback still shows the old config. Preserve operation identity, mark the target postcondition unverified/failed as evidence supports, reconcile before any retry, and do not report a released state from provider completion alone.

## `OPERATE_SERVICE`

Read [Operational Health](references/operational-health.md). Build health only from applicable current evidence; missing or conflicting axes remain visible. Do not infer `HEALTHY` from one green signal.

If action is needed, read [Operational Action](references/operational-action.md). Bind the current service fixed point, semantic action, side-effect class, authority, repeat-safety, provider capability and expected postconditions. Execute only the narrowest authorized action, read back the changed state, and re-assess health/residual risk.

If the action is actually a new candidate rollout or material deployment/exposure transaction, switch to `RELEASE_CHANGE` within this same Skill. If the current state crosses the incident boundary, transfer active command as above.

Recurring toil may justify automation. When the semantics are stable and the user has authorized the change, `ENGINEER_SYSTEM` may implement the automation rather than creating a permanent manual handoff.

## `AUTHOR_PROCEDURE`

Read [Procedure Authoring](references/procedure-authoring.md) and [Runbook Format](RUNBOOK-FORMAT.md). A runbook is an exact current procedure artifact for a named condition, service/environment and operator boundary.

For each material state-changing step, reuse [Operational Action](references/operational-action.md) semantics: precondition, target scope, side-effect/authority, repeat-safety, operation/action, expected immediate result, observed postcondition, stop/branch, evidence and recovery/compensation.

Bind rehearsal/verification scope and explicit invalidation triggers. A stale runbook can be revalidated or updated inside this objective; do not preserve a separate runbook owner or compatibility alias. Do not embed credentials/tokens.

## Cross-capability boundaries

- **Application/domain implementation:** if the terminal job is ordinary application behavior, `implement` is the better owner. If application/migration changes are supporting work inside an approved production-delivery objective, load the required engineering/data depth but return to this DevOps fixed point.
- **Technical architecture:** use `codebase-design` when broad architecture trade-offs are themselves the terminal decision or materially exceed local delivery-system design. Do not outsource routine CI/CD/IaC design merely to preserve old phase boundaries.
- **QA/UAT:** consume their exact evidence; never self-upgrade their verdict/provenance.
- **Security/data policy:** consume or request the governing decision; DevOps may implement controls but does not invent policy/meaning.
- **Incident command:** distinct owner once the incident boundary is crossed.
- **Provider-specific execution:** use exact current provider Skill/tool/docs when needed; provider knowledge is an implementation dependency, not a new accountable job.

## Completion

Return the terminal truth for the selected objective, not a generic green status.

- `READY` — the owned DevOps objective is coherent against bound current truth; required mutations were authorized; claim-relevant provider/target postconditions were observed where the claim requires them; records/currentness/residual risk are explicit; no hidden legacy/fallback owner remains for the changed behavior.
- `PARTIAL` — useful engineering/action/evidence exists but a material current fact, provider/runtime proof, postcondition, cleanup, or branch remains incomplete.
- `BLOCKED` — required authority, provider capability, current evidence, environment, or external Product/QA/UAT/security/data decision prevents safe continuation.
- `FAILED` — an owned mutation/verification/recovery attempt failed or left incoherent state.

Behavioral superiority of this Skill is not proven by native validation or package success. Preserve runtime cohort status as `NOT_RUN` until representative executions actually compare behavior.
