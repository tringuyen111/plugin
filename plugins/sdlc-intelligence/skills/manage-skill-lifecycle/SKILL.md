---
name: manage-skill-lifecycle
description: Govern promotion, monitoring, revision, and deprecation of skill-system artifacts using capability-gap, ownership, context, evaluation, package-impact, migration, and replacement evidence.
---

# Manage Skill Lifecycle
<!-- runtime-context:start -->
## Runtime context

- **Before returning a workflow or lifecycle result:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) and preserve missing evidence, approval, or execution as PARTIAL/BLOCKED.
- **Before changing ownership or an active discovery surface:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) and keep proposal, evaluation, and promotion decisions distinct.
- **When the request originated in project delivery:** read [Capability-Gap Handoff](../../resources/shared/references/capability-gap-handoff.md) and preserve project truth rather than embedding customer policy in the reusable system.
- **Before repository, provider, publication, or destructive actions:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) and verify authority.

- **When a material capability or lifecycle claim is asserted or disputed:** read [Claim Challenge Contract](../../resources/shared/references/claim-challenge-contract.md) and seek counter-evidence before changing factual status.
- **When maintaining this checked-out repository:** read [Repository Execution Map](../../resources/system/references/REPOSITORY-EXECUTION-MAP.md) to select canonical probes, evidence locations, and the standard versus advanced-assurance path.
- **When promoting, revising, deprecating, or removing an active skill-system artifact:** read [Single Active Truth and Replacement Discipline](../../resources/shared/references/single-active-truth-contract.md) to cut over atomically and remove superseded manifest, route, context, eval, docs, and package surfaces.
<!-- runtime-context:end -->

## Claim challenge gate

Challenge promotion, readiness, superiority, safety, and deprecation claims when they control a hard-to-reverse discovery or migration change. Separate factual evidence state from the authorized lifecycle decision. A risk acceptance may authorize a transition only within policy; it never rewrites `FAIL`, `NOT_RUN`, `MISSING`, or `CONFLICTING` evidence as success.


Read `../../resources/system/references/CORE-CONTRACT-DEPENDENCY.md`, `../../resources/system/references/SKILL-LIFECYCLE.md`, and [Sandbox-Native Evaluation Policy](../../resources/system/references/SANDBOX-EVALUATION-POLICY.md).

This workflow owns lifecycle records and active discovery changes. It does not waive audit/evaluation gates or rewrite project truth.

## Lifecycle execution gate

Resolve the execution mode before evaluating a requested promotion, revision, deprecation, or removal:

- `DECISION_ONLY` — the current environment can inspect the artifact and gate evidence and can produce a lifecycle decision/handoff, but canonical discovery/package mutation surfaces or their authority/verification path are unavailable. Do not edit active manifest, routes, context indexes, version/package surfaces, or publication state. When the requested scope includes applying the transition, active mutation remains `BLOCKED`; a decision-only request may still complete truthfully.
- `CANONICAL_MUTATION_CAPABLE` — the exact canonical source revision and active discovery/package surfaces are resolved, required validation/package mechanisms are available, and mutation authority can be evaluated. This mode only makes the mutation gate reachable; it does not itself authorize a write.

Do not infer canonical source from a writable directory, installed runtime package, familiar filenames, or remembered repository layout. Tool availability is not authority, and local write access does not grant lifecycle authority.

<transition_gate>
Before selecting a lifecycle branch, bind and preserve:

```text
current_state
requested_transition
artifact_revision
predecessor_evidence
```

Validate `current_state` and `requested_transition` against the canonical Skill Lifecycle contract and require the predecessor evidence for that transition. An unknown current state, unknown required artifact revision, invalid transition, or missing predecessor evidence is `BLOCKED`; never normalize the artifact into the state the request asks for. A material revision returns through review and evaluation before re-promotion.
</transition_gate>

<mutation_gate>
A positive lifecycle decision is not permission to mutate active discovery. For any applied promotion, deprecation, replacement, migration, or removal, require this sequence in order:

```text
lifecycle decision fixed
→ required evidence passes
→ canonical source resolved to the exact revision and complete mutation surface
→ capability/operation envelope resolved and authority verdict permits the bounded operation
→ bounded atomic write executes under declared rollback/compensation semantics
→ postcondition verification proves every required active surface coherent
→ lifecycle state committed only after verified cutover
```

Tool availability is not authority. Local write access with missing lifecycle authority, unresolved canonical source, or missing postcondition proof performs **no active mutation** and remains `BLOCKED`. A multi-surface changeset defaults to `safe_partial: false`; applied writes plus unresolved required writes are `FAILED` unless safe independent partial progress was explicitly declared before execution and canonical state remains coherent. Compensate or roll back only when that mechanism was declared and authorized; report attempted workflow failure even after successful compensation.
</mutation_gate>

## Promotion

Promotion makes an artifact discoverable and supported; it does not mean universal competence or automatically confer S4 strength. Resolve one explicit promotion profile before applying the evidence gate:

