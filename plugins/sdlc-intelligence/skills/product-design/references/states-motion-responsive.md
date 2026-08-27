# States, Motion, and Responsive Recomposition

## Contents
- State families and continuity
- Motion as temporal salience
- Constraint-space adaptation
- Geometry/content/input matrix
- Decision packet and worked contrast
- Modality continuity
- Input modes and reduced motion
- Failure patterns

## State families: preserve identity while meaning changes

Design normal, loading, empty, permission-denied, partial-error, validation, selected, disabled, optimistic/pending, success, and recovery states as related states of one experience when that continuity helps orientation.

For each material state, identify:

- what remains stable (page identity, subject, navigation, key anchors);
- what changed and why it matters;
- what the user can truthfully know;
- what action remains valid;
- which cues communicate the change without relying on color alone.

Do not make every state a visually unrelated page. Conversely, do not preserve a skeleton/layout when the user task or available action genuinely changes.

## Motion is temporal salience

Motion attracts attention and explains spatial/state change. Spend it deliberately.

Use motion to clarify, for example:

- origin/destination during reordering;
- entering/leaving plane relation;
- continuity between overview and focused detail;
- confirmation that an action changed state;
- spatial consequence of collapse/expand.

Avoid motion that competes with reading/comparison or exists only to make the interface feel dynamic.

For drag/drop, distinguish source, valid target, rejected target, pending persistence, and server correction. Preserve an operable alternative when drag is not essential to the authorized behavior. If timing/continuity cannot be evaluated statically, state the unresolved question and return it as bounded input for Prototype.

Reduced-motion behavior must preserve state and spatial meaning without depending on animation.

## Responsive design is constraint-space adaptation

### Decision packet — recomposition under constraints

- **Cue:** geometry, content, transient chrome, text scale, state, or input capability makes the current composition/action path fail.
- **Mechanism:** bind a compact matrix of geometry + content/transient pressure + input capability + state, then name semantic invariants.
- **Selection:** choose the smallest composition/interaction-mode change that preserves those invariants. Breakpoints implement a decision; they are not the reason for it.
- **Failure:** width/device label alone chooses the mode, extra width is filled without task value, or essential meaning depends on hover/drag.
- **Correction:** identify which invariant actually failed and reopen only the relevant topology/disclosure/target/persistence relation.
- **Consequence:** stress the changed mode under one neighboring geometry/input/state; return unresolved runtime continuity as bounded input for Prototype.

Do not start from `desktop / tablet / mobile` labels. Bind the actual constraints that can invalidate the current composition or interaction:

| Dimension | Examples | Design question |
|---|---|---|
| geometry | width, height, aspect ratio, usable viewport, window/split region | which relationships no longer fit or remain legible? |
| content pressure | item count, long labels, localization, text scaling | which anchors/wrap/disclosure rules fail? |
| transient pressure | software keyboard, overlay, browser/system chrome | what must persist, scroll, reflow, or remain reachable? |
| input capability | fine pointer, touch/coarse pointer, keyboard, stylus/assistive input | what target/focus/hover/gesture affordance must adapt? |
| state/context | selection, edit mode, error/pending, navigation depth | what identity/action continuity must survive? |

Then name the **semantic invariants** to preserve, such as:

- identity;
- comparison;
- context persistence;
- primary action accessibility;
- navigation/orientation;
- sequence;
- selection/detail relation;
- current edit/focus subject.

Choose the composition and interaction mode from these constraints. A breakpoint may later implement the chosen mode; the breakpoint is not the Design rationale.

## Recomposition strategies

Possible responses include:

- change columns, not just width;
- bound readable/scan regions instead of stretching to fill an ultrawide viewport;
- collapse supporting context into disclosure;
- switch master-detail to mode navigation;
- preserve comparison with horizontal continuation or alternate focused view;
- keep a primary action persistent when task frequency/consequence warrants it;
- move secondary actions behind a menu without hiding required state;
- reduce or relocate vertical chrome when usable height collapses;
- choose which region scrolls when a keyboard/overlay consumes viewport height;
- enlarge/re-space interaction targets without proportionally enlarging every visible icon/text element.

`Stack everything vertically` is valid only when the resulting order still preserves the user's real task. `Use all available width` is valid only when extra parallelism or context improves the task.

### Counterexamples to device-label reasoning

- same width, different height/input can require different layouts;
- a phone in landscape can be wide but vertically constrained;
- a tablet can move from touch to trackpad + keyboard inside one session;
- an ultrawide screen may need bounded work regions rather than stretched content;
- a software keyboard can invalidate an otherwise valid mobile frame without changing device class.

## Worked contrast — calendar in landscape

A phone rotates from portrait to a wide-but-short landscape viewport. The month grid now has enough width for seven columns but too little usable height for readable cells plus persistent navigation/action chrome.

**Bad:** switch to the desktop month layout because width crossed a breakpoint.

**Better transfer:** preserve calendar identity, current date/selection, navigation, and primary action; treat height/aspect/usable viewport as the failing constraints. The correct response may reduce chrome, change disclosure, or offer a focused schedule/list mode while keeping touch targets reliable. A wide viewport does not create desktop input assumptions, and a layout change does not create a new product truth.

## Modality continuity

Device category and input mode are not the same thing. Users may combine or switch pointer, touch, keyboard, stylus, voice, or assistive input.

Preserve the semantic action and state across modality changes while allowing affordances to differ:

```text
same action/state truth
        |
        +-- fine pointer -> optional hover / precise contextual affordance
        +-- touch        -> reliable target / discoverable non-hover path
        +-- keyboard     -> logical focus / visible focus / activation-dismissal path
        +-- other input  -> equivalent operability according to platform/accessibility truth
```

Do not make essential meaning depend on hover. Do not remove focus semantics because pointer use is common. Do not create separate product truths for each input mode unless approved Product behavior genuinely differs.

For component-level target/state/nested-action anatomy, load `control-interaction-anatomy.md`.

## Failure patterns -> correction

| Failure | Correction |
|---|---|
| mobile becomes one very tall card per desktop row | preserve identity/comparison/action through prioritization, disclosure, alternate mode, or horizontal continuation |
| every state gets a new illustration/card | preserve shared anchors and use state-specific cues proportional to consequence/action |
| motion/glow everywhere in drag board | reserve temporal salience for source/target/change explanation |
| text scaling clips controls | recompose geometry; typography changed the layout constraint |
| responsive design copies breakpoints from a framework | derive mode changes from semantic failure, then map to implementation later |
| width alone chooses the layout | include height/usable viewport/content/input constraints that materially change the task |
| desktop = mouse, mobile = touch | reason from current input capabilities and support modality switching |
| ultrawide stretches every region | bound readable/scan fields and add parallel context only when task value justifies it |
| virtual keyboard hides focused field/action | reopen vertical persistence/scroll/reflow decisions under the reduced usable viewport |
