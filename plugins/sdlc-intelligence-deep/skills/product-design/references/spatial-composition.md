# Spatial Composition

## Contents
- Perceptual scene graph
- Grouping and enclosure strength
- Grid, alignment, anchors
- Relational spacing and rhythm
- Density, visual mass, negative space
- Low-fidelity hypotheses
- Failure patterns and worked contrasts

Use this reference when geometry must communicate task priority, comparison, grouping, density, or plane relationships.

## Perceptual scene graph

Do not begin with a component list. Build a scene from semantic containers and typed relations:

```text
SYSTEM
  CONTAINS -> PAGE
    CONTAINS -> REGION / FRAME
      GROUPS -> GROUP
        CONTAINS -> COMPONENT
          CONTAINS -> ATOM / LAYER
    OVERLAYS -> TRANSIENT PLANE
```

Useful relation labels:

- `CONTAINS` — establishes local coordinate/layout context;
- `GROUPS_WITH` — indicates perceptual/semantic belonging;
- `ALIGNS_WITH` — creates a shared scan/comparison field;
- `ANCHORS_TO` — preserves a stable positional relation;
- `FLOWS_AFTER` — preserves reading/action progression;
- `OVERLAYS` / `OCCLUDES` — creates a front/back relation;
- `PERSISTS_WITH` — keeps context visible while another region changes;
- `RESPONDS_TO` — changes composition when viewport/input/content conditions change.

## Grouping cue strength

Grouping cues carry different semantic force. A practical ordering is:

```text
proximity / rhythm
  -> alignment / repetition
    -> background change / divider
      -> common region / enclosure
        -> isolated raised plane
```

Do not make every semantic group a card. Use the weakest **sufficient** cue that preserves the intended relation. Strong enclosure should correspond to a meaningful boundary such as independent action scope, materially different context, destructive zone, or separate plane.

### Surface membership before card count

Before deciding how many cards/panels to draw, assign each material region to a visible plane or container:

```text
page / shell canvas
  -> primary work surface
    -> semantic sections / scan groups
      -> independent object or action scope
        -> raised / transient plane when needed
```

Ask **what this content belongs to** before asking whether it needs a border, radius, or shadow. A flat composition can still be well-contained; a low-card composition can still be under-enclosed.

Introduce a shared work surface when one or more are true:

- the shell/page canvas and the task workspace are different perceptual roles and the boundary is otherwise ambiguous;
- related data, labels, and controls look like fragments floating on background rather than one task region;
- a stable surface materially improves scanning, state ownership, action ownership, or contrast against surrounding chrome;
- several sections belong to one task/context and should feel unified without becoming separate cards.

Use a card/bounded surface at a finer granularity when an item is an independently understandable/selectable object, owns its own actions/state, or needs a materially separate context. Prefer one shared table/list/work panel when comparison and common anchors matter more than object independence. Do not nest another card when a modal, drawer, editor plane, or existing work surface already provides the required boundary.

The correction for under-enclosure is often **one stronger parent surface**, not more child cards. The correction for over-enclosure is often the reverse: keep the parent surface and remove redundant child containers.

### Card-soup correction

When a page contains many bordered/shadowed cards:

1. name the actual semantic groups;
2. remove containers whose relation survives through proximity/alignment/whitespace;
3. establish a small number of dominant regions;
4. turn repeated items into quiet rows/list/grid anatomy when comparison benefits;
5. re-check whole-page visual mass after each local simplification.

## Grid, alignment, and anchors

A grid is a shared geometric field, not a style badge. Use it to create stable anchors for scanning and comparison.

Choose anchors based on the task:

- comparison -> repeated column/baseline anchors;
- selection + detail -> stable overview/detail relation;
- focused completion -> clear label/control/action alignment;
- monitoring -> stable critical-state and time/change anchors;
- editor/workspace -> persistent plane boundaries and resizable anchors.

Do not preserve a 12-column desktop grid on small screens if the semantic relation changes. Grid fidelity is subordinate to task fidelity.

