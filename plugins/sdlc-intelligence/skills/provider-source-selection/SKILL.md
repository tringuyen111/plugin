---
name: provider-source-selection
description: Resolve a materially ambiguous provider or source choice for a declared capability when multiple live options, fidelity, data boundary, cost, latency, or fallback semantics can change the outcome. Do not use for an obvious single-source call or to authorize an operation.
---

# Provider / Source Selection

Use this Skill only when **provider/source selection is itself a material decision**. If one obvious live source satisfies the task and no source-specific difference can change the requested outcome, use that source directly and do not add a Resolver hop.

## Accountable outcome

Produce one of these outcomes for the current request:

- `SELECTED` — one exact provider/source satisfies every hard requirement;
- `SELECTED_WITH_LIMITS` — an explicitly acceptable alternative is selected with named loss/deviation;
- `BLOCKED` — a material selection fact, choice, or current access observation is missing/conflicting;
- `UNSUPPORTED` — current evidence shows no discovered source can satisfy any acceptable mode.

A successful selection names the exact source, why it was selected, which hard requirements were checked, any preference deviation or limitation, the live evidence used, and the facts that would invalidate the decision.

Provider / Source Selection does **not** execute the provider operation and does not grant write, deployment, destructive-action, or communication authority.

## Ownership boundary

Own only the question:

> Given the task's declared requirements and the live provider/source choices that actually exist now, which exact source is fit for this request?

Do not own:

- Product, Design, Engineering, QA, Release, or Operations decisions;
- Project Capability Profile creation or repair;
- generic tool discovery when the host already exposes one obvious usable source;
- side-effect classification or operation approval;
- Capability Operation Envelopes, Integration Result manifests, or workflow/task status.

Provider availability, authentication, source-system access, and discovered actions are **current usability observations**. They never become operation authority merely because a source is selectable.

## Inputs

Start from the smallest evidence set that can change selection:

- requested capability/outcome and required provider action when known;
- required fidelity or output form;
- exact target identity and data/source boundary when material;
- current live provider/source candidates, including source kind, source id, namespace/target, revision/version when observable, and current action/tool contract;
- current connection/usability/access observations needed to know whether the source can actually serve the request;
- explicit selection truth from the user, caller, or project-native configuration;
- any declared cost, latency, locality, provenance, compliance, or other optimization criterion that is genuinely material;
- explicitly acceptable degraded modes or alternatives.

A Project Capability Profile may supply selection truth when the project already uses one, but it is **optional**. Do not create or require a Profile just to run this Skill.

## Core decision method

### 1. Frame material requirements before looking for a winner

Classify each selection fact by decision role:

| Decision role | Meaning | Examples | Consequence |
|---|---|---|---|
| `HARD_CONSTRAINT` | must be true for this request | exact repo/workspace, required action, editable output, required data boundary | eliminate candidates that fail it |
| `SOFT_PREFERENCE` | desirable but not permission/requirement | prefer Figma, prefer local tool, preferred source when equivalent | use when eligible; deviation is allowed and reported |
| `ACCEPTABLE_ALTERNATIVE` | explicitly acceptable lower/different mode | text spec allowed when editable design is unavailable | may return `SELECTED_WITH_LIMITS` |
| `INDIFFERENT` | caller/project does not care among sources that are proved equivalent for this task | two bindings to the same target with same required semantics | allows a stable bounded default |

Do not silently convert `prefer` into `must`. Do not silently downgrade a hard fidelity requirement into an alternative.

### 2. Normalize exact source identity from live truth

Treat one candidate as an exact source binding, not a provider brand:

```text
provider
+ source kind
+ source id
+ target/namespace when material
+ source revision/version when observable
+ currently discovered actions/tool schema
```

Collapse duplicate observations of the same exact source. Two discovery paths that point to one identical connection are one candidate, not a provider tie.

Live source/tool evidence outranks remembered schemas or stale configuration. If a load-bearing action, source revision, or access observation is unknown, keep it unknown rather than filling it from memory.

### 3. Eliminate only on hard requirements

Remove a candidate when current evidence shows it cannot satisfy a `HARD_CONSTRAINT`, for example:

- required capability/action is absent;
- required fidelity/output form is impossible;
- source points at the wrong repository/workspace/data boundary;
- the source is unavailable or the current connection cannot access the required target;
- the only supporting action/schema evidence is stale or contradicted by live discovery.

