# Slide Visual-Direction Method

Use this reference when the active branch is **slide visual direction**. The host presentation capability owns slide-file construction and implementation. Bundled slide data/search owns advisory strategy/layout/copy/chart and layout/color/type/background guidance lookup; this file owns how to turn those results into a coherent visual recommendation.

## Decision model

| Open decision | Evidence to inspect | Selection mechanism | Return |
|---|---|---|---|
| Narrative strategy | audience, purpose, decision/ask, deck length, available proof | choose the smallest arc that moves the audience from current belief to required conclusion/action | slide sequence/narrative arc + proof/ask placement |
| Layout/content zones | slide goal, content type, hierarchy, neighboring slides | choose zones/visual weight that make the intended reading order obvious and vary rhythm only when it serves the story | layout pattern + content-zone hierarchy + visual-weight direction |
| Copy structure | slide role, audience sophistication, evidence strength, desired action | use a formula only when it clarifies a rhetorical relation; do not force sales copy onto informational slides | headline/body/CTA structure + rationale |
| Chart form | data relationship, comparison task, category count, precision need | select the chart that exposes the relationship with least distortion and sufficient accessibility | chart type + why/when-to-avoid + labeling/accessibility constraints |
| Visual rhythm | deck position, emotion/energy, repeated pattern, focal priority | break pattern only to improve attention or narrative contrast, not to decorate every slide | rhythm/background/contrast recommendation |

## Boundaries

- Return **visual/narrative/content direction**, not CSS, class names, animation implementation, framework components, or frontend code.
- Typography sizes, layout zones, color treatment, and imagery suggestions are advisory visual direction; the host presentation implementation may adapt them to its real canvas/system.
- Current brand/project truth outranks bundled recommendations.
- A product screenshot shown on a slide does not transfer Product UI design ownership to this Skill.
- Chart recommendations must preserve labels/values/accessibility appropriate to the audience; visual novelty is not a reason to choose a worse chart.

## Search mechanics

```bash
python3 "<skill-dir>/scripts/slides/search-slides.py" "investor pitch" -d strategy
python3 "<skill-dir>/scripts/slides/search-slides.py" "metrics dashboard" -d layout
python3 "<skill-dir>/scripts/slides/search-slides.py" "problem agitation" -d copy
python3 "<skill-dir>/scripts/slides/search-slides.py" "funnel conversion" -d chart
python3 "<skill-dir>/scripts/slides/search-slides.py" "hero statement" -d typography
python3 "<skill-dir>/scripts/slides/search-slides.py" "clarity light surface" -d color-logic
```

Return to the parent workflow with: narrative/layout/content recommendation, chart/copy rationale where material, accessibility/target-context constraints, and the specific decision the evidence changed. Do not return implementation mechanics.
