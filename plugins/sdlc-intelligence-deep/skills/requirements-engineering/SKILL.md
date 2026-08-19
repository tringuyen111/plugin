---
name: requirements-engineering
description: Engineer authoritative requirement meaning from the strongest applicable sources and authority. Use for Business Analysis, requirement elicitation/clarification, requirement conflicts or shared-understanding gaps, and direct work on user stories, use cases/scenarios, acceptance criteria, business rules/decision tables, quality requirements/NFRs, transition needs, or requirements document projections. Select only the semantic representations that change the decision. Do not invent Product scope/priority, domain meaning, Design, Architecture, implementation, QA/UAT evidence, release decisions, or risk acceptance.
---

# Requirements Engineering

Turn the strongest applicable Product/domain/policy/current sources, explicit decisions, and unresolved proposals into the **minimum sufficient coherent requirement meaning** needed by the current decision and its real consumers. Own one Requirements evidence chain from source/authority binding through ambiguity resolution, semantic representation, shared-understanding/completeness pressure, and downstream projection.

Do not turn requirement techniques or artifact formats into lifecycle phases. A Story, Use Case, Acceptance Criterion, Business Rule, Quality Requirement, state model, decision table, example, or requirements document is a representation chosen because its information shape improves a decision.

## Reality and authority kernel

1. **Bind the strongest current sources before asking.** Inspect Product/domain decisions at their actual authority, existing requirements, policy/contract/regulation, relevant current product/runtime/process behavior, proposals/assumptions, and evidence that can change the requirement decision. Formal approval is not a prerequisite for analysis; preserve unresolved or proposed target meaning at its truthful altitude. A claim about current behavior must be grounded in inspectable current truth when available.
2. **Separate source from authority and truth altitude.** Keep `CURRENT_VERIFIED`, `TARGET_AUTHORIZED`, and `PROPOSED_OR_ASSUMED` distinct. A mismatch is evidence, not permission to choose.
3. **Locate the uncertainty frontier.** Ask/inspect only where the answer can change requirement meaning, authority, scope, acceptance, quality, transition, shared understanding, or downstream work.
4. **Select the smallest faithful representation.** Load only the branch whose semantic mechanism can change the current decision. Multiple branches may compose inside the same Requirements evidence chain; do not create a host-Skill handoff merely because representation changes.
5. **Pressure the model.** Use counterexamples, boundary cases, conflict diagnosis and shared-understanding checks proportionally. When evidence falsifies a requirement assumption, re-enter at the earliest false meaning/authority decision instead of polishing downstream wording.
6. **Project, do not duplicate truth.** Persist governed artifacts only when project-native identity/location/authority are real. PRD/BRD/SRS-like documents are audience projections over canonical truth unless project authority explicitly says otherwise.

When the BA problem itself is ambiguous, conflicted, cross-stakeholder, transition-heavy, or vulnerable to document/template theater, read [BA Requirements Reasoning](references/REQUIREMENTS-REASONING.md).

When state, interruption, UNKNOWN outcome, partial commitment, duplicate/retry intent, multi-actor conflict, effective time, or current-target divergence changes business-visible meaning, read [Behavior Semantics Contract](references/BEHAVIOR-SEMANTICS-CONTRACT.md).

When durable cross-view governance or a requested requirements-document projection is material, read [Requirements Composition](references/REQUIREMENTS-COMPOSITION.md).

## Conditional semantic branches

Load only the branch that is decision-material. Direct requests may enter a branch immediately when its source meaning is already sufficiently grounded.

| Need | Load | Optional depth | Completion focus |
|---|---|---|---|
| backlog-sized actor value / coherent value slice | [User Story Method](references/USER-STORY-METHOD.md) | [Story Slicing](references/USER-STORY-SLICING-CONTRACT.md); [Governed Story Format](references/USER-STORY-FORMAT.md) | actor + capability + value + coherent slice + unresolved truth |
| actor goal, declared solution boundary, main/alternate/error interaction | [Use Case Method](references/USE-CASE-METHOD.md) | [Scenario Continuity](references/SCENARIO-CONTINUITY.md); [Governed Use Case Format](references/USE-CASE-FORMAT.md) | meaningful goal + boundary + grounded scenario set + postconditions |
| item-specific observable acceptance / negative guarantees | [Acceptance Criteria Method](references/ACCEPTANCE-CRITERIA-METHOD.md) | [Acceptance Continuity](references/AC-CONTINUITY.md); [Acceptance Set Quality](references/AC-SET-QUALITY.md); [Governed AC Format](references/AC-FORMAT.md) | observable acceptance partitions without invented policy/test mechanics |
| policy, permission, eligibility, validation, formula, obligation, exception, precedence | [Business Rule Method](references/BUSINESS-RULE-METHOD.md) | [Decision Table Contract](references/DECISION-TABLE-CONTRACT.md); [Governed Business Rule Format](references/BUSINESS-RULE-FORMAT.md) | authoritative declarative directive + applicability + result + precedence/exception truth |
| measurable quality/conformance condition, including NFRs | [Quality Requirement Method](references/QUALITY-REQUIREMENT-METHOD.md) | [Quality Claim Contract](references/QUALITY-CLAIM-CONTRACT.md); [Governed Quality Requirement Format](references/QUALITY-REQUIREMENT-FORMAT.md) | falsifiable normative quality target + verification intent, distinct from current baseline |
| temporary capability/condition needed only to move current -> future state | [Transition Requirement Method](references/TRANSITION-REQUIREMENT-METHOD.md) | — | grounded transition obligation + continuity/integrity boundaries + explicit exit/retirement truth |

