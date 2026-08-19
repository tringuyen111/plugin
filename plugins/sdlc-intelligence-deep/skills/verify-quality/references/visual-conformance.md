# Visual Conformance

Use this reference only when the parent QA scope contains rendered/perceivable Product Design obligations. Visual conformance is a **probe family inside `verify-quality`**, not a second QA lifecycle or independent acceptance authority.

## 1. Derive visual proof rows from approved truth

Build only the state/viewport/locale/content-stress rows required by the current Product/Design/Visual contract, AC/NFRs, breakpoints, real content boundaries, text scaling/localization, and release risk. Do not reduce scope to screenshots that happen to exist.

For each material visible characteristic bind the comparison semantics authorized by current truth:

- `EXACT` — the named characteristic must match at the declared scope;
- `SEMANTIC` — geometry/rasterization may vary, but the named hierarchy, grouping, action availability, component/state meaning, content relation, or responsive transformation must remain equivalent;
- `APPROXIMATE` — bounded variation is allowed only under an approved comparison/materiality basis.

If the acceptance basis cannot distinguish acceptable variation, keep the row `INCONCLUSIVE`; do not invent pixel, percentage, color-distance, or perceptual tolerances.

Represent each visual row in the parent proof ledger:

```text
approved visual obligation
-> state / viewport / content constraint
-> EXACT | SEMANTIC | APPROXIMATE basis
-> visible falsifier
-> screenshot/render/measurement probe
-> evidence validity
-> PASS | FAIL | INCONCLUSIVE | NOT_RUN | NOT_APPLICABLE
```

## 2. Acquire evidence without confusing capture with judgment

Reuse existing evidence only when candidate/reference/environment/state/viewport identity, provenance, and integrity are sufficient. Use `visual-capture` only for missing, stale, invalid, or newly required evidence. A successful capture command proves capture mechanics, not conformance.

Open and inspect the actual images/artifacts. Evaluate only properties the evidence can establish: hierarchy, grouping, reading order, layout, spacing, typography, density, alignment, truncation/overflow, component/state presentation, responsive transformation, loading/empty/error/permission/disabled/submitting states, visible focus cues, text-scaling/reflow effects, non-color visible state communication, and measured contrast only when actually measured under the acceptance basis.

A screenshot does **not** prove keyboard behavior, focus order, semantic labels, interaction correctness, animation timing, backend state, or unmeasured contrast. Keep those as separate parent QA proof rows.

## 3. Separate candidate delta from evidence/environment variance

Before classifying a visual mismatch as candidate failure, check whether missing fonts/assets, stale build, wrong state/locale/viewport, incomplete transition, capture warnings, or executor variance can explain the delta. When evidence cannot discriminate candidate behavior from capture/environment failure, classify the affected row `INCONCLUSIVE` and repair/reacquire evidence first.

Content-driven wrapping, rasterization, antialiasing, and geometry changes explicitly permitted by semantic responsive transformation are not automatically failures or passes; judge them against the named material characteristic.

## 4. Preserve Design authority

An accepted visual difference requires a named authorized Product/Design decision bound to the exact current reference and affected state/viewport scope. QA cannot self-waive a mismatch. A materially changed Design/reference revision invalidates affected prior accepted-difference authority.

If evidence suggests the approved Design itself should change, report conformance against the **current** approved truth and hand the Design-contract concern to the Design/Product owner. Do not rewrite the acceptance basis inside QA.

A clean `design-review` result is review context only; it is never inherited QA PASS.

## 5. Compose into the parent verdict

Do not derive a separate Visual QA workflow state, overall visual acceptance readiness, or competing QA verdict. Each required visual row stays in the parent proof ledger and participates in the same parent verdict precedence as functional/data/browser/accessibility/performance rows.

A direct user request such as “run visual QA” is a bounded `verify-quality` run whose declared QA scope is visual conformance. Report what that scope proves and explicitly name non-visual behavior not proven by the request.
