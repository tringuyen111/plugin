# User Story Branch
Express one valuable user capability as a concise, negotiable delivery token. A Story is not a complete requirements dossier: use the **Card -> Conversation -> Confirmation** model while preserving a coherent actor-visible value slice.

A User Story connects Product intent to delivery-facing actor value. It does not own Business Rule authority, detailed acceptance, Product priority or metrics, visual design, technical tasks, test cases, QA evidence, UAT verdicts, or release truth. Story maturity is requirement maturity only.

## Contents

1. Progressive context
2. Ground target truth
3. Card -> Conversation -> Confirmation
4. Ownership boundaries
5. Anti-patterns
6. Completion


## Progressive context

- Read `USER-STORY-SLICING-CONTRACT.md` when the Story is oversized, dependency-heavy, solution-shaped, proposed as frontend/backend/database work, or difficult to split without losing actor value.
- Read `USER-STORY-FORMAT.md` only when the user/project needs a durable governed Story artifact, exact source/revision binding, change-impact links, or a reusable artifact projection. A lightweight draft/review does not require the full persistence format.
- Use the **Use Case branch** only when interaction sequence, preconditions/postconditions, alternate/error flows, or actor-system behavior must be resolved to determine the Story boundary. A missing Use Case artifact alone never blocks a grounded Story.

## Ground target truth without inventing ceremony

Use the strongest available truth that can change actor, capability, value, scope, slice, dependency, or confirmation:

1. authorized Product outcome/feature scope when available;
2. Behavior/Use Case truth when interaction semantics are material;
3. authoritative Business Rules and quality requirements (including project NFRs) that constrain the slice;
4. current verified behavior for existing-product context;
5. explicit assumptions or unresolved questions.

Do not fabricate Story IDs, source IDs, revision numbers, approval states, or downstream references to make a template look complete. When canonical sources/revisions exist or persistence is requested, bind them exactly. Otherwise preserve the useful semantics without fake governance metadata.

Current verified runtime/business behavior may constrain refinement, but it does not silently override authorized Product intent. When a real canonical Product/Behavior/Rule revision changes materially, revalidate only the affected Story meaning and use `/traceability` for downstream lineage/change-impact when downstream artifacts actually exist.

## Card -> Conversation -> Confirmation

### 1. Card — capture the value token

Resolve the smallest useful statement of:

```text
specific actor -> capability -> benefit/outcome -> coherent value boundary
```

`As a <actor>, I want <capability>, so that <benefit>` is a useful default representation, not a semantic validity gate. A free-form statement is valid when actor, capability, value, and slice meaning are equally clear.

Do not make a UI control, endpoint, table, queue, service, refactor, migration, or infrastructure change the capability merely because it appears in the request. Recover the actor goal/value first unless an authorized source makes a concrete interaction part of the required experience or external contract.

### 2. Conversation — resolve only decision-changing ambiguity

Use conversation to expose or resolve uncertainty that could change:

- actor or permission boundary;
- capability or user/business benefit;
- in/out scope or value slice;
- applicable rule/quality constraint;
- dependency class or blocking effect;
- what Confirmation must observe.

Do not expand a lightweight Story into a complete requirements document. If a missing business policy, Product choice, or behavior decision changes Story meaning, keep it explicit as unresolved and use the canonical Product/Rule/behavior capability or authority rather than inventing it.

If detailed actor-system sequence, alternate/error flow, precondition, or postcondition is the unresolved truth, load the **Use Case branch** for that concern and continue in the same Requirements evidence chain; do not make every Story depend on a pre-existing Use Case artifact.

### 3. Value slice — preserve actor-visible coherence

The Story should be independently understandable and negotiable as one actor-value unit. "Independent" does not mean dependency-free implementation.

For material dependencies, preserve what is known about the dependency, its owner/source when real, whether it blocks the value or only implementation sequencing, and what becomes unavailable if it is unmet. Do not manufacture separate technical Stories merely to hide dependencies.

Prefer a vertical/end-to-end value slice. Do not split one capability into frontend/backend/API/database/infrastructure Stories merely because multiple components or teams must change. Technical tasks can remain separately planned under Engineering while one coherent Story preserves the actor outcome.

Refactors, migrations, observability, infrastructure, security mechanisms, and similar technical work remain technical enablers unless they independently express grounded actor/business value.

Use `USER-STORY-SLICING-CONTRACT.md` when the correct split/no-split decision is not obvious.

### 4. Confirmation — continue into observable acceptance

When actor, capability, value, slice, and material decision-changing uncertainty are stable enough to confirm, use the **Acceptance Criteria branch** for detailed observable acceptance. Pass exact Story/source references only when they really exist; otherwise pass the grounded Story meaning and unresolved truth without inventing identifiers.

Confirmation is not implementation or QA completion. A Story can be ready for acceptance definition while implementation, QA, UAT, priority, and release state remain entirely with their canonical owners.

## Ownership boundaries

- **Product owns priority**, Product outcomes/metrics, feature-scope authorization, and opportunity cost.
- the **Acceptance Criteria branch** owns detailed acceptance; User Story owns delivery-facing actor value and the coherent Story slice.
- the **Use Case branch** owns detailed actor-system interaction sequence when that behavior depth is material.
- The **Business Rule** and **Quality Requirement** branches keep rule/quality semantics; Story links or carries only constraints that materially affect the value boundary.
- Architecture/Engineering own technical design, tasks, implementation, and technical enablers.
- `/traceability` owns downstream impact/staleness traversal after material changes to persisted approved truth.
- QA/UAT/release owners keep their evidence and status; Story maturity never absorbs those states.

## Anti-patterns

Invalid or suspicious:

```text
As the database, I want a new index so queries are faster.
As a user, I want a dropdown so I can select a value.
As engineering, we want to refactor the service.
Frontend story + backend story + database story for one actor capability.
```

Prefer actor-value meaning such as:

```text
Property managers can settle several eligible rooms in one review, avoiding repeated room-by-room checks.
```

The same Story could also be rendered as `As a / I want / so that`; changing the sentence form does not change its semantic validity.

## Completion

A Story is ready for the next acceptance conversation when:

- actor, capability, benefit/outcome, and value-slice boundary are specific enough for the current use;
- material rules, dependencies, and assumptions are linked or explicitly unresolved without invented truth;
- solution/technical work has not been mistaken for actor value;
- no decision-changing interaction semantics remain hidden inside the Story boundary;
- the **Acceptance Criteria branch** can define observable confirmation without inventing scope.

For a **durable governed Story artifact**, also require the real canonical IDs/revisions/source links that project policy or the requested persistence operation needs. Do not impose those persistence fields on lightweight drafts or reviews.

A material unresolved dependency/policy/behavior decision keeps the result `PARTIAL` or `BLOCKED` only when it can change Story meaning or Confirmation. Missing ceremony by itself does not. `READY` never asserts implementation, QA, UAT, Product priority, or release completion.
