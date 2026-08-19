# Browser Test Planning

Load this reference only when browser-visible interaction is a material proof boundary. These are runtime-agnostic browser testing principles informed by Playwright practice; use the project's authorized browser stack/tooling rather than requiring Playwright.

## 1. Prefer the user's observable contract

Plan browser assertions around what a user or assistive technology can observe/interact with: roles, accessible names, text/content, focus, URL/navigation, visible state, submitted result and meaningful browser/network outcome.

Avoid CSS classes, DOM ancestry, framework component state or generated implementation identifiers as the primary oracle unless the approved contract explicitly exposes them. Implementation-coupled selectors make maintenance noise look like product failure.

## 2. Synchronize on conditions, not sleeps

Asynchronous browser behavior needs a condition-driven oracle. Prefer runtime capabilities that wait/retry for the expected user-visible state and enforce actionability before interaction. A fixed sleep is evidence only that time passed; it neither proves readiness nor makes a flake deterministic.

Plan bounded timeouts and useful failure diagnostics. Increasing a sleep should not be the default response to race/flakiness.

## 3. Isolate browser state

Each independent condition should control the state it depends on: cookies/session/local storage, user/account/data fixtures, feature/config state and navigation starting point. Reuse expensive authentication/setup only when the shared artifact is intentionally immutable or safely cloned.

A suite that passes only in one execution order is not trustworthy regression evidence.

## 4. Control irrelevant external dependencies

Do not make acceptance of code you control depend on uncontrolled third-party pages/widgets/services when those systems are not part of the claim. Substitute them at a stable network/adapter boundary and record what is no longer proven.

When the external integration itself is the requirement, preserve at least one representative integration probe under the appropriate environment/provider controls rather than mocking the entire claim away.

## 5. Semantic locators and interaction

Prefer user-facing locator semantics that survive implementation refactors and match accessibility structure. Scope/filter locators when several valid elements share a role/name; do not make the selector unique through brittle DOM position if a meaningful scope exists.

For dialogs/menus/forms/navigation, plan the interaction states that falsify the approved contract: keyboard entry, focus movement/return, disabled/pending state, validation feedback, loading/error transitions and responsive mode when material.

## 6. Browser evidence is multi-channel when the claim is

A screenshot can prove pixels, not focus, keyboard, hydration, request semantics or dynamic state transitions. When the claim spans them, combine only the necessary channels: DOM/accessibility interaction, console/hydration errors, network request/response, URL/navigation, screenshot/visual diff and backend-visible postcondition.

## 7. Debugging artifacts are not verdicts

Trace viewer, screenshots, videos, logs and generated locators are diagnostic evidence. They help explain a failure but do not automatically satisfy the acceptance oracle. Bind the final condition result to the actual user-visible or machine-consumed claim.

## Provenance

This reference is paraphrased/derived from Microsoft Playwright Best Practices `nodejs/docs/best-practices.mdx`, content blob `253dad0ea13200c1053fc9ecb220c3bd900cf0d5` (CC BY 4.0), captured in the frozen Depth Program source pack. It does not require Playwright when another browser runtime is canonical.
