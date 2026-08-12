---
name: research
description: Collect and verify new evidence for a decision-relevant question using the strongest available sources, distinguish fact from inference and assumption, preserve contradictions, and return or persist a traceable research artifact without assuming a background agent or repository destination. Do not use when the main job is theming an existing product-evidence corpus.
---

<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->

# Research

Research reduces a named uncertainty for a product, architecture, implementation, test, release, or operational decision by collecting or verifying evidence not already available in a sufficient corpus. It does not own the downstream decision merely because it collected evidence.

When interviews, surveys, support reports, feedback, and product data already exist and the main job is to compare, theme, reconcile, and assess product-learning confidence, keep the Product/Learn workflow primary and invoke `/research-synthesis`. Do not launch new source collection merely because the existing corpus is complex.

For external, versioned, conflicting, or incomplete evidence, read [Research Source Authority](SOURCE-AUTHORITY.md).

## Define the research contract

Before collecting sources, state:

- the exact question and the decision it will inform;
- scope, applicable product/version/environment, and time boundary;
- claims that need primary evidence versus areas where interpretation is acceptable;
- required confidence and stopping condition;
- available source capabilities, including web, local source, runtime probe, connector, or subagent;
- requested output form and the approved evidence destination, if persistence is needed.

Do not research a broad topic indefinitely. Decompose it into decision-relevant questions and name what is explicitly out of scope.

## Execution modes

A background agent is optional, not a prerequisite.

Choose the narrowest viable mode:

1. **Inline research** when source access and scope fit the current runtime.
2. **Delegated research** when an available subagent can read the same approved context and its output can be inspected. Delegation does not transfer evidence responsibility; verify its claims and citations.
3. **Hybrid research** when local source/runtime evidence and external sources must be combined.
4. **Narrowed scope** when available context can answer only part of the question; return `PARTIAL` and name the excluded scope.
5. **Blocked research** when required source access, version information, authority, or runtime evidence is unavailable and an answer would be speculative.

Never claim delegation occurred when it did not. Do not block solely because a background agent is unavailable if inline source access is sufficient.

## Research workflow

1. **Build a source plan.** Identify the source owner for each material question. Prefer primary sources and use secondary sources mainly to discover or compare them.
2. **Collect with provenance.** Record source identity, version/date, scope, access date when relevant, and the exact claim it supports.
3. **Separate evidence classes.** Mark each conclusion as `FACT`, `INFERENCE`, `ASSUMPTION`, or `OPEN_QUESTION` using the bundled authority reference.
4. **Cross-check important claims.** Compare documentation with source code, schemas, release notes, runtime behavior, or another owner source when the consequence warrants it.
5. **Handle contradiction explicitly.** Compare authority, version, date, and scope. Preserve unresolved disagreement instead of silently reconciling it.
6. **Assess freshness and applicability.** A current source for the wrong deployed version is not applicable evidence. A stale source may remain useful only with a visible limitation.
7. **Synthesize for the decision.** Explain what the evidence supports, what it does not support, downstream impact, confidence, and the smallest next evidence needed.
8. **Resolve output location.** Use the project capability profile, active project convention, or explicit user instruction. Do not assume a repository path or operating-system temporary directory.
9. **Persist only with authority.** Write only to the approved destination and do not mutate trackers, repositories, cloud documents, or external systems beyond the declared research output.
10. **Verify the artifact.** Reopen or inspect the persisted output, confirm citations and claim classifications are present, and report the actual resource/path. If persistence cannot be verified, return the findings inline and mark the limitation.

## Required research artifact

The output should contain:

```markdown
# Research question

## Decision supported
## Scope and version boundary
## Method and execution mode
## Source authority and source ledger
## Findings
## Inferences
## Assumptions
## Contradictions and unresolved questions
## Confidence and limitations
## Downstream impact
## Recommended next evidence or owner
## Persistence result
```

Citations must be close enough to the claim to make provenance unambiguous. Do not cite a source for a broader claim than it actually supports.

## Completion truth

- `READY` — the declared question is answered to the required decision level, evidence is traceable and applicable, and persistence or inline delivery is truthful.
- `PARTIAL` — useful evidence exists, but scope, freshness, version match, contradiction resolution, or persistence is incomplete.
- `BLOCKED` — required evidence, access, runtime capability, or owner decision is unavailable and continuing would create unsupported claims.
- `FAILED` — the attempted artifact cannot support its declared conclusions or a requested write produced an unverified/unsafe result.

Always report unavailable, stale, contradictory, or unverified sources. Never fill evidence gaps from memory and present them as researched facts.
