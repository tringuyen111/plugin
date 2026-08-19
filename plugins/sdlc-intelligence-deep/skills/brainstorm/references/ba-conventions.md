# Brainstorm Audience and Representation Conventions

Use these conventions to keep Brainstorm useful to BA/PM/product stakeholders without flattening behavioral depth.

## 1. Runtime language versus artifact language

Runtime Skill instructions are English-first. The user-facing conversation and brainstorm artifact are language-adaptive.

Follow the language discipline in `SKILL.md`: explicit user/project language wins; when revising an existing durable artifact, preserve its established audience language unless the user intentionally changes it.

Quality rules:

- write fluent, natural prose in the selected primary language;
- do not translate established product/technical terms when translation would reduce precision;
- preserve exact UI/legal strings in their intended user language;
- preserve identifiers, provider names, proper nouns, and quoted evidence exactly when material;
- avoid gratuitous code-switching inside headings and explanatory prose;
- if a bilingual artifact is intentionally required, make the bilingual structure explicit rather than drifting between languages sentence by sentence.

## 2. BA-level depth

Ask and write about behavior at business/system-observable level:

Good:

- what the system validates or checks;
- what business information must be retained;
- which external provider is involved and for what business purpose;
- who triggers an action and when;
- what state/result the user can observe;
- business rules, limits, failure/recovery behavior, risks, and exact wording.

Do not force implementation design such as:

- database table/column/type choices;
- function/service/class names;
- endpoint/schema/SDK design;
- JWT versus session strategy;
- token rotation/hashing algorithm;
- framework or infrastructure selection.

Technical design belongs to the appropriate downstream owner unless the user explicitly asks Brainstorm only to record an observed existing constraint.

## 3. No-re-ask discipline

Before every question group, scan:

1. raw idea/source;
2. previous answers;
3. the full current consolidated brainstorm state or durable artifact, when one exists.

Treat known answers as state, not future questions. If an answer is partial, ask only for the missing decision variable.

Example:

```text
Known: remember-me defaults OFF.
Missing: how long should a user remain signed in after opting in?
```

Ask only the missing duration/rule.

## 4. Exactness without fabrication

Concrete values and strings expose ambiguity. Use them as probes, not as excuses to invent policy.

- vague value → ask one concrete follow-up;
- still vague → `TBD` + OQ;
- skill suggestion → `PROPOSED`;
- user/authorized decision → `DECIDED` within Brainstorm scope; assign `DEC-n` only when the accepted decision is material enough to require stable later reference;
- directly supplied fact/source claim → `OBSERVED`;
- unresolved conflict → `UNRESOLVED`.

## 5. Representation intelligence

Choose representation by information shape:

| Information shape | Preferred representation |
|---|---|
| ordered user/system behavior | numbered steps |
| branching/external/async flow | ASCII flow diagram |
| explicit condition with outcomes | decision table |
| role/state combinations | scenario matrix |
| governed lifecycle | state transition table/diagram |
| pending/retry/TTL/concurrency | interrupted-transaction matrix |
| exact user-facing copy | separate error/success/info wording groups |
| business uncertainty | assumptions + stable OQ list |
| business exposure | risk table with likelihood/impact/mitigation |

Do not create an artifact slot merely because the template contains it. Empty or decorative representation reduces signal.

### Decision-reference discipline

- `D1`, `D2`, ... may identify decision-point rows; they are not stable accepted-decision references.
- Use `DEC-n` only for material accepted choices/rules that need later reference; assign monotonically from the full current artifact/changelog (`max existing + 1`) rather than filling gaps.
- When an OQ becomes a decision, cross-link them (`OQ-3 resolved by DEC-7`).
- When a decision is replaced, the new `DEC-n` supersedes the old one; current prose keeps only the replacement rule while changelog preserves the supersession link.

## 6. Consolidated state, not a transcript

Keep **current consolidated meaning** whether Brainstorm is running only in conversation or in a durable artifact. When durable persistence is selected, one current artifact identity represents that meaning.

After a user answer:

- update the semantic section(s) affected;
- remove or replace superseded current behavior after conflicts are resolved;
- preserve traceability through stable `OQ-n`, material `DEC-n`, and changelog references; never reuse or renumber a `DEC-n`;
- do not append raw interviewer/user turns as the main artifact body;
- do not create a separate `final` copy when the user finalizes.

## 7. Finalization language

L1 should read like a product/BA review, not a developer mutation log.

Explain what is now understood, what is unresolved, and who should review next. Preserve exact numbers and key strings because they are business content, not technical metadata.
