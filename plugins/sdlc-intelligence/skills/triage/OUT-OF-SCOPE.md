# Rejected-Scope Decision Memory

Rejected-scope decision memory preserves durable product or technical decisions
not to pursue a concept. It prevents the same request from being treated as new
work while preserving the maintainer's authority to reconsider it.

The project must select one canonical provider for this memory. Valid
projections include:

- a tracker decision record or linked canonical work item;
- a repository-owned decision document at a project-authorized path;
- a product decision system or other configured knowledge provider.

A `.out-of-scope/` directory is only a **local repository projection**. Do not
create, read, or write it by assumption. Use it only when the project capability
profile selects it as the canonical representation.

## Record contract

One record represents one rejected concept and contains:

```text
Concept
Decision: REJECTED | RECONSIDERED
Reason
Decision owner
Decision date or revision
Scope and important distinctions
Prior canonical requests/change items
Evidence and related accepted decisions
Canonical provider and record identifier
```

Group semantically equivalent requests under one concept. Do not merge requests
that merely share keywords but have different outcomes, constraints, or users.

The reason must be durable. Prefer product scope, architecture ownership,
policy, cost/benefit, or strategic rationale over temporary statements such as
"not enough time this sprint."

## Read behavior

During triage:

1. Resolve the project-authorized rejected-scope decision memory.
2. If none is configured, state that prior rejection evidence is unavailable;
   do not infer that no prior decision exists.
3. Compare the current request by concept and intended outcome, not keywords.
4. Surface a possible match with its reason, owner, revision, and canonical ID.
5. Ask the decision owner to confirm, distinguish, or reconsider when the match
   changes the triage outcome.

A cached copy or user-supplied record may support `PARTIAL` analysis but cannot
prove current canonical status.

## Write behavior

Write or update a rejected-scope record only when:

- the request is an enhancement or proposed behavior, not a defect;
- the authorized decision owner explicitly rejects it;
- live write capability exists for the selected canonical provider; and
- the current work item can be linked without creating shadow status.

If a matching record exists, append the new canonical request reference and any
new distinctions. Otherwise create one record through the selected provider.
Then update/close the canonical work item through its own provider mapping.
Record both operations and partial failures in the Integration Result Manifest.

Do not create rejected-scope memory for behavior that is already implemented.
Point the requester to the existing capability instead.

## Reconsideration

When the owner reopens a rejected concept, change the canonical record to
`RECONSIDERED` or supersede it according to provider policy. Do not silently
delete history or reopen old work items unless the owner explicitly authorizes
those side effects.
