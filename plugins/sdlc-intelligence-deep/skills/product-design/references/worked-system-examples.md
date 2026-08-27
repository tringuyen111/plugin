# Worked System Examples

## Contents
- Shared icon / propagation scope
- Spacing role versus repeated value
- Model selector interaction anatomy
- Cross-layer color roles
- Constraint-driven adaptation
- Spatial workspace coordinate spaces
- One analytics workspace through five graphs
- Contextual color composition

Use these examples only when a system/control/adaptation decision remains ambiguous after the universal lens. They are **teaching examples**, not eval fixtures and not product-specific rules. Transfer the reasoning shape, not the literal values or visual style.

## 1. Shared icon looks wrong: locate the Design owner before replacing it

**Situation:** one Share action in a toolbar uses a glyph that looks heavier than nearby actions.

**Bad shortcut:** replace the SVG in the visible screen and repeat the same local patch wherever the mismatch is noticed.

**Reasoning:**

```text
Observed toolbar action
  --INSTANCE_OF--> ToolbarAction component/pattern
  --REPRESENTS---> Share semantic action
  --USES_ASSET---> current share glyph mapping
  --STYLED_BY----> icon-size / foreground / gap roles
  --APPEARS_IN---> toolbar, row action, compact menu, touch mode
```

Ask what is actually wrong:

- only this wrapper/instance -> `INSTANCE` scope;
- shared ToolbarAction anatomy -> `COMPONENT` scope;
- Share meaning/glyph mapping is wrong across contexts -> `SEMANTIC_ROLE` scope;
- the whole iconography family has mismatched stroke/optical mass -> `FOUNDATION` scope.

**Correction:** change the smallest valid Design owner, then inspect at least one neighboring consumer/state. Leave file/import/source propagation to Frontend Engineering instead of inventing source dependencies inside Product Design.

## 2. The same `24` does not mean the same spacing role

**Situation:** a sidebar-to-workspace gap and a card's internal padding both currently resolve to `24px`.

**Bad shortcut:** bind both to one semantic spacing role because the number matches.

**Reasoning:**

```text
shell separation  -> shell/workspace spacing role -> current value 24
card child-parent -> component padding role       -> current value 24
```

Compact density may legitimately become:

```text
shell/workspace gap -> 24
card padding        -> 16
```

No inconsistency exists because **relationship -> role -> value** is the authority. The repeated raw number was an implementation coincidence.

## 3. Model selector: one component contains several interaction contracts

**Situation:** a model selector trigger opens an anchored menu containing a selected model, a highlighted option, and a future/unavailable model with metadata.

Model it as:

```text
MODEL SELECTOR

TRIGGER
  CONTAINS -> current value + chevron
  ANCHORS_TO -> MENU

MENU
  CONTAINS -> OPTION[selected]
  CONTAINS -> OPTION[hover/focus candidate]
  CONTAINS -> OPTION[unavailable + metadata]
```

For each operable element distinguish:

```text
semantic action
!= visible icon/text
!= visible container
!= interaction target
```

**Bad shortcut:** make the icon itself the hit area, style only rest/hover, and call the screenshot proof of keyboard behavior.

**Correction:** preserve action ownership, visible hierarchy, target geometry, selected/unavailable semantics, and anchored-plane relation. Treat Escape, focus movement/return, click-outside and runtime positioning as unresolved until executable evidence proves them.

## 4. Cross-layer color: assign roles before inventing shades

**Situation:** a dark application contains shell chrome, a main work surface, an open menu, a dialog, primary actions, destructive actions, and status data.

**Bad shortcut:** choose a pleasing dark gray for each layer and add shadow when two layers visually merge.

**Reasoning:**

```text
shell/canvas
work surface
transient menu surface
dialog + scrim relation
foreground primary / secondary
primary action
destructive action
status roles
interaction states
```

Map those roles to the current Design-System color authority. Reuse semantic aliases before raw values. Different screens may use different *amounts* of a role, but unexplained changes to the role itself are system drift.

**Correction:** if a menu is not distinguishable from the work surface, first inspect surface-role mapping, border/depth relation, backdrop and occupied color mass; do not automatically create a new arbitrary gray.

## 5. Same width, different experience constraints

**Situation A:** `1366x768`, fine pointer + keyboard, short usable height.

**Situation B:** `1366x1024`, touch-first, taller viewport.

**Bad shortcut:** treat both as the same `desktop/tablet` breakpoint because width is similar.

**Reasoning matrix:**

| Constraint | A | B |
|---|---|---|
| Width | similar | similar |
| Height | constrained | generous |
| Pointer | fine | coarse/touch |
| Hover | available | unreliable/non-primary |
| Target pressure | compact possible | touch reliability dominates |
| Vertical chrome | expensive | less expensive |

