# Material, Depth, and Shape

## Contents
- Semantic containment versus plane/input relations
- Plane relation graph
- Minimum sufficient depth cues
- Shape / silhouette grammar
- Nested radius and clipping
- State geometry and shape contrast
- Shadow and scrim reasoning
- Translucency and blur
- Icon/image relations
- Worked contrasts
- Failure patterns

Treat depth and shape as perceptual semantics, not an effect menu or a default "rounded modern UI" style.

## Separate semantic containment from plane/input relations

A semantic tree answers **what belongs to what**. A plane/input graph answers **what is visually/interaction-wise in front, clipped, persistent, transient, or reached first**. They often overlap, but they are not the same structure.

```text
SEMANTIC
workflow -> form -> field -> help text

PLANE / INPUT
page content --SCROLLS_UNDER--> sticky toolbar
page          --OCCLUDED_BY----> scrim
modal         --OVERLAYS-------> page
modal         --BLOCKS_INPUT_TO-> page
popover       --ANCHORS_TO-----> control
tooltip       --OVERLAYS-------> modal/popover context
container     --CLIPS----------> child visual overflow
```

Use only relations the product actually needs:

- `CONTAINS` / `GROUPS_WITH` — semantic/perceptual belonging;
- `CLIPS` — visible child output is bounded by an owner;
- `SCROLLS_WITH` / `FIXED_TO` / `PERSISTS_OVER` — persistence during viewport movement;
- `OVERLAYS` / `OCCLUDES` — front/back visibility;
- `ANCHORS_TO` — stable transient placement relation;
- `BLOCKS_INPUT_TO` / `RECEIVES_INPUT_BEFORE` — interaction priority;
- `FOCUS_WITHIN` / `RETURNS_FOCUS_TO` — focus ownership when material.

### Plane construction packet

- **Cue:** content must remain visible, move independently, occlude another region, block/receive input first, or appear transiently relative to an anchor.
- **Mechanism:** name the semantic owner and the separate plane/input relations; decide persistence, clipping, occlusion, and interaction priority before choosing shadow/material.
- **Selection:** create the fewest planes that truthfully express those relations. Give each real plane a clear owner and boundary behavior.
- **Near-miss:** map every semantic nesting level to a higher z-index, or use shadow depth to imply interaction priority without defining blocking/focus behavior.
- **Correction:** remove fake planes, restore missing persistence/clip/input relations, then choose the minimum visible cue set.

A useful visual ladder may still look like:

```text
background < shell < work surface < raised region < overlay < transient tooltip/menu
```

but the ladder is a **projection** of the relation graph, not the reasoning model itself. Not every interface needs every plane. Collapse planes that do not express real focus, containment, persistence, occlusion, independent movement, or interaction priority.

A broad work surface/panel can be the minimum sufficient boundary for many related sections. Prefer that parent boundary over repeating border/radius/shadow on every child section when they share one task context.

## Use the minimum sufficient cue set

Possible depth/separation cues include:

- surface tone;
- border/divider;
- spacing/alignment;
- clipping/silhouette;
- overlap/occlusion;
- shadow;
- scrim;
- translucency;
- background blur;
- scale/transform;
- motion during state/plane change.

Choose the smallest coherent set. Multiple cues should agree about the same relation. Conflicting cues create fake depth: e.g. a darker surface that appears recessed combined with a large shadow that claims it floats forward.

Do not promote a relation to a new container merely because a radius token exists. First ask whether spacing, alignment, surface tone, divider, or inherited clipping already communicates the relation.

## Shape / silhouette grammar

Use this decision packet whenever radius, border, clipping, capsule geometry, or nested rounded surfaces are material.

- **Cue:** a region/control needs a visible boundary, nested layers repeat rounded rectangles, or the page looks soft/fragmented despite correct spacing and color.
- **Mechanism:** trace `semantic/plane relation -> silhouette owner -> shape role -> token/value`. The owner is the element whose outer boundary carries the grouping/object/plane claim.
- **Selection:** give a child its own silhouette only when it is an independent object/action scope, a distinct plane, an explicit state shape, or a Design-System component whose shape is authoritative. Otherwise inherit/clip within the parent or use a weaker cue.
- **Failure:** structural region, parent surface, child section, row, header, and state highlight all mint their own rounded containers because "consistency" or "modern" is treated as the rationale.
- **Correction:** move outward to the first real owner, remove redundant child enclosures, then re-evaluate surface/divider/spacing/state cues. Re-render at part and whole scale.
- **Consequence:** shape contrast regains meaning; controls, objects, structural regions, and transient planes are distinguishable without arbitrary radius variety.

Use typed relations when ownership is ambiguous:

```text
[TABLE]   --OWNS_SILHOUETTE_OF--> [TABLE BOUNDARY]
[HEADER]  --INHERITS_CLIPPING_FROM--> [TABLE]
[ROW]     --GROUPS_WITH--> [TABLE]
[STATUS]  --OWNS_SHAPE_AS--> [STATUS / CHIP ROLE]

[TRIGGER] --ANCHORS_TO--> [MENU OVERLAY]
[MENU]    --OWNS_TRANSIENT_SILHOUETTE--> [OVERLAY]
[OPTION]  --LIVES_WITHIN--> [MENU]
[HOVER]   --MODIFIES_STATE_OF--> [OPTION]
```

The graph is not a prescription that tables must always be rounded or status must always be pills. It exposes who owns each shape decision so the current Design System can supply the actual role/token.

## Nested radius and clipping

When a genuine inner container lives inside a rounded parent, judge compatibility, not one universal subtraction formula.

Check together:

