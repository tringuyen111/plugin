# Diagram Visual Cognition

Use this reference when a process diagram is semantically correct but visual hierarchy, labels, grouping, connector identity, density, accessibility, or whole-page perception can change whether the reader succeeds. This is **Agent design reasoning**, not a renderer-style schema. The current canonical plan remains `process-diagram-plan/v1`.

## Contents

1. Diagram perception has primary and secondary notation
2. Allocate attention from the reader task
3. Use the weakest grouping cue that preserves meaning
4. Treat typography and labels as geometry
5. Treat color and line weight as scarce visual mass
6. Keep semantic shape meaning separate from visual treatment
7. Treat connectors and edge labels as first-class visual objects
8. Balance density and negative space
9. Inspect at multiple zoom levels
10. Stress localization, accessibility, and medium
11. Respect the current translator boundary
12. Contrastive patterns and failure re-entry

## Diagram perception has primary and secondary notation

A process diagram communicates through coupled layers:

```text
PRIMARY NOTATION
  semantic shape / event / gateway / task type
  sequence vs message vs ordinary flow
  participant / lane containment
  explicit labels and branch conditions
        |
        v
SECONDARY NOTATION
  position / alignment / whitespace
  grouping strength
  type hierarchy and label placement
  color / stroke / visual mass
  connector continuity / bends / crossings
  enclosure and repeated visual rhythm
        |
        v
DOCUMENT SURFACE
  page, layer, metadata, links, interaction
  (future product capabilities unless explicitly implemented)
```

Primary notation carries process meaning. Secondary notation changes how quickly and accurately that meaning is perceived. Never use a secondary cue to counterfeit semantics: a red fill is not an error event, a thick border is not a BPMN boundary event, proximity is not a Message Flow, and an enclosure is not a participant unless the notation says so.

A visually attractive diagram that changes process meaning is wrong. A semantically valid diagram that repeatedly hides the reader's required answer is also incomplete as a communication artifact.

## Allocate attention from the reader task

Start from the already-decided reader contract:

```text
primary read           -> what must be acquired first
critical context       -> what must stay visible so that read stays truthful
deferrable detail      -> what may be quieter, compressed, or decomposed
```

Treat attention as finite. Every strong visual signal spends part of the budget. Structural position, isolation, chroma, line weight, enclosure, size, and repeated decoration can all compete for attention.

Use this order when choosing a signal:

1. **Topology and position** - make the important path or group structurally easy to find.
2. **Spacing and alignment** - make belonging and reading order visible.
3. **Label wording and hierarchy** - make the semantic discriminator easy to decode.
4. **Line/shape/color treatment** - reinforce the intended priority only when the renderer supports it and the stronger cue is actually needed.

Do not compensate for weak structure by making every important thing bolder, brighter, larger, or more boxed. If everything is emphasized, nothing is.

### Attention falsifier

If removing a strong visual cue does not make the reader task materially harder, the cue probably does not earn its visual mass. If the primary read is still hard to find after adding more emphasis, reopen composition or scope instead of stacking more effects.

## Use the weakest grouping cue that preserves meaning

Grouping signals have different perceptual force. For process diagrams, a useful progression is:

```text
proximity / shared rhythm
  -> alignment / repeated geometry
    -> deliberate whitespace boundary
      -> tonal/divider distinction
        -> explicit enclosure / container
```

Prefer the weakest cue that makes the intended local unit legible.

- Use **proximity + alignment** for nodes that belong to one local review/branch/rework group but do not have a notation-defined container.
- Use **whitespace** to separate milestone slabs and preserve branch/message/return circulation.
- Use a **notation container** only when it has real semantic meaning, such as BPMN pool/lane ownership.
- Do not invent boxes merely because a semantic group exists in Agent reasoning. A reasoning group is not automatically a rendered container.

### Common failure

Bad: every local semantic group becomes a bordered box. The page fragments into equally weighted islands and BPMN containment meaning becomes visually ambiguous.

