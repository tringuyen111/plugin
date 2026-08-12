# Single Active Truth and Replacement Discipline

Canonical maintainer source: this runtime contract; changes require matching root/router, lifecycle, runtime-context, and adversarial-eval updates.

Use this contract when work replaces, removes, renames, versions, migrates, or retires code, tests, documentation, configuration, routes, data/schema history, or another active artifact. It prevents the source tree from becoming a historical archive while preserving real compatibility obligations.

## Core invariant

```text
Source and active configuration keep the current supported truth.
Git and immutable release artifacts keep recoverable history.
Tests and docs protect the current supported contract.
Migration history protects named durable consumers and data.
```

A current file is not retained merely because it once worked. `old`, `legacy`, `backup`, `new`, `next`, `v2`, fallback, compatibility, and rollback are claims, not evidence.

The valid states are:

```text
CURRENT                  one canonical supported implementation/contract
REPLACEMENT_IN_PROGRESS  temporary coexistence before parity; not completion-ready
SUPPORTED_COEXISTENCE    two intentional supported contracts with named current consumers
REMOVE                   superseded surface has no current consumer or compatibility obligation
```

`SUPPORTED_COEXISTENCE` requires a current consumer, explicit contract, test coverage, routing/version selection, owner, and removal/deprecation condition. “Just in case,” “for safety,” “might need later,” and “rollback” without a concrete recovery mechanism are not evidence or justification.

## Replacement gate

Before keeping old and new paths together, record:

```text
old capability and canonical owner
new capability and canonical owner
current callers/consumers of each
supported behavior and invariants
parity evidence still missing
compatibility obligation, if any
cutover procedure
removal gate
rollback mechanism
```

If parity is not proved, the replacement is not complete. Keep one path canonical, mark the work `REPLACEMENT_IN_PROGRESS`, and return `PARTIAL` or `BLOCKED` for completion-dependent actions. Do not expose an unproved path as a silent fallback.

If parity is proved and no supported coexistence obligation remains:

1. migrate every caller and runtime entry point;
2. reopen and verify the affected behavior;
3. remove the superseded path in the same coherent change;
4. rerun targeted, affected integration, and representative runtime checks;
5. use Git or a tagged release to recover history instead of keeping source copies.

Do not create an indefinite state where both paths remain active after parity.

## Removal surface

Removal is incomplete until the whole superseded support surface is handled:

```text
files and implementation branches
imports and exports
callers and runtime entry points
routes and commands
configuration and environment keys
feature flags and fallback branches
tests, fixtures, mocks, snapshots, and test helpers
documentation, examples, generated indexes, and templates
manifests, catalogs, context maps, and package allowlists
telemetry, dashboards, alerts, and audit labels
schema/data compatibility code and migration notes
```

For each surface choose exactly one action:

```text
DELETE   no longer supports current behavior
REWRITE  still supports the current contract but names/assumptions changed
KEEP     current consumer and compatibility evidence are named
```

An obsolete test is not historical evidence. Delete or rewrite an obsolete test after the supported behavior changes. Keep release evidence outside active runtime/source surfaces when it is not executable or does not govern a current claim.

## Version discipline

Do not create parallel `v2`, `new`, `next`, `legacy`, or dated source variants merely to avoid replacing the canonical design.

Versioned coexistence is justified only when at least one current consumer cannot move atomically and the system intentionally supports both contracts. Record:

- consumer and supported lifetime;
- selection/routing mechanism;
- compatibility and data behavior;
- test matrix;
- deprecation/removal owner and gate.

Before a durable release or external compatibility obligation exists, edit the current canonical design directly. Package/release versions remain valid release identity; this rule rejects internal parallel implementations without supported consumers.

## Database and migration discipline

Classify the environment from evidence; do not infer disposal rights from its label.

```text
EPHEMERAL          disposable data; reproducible from canonical schema/migrations and seed
SHARED_TEST         shared integration/UAT state; reset only by an authorized procedure
UPGRADE_REHEARSAL   preserves a previous release state to prove the real upgrade path
PRODUCTION          durable data and compatibility obligations
```

A local database is not automatically `EPHEMERAL`; it may contain the only reproducible failure fixture or user-owned data. A staging environment is not automatically disposable or `EPHEMERAL`; it may be `SHARED_TEST` or `UPGRADE_REHEARSAL`.

For `EPHEMERAL` state, an authorized reset is preferred over accumulating migrations solely to preserve disposable experiments. Reset/drop, recreate from the canonical baseline, seed, and run empty-to-latest plus representative runtime checks.

A schema history may be reset or squashed only when all are true:

- no durable consumer or data requires the prior history;
- no released version or compatibility obligation depends on it;
- the new canonical baseline is explicit and checksummed;
- empty-to-latest and failure-path tests pass;
- the reset is authorized and documented for affected developers/environments.

Once a released version or durable consumer exists, do not squash away the supported upgrade path. Use a new append-only migration with checksum, empty-to-latest test, previous-release-to-latest upgrade test, and failure-path test. Preserve rollback or forward-recovery behavior according to the datastore's real capabilities; do not claim rollback when the operation is irreversible.

For `SHARED_TEST`, reset only through the named procedure and authority. For `UPGRADE_REHEARSAL` and `PRODUCTION`, migration evidence is mandatory; dropping state is not a substitute for proving the upgrade.

## Cleanup decision record

```markdown
Artifact/capability:
Current canonical truth:
Proposed replacement/removal:
State: CURRENT | REPLACEMENT_IN_PROGRESS | SUPPORTED_COEXISTENCE | REMOVE

Current consumers:
Compatibility obligation:
Parity evidence:
Cutover result:
Removal surface and actions:
Database environment class, if applicable:
Migration/reset evidence, if applicable:
Rollback/recovery mechanism:
Completion state: READY | PARTIAL | BLOCKED | FAILED
```

## Stop rules

Return `READY` only when the current supported path is unambiguous and required removal/migration evidence is complete.

Return `PARTIAL` when useful replacement work exists but parity, cutover, cleanup, or a reversible low-risk migration step remains.

Return `BLOCKED` when a superseded active truth would mislead callers, a destructive reset lacks environment classification/authority, released data lacks upgrade evidence, or completion depends on silent fallback/coexistence.

Return `FAILED` when an authorized destructive action or migration corrupts state, the cleanup removes a supported consumer, or the final source/package contradicts the declared canonical truth.
