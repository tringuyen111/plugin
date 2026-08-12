---
name: research-synthesis
description: Synthesize an existing corpus of interviews, surveys, support reports, feedback, and product data into traceable product findings. Use when another Product or Learn workflow must compare, theme, reconcile, or assess confidence without losing provenance; do not use as a substitute for collecting or verifying missing primary evidence.
---

# Research Synthesis
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
<!-- runtime-context:end -->


Turn an existing evidence corpus into findings that remain traceable to its sources. This supporting skill does not own source collection or a top-level route; Product Discovery or Learn remains primary.

This skill owns synthesis quality. It does not set product priority, define
acceptance criteria, choose a design, or claim statistical certainty unsupported
by the input.

Read `EVIDENCE-CONTRACT.md` before producing findings.

## Preconditions and collection boundary

Require a named corpus with source identity, collection context, and enough readable material to support synthesis. If a material claim requires new external, versioned, or primary-source evidence, hand that question to `/research` and keep the synthesis `PARTIAL` until the returned evidence is linked. If the input is a single supplied document and only a summary is requested, summarize it directly rather than invoking this skill.

## Process

1. **Inventory sources.** Record type, source, date, population or segment,
   collection method, and material limitations.
2. **Extract observations.** Keep direct observations separate from researcher
   interpretation and proposed action.
3. **Code themes.** Group recurring needs, behaviors, workarounds, failures, and
   motivations. Preserve outliers that may signal a high-impact edge case.
4. **Triangulate.** Compare qualitative and quantitative sources. Record where
   they reinforce, qualify, or contradict one another.
5. **Assess confidence.** Consider source authority, recency, sample shape,
   consistency, and directness. Frequency is not automatically importance.
6. **Write findings.** Each finding names evidence, affected segment, impact,
   confidence, and caveats.
7. **Route implications.** Product may convert findings into opportunities;
   BA may use them to clarify behavior; Design may use them for journeys. Mark
   those as implications, not decisions already approved.

## Completion

`READY` requires:

- every finding traces to one or more sources;
- observations and interpretations are separated;
- conflicting evidence is visible;
- sample and collection limitations are recorded;
- confidence is justified;
- recommendations are labeled as recommendations;
- no unsupported persona, market size, or priority is invented.
