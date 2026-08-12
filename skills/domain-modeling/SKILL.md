---
name: domain-modeling
description: Sharpen a project's domain terminology, entities, relationships, invariants, and accepted decision context, then update authorized glossary or ADR artifacts when durable capture is warranted. Do not choose code module seams, architecture candidates, or business policy merely because domain language is involved.
---

# Domain Modeling
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->


Actively build and sharpen the project's domain model as you design. This is the *active* discipline — challenging terms, inventing edge-case scenarios, and preserving accepted terminology and decisions when authorized. Merely reading an existing glossary is not this skill; use it when the model itself is changing.

This skill owns domain-language coherence and durable capture of accepted context. It does not own Product policy, BA business-rule approval, code module/interface design, architecture-candidate discovery, or implementation.

## Resolve canonical artifact locations

Read the project capability profile and current conventions before assuming a path. A project may use a root glossary, bounded-context glossaries, a knowledge platform, tracker documents, or another approved store. Common file conventions such as `CONTEXT.md`, `CONTEXT-MAP.md`, and `docs/adr/` are examples only, not mandatory defaults.

- If an authorized glossary or ADR location exists, update that canonical artifact.
- If no durable location exists but the user authorizes creating one, choose the smallest project-consistent location and record the new convention.
- If write authority or canonical location is unresolved, return the proposed terms/decision inline as `PARTIAL`; do not create repository files by assumption.
- Create artifacts lazily only after a term or qualifying decision is actually resolved.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with the selected canonical glossary, call it out immediately. Apply `CONTEXT.md` only when the project selected that convention. For example: "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account' — do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?"

### Update the canonical glossary when authorized

When a term is resolved, update the project-selected glossary promptly rather than allowing conversation-only drift. Use [CONTEXT-FORMAT.md](CONTEXT-FORMAT.md) when the project adopts a `CONTEXT.md` convention; otherwise preserve the same semantic fields in the approved store.

A glossary should be devoid of implementation details. Do not treat it as a spec, scratch pad, architecture design, or business-rule approval surface.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [ADR-FORMAT.md](ADR-FORMAT.md).

## Completion

`READY` requires resolved terminology or decision context, explicit source and
ownership, conflicts surfaced, and every authorized glossary/ADR write reopened
and verified. Use `PARTIAL` when useful proposals exist but authority, canonical
location, or persistence is unresolved; `BLOCKED` when a required owner or
source cannot be obtained; and `FAILED` when an attempted write or validation
fails. A conversation-only proposal must not be reported as a durable update.
