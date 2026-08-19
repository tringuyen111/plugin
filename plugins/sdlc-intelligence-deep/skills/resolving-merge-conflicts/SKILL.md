---
name: resolving-merge-conflicts
description: Use when a Git merge, rebase, cherry-pick, or revert is in progress and conflicted paths must be resolved without inventing product behavior or overwriting unrelated work.
---

## Runtime context

Inspect the exact in-progress Git operation, conflict stages, repository rules, unrelated local state, and the authoritative sources that explain both sides. Conflict resolution mutates source by definition, but staging/continue/commit/reset/push remain separate authority decisions. For migration/schema/history conflicts, determine whether the affected history is disposable or already released/durable before editing it; never rewrite a supported upgrade path merely to remove markers.


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

1. **Map the operation and each conflict.** Confirm merge/rebase/cherry-pick/revert state, inspect the conflict stages/operation refs, then classify each conflict as mechanical, additive, semantic, generated, dependency/lockfile, migration/schema, test, or documentation. Do not treat `ours` / `theirs` as stable branch-owner labels without interpreting them through the active operation. For migration/schema conflicts, classify whether the history belongs to a disposable baseline, shared test/rehearsal environment, or a released/durable upgrade path before deciding whether it may be regenerated, retained, appended, reset, or squashed. A released upgrade path or durable consumer cannot be dropped merely to remove markers; if the project migration policy is unresolved, stop that conflict rather than inventing one.
2. **Reconstruct both semantic deltas.** Use the strongest available project sources to distinguish the common/base meaning from each side's intended change. Separate confirmed intent from inference and name contradictions. For any non-mechanical conflict, rename/edit case, generated derivative, or cross-file interaction, read [Semantic Merge Model](SEMANTIC-MERGE-MODEL.md) before editing.
3. **Choose a meaning-preserving composition.** Classify how the two deltas compose: independent/commutative, additive but order-sensitive, substitutive/superseding, generated derivative, durable history, or genuinely competing decision. Preserve every still-authoritative effect; when one side supersedes the other, cite the source that establishes precedence and re-express any still-valid intent against the current contract. Do not invent a third behavior merely to make the text merge.
4. **Edit narrowly.** Resolve only reviewed conflict paths and necessary dependent files. Preserve unrelated local changes. Do not run destructive cleanup, broad reset, checkout-overwrite, or force operations without explicit authority and recovery evidence.
5. **Inspect the resulting diff and latent interaction surface.** Confirm markers are gone and the diff matches the merge goal, then inspect the material callers/contracts/state/external effects where the two deltas can interact even if Git merged those files cleanly. No unrelated path may be absorbed.
6. **Verify the combined obligations.** Map every surviving approved delta to the resulting source/generated output and run the narrowest checks that exercise each side's effect plus their material interaction, then broader checks required by project policy. A clean index or marker-free diff with lost intent, unintended third behavior, or failing interaction is not a successful merge.
7. **Apply source-control actions separately.**
   - Stage only reviewed files or hunks; never use `git add .` as a default.
   - Continue or commit only when project policy and user authority allow it.
   - A request to resolve does not automatically grant permission to commit, push, or force-update history.
   - If commit/continue authority is missing, leave a recoverable verified state and report `PARTIAL` or `BLOCKED` as appropriate.
8. **Reinspect final state.** Report unresolved paths, staged paths, unstaged unrelated work, verification results, and the exact commit/continue/abort action taken or not taken.

## Failure and recovery

- If approved intent cannot be determined, return `BLOCKED`; do not fabricate a resolution.
- If verification fails after a supported resolution, return `FAILED` or `PARTIAL` according to what is actually unresolved and preserve the failing evidence plus a recovery path.
- If the operation can be safely aborted and policy authorizes it, state what will be restored and what local work may be affected before acting.
- If abort/reset/continue would overwrite unrelated work, stop and surface the protected paths.
- If the repository state is unclear or damaged, avoid further mutation and request the smallest diagnostic or owner decision needed.

## Required result

Return one truthful result state (`READY | PARTIAL | BLOCKED | FAILED`) and include:

- operation type and merge goal;
- authoritative sources inspected;
- resolved and unresolved paths;
- behavior decisions made and decisions deferred to another owner;
- verification commands and results;
- staged paths and unrelated local changes preserved;
- commit, continue, abort, reset, or push action taken—or explicitly not taken;
- remaining risk and safe recovery path;
- canonical work item when one exists, the exact unresolved decision/action, and who or what authority must resolve it when blocked or partial.
