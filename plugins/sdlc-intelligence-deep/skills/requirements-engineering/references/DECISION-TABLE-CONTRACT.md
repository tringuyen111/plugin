# Decision Table Contract

Read this only when several independent conditions or rules interact strongly enough that a decision table/model improves reasoning. The table is a semantic model, not a formatting requirement.

## 1. Name the decision before building rows

State:

- the business decision/question;
- decision-material inputs and their domain meaning;
- possible result(s);
- any source/authority that constrains resolution behavior.

Clarify ambiguous shared terms/facts before relying on them as conditions.

## 2. Declare match/result resolution semantics

Do not inspect overlap until the intended resolution semantics are explicit. Choose the smallest semantics supported by business truth, for example:

- **UNIQUE** — exactly one rule/row should match. Multiple matches indicate a modeling conflict or redundant/ambiguous partition that must be resolved.
- **EQUIVALENT_MULTI_HIT** — multiple rows may match only when they produce the same business result. Different results are a conflict.
- **PRIORITY** — multiple rows may match, but one result wins according to an explicit business-authorized priority ranking. The ranking is semantic data, not physical row order.
- **ORDERED** — matching rules are evaluated in a normative order only when the business authority explicitly makes that order part of the decision. Record the source of the order; never infer it from how a table happens to be sorted.
- **COLLECT / APPLY_ALL** — every matching result applies. State whether results are returned as a set/list or combined using an explicit aggregation/combination rule such as sum, min, max, count, or a domain-defined composition.

If no supported semantics can be established, keep the decision model `PARTIAL` or `BLOCKED` rather than choosing a convenient hit policy.

## 3. Analyze overlap relative to the declared semantics

For every input region where multiple rows can match, ask:

1. Is multi-match allowed by the declared semantics?
2. If one result must win, what business authority defines priority/order?
3. If all results apply, can they coexist, and how are they combined?
4. Does the overlap expose a deeper conflict between authoritative Business Rules?

Keep **Business Rule precedence/supersession** distinct from **decision-table priority/order**. Precedence answers which authoritative rule controls when authoritative rules conflict or replace one another. Table priority/order answers how one decision model resolves multiple matching rows. They may be informed by the same authority but are not interchangeable concepts.

## 4. Keep coverage and defaults explicit

- Enumerate or reason about material uncovered combinations.
- Do not infer `allow`, `deny`, zero, empty, or any catch-all result from missing rows.
- A default is valid only when business authority defines it.
- Preserve domain-significant `UNKNOWN` and `NOT_APPLICABLE`; do not collapse them into `false` when they can change the result.
- When exhaustive enumeration is impractical, identify the risk-bearing gaps and the source needed to close them.

## 5. Preserve reproducible result semantics

For calculations or collected results, record enough semantics to reproduce the business result:

- formula/derivation;
- unit/currency;
- rounding/precision;
- period/time basis;
- aggregation/composition order when it can change the result;
- boundary/bucket behavior.

Missing semantics that can materially change the result remain unresolved.

## 6. Challenge the model

Use examples that exercise:

- exactly one expected match;
- an overlap region;
- no-match/uncovered input;
- a priority/order tie or boundary when relevant;
- multiple collected results when relevant;
- `UNKNOWN` / `NOT_APPLICABLE` when relevant;
- calculation boundaries when relevant.

A table is ready only when its resolution semantics, material overlaps, coverage/defaults, and result combination are explicit enough to falsify. Physical row order alone never proves business priority.