A candidate does **not** fail merely because it is not the preferred provider.

### 4. Compare remaining candidates only on material differences

If several candidates remain, ask whether choosing among them can change a declared material outcome:

- target or source-system identity;
- data exposure/residency/boundary;
- required fidelity or editability;
- provenance/evidence quality required by the task;
- a user/project-mandated provider/source constraint;
- cost or latency **only when the task made it material and current evidence exists**;
- another explicitly named requirement.

If a material dimension differs and there is no authoritative choice/evidence, return `BLOCKED` and name that exact unresolved difference.

If all declared material dimensions are equivalent and the caller/project is indifferent, form a bounded equivalence class. Inside that class, prefer an already-bound source for the exact target/session to avoid churn; otherwise use a stable normalized source-key order. Record `selection_basis: EQUIVALENT_DEFAULT`. Never promote this incidental choice into a project-wide preference.

When ambiguity is non-trivial, read [Provider Selection Contract](references/PROVIDER-SELECTION-CONTRACT.md) for edge cases and counterexamples.

### 5. Apply constraint and preference truth in the correct order

Select in this order:

1. the only candidate that survives hard requirements;
2. an exact hard source/provider constraint when it leaves one eligible source;
3. an eligible source satisfying the strongest current soft preference;
4. a stable default inside a proved equivalence class;
5. an explicitly acceptable alternative, returning `SELECTED_WITH_LIMITS` and naming every material loss;
6. otherwise `BLOCKED` or `UNSUPPORTED`.

A preferred source becoming unavailable does not automatically create an authority problem. If that preference was soft and another source satisfies every hard requirement, select the alternate and record the preference deviation. Ask for a choice only when substitution crosses a material boundary or violates a hard constraint.

### 6. Keep access observations separate from operation authority

Use current authentication/scope/source-system observations only to answer whether the source is usable for the requested capability/target now.

Do not infer:

```text
source selectable
=> operation authorized
```

A provider may be selectable for `tracker.update` while the actual write still needs approval or may be denied by the host/source system. That later authority belongs to the caller/runtime/action boundary.

Do not request broader credentials merely to make a preferred source selectable. Preserve the access limitation and choose another eligible source only when the request permits it.

### 7. Re-enter at the earliest invalidated selection fact

Re-resolve when a load-bearing fact changes before the selected source is used:

- required capability/fidelity/target boundary;
- provider/source identity or revision;
- current tool/action contract;
- source usability/access observation;
- hard constraint, soft preference, acceptable alternative, or indifference/equivalence assumption;
- a declared material cost/latency/provenance fact.

If only operation approval changes, do **not** redo provider selection unless that approval change also changes the eligible source set.

## Integration records are conditional

Ordinary provider selection does not require a persisted schema record.

When a real adapter or machine consumer supplies an exact resolution-record contract, materialize that contract **after** the selection decision and bind it to the live evidence the consumer requires. Treat the record as a projection of selection truth, not as permission or task status.

If the machine contract requires project/profile/side-effect fields that the current task does not truthfully have, do not fabricate them. Report the integration contract as `BLOCKED`/incompatible and preserve the provider-selection result separately.

## Output

Use a concise decision shape unless a caller supplies a stricter machine contract:

```yaml
status: SELECTED | SELECTED_WITH_LIMITS | BLOCKED | UNSUPPORTED
requirement:
  capability:
  hard_constraints: []
  soft_preferences: []
  acceptable_alternatives: []
selected_source:                 # null when not selected
  provider:
  kind:
  id:
  target_or_namespace:
  revision:
selection_basis: UNIQUE_ELIGIBLE | HARD_CONSTRAINT | SOFT_PREFERENCE | EQUIVALENT_DEFAULT | ACCEPTABLE_ALTERNATIVE | null
preference_deviations: []
limitations: []
unresolved_material_differences: []
evidence: []
refresh_if: []
```

Do not include credentials, tokens, secrets, or raw sensitive authentication material.

## Completion

`SELECTED` requires an exact source and current evidence that it satisfies every hard requirement. `SELECTED_WITH_LIMITS` additionally requires that the degraded/alternate mode was explicitly acceptable; a convenient downgrade is not enough.

Use `BLOCKED` when a material choice or fact remains unresolved. Use `UNSUPPORTED` only when current discovery is sufficient to conclude that no acceptable source exists. Never invent provider preference, cost, latency, equivalence, access, or authority to force a selection.
