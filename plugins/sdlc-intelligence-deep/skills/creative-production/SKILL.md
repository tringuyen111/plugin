---
name: creative-production
description: Create, revise, or art-direct bounded creative collateral such as logos, corporate identity, icons, campaign key visuals/posters, banners, social/marketing visuals, and slide visual direction using bundled local art-direction evidence and host-native generation only when available. Use for creative assets outside product-UI Design ownership; do not take over product UX/UI design, fixed Product/UI review, frontend implementation, technical architecture, or QA acceptance.
---

# Creative Production

Own creative collateral where the terminal deliverable is a **logo, corporate identity/CIP direction, non-product-UI icon/iconography, campaign key visual/poster, banner/social/marketing visual, or slide visual direction**. The host Agent owns the live user job; this Skill supplies the visual-production workflow and bounded expert depth.

Do not own product journey/state behavior, Product UI icon/system semantics, product Visual Contract approval, frontend/presentation implementation, technical architecture, QA acceptance, or external AI provider integration. A slide-file build must use the host presentation capability when available; this Skill returns slide visual direction, not CSS/classes or a duplicate presentation engine.

Bundled data/search is an **advisory snapshot**, not project/platform authority. See `data/source-manifest.json`. Current user/project/brand truth wins; volatile platform dimensions, safe zones, policies, and technical constraints require current authoritative verification when material.

## Job contract

| Contract | Meaning |
|---|---|
| Trigger | A bounded creative collateral/direction request outside Product UI ownership |
| Inputs | purpose, audience, message, brand/source truth, target context, format/dimensions, generation intent |
| Terminal result | a selected/verified visual direction, plus a generated artifact only when explicitly requested and actually produced by an authorized host-native capability |
| Authority | user/project/brand truth controls intent and irreversible choices; bundled corpus is advisory |
| Proof | compare the returned direction/artifact against frozen criteria in its target context |

## Control model

```text
BIND
  purpose / audience / message / brand / target / format / generation intent
        |
        v
FRAME
  hard constraints + success criteria + current Frontier
        |
        +---- branch need material? ----> LOAD DEPTH
        |                                  WHEN / WHY / TARGET / RETURN
        |                                           |
        |<------------------------------------------+
        v
DIVERGE
  only if governing direction is still open
        |
        v
SELECT
  same-criteria trade-off comparison
        |
        v
STRESS
  target-context falsification
   | fail framing/evidence -> FRAME / LOAD DEPTH
   | fail chosen direction -> SELECT / REFINE
   v
REFINE
        |
        +---- final asset requested? ----> GENERATE -> INSPECT
        |                                      | unavailable -> BLOCKED/UNAVAILABLE
        v                                      v
       CLOSE <---------------------------------+
```

A direction is materially different only when a governing visual decision changes: focal strategy, composition, information density, type/image relationship, narrative/layout logic, or brand expression. Color-only or ornament-only variants do not count.

## Entry gate

Bind the artifact branch, purpose, audience, message priority, brand/source constraints, target context, required dimensions/format, and whether the user wants direction only or an actual generated asset. Missing reversible details may remain explicit assumptions; a missing irreversible brand/format decision keeps the result `PARTIAL` or `BLOCKED`.

Use these ownership boundaries before selecting a branch:

- application screen/dashboard or Product UI icon/system role -> stop at this ownership boundary and return the unresolved Product Design concern;
- fixed Product/UI critique -> stop at this ownership boundary and return the bounded critique need;
- formal visual acceptance -> stop at this ownership boundary and return the visual-conformance evidence need;
- executable interaction learning -> stop at this ownership boundary and return the interaction-learning question;
- production frontend/presentation implementation -> return the bounded implementation need; host-native discovery owns any subsequent capability selection;
- standalone creative artwork used near a product/web surface may remain here only when the requested job is the artwork itself rather than page/component/system composition.

## Branch activation

Load only the active branch depth. `RETURN` is the integration contract: bring that result back into `FRAME`, `SELECT`, or `STRESS`; do not summarize the whole resource.