### Branch composition rules

- If an AC exposes an unknown policy/threshold/formula, load the **Business Rule** branch, resolve or expose that authority gap, then return to AC in the same evidence chain.
- If a Story boundary depends on detailed actor-system sequence, load the **Use Case** branch only for that ambiguity; do not require every Story to have a Use Case.
- If quality wording depends on a business flow/permission/policy rather than a measurable quality property, use the corresponding Use Case/Business Rule/AC branch instead of forcing it into an NFR.
- If a migration/cutover need exists only until the future state is established, use the **Transition Requirement** branch. Keep permanent product/service behavior in the functional/quality/rule branches and implementation sequencing/mechanics with Engineering/DevOps.
- If concept identity, vocabulary, relationship/role meaning, lifecycle identity, or semantic context itself is unresolved, compose `/domain-modeling`. Domain Modeling owns semantic coherence and remains independently accountable; this Skill does not absorb it.

## Product and downstream boundaries

- If the problem/opportunity itself is unsupported or materially uncertain, use `/product-discovery`; do not manufacture a requirement-ready problem.
- If Product outcome, capability scope, priority, or Product commitment is materially unresolved, return only that decision to `/product-definition`.
- Product/domain/policy authority owns normative Product/rule/quality decisions. Requirements Engineering may preserve a proposal but cannot authorize it by wording.
- Product Design owns interaction realization; Architecture/Engineering own technical realization; `/verify-quality` owns executable QA proof and observed QA verdict; `/user-acceptance` owns business acceptance coverage, witnessed user/business evidence, evaluation, and any explicit authorized acceptance decision; release/risk owners retain their authority.
- A current implementation can evidence `CURRENT_VERIFIED`; it does not automatically authorize `TARGET_AUTHORIZED` semantics.

## Completeness and shared understanding

For multi-view or materially ambiguous work:

1. Reconstruct only the decision-material `Change / Need / Value / Stakeholder / Context` dimensions.
2. Relate business, stakeholder, functional, quality and temporary transition meaning only where the relation changes rationale, scope, conflict, traceability or interpretation.
3. Diagnose disagreement before negotiating: terminology/context/applicability mismatch, evidence disagreement, authority/supersession, genuine incompatible needs, or governance/relationship conflict.
4. Where divergent interpretation would change action, prove shared meaning through the smallest useful prediction, application, classification, example, walkthrough, state model, decision table, scenario, or prototype. Stakeholder confidence or “yes” is not proof.
5. Attack completeness with a plausible in-scope counterexample: could every written requirement pass while the authorized need/value still fails? Open only the smallest missing semantic question.
6. Verify representation quality and validate that satisfying the requirement still addresses the authorized need/value. These are different checks.

## Persistence and artifact identity

Preserve real project-native artifact identities such as `US-17`, `UC-9`, `BR-4`, `AC-12`, or `NFR-3` when they exist. **Artifact identity is not Skill identity.** Removing a former host Skill must never rename, invalidate, or delete canonical project artifacts.

Do not fabricate IDs, revisions, approval states, persistence, traceability links, or execution evidence. A useful inline requirement can be complete for the requested task with persistence `NOT_RUN` when no durable write is required.

## Completion

Return `READY` for the declared Requirements scope only when:

- applicable source/authority and current-vs-target truth are bound honestly;
- material meaning/authority gaps are resolved, proven non-material, or explicitly unresolved with the correct owner;
- selected representations are sufficient for the actual decision/consumer and unrelated representations were not manufactured;
- material conflicts and shared-understanding risks are handled at the needed fidelity;
- no known in-scope counterexample shows all written requirements could pass while the authorized need/value still fails;
- governed persistence, when requested, uses real project-native identity/location/authority and is reopened/verified;
- downstream projections do not invent Product, Domain, Design, Architecture, implementation, QA/UAT, release, or risk truth.

Use `PARTIAL` when useful requirement truth exists but a material branch remains unresolved, `BLOCKED` when missing authority/source prevents meaningful progress on the declared question, and `FAILED` when an attempted authorized write/required validation fails. Requirements `READY` never means QA `PASS`, UAT accepted, released, or risk accepted.
