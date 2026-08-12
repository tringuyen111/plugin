---
name: visual-contract
description: Define an implementation-neutral visual and UI System Contract from approved UX artifacts. Use for hierarchy, composition, token semantics, component roles and states, responsive capability modes, content stress, accessibility, system impact, references, and Visual-QA acceptance characteristics/parity criteria without choosing frontend implementation or issuing a QA verdict.
---

# Visual Contract
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before translating approved behavior/wireframes into material visual states or UI-system obligations:** read [Semantic Continuity Contract](../../resources/shared/references/semantic-continuity-contract.md) so incoming behavior remains covered and visual refinement cannot silently narrow upstream truth.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
<!-- runtime-context:end -->

Define what the implemented experience must communicate visually and what the
existing UI system must reuse, extend, diverge from, replace, or admit is absent.

Read `VISUAL-CONTRACT-FORMAT.md` before producing the artifact.

This skill owns visual meaning, UI-system semantics, and approved references. It
does not own user behavior, runtime feasibility, code, library selection,
component interfaces, state-manager choice, or QA verdicts.

## Process

1. **Read approved inputs.** Use the UX Package, state model, wireframes,
   Product/brand context, content constraints, accessibility requirements,
   current UI, and verified design-system evidence. Reconcile the incoming
   material semantic obligations before visual elaboration: preserve/refine
   their lineage, derive only necessary visual consequences, and externalize
   any missing behavior decision instead of filling it with visual convention.
   When bundled local evidence is material, `/design-intelligence` may support
   visual alternatives or system evidence; this contract owns the resulting
   Design decision and must not treat a corpus recommendation as approval.
2. **Name the visual intent.** State hierarchy, reading order, primary and
   secondary actions, density target, brand direction, and the user problem the
   treatment solves.
3. **Define surfaces by state and viewport.** List screens or regions, relevant
   states, device assumptions, content stress, and responsive transformations.
   Do not call one desktop frame responsive.
4. **Define composition and layout semantics.** Specify grouping, alignment,
   rhythm, scanning pattern, persistent/contextual controls, progressive
   disclosure, overflow, and layout relationships without prescribing CSS Grid,
   Flexbox, or a framework.
5. **Classify the existing UI system.** For tokens, typography, iconography,
   components, layout patterns, and interaction patterns, record exactly one:
   `REUSE | EXTEND | DIVERGE | REPLACE | NOT_AVAILABLE`, with evidence,
   rationale, scope, and owner of any unresolved technical decision. A
   surface-level `REUSE` label is insufficient when a material component role
   contradicts the inspected primitive, pattern, or token source; either prove
   conformance at that role, choose the truthful non-reuse disposition, or keep
   the claim unresolved when the source cannot be inspected.
6. **Define token intent by layer.** Separate primitive token evidence from
   semantic token roles, component token needs, and state token meanings. Do not
   invent build syntax or duplicate an existing token source.
7. **Define component presentation as roles.** Use a component role matrix to
   record role, variants, visual/interaction states, density, content limits,
   reuse scope, accessibility semantics, and consistency rules. A role does not
   automatically imply one code component.
8. **Close material component anatomy and system conformance.** For each role or
   variant whose micro-composition can change usability, consistency, reuse, or
   implementation-system truth, inspect enough of the real UI-system evidence to
   state the relevant invariants: container/enclosure, typography and line-box
   relationship, icon optical size/alignment, icon-text gap, internal spacing,
   shape/radius/border/surface semantics, interaction-state feedback, target/input
   modality, and long/empty/localized-content behavior. Use only the dimensions
   that are material to that role; do not turn this into a universal pixel
   checklist. Treat per-label/manual sizing, ad-hoc token/radius/color values, or
   a visual affordance absent from the verified system as a contradiction to
   challenge, not as implicit reuse. An intentional difference is valid only
   when it is classified and owned as `EXTEND`, `DIVERGE`, `REPLACE`,
   `NOT_AVAILABLE`, an accepted exception, or explicit design-system debt.
   Record exact values only when they are already canonical or are necessary
   Design decisions; do not prescribe CSS, component props, or implementation
   syntax.
9. **Define responsive capability modes.** Describe information priority,
   permitted actions, composition change, persistence, input assumptions, and
   overflow behavior for modes such as compact/read-only, standard, and wide.
   Pixel breakpoints remain an Engineering decision unless already canonical.
10. **Map behavior states to visual states.** For each approved behavior state,
   record affected surfaces, cues, action availability, persistence/recovery,
   and non-color meaning. Do not invent new business states.
11. **Record exceptions and debt.** Distinguish a reusable new pattern, accepted
    one-off exception, temporary divergence, and design-system debt. Name owner,
    reason, expiry/review condition, and affected surfaces.
12. **Assess UI-system impact.** Return `NONE | CONTAINED | SHARED | FOUNDATION`.
    Identify whether tokens, reusable components/patterns, layout foundations,
    responsive capability modes, shared/cross-route state, UI libraries,
    accessibility primitives, or large-data/runtime-sensitive presentation need
    frontend technical design.
13. **Define accessibility and parity.** Include contrast intent, focus order and
    visibility, zoom/reflow, target sizes, motion constraints, non-color status
    cues, and exact/semantic/approximate Visual QA characteristics.
14. **Record references, approval, and open decisions.** Link approved designs,
    current UI, references, accepted differences, owner, version, rejected
    alternatives, and downstream stale impact.

## Completion

`READY` requires a source-linked, versioned contract covering intent, states,
content stress, composition, system dispositions, token layers, component role
matrix, material component-anatomy/system-conformance closure, responsive
capability modes, state-to-visual mapping, exceptions/debt, accessibility,
parity, approval, and UI-system impact. Material incoming behavior/design
obligations must remain accounted for through semantic lineage or an explicit
unresolved/disposition state; a visually complete contract does not close an
omitted upstream obligation. A material role with unresolved manual-fit logic,
primitive/pattern mismatch, token/shape contradiction, or an undeclared
UI-system extension is not contract-complete merely because the reference image
looks coherent.

Return `PARTIAL` when the visual direction is useful but an existing-system
source, role-level conformance claim, disposition, impact classification, owner
decision, or required technical-design handoff is missing. Do not hide
unresolved frontend architecture or UI-system contradiction behind an attractive
reference image.
