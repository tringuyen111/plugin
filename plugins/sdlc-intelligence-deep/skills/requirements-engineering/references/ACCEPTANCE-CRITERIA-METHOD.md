# Acceptance Criteria Branch
<!-- runtime-context:start -->
## Runtime context

- **When behavior is stateful, interruptible, repeatable/duplicate-prone, partially committing, multi-actor, or time-dependent:** read [Acceptance Continuity](AC-CONTINUITY.md) only if those branches can change accepted/rejected/pending meaning.
- **When multiple criteria/branches may overlap, duplicate, or leave gaps:** read [Acceptance Set Quality](AC-SET-QUALITY.md) and refine the set rather than polishing sentences independently.
- **When durable governed Acceptance Criteria are requested:** read [Governed Acceptance Criterion Artifact](AC-FORMAT.md) before persistence; lightweight drafting does not require that projection.
<!-- runtime-context:end -->

Define the item-specific observable conditions that make grounded behavior acceptable.
Own acceptance semantics and, only for a persisted AC artifact, criterion maturity. Do not own Business Rule or Quality Requirement authority, Definition of Done, executable test probes, QA verdicts, waiver/risk acceptance, or witnessed UAT decisions.

Do **not** require canonical IDs, revisions, or `AC-FORMAT.md` for a lightweight draft/review. Use real identifiers and revisions when they exist and matter; never fabricate them to satisfy a template.

## Acceptance discovery loop

1. **Ground the item scope.** Recover the actor/business outcome, source-authorized behavior, material non-goals, and real Business Rule and Quality Requirement references (including project NFRs) from the available Story/PBI/Use Case/behavior context. If an important source is absent, use the grounded meaning you do have and keep only the affected boundary unresolved.
2. **Name the rule or condition.** Identify what must be true for the item to be accepted: success, permission, validation, state, timing, boundary, alternate/error behavior, or a negative/no-change guarantee. Include a branch only when it can change accepted behavior.
3. **Pressure it with concrete examples.** Use one or more representative examples to expose ambiguous wording, missing policy, boundary values, contradictory branches, or hidden implementation assumptions. Examples are discovery evidence, not a requirement to enumerate every scenario.
4. **Refine acceptance partitions and set coverage when multiple obligations exist.** Group examples/branches by distinct source-authorized conditions that lead to materially distinct accepted, rejected, unchanged, or deferred observable outcomes. Use `AC-SET-QUALITY.md` to find uncovered partitions, redundant/overlapping criteria, mixed-owner concerns, and criteria that need split/merge/narrowing. More criteria are not automatically better.
5. **Expose questions before guessing.** Keep unresolved eligibility, formulas, thresholds, precedence, or policy as explicit Business Rule/Product questions; use the **Quality Requirement branch** when the unresolved truth is a measurable quality target. Do not invent values merely to make a criterion look testable.
6. **Formulate the observable criterion.** State what an actor, operator, external system, or machine consumer can observe, including material postconditions and negative guarantees. Exclude internal methods, database structures, queues, retry counts, UI control choices, framework behavior, and test procedure unless an authorized external contract makes that mechanism itself observable requirement truth.
7. **Stop when additional examples no longer change scope, behavior, boundary, set coverage, or an unresolved authority question.** Do not manufacture exhaustive criteria for branches that are not material to this item.

## Preserve material semantics

- Define the minimum successful business result and its observable postcondition.
- Preserve permission, validation, empty, duplicate, timeout/external-dependency, recovery, state, multi-actor, and effective-time behavior only when it changes acceptance.
- State important negative guarantees: no duplicate charge, no unauthorized disclosure/action, no state change on rejected intent, no hidden fallback, or no false success while outcome is unknown.
- Do not confuse acknowledgement with completion when the business result is not yet final.
- For interrupted/partial operations, keep the observable UNKNOWN/pending condition, final reconciliation outcome, already-real business effect, duplicate/retry business guarantee, and commitment/compensation consequence when material; take the detailed method from `AC-CONTINUITY.md`.
- Use exact thresholds, dates, rounding, formulas, and eligibility only from authorized Business Rule/Product truth.
- Reference measurable NFR constraints rather than replacing `fast`, `secure`, or `reliable` with invented numbers.
- Account for each material incoming obligation in declared scope through a criterion, a real source link, a proven-not-applicable disposition, or an explicit unresolved owner question. Do not claim whole-project coverage when only this item was inspected.

