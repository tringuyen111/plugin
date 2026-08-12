---
name: grill-with-docs
description: Stress-test a concrete plan or design one question at a time while preserving resolved domain vocabulary and qualifying architectural decisions. Use only when the user wants both the interview and durable domain-model artifacts.
---

# Grill With Docs

<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to report READY, PARTIAL, BLOCKED, or FAILED truthfully.
- **Before persisting or handing off a resolved proposal:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner.
- **Before changing ownership or writing project artifacts:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) and preserve `/grilling` as the interview owner and `/domain-modeling` as the glossary/ADR owner.
- **Before any repository write:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) and verify authority.
- **Before choosing artifact locations or fallbacks:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md).
<!-- runtime-context:end -->

Use this preset only when all are true:

1. A concrete plan or design is available.
2. The user wants it challenged one question at a time.
3. The user also wants resolved terminology or qualifying decisions preserved in the project domain model.

Otherwise use `/grill-me` for a stateless interview or `/domain-modeling` for documentation without a grilling session.

## Workflow

1. Read the plan/design, relevant source facts, and the project-selected glossary/decision artifacts resolved through the capability profile. Do not assume `CONTEXT.md`, `CONTEXT-MAP.md`, or `docs/adr/` exists.
2. Run `/grilling`: ask one decision question at a time, recommend an answer, wait for the user's decision, and do not enact the plan.
3. After each resolved answer, ask `/domain-modeling` to classify zero or more durable effects: glossary entry, qualifying ADR/decision record, both, or neither. `/domain-modeling` resolves the canonical destination and format.
4. Write only when authority, canonical artifact location, and write capability are verified. If writing is unavailable or denied, preserve the resolved proposal inline and report the limitation.
5. Surface conflicts with existing vocabulary, ADRs, or source behavior instead of silently choosing a side.
6. Hand off to `/to-spec` only after shared understanding is reached and any required documentation writes are verified or explicitly deferred.

## Non-goals

- Arbitrary PDF, DOCX, spreadsheet, website, or document analysis.
- Generic brainstorming without a concrete plan/design.
- External research, implementation, acceptance changes, or lifecycle decisions.
- Owning glossary/ADR rules already owned by `/domain-modeling`.

## Completion

- `READY`: the requested interview is complete and every authorized documentation write is verified, or no durable write was required.
- `PARTIAL`: useful decisions were reached but questions or documentation writes remain unresolved, unavailable, or denied.
- `BLOCKED`: a required source, decision owner, or project truth location is unavailable.
- `FAILED`: an attempted write or required operation failed; report the exact failure and do not claim the artifact was updated.
