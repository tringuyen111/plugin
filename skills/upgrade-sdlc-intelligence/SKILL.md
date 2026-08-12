---
name: upgrade-sdlc-intelligence
description: Route maintenance and extension of the SDLC Intelligence skill ecosystem to one owner workflow from a capability gap, artifact type, lifecycle state, provider boundary, and available evaluation evidence.
---

# Upgrade SDLC Intelligence
<!-- runtime-context:start -->
## Runtime context

- **Before returning a route or lifecycle result:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) so missing evaluation, authority, or package proof remains visible.
- **Before assigning or changing ownership:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) so proposal, implementation, evaluation, and promotion remain separate decisions.
- **When a delivery workflow reports a reusable capability gap:** read [Capability-Gap Handoff](../../resources/shared/references/capability-gap-handoff.md) to preserve project truth and create a system-owned proposal without editing the active project workflow in place.
- **Before any repository, provider, publication, or destructive action:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) and verify authority.
- **When a lifecycle claim is load-bearing or current evidence conflicts with it:** read [Claim Challenge Contract](../../resources/shared/references/claim-challenge-contract.md) and keep factual evidence separate from proposal or promotion authority.

- **When maintaining this checked-out repository:** read [Repository Execution Map](../../resources/system/references/REPOSITORY-EXECUTION-MAP.md) to select canonical probes, evidence locations, and the standard versus advanced-assurance path.
- **When revising, replacing, deprecating, or removing an active ecosystem surface:** read [Single Active Truth and Replacement Discipline](../../resources/shared/references/single-active-truth-contract.md) to remove superseded discovery/runtime/eval surfaces and keep history outside active truth.
<!-- runtime-context:end -->

Use this Skill for broad or ambiguous maintenance of the reusable SDLC Intelligence ecosystem. Codex may auto-invoke it; its canonical workflow identity is `/upgrade-sdlc-intelligence`, but this package does not claim raw slash-command syntax. It never routes target-project feature delivery. It selects exactly one System Plane owner and then loads and executes that child contract in the same orchestration call.

For lifecycle-spanning maturation that crosses System owners, read `../../resources/system/references/CORE-CONTRACT-DEPENDENCY.md`. Before carrying active-unit, lineage, challenge, or closure state across owner handoffs, read `../../resources/shared/references/semantic-continuity-contract.md`; do not reconstruct those invariants from router memory. For a single routing iteration, do not preload authoring, audit, qualification, or lifecycle standards owned by the selected child.

<router_role>
Own only System Plane classification, canonical route selection, and transfer of execution. Do not audit, author, qualify, integrate, compose a domain pack, promote, deprecate, migrate, or mutate the selected artifact from router reasoning.
</router_role>

<route_precedence>
Resolve the **current work type** before choosing a construction owner. Use this order:

1. **Existing artifact + uncertainty about context, ownership, depth, safety, composition, portability, or fitness** -> `/audit-sdlc-artifact`, even when the request says revise, improve, redesign, or clean up.
2. **A fixed draft or changed artifact already exists and the uncertainty is behavioral evidence** -> `/qualify-sdlc-capability`.
3. **A reviewed/evaluated artifact needs promotion, monitoring, deprecation, migration, removal, or an authorized lifecycle transition** -> `/manage-skill-lifecycle`.
4. **Construction begins only after the need/revision direction is accepted.** Then route by artifact class: provider translation -> `/create-integration`; coordinated domain pack -> `/create-domain-pack`; other skill/reference/tool/route construction -> `/create-skill`.

The word `revise` or `improve` alone never selects `/create-skill`. If artifact state or dominant uncertainty still makes more than one owner plausible, preserve the ambiguity as `PARTIAL` or `BLOCKED` instead of choosing by wording.
</route_precedence>

<execution_boundary>
A route decision authorizes loading the selected owner. It does not authorize this router to perform the selected owner Skill. After route selection, execution context becomes the selected owner contract.
</execution_boundary>

<hard_gate>
Before any System artifact mutation or owner-domain action:

1. exactly one canonical owner is selected;
2. the owner resolves through the path-only `architecture/runtime/skill-index.json`;
3. the mapped native Skill prompt (`SKILL.md`) loads successfully;
4. owner contract execution has begun under that workflow's own preconditions/gates.

If any predicate is false, do not perform the selected owner work from router knowledge.
</hard_gate>

<stop_condition>
If the route registry, context map, owner path, or owner Skill cannot be resolved/loaded, stop `BLOCKED`. Do not imitate the child, create a substitute workflow, or mutate the ecosystem to bypass the missing owner.
</stop_condition>

## Capability-maturation routing thread

A lifecycle-spanning maintenance request may require several owner workflows, but one routing iteration still has exactly one primary owner. Preserve a shallow maturation thread rather than preloading future owner work.

Before the first iteration, bind the observed gap/evidence to the current canonical artifact and revision when one exists, reconstruct the bounded capability/failure expected from current truth, and map neighboring topology only far enough to identify ownership, dependencies, overlap, and context cost. An existing artifact with unresolved fitness still enters `/audit-sdlc-artifact` first.

After the selected owner exits `READY`, `PARTIAL`, or `BLOCKED`, preserve its artifact/revision, disposition or decision, evidence status, unresolved gaps, and explicit next-owner need as the checkpoint for the next routing iteration. Deep-activate another artifact or owner only after the current one has closed, suspended, or blocked under its own contract. Do not carry the prior owner's full working context merely to accelerate the next step.

Use these shallow maturation dispositions only as routing evidence; their full audit, construction, qualification, and lifecycle meaning remains owned by the selected child contracts:

