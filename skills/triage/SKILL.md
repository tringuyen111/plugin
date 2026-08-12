---
name: triage
description: Move canonical work items through a provider-neutral triage state machine, verify claims, and write durable briefs without assuming a tracker implementation.
---

# Triage
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->


Move canonical work items through a small state machine of triage roles.

Before reading or writing tracker state, read [Tracker Capability Contract](../../architecture/capabilities/TRACKER-CAPABILITY-CONTRACT.md) and resolve `tracker.query`, `tracker.read`, and any required `tracker.update` or `tracker.change_state` through `/capability-resolver`. The target project owns one canonical work-status source. If it is unknown, return `BLOCKED` and route to `/project-bootstrap`; do not create local triage status as a substitute.

If the selected provider mapping explicitly exposes an external change-request surface, triage may cover those items too: **a PR is an issue with attached code** — same roles, same states, same machine, with a few deltas marked "for a PR" below. Resolve a bare `#42` to an issue or PR per the tracker config.

Before publishing any tracker comment, issue body, or other outward-facing triage text, resolve the active project/provider communication and disclosure policy together with the operation policy. Apply configured disclosure wording exactly when the project or provider requires it. If no disclosure requirement is configured, do not invent a universal AI disclaimer. External communication and tracker writes still require the audience, content, authority, capability, and postcondition checks from the shared side-effect policy.

## Reference docs

- [AGENT-BRIEF.md](AGENT-BRIEF.md) — how to write durable agent briefs
- [OUT-OF-SCOPE.md](OUT-OF-SCOPE.md) — provider-neutral rejected-scope decision memory

## Roles

Two **category** roles:

- `bug` — something is broken
- `enhancement` — new feature or improvement

Five **state** roles:

- `needs-triage` — maintainer needs to evaluate
- `needs-info` — waiting on reporter for more information
- `ready-for-agent` — fully specified, ready for an AFK agent
- `ready-for-human` — needs human implementation
- `wontfix` — will not be actioned

For a PR, the same states read against the attached code: `ready-for-agent` means a brief is attached and an agent should take the next step on the diff; `ready-for-human` means it's ready for a human to merge.

Every triaged issue should carry exactly one category role and one state role. If state roles conflict, flag it and ask the maintainer before doing anything else.

These are canonical role names. Provider-specific labels, fields, states, transitions, or comments are projections. Read `extensions.sdlc.triage_roles` from the canonical Project Capability Profile established by `/project-bootstrap`; if it is missing or stale, do not infer strings from a provider name.

State transitions: an unlabeled issue normally goes to `needs-triage` first; from there it moves to `needs-info`, `ready-for-agent`, `ready-for-human`, or `wontfix`. `needs-info` returns to `needs-triage` once the reporter replies. The maintainer can override at any time — flag transitions that look unusual and ask before proceeding.

## Invocation

The maintainer invokes `/triage` and describes what they want in natural language. Interpret the request and act. Examples:

- "Show me anything that needs my attention"
- "Let's look at #42" (issue or PR)
- "Move #42 to ready-for-agent"
- "What's ready for agents to pick up?"

## Show what needs attention

Resolve `tracker.read`, query the canonical work source through its provider mapping, and present three semantic buckets, oldest first. If live read capability is unavailable, report `BLOCKED`; cached or user-supplied content may support a clearly marked `PARTIAL` analysis but not a tracker-state claim:

1. **Unlabeled** — never triaged.
2. **`needs-triage`** — evaluation in progress.
3. **`needs-info` with reporter activity since the last triage notes** — needs re-evaluation.

When PRs are in scope, include external PRs in these buckets and tag each line `[PR]` or `[issue]`. Discovery surfaces only *external* PRs (the tracker config defines who counts as external) — a collaborator's in-flight PR is not triage work. This filter is discovery-only; an explicitly named PR is always triaged regardless of author.

Show counts and a one-line summary per item. Let the maintainer pick.

## Triage a specific issue or PR

