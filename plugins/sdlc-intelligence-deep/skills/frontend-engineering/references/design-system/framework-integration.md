# Framework Token Integration

Use this module only when source/runtime evidence establishes the styling framework and an approved token contract must be adapted into that framework.

## Activation gate

| Evidence | Disposition |
|---|---|
| No framework/config/dependency evidence | Do not apply this module; use the repository's actual styling mechanism. |
| Tailwind is present but the affected path does not consume theme tokens | Do not create Tailwind token configuration merely for consistency. |
| Tailwind/theme configuration is the real consumer of approved tokens | Map the approved token identities into the existing config/CSS-variable seam. |
| shadcn/ui or another component kit is actually installed/used | Preserve its existing token/variable conventions only where they are the canonical project seam. |
| Framework or theme strategy itself is undecided | Return the architecture/system decision gap; do not choose it here. |

## Adapter method

1. **Prove the framework seam.** Inspect package/config/source imports and the actual consumed styling path. A mention in docs or a bundled example is not enough.
2. **Bind approved token input.** Use the project token source/roles from the parent workflow. Do not seed framework config from example colors, radii, spacing, motion, or dark-mode values.
3. **Map, do not redesign.** Adapt existing CSS variables/token identities to the framework extension points the repository already uses. Preserve naming/compatibility where consumers depend on it; avoid duplicating one semantic role under independent framework and CSS authorities.
4. **Respect theme ownership.** Dark mode, system preference, class/data selectors, providers, or multiple brands are project/runtime contracts. Wire the existing strategy rather than selecting one from a reference example.
5. **Keep component-kit conventions conditional.** If a library such as shadcn/ui is genuinely present, integrate through its current CSS-variable/component conventions. Do not install it, align the whole project to it, or treat its defaults as Design truth unless separately approved.
6. **Generate only when useful.** `scripts/design-tokens/generate-tokens.cjs --format tailwind` may emit a deterministic mapping from approved token JSON when Tailwind is proven and generated config is actually consumed. Generated output is an adapter artifact, not evidence that visual semantics are correct.
7. **Prove the actual adapter.** Verify the real framework build/runtime and representative token consumers/themes; do not stop at a generated config file.

## Return contract

Return only:

- evidence establishing the actual framework/config consumer;
- approved token source mapped to existing framework extension points;
- compatibility/generated-artifact decisions and affected consumers;
- any unresolved framework/design-system decision outside Frontend authority;
- build/browser proof target and limitations.
