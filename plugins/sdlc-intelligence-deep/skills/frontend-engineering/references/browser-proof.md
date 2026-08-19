# Browser Proof Discipline

Load this reference when the frontend claim depends on real browser interaction, focus/keyboard behavior, accessibility semantics, responsive layout, hydration, network/error state, or rendered output. The goal is the smallest browser probe that can falsify the actual claim.

## 1. Bind the proof to what the user can observe or do

Prefer evidence at the semantic surface the user or assistive technology consumes:

- role/name/label and visible content for interactive controls;
- keyboard/focus transition for keyboard claims;
- live region/status/error semantics for announced-state claims;
- URL/history for navigation claims;
- visible/loading/error state plus relevant request behavior for data-flow claims;
- computed/rendered layout under declared viewport/content stress for responsive claims.

DOM structure, implementation function names, CSS class names and component internals are weak selectors unless the implementation contract itself is the claim.

### SHOW — choose evidence by what can falsify the claim

| Claim | Smallest representative falsifying probe | Nearby evidence that is not enough |
|---|---|---|
| Modal keyboard/focus behavior is correct | Open through the real keyboard/user path; observe required initial focus, Tab/Shift+Tab containment, approved close/Escape behavior, and logical focus return. | Screenshot, dialog node presence, ARIA text alone, or scanner-only output. |
| A superseded async result cannot regress current UI | Force newer intent while older work is in flight, let the older completion arrive last, and assert current UI remains bound to the newer revision. | Successful request logs, promise resolution, or proof that an abort function was called. |
| Server/client hydration is correct | Observe the initial server output through client takeover and inspect material console/recoverable hydration errors on that path. | A screenshot taken only after hydration settles. |
| Responsive behavior survives the approved constraint | Exercise the declared viewport/container plus material content stress and verify the consumed controls/content remain usable without unintended clipping/overflow. | One nominal-width screenshot or CSS breakpoint presence. |
| Interaction responsiveness improved | Re-run the same representative interaction and inspect timing/trace evidence at the input, processing, and presentation seam that was diagnosed. | Smaller bundle size, lower rerender count, or an unrelated micro-benchmark. |

The probe may use Playwright or another real-browser mechanism available to the project. The matrix selects the evidence semantics, not a mandatory test framework.

## 2. Isolate mutable browser state

A representative probe should not accidentally depend on another test/session. Control the material state: cookies/session/local storage, test data, feature/config flags, clock/randomness and network substitutions. When shared authenticated setup is reused, prove that each case still receives the intended isolated business state.

Do not call a live third-party system merely to prove behavior your application does not own. Stub or contract-test that boundary when substitution preserves the claim, and state what the stub cannot prove.

## 3. Use resilient interaction and retry-aware assertions

Prefer user-facing locators or explicit stable test contracts over CSS/XPath tied to layout implementation. A locator should identify the intended semantic target uniquely; chaining/filtering may narrow within a meaningful container.

Use the browser/test runtime's actionability and retry-aware assertions for conditions that become true asynchronously. A fixed sleep hides scheduling uncertainty and either wastes time or flakes. Poll/wait on the actual state transition or system signal instead.

A manual immediate `isVisible`-style check after an asynchronous action can miss the real transition. Prefer an assertion mechanism that waits for the declared condition within an explicit bounded timeout and reports the observed failure.

## 4. Approved semantic-pattern obligations versus project choice

Do not confuse a missing AC bullet with permission to omit semantics required by an already-approved interaction pattern or platform primitive. First establish whether project truth selected that pattern; then separate its technical semantics from the remaining Product/Design choice.

| Observed truth | Frontend action |
|---|---|
| Choosing the semantic pattern would itself change approved UX or behavior | Return the missing Product/Design truth; do not invent the pattern. |
| The semantic pattern/platform primitive is already approved and carries defined interaction/accessibility semantics | Implement and browser-prove those semantics as frontend correctness. |
| Several semantically valid choices remain and the choice changes workflow or visual behavior | Use approved truth or return only that unresolved choice. |
| An existing browser/framework/component primitive already owns the semantics | Reuse and verify that mechanism before layering custom focus/inert/keyboard machinery. |

### SHOW — approved modal, incomplete AC wording

Suppose approved project truth already establishes a **modal dialog**, while an AC only says it opens and closes from the trigger. Do not infer that focus containment, background non-interaction/inertness, keyboard-close behavior required by the selected modal pattern, or logical focus restoration are optional merely because the AC did not enumerate them. Those are implementation semantics of the established role. The exact initial-focus target can still depend on content, task risk, and workflow; when several conforming choices would materially change the user flow, return that remaining choice instead of discarding the modal semantics.

For native/platform mechanisms such as a modal `dialog`, inspect what the browser already owns before reproducing it with custom traps or `aria-*` state. ARIA metadata does not compensate for behavior that is not actually modal.

## 5. Focus, keyboard and modal/dialog proof

When the approved contract includes keyboard accessibility, exercise the path rather than inspecting ARIA text statically. Material checks may include:

- keyboard trigger reaches the control;
- opening moves focus to the correct initial target when required;
- focus remains within a modal interaction when required;
- Tab/Shift+Tab order is usable and not trapped accidentally;
- Escape or the approved close mechanism works;
- closing restores focus to the initiating/appropriate element;
- disabled/inert/background behavior matches the contract;
- visible and programmatic names/status remain consistent.

Automated accessibility scanners may supplement these checks but do not replace interaction semantics or human visual judgment where those are material.

## 6. Responsive and content-stress proof

Select viewports from the approved capability modes or actual break behavior, not a ritual device matrix. Stress the constraints likely to fail: long labels, localization, zoom/reflow, narrow container, dense data, overflow, touch/keyboard modality, or reduced motion.

A screenshot can support visual comparison but does not prove keyboard order, semantics, hydration, network behavior or transition correctness. Pair visual evidence with the mechanism-specific probe.

## 7. Hydration, console and network evidence

For client/server rendering, inspect browser console/runtime errors and the actual first-render transition. Confirm the initial server output and client takeover agree where they must. For data interactions, inspect the request only when request semantics are part of the claim; a green UI with a hidden retry storm, duplicate request or incorrect error path is not complete proof.

## 8. Debugging artifacts are evidence aids, not verdicts

Traces, screenshots, videos, console logs and network captures are valuable for diagnosing a failure. Preserve enough to identify the failing step/state, but judge completion from the claimed behavior and mechanism rather than artifact volume.

## 9. Closure record

For a material browser proof, return:

- exact browser/runtime path and relevant environment/version when material;
- starting state/data and isolation/substitution notes;
- user-visible locator/interaction semantics;
- assertions and observed result;
- declared viewports/content/accessibility states exercised;
- console/network/hydration observations when material;
- what remains unproved.

## Provenance

This reference is a paraphrased/derived reasoning aid informed by Microsoft Playwright's `nodejs/docs/best-practices.mdx` content blob `253dad0ea13200c1053fc9ecb220c3bd900cf0d5` (CC BY 4.0). Exact source locator and license evidence are preserved in the frozen Depth Program knowledge source pack. No upstream documentation page is copied wholesale here. Current guidance was rechecked on 2026-08-15 against Playwright Best Practices/Locators and W3C WAI-ARIA APG modal/keyboard guidance; those sources inform probe mechanics but do not replace approved project UX or acceptance truth.
