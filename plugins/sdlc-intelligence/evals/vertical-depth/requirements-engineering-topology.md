# Frozen Pressure Test — Requirements Engineering Topology

Evidence-State: `NOT_RUN`

Frozen before replacement of `define-behavior` and before removal/reclassification of `user-story`, `use-case`, `acceptance-criteria`, `business-rule`, and `quality-requirement` host Skills. These are behavioral exam cases, not executed results.

## RT1 — Direct acceptance criteria without BA ceremony
Input: Authorized Story meaning is fixed; user asks only for observable acceptance criteria for success, permission denial, and no-change behavior.
Target: `requirements-engineering` triggers directly, loads only AC-specific depth that can change the answer, preserves source authority, and returns AC semantics without requiring Product Discovery, a Use Case, Story rewrite, or full requirements composition.

## RT2 — Direct business rule from authoritative policy
Input: An authoritative policy states Gold customers receive 10% discount during Campaign X, with a contract override taking precedence. User asks for a decision table.
Target: Requirements Engineering uses its Business Rule branch directly; preserves directive/applicability/precedence/authority and decision-table semantics; does not require a Product feature or invent workflow behavior.

## RT3 — Direct use case from fixed behavior
Input: Approved behavior defines a customer goal plus one alternate and one error path. User asks to express it as a channel-independent Use Case.
Target: load Use Case/scenario depth only; preserve actor/boundary/scenario/postcondition truth; do not require User Story or Acceptance Criteria artifacts.

## RT4 — Direct user story
Input: Product scope and actor value are authorized; user wants one backlog-sized value slice.
Target: use Card -> Conversation -> Confirmation and slicing depth only when necessary; do not expand into a full requirements document or technical task.

## RT5 — Quality requirement from authorized SLA
Input: SLA authority states a target availability/conformance obligation and current telemetry is worse.
Target: quality branch keeps normative target separate from current baseline evidence, makes the quality claim falsifiable, and does not let measured current reality authorize a different target.

## RT6 — Multi-view BA ambiguity
Input: Product intent is approved but suspension semantics differ across stakeholders, policy, current runtime, and support process.
Target: use Requirements core to bind source/authority, discriminate ambiguity, diagnose conflicts, prove shared understanding, pressure completeness, and load only the semantic views needed to resolve the material question.

## RT7 — Domain-model boundary
Input: Billing and Authentication both use `Account`, but evidence suggests different concept identity and lifecycle meaning.
Target: use `domain-modeling` as the independent owner; Requirements Engineering must not absorb or fake the semantic-model job merely because requirements may later consume the result.

## RT8 — Product boundary
Input: Stakeholders ask for AC, but target user outcome and feature scope are still materially disputed.
Target: return only the unresolved Product commitment/scope decision to `product-definition`; do not manufacture requirement precision from unstable Product intent.

## RT9 — Current-system reality binding
Input: Request says “keep the current cancellation behavior” and source/runtime are inspectable.
Target: inspect the current authoritative behavior before relying on the phrase; do not infer or simulate current behavior from a Story/template/memory.

## RT10 — Governed artifact persistence
Input: Project already has canonical IDs/revisions for a Business Rule and AC set and asks to revise them.
Target: preserve project-native identities, source revisions, authority and fixed-point/change-impact truth; branch formats remain available after consolidation; no fake replacement IDs are created.

## RT11 — Lightweight inline artifact
Input: User asks for a quick Use Case workshop draft and no durable store is configured.
Target: produce useful inline semantics without fabricating IDs/revisions/persistence; persistence remains `NOT_RUN` rather than blocking the content task.

## RT12 — Context isolation
Input: User asks for one simple AC from already settled behavior.
Target: do not load Business Rule calculation depth, quality-category depth, User Story slicing, scenario continuity, or full requirements governance unless evidence makes one of them decision-material.

## RT13 — Technique cross-over
Input: A draft AC contains an unknown eligibility threshold controlled by policy.
Target: switch to/load the Business Rule branch inside the same Requirements evidence chain, resolve or expose that authority gap, then return to AC; do not perform a host-Skill handoff or clone semantic truth.

## RT14 — Quality vs implementation constraint
Input: “Use Redis because it is fast.” No authorized performance target or quality obligation exists.
Target: do not turn the technology preference into a quality requirement; keep it as a proposal/technical concern and preserve missing normative target authority.

## RT15 — Business rule vs domain invariant
Input: “An Order must belong to exactly one Customer” is claimed as universal domain meaning, while “orders over $10k require VP approval” is policy.
Target: concept/invariant ambiguity belongs to `domain-modeling`; approval threshold belongs to Requirements Business Rule branch. Do not merge their authorities.

## RT16 — Legacy discovery removal
Input: A future user asks “write user stories”, “model this use case”, “define acceptance criteria”, “define this business rule”, or “write an NFR”.
Target: only `requirements-engineering` is the host-visible Requirements owner for those jobs; removed legacy Skill identities are not discoverable or preserved as silent fallback.

## RT17 — Existing artifact references survive
Input: Project artifacts and downstream specs refer to `US-17`, `UC-9`, `BR-4`, `AC-12`, `NFR-3`.
Target: retain those artifact identities and semantics exactly; removing Skill identities must never rename or delete project artifacts.

## RT18 — UAT/QA authority boundary
Input: AC and quality requirement are fully defined but no candidate has been executed.
Target: Requirements readiness must not become QA PASS, UAT acceptance, waiver, or release readiness; `/verify-quality` and UAT owners retain observed-evidence authority.

## RT19 — Direct rule maintenance independent of Product feature
Input: Regulation changes a retention policy that affects several existing products; no new feature scope decision is needed.
Target: Requirements Engineering Business Rule branch can update/reconcile rule semantics directly from authorized policy; do not force Product Discovery/Definition.

## RT20 — Counterexample re-entry
Input: Requirements appear complete, but a partial-bulk failure case shows all written criteria could pass while the authorized stakeholder need still fails.
Target: reopen the earliest missing behavior/rule/acceptance semantic decision in the same Requirements job; do not patch only wording or jump to implementation mechanism.

## Falsifiers

- Direct technique requests require a full BA ceremony or unrelated branch context.
- Removed host Skills remain discoverable, aliased, or silently active.
- Consolidation loses decision-table, scenario-continuity, slicing, AC-set, quality-claim, or governed-format depth.
- Requirements Engineering absorbs Product authority, Domain Modeling, Design, Architecture, implementation, QA/UAT, release, or risk acceptance.
- Artifact identity is confused with Skill identity.
- Current-system claims are accepted without inspecting available current truth.
- A validator/package pass is reported as behavioral uplift without runtime execution.
