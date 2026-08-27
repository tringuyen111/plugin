# Frozen Product Design Cross-Lens Diagnosis Cases — PRE-MUTATION

Evidence-State: `NOT_RUN`

Freeze-Note: Frozen before Product Design source mutation on 2026-08-17.

## PDX1 — Weak hierarchy, typography is not the cause
A settings page has a correctly differentiated heading/body type scale, but every secondary card uses saturated borders and every control label uses accent color. The primary task does not dominate.

Expected reasoning: preserve the valid type-role hierarchy; compare color mass, enclosure repetition, grouping, and action salience as competing causes; do not "fix hierarchy" by making the title bigger/bolder. Select the smallest relation that restores relative attention and re-check the whole page.

## PDX2 — Dense table, whitespace is not automatically the fix
A data table feels cramped. Row padding is already consistent with the approved dense mode. Long localized labels wrap to two lines, numeric columns lose anchors, and the viewport is short.

Expected reasoning: distinguish spacing-role failure from typography metrics/line wrapping, column/grid responsibility, content pressure, and usable-height adaptation. Do not increase whitespace everywhere. Preserve comparison density where it is semantically useful.

## PDX3 — Muddy planes, do not invent a new surface token first
A menu visually merges with the work surface. The approved menu surface role is correctly mapped, but the background is cool blue-gray, a saturated chart occupies a large adjacent area, and the menu has no supporting boundary/depth cue.

Expected reasoning: compare contextual color interaction, occupied color mass, material/depth relation, boundary/enclosure, and plane semantics before splitting the semantic color role. Prefer the smallest combination owned by the actual plane relation.

## PDX4 — Control looks off: target, container, and optical content are different owners
An icon button meets target-size requirements and its visible container aligns correctly, but the glyph appears low and heavy compared with neighboring actions.

Expected reasoning: separate operable target geometry, visible container geometry, glyph optical box/stroke mass, and semantic icon mapping. Do not move the whole button or shrink the hit target to center the glyph visually.

## PDX5 — Apparent misalignment caused by text metrics
Two labels have identical geometric left/top anchors, yet one appears lower because its font metrics and line box differ. Neighboring icons are optically centered, not mathematically centered.

Expected reasoning: test typography metrics/optical alignment before changing grid anchors. Distinguish geometric alignment from perceived alignment and preserve the stable layout field when it is not the cause.

## PDX6 — Desktop polish fails under text/reflow stress
A desktop screen looks balanced at default text size. At 200% text scale and narrow usable height, sticky chrome occludes the active field, labels wrap, and the primary action leaves the visible task locus.

Expected reasoning: treat text scaling/reflow/usable viewport as composition stress. Compare content constraints, responsive topology/disclosure, persistent-plane behavior, and task-locus continuity; do not merely reduce font size or force clipping.

## PDX7 — One bad instance must not trigger a system rewrite
One card in a repeated component family overflows because a single consumer injects an unbounded custom label. Other consumers, states, and viewports remain coherent and use the approved slot contract.

Expected reasoning: test local content/wrapper misuse against component/system hypotheses; keep the cause local unless neighboring evidence falsifies that explanation. Do not widen to a shared component rewrite.

## PDX8 — Local fix damages whole-scene salience
A KPI component is improved in isolation by increasing value size and badge chroma. Four copies above a table now overpower warnings and the page heading.

Expected reasoning: run part -> whole -> neighboring-consumer inspection; recognize occupied-area/repetition amplification; correct the shared emphasis relationship rather than declaring the locally polished component done.

## PDX9 — Competing explanations remain unresolved
A screenshot shows weak grouping, but the source hierarchy, repeated consumers, alternate states, and responsive evidence are unavailable.

Expected reasoning: state the plausible cross-lens hypotheses, identify the discriminating evidence required, and preserve `PARTIAL`/uncertain cause instead of selecting a confident systemic correction.

## PDX10 — Successful correction must be falsifiable
After correcting a suspected hierarchy issue, the target screen looks better at one viewport.

Expected reasoning: re-open the original failure relation, inspect at least one stress condition or neighboring consumer appropriate to the correction scope, and verify that the fix did not create a new density/system/interaction problem. "Looks better" alone is not completion proof.

## Falsifiers
FAIL if Product Design:
- maps one symptom directly to one style category without considering plausible cross-lens causes;
- applies several unrelated changes at once and loses causal attribution;
- treats typography/color/spacing/material as independent decoration instead of interacting signals;
- widens local evidence into a system change without neighboring proof;
- claims polished/READY without rendered evidence when visible quality is material;
- repairs one component while degrading the whole scene or stressed states.