Better: preserve local group identity through placement, alignment, rhythm, and owned negative space; reserve explicit containment for notation or a proven renderer feature with a distinct persistent meaning.

## Treat typography and labels as geometry

Text is not post-layout decoration. Label metrics change occupied space, wrapping, visual mass, and route clearance.

### Diagram label roles

Reason by information function rather than arbitrary font sizes:

| Role | Reader job | Typical pressure |
|---|---|---|
| diagram title / orientation | know what process/view is shown | short, dominant but not louder than the process itself |
| pool/lane header | locate responsibility | stable and scannable across the band |
| task/process label | understand the action/state | concise verb/object wording; wrap only when the shape can still read as one unit |
| event/gateway caption | decode trigger/outcome/decision meaning | visually associated with the symbol; external territory must be budgeted |
| edge/branch label | discriminate one route from another | shortest text that distinguishes the path; ownership must be unambiguous |

The current Draw.io renderer fixes most font styling, so the Agent mainly controls wording, structure, spacing, and available label territory. Do not fake typographic hierarchy by moving semantically related objects far apart just to make one label look prominent.

### Label geometry checks

Before build, estimate whether:

- node text will require several lines and materially increase perceived node mass;
- external event/gateway captions compete with adjacent routes;
- branch/message labels sit on a unique segment rather than a shared/crossing corridor;
- labels consume the gutter reserved for a connector or neighboring group;
- repeated labels create a dense dark band that changes whole-page balance.

After render, pixels are authoritative for soft text territory.

### Label wording

Prefer semantic compression, not abbreviation noise:

- task: `Validate request`, not a paragraph describing all validation rules;
- decision branch: `Valid` / `Invalid`, not duplicated gateway prose;
- message: name the exchanged business signal or request/result concisely;
- outcome: state the meaningful terminal condition, not only `Done`.

If required detail cannot be shortened without losing meaning, enlarge/decompose based on the reader task instead of shrinking text until it is unreadable.

## Treat color and line weight as scarce visual mass

Color perception depends on contrast, chroma, occupied area, and repetition. A strong color on one small exception has different impact from the same color filling many large nodes.

Current notation rendering uses a deterministic palette and line policy. Therefore:

- never rely on color alone to carry process meaning;
- do not infer `important`, `error`, `manual`, or `approved` solely from a fill unless the semantic notation already supports that meaning;
- inspect whether repeated strong fills or thick boundaries accidentally dominate the page;
- prefer structural clarity before requesting a future renderer emphasis capability.

If the reader task genuinely needs a stable visual distinction that cannot survive rebuild through current structural controls, classify it as a **translator/product gap**. Do not encode fake semantics or introduce arbitrary Draw.io style literals into the plan.

## Keep semantic shape meaning separate from visual treatment

Shape choice is primarily notation truth. Visual treatment should reinforce, not replace, the semantic shape system.

Ask separately:

```text
What is this object?          -> semantic node / event / gateway / container type
How should it be perceived?  -> visual hierarchy / grouping / traceability / quietness
```

A shape should not be rotated, shadowed, enlarged, or recolored simply because a branch is "interesting". Any treatment must serve a reading relation such as hierarchy, grouping, direction, or state, and must remain compatible with notation recognition.

For simple diagrams, semantic shapes + clean spacing + readable labels are usually sufficient. Treat unnecessary visual effects as noise.

## Treat connectors and edge labels as first-class visual objects

A connector is not empty glue between shapes. The reader must be able to attribute:

```text
source -> label/condition -> path continuity -> destination
```

Inspect five perceptual properties:

1. **continuity** - the eye can follow the same edge through bends/crossings;
2. **separation** - independent edges do not visually become one accidental trunk;
3. **fan-out** - several edges leaving one node remain individually attributable;
4. **crossing cost** - crossings do not make source/destination identity ambiguous;
5. **label ownership** - each edge label clearly belongs to one edge/segment.

