# Frontend State Authority and Lifecycle

Load this reference when correctness depends on choosing or changing the owner of UI/client state, when the same semantic state appears in multiple surfaces, or when reset/rebase/optimistic behavior can diverge. This is a framework-neutral decision model; map it onto the inspected router, query/data layer, form system, component model, or state library rather than replacing proven project mechanisms.

## 1. Name the semantic state before choosing a container

Do not start with `useState`, store, URL, cache, form library, or context. State the user/system fact being represented and its authority:

`semantic fact -> authoritative source -> editable/projection copies -> consumers`

Examples: current navigation filter, server-backed invoice, unsaved invoice draft, selected invoice ID, optimistic deletion, expanded row, persisted theme preference.

Two variables with different names can still be duplicate owners of one fact. One value can also legitimately have several projections when only one surface remains authoritative.

## 2. Choose ownership from semantics, lifetime, and conflict

Use only the rows material to the current change:

| State kind / evidence | Prefer | Why | Failure signal |
| --- | --- | --- | --- |
| Value is fully computable from current authoritative inputs | derive during render/computation | no synchronization owner is needed | effect/listener exists only to keep a duplicate value aligned |
| State participates in navigation, share/deep-link, refresh, or Back/Forward semantics | router/URL contract | browser navigation is part of the state lifecycle | refresh/share/back produces a different semantic view |
| Remote resource/business fact is owned by the server | established data/query/cache layer | remote truth has freshness, identity, retry and invalidation semantics | feature-local copy silently becomes a second server-resource truth |
| Unsaved user edits intentionally diverge from remote truth | form/draft owner | a draft is a different semantic object from the current remote snapshot | refetch overwrites edits or prop-sync guesses whether to preserve them |
| Transient interaction has no navigation/durable/shared meaning | nearest local owner | smallest lifetime matches the fact | state is global/persisted only for convenience |
| Several components must coordinate one semantic fact | least common semantic owner or established shared mechanism | one writer/owner avoids independent copies | siblings can disagree about the same selection/mode |
| Preference must survive a declared lifetime | approved persistence mechanism at that scope | persistence is a product/runtime contract, not a convenience | stale/private/user-scoped data survives beyond its intended scope |
| UI predicts a pending mutation result | established mutation layer or explicit optimistic overlay | predicted state must converge with current canonical truth | failure restores a stale whole snapshot or overlaps erase newer changes |

Do not globalize state merely because more than one component consumes it. Do not move state to URL merely because a router exists. The correct owner follows the fact's required scope and lifetime.

## 3. Make reset identity explicit

For every editable or locally retained state that can outlive one render, name the semantic identity that allows preservation:

`owner state + identity key + preserve condition + reset/reinitialize condition`

Typical identity changes include route/resource ID, selected account/tenant, draft target, workflow instance, or another fixed Product identity. If the semantic identity changes, preserve state only when approved behavior explicitly transfers it. Otherwise reset/reinitialize through the framework's normal identity/reset mechanism.

A component instance surviving is not evidence that its previous state still belongs to the new entity.

## 4. Separate remote snapshot, draft, derived view, and optimistic projection

Do not collapse these distinct roles:

```text
remote canonical/resource state
        |
        +-- derives visible read view
        |
        +-- initializes --> local draft --user edits--> submitted intent
        |
        +-- base for --> optimistic projection --settle/reconcile--> current canonical state
```

When remote truth changes while a draft exists, choose the disposition from fixed semantics: keep the draft against its original base, rebase compatible fields, surface a conflict, or deliberately reset. Blindly copying new props/server data into the draft is not a conflict policy.

For optimistic updates, identify the pending mutation/action and the canonical base it overlays. If the base changes or another mutation overlaps, recompute/reconcile against current truth when the established mechanism supports it. On failure, remove or correct the failed operation's contribution; restoring an old global snapshot can erase later valid changes.

## 5. Eliminate impossible and redundant state before adding synchronization

If one value is derivable, derive it. If multiple booleans encode one governed lifecycle, test whether they permit impossible combinations. When transitions/guards matter, represent the lifecycle compactly, for example:

`idle -> editing -> submitting -> succeeded | failed`

Use a state/discriminated model only when the states are mutually governed. Independent dimensions should remain independent; do not build a state machine merely because several booleans exist.

When an effect/subscription exists only to copy one frontend state surface into another, first ask which surface should be authoritative and whether the second value should be derived instead. Effects remain appropriate for real synchronization with an external system/runtime.

## 6. Follow state E2E through the user interaction

For a material state change, trace only the relevant path:

`user/navigation/server input -> owner -> transition -> projections/consumers -> async mutation or navigation -> settlement/reset -> user-visible state`

Name seams where authority can change or diverge: URL navigation, server refresh, entity switch, optimistic mutation, form submit/cancel, cache invalidation, browser reload, shared component update. If no one owns the transition from old truth to new truth, the state model is incomplete.

## 7. Prove the lifecycle, not only the rendered snapshot

Choose falsifiers that attack the ownership decision:

- navigation-owned state: direct URL, refresh, Back/Forward, and sibling navigation;
- draft state: external refresh while edited, submit failure, cancel/reopen, target identity switch;
- shared state: two consumers update/read without divergence;
- optimistic state: overlap two mutations or change the base while one is pending, then fail one;
- derived state: mutate each authoritative input and verify no stale synchronized copy remains;
- persisted state: cross the intended reload/session/user boundary and verify scope/cleanup.

Use [Frontend Runtime and Performance](runtime-performance.md) when async-result supersession, cancellation, cache/request identity, or performance changes the mechanism. Use [Browser Proof Discipline](browser-proof.md) for real interaction/navigation evidence. Client state may project authorization or durable business facts but never becomes their server-side authority.

## Provenance

This framework-neutral reasoning model was checked on 2026-08-16 against current official React guidance on single-source state ownership, avoiding redundant/duplicate state, state reset by identity, avoiding synchronization Effects for derivable state, and optimistic state over a changing base, plus current Next.js URL/search-parameter behavior as a conditional router example. No React/Next API is a universal project rule; repository/runtime truth controls activation.
