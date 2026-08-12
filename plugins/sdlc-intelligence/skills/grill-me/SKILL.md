---
name: grill-me
description: Run a stateless one-question-at-a-time challenge of a concrete plan or design, ending with an in-conversation decision register and no project writes.
---

# Grill Me

<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map unresolved decisions and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before handing off the settled understanding:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to reference source truth, unresolved items, evidence, affected artifacts, and the next owner without creating project state.
<!-- runtime-context:end -->

Use this explicit entrypoint when the user wants a concrete plan or design
challenged conversationally but does **not** want the session to write or
maintain project documentation.

`/grilling` owns the reusable one-question-at-a-time interview method. This
skill owns the stateless session boundary, decision register, and final handoff.
Use `/grill-with-docs` instead when resolved terminology or qualifying
architectural decisions must be preserved in project artifacts.

## Preconditions

- A concrete plan, design, proposal, or decision target is available.
- The human participating in the session can answer for the decisions being challenged.
- Durable project writes are not part of this invocation.

When the target is absent or too vague to identify its decision branches, ask
one scoping question and remain `PARTIAL`. Do not invent a plan to grill.

## Workflow

1. **Fix the subject.** Name the plan/design, intended outcome, explicit non-goals, and the fixed source or revision being challenged.
2. **Separate facts from decisions.** Inspect available source, code, artifacts, and runtime evidence for factual questions. Ask the user only for decisions, preferences, authority, or unavailable context.
3. **Map the decision tree.** Identify material branches such as actors, states, dependencies, constraints, failure responses, evidence, rollout, and ownership. Do not dump the whole tree as a questionnaire.
4. **Run `/grilling`.** Ask exactly one unresolved decision question at a time, include a recommended answer and rationale, then wait for the user's response. Do not answer on the user's behalf and do not enact the plan.
5. **Maintain an in-conversation decision register.** After each resolved answer, record the decision, rationale, rejected alternative when material, affected branches, and any new contradiction or dependency.
6. **Challenge closure.** Before declaring shared understanding, test the settled plan against important edge cases, conflicting decisions, failure paths, authority gaps, and success evidence.
7. **Hand off.** Summarize settled decisions, assumptions, rejected alternatives, unresolved items, affected artifacts, and the next owner. Reference existing project truth but do not write, supersede, or create project artifacts.

## Boundaries

- Do not write `CONTEXT.md`, ADRs, specs, tickets, code, tests, or tracker state.
- Do not approve Product, BA, Design, Architecture, Engineering, QA, UAT, Operations, or release decisions.
- Do not replace source inspection with questions the repository or runtime can answer.
- Do not ask multiple decision questions in one turn.
- Do not declare the interview complete merely because one useful answer was obtained.

## Completion

- `READY`: the user confirms shared understanding, all material branches are resolved or explicitly accepted as assumptions, and the stateless decision register plus any required next-owner routing/continuation need is complete.
- `PARTIAL`: the subject is usable and progress was made, but the live interview, source inspection, or material decision branches remain unresolved.
- `BLOCKED`: the plan/design, required decision owner, or authoritative source needed to continue is unavailable.
- `FAILED`: a required inspection or operation was attempted and failed; report the exact failure. No project write fallback is allowed.
