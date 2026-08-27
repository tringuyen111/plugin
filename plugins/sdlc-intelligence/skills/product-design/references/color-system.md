# Color Composition and System

## Contents
- Two truths: semantic system and perceptual composition
- Contextual color interaction
- Hue family, temperature, lightness, chroma, and neutrality
- Dominant / support / accent distribution
- Surface and state composition
- Accessibility and adjacent-color evidence
- Tonal candidates, alpha, light/dark modes
- Direct-perception proof method
- Deterministic helper
- Worked contrasts and failure correction

Use this reference when color must do more than pass contrast or bind to tokens: hierarchy, brand character, plane separation, state, attention, and whole-scene balance must work together.

## Solve two color truths separately, then reconcile them

```text
SYSTEM COLOR
semantic role -> token/style -> mode/theme -> consumers

PERCEPTUAL COLOR
surrounding colors + backdrop + hue relation + temperature
+ lightness/chroma + occupied area + repetition
-> what the viewer actually perceives
```

A palette can be system-correct and still compose poorly. A beautiful local palette can still violate product semantics or accessibility. Do not use one truth to certify the other.

## Color is contextual, not an isolated swatch

Treat every material color as a relation, not a hex value.

The same physical color can feel brighter/duller, warmer/cooler, louder/quieter, or more/less distinct depending on surrounding hue, lightness, chroma, area, and backdrop. When a token looks wrong in one context, first compare it **in context** before inventing another semantic role.

### Context packet

- **Cue:** an approved color looks weak, dirty, too loud, or unexpectedly different on one surface.
- **Mechanism:** hold the color constant and inspect what changed around it: backdrop lightness/chroma/temperature, adjacent colors, occupied area, local type/material, or state layer.
- **Selection:** correct the contextual composition when the semantic role is still right; change the role/token only when the meaning or system mapping is actually wrong.
- **Near-miss:** duplicate the same role into several near-identical tokens because the swatch "looks different" on different screens.
- **Correction:** test the role on representative backdrops/adjacencies at real occupied area, then adjust the surrounding relation or authorized mode value.

## Compose with four perceptual controls

Use hue family, temperature, lightness, and chroma together. Do not treat saturation alone as "more colorful."

### Hue relationship
Color-wheel relationships are useful **starting structures**, not automatic recipes:

- **monochromatic / near-hue:** strong unity; hierarchy must come from lightness/chroma/area/shape/type;
- **analogous:** smooth continuity; prevent neighboring roles from collapsing by controlling lightness/chroma and dominant/support hierarchy;
- **complementary / split-complementary:** strong separation and energy; reserve enough distance/area discipline so contrast does not become visual noise;
- **triadic or broader hue set:** useful for several distinct categories, but requires strong distribution control and non-color redundancy when meaning matters.

Choose the relationship because it supports the product's hierarchy/character, not because the harmony name sounds appropriate.

### Temperature and neutral undertone
Warm/cool relationships affect perceived separation and atmosphere. "Neutral" grays can carry warm/cool bias and make the same accent shift perceptually.

When an accent feels muddy or disconnected, inspect the neutral family and neighboring temperature before simply increasing saturation. Keep temperature shifts intentional across surfaces so the product does not feel like unrelated palettes stitched together.

### Lightness
Lightness is a primary hierarchy and legibility channel. Use it to establish text hierarchy, plane separation, state distinction, and reading order before depending on hue alone.

If two surfaces or states must be distinguishable but hue difference is subtle, make sure their lightness relation, boundary cue, or other non-color cue carries enough of the distinction.

### Chroma
Chroma controls color intensity. High chroma has an attention cost, especially across large areas or repeated components. Use more chroma where the information/action earns salience; let supporting regions remain quieter.

Do not "fix" every weak relation by raising chroma. First ask whether lightness, surrounding neutral, area, type contrast, or shape/plane relation is the real lever.

## Allocate dominant / support / accent roles

A coherent palette has distribution, not merely membership.

```text
DOMINANT
largest visual field; often quiet enough to sustain long viewing/task work

SUPPORT
secondary surfaces/content families that organize hierarchy without competing

ACCENT / EXCEPTION
small or selective high-information/high-action moments that can carry stronger contrast/chroma
```

These are perceptual composition roles, not necessarily Design-System token names.

### Allocation method

1. Identify the scene's dominant visual field(s): canvas/shell/work surface/content imagery.
2. Decide which relationships should feel continuous versus separated.
3. Reserve the strongest hue/chroma/lightness contrast for a small number of priority actions, exceptions, selections, or focal content.
4. Apply candidate colors at **real area and repetition**, not as equal-sized swatches.
5. Rebalance when a repeated status, chart, navigation item, or large brand surface consumes more attention than its task priority deserves.

A 4% accent chip and a 40% accent panel are not the same decision even when the token is identical.

## Compose surfaces before decorating components

Name the surface/plane roles first:

```text
canvas / environment
shell / chrome
primary work surface
alternate / grouped surface
raised / transient surface
scrim + modal relation
```

Then compose foreground, action, state, and status colors **on their actual surface**.

Do not create a new gray for every nested box. If two planes collapse perceptually, test in order:

1. surface-role mapping;
2. lightness/temperature relation;
3. boundary/divider/clipping relation;
4. shadow/depth cue if the plane truly floats;
5. only then a new authorized color role when existing roles cannot express the relation.

## Semantic color graph

```text
[Meaning] --EXPRESSED_BY--> [Semantic color role]
[Role]    --STYLED_BY-----> [Token/style]
[Token]   --RESOLVES_IN---> [Theme/mode]
[Role]    --APPEARS_IN----> [Representative consumers]
```

