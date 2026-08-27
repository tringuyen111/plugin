# Visual Instruction

Use this reference when a visual could materially change reader success. The goal is not to decorate the guide; it is to reduce orientation, recognition, sequencing, comparison, or conceptual effort that text alone handles poorly.

## 1. Choose the representation from the reader problem

| Reader problem | Prefer | Usually avoid |
|---|---|---|
| a control/state is hard to locate, subtle, hidden, or confused with nearby choices | focused screenshot with minimal highlight/callout | screenshot of an obvious control that text identifies unambiguously |
| several visible UI locations/actions must be followed in order | a small sequence of focused images or restrained numbered callouts | one crowded full-screen image with many annotations |
| the difficulty is a relationship, hierarchy, flow, inheritance, lifecycle, or comparison | diagram/structured visual | screenshot that merely shows the UI containing the concepts |
| exact command, code, value, log, or output must be copied/read | text/code block or native output | screenshot of text/code |
| surrounding layout provides no decision value | text only | decorative screenshot |

A visual is earned when it saves reader effort or prevents a realistic mistake. If text is already clear and the visual adds no orientation/recognition/understanding value, omit it.

## 2. Frame the smallest useful scene

For screenshots, preserve **enough surrounding context to orient the reader** while removing unrelated visual noise. The crop must still let the reader answer "where is this on my screen?" Do not crop so tightly that the target loses location meaning, and do not keep an entire screen when most of it competes with the intended action.

Choose the captured state to match the teaching purpose. For example, show a closed menu when the problem is locating the menu itself; show it open when the problem is distinguishing choices inside it.

Keep the target legible at the consumed size. If the important control or text becomes unreadable after embedding, reframe or split the visual instead of relying on zoom.

## 3. Annotate for attention, not explanation

Use the minimum annotation that changes recognition:

- one subtle target -> one highlight/box/label may be enough;
- ordered interaction across several visible targets -> numbered callouts can encode sequence when the numbers are also explained in nearby text;
- many fields/options -> split the visual, crop by subtask, or move exhaustive detail into reference content rather than adding dense callouts.

Do not put unique instructions, warnings, permissions, or recovery information only inside an image. Keep decisive wording in accessible/searchable text; annotations should point, sequence, or disambiguate rather than become a second prose layer.

## 4. Place the visual at the decision point

Put the visual next to the step/concept whose interpretation it changes. A screenshot normally complements the instruction; it does not replace the action wording or supported expected result.

When the visual illustrates a state after an action, place it where the reader needs to recognize that state. When it explains a relationship, place it after the minimum text needed to name the entities/relationship, then let surrounding text explain any meaning not safely encoded visually.

## 5. Preserve accessibility and localization

Treat informative visuals as having a textual equivalent. Use target-native alt text/caption/description conventions. Describe the instructional meaning, not every pixel, and avoid duplicating surrounding text verbatim.

Keep embedded explanatory text in images sparse. Large prose inside screenshots/diagrams is harder to search, localize, resize, and consume with assistive technology. If a figure needs detailed explanation, put that explanation in surrounding text and let the visual show the relationship/location.

## 6. Bind visual truth and staleness

A visual is evidence of a specific visible state, not universal product truth. Bind build/version/environment/state/viewport when those dimensions affect meaning. A visual becomes stale when the state, label, placement, or relationship it is meant to teach changes enough to mislead the reader.

If the text claim remains independently supported, replace/review only the stale visual relation; do not invalidate the whole page by default.

## 7. Acquisition boundary

First decide the instructional visual contract:

```text
reader problem -> representation -> target state -> framing -> annotation intent -> textual equivalent
```

Then execute acquisition only if needed. Reuse a current inspected image when it already satisfies the contract. Otherwise return the bounded capture/masking/callout/provenance input; when host-native capability selection provides visual capture, use that capability for execution. Do not load browser/capture mechanics or sibling routing into User Guide reasoning.

## Failure signatures

| Failure | Correction |
|---|---|
| screenshot because screenshots look helpful | ask what reader error/effort it removes; omit if none |
| full-screen noise | crop to the smallest orienting context |
| eleven-callout poster | split by subtask/sequence or move detail to reference |
| screenshot for a conceptual relationship | use a diagram/structured relationship view |
| annotation contains the only instruction | move decisive meaning into text; keep annotation referential |
| old visual invalidates the whole guide | re-evaluate only claims/pages that depend on that visual |