Preserve the same semantic actions and states, but adapt visible density, target spacing, disclosure and persistent chrome according to the failing constraints.

Also falsify device labels with a phone in `844x390` landscape: width is large relative to portrait, but usable height is extremely constrained and touch remains the input capability. Wide does not mean desktop.


## 6. Canvas editor: chrome changes the viewport, not the document

**Situation:** a diagram editor has top chrome, dockable side panels, a scroll/zoom workspace, a selected shape, and object-anchored context menus. Shrinking the window or opening an inspector changes the visible canvas. The selected shape may leave the usable viewport even though its document coordinates did not change.

**Bad shortcut A:** move/reflow the shape upward because the window became shorter.

**Bad shortcut B:** preserve the current viewport transform mechanically even when the active edit subject becomes unusably hidden.

**Reasoning:**

```text
screen/chrome
  -> bounds workspace viewport
      -> projects document/world through pan + zoom + scroll

selected shape
  -> keeps canonical document geometry
  -> may project outside the new visible viewport

context menu
  -> anchors to projected shape/cursor location
  -> collision-adjusts in screen space
```

**Correction:** decide what the triggering event promises. If spatial memory should dominate, preserve the transform/anchor and let the user pan deliberately. If the interaction promises continued visibility of the active edit subject, shift the viewport or chrome while leaving document coordinates unchanged. Never make app-chrome responsiveness silently become a document edit.

This reasoning transfers to whiteboards, maps, CAD canvases, node editors, timelines, and other spatial workspaces; do not copy literal panel sizes or scroll values.

## 7. One analytics workspace, five simultaneous graphs

**Situation:** an analytics product has shell navigation, a filter toolbar, KPI strip, comparison table, inspector drawer, selected row, and an anchored row-action menu.

A shallow representation says:

```text
page
  sidebar
  header
  cards
  table
  drawer
  menu
```

That tree is not wrong, but it hides the decisions that make the interface robust.

### Semantic graph

```text
Analytics workspace
  -> filters change comparison context
  -> KPI strip summarizes current context
  -> table supports repeated comparison
  -> selected row owns current inspection subject
  -> inspector explains/edits selected subject
  -> row menu exposes local actions
```

### Layout graph

```text
shell --BOUNDS--> workspace
filter toolbar --FLOWS--> controls
KPI strip --GRIDS/ALIGNS--> repeated metrics
comparison table --OWNS_COLUMN_FIELD--> rows
inspector --PERSISTS_WITH--> selected subject
```

### Component graph

```text
KPI Metric component -> label/value/delta slots -> compact/spacious density
Table Row pattern -> identity/value/status/action slots -> selected/default states
Model/Filter control -> trigger/options -> state/input contract
```

Do not componentize `KPI`, `warning panel`, and `inspector section` into one generic card merely because all three are rectangles with headings.

### Style / type / token graph

```text
page orientation -> heading style
metric value -> numeric emphasis style
row metadata -> supporting text style
primary action -> action color role
selected row -> selection role
work surface -> surface role
```

The same raw spacing or gray can appear in several branches without becoming the same semantic token.

### Plane / input graph

```text
workspace content --SCROLLS_UNDER--> sticky filter toolbar
inspector --PERSISTS_OVER/WITH--> table context
row menu --ANCHORS_TO--> selected row action
row menu --OVERLAYS--> table
row menu --RECEIVES_INPUT_BEFORE--> table beneath its bounds
```

### Whole-scene correction

A KPI component looks elegant in isolation with large saturated delta badges. Repeated four times above a table that already uses saturated status chips, it consumes too much attention. The local component is not "wrong" by itself; the whole-scene color/type mass reveals the defect. Correct the shared KPI/status emphasis relationship, then re-check the component specimen.

This is the intended part <-> whole loop: the same artifact must remain coherent across all five graphs and in the rendered scene.

## 8. Color composition: same semantic role, different perception

**Situation:** the same approved blue primary-action token is used on two screens. One screen has warm neutral surfaces; the other has cool blue-gray surfaces and a large saturated chart. The button looks crisp on the first and strangely dull on the second.

**Bad shortcut:** split the semantic role into `primaryBlueWarmScreen` and `primaryBlueCoolScreen` because the swatch appears different.

**Better transfer:** keep the semantic graph stable while comparing the perceptual composition:

```text
semantic role: primary action  (same)
actual backdrop:               warm neutral vs cool neutral
adjacent color mass:           quiet content vs saturated chart
accent occupied area:          small vs repeated/large
perceived relation:            strong separation vs compressed cool field
```

First test the surrounding neutral temperature/lightness, chart chroma/area, and surface ladder. If a different mode value is genuinely required, express it through the approved role/mode system. Do not convert contextual perception into arbitrary local token proliferation.
