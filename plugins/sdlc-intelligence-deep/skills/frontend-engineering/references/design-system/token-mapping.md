# Token Mapping and Migration

Use this module only when the project already has approved token/design-system truth and the frontend decision is **how to map that truth into code**.

## Boundary

This module does not choose palette, spacing scale, typography, radius, shadow, motion, state styling, theme semantics, or whether a three-layer token architecture should exist. Those are project/Product/Design/system decisions. If the source does not establish them, return the missing decision instead of manufacturing a token system from these examples.

## Decision packet

| Element | Implementation question |
|---|---|
| CUE | Which approved token source/revision and affected frontend consumers are in scope? |
| MECHANISM | How do source token identity, aliases, theme overrides, component mappings, and the repository styling pipeline connect? |
| SELECTION | Reuse the project's existing token shape when coherent; introduce a mapping/compatibility seam only when current consumers require it. |
| FAILURE | A value/role is invented, aliases become duplicate truth, theme behavior changes unintentionally, or migration leaves mixed authorities. |
| CORRECTION | Re-bind approved source truth and reopen only the affected mapping/migration decisions. |
| CONSEQUENCE | Return a bounded mapping/migration plan plus the proof surface that exercises the real consumer. |

## Mapping method

1. **Bind the authoritative input.** Locate the project token source, revision, format, current consumers, generated artifacts, and theme/runtime mechanism. Distinguish canonical input from generated CSS/config and copied feature-local values.
2. **Preserve the project's semantic shape.** A project may use flat tokens, primitive/semantic/component layers, another alias model, or framework-native variables. Do not impose a bundled layering scheme. If the source has aliases, preserve their semantic dependency instead of resolving them into duplicated literals unless the target format requires resolution.
3. **Map identity before syntax.** For each affected usage, identify the approved role and its canonical token identity before choosing CSS custom property, generated stylesheet, typed object, framework theme key, or component prop. Equal literal values do not prove equal semantic roles.
4. **Treat themes as projections.** Implement dark/high-contrast/brand/theme overrides only when the project contract establishes those modes and their authority. Preserve the existing selector/provider/media-query mechanism rather than selecting a new theme strategy here.
5. **Migrate by consumer graph.** Inventory real consumers, choose compatibility/rename/removal order, update canonical call sites, then remove superseded aliases/local literals only after parity. Do not globally replace equal values without semantic evidence.
6. **Prove the consumed result.** Verify representative components/states/themes through the actual frontend seam; generated files or a successful transform prove only generation, not visual correctness.

## Deterministic transform

When an **already-approved** token JSON contract must be emitted as CSS variables, `scripts/design-tokens/generate-tokens.cjs` is an optional deterministic transform:

```text
node scripts/design-tokens/generate-tokens.cjs --config <approved-token-json> --output <generated-css>
```

Use `--format tailwind` only when repository evidence establishes Tailwind and the framework adapter is material. The helper does not choose token values, validate Product/Design conformance, or decide that a particular token architecture is correct.

The generator accepts generic DTCG-style token nodes and the legacy layered input shape used by this Skill's tests. Treat those as input mechanics, not a project schema mandate.

## Return contract

Return only:

- authoritative token input + revision/path;
- chosen mapping/alias/theme projection for the affected seam;
- consumers and migration/removal boundary;
- any missing Product/Design/system decision that blocks mapping;
- claim-relevant proof target and limitations.
