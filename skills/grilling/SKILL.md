---
name: grilling
description: Apply the reusable one-question-at-a-time decision interview inside an owning workflow. Use when a concrete plan or design has unresolved branches and the human decision owner must answer them; inspect facts instead of asking, recommend one answer, wait, and never write or enact the plan.
---


<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
<!-- runtime-context:end -->
Apply a disciplined decision interview to a concrete plan or design. This skill owns only the interview method. The caller owns the session boundary, decision register, durable documentation, and downstream handoff.

## Required input

Resolve before the first decision question:

- the concrete plan/design and fixed revision being challenged;
- intended outcome and explicit non-goals;
- the human decision owner participating in the session;
- known decision branches and source/runtime facts already available;
- the caller-owned place where resolved answers are being tracked in memory or an authorized artifact.

If no concrete target exists, return `PARTIAL` and ask one scoping question. Do not invent a plan or dump a generic questionnaire.

## Direct-selection boundary

This skill is a supporting interview method, not a standalone session owner. When an owning
workflow invokes it, keep that caller's session boundary and return decisions to that caller.

If the user explicitly selects `grilling` without a caller/session contract:

- do not invent a caller-owned decision register, durable artifact, or downstream authority;
- for a stateless/no-write concrete-plan challenge, return a bounded `PARTIAL` handoff to
  `/grill-me`;
- when the requested session also needs authorized glossary/ADR capture, return a bounded
  `PARTIAL` handoff to `/grill-with-docs`;
- when the intended session boundary is still ambiguous, ask only the minimum question needed
  to resolve it.

Direct selection never authorizes persistence or converts this method into a session owner.

## Interview method

1. **Separate facts from decisions.** Inspect source, code, artifacts, or runtime evidence for factual questions when available. Ask the human only for preferences, trade-offs, authority, risk acceptance, or unavailable context.
2. **Choose one frontier question.** Select the highest-impact unresolved branch whose answer unlocks later branches. Do not ask multiple questions in one turn.
3. **Make the question decision-ready.** State why it matters, relevant constraints, the recommended answer, rationale, and material alternative. Avoid leading the user by hiding trade-offs.
4. **Wait for the answer.** Do not answer on the user's behalf, continue to the next branch, or enact the plan before the response.
5. **Return the resolution to the caller.** Provide the decision, rationale, rejected alternative when material, affected branches, contradictions, assumptions, and next frontier question. The caller decides whether to keep it only in conversation or persist it through another skill.
6. **Adapt the tree.** Add newly exposed branches, remove branches made irrelevant by the answer, and surface conflicts with earlier decisions or authoritative source.
7. **Challenge closure.** Before shared understanding, test failure paths, dependencies, ownership, evidence, rollout/rollback, and success criteria that are material to the declared scope.

## Boundaries

- No project, tracker, glossary, ADR, spec, ticket, code, test, or deployment writes.
- No Product, BA, Design, Architecture, Engineering, QA, UAT, Operations, or Release approval.
- No source-inspectable factual question should be shifted to the human for convenience.
- No multi-question batches and no self-answered interview.
- No plan execution before the caller and human confirm closure.

## Completion

- `READY` — the declared interview scope is exhausted, material branches are resolved or explicitly accepted as assumptions, and the human confirms shared understanding.
- `PARTIAL` — one or more useful decisions exist but the live interview or material branches remain open. A normal single-question turn is `PARTIAL`.
- `BLOCKED` — the concrete target, decision owner, or authoritative fact required for the next question is unavailable.
- `FAILED` — an attempted required inspection failed and the next decision cannot be framed truthfully.
