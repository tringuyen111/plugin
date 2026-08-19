# Frozen Behavioral Qualification Cases — implement change topology/cutover

Runtime behavioral execution is `NOT_RUN`; these are frozen decision cases for static methodology qualification and later A/B execution.

## Rubric

- `TARGET_TRUTH`: states current implementation truth, target truth, and what must remain stable.
- `CHANGE_TOPOLOGY`: identifies material readers/writers/callers/config/generated/registration/test/proof surfaces, not just edited files.
- `INTERMEDIATE_COHERENCE`: sequences mutations so every meaningful intermediate state is buildable/runnable and semantically coherent where required.
- `CUTOVER_TRUTH`: names temporary compatibility/coexistence explicitly and removes superseded active truth after the obligation ends.
- `SPECIALIST_TRIGGER`: recognizes when API/data/frontend/backend/security/design/deployment depth can change the implementation instead of improvising it.
- `PROOF_BY_STAGE`: binds proof to the risky stage/consumed seam, not only the final compile/test.
- `REENTRY`: when observed evidence invalidates the migration/cutover assumption, returns to the earliest wrong topology/ordering assumption.

## I1 — configuration key rename with independently deployed consumers

A service and worker read `timeout_ms`. A requested code change renames it to `request_timeout_ms`; service and worker can run different revisions during normal deployment. A direct rename is locally simple and unit tests pass.

Strong behavior should:
- inspect all readers/defaults/env/schema/docs or generated config surfaces that participate in the runtime contract;
- determine whether mixed-revision compatibility is a real current obligation;
- if yes, stage a bounded compatibility/read-write sequence or return the unresolved rollout decision instead of silently breaking old consumers;
- remove the old key path only after the named compatibility obligation ends; do not leave permanent dual defaults.

## I2 — moving a business rule to a canonical owner

A handler contains a local eligibility check. An existing domain policy is extended to own the rule. The first patch calls the new policy but retains the local check as a fallback "for safety". Existing tests remain green.

Strong behavior should:
- identify target single active truth;
- migrate callers/proof to the canonical policy;
- remove the local fallback once parity is established unless a named compatibility obligation requires it;
- reject green tests as proof that duplicate policy owners are safe.

## I3 — schema-backed field introduction

A new required field is introduced for existing durable records. New application code can write/read it, but existing rows and an older background consumer remain.

Strong behavior should:
- recognize this is not a one-file feature and load data-persistence depth;
- reconstruct writer/read/backfill/constraint/old-consumer topology from source/runtime truth;
- choose an implementation sequence compatible with the fixed migration/rollout semantics rather than inventing a database recipe;
- prove the material intermediate state, not only the final model type.

## I4 — generated client / server contract change

The server handler accepts a new enum value. One generated SDK and one manual caller consume the API. Editing the handler and schema compiles locally, but generated output was not refreshed and the manual caller has exhaustive handling.

Strong behavior should:
- include generated/manual consumers in change topology;
- load API/dependency depth where it changes the sequence;
- regenerate through the owning mechanism rather than hand-editing generated output;
- prove representative consumers, not only server unit tests.

## I5 — feature flag creates a temporary two-path implementation

A replacement algorithm is introduced behind an existing flag for staged evaluation. Both implementations are intentionally active for a bounded period.

Strong behavior should:
- distinguish authorized temporary coexistence from accidental duplicate truth;
- identify selection authority/default and removal gate;
- keep semantics/observability sufficient to compare the intended paths;
- avoid converting a temporary flag into an undocumented permanent fallback.

## I6 — refactor with clean compile but stale registration

A provider implementation moves to a new module and imports are updated. A runtime registry still references the old implementation through string/config discovery; compile and isolated tests pass.

Strong behavior should:
- trace registration/discovery/consumed runtime seam in addition to import callers;
- stage move/registration/caller cleanup coherently;
- inspect real consumed runtime output/registration and delete the old active surface after cutover.

## I7 — evidence invalidates the planned slice

A planned three-step refactor assumes old and new serializers produce identical wire output. After step one, an integration probe shows field ordering/default omission differs and a snapshot consumer is sensitive.

Strong behavior should:
- stop layering later edits;
- re-enter at the compatibility/topology assumption invalidated by the probe;
- determine whether the target design, compatibility obligation, or implementation sequence must change;
- keep the failing evidence rather than normalizing it away.

## I8 — true local change near-miss

A private pure helper has one caller and no generated/config/runtime registration, durable state, compatibility, or cross-component consumer. The requested behavior is fixed and a focused test proves it.

Strong behavior should **not** manufacture a change graph/cutover plan. The ordinary edit-run-observe loop is sufficient.
