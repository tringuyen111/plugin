---
name: sdlc
description: Route a software-delivery situation to the correct pre-canonical idea-shaping, Product, BA, Design, Engineering, QA, Documentation, or Operations workflow from the artifacts and uncertainty that exist now.
---

# SDLC Router
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **When a load-bearing claim controls routing or current evidence conflicts with it:** read [Claim Challenge Contract](../../resources/shared/references/claim-challenge-contract.md).
- **When routing replacement, removal, version coexistence, schema history, or cleanup work:** read [Single Active Truth and Replacement Discipline](../../resources/shared/references/single-active-truth-contract.md) to keep one active truth and require parity, consumer, migration, and removal evidence.
<!-- runtime-context:end -->


Use this router when a Delivery request is broad, ambiguous, or crosses owners and no more-specific implicit Skill clearly owns the next decision. Codex may auto-invoke this Skill; its canonical workflow identity is `/sdlc`, but this package does not claim raw slash-command syntax.

The router **does not perform domain work**. It identifies the current artifact
state, the dominant uncertainty, the decision owner, and the smallest next
workflow. Exactly one route is primary; supporting skills may run beneath it.

<router_role>
Own only Delivery route selection and the route decision. Pre-canonical Brainstorm, Product, BA, Design, Architecture, Engineering, QA, UAT, Documentation, and Operations artifacts remain owned by the selected child Skill. Compact collision rules below exist only to distinguish routes when registry facts are insufficient; they never grant this router permission to imitate a child.
</router_role>

<routing_gate>
1. Resolve current trusted artifact state and dominant uncertainty.
2. Resolve the matching route against `architecture/runtime/routes.json` when the registry is available.
3. Select exactly one primary `owner_skill`; supporting skills are not alternate owners.
4. **Freeze a shallow activation capsule** from that one route record: route ID, selected owner/role, owned output, allowed `supporting_skills`, current artifact state, blocker, and `next_route`/expected next artifact when present. Do not copy sibling routes or preload supporting prompts.
5. Surrender the selected owner plus that capsule to the orchestrating root/caller before any owner-domain artifact or decision is produced.
</routing_gate>

<execution_boundary>
A route decision authorizes **owner activation**, not domain work and not a persisted handoff artifact by default. If the user asks to “do the next step too,” the router must **surrender** execution to the selected owner before that domain work begins; it must not continue by mentally simulating the child from lifecycle prose. Route-only requests may stop after the frozen route decision. Root-orchestrated requests continue only after the orchestrating root loads the selected child Skill.
</execution_boundary>

<stop_condition>
If the active registry is missing, the route has multiple plausible primary owners, the selected owner cannot resolve through the packaged child-resolution surface (`architecture/runtime/skill-index.json`), or a load-bearing artifact/authority fact is missing, return `PARTIAL` or `BLOCKED` as appropriate. Do not invent a route ID, choose a supporting skill as primary, or perform the domain work as a fallback.
</stop_condition>

## Routing questions

Resolve these in order:

1. **Desired outcome** — what decision or delivered state does the user need?
2. **Current artifact** — what trustworthy artifact or runtime evidence already exists?
3. **Dominant uncertainty** — raw-idea articulation, value/evidence, behavior, experience, visual, technical,
   implementation, quality, release, operation, or learning?
4. **Primary owner** — pre-canonical idea shaping, Product, BA, Design, Architecture, Engineering, QA,
   business/UAT, Documentation, or Operations?
5. **Next artifact** — what must the owner create or verify next?
6. **Blocker** — what missing authority, source, environment, or decision prevents progress?

Before routing, challenge a claim only when it is load-bearing, contradicted by current evidence, or would authorize a costly or hard-to-reverse next action. Preserve a preliminary verdict before asking questions. Low-risk reversible gaps become explicit assumptions and do not block routing. The check remains inside the router/primary workflow and never creates a second owner.

Do not route by keyword alone. “Build login” can mean Product discovery, BA
behavior definition, Design, Architecture, implementation, QA, or User Guide
depending on the artifacts already approved.

When the requested work needs persistent artifacts or provider actions but the project has no trustworthy truth-location, capability, policy, or retention profile, route first to **`/project-bootstrap`**. Bootstrap is project-context governance, not Product discovery or technical architecture.

## Single active truth routing gate

When the requested next action keeps old/new implementations, creates an internal version, resets data, squashes migrations, or claims replacement completion, route from current consumers and compatibility evidence rather than the words `legacy`, `v2`, `local`, or `staging`. Unproved parity or unresolved duplicate truth remains `PARTIAL` or `BLOCKED`; cleanup stays beneath the selected Engineering/Release/System owner rather than creating a cleanup owner.

## Route decision semantics

The route decision is domain output owned by this router. Preserve these semantics without forcing a universal visible template:

- exactly one primary owner;
- canonical promoted skill identifier and `/<skill>` workflow when naming the route;
- the dominant uncertainty and why that owner is next;
- current trusted artifact state;
- the owned route output and any supporting capabilities that are materially available to the selected owner;
- the next artifact or decision expected from the selected owner;
- any blocker that prevents a truthful route;
- expected downstream route when it materially helps the user.

Maintain workflow state, canonical owner, blockers, supporting-return semantics, and optional next-owner routing/continuation according to the shared Workflow Result Contract. When a machine consumer or explicit request needs structured control metadata, materialize the shared control record. Otherwise present the route in the clearest form for the user's request. Do not emit a fixed Markdown footer or JSON object solely for internal validation.

Use `READY` only when one primary route and next owner are supported by current artifacts. Use `BLOCKED` when a missing artifact, authority, or environment prevents a truthful route. Preserve `PARTIAL` or `FAILED` when routing evidence is incomplete or invalid. When the request is already unambiguous, do not present a menu.

## Registry-driven route selection

Treat `architecture/runtime/routes.json` as the canonical Delivery route identity/ownership/output/composition truth. Use a route `when` predicate when the record provides one; otherwise use route ID, owner role, output, trusted artifact state, and the compact collision rules below. Do not recreate a lifecycle textbook in this Skill or infer child-domain procedure from route metadata.

When routing is not already clear from the caller/root:

1. Shallowly identify only the plausible route records from current trusted artifact state and dominant uncertainty.
2. Apply the route `when` predicate when present; otherwise use the route identity/role/output plus only the collision rule material to the plausible set. Route semantics are predicates over artifact state, not keyword triggers.
3. Reject a candidate whose required artifact state, decision class, or authority is absent or contradicted.
4. Select exactly one remaining primary owner and freeze the activation capsule defined above.
5. If zero or multiple candidates remain materially plausible, return `PARTIAL`/`BLOCKED` with the missing discriminator instead of scanning child prompts or choosing the nearest lifecycle stage.

Supporting skills remain composition options beneath the selected owner. Load none of them from the router. `next_route` is downstream routing metadata only; it neither completes that future workflow nor requires a handoff artifact.

## High-consequence collision rules

Use these only to resolve route collisions; the selected child owns the deeper domain rules.

- Raw idea articulation (`BRAINSTORM_IDEA`), evidence-backed opportunity discovery (`DISCOVER_PRODUCT`), Product definition (`DEFINE_PRODUCT`), and approved work implementation (`BUILD`) are different artifact states. Do not jump from an unvalidated idea to Engineering.
- `PLAN_DELIVERY_SPEC` precedes `PLAN_DELIVERY_WORK_GRAPH`: an approved technical delivery spec/equivalent planning truth is the discriminator, not the words “plan” or “tickets”.
- `DIAGNOSE` owns unknown cause; `BUILD` owns an approved work item. A request to “fix” a symptom does not prove the implementation seam.
- `DESIGN_UX`/`DESIGN_VISUAL` own product experience and product UI truth; `CREATE_CREATIVE_ASSET` owns collateral such as logos, identity, banners, social visuals, and slide visual direction. A dashboard/screen redesign is not creative collateral merely because it is visual.
- `REVIEW_VISUAL` is Design critique; `VERIFY_VISUAL` is independent QA acceptance. Visual capture alone proves neither.
- `VERIFY_QA` produces QA evidence; `ACCEPT_UAT` is the authorized business acceptance decision. QA evidence does not grant UAT or deployment authority.
- `DEPLOY_PREPARE` creates/repairs deployment mechanics, `RELEASE` decides readiness for a fixed candidate, and `DEPLOY_RELEASE` executes an already-eligible unchanged candidate. None may absorb the next authority.
- `OPERATE` is normal non-incident service operation; active user/production impact selects `INCIDENT`. Technical root-cause diagnosis may support incident command without replacing it.
- `HANDOFF` is only for a real continuation boundary that canonical artifacts plus the ordinary result cannot safely bridge. Same-owner supporting composition returns bounded evidence instead.
- Reusable Skill-system creation/revision belongs to the System Plane, not a Delivery route.

## Context hygiene

Keep routing shallow. Do not preload sibling routes beyond the plausible set, supporting prompts, downstream workflows, or child domain references. Use `/wayfinder` when the work itself is too large/foggy for reliable direct planning; use `/handoff` only under its route predicate rather than as routine pipeline ceremony.

## Completion

`READY` means exactly one canonical Delivery route/owner is supported by current trusted state and its activation capsule is frozen for owner execution. `PARTIAL` means useful routing evidence exists but a material discriminator is missing. `BLOCKED` means required source, authority, environment, or canonical route truth is unavailable. `FAILED` means the routing operation itself violated its contract or consumed invalid registry state.

The router never upgrades a child workflow, QA/UAT/release state, provider side effect, or future `next_route` to success. Route selection completes this router only; orchestrated execution completes only after the caller/root loads and executes the selected owner contract.
