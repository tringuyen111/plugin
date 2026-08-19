# Control and Interaction Anatomy

## Contents
- Control geometry layers
- Semantic action and target ownership
- Interactive state family
- Nested and competing interactions
- Pointer, touch, keyboard and modality continuity
- Anchored overlays and compact selectors
- Decision packet and worked example
- Proof and failure patterns

Use this reference when a button, icon button, input, row, card, menu, selector, popover, toolbar control, image/action surface, or other interactive component has material geometry, state, target, or input-mode decisions.

Do not begin from a pixel recipe. Bind the approved action/behavior and current Design-System role first.

## Decision packet — interactive control

- **Cue:** a control feels inconsistent, hard to operate, state-ambiguous, or changes behavior across pointer/touch/keyboard contexts.
- **Mechanism:** bind action ownership, then separate interaction target, visible container, content/optical geometry, internal relationships, material/shape, and state feedback.
- **Selection:** preserve semantic action/state identity; adapt only geometry/affordance required by hierarchy, content, input capability, or platform truth.
- **Failure:** the fix changes icon size when the target is the problem, hides an essential action behind hover, or resolves nested actions only with cosmetic spacing.
- **Correction:** reopen target/action/state ownership; inspect one neighboring state/input mode before inventing a new component or token.
- **Consequence:** use rendered component + repeated-context proof for craft; hand unresolved timing/focus-trap/gesture continuity to `prototype`.

## Separate the geometry layers

A control is not one rectangle. Model only the layers that materially exist:

```text
INTERACTION TARGET
  CONTAINS / MAY EXTEND BEYOND -> VISIBLE CONTAINER
    CONTAINS -> ICON OPTICAL BOX
    CONTAINS -> LABEL / VALUE LINE BOX
    RELATES_BY -> INTERNAL PADDING / GAP
    EXPRESSES -> SHAPE / BORDER / SURFACE / DEPTH
    CHANGES_WITH -> STATE LAYER / FEEDBACK
```

Keep these distinctions explicit:

- **interaction target** — the operable region for the current input capabilities;
- **visible container** — the perceivable control boundary, which may be smaller than the target;
- **content geometry** — icon optical mass, label/value line box, baseline and alignment;
- **internal relationship** — padding, icon-label gap, leading/trailing slots;
- **shape/material** — radius, border, surface, depth/elevation when semantically justified;
- **state feedback** — focus, hover, pressed, selected/toggled, disabled, pending/loading, error/unavailable when authorized and material.

Do not enlarge a visible icon merely because a larger interaction target is needed. Do not shrink an interaction target merely to keep a dense visual rhythm. Use current platform/accessibility constraints as evidence, not a universal hard-coded number across all products.

## Bind action ownership before arranging controls

For each interactive region, state:

```text
WHO/WHAT owns the action?
WHAT does activation mean?
WHAT area is the target?
WHAT other action targets overlap or nest inside it?
WHAT state change must become perceivable?
```

An enclosing card/row can own a navigation or selection action while a child control owns a secondary action only when the targets, focus order, consequence, and pointer/touch behavior remain unambiguous.

If a parent target and child target compete, choose the smallest coherent correction: narrow the parent target, separate action zones, expose the primary action differently, or remove the nested action. Do not treat extra spacing as a complete fix when action ownership remains ambiguous.

## Interactive state family

Use a compact state table when the same control must remain recognizable while interaction changes:

| State / capability | What must remain stable | What may change |
|---|---|---|
| rest | identity, action meaning, hierarchy | baseline surface/content treatment |
| hover (fine pointer) | action meaning | optional preview/emphasis; never sole essential cue |
| focus | action identity and focus order | visible focus cue independent of hover |
| pressed/active | current action identity | immediate activation feedback |
| selected/toggled | selected meaning | persistent selected cue, not color-only when material |
| disabled | identity/context when useful | operability and emphasis; avoid implying success/completion |
| pending/loading | action/subject continuity | progress/temporary lock according to approved behavior |
| unavailable | item identity/reason when useful | non-operable treatment and explanatory metadata when needed |

