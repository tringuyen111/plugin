---
name: improve-codebase-architecture
description: Discover and prioritize architecture-improvement candidates from observed codebase friction, then explore the selected candidate without implementing it. Use before a specific technical boundary has been chosen; detailed module/interface design belongs to `codebase-design`.
---

# Improve Codebase Architecture
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
- **When architecture friction includes duplicate implementations, legacy paths, stale tests, or version sediment:** read [Single Active Truth and Replacement Discipline](../../resources/shared/references/single-active-truth-contract.md) to treat cleanup as a source-truth problem and avoid layering another path over the old one.
<!-- runtime-context:end -->

Surface architectural friction and propose **deepening opportunities**: changes that concentrate implementation complexity behind a smaller, more stable interface. The goal is improved locality, leverage, testability, and AI navigability—not a visually cleaner diagram or a lower file count.

Use `/codebase-design` as the supporting architecture vocabulary and decision method. Use the terms **module**, **interface**, **implementation**, **depth**, **deep**, **shallow**, **seam**, **adapter**, **leverage**, and **locality** consistently. Read the project's domain glossary and relevant ADRs when they exist and are reachable; do not invent or require those files.

## Preconditions

- Declare the requested scope as `DISCOVERY_ONLY` or `DISCOVERY_AND_EXPLORE`. `DISCOVERY_ONLY` ends after evidence-grounded candidate/no-change prioritization; `DISCOVERY_AND_EXPLORE` also requires selection and the requested selected-candidate exploration.
- A repository or source snapshot is available for inspection, or the workflow is `BLOCKED`.
- The request concerns observed change/debugging/test friction rather than a generic desire to “clean up architecture.”
- Product outcomes, business rules, acceptance criteria, and approved design intent remain owned elsewhere.
- No repository or project write occurs before the user selects a candidate and authorizes the corresponding artifact update.

## Process

### 1. Establish evidence

Inspect source, callers, tests, runtime entry points, representative failures, and recent change patterns where available. Use an isolated exploration agent only when the host supports it; the workflow must still work with direct source inspection.

Map observed friction:

- understanding one concept requires bouncing through many shallow modules;
- callers know implementation detail across a supposed seam;
- one behavior requires scattered edits or duplicate truth;
- pure helpers were extracted for test convenience while representative behavior remains untestable;
- failures are hard to observe at the current interface;
- two or more real adapters justify a seam, or the proposed seam remains hypothetical.

Apply the deletion test: deleting a suspected shallow module should concentrate complexity behind a better owner, not merely move the same complexity elsewhere.

A candidate is eligible only when direct evidence supports it. File length, framework preference, an attractive after-diagram, or “fewer files” is not evidence.

Treat duplicate old/new implementations, stale tests, hidden fallbacks, and pre-release version branches as single-active-truth findings. Prefer replacing and deleting a proven superseded surface over adding another abstraction layer. Preserve coexistence only when a named current consumer and compatibility contract justify it.

### 2. Build candidate records

For every eligible candidate record:

- files/modules and representative callers;
- observed problem and evidence;
- current truth owner and proposed owner;
- proposed deep interface and hidden implementation responsibility;
- locality and leverage gains;
- representative test or runtime seam;
- migration, compatibility, and rollback path;
- ADR conflict, if any;
- proof plan;
- recommendation strength: `Strong`, `Worth exploring`, or `Speculative`.

Do not propose detailed interfaces before the user selects a candidate. It is acceptable to find no eligible candidate; return `READY` with the evidence inspected and explain why no architecture change is justified.

### 3. Present through the best available artifact

The architecture analysis is the capability. HTML rendering is optional.

Choose in this order:

1. **Authorized visual artifact** — when local write and rendering/open capabilities are available and permitted, create a self-contained HTML report using [HTML-REPORT.md](HTML-REPORT.md). Do not require network access, Tailwind, Mermaid, a browser opener, or an OS-specific temp path.
2. **Conversation or Markdown report** — when rendering or local write is unavailable, present the same candidate records and compact text/ASCII before/after diagrams directly in the response or in an authorized Markdown artifact.
3. **Blocked** — only when source inspection itself is unavailable or the requested evidence cannot be established.

When a file is written, use a project-authorized output location or a safely resolved temporary directory, report the exact path, and do not claim it was opened unless an opener actually succeeded. A lower-fidelity presentation is explicit but does not invalidate the architecture analysis.

End with one top recommendation. When the declared scope is `DISCOVERY_AND_EXPLORE`, ask exactly one selection question: **Which candidate should we explore?** For `DISCOVERY_ONLY`, do not force selection or grilling merely to make the workflow complete.

### 4. Explore the selected candidate and escalate only material decisions

After the user selects a candidate, **inspect the selected candidate** through its source, representative callers, tests, runtime evidence, linked decisions, and compatibility surface before asking the human. Deepen the evidence for constraints, dependencies, likely seam/ownership movement, implementation responsibility that should be hidden, migration, compatibility, rollback, and proof without turning this workflow into detailed technical design.

Use `/grilling` only when that inspection leaves a **material unresolved branch that the human decision owner must answer**. Follow the grilling contract: resolve source-inspectable factual questions instead of shifting them to the human for convenience, recommend one evidence-grounded answer, and ask only the highest-impact unresolved owner decision. If no such human-owned branch remains, complete the selected-candidate exploration without an interview. If the required decision owner is unavailable, preserve the unresolved decision and route it instead of grilling the wrong person.

Use `/domain-modeling` only when the user authorizes durable project updates:

- update a glossary term only when the project glossary exists or the user authorizes creating it;
- update an ADR only when a durable architecture decision has actually been accepted;
- when a rejected candidate has a load-bearing reason, offer an ADR rather than writing one automatically;
- use `/codebase-design` when selected exploration reaches a **fixed technical** module/interface decision that needs detailed alternatives, migration/rollback design, or proof planning. Candidate exploration may frame that decision; it does not take over the technical-design owner.

## Completion

- `READY` for `DISCOVERY_ONLY` when evidence-grounded candidates are prioritized and presented with limitations, or when the inspected evidence justifies **no eligible candidate / no architecture change**. Selection is not required for that declared scope.
- `READY` for `DISCOVERY_AND_EXPLORE` only after an eligible candidate is selected and the requested selected-candidate exploration is complete, with unresolved decisions and the next owner explicit. A candidate list alone is not whole-workflow completion in this mode.
- `PARTIAL` while evidence collection remains open, or while candidate selection / selected-candidate exploration remains open for `DISCOVERY_AND_EXPLORE`.
- `BLOCKED` when representative source/evidence is unavailable or required authority is missing.
- `FAILED` when an authorized artifact/render/write operation fails and no explicit fallback preserves the analysis.

The workflow does not implement the refactor, approve product or business changes, declare QA acceptance, or claim that an unrendered artifact was rendered.
