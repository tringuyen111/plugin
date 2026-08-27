# Perceptual Diagnosis

Use this as a **supporting lens inside Design Review** when visible/spatial/typographic/color/material/control/responsive signals are material to a Design claim. It does not define the Design Review boundary and does not issue conformance acceptance.

## Contents
- Perceptual chain
- Expected perception before style diagnosis
- Competing visual causes and discriminators
- Causal ownership
- Part/whole and stress
- Falsification
- Failure patterns

## Perceptual chain

```text
INTENDED DESIGN RELATION
        -> EXPECTED PERCEPTION / ACTION MODEL
        -> PRESENTED SIGNAL FIELD
        -> ACTUAL PERCEPTION / ACTION CONSEQUENCE
        -> MISMATCH
        -> CAUSAL OWNER
        -> SMALLEST COHERENT LEVER
        -> STRESS / FALSIFIER
```

Do not jump from “looks wrong” to a styling category. State what relation the user should perceive first: hierarchy, grouping, ownership, comparison, action priority, state, plane, continuity, or responsive persistence.

## Expected perception before style diagnosis

Translate the Design relation into an observable perceptual expectation.

Examples:

- `recovery action is critical after failure` -> user should discover it before passive metadata and understand what it restores;
- `rows form one comparison surface` -> columns/anchors should support across-row comparison rather than twelve independent objects;
- `overlay belongs to this trigger/context` -> plane, anchor, occlusion, focus/input and dismissal cues should preserve ownership;
- `status is subordinate` -> status must remain legible/perceivable without competing with the primary task.

Only then inspect which signals create or break that expectation.

## Competing visual causes and discriminators

A symptom may have several plausible visual or semantic owners. Generate alternatives only when evidence supports ambiguity.

| Symptom | Competing causes worth testing | Discriminating evidence |
|---|---|---|
| Weak hierarchy | semantic role misclassification; typography role/metrics; color/chroma occupied mass; spatial position/grouping; enclosure/depth repetition | compare role intent, neighboring hierarchy, repeated context, and which signal changes the reading order |
| Dense/slow scanning | information-model overload; grid/alignment responsibility; type metrics/measure; spacing rhythm; content pressure | inspect comparison task, line boxes/wrapping, anchors, content stress, and whether added whitespace would improve or worsen scan efficiency |
| Control looks misaligned | target/container geometry; glyph/text optical box; local wrapper/baseline; font/icon metrics | inspect operable target, visible container, optical content, and neighboring controls separately |
| Muddy or card-heavy surfaces | semantic grouping; composition/usage density; surface/plane ownership; color/material relation; shared component breadth | inspect isolated component, repeated page, weakest sufficient enclosure, and plane semantics |
| State is unclear | missing state semantics; weak feedback cue; color-only meaning; action/state ownership; stale content | inspect state model first, then visible/non-color cue and continuation |
| Responsive composition breaks | wrong information priority; topology/disclosure; fixed geometry; content pressure; usable height/input change | compare semantic invariants across constraints rather than device labels |

A signal family is not a cause by itself.

## Signal field

Use only signals capable of changing the current judgment:

- salience: position, size/type mass, chroma, area, enclosure, depth, motion;
- grouping: proximity, alignment, shared surface, boundary strength, repetition, continuation;
- typography: semantic role, font metrics, line-height/measure, wrapping, numeric behavior, localization/text scale;
- color: semantic role, lightness/chroma, occupied mass, adjacency/backdrop, state and non-color support;
- material/plane: surface tone, border, overlap, clipping, scrim, elevation, translucency, blur, fixed/scroll relation;
- control anatomy: action ownership, operable target, visible container, glyph/text optical content, nested actions, feedback;
- responsive/state continuity: information/action persistence, topology, overflow/disclosure, input/content/viewport pressure.

Do not inspect them as an equal-weight checklist.

## Causal ownership

Visible pixels may be owned by different relations:

```text
LOCAL CONTENT / INSTANCE
        |
REPEATED USAGE / COMPOSITION
        |
COMPONENT / PATTERN
        |
SEMANTIC ROLE / TOKEN / TYPE STYLE
        |
LAYOUT / PLANE / INTERACTION RELATION
        |
FOUNDATION / SYSTEM
```

This is a scope test, not an escalation ladder. Challenge local explanation before changing a shared role; challenge repeated/system cause before patching one instance.

Separate owners that overlap visually:

- semantic action priority versus visual role mapping;
- layout owner versus visible surface owner;
- operable target versus visible control container versus optical glyph/text content;
- semantic color role versus contextual color composition;
- semantic containment versus visual/input plane;
- component contract versus consumer-provided content.

A screenshot can prove a perceptual failure while remaining insufficient to prove the structural owner. Use structural/system/source evidence when the cause claim requires it.

## Part, whole, and stress

Move both directions:

```text
component -> repeated context -> whole scene -> component
```

A component can be coherent alone and harmful when repeated. A clean page can hide a brittle component/system rule that fails under another state/content/input condition.

Stress only what can falsify the claim:

- realistic/long/localized content and 200% text scaling when text geometry matters;
- nearby state, repeated consumer, or accepted exception when scope may be shared;
- constrained width/height, usable viewport, input mode, overlay/occlusion when topology or interaction ownership matters;
- visible focus/non-color state/reflow when accessible perception is material.

Do not turn these stresses into formal WCAG or QA acceptance inside Design Review.

## Falsify the correction hypothesis

After a correction or proposed correction intent is materialized by the appropriate owner:

1. inspect the original failed relation, not overall attractiveness;
2. verify the chosen change produced the predicted perception/action consequence;
3. inspect one neighboring state/viewport/repeated context when the claim is broader than one instance;
4. move part -> whole -> part and check for a new hierarchy/density/system failure;
5. reopen diagnosis if the predicted change does not occur.

“Looks better” is not causal proof.

## Failure patterns

- **Weak hierarchy -> make text bolder:** first discriminate semantic role, type metrics, color mass, position/grouping, and enclosure/depth.
- **Dense -> add whitespace everywhere:** first discriminate information topology, type geometry, grid, spacing rhythm, and content pressure.
- **Card soup -> soften shadows:** first review semantic boundaries, repeated mass, surface membership, and composition policy.
- **Contrast -> darken everything:** preserve relative hierarchy and semantic/non-color state relations.
- **Misaligned icon -> move the whole control:** separate target, container, and optical content.
- **One bad instance -> rewrite system:** inspect neighboring consumers and local wrappers before widening scope.
- **Clean screenshot -> conformance:** visible coherence is not QA visual-conformance PASS and does not prove unreviewed states.
