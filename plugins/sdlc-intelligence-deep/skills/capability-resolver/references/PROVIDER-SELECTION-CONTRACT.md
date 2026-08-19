# Provider Selection Contract

Read this reference when more than one normalized source remains after hard eligibility checks, when a preferred source is unavailable, or when it is unclear whether a provider difference is material enough to block.

## 1. Source identity is not provider brand

Compare exact source bindings:

```text
provider + source kind + source id + target/namespace + observable revision + live tool/action contract
```

Two observations are duplicates only when they describe the same exact source binding. Collapse duplicate discovery paths before reasoning about ambiguity.

Do not infer target identity from a provider name. `Figma` with a personal source and `Figma` with a team source can be materially different even though the provider brand is the same.

## 2. Separate four kinds of selection truth

### Hard constraint
Failure makes the source ineligible.

Examples:
- "must use repository X";
- editable artifact is required;
- data must remain in a named workspace/region;
- exact provider/source is mandated by policy or user choice;
- required action is absent.

### Soft preference
Prefer when feasible, but a satisfying alternate remains eligible.

Examples:
- "prefer the local source";
- project convention says Provider A is preferred for ordinary reads;
- reuse the already-bound source to reduce churn.

A soft preference is not fallback authority and is not operation permission.

### Acceptable alternative
A different/lower mode is explicitly acceptable for this request.

Example:
- editable design preferred, but a text specification is acceptable when no editable source is available.

The alternative has its **own** hard requirements. If selected, return `SELECTED_WITH_LIMITS` and name the semantic loss.

### Indifference / proved equivalence
Selection is incidental only when every declared material dimension is equivalent for the current request and the caller/project does not care which source is used.

Do not infer indifference from silence when source choice can change target identity, data exposure, side effects, fidelity, provenance, or a declared optimization objective.

## 3. Materiality test for a remaining tie

For each remaining difference, ask:

1. Can it change **what target/data** the operation will touch or read?
2. Can it change **required fidelity/output semantics**?
3. Can it change **evidence/provenance quality** required by the caller?
4. Does a user/project rule make provider/source identity itself material?
5. Did the request make **cost or latency** a real objective, and is current evidence available?
6. Can it change another declared constraint that the caller would reasonably care about?

If yes and no selection truth resolves the difference, `BLOCKED`.

If no for every declared material dimension, the candidates may form a bounded equivalence class.

## 4. Stable default inside an equivalence class

A default is safe only **after** equivalence is established.

Use:

1. the source already bound to the exact target/session when still eligible;
2. otherwise a stable normalized source key such as `(provider, kind, id, target/namespace)` ordering.

Record that the basis was `EQUIVALENT_DEFAULT`. The default is local to the current request and must not become remembered project preference.

This stable rule exists to avoid menus and source churn, not to claim one equivalent provider is better.

## 5. Preference failure is not automatically a fallback gate

When the preferred source is unavailable:

- if the preference was **soft** and another source satisfies every hard requirement, select the alternate and record `preference_deviations`;
- if the preference encoded a **hard constraint**, do not substitute; return `BLOCKED` or `UNSUPPORTED` depending on whether more evidence/choice could change the result;
- if an explicitly acceptable alternative changes fidelity, select it only under its declared alternative contract and return `SELECTED_WITH_LIMITS`;
- if substitution changes a material target/data/authority boundary and no current choice authorizes that boundary, `BLOCKED`.

Do not create a generic "fallback authority" concept when ordinary preference semantics already decide the case.

## 6. Access and authority are different questions

Current connection/auth/source-system observations can make a candidate unusable. They do not authorize the eventual operation.

Examples:
- an app is installed but the user cannot access the target repository -> source is not usable for that target;
- a connector exposes `update` and current OAuth scope supports it -> this proves technical reachability only;
- a selected write-capable source still needs the caller/runtime to satisfy operation approval and confirmation rules.

Do not escalate credentials simply because a preferred source is unusable.

## 7. Cost, latency, quality, and popularity need evidence

Never choose based on remembered or assumed:
- price;
- latency;
- reliability;
- quality;
- brand popularity;
- discovery order;
- amount of surplus capability.

If the request explicitly optimizes one of these dimensions, obtain current comparable evidence or name the optimization fact as unresolved. If the dimension is not material, do not add it to the decision merely to manufacture a ranking.

## 8. Re-entry and stale truth

Re-evaluate selection when any load-bearing requirement or live source fact changes. Tool lists and provider action contracts can change; a provider name staying the same does not preserve selection validity when the exact source/action/revision changed.

Do not redo selection for an unrelated later approval change unless that change alters provider/source eligibility.

## Counterexamples

### Two sources, no preference, but same exact target and semantics
Both source observations resolve to the same target, expose the required read action/fidelity, and differ on no declared material dimension. Caller is indifferent.

**Correct:** form an equivalence class and use the stable bounded default.

**Wrong:** block solely because there are two names.

### Preferred provider unavailable, alternate fully satisfies hard requirements
Preference is documented as preferred, not mandatory. Alternate has the same required target, fidelity, and current usability.

**Correct:** select alternate, report preference deviation.

**Wrong:** demand a separate approval merely because the preference could not be honored.

### Same provider, different workspace
Two Figma bindings both support inspection, but one is personal and one is the project team workspace. The requested file/workspace identity is not yet known.

**Correct:** `BLOCKED` on target/source identity.

**Wrong:** pick either because provider brand matches.

### Cheaper/faster requested but no evidence
Two eligible providers satisfy all functional requirements. User asks for the cheaper one, but no current cost evidence is available.

**Correct:** `BLOCKED` on the material optimization fact, or ask the caller to drop that objective.

**Wrong:** guess from reputation.
