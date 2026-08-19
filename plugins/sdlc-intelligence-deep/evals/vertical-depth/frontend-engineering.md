# Frozen Vertical-Depth Cases — Frontend Engineering

Status: behavioral execution `NOT_RUN`. Freeze before source wording changes.

## Rubric

- `STATE_IDENTITY`: names the semantic state rather than a variable/container.
- `AUTHORITY`: identifies the authoritative source/owner and avoids duplicate active truth.
- `LIFETIME`: binds state to navigation/session/component/entity/draft lifetime and reset identity.
- `DERIVATION`: avoids storing values that should be derived from authoritative inputs.
- `DRAFT_CONFLICT`: separates editable draft from changing remote truth and defines reset/rebase/conflict semantics.
- `OPTIMISTIC`: treats optimistic state as an overlay tied to mutation identity/current base, not a stale snapshot replacement.
- `TRANSITION`: exposes impossible/ambiguous states and uses a lifecycle/state representation when transitions matter.
- `BOUNDARY`: does not turn client state into server authorization/durable business truth or invent Product behavior.
- `PROOF`: chooses a falsifier that exercises navigation/reset/rebase/overlap behavior through the real frontend seam.

## F1 — Shareable search/filter state

A data table stores `query`, `sort`, and `page` only in component state. Product truth says filtered views must be shareable and browser Back/Forward must restore them.

Expected: route/URL is authoritative for the navigation-relevant state; local controls project/edit that state. Do not conclude that every filter in every app belongs in the URL. Verify deep-link, refresh, Back/Forward, and direct navigation.

## F2 — Local filter that is not navigation truth

A small in-memory list has an ephemeral text filter. No share, reload, history, or server-fetch behavior depends on it.

Expected: nearest local owner is sufficient; do not promote to URL/global store for consistency.

## F3 — Server object copied into editable local state

An editor receives a server-backed profile, copies the whole object into local state, and an automatic refetch can arrive while the user has unsaved edits.

Expected: distinguish remote canonical resource/snapshot from local draft. Define initialization identity and what refetch means: ignore for draft fields, rebase, conflict, or explicit reset according to fixed product semantics. Blind prop→state synchronization is not a solution.

## F4 — Derived and duplicated state

A component stores `firstName`, `lastName`, and `fullName`; another stores both `selectedId` and a copied `selectedItem` from a mutable list.

Expected: derive `fullName`; prefer stable identity plus current collection lookup when selection semantics permit. Do not create synchronization effects merely to keep duplicate state aligned.

## F5 — Identity change without reset

The same edit component instance switches from user A to user B, but A's unsaved form draft remains visible.

Expected: name the draft identity; reset/reinitialize on semantic entity change unless approved semantics explicitly transfer/preserve the draft. Framework key/reset mechanics are implementation choices after lifecycle semantics are fixed.

## F6 — Overlapping optimistic mutations

Mutation A optimistically changes a list. While A is pending, the canonical list changes and mutation B starts. A then fails. A naive rollback restores the pre-A whole-list snapshot and erases the newer canonical/B changes.

Expected: optimistic projection is tied to mutation/action identity and current canonical base; failure removes/reconciles A's contribution rather than restoring a stale global snapshot. Use framework/data-layer ownership if it already guarantees this behavior.

## F7 — Impossible boolean state

A screen independently stores `isLoading`, `hasError`, `isSaved`, and `isSubmitting`, allowing contradictory combinations that handlers patch ad hoc.

Expected: if transitions are materially governed, model a compact lifecycle/discriminated state or otherwise remove redundant flags so impossible combinations are unrepresentable. Do not introduce a state machine when states are truly independent.

## F8 — Client permission mirror

Frontend state caches `canDelete=true` and uses it to hide/show and enable a destructive action. Server policy may change independently.

Expected: frontend may project current affordance but must not claim authorization authority; real operation still requires security-owned enforcement. If freshness changes UX, handle presentation refresh without redefining policy.
