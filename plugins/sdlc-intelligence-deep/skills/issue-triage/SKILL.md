---
name: issue-triage
description: 'Assess an existing incoming issue, PR, or change request whose claim, disposition, or actionability is uncertain. Use for unnormalized intake or explicit re-triage: bind the canonical item and current evidence, verify or bound the claim, determine disposition, and identify the next accountable continuation. Do not make triage a mandatory stage for direct planning, requirements, or implementation work.'
---

# Issue Triage

Turn an uncertain **incoming issue, PR, or change request** into grounded intake truth, a truthful disposition, and the next accountable continuation. This Skill owns intake judgment on an existing canonical work item; it does not own requirements, technical planning, implementation, approval, or generic work management.

A tracker label or state is a provider projection, not the capability model. Preserve project-native categories and workflow when they exist instead of forcing universal `bug|enhancement` or `ready-for-*` labels.

## Capability model

```text
INCOMING ITEM
    |
    v
BIND ORIGIN + CANONICAL TRUTH
    |
    v
VERIFY / BOUND CLAIM
    |
    +--------------------+
    |                    |
    v                    v
ACTIONABILITY        DISPOSITION
    |                    |
    +----------+---------+
               |
               v
      NEXT ACCOUNTABLE CONTINUATION
               |
               v
      OPTIONAL TRACKER PROJECTION
```

Keep these dimensions separate because they answer different questions:

- **Claim evidence** — what current evidence says about the reported/requested condition.
- **Actionability** — whether the current item can move to a concrete next owner/action or what truth is still missing.
- **Disposition** — whether separate work remains and why.
- **Next continuation** — the accountable outcome/owner that should act next, if any.
- **Provider projection** — how the project's actual tracker represents the semantic result, when a mapping and write authority exist.

## Universal intake loop

### 1. Confirm that Issue Triage is the right job

Use this Skill for an existing issue, PR, or change request whose **intake truth** is uncertain or when the user explicitly asks to triage/re-triage that item.

Do **not** insert Issue Triage merely because work has a ticket:

- A current work item materialized by Engineering Planning from a verified execution graph remains planning-owned for execution/dependency/proof truth. If the user asks to continue that planned work, continue from the current planning frontier rather than rebuilding readiness here.
- If authoritative source/requirements changed and a planned node became stale, identify the staleness and return the execution-topology repair to Engineering Planning/replan; do not silently reinterpret it as fresh external intake.
- Direct requests to engineer requirements, plan technical work, design, implement, verify, or operate do not need Issue Triage unless the user's terminal job is specifically the canonical issue/PR intake/disposition.

When origin is unclear and it changes ownership, inspect the canonical item's provenance or state the uncertainty; do not infer origin from provider labels alone.

### 2. Bind canonical item and current evidence

Read the actual canonical issue/change request and the smallest current evidence that can change intake judgment:

- body, discussion, author/provenance, current provider fields/status, linked work/decisions;
- for a PR, the frozen/current diff and review state relevant to the claim;
- current source, tests, runtime, configuration, documentation, or supported-version evidence when material;
- semantically equivalent canonical work or prior rejection evidence when available through the project's real provider.

One unambiguous live tracker/source can be read directly. If several eligible providers could materially change identity, fidelity, or mutation semantics, resolve that provider choice with available project/provider evidence. Lack of a helper Skill does not prevent Issue Triage from recording provider uncertainty truthfully.

Tracker access is not mutation authority. Never create local shadow status because the canonical provider or write primitive is missing.

### 3. Verify or bound the claim

Use the smallest discriminating evidence. For a reported defect or factual assertion, record one of:

- `CONFIRMED` — representative current evidence supports the claim under the stated conditions;
- `CONTRADICTED` — representative counterevidence rules out the current claim under the material conditions;
- `INSUFFICIENT` — the attempted evidence does not yet distinguish the claim;
- `NOT_APPLICABLE` — the item is a proposal/request whose truth is not a current-behavior claim.

A failed reproduction is `INSUFFICIENT` unless environment/version/timing and other material conditions are sufficiently controlled to rule the claim out. A feature request being technically feasible does not mean Product scope is accepted.

Check duplication by intended outcome/semantics, not keyword similarity. Check "already satisfied" against current behavior, not ticket wording.

### 4. Classify the actionability frontier locally

Issue Triage must classify the missing truth itself; sibling Skills are optional continuation, never required cognition for this step.

| Frontier | Triage behavior |
|---|---|
| More source/runtime/tracker evidence can answer it | Continue the smallest useful inspection; do not ask a human yet. |
| A specific external/reporting fact is required | Preserve established truth, ask only for the smallest decision-changing fact, and mark the item as waiting on external input. |
| Product/Requirements/Design/Architecture/security-policy/QA/release or another protected owner decision is unresolved | Name the exact decision, owner/authority if known, and consequence. Do not decide it here. |
| Technical sequencing/dependency/cutover/proof topology is materially unresolved | Name the engineering-planning frontier; do not synthesize the plan here. |
| Required truth is sufficient for a concrete next action/owner | Mark the intake as actionable and identify that next continuation. |

When a corresponding sibling capability is available **and the current request authorizes continuing beyond intake**, hand off only the bounded frontier and consume the result back if useful. If it is absent, Issue Triage still completes by returning the truthful frontier; helper absence alone is not `BLOCKED`.

### 5. Determine disposition separately from actionability

