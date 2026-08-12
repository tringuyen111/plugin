---
name: test-condition
description: Define or review one supporting, traceable QA condition for an acceptance criterion, NFR, business rule, state, defect risk, integration, or regression boundary. Use to specify an observable probe, environment, data, expected/negative behavior, evidence, cleanup, and result semantics; do not claim the probe ran or issue the overall QA verdict.
---

# Test Condition
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->


Define one independently executable verification contract. This supporting skill owns the condition definition only; `/verify-quality` owns execution coverage, evidence admission, the observed execution result, and the overall QA verdict. Test Conditions are not implementation code and do not replace Acceptance Criteria. A fresh condition definition always starts with observed result `NOT_RUN`; authoring completion never means the probe ran.

Read [TEST-CONDITION-FORMAT.md](TEST-CONDITION-FORMAT.md).

## Condition fixed point and oracle freshness

Bind each material condition definition to an exact `condition_revision` and the
source identity + source revision (or immutable digest/record version when the
source system has no revision field) for every AC, NFR, Rule, risk, defect,
Visual Contract, ADR, or regression artifact that controls the condition.
Logical ID continuity does not prove the source meaning is unchanged.

Keep **definition freshness** separate from observed execution result:

```text
CURRENT | STALE | CONFLICTING | UNVERIFIED
```

`CURRENT` requires the material source bindings to resolve to the exact meaning
used by the bounded claim, falsifier, preconditions, probe authority,
expected/negative oracle, and evidence intent. A missing material source
revision/digest is `UNVERIFIED`, not current. Conflicting authoritative source
meaning is `CONFLICTING`; preserve the conflict and route it to the canonical
source owner rather than inventing an oracle.

A material source revision makes the affected condition definition `STALE`.
Revalidate the bounded claim, falsifier, substituted/probe boundary and
authority, preconditions/data constraints, expected and negative oracle, and
evidence/limitation intent against the new source fixed point, then advance the
condition revision before treating it as current again. Editorial/source-owner
confirmed semantic equivalence may preserve/revalidate current meaning only with
inspectable evidence.

Derive the expected/negative **oracle from authorized/current source truth**, not
from whatever the implementation currently does. Current implementation or
runtime behavior may be recorded as observed context or a discovered deviation;
it does not silently redefine the condition's target oracle.

Historical execution evidence and observed results remain bound to the exact old
condition revision, source fixed point, candidate, environment/data/config and
execution evidence. They **do not carry forward** to a materially revised
condition. A new or revised current definition starts observed result `NOT_RUN`
until `/verify-quality` executes/adopts evidence for that exact fixed point.

## Process

1. **Trace and bind the source.** Link the exact AC, NFR, Rule, risk, defect,
   Visual Contract, ADR, or regression source identity plus revision/immutable
   digest that controls the condition. Reject orphan or unversioned material
   conditions as current proof; preserve missing/conflicting source truth.
2. **Choose the observable boundary and claim.** User, API consumer, event
   subscriber, database invariant, operational signal, screen state, or other
   real consumer. State the exact claim this condition can prove and the
   observation that would falsify it.
3. **Set preconditions and environment.** Include version, permissions,
   feature flags, dependency state, data, clock, locale, network, and device as
   relevant.
4. **Define the trigger or probe and its authority.** Use reproducible actions
   or a precise command. Name any production/runtime boundary replaced by a
   mock, fake, stub, snapshot, simulator, or fixture, and narrow the claim to
   what the probe can actually falsify. A substitute is allowed when it proves
   the intended seam, but it cannot silently inherit authority for a boundary it
   does not exercise. Avoid framework detail unless the condition is already
   automated.
5. **Define expected and negative behavior.** State postcondition, side effects,
   unchanged state on failure, error surface, and forbidden outcome.
6. **Define evidence and limitations.** Name output, response, screenshot, log,
   query, trace, metric, manifest, or UAT record and how integrity is preserved.
   State why this evidence can falsify the bounded claim, what relevant boundary
   it does not exercise, and what complementary evidence is required for any
   wider claim.
7. **Define cleanup and repeatability.** Include idempotency, rollback, test data
   lifecycle, and contamination risks.
8. **Define execution-result semantics and ownership.** Preserve the exact condition revision/source fixed point in the handoff. The allowed execution results are `PASS`, `FAIL`, `INCONCLUSIVE`, `NOT_RUN`, and `NOT_APPLICABLE`, but a fresh or materially revised authored condition records observed result `NOT_RUN`. This skill does not transition that result merely because the definition is complete or a user asks to mark it passed. `/verify-quality` may transition the observed result only after binding the exact condition/source revision set, candidate, environment/data/configuration, producer/command, execution time, and admitted evidence. `NOT_APPLICABLE` additionally requires a source-backed applicability rule, scope, and owner; it is not an authoring shortcut.
9. **Classify automation.** Existing automated, automation candidate,
   exploratory/manual, environment-only, or UAT.

## Completion

`READY` means the condition definition has an exact condition/source fixed point with `CURRENT` definition freshness, a bounded claim and falsifier, observable boundary, preconditions, environment/data, a reproducible probe with explicit authority/substitutions, source-backed expected and negative oracle, evidence contract plus limitations, cleanup, repeatability, automation class, and execution-result vocabulary/ownership. `STALE`, `CONFLICTING`, or `UNVERIFIED` definition freshness cannot be laundered into a current `READY` oracle. A newly authored or materially revised current condition still has observed result `NOT_RUN`. A non-`NOT_RUN` result requires `/verify-quality` evidence admission for the exact condition/source and fixed candidate/environment; this skill must not prescribe production implementation, execute cleanup/destructive steps, or silently change acceptance.
