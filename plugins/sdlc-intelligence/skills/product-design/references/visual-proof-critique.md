# Visual Proof and Critique

## Contents
- Structural-proof versus visible-proof gates
- Multi-zoom inspection
- Causal diagnosis
- Cross-lens hypothesis testing
- Discriminating evidence
- Causal ownership and correction levers
- Re-render / falsification loop
- Failure patterns

Use this reference whenever the claim includes polished, coherent, balanced, production-quality, visually correct, or similar visible-craft language, or when the same visible symptom has more than one plausible Design cause.

## Visible-proof gate

If composition quality is material and no inspectable rendered artifact exists, do not return visual `READY`.

Text can prove intent/contract structure only. Use an available design surface, renderer, browser, screenshot, or other inspectable output at sufficient fidelity. If no such capability is available, return `PARTIAL` and name the missing proof surface.

## Structural proof and visible proof are orthogonal

When the claim includes system construction (frames/containers, layout, components, variables/tokens, text styles, layers/planes), inspect both:

```text
STRUCTURAL PROOF
actual hierarchy + ownership + component/instance relations
+ layout/grid behavior + token/style bindings + state/variant structure

VISIBLE PROOF
rendered hierarchy + spacing/rhythm + typography/color/material craft
+ content/state/adaptation under real pressure
```

A clean Auto Layout/component/token tree can still render as card soup, flat hierarchy, or poor color mass. A beautiful screenshot can still hide duplicated one-off components, accidental groups, raw local values, or a layer tree that cannot adapt. Pass only the proof level the active claim actually earned.

For a real design tool, prefer inspecting actual node/component/variable/style metadata in addition to screenshots rather than reconstructing structure from pixels.

## Inspect at multiple zoom levels

Move repeatedly between:

```text
product/system
  -> page
    -> region
      -> group
        -> component
          -> optical detail
```

Then reverse direction.

At whole-page level inspect:

- focal path and dominant/quiet regions;
- card/enclosure count and visual fragmentation;
- alignment fields and rhythm;
- color/chroma distribution and occupied visual mass;
- overall density/negative space;
- plane/depth coherence;
- task locus under usable-viewport, content, and state pressure.

At local level inspect:

- component anatomy and action ownership;
- target/container/content optical geometry;
- type/icon optical relation;
- state/focus/selection cues;
- content wrapping/overflow;
- border/radius/shadow/material consistency;
- repeated alignment, baseline, and micro-rhythm.

A local detail is judged in its whole-scene context. A whole-scene symptom still needs the smallest supported owner.

## Causal diagnosis

Start from a relation the user should perceive or act through, not from a styling category.

```text
INTENDED RELATION
  -> EXPECTED PERCEPTION / ACTION CUE
    -> PRESENTED VISUAL SIGNAL FIELD
      -> PERCEIVED CONSEQUENCE
        -> MISMATCH / RISK
          -> CAUSAL OWNER + SCOPE
            -> SMALLEST COHERENT LEVER
```

Examples:

- intended: related settings feel like one scan group;
- expected perception: scan the group as one unit, then discriminate rows;
- signals: every setting is independently boxed/shadowed;
- consequence: fragmented equal-weight page;
- cause: enclosure semantics + repeated visual mass;
- correction: remove unjustified containers, restore shared anchors/spacing hierarchy.

Or:

- intended: numeric anomalies stand out;
- expected perception: normal values stay quiet while exceptions interrupt the scan;
- signals: every status is saturated and every row has bold text;
- consequence: no exception salience;
- cause: color/type mass is consumed by normal states;
- correction: quiet normal states, restore numeric/type anchors, reserve strong chroma for exceptions.

A **symptom is not a cause**. "Weak hierarchy", "too dense", "flat", "misaligned", or "looks off" only names the observed consequence. Do not map one of these labels directly to typography, spacing, shadow, color, or another correction category.

## Cross-lens diagnosis: test hypotheses, not categories

When one cause is already supported by direct evidence, act proportionally. When several Design lenses remain plausible, use this compact hypothesis loop instead of trying every lens or changing several variables at once:

