# Frozen Product Design Shape / Depth Cases

Frozen before Product Design mutation. These cases test mechanism, not a visual style recipe.

## PDSH1 — Structural shell vs control silhouette
A desktop app has an app shell, topbar, sidebar, work surface, toolbar buttons, and status chips. Decide which objects should own a silhouette/radius and which should remain structural/flat. Reject a solution that rounds every structural region merely for consistency.

## PDSH2 — Table header inside bounded table
A data table already owns its outer boundary and clipping. The header uses a muted background. Decide whether the header should introduce another rounded rectangle. Explain parent silhouette ownership and child clipping.

## PDSH3 — Three-plus nested data hierarchy
Compose: shell -> primary work surface -> data region -> table -> header/rows -> status. Preserve containment/hierarchy without border+radius+shadow stacking at each level. State which layer owns which boundary and what weaker cues replace redundant enclosure.

## PDSH4 — Trigger -> overlay -> option -> state
A model-selector trigger opens an anchored menu. One option is selected, one is hovered/focused, one is unavailable. Decide which layers own persistent/transient silhouettes and whether the option state should create a new pill/container geometry.

## PDSH5 — Nested radius compatibility
A parent panel has a visible rounded outer boundary and contains a genuinely independent nested editor surface inset from that boundary. Explain how the inner silhouette should relate geometrically to the parent/inset without prescribing one universal radius formula.

## PDSH6 — State changes geometry only when semantic
A control has rest, hover, focus, pressed, selected, and disabled states. Reject arbitrary shape morphing when state can be expressed by surface/foreground/outline unless the design system explicitly assigns shape change to the state.

## PDSH7 — Pill budget
A screen contains buttons, rows, filters, status tags, tabs, menu options, a search field, and selection highlights. Identify which roles may legitimately use capsule/pill geometry and detect when repetition makes the shape lose semantic meaning.

## PDSH8 — Shape vs spacing/surface/divider
Two adjacent groups need clearer separation. Decide whether to add a new container/radius or use spacing, alignment, background tone, or divider. Require the minimum sufficient cue set.

## PDSH9 — Depth/shape disagreement
A region uses a recessed darker surface but also a large floating shadow and strong round enclosure. Diagnose the conflicting plane claims and choose a coherent correction.

## PDSH10 — Rendered two-layer selector
Render trigger + overlay + option states. Fail if hover/focus row becomes an unnecessary independent rounded card/pill, if annotation scaffolding looks like product controls, or if the overlay/trigger silhouette relation is ambiguous.

## PDSH11 — Rendered three-plus layer operations screen
Render shell + work surface + data region + table + header/row/status. Fail if rounded/bordered surfaces stack at each depth, if child headers invent independent outer silhouettes, or if structural regions and controls share one undifferentiated rounded-rectangle vocabulary.

## PDSH12 — Existing authority exception
An existing approved design system intentionally uses rounded structural regions and shape morphing for selected states. Preserve that authority when coherent; the mechanism must not become a blanket rule to flatten or square everything.
