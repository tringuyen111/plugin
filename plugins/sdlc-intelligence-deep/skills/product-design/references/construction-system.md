# Construction System

## Contents
- Responsibility before representation
- Structural container versus group
- Flow/grid and alignment ownership
- Component contract: anatomy, slots, variants, states, instances, overrides
- Style/token/text-role graph
- Construction matrix and decision packets
- Part <-> whole re-entry
- Worked contrasts

Use this reference when an interface must be represented as frames/containers/groups/grids/components/slots/variants/styles/tokens/text roles, or when a clean screenshot could still hide a weak reusable structure.

## Responsibility before representation

Do not start from tool objects. Start from the design responsibility that must exist, then select the smallest representation that can own it.

```text
meaning / task relation
  -> responsibility
      -> relation owner
          -> representation in the current tool/system
              -> visible result + system behavior
```

A Figma Frame, CSS grid, SwiftUI stack, design-system Component, token, or text style is an implementation of a responsibility. The Product Design decision is the responsibility and relation; the authoring surface supplies the exact object.

## Construction graph

Model the same scene through four construction graphs:

```text
STRUCTURE
[Container] --OWNS_BOUNDS_OF--> [children]
[Container] --CLIPS/SCROLLS--> [children when required]

LAYOUT
[Layout owner] --FLOWS/GRIDS/ALIGNS--> [siblings]
[Child] --SIZES_RELATIVE_TO--> [parent / content / sibling]

COMPONENT
[Component] --OWNS_ANATOMY--> [slots]
[Variant] --CHANGES_CONTROLLED_DIMENSION_OF--> [component]
[Instance] --INSTANCE_OF--> [component]
[Override] --CUSTOMIZES_WITHIN_CONTRACT--> [instance]

STYLE / TYPE
[Semantic role] --STYLED_BY--> [token / style]
[Token/style] --RESOLVES_UNDER--> [mode / theme]
[Text role] --OCCUPIES--> [component slot / layout region]
[Role] --APPEARS_IN--> [representative consumers]
```

Do not use `CONTAINS` to stand in for all of these relations.

## Structural container versus group

### Choose a structural container when it owns one or more real responsibilities

- explicit bounds independent from current child extents;
- child flow/grid/alignment/sizing;
- clipping or scrolling;
- responsive/constraint behavior;
- a coordinate context or stable anchor field;
- a meaningful surface/plane boundary;
- reusable component anatomy.

A structural container can be visually transparent. **Container** and **surface** are separate decisions.

### Choose a group when the relation is lighter

Use a group/perceptual grouping when items need to move/select/transform or be reasoned about together but no independent layout, clipping, scrolling, surface, or reusable behavior contract is needed.

A group is not "less professional" than a frame. It is correct when the lighter responsibility is correct.

### Tool translation example — Figma

Use this only as a translation of responsibilities, not as universal Product Design ontology:

- a Figma **Frame** can own explicit bounds and unlock layout guides, Auto Layout, constraints, clipping, and prototype/container behavior; use it when those responsibilities are real;
- a Figma **Group** follows the combined bounds of its children and is appropriate for lighter grouping/transform organization;
- Figma Auto Layout/grid expresses child flow and sizing; it does not decide whether the semantic grouping or component boundary is correct;
- Figma Component/Instance/Variant/Property/Slot and Variable/Text Style objects are authoring mechanisms for the component/style graphs below; only create them when the corresponding reusable contract exists.

### Decision packet — container or group

- **Cue:** several layers look related and the authoring tool can either group or containerize them.
- **Mechanism:** list responsibilities the parent must own: bounds, layout, clip/scroll, surface, responsive behavior, reusable anatomy, or only shared manipulation/perception.
- **Selection:** choose the lightest representation that owns the required responsibilities truthfully.
- **Near-miss:** create a Frame for every visual cluster or use Group for a region that must resize/reflow/clip children.
- **Correction:** move responsibility to the right owner; do not add visible card treatment merely because a structural container exists.

## Flow, grid, and alignment ownership

A grid is a shared comparison/alignment field. Flow is an ordering and spacing relation. Neither is a decorative overlay.

Choose based on the task:

| Task relation | Construction response |
|---|---|
| ordered reading/action sequence | one-dimensional flow with explicit sibling rhythm |
| repeated comparison across items | stable columns/baselines or grid tracks |
| cards/items that can wrap without losing identity | wrapping flow/grid with minimum/maximum item constraints |
| master-detail | stable overview/detail relation with independent pressure rules |
| form | label/control/help/error alignment that survives wrapping/localization |
| dense data | preserve scan anchors first; recompose secondary metadata when pressure breaks columns |

### Grid decision packet