Use a disposition only when evidence supports it. Preserve project-native wording where available; these semantic classes are reasoning aids, not mandatory tracker states:

- `ACTIVE` — separate work/decision remains.
- `DUPLICATE` — another current canonical item owns the same outcome.
- `ALREADY_SATISFIED` — current behavior already provides the requested outcome.
- `REJECTED` — an authorized owner explicitly decided not to pursue the requested change/scope.
- `OBSOLETE_OR_CONTRADICTED` — the current work claim no longer represents actionable current truth, with sufficient evidence for that conclusion.

Do not collapse these into a generic `wontfix` truth. A provider may map several dispositions to one close/status value, but preserve the semantic reason and evidence in the canonical record.

For rejected proposed behavior, read [Rejected-Scope Decision Memory](OUT-OF-SCOPE.md) only when the project has or requests a durable rejection-memory provider and the current rejection materially benefits from it. Never create rejection memory merely to close an issue.

### 6. Identify the next accountable continuation

Name the next outcome, not a ceremonial lifecycle stage. Examples:

- obtain one missing external fact;
- resolve Product truth or Requirements meaning; when requirement semantics are the frontier, Requirements Engineering (or the project-equivalent accountable owner) owns that continuation;
- resolve Design or Architecture truth;
- perform Engineering Planning because execution topology is still uncertain;
- implement a small clear technical change;
- review/merge an already verified PR under the actual human authority;
- no continuation because disposition ends separate work.

For a PR, **human review/merge** is not the same semantic condition as **human implementation**. State the actual next action and authority rather than overloading `ready-for-human`.

### 7. Materialize an intake brief only when it earns its cost

Use [INTAKE-BRIEF.md](INTAKE-BRIEF.md) when the intake result must survive a context boundary, be posted to the canonical item, or clearly transfer grounded truth to the next owner.

The brief may preserve already-authoritative requirements, acceptance criteria, interfaces, design decisions, constraints, or proof obligations **with provenance**. It must not invent or repair those truths to make the item appear ready. Missing upstream or planning truth stays an explicit frontier.

A simple issue whose current truth is obvious can finish inline without creating a new brief artifact.

### 8. Recommend before mutating, then project through the real tracker

Return the smallest useful intake result:

- canonical item identity;
- claim evidence when applicable;
- actionability/frontier;
- disposition + reason/evidence;
- next accountable continuation;
- project-native category/state already observed;
- proposed tracker mutation only when one is requested or materially useful.

Before any comment, field, label, assignment, transition, close, or linked decision-memory write:

1. bind the exact target and current canonical state;
2. confirm user/maintainer authority for that mutation;
3. use the project's actual provider mapping/primitive rather than inventing generic labels;
4. execute only supported primitives;
5. re-read the canonical item or use an equally strong postcondition.

If semantic intake truth is complete but provider mapping/write authority is missing, the analysis can still be `READY`; the requested mutation is `PARTIAL` or `BLOCKED` at its own boundary. Do not create a second status source.

## Discovery / attention view

When asked what incoming work needs attention, query the canonical provider using project-native fields and evidence. Prefer items whose intake is unresolved, waiting on new external information, or explicitly requested for re-triage. Do not assume a universal set of labels. Show the smallest useful summary and let the maintainer choose unless the request names a target directly.

When external PR discovery is supported by project truth, distinguish externally originated intake from normal collaborator in-flight work. An explicitly named PR may always be triaged regardless of author.

## Contrastive examples

- **Small confirmed bug:** current source/runtime evidence confirms the defect; target behavior and scope are already authoritative; no planning/owner decision is open -> `ACTIVE`, actionable, next continuation = implementation. Do not manufacture a new plan or acceptance criteria.
- **Requirement gap:** request asks for lockout "after too many attempts" but threshold/reset/exceptions are not authoritative -> `ACTIVE`, not directly actionable, next continuation = resolve requirement/business-rule meaning. Issue Triage does not choose a number.
- **Planning-created node:** a current Engineering Planning graph already defines dependency/proof/executable frontier and user asks to continue it -> Issue Triage is a near-miss; continue from Planning/implementation rather than re-triaging the ticket.
- **Duplicate:** another canonical issue owns the same intended outcome -> `DUPLICATE`; link the canonical work and do not create a second rejection record.
- **PR complete except merge authority:** evidence shows the diff is complete and current; only authorized human review/merge remains -> state that continuation directly, not `ready-for-human` as though implementation were missing.

## Failure and completion semantics

- `READY` — the requested intake analysis is truthful: canonical item/evidence are bound sufficiently, actionability/frontier and disposition are explicit, and the next accountable continuation is clear. Every requested tracker mutation that is part of the declared scope has a verified postcondition.
- `PARTIAL` — useful intake truth exists but a requested provider mutation, external fact, or continuation beyond Triage remains unresolved. Absence of an optional sibling capability alone does not make intake partial.
- `BLOCKED` — the canonical target/evidence needed to perform meaningful intake cannot be identified/read, or a requested mutation requires unavailable authority/provider fidelity and no narrower truthful result satisfies the request.
- `FAILED` — an attempted required read/write/postcondition produced contradictory, partial, or untrusted state; report exactly what may now be inconsistent.

Structural/native validation does not prove behavioral triage quality. Keep representative runtime behavior `NOT_RUN` unless the exact candidate is actually executed against frozen cases.