Typical meanings include primary action, selection, focus, destructive action, success/warning/error/info, primary/secondary content, divider/border, and surface hierarchy.

Use the same or related color consistently when the meaning is the same. Do not let a brand accent mean "interactive" in one place and decorate noninteractive text elsewhere without a clear system distinction.

## State and status color

Color should reinforce state, not carry the entire state contract.

Pair color with at least one other relevant cue when meaning must survive color-vision differences or low-contrast environments: shape, icon, text label, border/focus indicator, position, pattern, or motion.

For repeated healthy/normal states, prefer quiet treatment so exceptions preserve salience. Use strong status chroma when it communicates consequence, not because every state needs a colored pill.

## Accessibility and adjacent-color evidence

Treat accessibility as a hard constraint/evidence layer, not an aesthetic scoring system.

Check:
- text/icon foreground against actual background;
- focus/control boundaries against **adjacent** colors when that boundary conveys operability/state;
- status/category meaning with non-color redundancy where required;
- light/dark/increased-contrast modes when supported;
- real device/environment conditions when relevant.

A contrast pass does not prove hierarchy, harmony, surface separation, or color mass. A beautiful composition does not excuse inaccessible contrast or color-only meaning.

## Perceptual tonal candidates

When a source/brand color needs multiple lightness levels, vary perceptual lightness while attempting to preserve hue/chroma, then reduce chroma as needed to stay in gamut. Treat outputs as **candidates**, not theme decisions.

Candidates can support roles such as action/accent, selection/container, surface families, foreground hierarchy, border/divider, status, and focus/interaction states. Re-evaluate each candidate in the actual composition.

## Alpha compositing is backdrop-dependent

`brand @ 40%` is not a fixed lighter brand color. Its visible result depends on the backdrop. Evaluate translucent roles on every material background they can occupy.

Use translucency when retained context/material relation is valuable; use opaque tonal roles when stable appearance and predictable contrast matter more.

## Light / dark / contrast modes

Preserve semantic roles while recomposing values and distribution for the mode. Re-evaluate:

- surface ladder and dominant field;
- foreground hierarchy;
- accent chroma/area;
- border/divider visibility;
- state/status distinction;
- imagery/chart interaction;
- control/overlay adjacency.

Dark mode is not `invert`; increased-contrast mode is not `make everything white/black`.

## Direct-perception proof method

Color craft improves through controlled comparison, not only rules.

When a color decision is material:

1. render the candidate in its real surface/component context;
2. compare at least one nearby alternative that changes **one major variable** (e.g. neutral temperature, accent chroma, surface lightness, or occupied area);
3. inspect whole-scene hierarchy and the local relation;
4. check semantic/accessibility obligations;
5. keep the version whose relation is clearer and more coherent, then stress another representative screen/theme/state.

Useful contrastive exercises:

- keep accent identical; swap warm-neutral versus cool-neutral backdrop;
- keep hue family; change chroma distribution between dominant and accent roles;
- keep palette; change occupied area/repetition;
- keep surface tokens; compare stronger lightness separation versus added shadow;
- compare analogous support family against one complementary exception used sparingly.

The point is to learn the interaction, not to crown one harmony rule as universally best.

## Deterministic helper

Use `scripts/color_math.py` only when exact color math reduces guesswork:

```bash
python scripts/color_math.py tones --hex '#6750A4'
python scripts/color_math.py composite --fg '#6750A4' --alpha 0.4 --bg '#FFFFFF'
python scripts/color_math.py contrast --a '#111111' --b '#FFFFFF'
python scripts/color_math.py inspect --hex '#6750A4'
```

The helper can generate in-gamut OKLCH-based tonal candidates, inspect coordinates, composite preview colors, and calculate WCAG 2.x sRGB contrast. It does **not** choose semantic roles, harmony, temperature balance, distribution, or aesthetic direction.

## Worked contrasts

### Same blue, different neutral field
A blue action token is identical on two screens. Screen A uses a warm, slightly beige neutral canvas; Screen B uses a cool blue-gray surface. On B, the accent feels less separated and the whole screen appears more uniformly cool.

**Bad:** create `blueForScreenB` because the token "failed."

**Better:** keep semantic role fixed while testing the surrounding neutral temperature/lightness and occupied accent mass. If the screen requires a different authorized mode value, change it through the role/mode system; otherwise correct the composition around the shared role.

### Analogous family plus complementary exception
A violet brand uses nearby violet-blue support tones for quiet surfaces/illustration. A yellow-green complement is proposed for a rare high-priority event.

**Bad:** distribute violet, blue, and yellow-green evenly because the harmony is theoretically valid.

**Better:** let quiet neutrals/support hues dominate, use violet as a recognizable product accent, and reserve the complement for a bounded exception whose semantic importance earns the contrast. Check actual area, repetition, text/control adjacency, and non-color state cues.

## Failure patterns -> correction

- **Harmony rule becomes recipe:** return to hierarchy, context, area, and semantic purpose; use harmony only as a candidate relationship.
- **Contrast passes but scene is muddy:** inspect surface lightness, chroma distribution, adjacency, type hierarchy, and non-color separation.
- **Brand everywhere:** reduce occupied accent mass; restore quieter dominant/support fields.
- **Every status is saturated:** quiet normal/healthy repetition and preserve strong exception contrast.
- **New gray for every plane:** recompose surface ladder and boundary/depth cues before expanding token taxonomy.
- **Same color token "looks inconsistent":** inspect surrounding temperature/lightness/chroma/area before changing semantic mapping.
- **Dark mode is a numeric inversion:** recompose role values/distribution under the actual dark dominant field.