## Choose the clearest representation

Use the representation that best exposes the behavior:

- **Given / When / Then** for event-oriented examples where context, event, and observable consequence matter;
- **checklist or concise rule statement** for independent conditions;
- **plain domain language** when it is clearer than Gherkin.

Syntax is not a validity gate. Keep examples business-observable; do not turn them into UI click scripts, API call sequences, database assertions, or framework-specific tests.

### Contrastive SHOW

```text
Weak:  "API returns 200 and an orders row exists."
Better: "When an eligible order is submitted, the customer can observe one accepted order with the authorized total and no duplicate order is created."
```

Keep HTTP/database assertions only when an external contract makes them requirement truth; otherwise they are implementation/test mechanics derived later.

## Keep neighboring ownership distinct

- **Business Rule** owns policy, eligibility, formula, precedence, and authoritative business boundaries.
- The **Quality Requirement branch** owns measurable quality constraints and their authority; project records may still use legacy `NFR-*` identifiers when those identities are real.
- **Definition of Done / team quality policy** owns broad completion requirements that apply across items; do not relabel them as item-specific AC without a distinct authorized item requirement.
- **`/verify-quality`** owns executable QA proof semantics, admitted execution evidence, the QA verdict, and any durable reusable Test Condition artifact materialized for that proof boundary.
- **`/user-acceptance` / business acceptance authority** owns acceptance coverage projection, witnessed user/business evidence, evaluation, and any explicit authorized acceptance decision; authoring criteria does not grant that authority.
- **Design/Engineering** own UI/technical solution and implementation mechanisms.

State verification intent or observable evidence need when useful so QA can derive probes, but do not copy mutable test results, QA verdicts, waiver decisions, or UAT status into AC truth.

## Governed persistence only when required

Read `AC-FORMAT.md` only when the user/project requires a durable governed AC artifact, exact source/revision traceability, supersession/change impact, or a formal canonical record.

For that branch:

- bind the real criterion identity/revision and real source identities/revisions that exist;
- classify persisted criterion truth as `CURRENT_VERIFIED`, `TARGET_AUTHORIZED`, or `PROPOSED_OR_ASSUMED` without upgrading assumptions;
- advance criterion revision when material source meaning changes and preserve stale/superseded lineage truth;
- preserve source behavior coverage and unresolved dispositions;
- keep verification intent in the AC, but link to canonical downstream test/evidence/QA/UAT/waiver records only when those records actually exist;
- never copy a mutable downstream status into criterion maturity.

A project may choose a combined storage record, but that persistence choice does not change this Skill's ownership boundaries.

## Completion

A lightweight acceptance result is `READY` when:

- the item scope is sufficiently grounded for the criteria being asserted;
- each asserted criterion is observable and supported by known source meaning;
- material success, boundary, permission/state/error, and negative/no-change semantics are preserved;
- decision-changing examples/questions exposed missing rules instead of silently guessing them;
- when multiple criteria are material, the set covers distinct grounded acceptance partitions without known gap, redundant duplication, or mixed-owner ambiguity;
- implementation and executable test mechanics are outside the criteria;
- unresolved Business Rule, Quality Requirement, or Product authority remains explicit and blocks only the dependent scope.

A governed persisted AC is `READY` only when the additional requested identity/revision, truth-basis, lineage/coverage, maturity, and change-impact fields are bound to real canonical truth.

`READY` never means QA verified, waived, released, or business-accepted for a candidate. Behavioral verification and independent qualification remain `NOT_RUN` until actually executed under their owning evidence boundary.
