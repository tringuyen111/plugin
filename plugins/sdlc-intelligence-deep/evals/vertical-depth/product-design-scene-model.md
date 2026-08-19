# Product Design Scene Model — Vertical Depth Eval

Freeze this file before Product Design Scene Model mutation. These cases test transfer, not literal keyword recall.

## Claim under test
A Product Design agent should construct and inspect one coherent product scene across semantic meaning, layout structure, component/system reuse, typography/style/token roles, and plane/interaction relations; then select, render, diagnose, and correct with positive mechanisms rather than local styling heuristics.

## Cases

### PDSM1 — Frame versus group versus surface
A settings area contains a title, explanatory copy, several form rows, and a save action. The authoring tool offers both Group and Frame. Decide whether this region needs a layout/container owner, a perceptual grouping only, a visible surface boundary, or some combination. Explain which responsibilities justify each representation and which do not.

### PDSM2 — Grid as comparison field, not decoration
A provider-management page has provider name, model family, quota, latency, health, and actions. A 12-column page grid exists. Long provider names and optional metadata create pressure. Construct the alignment model and explain when columns, nested flow, or re-composition should replace mechanical adherence to the 12-column grid.

### PDSM3 — Component / slot / variant / instance / override
A product repeats a Model Selector in a top bar, settings form, and compact mobile sheet. Determine what should be one component, which slots/properties/variants are legitimate, what can vary by context, and what kind of local override signals the shared anatomy is wrong.

### PDSM4 — Equal values, different system roles
`24px` is currently used for shell-to-workspace separation, card padding, and a heading's trailing space. `#667085` is used for secondary text and a disabled icon. Decide whether these should share tokens and explain the relation graph that controls the decision.

### PDSM5 — Typography as construction
A dashboard uses one typeface for headings and another for data, then swaps to a fallback font in Vietnamese localization. Lines wrap earlier, numeric columns jitter, and cards grow taller. Diagnose and recompose without treating typography as final polish.

### PDSM6 — Type hierarchy without arbitrary size ladder
A screen has page orientation, section orientation, KPI values, row labels, supporting metadata, and control labels. Construct a role system and explain how size, weight, line-height, color, spacing, and measure should cooperate; include how to avoid both flat hierarchy and over-emphasis.

### PDSM7 — Color relativity / simultaneous context
The same accent blue appears lively on a warm gray canvas but dull on a cool blue-gray panel. Two neighboring grays also become hard to distinguish when a saturated chart sits beside them. Explain why raw token correctness is insufficient and how to re-evaluate the composition without inventing arbitrary per-screen colors.

### PDSM8 — Color harmony versus hierarchy
A brand provides a violet source color. A designer proposes an analogous violet-blue family for most surfaces and a complementary yellow-green for rare high-salience moments. Decide how to allocate dominant/support/accent roles, temperature/chroma/lightness, and occupied area so harmony does not flatten hierarchy and contrast does not become noise.

### PDSM9 — Color accessibility is necessary but not sufficient
All text passes contrast, but the interface still feels muddy because raised surfaces, selected states, and healthy status use similar chroma/lightness. Diagnose the composition using semantic roles, adjacent colors, surface ladder, color mass, and non-color cues rather than treating WCAG pass as visual-quality proof.

### PDSM10 — Plane stack beyond z-index
A page has scrolling content, a sticky toolbar, a selected row, a popover anchored to that row, a modal with scrim, and a tooltip above the modal. Model containment, clipping, scroll/fixed persistence, occlusion, focus/input priority, and depth cues. Explain which relations belong to the semantic tree versus the plane/interaction graph.

### PDSM11 — Structural tree clean, visual scene bad
A Figma file uses proper frames, auto layout, components, variables, and text styles, yet the page feels like nested cards with weak hierarchy and excessive accent mass. Explain why structural conformance does not prove composition quality and how part-to-whole re-entry should diagnose it.

### PDSM12 — Screenshot beautiful, system structure bad
A polished screen uses manual groups, duplicate button frames, raw colors, one-off text styles, and local spacing overrides. Explain what structural proof is missing, what should become reusable/system-owned, and what should remain local rather than componentized merely because it repeats visually.

### PDSM13 — Complex nested product scene
Design a desktop analytics workspace with shell navigation, filter toolbar, KPI strip, comparison table, inspector drawer, selected-row state, and an anchored action menu. Describe the scene simultaneously through semantic, layout, component, style/type/token, and plane/interaction graphs. Show at least one decision that changes when moving from local component view to whole-scene view.

### PDSM14 — Adaptation preserves systems, not pixels
The workspace from PDSM13 must work at a shorter laptop viewport, a touch-first tablet of similar width, 200% text zoom, and a compact phone. Decide which invariants belong to semantic/component/style systems and which layout/control/plane representations may change. Avoid device-label-only reasoning.

## Scoring dimensions
For each case, score PASS only when the answer demonstrates the relevant mechanism rather than reciting terms:

1. scene-model coupling;
2. construction/ownership decisions;
3. layout/grid relation reasoning;
4. component/system propagation;
5. typography as geometry/system role;
6. color composition beyond token/contrast correctness;
7. plane/interaction depth;
8. positive selection and correction logic;
9. whole ↔ part re-entry;
10. evidence/boundary discipline.

A response that only lists "use frames, grids, components, tokens, typography, contrast" is a FAIL even if all keywords appear.
