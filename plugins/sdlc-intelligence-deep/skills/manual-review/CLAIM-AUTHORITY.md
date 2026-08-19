# Claim Authority for Documentation Review

Use this when a reviewed claim has conflicting sources, mixed observational/normative evidence, or unclear authority. The reviewer decides whether the **documentation proposition is supportable**; it does not decide the underlying Product/Requirements/Policy truth.

## Decision mechanism

First classify the proposition, because source authority depends on what the guide is claiming.

| Claim type | Evidence that can support it | Common false substitution |
|---|---|---|
| visible label/state/result | current runtime/UI or exact fixed-point behavior evidence | stale screenshot, memory, unrelated QA summary |
| permission/business rule/policy | current authorized Product/Requirements/policy source | UI visibility or observed access alone |
| failure/recovery behavior | observed failure at the fixed point, relevant QA/known-defect/operational evidence | generic troubleshooting convention |
| preview/release status | exact environment/build/release authority | behavior seen in another environment/version |
| visual instruction | inspected current image tied to state/build/viewport | uninspected or stale image |

Then resolve the support relation:

```text
claim proposition
  -> classify claim type
  -> bind exact fixed point
  -> identify source role: normative | observational | diagnostic | visual
  -> reject stale/irrelevant sources
  -> compare authorities for this proposition
  -> SUPPORTED | CONFLICT | MISSING
```

### Selection rules

- **Normative vs observational:** observation can prove what the product currently shows/does; it cannot by itself grant permission or policy authority. For a permission claim, the authorized policy/Requirements source controls the documented authorization while the contradictory UI becomes a source/behavior conflict finding.
- **Complementary sources:** combine them only when each proves a different necessary part of the same reader claim. Record the boundary instead of pretending one source proves everything.
- **Equivalent current authorities conflict:** return `CONFLICT`/`UNRESOLVED` to the correct owner. Do not pick whichever source is easier to access.
- **Stale vs current:** a stale source does not override a current authoritative fixed point. Preserve it only as history if history is material.
- **Missing authority:** narrow/omit the unsupported claim or block it; do not replace missing authority with reviewer judgment.

## Consequence for review

- A material claim that contradicts its controlling authority is `BLOCKING`.
- A missing material authority that prevents a supported verdict yields process `PARTIAL/BLOCKED` + verdict `UNRESOLVED`.
- A stale visual can be a visual-currency finding without invalidating independently supported text.
- The correction lever targets the documentation claim/source link or returns the underlying conflict to the canonical owner; it never silently rewrites Product truth.

## Contrastive examples

### Permission: UI vs policy

Observed: Managers see an **Approve refund** button.
Policy: only Finance Controllers may approve refunds.

Correct review: the guide sentence “Managers may approve refunds” is unsupported and `BLOCKING`; policy controls the authorization claim, while the visible button is recorded as a product/source conflict for the correct owner.

Wrong review: approve the guide because the runtime visibly exposes the button.

### Current text vs stale screenshot

Current verified runtime supports the guide's textual steps. The screenshot is from the previous build and its labels differ.

Correct review: preserve the supported text claim, flag visual currency for the affected step/page, and re-review that bounded visual dependency after refresh.

Wrong review: mark the entire guide unsupported because one image is stale.
