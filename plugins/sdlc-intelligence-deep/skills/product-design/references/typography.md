# Typography as Geometry and System

## Contents
- Typography participates in construction
- Text-role / style / slot graph
- Role hierarchy and contrast
- Measure, rhythm, and numeric scanning
- Typeface metrics and fallback pressure
- Localization and text scaling
- Optical alignment
- Decision packet and worked contrast
- Failure patterns

Typography is not a polish layer. Text meaning, typeface metrics, and style-system decisions change component geometry, density, scan behavior, visual mass, and responsive composition.

## Build the text system before choosing isolated sizes

Start with information function:

```text
page orientation
section orientation
primary task value / key result
repeated item label or value
supporting context
metadata
control / action label
status / validation message
```

Then construct the system relation:

```text
[Information role] --STYLED_BY--> [Text style / typography token]
[Text role]        --OCCUPIES---> [Component slot / layout region]
[Style]            --RESOLVES_IN--> [Mode / density / platform if supported]
[Role]             --APPEARS_IN--> [Representative consumers]
```

A text role should remain recognizable when exact geometry changes. Do not bind meaning to one literal `14px/20px` recipe.

## Select hierarchy by relative job

Use size, weight, width, line-height, color, spacing, measure, and placement together. Choose the **minimum sufficient contrast** between neighboring roles so the page has a clear reading order without every region becoming a headline.

A practical sequence:

1. identify the page/task orientation role;
2. identify the information users compare repeatedly;
3. distinguish supporting/metadata/control roles;
4. allocate strongest type mass to the few roles that orient or decide;
5. inspect repeated whole-page mass—ten medium-bold section titles can outweigh one large page title;
6. adjust typography together with spacing/color, not independently.

## Typeface metrics change geometry

Reason about:

- x-height and cap height;
- weight / perceived darkness;
- width and character fit;
- optical size/grade when available;
- tracking;
- line-height;
- line measure;
- wrapping/truncation policy;
- numeric features such as tabular figures.

Two fonts at the same nominal size can occupy and dominate space differently. When the typeface/fallback changes, re-check line breaks, region heights, baselines, density, component slot capacity, and whole-page balance.

## Measure and rhythm

Long-form/support text needs a readable measure; dense operational UI needs compact but legible line-height and stable baselines. Choose rhythm from content/task pressure, not a universal line-height multiplier.

For repeated numeric/comparison surfaces, use alignment and numeric features to preserve scan anchors: right alignment where appropriate, tabular figures, stable decimal/time anchors, and enough column width to prevent proportional jitter.

## Text slots are structural contracts

A component that owns a text slot must define what kind of content pressure it can absorb:

```text
single-line fixed identity?
wrapping label?
user-generated value?
metadata that may disappear/reflow?
validation message that can grow?
```

The slot contract should state wrap/truncate/reflow behavior and how neighboring actions/values respond. A component is not robust if every localization needs an instance-level font-size reduction.

## Localization and text scaling are structural tests

German expansion, Vietnamese diacritics, long user-generated names, Arabic/Hebrew RTL, CJK, or larger accessibility text can invalidate the original geometry.

When pressure rises:

1. preserve semantic order and action relation;
2. allow wrap/reflow/stack where needed;
3. re-evaluate region height and alignment/grid anchors;
4. use logical start/end rather than hardcoded left/right assumptions;
5. inspect directional icons and sequence meaning separately from mirroring;
6. preserve relative role hierarchy even if exact metrics/layout change.

Do not shrink critical text or clip meaning merely to preserve the original frame.

## Optical alignment

Mathematical box centering can look wrong when icon mass, cap-height, ascenders/descenders, or glyph asymmetry shifts perceived center. Apply small optical correction only when it improves the repeated role consistently.

Do not hide inconsistent icon boxes, mixed font metrics, or weak component anatomy with per-instance nudges; fix the shared owner first.

## Decision packet — typography causes layout failure

- **Cue:** wrap, clipping, baseline jitter, weak hierarchy, or over-dense/over-loud repeated text appears under real content/font/localization.
- **Mechanism:** trace `information role -> text style -> slot -> layout/grid owner -> representative consumers` and inspect the actual font metrics/content pressure.
- **Selection:** preserve semantic role first; then adjust style metrics, slot behavior, column/flow geometry, or disclosure according to the failing relation.
- **Near-miss:** reduce font size locally until the frame fits, or change one instance's line-height while the shared slot remains defective.
- **Correction:** fix the smallest shared role/slot/layout owner that explains the failure, then re-check whole-page type mass and another consumer.

## Worked contrast — localized KPI table
A KPI table uses a narrow heading font and proportional figures. A Vietnamese fallback is wider; labels wrap and value columns jitter.

**Bad:** reduce only the Vietnamese font size or widen every card equally.

**Better:** keep `section orientation`, `metric label`, and `metric value` roles stable; inspect fallback metrics, enable tabular figures where supported, revisit column/slot width and wrapping policy, and let less-critical metadata reflow if needed. Then re-check the table's whole-page density and alignment field.

## Failure patterns -> correction

| Failure | Correction |
|---|---|
| arbitrary size ladder with no role reasoning | define information roles and relative contrast first, then choose metrics under real content |
| headings dominate every region | reduce repeated type mass; reserve strongest contrast for true orientation/decision roles |
| compact table becomes unreadable | adjust role contrast, line-height, column alignment, numeric features, and density together |
| localization breaks components | reopen text-slot and layout/grid contract; text pressure is structural evidence |
| font swap causes overflow | re-run composition because font metrics changed geometry |
| proper text styles but page still looks flat | inspect role distribution/area/repetition and coupling with color/spacing rather than adding more styles |
