---
name: resolving-merge-conflicts
description: Use when a Git merge, rebase, cherry-pick, or revert is in progress and conflicted paths must be resolved without inventing product behavior or overwriting unrelated work.
---

<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
- **When a conflict touches migration/schema history, version coexistence, generated migration files, or any reset/squash choice:** read [Single Active Truth and Replacement Discipline](../../resources/shared/references/single-active-truth-contract.md) before choosing the resolution; preserve its environment classification and released-upgrade obligations.
<!-- runtime-context:end -->

# Resolve Merge Conflicts

Resolve an existing source-control conflict by reconstructing approved intent, preserving unrelated state, and verifying the combined behavior. Conflict-marker removal is not completion.

## Entry conditions

Use this skill only when the repository confirms an in-progress merge, rebase, cherry-pick, or revert with unresolved paths. If no operation is in progress, route to code review, debugging, or architecture instead of starting one implicitly.

Before editing, inspect:

- the exact source-control operation and current status;
- conflicted paths and conflict stages;
- unrelated modified, staged, or untracked files that must be preserved;
- the stated merge goal and canonical work item, when one exists;
- commits, diffs, requirements, tickets, pull requests, tests, and approved artifacts that explain each side;
- project policy for staging, continuing, committing, aborting, resetting, or pushing.

A missing ticket or pull request is not itself a blocker. It means intent must be reconstructed from other authoritative project evidence and any remaining ambiguity must be reported.

## Decision boundary

Engineering may integrate already-approved behavior. Engineering must not decide an unresolved product rule, acceptance rule, design intent, security policy, or release authority merely because the conflict appears in code.

When incompatible sides encode different behavior and no authoritative source resolves the choice:

1. preserve the recoverable repository state;
2. identify the unresolved decision and its owner;
3. return `BLOCKED`, or use an approved safe abort/recovery path when that is within user and project authority;
4. never choose arbitrarily or invent a third behavior.

Do not treat “always resolve” as a goal. Safe recovery is preferable to an unsupported resolution.

## Resolution workflow

1. **Map each conflict.** Classify it as mechanical, additive, semantic, generated, dependency/lockfile, migration/schema, test, or documentation conflict. For migration/schema conflicts, consume the shared replacement/migration contract before deciding whether history may be regenerated, retained, appended, reset, or squashed. A released upgrade path or durable consumer cannot be dropped merely to remove markers; this workflow does not own migration policy.
2. **Reconstruct both intents.** Use the strongest available project sources. Separate confirmed intent from inference and name contradictions.
3. **Choose a supported resolution.** Preserve both intents when compatible. When one side supersedes the other, cite the source that establishes precedence. Regenerate generated artifacts through their owning command when possible instead of hand-merging generated output.
4. **Edit narrowly.** Resolve only reviewed conflict paths and necessary dependent files. Preserve unrelated local changes. Do not run destructive cleanup, broad reset, checkout-overwrite, or force operations without explicit authority and recovery evidence.
5. **Inspect the resulting diff.** Confirm conflict markers are gone, the diff matches the merge goal, and no unrelated path was absorbed.
6. **Verify affected behavior.** Discover and run the narrowest relevant checks first, then broader checks required by project policy. A clean index with failing behavior is not a successful merge.
7. **Apply source-control actions separately.**
   - Stage only reviewed files or hunks; never use `git add .` as a default.
   - Continue or commit only when project policy and user authority allow it.
   - A request to resolve does not automatically grant permission to commit, push, or force-update history.
   - If commit/continue authority is missing, leave a recoverable verified state and report `PARTIAL` or `BLOCKED` as appropriate.
8. **Reinspect final state.** Report unresolved paths, staged paths, unstaged unrelated work, verification results, and the exact commit/continue/abort action taken or not taken.

## Failure and recovery

- If approved intent cannot be determined, return `BLOCKED`; do not fabricate a resolution.
- If verification fails after a supported resolution, return `FAILED` or `PARTIAL` according to the workflow-result contract and preserve evidence plus a recovery path.
- If the operation can be safely aborted and policy authorizes it, state what will be restored and what local work may be affected before acting.
- If abort/reset/continue would overwrite unrelated work, stop and surface the protected paths.
- If the repository state is unclear or damaged, avoid further mutation and request the smallest diagnostic or owner decision needed.

## Required result

Return one truthful workflow state and include:

- operation type and merge goal;
- authoritative sources inspected;
- resolved and unresolved paths;
- behavior decisions made and decisions deferred to another owner;
- verification commands and results;
- staged paths and unrelated local changes preserved;
- commit, continue, abort, reset, or push action taken—or explicitly not taken;
- remaining risk and safe recovery path;
- canonical work item and next owner when blocked or partial.
