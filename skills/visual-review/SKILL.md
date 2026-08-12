---
name: visual-review
description: Apply reusable Design judgment to an already fixed artifact and evidence set inside a Design review. Use to classify hierarchy, composition, spacing, density, typography, components, content stress, responsive behavior, visible accessibility risks, and reference parity; do not own capture orchestration, correction handoff, or QA acceptance.
---

# Visual Review
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
<!-- runtime-context:end -->


Apply Design judgment to an exact artifact and evidence set. This is a supporting judgment skill: `/review-visual` owns the end-to-end Design review fixed point, evidence acquisition, prioritization, correction handoff, and re-review plan.

Read `VISUAL-REVIEW-FORMAT.md` before reporting findings.

## Review dimensions

- **Hierarchy and reading order** — what is seen first, primary action clarity,
  competing emphasis, progressive disclosure.
- **Composition and layout** — grouping, alignment, whitespace, scanning path,
  local balance, overflow, clipping.
- **Spacing and density** — rhythm, touch/scan comfort, list/table density,
  consistency across surfaces.
- **Typography** — semantic roles, scale, line length, wrapping, contrast,
  weight, truncation.
- **Component anatomy and system conformance** — for material component roles,
  inspect enclosure, typography/line box, icon relationship, gaps/padding,
  shape/radius/border/surface, state feedback, target behavior, content stress,
  cross-screen consistency, and the declared `REUSE | EXTEND | DIVERGE | REPLACE | NOT_AVAILABLE`
  basis. Do not require every anatomy dimension for every component; inspect the
  dimensions that are material to the role and fixed Visual Contract.
- **Responsive transformation** — not merely shrinking; navigation, ordering,
  controls, content priority, long data, and breakpoint-specific behavior.
- **Content stress** — long names, empty data, localization, many rows, errors,
  permissions, realistic product density.
- **Visible accessibility risks** — contrast intent, focus visibility, non-color
  cues, target size, reflow, motion, zoom risks. Formal accessibility testing
  remains with QA.
- **Parity** — exact, semantic, and approximate characteristics defined by the
  Visual Contract, plus accepted differences.

## Method

1. Resolve the review fixed point and versions.
2. Open representative artifacts or screenshots; do not review filenames only.
3. Confirm state and viewport coverage from the capture manifest.
4. Compare against the relevant Visual Contract characteristic. For a material
   component role, challenge the artifact against the declared primitive/token/
   system basis rather than accepting visual similarity as reuse evidence. If the
   foundation or role evidence is unavailable, record the unreviewed scope or an
   `EVIDENCE_GAP`; do not invent conformance.
5. Stress the material role beyond the current example strings/states when the
   risk is manual fitting. Different rendered widths are not a defect by
   themselves: distinguish approved content-driven sizing with stable role
   padding/gap/token behavior from per-label or one-off geometry tuned to the
   captured examples.
6. Record only findings with an observable trigger and user/design impact.
7. Distinguish:
   - `CONTRACT_CHANGE` — approved design needs revision;
   - `IMPLEMENTATION_GAP` — implementation diverges;
   - `EVIDENCE_GAP` — required state/viewport is missing;
   - `POLISH` — optional improvement without acceptance impact.
8. Recommend the smallest coherent correction plus an advisory likely owner and the follow-up evidence that would close the finding. The parent `/review-visual` assigns correction ownership, prioritizes findings, and defines the canonical re-review scope/targets.
9. Declare unreviewed areas and confidence.

## Severity

- **BLOCKING** — prevents task comprehension/completion, breaks a required
  viewport/state, exposes inaccessible presentation, or violates an exact
  approved characteristic.
- **WARNING** — material inconsistency or quality risk that should be corrected
  but does not block the declared task.
- **SUGGESTION** — optional refinement with explicit rationale.

## Completion

`READY` means this judgment result has evidence-grounded findings and declared coverage. For every material component role in scope, anatomy/system conformance was either challenged against an inspectable basis or explicitly left unreviewed/`EVIDENCE_GAP`; absence of overflow in current strings or a visually clean screenshot is not conformance proof. Suggested owner/correction/follow-up fields are advisory inputs only; the parent `/review-visual` owns the final handoff and re-review plan. It does not mean the parent workflow is complete, and a clean Design review is not an independent QA verdict.