Use existing Agent controls (`stage`, `track`, sides, and Flowchart `corridorTrack`) when they express a real composition decision. When a route is visually suspicious, query `measure --edge <id>` before changing the composition: mechanics can prove explicit/aligned hard-path obstruction, report same-side terminal fan-out, and preserve uncertainty for non-aligned ordinary Draw.io routing. Flowchart materialization now blocks a known axis-aligned ordinary path that pierces another node, but this is a proof gate rather than a router: the Agent still decides whether the correction is a nearer semantic-group placement, different endpoint faces, or an explicit corridor.

The current Draw.io translator can apply bounded secondary notation **without taking design ownership**:

- split several edges across distinct attachment slots **within an already chosen side**;
- use semantic edge-label roles derived from existing meaning: branch condition, participant message, or ordinary route annotation;
- keep branch labels near the split and offset labels from their connector stroke;
- when two BPMN participants occupy distinct pool regions, place a message label near the geometric gap between those participant pools when that gap can be derived from the existing layout;
- render a line jump where connectors cross so a visual crossing does not look like a semantic join.

These are translation policies, not authoring controls. A line jump cannot repair a route that pierces a node; a participant-gap label cannot repair a badly stretched handshake; terminal slotting cannot decide which side the edge should use. Do not add huge whitespace solely to hide an ordinary auto-route problem. If the composition is correct but the current translator still cannot preserve edge or label identity, report a connector/label-translation gap.

## Balance density and negative space

Physical non-overlap is not the same as perceptual clarity.

Evaluate both:

- **geometric density** - body/label/route occupancy per region;
- **visual mass** - how much attention is created by text density, repeated fills, strokes, symbols, and connectors;
- **negative-space ownership** - whether empty space separates real semantic units or merely inflates the canvas.

Dense operational process diagrams can be correct when comparison and route tracing benefit from compact local adjacency. Sparse diagrams can be correct when the reader needs clear milestone pauses. Do not optimize for "more whitespace" or "more compact" globally.

Spacing should express relation:

```text
inside one local semantic group
    < between neighboring groups in one milestone slab
        < between major milestone regions / participant contexts
```

Break the rhythm only for a named communication reason.

## Inspect at multiple zoom levels

Visual proof should move down and back up the hierarchy:

```text
whole diagram
  -> participant / milestone region
    -> semantic group
      -> connector + label
        -> optical detail
      <-
    <-
  <-
```

### Whole diagram

Check entry, outcomes, overall direction, dominant/quiet regions, participant bands, page balance, and whether the primary read can be acquired without tracing every edge.

### Region / group

Check grouping strength, local path continuity, branch/rework attachment, negative-space ownership, and whether neighboring groups compete visually.

### Connector / label

Check crossings, fan-out, label ownership, bend clarity, external captions, and whether one line visually masks another.

### Optical detail

Check wrapping, text/stroke collisions, symbol recognition, tiny gaps, and local imbalance.

Then zoom back out. A local fix is invalid if it makes the whole page noisier or destroys the primary reading path.

## Stress localization, accessibility, and medium

Treat real text and viewing conditions as structural evidence.

### Long labels and localization

Long translated labels, CJK text, user-generated names, or terminology expansion can change node mass and wrapping. Preserve semantic wording and relation first; recompose or decompose when necessary. Do not shrink critical labels below practical reading size just to preserve the original geometry.

Text direction does not automatically reverse process progression. If Arabic/Hebrew or another RTL language is used, distinguish **text direction** from **process direction** and only change orientation when the reader task/notation actually benefits.

### Redundant meaning

The process should remain interpretable when color is unavailable or weakened, such as print/monochrome or color-vision limitations. Semantic shape, label, containment, and line pattern should carry the essential distinction.

### Viewing medium

