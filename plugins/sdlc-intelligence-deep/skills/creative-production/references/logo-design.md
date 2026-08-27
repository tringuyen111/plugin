# Logo Direction Method

Use this reference only after the parent workflow has bound the logo job and a logo direction remains open. The CSV/search corpus owns the bundled style/color/industry taxonomy; this file owns **how to interpret that evidence into a defensible logo direction**.

## Decision method

1. Translate the brand brief into 3–6 decision criteria: recognition target, desired character, distinctiveness, application contexts, scale extremes, and any fixed brand constraints.
2. Use `scripts/logo/search.py` to retrieve candidate style/color/industry evidence instead of reconstructing the bundled taxonomy from prose.
3. Shortlist 2–4 materially different directions. Each must differ in a governing relation such as wordmark vs symbol strategy, geometric vs organic construction, expressive vs restrained form, or type/symbol relationship.
4. Explain the symbol/shape logic. A symbol is justified by brand meaning, recognition, or application utility—not because a style row suggested a fashionable motif.
5. Treat color associations as advisory and culturally/contextually variable. Choose color by brand/source truth, contrast, reproduction, target context, and required monochrome behavior before generic psychology claims. When a multi-color system is needed, choose the palette relation (for example monochromatic, complementary, analogous, or triadic) because it supports the intended contrast/harmony—not because the name itself is a rule.
6. Set typography direction by role (voice, geometry, contrast with symbol, legibility), not by a named-font recommendation unless the project already authorizes that font.
7. Falsify the direction at the smallest realistic size, monochrome/reversed use, simple one-color reproduction, and representative horizontal/stacked/icon-only variants.

## Distinct caveats

- Fine detail that disappears at small size is a direction failure, not an export problem.
- A color-dependent mark must still retain recognition in monochrome.
- Do not treat common industry symbols as differentiation by themselves.
- Accessibility/contrast requirements apply to the use context; the logo mark itself should not rely on color alone to encode meaning.
- Current brand/legal/trademark constraints outrank the bundled corpus.

## Search mechanics

```bash
python3 "<skill-dir>/scripts/logo/search.py" "tech startup modern" --all
python3 "<skill-dir>/scripts/logo/search.py" "minimalist clean" --domain style
python3 "<skill-dir>/scripts/logo/search.py" "tech professional" --domain color
python3 "<skill-dir>/scripts/logo/search.py" "healthcare medical" --domain industry
```

Return to the parent workflow with: candidate directions, symbol/shape rationale, color/type rationale, and mono/small-scale constraints. Do not return a catalog dump.
