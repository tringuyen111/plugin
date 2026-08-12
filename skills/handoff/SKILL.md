---
name: handoff
description: Compact verified project and conversation state into a continuation artifact when another owner, agent, session, or runtime needs durable/inline transfer that ordinary bounded results and canonical references cannot provide. Do not use for in-process supporting-Skill returns or mere next-owner routing metadata.
---

<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->

# Handoff

Create a compact continuation artifact so a different owner, agent, session, or runtime can resume without rediscovering project truth. A handoff is an index and state transfer, not a replacement for specifications, plans, ADRs, issues, source, commits, diffs, or evidence.

If arguments are provided, treat them as the intended focus of the receiving context and prioritize only the state needed for that continuation.

## Handoff necessity gate

Use this Skill only when a continuation boundary is real: the user explicitly requests a handoff, the primary owner/authority changes and the receiver needs transferred state, a new session/agent/runtime cannot safely recover current execution state from canonical sources, or project policy requires a persisted checkpoint.

If a supporting Skill is returning to the still-active primary owner, return its bounded result/evidence to the caller instead. If a workflow only needs to name the likely next owner, preserve that as ordinary control/routing metadata. Neither case warrants a handoff artifact by itself.

## Establish the handoff boundary

Before writing:

1. identify the receiving role, agent, or next session goal;
2. identify the canonical project truth locations and current work item;
3. inspect the strongest available state evidence, including source/runtime/tests/artifacts before summaries;
4. find contradictions between ledgers, claims, and observed evidence;
5. determine what the next agent must know now versus what it can retrieve from a referenced artifact;
6. classify sensitive content and read applicable privacy, redaction, and retention policy;
7. resolve the destination and write capability before claiming a file will be created.

Do not silently repair conflicting project state inside the handoff. Surface the contradiction, cite both sources, and name the owner who must reconcile canonical truth.

## Destination resolution

Choose the destination in this order:

1. explicit user instruction that complies with project policy;
2. active project capability profile and canonical handoff/evidence location;
3. established project convention confirmed from current artifacts;
4. runtime-provided approved artifact storage;
5. inline delivery when no approved persistence capability exists;
6. operating-system temporary storage only as an explicit, policy-approved fallback with its retention and discoverability limitations stated.

Never assume the operating-system temporary directory is safe, durable, private, or accessible to the next agent. Never claim persistence until the artifact can be reopened or otherwise verified.

When no file can be created, provide the full handoff inline and return `PARTIAL` if persistence was part of the requested scope. Return `BLOCKED` only when the receiving workflow requires a persistent artifact and no safe destination or inline transfer is acceptable.

## Privacy, redaction, and retention

- Exclude credentials, tokens, passwords, private keys, session secrets, and raw sensitive authentication material.
- Minimize personal, customer, production, or confidential data. Prefer approved identifiers or links to access-controlled sources over copied content.
- Record that redaction occurred without reproducing the sensitive value.
- Do not weaken project retention, residency, audience, or access policy for convenience.
- If a required detail cannot be transferred safely, state the limitation and point to the approved owner or secret/resource reference.
- Avoid copying large source artifacts into a less protected handoff merely to make it “self-contained.”

## Build the handoff

Use this minimum envelope. Include the transferred source-workflow section only when a material upstream Workflow Result actually exists and can be referenced; otherwise omit it rather than manufacturing a source state from project summaries.

```markdown
# Handoff

## Goal of the next session

## Transferred source workflow result (optional)
- Owner skill / workflow:
- State: READY | PARTIAL | BLOCKED | FAILED
- Subject / revision:
- Evidence / blockers:
- Canonical source/result reference:

## Handoff delivery
- Delivery workflow state: READY | PARTIAL | BLOCKED | FAILED
- Delivery mode: persisted | inline
- Persistence result:
- Access / retention limitations:

## Current project state
## Canonical work item and truth locations
## Decisions already made
## Artifacts and evidence to inspect
## Changes already made
## Verification and observed results
## Unresolved contradictions, blockers, and risks
## Protected state and actions not authorized
## Exact next loop
## Next owner and route
## Suggested available skills and required capabilities
## Persistence, privacy, and retention result
```

Do not infer a source workflow state from project/task/artifact status, maturity, or summary prose. The transferred source workflow result is a referenced upstream control result, not a new status owned by Handoff. If machine control metadata is materialized, the machine-facing control record for this execution represents the Handoff workflow itself; transferred upstream control data stays explicitly labeled as referenced source state.

The handoff must distinguish:

- completed and verified work;
- completed but unverified work;
- attempted and failed work;
- work not attempted;
- decisions owned elsewhere;
- side effects that were not authorized;
- runtime capabilities required for the next loop.

## Reference instead of duplicate

For existing specs, plans, ADRs, issues, diagrams, commits, diffs, test reports, logs, and generated artifacts:

- reference the canonical path, resource ID, commit, or URL;
- state why the next agent should open it;
- include only the minimum excerpt needed to explain relevance or contradiction;
- do not create a shadow copy of status or acceptance truth.

When a referenced artifact may not be accessible in the next runtime, say so and identify the capability or permission required. Do not copy restricted content as a workaround.

## Suggested skills and capabilities

Suggest only skills confirmed available in the current installed manifest or runtime discovery. If a useful skill is not confirmed available, list it as a **requirement**, not as an instruction to invoke it.

For every suggestion, state:

```yaml
skill_or_capability:
availability: AVAILABLE | UNAVAILABLE | UNKNOWN
why_needed:
input_to_provide:
expected_output:
fallback_if_unavailable:
```

Do not recommend a skill merely because its name sounds relevant. Preserve routing and ownership; a supporting skill must not be presented as the owner of a decision it does not own.

## Verify and deliver

Before completion:

1. reopen or inspect the persisted artifact when one was written;
2. confirm canonical references resolve as far as the current runtime permits;
3. confirm sensitive values are absent;
4. confirm the Handoff delivery state matches this execution's evidence, and confirm any transferred source workflow result matches its cited upstream owner/result rather than ledger wording;
5. confirm the next action is executable and names its owner, required input, and capability;
6. report the exact persistence result, path/resource, retention assumption, and access limitation.

## Completion truth

These states describe the **Handoff delivery workflow**, not the transferred source workflow and not project/task/artifact maturity. Preserve any upstream workflow state separately with its owner/workflow identity and canonical reference.

- `READY` — the continuation state is complete for the declared next session, canonical references and evidence are truthful, privacy rules are satisfied, and the delivery method is verified.
- `PARTIAL` — useful handoff content is delivered, but persistence, reference access, verification, or part of the next-session context remains unresolved.
- `BLOCKED` — safe transfer cannot occur because of privacy/retention policy, missing required destination, missing owner decision, or inaccessible canonical evidence.
- `FAILED` — the handoff artifact or write cannot be trusted, includes prohibited content, contradicts inspected evidence without disclosure, or reports persistence that did not occur.
