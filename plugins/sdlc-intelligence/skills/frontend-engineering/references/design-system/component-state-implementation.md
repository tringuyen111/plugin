# Component State and Variant Implementation

Use this module when Product/Design truth already defines the relevant component roles/states/variants and the frontend question is **how browser/component code should realize them**.

## Boundary

Frontend Engineering owns DOM/component/state/accessibility implementation, not the visual design of a state. Do not invent focus-ring color/width, hover/active colors, opacity, component dimensions, animation duration/easing, variant hierarchy, or state priority as project truth. If approved visual semantics are missing, preserve a safe existing/native behavior where possible and return the design gap.

## State implementation matrix

| Concern | Frontend implementation decision | Must come from approved truth when visual |
|---|---|---|
| interaction state | selector/component-state source such as hover, focus-visible, active, selected, expanded | visual treatment and hierarchy |
| disabled/read-only | native attribute/semantic state, event suppression, form behavior | visual treatment beyond established system |
| pending/loading | async ownership, `aria-busy`/announcement when material, interaction gating | spinner/skeleton placement, opacity, motion/style |
| validation/error | `aria-invalid`, described-by/error association, error lifecycle | error color/iconography/layout treatment |
| selection/toggle | semantic pressed/selected/checked/expanded state and controlled/uncontrolled ownership | selected-state styling |
| variants | explicit prop/state axes and canonical component mapping | which variants exist and their visual meaning |

## Method

1. **Bind approved states and component contract.** Inspect the actual component, callers, canonical variant API, semantic HTML/ARIA behavior, state owner/lifetime, and approved visual roles. Do not infer a new variant because a local screen needs a visual exception.
2. **Separate behavioral semantics from visual semantics.** Browser/platform rules may require a disabled control not to submit or a field error to be programmatically associated; those are implementation constraints. Their color, spacing, ring, icon, animation, or hierarchy remains approved system truth.
3. **Make state combinations explicit when they can conflict.** If disabled + loading + selected or error + focus can coexist, define behavioral precedence from actual interaction semantics and approved component contract. If the visual precedence is unspecified and affects output, return that gap instead of inventing a universal priority list.
4. **Keep variant axes bounded.** Prefer the existing component API and semantic roles. When variants multiply combinatorially, separate independent behavior/state from visual variant dimensions or surface a component-contract/design decision; do not encode page-specific exceptions as new global variants.
5. **Use tokens only as approved mappings.** Component tokens may be useful when the project already uses them or repeated component-specific semantic mapping is approved. Do not create component tokens merely because bundled examples demonstrate the pattern.
6. **Preserve accessible native behavior.** Prefer `:focus-visible`/native semantics where appropriate, real disabled attributes for native controls when semantics match, and programmatic state/error relationships. Do not remove a browser-accessible behavior while waiting for visual specification; avoid styling invention beyond current approved/native behavior.
7. **Prove real states.** Exercise the component through keyboard/pointer, state transitions, async/error paths, and representative consumers that can falsify the implementation claim.

## Return contract

Return only:

- affected component/state/variant contract and authority;
- implementation mapping for DOM/component state and accessibility semantics;
- existing token/role mappings consumed, without new visual values;
- unresolved Product/Design/component-system decision if one blocks implementation;
- representative state/browser proof target and limitations.