```text
EXPECTED PERCEPTION
      |
OBSERVED SIGNAL FIELD
      |
2-4 PLAUSIBLE CAUSES
(across materially different lenses)
      |
DISCRIMINATING EVIDENCE
      |
CAUSAL OWNER + SCOPE
      |
SMALLEST COHERENT LEVER
      |
STRESS / FALSIFY
```

### 1. Describe the signal field without diagnosing it

Record what is actually visible: dominant areas, alignment fields, enclosure count, line wrapping, occupied chroma, repeated shapes, baseline relationships, state cues, clipping, overlap, or other perceptual signals. Avoid embedding the proposed fix in the observation.

Bad: `The heading is too small.`

Better: `The page heading and secondary card titles carry similar visual mass while repeated accent borders dominate the first viewport.`

### 2. Generate only plausible competing causes

Choose a small set of hypotheses that predict different evidence. Do not enumerate every reference file just because it exists. Prefer materially different causal lenses, for example:

- typography role/metrics versus color/chroma/occupied area;
- spacing role versus text wrapping/line box versus grid/column responsibility;
- semantic surface mapping versus contextual color interaction versus material/depth/boundary cues;
- layout anchor versus type/icon optical geometry;
- local content/wrapper misuse versus component/system contract;
- responsive topology versus usable-height/persistent-plane pressure.

Some failures are coupled. If two signals are jointly required to express one relation, keep the correction coherent, but still name the shared relation and causal ownership rather than applying an unstructured bundle of tweaks.

### 3. Seek discriminating evidence

Prefer evidence that the competing hypotheses predict differently:

- **same role, different context** — if the same token/type/component works elsewhere, context or local ownership becomes more plausible;
- **same context, different role/instance** — if peers remain coherent, a local instance/content cause becomes more plausible;
- **neighboring state/viewport/content** — use pressure to expose whether the relation survives beyond the captured happy path;
- **actual structural metadata** — inspect layout owner, slot, token/style binding, target/container bounds, clipping/plane relation, or variant identity when available;
- **part versus whole** — a component can pass locally while repetition or occupied area breaks page-level hierarchy;
- **controlled visual change when the authoring surface supports it** — alter one candidate lever, re-render, and check whether the predicted relation changes. Do not claim causal proof from an uncontrolled bundle of edits.

If available evidence cannot separate the strongest hypotheses, keep the cause uncertain and gather the smallest missing evidence. Do not manufacture confidence to keep momentum.

## Symptom-to-hypothesis switchboard

Use this as a transfer aid, not as a mandatory checklist.

| Observed consequence | Plausible cause families | Evidence that discriminates | Common wrong shortcut |
|---|---|---|---|
| Primary/secondary hierarchy is weak | type-role contrast; color/chroma mass; spatial position/grouping; repeated enclosure/material mass; action anatomy | compare semantic type roles, occupied accent area, reading order/anchors, enclosure repetition, neighboring screens/states | make the title larger/bolder |
| Interface feels cramped or over-spaced | spacing-role relation; line-box/wrapping; grid/column anchors; content pressure; usable viewport/adaptation | confirm approved density mode, inspect wrap/metrics and column field, stress real content/height | add/remove whitespace everywhere |
| Planes feel muddy or unnecessarily layered | surface-role mapping; surrounding color context; boundary/depth cue; enclosure semantics; plane/input relation | inspect same role on another backdrop, actual plane relation, border/scrim/material use, occupied color mass | invent another gray or stronger shadow |
| Control "looks off" | operable target; visible container; icon/text optical box; semantic glyph mapping; state cue | compare target/container/content bounds and neighboring controls; inspect optical mass/stroke rather than hit box alone | move/shrink the whole control |
| Elements look misaligned despite matching coordinates | type metrics/line box; icon optical center; grid anchor; local transform; asymmetric shape | inspect actual anchors plus optical boxes/baselines and repeated peers | add arbitrary per-instance margin |
| Narrow/text-scaled state breaks task flow | content constraint; responsive topology/disclosure; sticky/fixed plane; usable-height pressure; task-locus continuity | test width + height + text scale + input/state pressure; inspect what is obscured or leaves the locus | reduce font size, clamp, or hide overflow |
| One instance fails in a coherent family | local wrapper/content/state misuse; slot contract; component contract; system role | compare repeated consumers/states and actual bindings | rewrite the shared component/system immediately |
| Local polish makes the page worse | repetition amplification; occupied color/type mass; competing focal regions; whole-scene density | inspect component alone then repeated context and page focal path | accept the isolated specimen as proof |

