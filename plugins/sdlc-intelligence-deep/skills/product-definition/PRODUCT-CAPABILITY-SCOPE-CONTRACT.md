# Product Capability, Scope, and Value Contract

Use this reference when the Product decision can change based on scope sufficiency/necessity, current capability truth, business-value mechanism, feature/capability grouping, live operating shape, future option value, or commercial viability.

Do not use it as a mandatory worksheet. Apply only the lenses that can change the Product decision.

## 1. Declare what this definition is committing to

Before judging scope, distinguish the commitment being made:

- **OUTCOME** — this Product scope claims the target user/business condition can be achieved, subject only to explicit external dependencies.
- **CONTRIBUTION** — this scope intentionally advances part of a larger outcome while other blockers/owners remain explicit.
- **LEARNING** — this scope exists primarily to answer a decision-critical Product assumption; it is not yet a claim of complete outcome delivery.

A contribution-sized scope must not inherit an outcome-sized claim. A learning slice must be sufficient to answer the learning question, not padded into a production-complete feature merely to look substantial.

When evidence changes the commitment type, re-evaluate scope, metrics, priority, and recommendation from that earlier decision.

## 2. Bind business value to a mechanism, not to feature enthusiasm

Reason through the changed condition:

```text
user condition / job
-> changed behavior, capability, risk, or cost
-> business effect
```

Possible business effects include acquisition, activation, retention, expansion, revenue, cost-to-serve, risk/compliance exposure, trust, or strategic enablement. Use only effects supported by the opportunity/strategy/evidence; do not manufacture a business case.

Usage frequency is one signal, not value itself. Consider frequency together with breadth, criticality, consequence of failure, friction removed, cost/risk avoided, and segment importance. Rare-but-critical recovery, audit, or control capabilities can carry high value. High-frequency interactions can be low value when they change no meaningful condition.

If the value mechanism is unclear, preserve it as an assumption or return to Product Discovery rather than using engagement as a substitute.

## 3. Find the actual capability delta from current truth

For an existing product or workflow, inspect the strongest available current Product/runtime/source truth before adding scope:

```text
current journey / job
-> existing capability + workaround
-> material blocker
-> capability delta
```

Classify the delta only as far as Product needs:

- **REUSE** — an existing capability already satisfies the need; do not re-scope it merely because it belongs to the same journey.
- **EXTEND** — the current capability is the right semantic owner but lacks a material behavior/value boundary.
- **NEW** — no existing Product capability satisfies the blocker.
- **DEPENDENCY** — another product/team/provider owns a required part of the outcome.

Do not infer source/module ownership, API shape, database design, screen structure, or implementation reuse from Product capability reuse. Those are downstream decisions.

## 4. Test the minimum capability envelope

Evaluate the proposed scope against the declared commitment.

### Sufficiency
Ask whether the proposed scope plus explicit dependencies can satisfy what is being claimed.

- For **OUTCOME**, every material blocker inside the declared Product responsibility must be resolved or explicitly owned as a dependency/constraint. If not, either expand/change the scope or narrow the claim.
- For **CONTRIBUTION**, the capability delta must materially advance the larger outcome and the remaining blockers/owners must stay explicit.
- For **LEARNING**, the scope/evidence path must discriminate the critical assumption; full journey completion is unnecessary unless required for the learning.

### Necessity
For each material scope item ask whether it:

- removes a blocker;
- enables a required capability;
- protects a material guardrail/viability condition; or
- answers the declared learning question.

If none apply, treat it as adjacent/orphan scope until another evidence-backed reason justifies inclusion.

### Coherence
A set of individually useful features is not automatically one coherent Product scope. The set should tell one understandable value/commitment story for the target segment or explicitly state why multiple related capabilities must move together.

### Re-entry
- Insufficient scope -> expose the missing blocker/dependency and revise the scope or commitment.
- Redundant scope -> remove it, mark it adjacent, or justify a distinct Product commitment.
- Changed current capability truth -> re-evaluate the blocker/delta; do not preserve obsolete scope for document stability.

## 5. Distinguish Product topology from technical or commercial adjacency

Keep these concepts separate:

```text
FEATURE
one bounded user-visible/product behavior

CAPABILITY CLUSTER
several capabilities that together complete or materially support one recognizable user/business job

PRODUCT AREA
a durable product/domain area that can contain several capability clusters over time

COMMERCIAL PACKAGE
features/capabilities/limits/entitlements sold or exposed together
```

Group Product capabilities when the user/business job or value relation supports it, for example when capabilities complete one job, enable one another, or become materially less useful when separated. Do not group them merely because they share code, data, a screen, a team, or a current pricing tier.

Commercial bundling is a different relation. Capabilities in one Product area may be packaged differently; unrelated capabilities may be sold together for commercial reasons. Preserve the distinction so Product topology does not become pricing architecture.

## 6. Test the live operating shape when it can change scope

A feature that works once in a demo can still be Product-incomplete in real operation. At Product altitude ask only the dimensions that can change the capability promise:

- **actor** — end user, admin, support, operations, another business role;
- **cadence** — continuous, daily, periodic, rare, incident-driven;
- **criticality/consequence** — what happens when the capability is unavailable or wrong;
- **scale shape** — single item/user versus materially large/bulk operation;
- **recovery/support expectation** — whether users/admin/support need a Product-visible way to understand or recover from failure.

Convert a material finding into a Product capability/constraint/guardrail, not a UI/API/batch/job design. For example, “admins must be able to onboard the migration cohort efficiently” is Product scope; whether this becomes bulk UI, import, or API is downstream.

Low frequency is not failure when the capability is intentionally rare. High adoption is not success when support burden, failure, harm, or cost invalidates the intended value.

## 7. Treat the future as option value, not speculative scope

Classify future relevance:

- **BUILD_NOW** — required for the current commitment.
- **PRESERVE_OPTION** — evidence/strategy makes an adjacent direction materially plausible, and preserving the Product option is cheap enough to matter now; record the future relation/constraint without scoping the future capability.
- **DEFER_SPECULATIVE** — “we may need it someday” lacks enough evidence/strategic weight to affect current scope.

`PRESERVE_OPTION` is Product intent, not permission to mandate generic platforms, abstractions, extensibility frameworks, or technical runway. Architecture/Engineering decide whether any implementation accommodation is warranted after receiving the actual constraint.

If preserving an option would materially increase current cost/complexity, make that trade-off explicit instead of assuming future flexibility is free.

## 8. Surface commercial viability only when it can change the Product decision

Commercial treatment is conditional Product context, not a mandatory section and not synonymous with Product topology.

When material, ask:

- Is the capability part of core value realization or primarily expansion/segment-specific value?
- Which evidenced segment needs it?
- Is there a natural upgrade/growth trigger, or would gating it block activation/value realization?
- Does usage/cost-to-serve materially threaten margin or sustainable delivery?
- Could entitlement/packaging treatment create unfairness, bill shock, churn, or support burden that changes the Product decision?

Possible Product-level hypotheses include `INCLUDE`, `TIER_FENCE`, `USAGE_LIMIT`, `ADD_ON`, `SEPARATE_OFFER`, or `UNRESOLVED`. Use them only when the distinction helps the decision.

Do not fabricate:

- exact willingness-to-pay evidence;
- price points, discounts, plan names, or arbitrary feature fences;
- billing architecture or metering implementation;
- legal/contract terms;
- pricing experiment results;
- commercial approval authority.

When exact commercial ownership is absent, Product Definition may expose the viability question and its effect on scope/priority while keeping the commercial treatment unresolved. Do not create a new pricing owner merely to keep the workflow moving.

## 9. Final scope challenge

Before recommendation, challenge only the dimensions material to this Product definition:

```text
necessary?          each material item earns inclusion
sufficient?         commitment is not larger than the capability envelope
a coherent whole?   topology follows user/business meaning
operable?           live cadence/criticality/scale does not invalidate value
option-safe?        likely future is neither accidentally blocked nor prematurely built
viable?             material cost/commercial constraints do not contradict the business claim
```

A failed dimension is not an instruction to add more scope. The correct fix may be to narrow the commitment, expose a dependency, run an experiment, gather evidence, park the idea, or route an owner decision.