### Choose grid scope before grid numbers

A product can contain several geometric fields at once:

```text
PAGE / SHELL GRID       -> major regions and persistent navigation/workspace anchors
REGION GRID / FLOW      -> sections, panels, repeated comparison fields
COMPONENT INTERNAL FLOW -> slots, labels, values, icons, actions
```

Do not force a component's internal anatomy to snap to the page grid when its own content/slot relation needs a different field. Conversely, do not let every component invent local left edges when a repeated comparison task benefits from a shared region/page anchor.

For a grid decision, bind together:

- **content anchors:** which values/labels/actions must scan or compare;
- **owner:** page, region, or component;
- **track behavior:** fixed, fluid, min/max, wrap, or content-sized where supported;
- **gutters/margins:** separation role, not leftover space;
- **text pressure:** longest/translated content and font metrics;
- **recomposition trigger:** what relation breaks first when width/height/content changes.

A good grid produces visible key lines and predictable rhythm while still serving content. The moment preserving the grid damages meaning, scan, or operability, recompose the field rather than worshiping its column count.

## Spatial workspaces: separate coordinate spaces before recomposing

Use this branch for diagram editors, whiteboards, maps, CAD-like canvases, timelines, node editors, media workspaces, or other surfaces where application chrome surrounds a zoomable/pannable document.

Model the spaces explicitly:

```text
APPLICATION CHROME / SCREEN SPACE
  BOUNDS -> WORKSPACE VIEWPORT
    PROJECTS -> DOCUMENT / WORLD SPACE
      via pan / zoom / scroll transform

TRANSIENT PLANE
  ANCHORS_TO -> screen-space control
  or PROJECTED world-space subject
  then collision-adjusts inside usable screen space
```

Do not treat these as one responsive layout tree. A sidebar collapse, inspector dock, toolbar change, or shorter window can change the **viewport** without changing canonical document geometry.

### Decision packet — viewport continuity vs task-locus visibility

- **Cue:** chrome, window size, zoom/pan, or a transient plane changes the visible workspace while the document/scene remains the same.
- **Mechanism:** bind each material element to `chrome/screen`, `viewport`, `document/world`, or `transient` space; record the current transform and task locus such as selection, edit subject, cursor, viewport anchor, or comparison region.
- **Selection:** decide whether the event should preserve the existing transform/spatial memory, keep the active task locus visible, or deliberately change viewport framing. When visibility must change, adjust viewport/chrome first; move document objects only when the product operation itself changes their document position.
- **Failure:** responsive reasoning reflows/moves canvas objects because a panel opened, or preserves a transform blindly while the active edit subject becomes unusably occluded.
- **Correction:** restore the intended task locus by changing viewport scroll/pan/zoom, disclosure, or docked chrome while leaving canonical document geometry unchanged; then re-check orientation and spatial memory.
- **Consequence:** preserve document geometry and interaction identity separately from viewport state. Hand gesture physics, animated camera continuity, or runtime focus timing to Prototype when static evidence cannot settle them.

For an overlay anchored to a document object, project the world anchor through the current viewport transform and then fit the overlay in usable screen space. Collision adjustment must not mutate the underlying document object.

## Relational spacing and rhythm

Spacing communicates relation. Think in levels, not magic numbers:

```text
inside atom/component
  < between close siblings
    < between semantic groups
      < between major regions
```

Keep padding (child-parent) distinct from gap (sibling-sibling). Repeated spacing creates rhythm; breaking that rhythm is itself a salience cue and should be intentional.

### Map relationship -> spacing role -> value

Use this decision packet when a layout looks rhythmically inconsistent or repeated raw spacing values tempt a global fix:

- **Cue:** spacing repeats, drifts, or must change under density/responsive pressure.
- **Mechanism:** classify child-parent, sibling, group, region, or shell relationship before looking at the number.
- **Selection:** map `relationship -> semantic spacing role -> current token/value`; allow distinct roles to diverge and one role to adapt when the system supports it.
- **Failure:** "same number = same token" or "everything must fit an 8px recipe" is used as the rationale.
- **Correction:** test relation classification, token mapping, shared anatomy, local pressure, then optical correction in that order.

Do not infer one spacing role from a repeated number. Classify the relationship first:

```text
APP SHELL
  viewport/page edge <-> shell/workspace
  sidebar <-> workspace
  topbar <-> workspace

REGION / SURFACE
  surface <-> child content (padding)
  section <-> section
  group <-> group

COMPONENT
  icon <-> label
  label <-> value/metadata
  control <-> control
  content <-> component boundary
```

Then map that relationship to the current Design-System spacing role/token/value. Two relationships may currently resolve to `24px` and still need to diverge under compact density. Conversely, one semantic role can resolve to different platform/density values when the system explicitly supports that variation.

When spacing feels inconsistent, test whether the defect is:

- a wrong relationship classification;
- a correct role mapped to the wrong token/value;
- a shared component anatomy defect;
- a local wrapper/content-pressure exception;
- an optical correction needed after the structural relationship is already correct.

Do not fix all five with a new spacing token.

Optical balance can require a small correction from mathematical centering when icon shape, cap-height, visual weight, or asymmetric negative space makes a mathematically aligned element look off. Correct the perceived relation, not the coordinate for its own sake.

## Density, visual mass, and negative space

Density is task-dependent. Dense does not mean cramped; sparse does not mean premium.

Evaluate:

- number of simultaneous decisions;
- comparison frequency;
- repeated-item count;
- information needed before action;
- importance of context persistence;
- expected expertise/frequency of use.

Visual mass rises with size, weight, contrast, chroma, enclosure, shadow/elevation, isolation, and repeated decoration. Allocate mass to the task's dominant information/action, not equally across every region.

Negative space is active structure: it can separate major semantic regions, create reading pauses, or establish dominance without adding another container.

## Low-fidelity hypothesis

Express a low-fi composition as a falsifiable relation:

```text
Given <task/content relation>,
place <context/orientation> before or beside <decision/action>,
use <table/list/master-detail/focused form/...>
so that <scan/comparison/orientation/decision cost> is reduced.
```

Generate alternatives only when two structures create materially different task costs.

## Worked contrasts

### Same value, different relationship

A navigation rail uses `16` units between the rail boundary and its first command group. A compact form also uses `16` units between the field container and its internal content.

**Bad:** bind both to one `space-16` semantic role because the current number matches, then shrink both when the form enters compact density.

**Better reasoning:** the rail relation is shell/group separation; the form relation is component padding. Map each relationship to its own current system role. Compact density may legitimately reduce the component padding while the shell separation stays unchanged. The repeated number was an implementation coincidence, not the meaning.

### Dense operations dashboard

Bad: summary cards + card per failed job + badge/icon/CTA in every record.

Better reasoning: triage is comparison-heavy -> shared row/column anchors; reserve high chroma for exception severity; numeric/time fields use stable alignment; summary earns dominant mass only if it changes triage action.

### Settings page

Bad: one identical card for each section.

Better reasoning: group by user mental model and consequence; use headings, alignment, and whitespace first; reserve a stronger boundary for destructive account actions or truly independent scopes.

## Failure patterns -> correction

- **Everything boxed:** reopen grouping semantics before changing radius/shadow.
- **Everything floats on the canvas:** assign surface membership; often establish one shared work surface instead of carding every child group.
- **Random whitespace:** re-establish relation tiers and repeated rhythm.
- **Perfect grid, weak hierarchy:** grid solved alignment but not attention/grouping; rebalance mass and region dominance.
- **Desktop stacks mechanically on mobile:** preserve identity/comparison/action semantics through disclosure/mode change rather than coordinate stacking.
- **Beautiful component, bad page:** zoom out; repeated local emphasis may be the global defect.
