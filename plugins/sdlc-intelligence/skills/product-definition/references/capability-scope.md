# Capability Scope

Use this module when **current capability truth, value mechanism, or the minimum Product capability envelope** can change scope. Return Product-level scope; do not choose implementation architecture, detailed behavior, UI, API, data model, or test mechanics.

## 1. Bind value to a mechanism

Use an evidence-backed chain rather than feature enthusiasm:

```text
Product capability / change
        -> changed user behavior, capability, risk, or cost
        -> user outcome
        -> plausible business effect
```

Possible business effects include activation, retention, expansion, revenue, cost-to-serve, risk/compliance exposure, trust, or strategic enablement only when supported by evidence/strategy. Usage frequency is one signal, not value itself. Consider breadth, criticality, consequence of failure, friction removed, cost/risk avoided, and segment importance. Rare-but-critical recovery/control can be high value; high-frequency interaction can be low value when it changes no meaningful condition.

If the value mechanism is unclear, preserve it as an assumption or return to Discovery instead of treating engagement as a substitute.

## 2. Find the actual capability delta

Inspect the strongest current Product/runtime/source truth:

```text
existing capability + workaround
        -> material blocker / gap
        -> capability delta
```

Classify the delta when useful:

- `REUSE` — existing capability already satisfies the need; do not re-scope it merely because it is in the journey.
- `EXTEND` — current capability is the semantic owner but lacks a material Product/value boundary.
- `NEW` — no existing Product capability satisfies the blocker.
- `DEPENDENCY` — another product/team/provider owns a required part of the outcome.

Product capability reuse does not determine source/module ownership, API shape, DB design, screen structure, or implementation reuse.

## 3. Test the minimum capability envelope

### Sufficiency

Evaluate Outcome Claim and Learning Commitment independently; satisfying one does not discharge the other.

**Outcome-claim sufficiency**

- `OUTCOME`: every material blocker inside Product responsibility must be covered or explicitly owned as a dependency/constraint; otherwise expand/change scope or narrow the claim.
- `CONTRIBUTION`: the delta must materially advance the larger outcome while remaining blockers/owners stay explicit.
- `NO_OUTCOME_CLAIM`: do not require outcome completion from a pure learning slice, but also do not describe its activity as Product value already delivered.

**Learning sufficiency**

- `LEARNING`: scope/evidence must discriminate the declared assumption; production or journey completeness is unnecessary unless required by the evidence mechanism or an independent Outcome Claim.
- `NO_LEARNING_COMMITMENT`: no learning-specific scope is required merely for ceremony.

### Necessity

Each material scope item must do at least one of:

- resolve a blocker required by the Outcome Claim;
- enable a required capability;
- protect a material guardrail/viability condition;
- answer the declared learning question when Learning Commitment is `LEARNING`.

Otherwise treat it as adjacent/orphan scope until an evidence-backed reason earns inclusion. A release/phasing hypothesis may bound learning or sequencing when Product needs it, but it must stay a Product hypothesis rather than hidden implementation/release design.

### Coherence

A set of useful features is not automatically one coherent Product scope. The set should express one understandable value/commitment story for the target segment or explain why related capabilities must move together.

## 4. Keep Product topology distinct from technical/commercial adjacency

```text
FEATURE             one bounded user-visible/Product behavior
CAPABILITY CLUSTER  several capabilities completing/supporting one recognizable user/business job
PRODUCT AREA        durable Product/domain area containing capability clusters over time
COMMERCIAL PACKAGE  capabilities/limits/entitlements sold or exposed together
```

Group capabilities by user/business job/value relation, not because they share code, data, screen, team, or pricing label. Commercial bundling is a different relation and belongs to the viability frontier only when material.

## Failure / correction

| Failure | Correction |
|---|---|
| proposed feature becomes starting truth | re-enter at current capability + blocker before selecting delta |
| useful partial scope claims whole outcome | narrow to `CONTRIBUTION` or add/own the missing blocker truth |
| existing capability is rebuilt/re-scoped without a distinct delta | classify `REUSE/EXTEND/NEW` from current truth |
| scope item cannot justify necessity | remove/mark adjacent or expose the separate commitment that earns it |
| grouping follows implementation/team/screen/package | re-evaluate topology from customer/business job relation |
| current capability truth changes | re-evaluate blocker/delta and dependent scope; do not preserve obsolete scope for document stability |

## Return contract

Return only:

```text
current capability / workaround truth
material blocker / progress gap
value mechanism + uncertainty
REUSE / EXTEND / NEW capability delta when useful
smallest scope justified by Outcome Claim + Learning Commitment
non-goals + external/cross-owner dependencies
Product topology only when it changes scope
re-entry condition for any unresolved blocker/value assumption
```