- `ASSURED` — default; use the behavioral/assurance requirements below.
- `SKILL_CREATOR_VALIDATED` — allowed only when the maintainer/user explicitly selects it for an OpenAI prompt-only Skill whose bounded capability does not depend on bundled deterministic execution, provider operations, deployment/destructive behavior, or an independent/safety/behavioral-superiority claim. Require `REVIEWED`, exact-byte OpenAI `skill-creator` validation and packaging, portable/repository structural checks, owner/neighbor and route/context coherence, package/version/migration/rollback truth, and explicit disclosure that behavioral evidence may remain `NOT_RUN`. `NOT_RUN` is not rewritten to PASS; it simply is not a gate for this profile.

For `ASSURED`, require evidence for:

- accepted bounded capability claim, correct artifact/capability type, and source-designed strength target;
- ownership/non-ownership and neighbor conflict review;
- context reachability, domain depth, portability, and side-effect safety;
- structural guards plus capability-specific eval coverage, observed outputs, evidence profile, and audit-assigned assurance tier;
- meaningful with-skill improvement where comparison is required, using `DIRECTIONAL_PASS` only where the Sandbox-Native Evaluation Policy permits it;
- router, manifest, package, context-load, and compatibility impact;
- version, changelog, migration, and rollback/removal plan.

For `ASSURED`, `FAIL`, `NOT_RUN`, or `INCONCLUSIVE` on an evidence axis required by the
assigned tier, failed critical invariants, unresolved duplicate ownership, or
hidden side effects block promotion. For `SKILL_CREATOR_VALIDATED`, behavioral `NOT_RUN` remains factual and non-blocking only inside the eligibility boundary above; structural/package failure, ownership conflict, hidden runtime side effects, or an unsupported assurance claim still blocks promotion. Missing independent provenance blocks an
independent claim or policy that explicitly requires attestation. Other
CRITICAL changes may use risk-specific assurance only when the exact destructive,
lifecycle, security, external-write, or verification-verdict risk has owner
authorization, representative trials, rollback/recovery, monitoring, and package
proof as applicable.

After the `<mutation_gate>` passes, promote atomically across the active manifest, routes/catalogs, docs/indexes, eval coverage, package allowlist, version, and migration notes. Verify the consumed package/discovery state after the write and confirm that core works without optional meta/integration packages.

## Monitoring

Observe invocation misses, false triggers, neighbor overlap, context cost, user corrections, hidden fallback, provider drift, failed artifacts, and lifecycle dead ends. Monitoring evidence may reopen the artifact as `REVISED`.

Do not preserve unsafe behavior merely for backward compatibility. Use migration and replacement routing.

## Revision

A material change to ownership, triggers, context, capabilities, side effects, outputs, or completion returns through review and evaluation. Add regression cases for the observed failure before promotion.

## Deprecation

Require:

- reason and evidence;
- replacement owner/route or explicit absence;
- compatibility and migration note;
- active-manifest and route removal;
- context/reference cleanup;
- version and removal timeline;
- provenance retained outside active discovery surfaces.

Deprecated artifacts must not remain model-discoverable or routable by accident.

## Atomic replacement and removal

A revision that replaces an active artifact is not complete at parity alone. Cut over every consumer, then remove superseded discovery, route, runtime-context, eval, docs/index, package, adapter, fixture, and fallback surfaces in the same lifecycle change. Git and immutable release artifacts retain provenance. Keep two versions active only as `SUPPORTED_COEXISTENCE` with named consumers, selection, tests, owner, and a removal condition.

For database-backed lifecycle changes, classify the target environment before destructive reset. Released compatibility uses append-only migrations with checksum, empty-to-latest, previous-release-to-latest, and failure-path evidence; disposable pre-release baselines may be reset only when no durable consumer exists.

## Domain output semantics

A lifecycle decision must preserve: artifact identity, current lifecycle state, requested transition, gate evidence, critical blockers, manifest/route/package changes, source-designed strength versus observed evidence, structural and capability-specific evaluation status, version/migration, monitoring or deprecation plan, resulting lifecycle state, and next owner.

Use the shared Workflow Result Contract for machine-facing state/evidence/blocker/handoff metadata. Present the lifecycle decision in the form needed by the maintainer or release artifact; do not force a universal visible report template.

<completion_gate>
- For an explicitly decision-only request, `READY` requires a valid transition decision, gate evidence, blockers/risks, and next owner to be truthful; applied mutation remains separate and must not be implied.
- For a request to apply an active lifecycle transition, `READY` requires `CANONICAL_MUTATION_CAPABLE`, a valid `<transition_gate>`, every required evidence gate, an authorized `<mutation_gate>`, verified postconditions across the complete mutation surface, and coherent resulting lifecycle state.
- Missing canonical source, authority, required evidence, or postcondition proof is `BLOCKED`; an attempted unverified/partial required write is `FAILED` unless a predeclared safe independent partial contract applies.
</completion_gate>
