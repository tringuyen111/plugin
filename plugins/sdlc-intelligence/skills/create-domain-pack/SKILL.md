---
name: create-domain-pack
description: Design a reusable domain pack that composes skills, references, adapters, artifact graphs, owners, approvals, completion, evaluation, and installation policy without creating a competing SDLC router.
---

# Create Domain Pack
<!-- runtime-context:start -->
## Runtime context

- **Before returning a workflow or lifecycle result:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) and preserve missing evidence, approval, or execution as PARTIAL/BLOCKED.
- **Before changing ownership or an active discovery surface:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) and keep proposal, evaluation, and promotion decisions distinct.
- **When the request originated in project delivery:** read [Capability-Gap Handoff](../../resources/shared/references/capability-gap-handoff.md) and preserve project truth rather than embedding customer policy in the reusable system.
- **Before repository, provider, publication, or destructive actions:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) and verify authority.
<!-- runtime-context:end -->


Read `../../resources/system/references/CORE-CONTRACT-DEPENDENCY.md`, `../../resources/system/references/DOMAIN-PACK-CONTRACT.md`, `../../resources/system/references/SKILL-CREATION-STANDARD.md`, and `../../resources/system/references/SKILL-LIFECYCLE.md`.

## 1. Prove the domain boundary

Define the domain problem, target users/projects, recurring lifecycle, explicit non-goals, and why core composition plus shared references is insufficient. Separate reusable domain semantics from one customer's policy or provider stack.

## 2. Map ownership and lifecycle coverage

Identify canonical owners for every decision and the lifecycle stages the pack covers. Map upstream/downstream core routes and neighboring packs. The pack composes with the Delivery router and is governed by the System router; it may add reviewed routes but not a parallel router in either plane.

## 3. Design the artifact graph

Specify canonical and derived artifacts, identifiers, maturity/status, provenance, trace links, change-impact paths, approval gates, evidence, and handoffs. Do not require one physical storage location across all target projects.

## 4. Choose artifacts deliberately

For each proposed component, classify:

```text
skill | shared reference | adapter | script/tool | route | sample/project fixture
```

Consolidate shared mental models; keep provider details in adapters; use scripts for exact transforms and validators; reject checklist-wrapper skills.

<component_lifecycle_gate>
**Pack approval does not promote components.** For every independent Skill candidate, preserve its own bounded capability claim, source-designed mechanism, ownership/non-ownership, audit state, qualification/evidence state, assurance tier, and lifecycle state. A pack may propose several component interfaces and still be `READY` as a composition proposal while those components remain `DRAFT`/unreviewed. Each Skill returns through its own authoring → audit → lifecycle path, with `/qualify-sdlc-capability` required for `ASSURED` promotion. An eligible prompt-only OpenAI Skill may use an explicitly selected `SKILL_CREATOR_VALIDATED` lifecycle profile instead; this never upgrades behavioral `NOT_RUN` or bypasses executable/provider side-effect evidence. References, adapters, routes, and deterministic tools follow the lifecycle/evidence contract appropriate to their artifact class. Pack-level end-to-end evidence never rewrites a component `FAIL`, `NOT_RUN`, `INCONCLUSIVE`, or missing review into success.
</component_lifecycle_gate>

## 5. Define composition and context policy

Document invocation mode, router reach, neighbor overlap, conditional references, context-load budget, install groups, optional integrations, missing capability behavior, and portability across runtime profiles.

## 6. Define safety, completion, and evaluation

Map side effects and approval, domain-specific states to READY/PARTIAL/BLOCKED/FAILED, and create pack-level evals for cross-skill continuity, owner conflicts, artifact propagation, unavailable providers, and representative end-to-end scenarios.

## 7. Review overlap

Resolve core plus active, promoted, reviewed, or proposed **neighboring packs** from the canonical registry/source workspace and compare exact pack IDs/revisions and ownership. Choose one canonical owner for duplicate meaning. Reclassify reusable cross-domain methods into core/shared ownership rather than copying them. If the canonical registry/source for neighboring packs is unavailable, record the comparison as `PARTIAL`; do not invent pack tiers or infer neighbors from undocumented shorthand labels.

## Domain output semantics

Produce the complete Domain Pack Contract and preserve these proposal semantics: capability gap/reusable boundary, owners/lifecycle map, component inventory/artifact types, **component lifecycle and evidence states**, artifact graph/traceability, core/neighbor composition, integrations/capability-profile needs, safety/approval gates, completion model, pack-level eval/runtime status, installation/context-load policy, versioning/migration/deprecation, and required review/next lifecycle state. Pack readiness is composition readiness only; required component failures or missing qualification remain visible and may block pack promotion even when the pack proposal itself is coherent.

Use the shared Workflow Result Contract for machine-facing state/evidence/blocker/handoff metadata. The maintainer-facing presentation may be a contract file, review summary, table, or another form appropriate to the request; no fixed global report layout is required.
