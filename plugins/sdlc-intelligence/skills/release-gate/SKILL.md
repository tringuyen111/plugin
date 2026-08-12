---
name: release-gate
description: Assess one fixed candidate for release readiness from QA, UAT, a current Deployment Plan, migration, configuration, dependency, observability, recovery, approval, and known-risk evidence. Use before deployment or rollout; do not design the deployment plan, deploy, infer authority, or convert acceptance/planning into release readiness automatically.
---

# Release Gate
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
- **When the candidate replaces, versions, migrates, or retires an active implementation or schema:** read [Single Active Truth and Replacement Discipline](../../resources/shared/references/single-active-truth-contract.md) to block release on unresolved duplicate truth, silent fallback, stale support surfaces, or missing upgrade evidence.
<!-- runtime-context:end -->


Assess whether one exact candidate is ready for one target environment. Read [RELEASE-GATE-RECORD.md](RELEASE-GATE-RECORD.md). A release decision is evidence and authority; it is not a generic checklist and it does not execute deployment by default.

## Preconditions

Resolve:

- candidate version/commit/artifact hashes and target environment;
- included/excluded scope and canonical work items;
- fixed-scope QA evidence with QA workflow state, QA verification verdict, acceptance readiness, QA separation requirement/policy, actual separation mode, QA executor relation/provenance, independence/attestation status, and open defects/gaps;
- Visual QA, security/privacy/performance evidence as relevant;
- authorized UAT decision, approver, conditions/waivers, and the QA provenance it consumed, or explicit reason UAT is not applicable;
- migrations, feature flags, configuration, secrets references, consumers, dependencies, and compatibility;
- exact Deployment Plan identity/revision/state from `deploy-release` PREPARE, including deployment strategy, change graph, capability/environment requirements, verification/recovery model, and unresolved blockers;
- responsible deployment operator, required approvals, and change window;
- rollback/recovery procedure with tested or explicitly untested status;
- monitoring signals, current baselines, alert ownership, and post-release checks;
- known defects, accepted risks, waivers, support/documentation impact, and incident escalation.

`PLAN_READY` Deployment Plan evidence is an input. It means deployment engineering is complete enough for release assessment; it does not prove QA/UAT acceptance, release eligibility, current provider authority, or final environment health. A missing/stale plan for a deployment-bound candidate is a deployment-engineering evidence gap; hand that gap to `DEPLOY_PREPARE` rather than designing the plan inside this gate.

UAT acceptance is an input. It does not prove deployability, migration safety, monitoring, rollback, or environment health. UAT and release assessment must not strengthen QA provenance: a UAT decision, different executor, or workflow `READY` cannot turn procedural/same-agent/unknown QA evidence into independent QA. Preserve missing or contradictory QA separation/provenance as an explicit release evidence gap and apply only the project's authorized separation policy/waiver authority.

## UAT record admission

Before UAT acceptance may support release readiness, bind the **exact UAT record revision, digest, or equivalent immutable identity** produced by `/accept-uat`. A logical UAT ID, decision state, approver name, or decision date alone is insufficient. Bind that record to the fixed release candidate/build and target environment, accepted scope, UAT fixed-point validity/invalidation summary, authorized decision, and still-applicable conditions/waivers.

Admit only UAT fixed-point truth that is current for the release meaning. Preserve `CURRENT | STALE | UNVERIFIED | CONFLICTING` (or the upstream semantic equivalent) and named invalidation triggers. Candidate or environment mismatch is non-current evidence. A stale, unverified, conflicting, mismatched, superseded, or otherwise non-current UAT record cannot establish release eligibility; preserve the historical decision rather than rewriting UAT state to make it fit the release attempt, and route current acceptance back through `/accept-uat`.

Cross-bind the exact QA report revision/digest recorded inside the UAT record to the current QA evidence package consumed by Release. If the UAT record consumed QA revision Q/r7 while Release consumes Q/r8, that QA identity mismatch means Release cannot infer that the UAT decision still applies. Route `/accept-uat` for QA re-admission and authorized reconfirmation; do not recompute business acceptance, Test Strategy, Test Condition, Defect Report, or QA provenance inside this gate. Release cannot strengthen QA provenance or UAT authority.

Artifact currentness and decision semantics remain separate. A `CURRENT` UAT record with `REJECTED` or `PENDING` is still a rejection/pending decision; an `ACCEPTED` label on a non-current record is still non-current evidence. Conditions/waivers must still be applicable under the UAT record fixed point. `CONDITIONALLY_READY` cannot absorb a missing or non-current required UAT record. Exact current UAT evidence alone does not establish `READY_FOR_RELEASE`; Deployment Plan, recovery, observability, authority and all other required release evidence remain independently required.