1. **Gather context.** Read the full canonical work item or change request (body, discussion, semantic roles, author, dates; for a code change, the frozen diff too). Parse prior triage notes so resolved questions are not repeated. Explore the codebase using project-authorized domain context and accepted decisions. Run two checks: (a) **redundancy** — search for an existing implementation by domain concept and report where you looked; if found, treat it as already implemented in step 5. (b) **prior rejection** — resolve the project-authorized rejected-scope decision memory described in [OUT-OF-SCOPE.md](OUT-OF-SCOPE.md). If no provider is configured, state that prior-rejection evidence is unavailable; do not create `.out-of-scope/` by assumption.

2. **Recommend.** Tell the maintainer your category and state recommendation with reasoning, plus a brief codebase summary relevant to the request — including whether it's already implemented. Wait for direction.

3. **Verify the claim.** Before any grilling, check that the claim holds up. For a bug, reproduce it from the reporter's steps. For a PR, confirm the diff does what it claims — check it out, run the relevant tests or commands. Report what happened: confirmed (with code path), failed, or insufficient detail (a strong `needs-info` signal). A confirmed verification makes a much stronger agent brief.

4. **Grill (if needed).** If the request needs fleshing out, use `/grilling` one question at a time. Invoke `/domain-modeling` only when accepted terminology or a qualifying durable decision must be preserved, and let it resolve the project-authorized artifact location; do not assume `CONTEXT.md` or an ADR path.

5. **Apply the outcome through `tracker.update` and, for mapped state transitions, `tracker.change_state`:** Resolve approval and live capability before any label, field, comment, assignment, transition, close, or local-file write. Translate the semantic outcome through the provider mapping and record the operation in an Integration Result Manifest.
   - `ready-for-agent` — post an agent brief comment ([AGENT-BRIEF.md](AGENT-BRIEF.md)).
   - `ready-for-human` — same structure as an agent brief, but note why it can't be delegated (judgment calls, external access, design decisions, manual testing).
   - `needs-info` — post triage notes (template below).
   - `wontfix` — close, with the comment depending on *why*:
     - **Already implemented** — the change already exists in the codebase. Point to where it lives; do not create a rejected-scope record for built behavior.
     - **Rejected (bug)** — polite explanation, then close.
     - **Rejected (enhancement)** — persist the decision through the project-authorized rejected-scope decision memory, link its canonical identifier from the work item, then close or transition through the tracker mapping ([OUT-OF-SCOPE.md](OUT-OF-SCOPE.md)).
   - `needs-triage` — apply the role. Optional comment if there's partial progress.

## Quick state override

If the maintainer says "move #42 to ready-for-agent", treat that as an authorized state-transition request, not permission to weaken the state meaning. Skip grilling, but verify before the transition that the canonical item already satisfies the `ready-for-agent` execution contract, including an approved Agent Brief or the provider-mapped equivalent. If it already contains a current valid brief, preview the mapped state change and apply it through policy. If the brief is missing, create/review it first when authorized, then transition only after the canonical item satisfies the readiness contract. If the project defines an explicit exception mapping, follow that mapping and keep the exception visible; otherwise do not label an under-specified item `ready-for-agent`.

## Needs-info template

```markdown
## Triage Notes

**What we've established so far:**

- point 1
- point 2

**What we still need from you (@reporter):**

- question 1
- question 2
```

Capture everything resolved during grilling under "established so far" so the work isn't lost. Questions must be specific and actionable, not "please provide more info".

## Resuming a previous session

If prior triage notes exist on the issue or PR, read them, check whether the reporter has answered any outstanding questions, and present an updated picture before continuing. Don't re-ask resolved questions.


## Provider and failure rules

- A git remote, installed CLI, connector name, or remembered API does not prove tracker access.
- Jira, Linear, GitHub, GitLab, and local Markdown may implement this workflow through mappings; none owns the triage method. A local `.out-of-scope/` directory is one optional projection, not a default source of truth.
- When the provider lacks a comment, close, label, or transition primitive, use only a project-approved mapped representation and return `PARTIAL` with the limitation.
- If a write partially succeeds, do not create shadow status elsewhere. Return `FAILED` or contracted `PARTIAL` and identify the canonical item that may now be inconsistent.
- `READY` requires the canonical work item to reflect the approved semantic state; a drafted brief alone is `PARTIAL` when publication was required.