| Branch | WHEN | WHY | TARGET | RETURN |
|---|---|---|---|---|
| Logo | logo type/style/color/symbol direction remains open | choose a scalable, distinctive mark direction without inventing taxonomy from memory | `scripts/logo/search.py` for lookup; `references/logo-design.md` for HOW/caveats | 2–4 viable directions, symbol/shape rationale, color/type rationale, mono/small-scale constraints |
| CIP | identity system, application set, style/material, or mockup context remains open | make the identity coherent across the actually required touchpoints | `scripts/cip/search.py` for lookup; `references/cip-design.md` for HOW/caveats | identity-system direction, required deliverables/contexts, material/finish rationale, consistency constraints |
| Icon / iconography | a standalone/brand/campaign icon family needs a visual language | keep a coherent family without taking Product UI semantic/system ownership | `data/icon/styles.csv` for style lookup; `references/icon-design.md` for HOW/caveats | chosen family direction + stroke/fill/corner/optical-weight/scale invariants |
| Banner / social | target placement, crop, hierarchy, or reusable campaign treatment is material | design for the real viewing/crop context and verify volatile platform constraints when needed | `references/banner-sizes-and-styles.md`; `references/social-visuals.md` | art direction + verified canvas/safe-zone constraints when material + crop/hierarchy stress targets |
| Slides | narrative strategy, layout/content zones, copy structure, chart choice, or visual rhythm remains open | return presentation **visual direction** while keeping build mechanics with the host presentation capability | `scripts/slides/search-slides.py` for advisory lookup; `references/slide-direction.md` for HOW/caveats | narrative/layout/content recommendation, chart/copy rationale, accessibility/target-context constraints; never CSS/classes/animation implementation |
| Campaign / general collateral | no branch-specific corpus fits or the problem is a one-off key visual/poster/collateral | use the resident creative model rather than forcing a fake corpus match | no mandatory reference; use broader advisory style/color/type evidence only when it can change the decision; host-native discovery owns any capability selection | explicit criteria + materially different direction hypotheses + selected direction/rationale |

Resolve `<skill-dir>` to the directory containing this `SKILL.md`; never assume the host process current working directory.

Example deterministic lookups:

```bash
python3 "<skill-dir>/scripts/logo/search.py" "tech startup modern" --all
python3 "<skill-dir>/scripts/cip/search.py" "tech startup" --all
python3 "<skill-dir>/scripts/slides/search-slides.py" "metrics dashboard" -d layout
```

## Direction decision

1. **Criteria first.** Convert purpose, audience, message priority, brand/source truth, target context, dimensions/format, readability/accessibility needs, and production constraints into a short criteria set. Separate hard constraints from preferences.
2. **Research only active uncertainty.** Use the branch contract above. If a resource cannot change a decision/state/evidence obligation, skip it.
3. **Diverge only when needed.** Produce materially different hypotheses only while the governing direction is genuinely open.
4. **Compare on one criteria frame.** For each viable direction, state what it optimizes, sacrifices, and risks. Prefer evidence/criteria fit over fashion.
5. **Stress-test in target context.** Falsify with the dimensions that can invalidate the direction: crop/safe zone, smallest realistic viewing size, long/short/localized copy, focal hierarchy, CTA/content competition, contrast/readability, brand distinctiveness, and relevant production/export constraints.
6. **Refine the causal weakness.** Change the composition, hierarchy, density, type/image balance, asset choice, narrative/layout logic, or message structure responsible for the failure; do not substitute random polish.

## Generation gate

If a final visual is requested:

- use one exact authorized host-native image/presentation capability when already known;
- when materially different host/provider options make provider/source selection a real decision, `provider-source-selection` may supply that bounded selection result;
- never add an API key, SDK, remote provider, or external-generation fallback;
- if generation is unavailable, return `BLOCKED`/`UNAVAILABLE`; prompt text is not a generated asset;
- after generation, inspect the actual artifact at target dimensions/context and compare it with the frozen criteria before claiming success.

## Re-entry

| Failure / new truth | Re-enter | Preserve |
|---|---|---|
| purpose/audience/brand/format premise changes | `BIND` / `FRAME` | only decisions independent of the changed premise |
| branch lookup/depth changes a governing assumption | `FRAME` | unrelated established constraints/evidence |
| chosen direction fails same-criteria comparison | `SELECT` | criteria and unaffected evidence |
| target-context stress test exposes causal weakness | `REFINE` or `SELECT` | independent direction decisions that still hold |
| platform/project truth invalidates a bundled recommendation | current verification -> `FRAME` | bundled evidence only as advisory history |
| generated artifact violates frozen direction | `GENERATE` or `REFINE` | approved direction unless the artifact exposes a direction flaw |

## Completion

`READY` means the requested direction satisfies the frozen criteria against current applicable truth and any requested generated artifact was actually produced and inspected through an authorized host capability. `PARTIAL` means the direction is useful but a material brand/format/approval/current-constraint/generation dependency remains. `BLOCKED` or `UNAVAILABLE` is required when a load-bearing dependency cannot be resolved. Never claim completion from research, lookup output, or prompt text alone.
