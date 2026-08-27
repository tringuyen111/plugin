# Visual Direction

Use this reference when the active Product Design question includes materially different visual/system/brand directions. Do not create variants when the decision is already constrained by a mature Design System or when alternatives differ only by superficial color/style.

## Direction thesis

A direction is a coherent hypothesis about hierarchy, composition, system posture, material/shape language, type/color behavior, imagery/motion character, and the task experience they support.

Do not start from named style recipes (`glassmorphism`, `neo-brutalism`, `SaaS minimal`, etc.) or product category. Start from the approved task, real content, current system, brand constraints, and intended perceptual order.

## Compare materially distinct alternatives

When two directions could change the outcome, compare each on the same dimensions:

| Dimension | Question |
|---|---|
| Purpose / user-goal salience | Does the direction make the primary outcome/action clearer or create competing focal priorities? |
| Hierarchy / reading-action order | Do composition, density, type, grouping, and color preserve the intended order? |
| Continuity / system fit | What does it reuse, extend, or intentionally diverge from in the current UI/Design System? |
| Adaptability / content stress | Does it survive long labels, dense/empty/error/loading states, localization, text scaling, and viewport changes? |
| Accessibility | Are contrast, non-color meaning, focus/readability, targets, reflow, and motion compatible with the direction? |
| Character / brand intent | Do color/type/material/imagery/motion express the intended character without defeating task clarity or system continuity? |

For each dimension, preserve both a fit state and evidence state when useful:

```text
FIT | TRADEOFF | CONFLICT | UNKNOWN
SUPPORTED | ASSUMED | CONFLICTING | MISSING
```

Do not average a hard contradiction into a numeric score.

## Render alternatives when the distinction is visual

If the trade-off depends on visible composition, render enough of each alternative under the **same content/state/viewport pressure** to compare the actual relation. A textual thesis can narrow the space but cannot prove hierarchy, density, brand mass, or material coherence.

Alternatives should differ in a decision that matters, for example:

- dense aligned comparison surface vs isolated card composition;
- quiet system-continuous treatment vs intentionally expressive branded region;
- persistent master-detail vs mode-based compact composition;
- tonal surface separation vs enclosure/elevation-heavy treatment.

Do not create `blue version / purple version` as separate directions unless color itself is the material decision.

## Contradiction test

A direction cannot become current recommended/approved truth merely by taste when it requires:

- unresolved Product/behavior change;
- inversion of the approved information/action hierarchy;
- invented Design-System capability;
- material accessibility contradiction;
- happy-path-only geometry that collapses under known content/state pressure;
- category/style-corpus assumptions with no current evidence.

Keep `UNKNOWN/MISSING/CONFLICTING` visible or narrow the claim.

## Recommendation vs approval

Record the decision target, non-negotiable constraints, alternatives, strongest contradiction/falsifier, recommended direction, rejected alternatives, intentional system divergence, and unresolved decisions.

A recommendation is not approval. Only the accountable Design/product owner named by the project can mark durable direction truth `APPROVED`. A material change after approval creates a new revision/supersession relation rather than silently rewriting the old decision.

## Worked contrast — brand-heavy fintech workspace

Bad direction process: `fintech -> dark gradient + glass cards + neon chart accents`.

Better process:

1. task is precision/comparison in a dense workspace;
2. existing brand requires vivid violet/orange character;
3. allocate expressive treatment to a small number of orientation/brand anchors;
4. keep high-frequency data surfaces quiet and stable;
5. render with real data density and error/selection states;
6. reject the direction if brand mass competes with comparison or semantic status cues.
