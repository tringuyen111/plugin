---
name: design-experience
description: Turn an approved behavior package into user journeys, state-aware flows, and low-fidelity wireframes before visual design or implementation.
---

# Design Experience
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
<!-- runtime-context:end -->


Design the user experience implied by approved behavior.

This is the UX entry workflow. It owns **UX Package composition**, **package readiness**, and journey/information-architecture decisions that span the package. `/user-flow` is the child owner of user-visible steps, decisions, navigation, transitions, and recovery; `/wireframe` is the child owner of low-fidelity layout/information-hierarchy artifacts for a fixed state/device assumption. This orchestrator invokes and composes those child artifacts rather than redefining their semantics.

It does not own visual styling, Figma tooling, technical architecture, frontend implementation, or QA verdicts.

## Preconditions

Start from an approved Behavior Package or equivalent approved Use Cases,
Business Rules, Stories, AC, and NFRs.

If the behavior itself is unresolved, route to `/define-behavior`.

Read `UX-PACKAGE.md` before creating/updating the UX composition artifact. Preserve canonical child artifact identities/revisions rather than copying their contents into the package.

## Process

1. **Read source and current experience.** Inspect approved BA artifacts and,
   for an existing product, the real current UI across relevant states and
   viewports. Current UI is evidence, not automatic design authority.
2. **Resolve journey and information architecture.** Identify entry points,
   task grouping, cross-feature navigation, actor handoffs, and where users need
   context before action.
3. **Invoke `/user-flow`.** The child owner creates or updates main, alternate, error, recovery, and state paths. Keep mutually exclusive states distinct. Record the resulting canonical flow artifact identity/revision in the UX Package; do not reproduce its flow semantics in the orchestrator.
4. **Resolve device/channel scope.** Use existing Product/Design decisions; ask
   only when missing and material. Record mobile/tablet/desktop/responsive
   intent rather than labeling one desktop frame “responsive.”
5. **Invoke `/wireframe`.** The child owner creates low-fidelity artifacts for the states needed to validate hierarchy and layout. Prefer real product density and content over empty demo surfaces. Link exact wireframe identities/revisions in the UX Package rather than treating parent prose as the wireframe decision record.
6. **Review usability risks.** Check visibility of system state, error recovery,
   decision load, destructive actions, permission boundaries, long content,
   and accessibility implications.
7. **Prepare visual handoff.** Record which states, viewports, components,
   content hierarchy, and unresolved visual questions require Visual Design.
8. **Prepare technical handoff.** Record interaction/state assumptions that
   Architecture or Engineering must validate. Do not decide their solution.

## Completion

`READY` requires a traceable UX Package identity with source-grounded journey/information architecture, linked child-owned flow/state coverage, device scope, linked wireframes for necessary states, usability risks, unresolved decisions, and separate visual/technical handoffs. It must not claim polished visual approval or runtime feasibility, and parent readiness does not replace child artifact ownership.