Do not invent a business state because a component library happens to support it. State behavior follows approved Product/behavior truth.

## Input capability is not device identity

Reason from available capabilities, not labels like `desktop = mouse` or `mobile = touch`.

- **fine pointer:** hover can enrich, precise targets and context actions may be viable;
- **touch/coarse pointer:** larger/reliably separated targets, no essential hover dependency, finger occlusion/gesture discoverability can matter;
- **keyboard:** logical focus order, visible focus, activation and dismissal without pointer dependence;
- **stylus/assistive/other input:** preserve the semantic action and operability; do not block alternative mechanisms without evidence.

A user may switch modalities within the same task. Preserve the action/state truth while allowing the presentation and affordance to adapt.

## Anchored overlay / selector anatomy

For menus, model selectors, combo-like controls, popovers, and similar transients, model the relations instead of only the popup box:

```text
[Trigger] --ANCHORS--> [Overlay]
[Overlay] --CONTAINS--> [Option / action rows]
[Option] --REPRESENTS--> [Choice / action]
[Current choice] --MARKED_BY--> [Selected state]
[Keyboard/pointer] --MOVES_FOCUS_IN--> [Overlay]
[Escape / click-outside / committed choice] --DISMISSES_WHEN_AUTHORIZED--> [Overlay]
```

Check when material:

- trigger target and current-value clarity;
- overlay placement/occlusion and available viewport;
- in zoomable/pannable workspaces, whether the anchor originates in document/world space: project it through the current viewport transform, then collision-adjust the overlay in screen space without moving the underlying object;
- row height/density and icon/check/metadata alignment;
- selected, focused, hover, unavailable/disabled states;
- focus entry/return and dismissal semantics;
- touch target reliability and keyboard/pointer continuity;
- long labels/localization and viewport-edge pressure.

If correctness depends on timing, focus trapping, asynchronous persistence, drag physics, or runtime continuity that cannot be resolved statically, state the exact question and hand it to `prototype`.

## Worked example — environment selector

An Environment control shows the current value in a compact trigger and opens an anchored list with `Production`, `Staging`, and an unavailable `Preview` option carrying explanatory metadata.

Do not design it as "a small button plus a floating card." Bind the system:

```text
[Environment trigger] --ACTIVATES/ANCHORS--> [Environment overlay]
[Option row]          --REPRESENTS---------> [Environment choice]
[Production]          --MARKED_BY----------> [Selected state]
[Preview]             --MARKED_BY----------> [Unavailable + reason]
```

Then couple geometry and interaction: the value/chevron must align optically inside the visible trigger; the operable target may need more room than the glyphs imply; rows need stable selected/focus/unavailable anatomy; pointer hover may enrich but keyboard/touch cannot depend on it. If focus entry/return or asynchronous switching semantics remain unresolved, state that runtime question instead of claiming the static specimen proves it.

## Visible proof

When the claim is about control craft, alignment, target perception, or repeated micro-geometry, inspect the rendered component at both component/optical zoom and its repeated page context. A token-compliant control is not automatically visually coherent.

After a shared-anatomy correction, re-check at least one neighboring state or repeated consumer so a local fix does not introduce a new system defect.

## Failure patterns -> correction

- **Icon size equals hit target size:** separate optical content from operable target geometry.
- **Every input mode gets a different component identity:** preserve semantic role; adapt only the affordance/geometry that the capability requires.
- **Hover reveals the only important action:** expose an operable path for non-hover modes.
- **Clickable card plus tiny destructive icon:** reopen action ownership and target/focus anatomy before adjusting cosmetics.
- **Allowed tokens but controls still look uneven:** inspect slot geometry, icon asset mass, baselines, wrappers and shared anatomy.
- **Popover designed as a floating card only:** model anchor, option states, focus/dismissal and viewport pressure.
