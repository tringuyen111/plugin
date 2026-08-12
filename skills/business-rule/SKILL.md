---
name: business-rule
description: Define or reconcile authoritative business rules. Use when a workflow needs a policy, validation, permission, calculation, eligibility, state-transition guard, or exception expressed with source, owner, conditions, and examples.
---

# Business Rule
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
<!-- runtime-context:end -->

Make a business decision explicit, testable, traceable, and owned.

This skill owns business semantics. It does not decide how the rule is stored,
which service executes it, which technical role/permission mechanism enforces it,
which UI control represents it, or how QA verifies it.

Read `BUSINESS-RULE-FORMAT.md` before writing the artifact.

## Rule types

Classify the rule when useful:

- **Policy** — what is allowed, required, prohibited, or eligible.
- **Validation** — when information or an action is acceptable.
- **Permission** — which business actor may perform an action under which conditions.
- **Calculation** — a business formula, rounding, period, or allocation.
- **Derivation** — how a business value or status is determined.
- **Transition guard** — when a business state may change.
- **Obligation** — what must occur after an event.

The type does not replace the rule statement.

## Source fixed point and truth basis

Bind the rule to the exact **source identity** and **source revision**, version,
effective record, or other inspectable source fixed point that authorizes or
supports the rule. Do not treat a title or link without revision identity as a
stable authority when the source can change.

Classify the **rule truth basis** explicitly:

- **CURRENT_VERIFIED** — current business behavior/practice supported by an
  inspectable current-state source. It describes what happens now and is not
  automatically the desired rule.
- **TARGET_AUTHORIZED** — target business semantics authorized by the exact
  owning source/decision revision.
- **PROPOSED_OR_ASSUMED** — stakeholder proposal, inference, convention, or
  working assumption that lacks the authority/evidence required to become
  target truth.

Observed runtime practice, a disabled UI control, or a stakeholder statement
must not silently become `TARGET_AUTHORIZED`. When a consumed source revision
changes materially, mark the derived rule stale and revalidate it before
continuing to rely on the old rule as current target truth.

## Authority and applicability

Keep these concerns distinct:

- **Business owner** — accountable domain owner for the rule artifact.
- **Owning authority/source** — source or decision authority that grants the
  rule its business force.
- **Effective period / scope / jurisdiction / segment** — where and when the
  rule applies. Do not generalize a bounded rule globally.
- **Precedence / supersession** — which authoritative rule controls when two
  rules overlap, and from what effective point. Record an inspectable basis;
  never invent precedence merely to resolve a conflict.
- **Exception / override authority** — who may authorize a bounded exception to
  an otherwise applicable rule. Override authority is not the same thing as
  precedence between rules.

A superseded rule may remain linked for historical truth but must not continue
as active semantics outside its historical effective scope. If authoritative
sources conflict and no precedence or authorized resolution exists, preserve
`CONFLICTED` and the decision owner; do not manufacture a compromise.

## Process

1. **Extract the decision.** Rewrite vague prose as one unambiguous rule in
   business language.
2. **Bind the fixed point.** Record source identity, source revision, rule truth
   basis, owner/authority, effective period, scope, and jurisdiction/segment
   where relevant. Revalidate stale source bindings before treating them as
   current target truth.
3. **Define conditions and outcome.** State when the rule applies, what must be
   true, and the observable business result.
4. **Resolve precedence separately from overrides.** Record precedence or
   supersession only when an authoritative basis exists; record valid
   exceptions and override authority independently.
5. **Add examples and counterexamples.** Include boundary cases and a negative
   example that must not be accepted.
6. **Use and audit a decision table** when several independent conditions
   produce different results. Detect overlapping rows, conflicting outcomes,
   and uncovered condition combinations. Do not invent a catch-all `ELSE` or
   default. If an authoritative default exists, state and source it explicitly;
   otherwise keep the uncovered combination open. Use `UNKNOWN` or
   `NOT_APPLICABLE` only when that state has domain meaning.
7. **Capture calculation semantics when material.** For calculation or
   derivation rules, preserve the authoritative inputs, formula, unit/currency,
   rounding, period/time basis, and boundary/bucket behavior needed to reproduce
   the business result. If any value is absent from authority, keep it
   unresolved rather than inventing a convenient convention.
8. **Link affected artifacts.** When a material rule revision affects Use Cases,
   AC, states, metrics, user guides, operations, or evidence, invoke or hand off
   to `/traceability` for impact analysis. This Skill identifies the impact; it
   does not silently rewrite downstream canonical truth.
9. **Handle conflicts truthfully.** If sources disagree, precedence is absent,
   or source/owner authority is unresolved, keep the rule `CONFLICTED`,
   `PARTIAL`, or `BLOCKED` as appropriate rather than approving it by wording.

## Decision-table integrity

A decision table is a compact business decision model, not merely a formatting
shortcut.

- Rows that can match the same input space must either produce the same result
  or have authoritative precedence; conflicting overlapping rows are a defect.
- Uncovered combinations remain visible. Missing coverage does not imply
  `allow`, `deny`, zero, or another default.
- A default row is valid only when the business authority defines the default.
- Conditions that are unknown or not applicable must be modeled explicitly
  when they can change the result; do not collapse them into false.

## Ownership boundaries

- A **permission** rule names business actors, business conditions, and the
  business result. Architecture/Engineering own technical RBAC roles, claims,
  policy engines, storage, and enforcement mechanisms.
- A **transition guard** defines business states/conditions/result; it does not
  design a database state machine, lock, queue, or transaction mechanism.
- Current UI behavior is evidence about the interface, not rule authority. A
  disabled button alone does not prove a permission rule.
- A Product metric, target, or guardrail is not automatically a Business Rule.
  Treat it as a rule only when an independent authorized domain source actually
  makes that metric/threshold normative.
- QA verdicts, test implementation, waivers, and verification authority remain
  with their canonical owners.

## Quality checks

A good rule is:

- atomic enough to test;
- written in domain language;
- explicit about source identity/revision and truth basis;
- explicit about scope, effective time, jurisdiction, and exceptions where material;
- clear about precedence/supersession versus override authority;
- stable independently of current UI or technical implementation;
- traceable to an authority;
- capable of producing positive, negative, and boundary examples;
- decision-table complete enough to expose overlaps and uncovered combinations;
- calculation-complete when formula/unit/rounding/period semantics determine the outcome.

## Completion

`READY` requires an exact source fixed point, owner/authority, rule truth basis,
conditions, result, applicability, exceptions, examples, decision-table coverage
when used, material calculation semantics when used, and links to affected
behavior. A stale source, unresolved authority, conflicting rule without
precedence, overlapping/conflicting decision rows, or material uncovered
combination without an authoritative default remains `PARTIAL` or `BLOCKED`, not
approved.