- **Cue:** several items must scan or compare across repeated axes.
- **Mechanism:** name the information anchors first, then choose columns/tracks/gutters/margins that preserve them under real content.
- **Selection:** keep grid lines that improve scan/comparison; allow nested flow or recomposition when content/viewport makes the shared field harmful.
- **Failure:** preserve a nominal 12-column grid after the semantic relation has changed, or create arbitrary columns because the tool offers them.
- **Correction:** return to the comparison task and content pressure; keep only the anchors that still earn their cost.

## Component contract — build reuse from invariant job, not repeated shape

A reusable component earns existence when several consumers share the **same semantic job** and enough invariant anatomy/state behavior that coordinated change is valuable.

Construct the contract in this order:

```text
semantic job
  -> invariant anatomy
      -> slots
          -> controlled variant/state dimensions
              -> instances
                  -> authorized contextual overrides
```

### Anatomy
Name the stable semantic regions: identity, value, metadata, leading/trailing media, primary/secondary action, state marker, disclosure affordance, etc. Do not start from `header/body/footer` unless those labels describe the actual job.

### Slots
Use a slot when a region is semantically stable but its content/composed child can vary. A slot is not permission for arbitrary subtree replacement that destroys the component's layout/state contract.

### Variants / properties
Use a variant/property when the same component job changes along a **controlled dimension** such as size, density, emphasis, state, orientation, or content configuration. If different variants require unrelated anatomy, action ownership, or state semantics, reopen whether they are one component.

### Instances and overrides
An instance should inherit system decisions while supplying context-specific content and approved properties. Repeated per-instance geometry, color, or state overrides are evidence to inspect the component/role contract—not a normal customization strategy.

### Componentization falsifier
Three elements may look alike but should remain local when they have different jobs, unrelated state behavior, no shared evolution, or would require a generic component API broader than the product meaning. Repetition is evidence, not proof.

## Style, token, and text-role graph

Tokens/styles are not a bag of constants. They encode repeated design decisions.

```text
semantic decision
  -> token/style role
      -> value per mode/theme/density when supported
          -> component/text-slot consumers
```

Use a token/style when the decision should stay coherent while literal values may change. Keep local values local when there is no repeated semantic relationship yet.

### Equal value falsifier

```text
shell/workspace separation -> space/region -> 24
card internal padding      -> space/component -> 24
```

The values match now; the roles do not. Compact density may change only one. Preserve `relationship -> role -> value`.

### Text roles are system roles
Define text by information function before metrics:

```text
page orientation
section orientation
primary task value
repeated item label/value
supporting context
metadata
control/action label
status/validation message
```

Then map the role to type style/token and component slot. The role can preserve identity while exact size/line-height/wrap changes under localization, density, accessibility scaling, or different typeface metrics.

## Construction matrix — inspect one node across responsibilities

For each material node, fill only the columns that apply:

| Node | Semantic job | Structure/layout owner | Component role | Style/type role | Plane/input role |
|---|---|---|---|---|---|
| Routing table | compare route/provider/status | owns column scan field + clipping | maybe Table pattern | row/header/status roles | normal work plane |
| Model selector trigger | choose current model | local horizontal control anatomy | ModelSelector trigger slot | control label/value tokens | anchors transient menu |
| Menu option | choose one model | row flow inside menu | option slot/state | option text/state roles | lives inside overlay; does not own overlay plane |

This matrix catches false equivalence: the same node can own layout but not a visible surface; be a component instance but not a new plane; consume tokens without defining them.

## Part <-> whole re-entry

After constructing a reusable element, test it in the densest representative consumer and a materially different state/mode. After composing a whole page, inspect whether repeated local anatomy is causing noise or whether a local component needs a shared correction.

```text
component -> repeated region -> page -> product
product/page pressure -> region -> component -> slot/token/type role
```

Structural cleanliness is not visual proof, and a beautiful screenshot is not system proof. Require both when the claim needs both.

## Worked contrasts

### Form region: structural container without a card
A settings section has title, explanatory text, five fields, validation messages, and Save. It needs one vertical layout owner with stable width, child spacing, wrapping, and action relation. That justifies a structural container. If the surrounding page already owns the work surface, the section may remain visually unboxed. Adding radius/border because "it is a frame" confuses construction with surface semantics.

### Three similar cards that should not become one component
Billing summary, security warning, and onboarding recommendation all use a title/body/action layout. Their jobs, states, actions, evolution, and content pressure differ materially. Keep shared foundation roles (spacing/type/action styles) but do not force one generic `CardWithTitleBodyAction` component unless a real invariant contract emerges.

### One component across three contexts
A Model Selector appears in top bar, settings, and mobile sheet. Preserve the same selection job, option semantics, selected/unavailable state meaning, and component identity. Allow placement, visible density, trigger presentation, and disclosure mode to adapt through controlled properties/variants while keeping the option/state contract recognizable.