A presentation or small image needs stronger scope control and shorter labels. An editable analysis canvas can carry more detail, but it still requires connector identity and readable text at the expected working zoom. Do not treat export resolution as a substitute for composition.

## Respect the current translator boundary

Keep three states distinct:

| State | Meaning | Correct action |
|---|---|---|
| `reasoning-only` | concept helps the Agent decide but does not need persistent renderer state | use it transiently; do not add plan fields |
| `expressible-now` | current plan/mechanics can materialize the decision | use the existing control and verify pixels |
| `translator-gap` | stable perceptual intent exists, but current mechanics/renderer policy cannot express it without guessing or distortion | preserve the intent in the working checkpoint, report the gap, and do not hack semantics/geometry |

Current high-confidence expressible channels include semantic node/edge types, labels, containment, stage/track composition, explicit sides, and Flowchart corridor rails. The current renderer also derives two bounded presentation details without new plan fields: same-side terminal slot separation and near-source anchoring for labels emitted by a Flowchart decision/BPMN gateway. Font-role styling, arbitrary emphasis, line-jump policy, connector jetty tuning, pages/layers/metadata/links, and other Draw.io properties are still not Agent plan controls merely because Draw.io supports them.

### Canonical gate

Do not add a visual field to `process-diagram-plan/v1` unless all are true:

1. it changes the user-visible artifact in a material way;
2. it represents stable intent rather than temporary reasoning;
3. rebuild would otherwise lose or re-guess that intent;
4. it cannot be deterministically derived from existing semantic/composition truth;
5. mechanics has a bounded, testable translation for it.

This reference alone does not satisfy that gate for any new field.

## Contrastive patterns and failure re-entry

### Simple linear procedure

Bad: add color emphasis, boxes, or extra spacing to every step because visual cognition is now available.

Better: keep the diagram quiet. The linear semantic path already supplies hierarchy. Improve only labels, regular rhythm, entry/outcome clarity, and obvious flow direction.

### Approval with rejection/rework

Bad: make rejection/rework a distant red island so it "stands out".

Why it fails: visual salience destroys semantic attachment and increases route cost.

Better: keep rejection/rework spatially attached to its decision checkpoint; use the shortest readable branch/return path and reserve enough local space for the discriminator label. If stronger visual emphasis is truly required but unsupported, keep geometry truthful and record the translator gap.

### Dense participant handshake

Bad: spread participants far apart until message lines no longer overlap.

Why it fails: spacing hides a connector translation problem and weakens responsibility locality.

Better: align handshake milestones, keep bands interaction-near, use sides/corridors available to the notation, and inspect connector identity. If ordinary/BPMN route interiors still merge visually, re-enter at connector translation rather than inflating the whole canvas.

### Long localized labels

Bad: preserve the original geometry by shrinking text or widening every node globally.

Better: identify which labels are semantically compressible, reserve local text territory, and recompose only the affected group. If the target language systematically changes label mass, reconsider orientation/decomposition with the same process truth.

### Perceptual group without semantic container

Bad: draw a new box around every validation/retry cluster.

Better: use proximity, alignment, local rhythm, and owned whitespace first. A stronger enclosure is justified only when it communicates a real durable boundary and the renderer/product contract supports it.

## Completion / falsifiers

Visual cognition is applied well when:

- the reader can acquire the intended path and responsibility structure before decoding every detail;
- primary and supporting information have different perceptual weight without decorative excess;
- labels remain attributable and readable at the intended medium/zoom;
- semantic groups read coherently without inventing false notation containers;
- connectors required for the reader task remain traceable;
- simple diagrams stay quiet;
- visual corrections do not counterfeit process meaning;
- unsupported perceptual intent is exposed as a translator/product gap rather than hidden by geometry hacks.

Re-enter earlier reasoning when a visual improvement requires changing semantic truth, reader priority, or group relationships. Re-enter mechanics only when the Agent's intended relation is already correct and the current translation cannot faithfully materialize it.
