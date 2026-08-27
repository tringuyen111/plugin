# Option Horizon

Use this module only when an **evidence-backed adjacent future can change current Product intent**. Future possibility is not automatic current scope.

Classify the future relation:

- `BUILD_NOW` — required for the current commitment.
- `PRESERVE_OPTION` — evidence/strategy makes an adjacent direction materially plausible and preserving the Product option is cheap enough to matter now; record the future relation/constraint without scoping the future capability.
- `DEFER_SPECULATIVE` — `we may need it someday` lacks enough evidence/strategic weight to affect current scope.

`PRESERVE_OPTION` is Product intent, not permission to mandate generic platforms, abstractions, extensibility frameworks, data models, or technical runway. Architecture/Engineering decide whether any implementation accommodation is warranted after receiving the actual Product constraint.

If preserving an option materially increases current cost/complexity, expose that trade-off; future flexibility is not free.

## Failure / correction

- speculative future becomes current scope -> downgrade to `DEFER_SPECULATIVE` unless commitment/evidence earns `BUILD_NOW`.
- `PRESERVE_OPTION` turns into technical architecture -> return only the Product relation/constraint and leave mechanics downstream.
- material preservation cost is hidden -> return the trade-off to scope/priority.

## Return contract

Return only:

```text
BUILD_NOW / PRESERVE_OPTION / DEFER_SPECULATIVE
evidence / strategy basis
current Product relation or constraint, if any
material cost / complexity trade-off affecting scope or priority
```
