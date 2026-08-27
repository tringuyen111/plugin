# Test Strategy Format

```markdown
# Test Strategy — <scope/version>

## Sources and fixed point
- Strategy revision:
- Plan freshness: CURRENT | STALE | CONFLICTING | UNVERIFIED
- Evidence cutoff:
- Source conflict / missing-binding note:

### Source bindings
| Source | Source revision / digest | Planning role |
|---|---|---|

### Existing Test Condition bindings
| Test Condition | Condition revision | Bounded proof authority | Coverage freshness |
|---|---|---|---|

Planned proof targets do not require a Test Condition to pre-exist. Bind the exact
condition revision when an existing condition is consumed.

## Quality objectives and acceptance claims

## Risk model
| Risk | Source binding | Consequence | Exposure | Detectability | Priority | Coverage freshness |
|---|---|---|---|---|---|---|

## Coverage map
| Claim / risk | Boundary | Condition / proof target + revision | Probe / technique | Substituted boundary / limitation | Complementary evidence needed | Environment | Data | Evidence | Coverage freshness | Priority |
|---|---|---|---|---|---|---|---|---|---|---|

## Regression scope

## Visual, accessibility, performance, security, migration, and recovery scope

## Environment / data planning requirements
- Required environment capabilities / states:
- Required data classes / invariants:
- Isolation / cleanup / idempotency:
- Known planning limitations:
- Execution binding: NONE_UNTIL_EXECUTION

Planning requirements do not prove live environment availability or data
representativeness. Exact candidate/environment/data/configuration execution
binding belongs to the actual QA verification execution fixed point.

## Tooling, observability, cleanup, and idempotency

## Must-run conditions

## Deferred or excluded coverage and rationale

## Stop criteria and acceptance handoff
| Criterion | Source / authority | Effect when unmet | Risk owner / handoff |
|---|---|---|---|
```