- parent radius / silhouette character;
- inset distance between outer and inner boundaries;
- inner radius / corner trajectory;
- border thickness and surface contrast;
- whether corners appear concentric, pinched, or swollen;
- whether the inner object truly needs a separate boundary at all.

A useful visual invariant is **corner compatibility**: the nested silhouettes should look intentionally related at the actual inset. If the inner radius is visually larger than the parent, or two nearly touching arcs create a swollen corner, correct the role mapping/geometry rather than adding more shadow.

Children that only subdivide a parent usually inherit clipping. For example, a table header can use a different surface tone while the table remains the outer silhouette owner. Do not round the header as a second floating object unless it really is one.

## State geometry

State changes should reveal state, not automatically create another object.

Default re-entry order:

```text
foreground / icon / text
-> surface or state layer
-> border / outline / focus indicator
-> elevation / transform when relation changes
-> shape change only when the system or interaction meaning assigns it
```

Hovering one menu option normally modifies that option's state within the menu. It does not need to become a pill merely because a rounded hover rectangle looks polished. Shape morphing can be valid when the Design System explicitly uses it for selection/toggle/emphasis and the transition remains coherent across input modes.

## Shape contrast and the pill budget

Shape is a contrast channel. If almost every region is a rounded rectangle, roundedness stops distinguishing anything.

Classify the role before choosing a silhouette:

```text
structural region / shell
work surface / bounded object
control family
transient overlay
status / tag / chip
selection or state layer
```

Roles may intentionally share one shape family, but that sharing needs system authority or perceptual coherence. Do not equate "same product" with "same radius everywhere".

Treat capsule/pill geometry as high-specificity shape. It often works for compact tags, status, segmented selections, or controls whose identity is intentionally capsule-like. Repeated pills for rows, headers, toolbars, cards, and state highlights quickly collapse hierarchy.

## Shadow

Shadow is one depth cue, not a z-index visualizer. Reason about:

- which surface blocks light / appears closer;
- offset direction consistency;
- blur/spread relative to perceived separation;
- opacity relative to backdrop and theme;
- ambient versus directional character when the visual language needs both;
- repetition cost across many surfaces.

If every card, header, menu, panel, and row has a shadow, first ask whether the plane model is over-segmented. The correction may be **remove planes**, not soften every shadow.

## Scrim, translucency, blur

An overlay scrim already creates a strong focus/depth shift. Do not additionally saturate every modal element or add extreme shadow unless the plane remains ambiguous.

Translucency retains backdrop context but can destabilize legibility and color. Use it only when retained context/material character is valuable. Blur is computational/visual emphasis and should not be a generic premium effect.

## Shape, radius, stroke, transform

Radius, stroke, clipping, rotation, skew, and perspective change grouping, direction, character, and alignment tension.

Ask which perception the shape operation serves:

```text
hierarchy?
grouping?
direction/energy?
depth?
state?
brand/system character?
```

If the only answer is "looks more modern/cool," treat it as unsupported decoration.

Random rotation/skew can be appropriate in expressive/editorial/creative surfaces but usually damages scan fields in dense operational UI.

## Icon and image relations

Keep icon geometry/stroke/fill language coherent at the same hierarchy level. Align icons optically with text and control anatomy rather than relying only on bounding boxes. Images/illustrations create large visual mass; crop, contrast, and placement must respect task hierarchy.

## Worked contrasts

### Bounded table: one outer owner, quieter children

**Near-miss:** work surface is rounded; table is rounded; header is another rounded rectangle; each status is a pill; row hover is another rounded pill. Every local piece looks polished, but the whole table becomes stacked soft boxes.

**Better reasoning:** decide whether the work surface or table owns the data-region boundary. If the table owns it, let the header surface inherit table clipping, use dividers/alignment for rows, and reserve an independent status shape only if status really has a chip/tag role. Hover modifies the row state rather than minting a new object silhouette.

### Anchored selector: transient plane versus option state

**Near-miss:** trigger is rounded, menu is rounded, each menu option is a rounded card, hover adds another pill, and annotations are rendered as more mini-cards. Two levels already read like six independent objects.

**Better reasoning:** trigger owns its control silhouette; the menu owns the transient overlay silhouette; options live inside that menu; selected/hover/focus/unavailable change state cues inside option geometry. Only add an option-level shape when the Design System explicitly assigns one to that option role/state.

### Existing authority exception

An approved system intentionally uses strongly rounded structural regions and selected-state morphing. Do not flatten or square it merely because the heuristic above prefers fewer silhouettes. Verify that ownership, token mapping, nesting compatibility, and repetition remain coherent; preserve the authoritative system when they do.

## Failure patterns -> correction

- **Shadow ladder by nominal z-index:** model actual plane relations and reduce cues.
- **Modal is red everywhere:** scrim + one danger action/consequence cue may already carry enough salience.
- **Every section has border + radius + shadow:** reopen grouping and silhouette ownership; use proximity/alignment/whitespace or one parent boundary where possible.
- **Rounded shell + rounded topbar + rounded panel + rounded table + rounded header:** structural/component/state roles collapsed into one shape vocabulary; identify the first real owner at each branch and remove redundant child silhouettes.
- **Every hover/selected row becomes a pill:** re-enter state geometry; change state cues before shape unless the system explicitly assigns morphing.
- **Nested radii look swollen/pinched:** inspect actual inset and corner compatibility; do not solve with more shadow.
- **Blur/glass everywhere:** verify retained context and readability actually improve; otherwise use stable opaque surfaces.
- **Decorative tilt in data table:** remove transform unless it encodes state/direction intentionally.