- `KEEP` closes that artifact's maturation branch unless new evidence reopens it.
- `REVISE` or an accepted `RECLASSIFY` may route to the correct construction owner after audit direction is fixed.
- `MERGE`, `DEPRECATE`, or `REMOVE` that changes active discovery/consumers requires the construction/replacement work if any and the lifecycle owner for authorized cutover/removal.
- A split/extraction creates candidate artifacts, not automatic Skills; each candidate returns through its own Skill-worthiness/audit/lifecycle path.

Repeated routing iterations may occur in one user request/conversation when each owner exits truthfully and the next owner is unambiguous. This does not relax the `<execution_boundary>`: the router never performs audit, construction, qualification, or lifecycle work itself.

## Routing questions

Resolve in order:

1. **Capability gap** — what reusable failure or missing decision capability is demonstrated?
2. **Artifact class** — skill, shared reference, adapter/integration, deterministic tool, domain pack, route, or project-specific artifact?
3. **Lifecycle state** — absent, draft, reviewed, evaluated, promoted, monitored, revised, or deprecated?
4. **Dominant uncertainty** — creation, conformance, behavioral evidence, provider translation, pack composition, or lifecycle decision?
5. **Authority and evidence** — who may change or promote it, and what proof exists?

Challenge lifecycle claims only when they control creation, evaluation, promotion, deprecation, or another hard-to-reverse system action. Keep a preliminary verdict before asking for clarification. Low-risk reversible gaps may proceed as explicit assumptions; conflicting or missing load-bearing evidence remains `PARTIAL` or `BLOCKED`.

## Single active truth routing gate

A proposed replacement or deprecation must identify the canonical artifact, current consumers, compatibility obligation, cutover, and removal gate. Do not route a second `old`, `new`, or `v2` skill merely to avoid revising the existing owner. Use `/manage-skill-lifecycle` for atomic discovery/package removal after evidence, and keep unresolved coexistence `PARTIAL` or `BLOCKED`.

## System route control semantics

The route result must preserve canonical System Plane ownership without prescribing one user-facing layout. Before handoff:

1. Resolve the selected route against `architecture/runtime/system/routes.json` when the source workspace is available. Treat that selected route record as the local activation capsule; do not preload sibling System owners or future lifecycle steps.
2. Use that route's exact `owner_skill` identifier in the control result. Its canonical workflow ID is `/<owner_skill>`; do not replace either identifier with a prose category.
3. Record the current system artifact/revision when known, required evidence, project impact, blockers, and expected next lifecycle state as domain route semantics.
4. If the active route registry exists but the exact owner cannot be resolved, return `BLOCKED`; never invent a route ID.
5. Outside a source checkout, use the exact workflow identifiers in `## Routes` as the bundled route projection. If more than one route still fits, preserve the ambiguity as `PARTIAL` or `BLOCKED`.
6. Maintain machine-facing state/owner/evidence/blocker/handoff fields according to the shared Workflow Result Contract. Materialize structured control JSON only for a machine consumer, persisted handoff, audit, or explicit structured-output request.

The normal user-facing answer may be concise prose, Markdown, or another useful form. Descriptive route labels may explain the decision, but they never replace canonical owner/workflow identity when those identifiers are surfaced.

## Routes

The precedence gate above owns matching semantics. These bullets name the construction/lifecycle destinations only:

- `/audit-sdlc-artifact` — inspect/judge an existing artifact before a revision direction is accepted.
- `/qualify-sdlc-capability` — execute/review behavioral evidence for a fixed draft or change.
- `/manage-skill-lifecycle` — decide promotion, monitoring, revision transition, deprecation, migration, or removal after review/evidence.
- `/create-integration` — construct/revise an accepted provider/MCP/connector mapping.
- `/create-domain-pack` — construct/revise an accepted coordinated reusable domain pack.
- `/create-skill` — construct/revise an accepted skill, shared reference, deterministic tool, or route proposal not owned by the specialized construction routes above.

## Cross-plane rule

A Delivery workflow may identify a reusable capability gap, but it must not rewrite the installed skill system while completing the active project task. It creates a capability-gap handoff and remains `PARTIAL` or `BLOCKED` if the missing capability prevents truthful delivery. System Plane work occurs as a separate lifecycle and becomes available only after a later promoted release.

System Plane work must not rewrite Product, BA, Design, Architecture, Engineering, QA, UAT, Documentation, Operations, or project task truth. Project-specific policies and credentials return to the target project rather than becoming reusable skill artifacts.

## Execute the selected owner

After producing the route decision:

1. Stop truthfully on `BLOCKED` or `FAILED`.
2. Resolve the exact selected owner through the path-only `architecture/runtime/skill-index.json`; do not load the complete runtime-context map merely for owner-path lookup.
3. Verify the path remains inside the source root, exists, and ends in `SKILL.md`.
4. Read the selected owner Skill and enter its own preconditions/first active gate.
5. Begin owner execution before any artifact mutation or owner-domain action. The router must not continue from its own description of what that child probably does.
6. Keep audit, qualification, implementation, lifecycle authority, and publication evidence separate.
7. Return the child state without upgrading `NOT_RUN`, `INCONCLUSIVE`, or missing authority.
8. Before handoff, verify the control result uses one active System Plane `owner_skill` and its exact `/<owner_skill>` workflow ID. If canonical ownership cannot be resolved, return `BLOCKED`; do not repair the issue by forcing a presentation template.

<completion_gate>
The router is complete only when the selected owner was resolved, loaded, and actually executed to a truthful result (or the owner itself truthfully blocked/failed). Merely naming a route is incomplete.
</completion_gate>

## Completion

The maintainer entrypoint is complete only when the source is resolved, one owner
is selected and executed, required evidence is inspected, side-effect authority is
verified, and the result names the next lifecycle state without false promotion or
publication claims.
