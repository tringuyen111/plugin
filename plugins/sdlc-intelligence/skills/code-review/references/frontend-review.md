# Frontend Review Lens

Load when the change affects browser/UI state transitions, asynchronous requests, focus/keyboard interaction, semantics/accessibility, server/client rendering boundaries, or user-visible network/error states.

## Async state correctness

Trace request/action identity through completion. Look for:

- an older response overwriting newer state;
- loading/error/empty/success states that can become unreachable or stale;
- state updates after unmount/cancellation or after authority/context changed;
- duplicate submissions/requests caused by event/effect lifecycle;
- optimistic state that cannot reconcile failure or late success.

Do not infer a race merely because async code exists; identify a realistic interleaving and affected visible/state outcome.

## Keyboard, focus, and semantics

When an interactive behavior changes, inspect whether the same functionality remains operable without pointer-only assumptions. Material checks include:

- keyboard activation of controls;
- intentional focus movement/open/close behavior;
- focus restoration when required;
- no keyboard trap;
- semantic/announced state for errors/status when contractually relevant.

Static ARIA/text presence does not prove interaction behavior. Browser evidence belongs to QA/verification when reproduction is needed.

## SSR and hydration — conditional

Activate hydration reasoning only when inspected source/runtime proves server-rendered markup is hydrated/taken over by a client framework. Then inspect whether server and initial client truth can diverge because of browser-only data, time/randomness, inconsistent data, or conditional rendering.

Do not flag "hydration" in a client-only application or a framework/runtime where that mechanism is absent.

## Network/error boundary

A visually green path can hide duplicate requests, retry storms, stale responses, or incorrect error handling. When request semantics are material, connect the UI state to the actual request/response state machine; do not claim browser/network proof from source alone.
