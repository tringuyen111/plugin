---
name: design-visual
description: Frame and recommend a visual direction from an approved UX package, record accountable-owner approval, coordinate the canonical implementation-neutral Visual Contract, optional editable provider delivery, UI-system impact routing, and implementation/Visual-QA handoffs.
---

# Design Visual
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
<!-- runtime-context:end -->

Create an approved visual direction for an approved user experience, then
coordinate the artifacts and handoffs that carry that decision forward.

This workflow owns **visual-direction selection**, materially different
alternative trade-offs and recommendation, accountable-owner approval capture,
linkage/readiness of the resulting Design artifacts, optional editable-provider
delivery coordination, and downstream handoff gates. `/visual-contract` owns
the canonical implementation-neutral visual meaning and UI-system semantics,
including composition, token intent, component roles, responsive modes,
state-to-visual mapping, accessibility/parity characteristics, approval/version,
and UI-system impact. Do not restate or independently revise those contract
semantics in this orchestrator.

It does not own Product priority, business behavior, technical architecture,
frontend implementation, QA acceptance, UI-library selection, or state-manager
selection.

## Preconditions

Start from one approved UX Package identity, project truth location, revision and
maturity, or an equivalent approved set of journey, state model, user flow,
device scope, and wireframe artifacts whose exact revisions are known.

If flow, state, or information hierarchy is unresolved, route to
`/design-experience`. If the question requires real application state or
technical feasibility, use `/prototype` as a learning detour instead.

## Process

1. **Freeze the approved experience.** Record the UX Package identity/revision,
   linked flow and wireframe revisions, Product context, existing design system,
   current verified UI, brand constraints, and unresolved Design inputs. Current
   UI is evidence, not automatic visual authority.
2. **Frame the visual-direction decision.** Name the decision target and what a
   useful direction must resolve for the declared experience. Do not generate
   polish without a decision target, and do not pre-write the child Visual
   Contract as the answer.
   When local UI/UX evidence would materially improve direction quality, compose
   `/design-intelligence` for source-backed style/color/type/pattern evidence.
   Treat that output as advisory evidence only; approved UX, brand, current
   canonical Design truth, and accountable-owner decisions remain authoritative.
3. **Create distinct alternatives when direction is uncertain.** Alternatives
   must differ materially in hierarchy or composition, not merely color. Explain
   trade-offs and recommend one while keeping unresolved owner decisions visible.
4. **Review with the accountable owner.** Capture the selected direction,
   approval authority, rejected alternatives, accepted differences from current
   UI, unresolved visual decisions, and the exact UX Package revision the
   decision applies to. A recommendation is not approval.
5. **Invoke `/visual-contract` for the selected direction.** Give the child the
   approved direction and exact upstream revisions. The child produces or
   revises the canonical Visual Contract and owns its visual/UI-system semantic
   details. This workflow consumes that artifact by identity/revision; it does
   not copy those details into a second source of truth.
6. **Resolve optional editable delivery.** When an editable provider artifact is
   required, request the relevant `design.*` capability through
   `/capability-resolver`. If the selected provider is Figma, consume
   `adapters/figma/ADAPTER-CONTRACT.md` and the bound MCP/connector/API source;
   never call raw provider tools directly or make the adapter a second workflow
   owner. Otherwise keep the implementation-neutral Visual Contract plus an
   approved reference artifact. Provider absence is not a blocker unless that
   provider artifact is an explicit deliverable.
7. **Consume the UI-system impact gate from the Visual Contract.** Preserve its
   `NONE | CONTAINED | SHARED | FOUNDATION` result and named impacted surfaces;
   do not re-derive a parallel impact classification here. Route to
   `/codebase-design` before implementation when the canonical contract requires
   shared/foundation technical decisions. A `CONTAINED` change may proceed only
   when the contract says current system contracts are reused without a new
   shared technical decision.
8. **Prepare implementation handoff.** Link the exact approved UX Package,
   Visual Contract identity/revision, approved reference/provider artifact,
   unresolved decisions, UI-system impact, and required technical-design result.
   Do not restate token/component/responsive semantics as a second Design truth.
   Visual Design does not choose a frontend library, component API, framework,
   state manager, CSS/token pipeline, or runtime ownership model.
9. **Prepare Visual QA handoff.** Link the exact Visual Contract revision and
   reference evidence plus the states/viewports/content-stress scope the QA owner
   must derive from that contract. This workflow does not issue the Visual QA
   verdict.

## Completion

`READY` requires an accountable-owner-approved visual direction bound to an exact
UX Package revision, a complete canonical Visual Contract produced by
`/visual-contract`, truthful optional-provider delivery status, a resolved
UI-system impact gate, and implementation/Visual-QA handoffs by artifact
identity/revision.

Do not return `READY` while the direction approval, child Visual Contract, or
UI-system impact is unresolved. When technical design is required, the handoff
to `/codebase-design` and its fixed decision question must exist; otherwise
return `PARTIAL`. A polished image alone is not `READY`.
