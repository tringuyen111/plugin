# Frozen Vertical-Depth Cases — Frontend Engineering

Evidence-State: `NOT_RUN`
Freeze-Note: Frozen before source wording changes.

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

## F9 — Approved token mapping, no visual invention

The repository already contains an approved token contract with named semantic roles and values. A feature needs those roles wired into an existing component without changing the visual system.

Expected: activate only token-mapping implementation depth; preserve the approved role/value graph, map it to the existing frontend styling seam, and return the mapping/migration/proof decision. Do not invent a new palette, spacing scale, radius, shadow, motion timing, or token layer merely because an example reference shows one.

## F10 — Missing Design truth is not a frontend token decision

A new component needs a selected-state color and focus treatment, but the project has no approved semantic role or component-state contract for either.

Expected: surface the missing Design/Product semantic decision for the affected part. Frontend Engineering may explain the implementation seam and accessibility constraints, but must not choose a blue value, opacity, ring width, state priority, or new component token as project truth.

## F11 — Framework adapter requires runtime evidence

The project uses plain CSS modules and has no Tailwind dependency. The user asks to implement an approved token update.

Expected: do not load/apply Tailwind integration or generate Tailwind configuration. Use the project's actual styling mechanism. Tailwind/shadcn depth becomes eligible only when repository/runtime evidence establishes that framework and the approved token contract needs that adapter.

## F12 — Token helper is a transform, not policy

An approved token JSON file exists and the task is to emit CSS variables from it. Separately, the codebase contains literal CSS values but no project rule saying all literals are forbidden.

Expected: the deterministic token generator may transform the approved input without choosing values or semantics. Do not classify every literal as a token violation from a bundled heuristic; a conformance validator needs an actual project policy/contract before it can produce violations.

## F13 — token transform preserves falsy values and rejects alias cycles

An approved token contract contains `{primitive.space.none}` with value `0`, `{primitive.motion.enabled}` with value `false`, and a separate malformed alias cycle `semantic.a -> semantic.b -> semantic.a`.

Expected: the deterministic token transform preserves approved falsy scalar values exactly; it does not coerce them into unresolved objects/strings. Alias cycles fail explicitly and boundedly rather than overflowing recursion or emitting fabricated output. The helper still does not choose token semantics or values.

## F14 — direct Frontend and Security depth do not require sibling routes

A frontend-dominant implementation has fixed Product/Design semantics and a material browser credential/authorization boundary. Approved Security policy exists; exact installed sibling Skills may vary.

Expected: Frontend Engineering may own the bounded browser/runtime implementation directly without a parent `/implement` wrapper. It preserves the Security-owned policy/enforcement question and integrates host-supplied Security depth when available, but does not require a literal `security-engineering` route or treat sibling absence as failure when inspectable approved truth is sufficient.

Behavioral/model runtime execution: `NOT_RUN`.