## Release decision artifact fixed point

A downstream deployment workflow may consume `READY_FOR_RELEASE` only from one **exact current
Release Gate decision artifact**. Before handoff, bind the Release Gate record ID, exact record
revision and digest (or equivalent immutable identity), decision evidence cutoff/finalized time,
fixed candidate/build/config identities, target environment/scope, exact admitted UAT record,
current QA evidence package/provenance, exact Deployment Plan identity/revision/state, decision
authority, and the conditions/waivers that materially control the decision. A logical `REL-<id>`,
a readiness label, owner name, or decision date alone is insufficient downstream evidence.

Preserve Release Gate fixed-point validity as `CURRENT | STALE | UNVERIFIED | CONFLICTING` (or an
equivalent upstream/downstream control vocabulary). Currentness is separate from readiness
semantics: a `CURRENT` `NOT_READY` decision remains `NOT_READY`, while a `STALE`
`READY_FOR_RELEASE` record remains stale evidence and cannot support deployment admission.

Material controlling-input drift makes a finalized record non-current. In particular, treat the
prior record as `STALE` when release meaning can change because the candidate/build/config,
target environment/scope, admitted UAT record revision/currentness/conditions, QA evidence
revision/verdict/provenance, Deployment Plan revision/state, recovery or observability evidence,
decision authority, approval, condition, waiver, blocker, or accepted-risk basis changed.
Conflicting record identity/currentness is `CONFLICTING`; do not guess which revision is current.
A non-material documentation, formatting, or unrelated metadata change does not automatically
invalidate the decision unless it changes one of those controlling meanings.

Preserve superseded Release Gate decisions as historical evidence. **Do not rewrite a prior or
historical record to make it look current.** After material invalidation, re-evaluate the affected
release evidence under the current fixed point and finalize a **new record revision** that
supersedes the prior one before downstream deployment may consume release eligibility again.

If the canonical artifact/persistence/version mechanism cannot establish the exact record
revision, digest, or equivalent immutable identity, **do not invent or fabricate one**. Preserve
the release assessment and the missing identity truthfully, mark the downstream decision artifact
`UNVERIFIED`/`PARTIAL`, and do not hand it to deployment as current release evidence until a real
identity can be established. This fixed-point contract adds no deployment authority.

## Single active truth release gate

A candidate is not release-ready while a superseded implementation, route, test contract, configuration branch, hidden fallback, or migration history remains active without a named supported consumer. Replacement parity alone is insufficient: callers must be cut over and the old support surface removed, or coexistence must be an explicit supported contract. For data changes, require environment classification and the applicable empty-to-latest, previous-release-to-latest, checksum, and failure-path evidence. Duplicate truth or unsupported legacy sediment blocks readiness.

## Process

