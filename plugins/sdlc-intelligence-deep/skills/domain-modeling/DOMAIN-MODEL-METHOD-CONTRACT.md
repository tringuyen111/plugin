# Domain Model Method Contract

Read this reference only when the modeling question involves more than an isolated term: concept identity, non-trivial relationships, invariants, lifecycle/time, multiple semantic contexts, or contradictory evidence.

The goal is not maximal model detail. The goal is the **minimum semantic structure that prevents a material downstream misunderstanding**.

## 1. Concept identity test

For each material candidate concept, pressure these questions:

| Question | Why it matters | Failure signal |
|---|---|---|
| What real/domain phenomenon does this concept denote here? | Separates meaning from labels | Definition points only to UI/code/table names |
| What examples are clearly instances? | Tests membership | Examples cannot be agreed without changing meaning |
| What counterexamples are clearly not instances? | Finds boundary | Everything vaguely related is included |
| How do we recognize the same instance over time, if identity matters? | Separates state from replacement | State changes unexpectedly create a “new entity” |
| Is this a role, state, classification, event, value, or independently meaningful concept? | Avoids category errors | “Manager”, “Active”, and “Approval” are all modeled identically |
| Is the word an alias/synonym or overloaded across contexts? | Protects language integrity | Different labels create duplicate concepts or one label merges incompatible meanings |

Do not force tactical DDD categories such as Entity/Value Object/Aggregate unless the actual downstream design decision needs them. Those patterns are not a prerequisite for a coherent business/domain concept model.

## 2. Relationship semantics

A relationship should be verbalizable as a meaningful domain fact, for example:

- `Owner delegates management authority to Manager for Property`
- `Lease grants occupancy rights to Occupant for Property`

Prefer a precise verb/role formulation over a generic connector.

Pressure each material relationship:

1. **Participants and roles** — the same concept may participate in several roles.
2. **Meaning** — what fact becomes true when the relationship exists?
3. **Direction/symmetry** — only when the distinction matters.
4. **Optionality/multiplicity** — record only when evidence supports it and downstream interpretation depends on it.
5. **Qualification** — scope, jurisdiction, segment, status, or other qualifier if it changes the relationship.
6. **Temporal validity** — effective/expiry or state dependence if the relationship can legitimately change over time.

### Relationship failure signatures

- `has`, `contains`, or `owns` hides several different business relationships;
- a database foreign key is treated as semantic proof;
- cardinality is guessed because a diagram “needs a number”;
- a role is modeled as a global subtype even though it exists only in one relationship/context;
- a time-bounded relationship is written as timeless truth.

Correction: return to the relationship meaning and re-test examples before adding downstream constraints.

## 3. Invariant test

Use three gates before calling something a domain invariant:

1. **Semantic necessity** — would violating the claim make the modeled domain state/relationship nonsensical or invalid for this context?
2. **Authority** — is there an accepted domain/business source with authority for the claim?
3. **Scope** — is it universal in this context, or only conditional on time, jurisdiction, product, segment, role, or lifecycle state?

If the claim is really a permission, threshold, calculation, precedence, policy, or eligibility decision, Domain Modeling may explain the concepts it constrains but should return the normative directive to Business Rule/Product authority.

Do not infer invariants from:

- DB `NOT NULL`, uniqueness, or foreign-key constraints;
- current UI validation;
- one code path;
- one example;
- a convenient assumption needed by implementation.

Those are evidence that may trigger a semantic question, not sufficient authority by themselves.

## 4. Lifecycle and temporal semantics

When time/state changes meaning, choose among these semantic shapes before any technical design:

| Shape | Use when | Pressure question |
|---|---|---|
| Same concept, different state | identity and obligations continue through state change | What stays the same that makes it the same thing? |
| Contextual role | one concept temporarily plays a role | Does the role disappear while the underlying concept remains? |
| Time-bounded relationship | a fact is true only during an interval/state | What event/condition makes the relationship valid or invalid? |
| Historical version | the concept remains identifiable while recorded attributes change | Which meaning requires history versus current view? |
| New concept from transition | the transition produces a semantically different thing | What new rights/obligations/identity begin at creation? |

Do not map these directly to database/history/event architecture. The model states semantics; Engineering selects representation.

## 5. Context validity and model plurality

A model is valid **within a semantic context**. A project can legitimately contain multiple coherent models.

Consider a context boundary when one or more hold:

- the same term has stable but materially different definitions for different business purposes;
- the same real-world thing is classified differently because decisions/obligations differ;
- teams must translate concepts rather than merely rename them;
- one model's invariant is not valid in the other context;
- shared vocabulary would create ambiguity rather than remove it.

Do not create a bounded context just because there is a separate team, repository folder, microservice, or database. Those can be clues, not semantic proof.

When two contexts interact, record only material relation/translation facts:

- what concept/value crosses the boundary;
- which context owns the meaning at each side;
- what translation/loss/normalization is required;
- what must not be assumed equivalent.

Technical integration remains Architecture/Engineering ownership.

## 6. Examples, counterexamples, and model pressure

Use examples as semantic tests, not decoration.

### Positive examples
Show clear instances/relationships that the model must explain.

### Boundary examples
Probe the edge where classification, role, state, or relationship could change.

### Counterexamples
Actively search for a real/plausible case that should fail the current claim.

Counterexample outcomes:

- **narrow** a concept/relationship scope;
- **split** an overloaded concept;
- **merge** duplicate/synonymous concepts;
- **reclassify** role/state/type/event distinctions;
- **qualify** a claim by context/time/condition;
- **retract** an unsupported invariant.

Do not “save” a falsified model by collecting arbitrary exceptions.

## 7. Contradiction and re-entry table

| Observed failure | Earliest re-entry | Typical correction |
|---|---|---|
| Same label means two stable things | context / concept identity | qualify by context or rename locally |
| Two labels behave identically in all relevant cases | concept identity | treat as aliases unless evidence distinguishes them |
| Counterexample violates definition | concept boundary | narrow/split/merge/redefine |
| Relationship fails in one role | relationship roles | add role/qualifier or split relationship |
| Cardinality only comes from schema | evidence/authority | remove or mark unresolved |
| “Invariant” has policy semantics | authority | hand off normative rule; retain semantic concepts |
| Lifecycle example breaks identity continuity | lifecycle shape | revisit state vs role vs new concept |
| Code conflicts with accepted domain truth | source truth | determine stale implementation vs reopened domain decision |
| Context map mirrors services/teams but semantic meanings are identical | context boundary | remove artificial context split |

Correction should update dependent model statements after the earliest failure; do not rewrite only the final glossary wording.

## 8. Representation selection

Pick representation from the question, not from habit:

- **definitions + aliases** — one/few isolated concepts;
- **concept/relationship table** — several structural facts, easy to review in prose;
- **small concept diagram** — relationships become hard to reason about linearly;
- **lifecycle/state view** — identity/validity changes over time;
- **context map** — multiple coherent vocabularies/models interact;
- **example/counterexample table** — disputed boundaries need evidence pressure.

A representation is optional. If prose is clearer, use prose.

## 9. Model-quality falsifiers

Treat the model as weak or incomplete when any material condition holds:

- terms are precise but their collective structure is still ambiguous;
- definitions depend on implementation names rather than business/domain meaning;
- role/type/state/event distinctions cannot survive examples;
- relationship multiplicity or invariants were invented rather than grounded;
- a global vocabulary hides real context-specific meanings;
- current code silently overrides accepted target semantics;
- contradictions remain but the output is reported as canonical/ready;
- the model is so detailed that it starts choosing software/data architecture rather than explaining domain meaning.