## Choose the causal owner before the correction

A visual signal can be produced by several owners. Locate the smallest owner whose behavior explains the evidence:

```text
LOCAL INSTANCE / CONTENT
        |
REPEATED PATTERN / COMPONENT
        |
SEMANTIC ROLE / TOKEN / TYPE STYLE
        |
LAYOUT / PLANE / INTERACTION RELATION
        |
FOUNDATION / SYSTEM
```

This is not a hierarchy that always escalates upward. It is a scope test.

Before changing a shared system role, challenge the local wrapper/content/state explanation. Before patching one instance, challenge whether the same symptom recurs across consumers because of one shared owner. When evidence supports neither, preserve uncertainty.

Also separate owners that occupy the same pixels:

- layout owner versus visible surface owner;
- operable target versus visible control container versus glyph/text optical content;
- semantic color role versus contextual color composition;
- semantic containment versus visual/input plane;
- component contract versus consumer-provided content.

## Correction levers as causal experiments

Prefer the smallest lever that repairs the failed relation:

- hierarchy/salience;
- grouping/enclosure;
- spacing/rhythm;
- alignment/grid/anchor;
- typography role/metrics;
- color role/chroma/mass;
- material/depth cue;
- component anatomy/system role;
- state/feedback cue;
- responsive topology/disclosure;
- content constraint/stress behavior.

Do not change several unrelated levers merely because all could improve the screenshot. A broad edit destroys causal attribution and can hide a deeper ownership error.

A correction lever is not automatically a CSS/token prescription. Keep implementation open unless already canonical. When a coupled correction is required, state the one relation being repaired and why the coupled signals must move together.

## Re-render and falsify

After a material correction:

1. render/open the changed candidate;
2. inspect the **original failed relation**, not just overall attractiveness;
3. check whether the chosen lever produced the predicted perceptual change;
4. inspect one neighboring state/viewport/repeated context when the fix is broader than one instance;
5. move part -> whole -> part and check whether repetition, occupied visual mass, or hierarchy shifted elsewhere;
6. stress material content, localization/text scale, usable viewport, state, input mode, or overlay behavior according to the risk;
7. if the result contradicts the hypothesis, reopen diagnosis rather than stacking more fixes;
8. repeat until the active Design question is resolved or the remaining evidence gap is explicit.

A correction is not proven because the changed screenshot "looks better". It is supported when the intended relation is restored under the evidence appropriate to the claimed scope without creating a new material failure.

## Failure patterns

- **"Looks modern and clean" without causal evidence:** replace taste label with intended relation, visible signals, perceived consequence, and falsifiable correction.
- **One symptom -> one category:** generate competing causes when the evidence supports more than one lens.
- **Shotgun polish:** do not change type, spacing, color, shadow, and radius together and then infer which problem was solved.
- **Fix card soup by softer shadows:** reopen grouping/enclosure semantics and repeated visual mass.
- **Fix density by increasing whitespace everywhere:** determine whether spacing, typography metrics, grid responsibility, content pressure, or viewport adaptation is actually failing.
- **Fix contrast by making all text darker/bolder:** restore relative role hierarchy instead of raising all salience.
- **Fix optical misalignment by moving the interaction target:** separate target, container, and optical content geometry.
- **Create a new token because one context looks wrong:** test contextual color/material composition and local role mapping first.
- **Rewrite a system from one bad instance:** inspect neighboring consumers/state/content before widening cause scope.
- **Claim high-fidelity quality from a markdown contract:** mark visual proof `NOT_RUN/PARTIAL`.