1. **Freeze the candidate.** Record immutable artifact/version/commit, environment, the exact UAT record revision/digest or equivalent immutable identity admitted for this assessment, and the working Release Gate record ID. Bind the current QA package, Deployment Plan, recovery/observability evidence, authority and conditions that control this decision. If source, package, configuration, environment, or another controlling evidence revision changes before finalization, invalidate the assessment. After finalization, material controlling-input change makes the Release Gate record stale and requires re-evaluation into a new record revision rather than rewriting the prior decision.
2. **Reconcile scope.** Link Product scope, the exact UAT record, tickets, release notes, migrations, flags, and exclusions. Confirm the UAT fixed candidate/environment and accepted scope match this release fixed point. Do not create a second task-status source.
3. **Inspect evidence.** Separate `PASS`, `FAIL`, `INCONCLUSIVE`, `NOT_RUN`, and stale evidence. Preserve QA workflow state, QA verification verdict, acceptance readiness, separation requirement, actual mode, executor/provenance, and attestation status as distinct consumed facts; do not derive one from another or from UAT. Admit the UAT record by exact identity, current fixed-point validity, candidate/environment match, applicable conditions/waivers, and UAT-consumed QA report identity; a non-current UAT record routes to `/accept-uat` instead of being repaired here. Developer tests or an approval alone are insufficient. Validate the Deployment Plan identity/revision/state against the fixed candidate/environment and keep plan blockers/assumptions visible.
4. **Assess change mechanics from the Deployment Plan.** Review deployment ordering, compatibility, migrations, flags/exposure, dependencies, capability/environment protections, observability, recovery, credentials references, and irreversible steps. If these mechanics are missing or materially stale, return the deployment-engineering gap to `DEPLOY_PREPARE`; do not author a replacement plan inside `release-gate`.
5. **Prove rollback or recovery.** Record exact trigger signals, owner, procedure, data implications, and last tested evidence. Never invent percentage or latency thresholds; derive them from current policy/baseline or mark unresolved.
6. **Define observability.** Name metrics/logs/traces/business checks, normal baseline, watch duration from project policy, responder, and escalation. Do not copy a generic “15 minutes” as truth.
7. **Verify authority.** Record who may approve and who may deploy. Preview external writes/deployment actions and require explicit confirmation before any adapter executes them.
8. **Issue readiness.** Choose `NOT_READY`, `CONDITIONALLY_READY`, or `READY_FOR_RELEASE` with hard blockers, bounded conditions, owners, evidence, and expiry/recheck triggers. `CONDITIONALLY_READY` is allowed only when the gate assessment itself is complete and evidence-backed; it must not substitute for missing required release evidence, including a missing/stale/unverified/conflicting/mismatched required UAT record, an unresolved hard blocker, or missing authority required to complete this gate. Every condition needs a named owner, closure evidence, and recheck trigger. `CONDITIONALLY_READY` does not establish release eligibility; close/recheck its conditions under the same fixed candidate before upgrading the release conclusion.
9. **Hand off.** Finalize/persist the Release Gate decision artifact before cross-owner execution handoff: bind its exact record revision/digest (or equivalent immutable identity), decision evidence cutoff, controlling evidence identities, and `CURRENT` fixed-point validity. If a real canonical persistence/version identity cannot be established, do not fabricate one; preserve the assessment but keep the downstream handoff `UNVERIFIED`/`PARTIAL`. A consumable `READY_FOR_RELEASE` handoff binds that exact current Release Gate record, the exact admitted current UAT record revision, exact current Deployment Plan revision, and unchanged candidate/environment as evidence for the separate deployment execution workflow. After invalidation, recheck the affected release evidence and issue a new superseding record revision before handing off again. The handoff does not grant deployment authority and does not authorize deployment. `deploy-release` must revalidate the release/plan fixed point, resolve live deployment capability, operation envelope, current authority, operation policy verdict, required confirmation, and postconditions at execution time. The gate does not claim `RELEASED` until deployment and post-release checks are observed.

## Completion

Keep workflow completion separate from the Operations release-readiness conclusion. A complete, evidence-backed assessment may return workflow `READY` with release readiness `NOT_READY`, `CONDITIONALLY_READY`, or `READY_FOR_RELEASE`. The workflow state says whether this gate was completed truthfully; release readiness says what the fixed candidate is allowed to claim about release eligibility. Only a **CURRENT exact Release Gate record** whose readiness is `READY_FOR_RELEASE` establishes downstream-consumable release eligibility. A logical readiness label or a `STALE`, `UNVERIFIED`, or `CONFLICTING` Release Gate record cannot support deployment admission. The consumable record must carry its exact revision and digest (or equivalent immutable identity); when that identity cannot be established, preserve the assessment but keep the cross-owner handoff `PARTIAL`/`UNVERIFIED`. A release conclusion that relies on UAT requires an exact admitted UAT record whose fixed-point validity is current for the fixed candidate/environment and whose decision/conditions remain applicable. `STALE`, `UNVERIFIED`, `CONFLICTING`, or mismatched UAT evidence cannot establish release eligibility. `CONDITIONALLY_READY` records a complete gate with bounded unresolved conditions, not permission to deploy or a substitute for required release evidence.

- `READY` — the fixed-candidate assessment is complete and evidence-backed, the release-readiness conclusion is explicit, required decision authority is recorded when policy requires it, and blockers/conditions/expiry or recheck triggers are truthful. This includes a complete release readiness `NOT_READY` decision and a complete `CONDITIONALLY_READY` decision as well as `READY_FOR_RELEASE`.
- `PARTIAL` — useful assessment exists but one or more required checks, evidence bindings, conditions, or decision inputs remain incomplete, so the readiness conclusion is not yet fully supported.
- `BLOCKED` — the gate itself cannot be completed safely because a required source, environment, recovery fact, irreversible-risk decision, or decision authority owned elsewhere is unavailable. Do not use `BLOCKED` merely because the supported release-readiness conclusion is `NOT_READY`.
- `FAILED` — gate generation/validation, evidence integrity, or an attempted external side effect failed such that the gate artifact/process cannot be trusted.

Deployment is a separate downstream state and authority axis. Release readiness never grants deployment authority. Report only observed downstream deployment state with its canonical owner/reference; this gate must not mutate deployment state from an earlier readiness decision.
