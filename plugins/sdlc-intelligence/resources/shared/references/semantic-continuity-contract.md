# Semantic Continuity Contract

Read this contract when material product, behavior, design, technical, implementation, proof, or reusable-system capability truth must survive refinement or handoff across workflows, or when active execution can discover a new material gap.

This contract owns **semantic continuity and closure**, not project storage, domain design, task tracking, QA verdicts, or approval authority. Use [Role Boundary Reference](role-boundary-reference.md) for decision authority, [Claim Challenge Contract](claim-challenge-contract.md) for evidence challenge, [Artifact Linking Reference](artifact-linking-reference.md) for artifact-level handoff, and [Workflow Result Contract](workflow-result-contract.md) for workflow completion truth.

## Core invariant

```text
A material semantic obligation MUST NOT disappear.

incoming truth
-> refine / split / derive / implement / verify / supersede
-> every material outcome keeps explicit lineage or an explicit unresolved/disposition state
```

A downstream workflow is not complete merely because its own declared output is internally consistent. If a material incoming obligation has no lineage, proof, proven non-applicability, unresolved gap, or authorized delivery disposition, semantic closure is not established.

## Material obligation

A **semantic obligation** is a falsifiable piece of truth whose loss could materially change at least one of:

- user/business value;
- observable behavior, result, or state;
- rule or invariant;
- failure, recovery, or concurrency behavior;
- risk or blast radius;
- proof boundary required to establish the claim.

Do not hard-code domain inventories. UI fields, filters, pagination, API idempotency, migration invariants, AI evaluation conditions, operational recovery, and reusable-system capability/artifact-class obligations are examples only; the active owner derives obligations from current canonical truth and domain evidence.

### Materiality stop rule

Decompose while a child can be true or false independently in a way that changes value, observable behavior, rule, failure/recovery, risk, authority, or required proof. Stop when further division preserves the same semantic truth, outcome, owner, and proof boundary.

Temporary reasoning fragments remain ephemeral. Create stable identity only when a semantic obligation must survive handoff, can close independently, affects authority/risk/closure, or requires later traceability.

## Semantic lineage

Lineage is a logical continuity contract, not a graph-storage requirement. A project/provider may persist it in files, a tracker, a database, an external tool, or another selected truth location.

For a material obligation preserve enough information to reconstruct:

```text
stable identity
semantic claim or safe canonical source reference
source revision / provenance
origin and lineage relation
truth owner / authority scope
materiality reason when not obvious
truth / execution / delivery state
evidence references needed for closure or reopen
```

Prefer canonical source references over duplicated prose when the claim can be reconstructed safely from a stable revision. Evidence references preserve producer/source, candidate or revision binding, scope, freshness, and raw-artifact location; a summary such as `tests_passed=true` is not proof truth.

### Lineage operations

Use the smallest operation that preserves current truth:

- **REFINE** — meaning becomes more precise but remains one semantic claim; keep identity and advance revision/provenance.
- **SPLIT** — a parent is too broad for independent closure; create material children and derive parent closure from them.
- **DERIVE** — current truth necessarily exposes a new material consequence; preserve the source relationship without pretending the parent was merely partitioned.
- **DISCOVERY_GAP** — a material question or contradiction cannot be decided within the current owner's authority; externalize it and route to the nearest owner of that truth.
- **SUPERSEDE** — authoritative semantic truth materially changes; preserve history/lineage, bind the replacement, and re-evaluate affected downstream proof.

Do not create a new identity for wording cleanup, metadata changes, evidence refresh, source relocation, or another update that does not create a new independently meaningful truth.

## Three independent state axes

Do not compress correctness, execution progress, and delivery governance into one status.

```text
Truth:
  UNRESOLVED | NOT_PROVEN | PROVEN | CONTRADICTED | N_A_PROVEN

Execution:
  INACTIVE | ACTIVE | SUSPENDED | VERIFYING

Delivery disposition:
  NORMAL | CONTINUE_TO_PROVE | WAIVED | DEBT_ACCEPTED | BLOCKED
```

`PROVEN` is scoped to the bound truth/source revision and evidence. A material upstream change, stale evidence, new child gap, or runtime contradiction reopens the affected obligation to `NOT_PROVEN`, `UNRESOLVED`, or `CONTRADICTED` as evidence requires.

`WAIVED` and `DEBT_ACCEPTED` authorize a delivery decision only when the correct authority, exact scope, rationale, impact/residual risk, and revisit/expiry condition are visible. They never rewrite `NOT_PROVEN`, `CONTRADICTED`, `FAIL`, `NOT_RUN`, or `INCONCLUSIVE` into success.

`N_A_PROVEN` requires affirmative applicability evidence and scope. Silence, an omitted design, an absent test, or "not needed" without evidence is not non-applicability; treat it as unresolved continuity.

## Progressive active-unit protocol

Map the wider work shallowly only far enough to identify dependencies, overlap, and an executable frontier. Exactly one semantic work unit is **deep-ACTIVE** at a time.

For the ACTIVE unit:

```text
bind canonical truth + revision
-> reconstruct expected truth
-> load minimum sufficient semantic context
-> decompose or route upstream if the truth is still too broad/ambiguous
-> form proof expectation and observable boundary
-> execute the smallest coherent change or analysis
-> inspect real source/runtime/artifact evidence
-> challenge the expected truth and evidence
-> externalize discovered material deltas/gaps
-> commit/checkpoint the validated semantic delta
-> close, suspend, block, or continue-to-prove
-> only then deep-activate the next unit
```

### Minimum sufficient semantic context

Do not deep-load all sibling tasks or artifacts "for completeness." Load the active claim, material ancestors/value, current owner decisions, direct material children/gaps, dependencies that can change the claim, proof expectation, relevant evidence references, contradictions/assumptions, and source revisions.

Expand context only when the agent can name the missing truth, dependency, proof boundary, or discovery relationship and why it can change the ACTIVE unit. Newly observed evidence may reveal a previously unknown dependency and justify expansion.

If an ACTIVE unit accumulates multiple independent truths, branches, owners, or proof boundaries, split or suspend it instead of stuffing more independent state into one reasoning context.

## Discovery and reverse diagnosis

A material discovery MUST be externalized before long execution continues. Do not rely on working memory to revisit it later.

When expected continuity is missing or contradictory, diagnose before routing. Useful diagnoses include:

```text
UPSTREAM_UNDERSPECIFIED
DOWNSTREAM_OMITTED
CROSS_ARTIFACT_CONTRADICTION
UPSTREAM_OBSOLETE
UNJUSTIFIED_DOWNSTREAM_BEHAVIOR
REALITY_CONSTRAINT_CONFLICT
```

The taxonomy is extensible; the invariant is not. Route to the nearest owner of the truth that must change. If resolving a lower-level constraint would change upstream intent/value, continue the route-back until the authoritative decision is reached.

`MISSING_CONTEXT` is a discovery signal, not a completion disposition. Identify exactly what fact/source/capability/relationship is unknown and attempt the smallest justified evidence/context expansion. If it cannot be resolved, keep the affected truth unresolved and block only the scope that depends on it.

## Truth-first proof and challenge

Before relying on implementer explanations, existing tests, or evidence summaries, reconstruct what should be true from canonical requirement/design/technical truth and form the expected observable proof boundary.

Before material closure:

1. try to find a contradiction to the expected truth;
2. look for a material obligation or sibling behavior that disappeared;
3. attack the weakest evidence/provenance binding;
4. ask what requirement/business/operational value would be lost if this claim were false or omitted;
5. use [Claim Challenge Contract](claim-challenge-contract.md) when the claim is load-bearing, disputed, contradicted, or authorizes completion/readiness.

Developer-green tests can prove their declared seam without proving parent semantic completeness. Existing evidence may confirm, contradict, reveal a new branch, or force a revised hypothesis.

Use this precedence when proof is difficult:

```text
expected truth not independently falsifiable
-> DECOMPOSE or RETURN_TO_OWNER

truth clear but observable boundary unclear
-> ESTABLISH PROOF BOUNDARY

boundary clear but evidence weak/indirect/stale
-> STRENGTHEN EVIDENCE

truth + boundary clear but residual impact/conflict/assumption remains material
-> ESCALATE ASSURANCE
```

Do not use stronger verification to hide an underspecified requirement, and do not decompose indefinitely merely because evidence is expensive.

## Recursive closure

A parent semantic obligation is proven closed only when:

```text
own truth = PROVEN | N_A_PROVEN
AND every material child satisfies closure
AND no material discovery/gap branch remains unresolved
AND required pre-closure challenge completed
AND evidence/provenance remains valid for the bound revision
```

Parent closure is derived; an agent MUST NOT set it by narrative assertion. An authorized waiver/debt may make a delivery path proceedable under [Role Boundary Reference](role-boundary-reference.md), but the parent remains truthfully not proven when underlying required truth/proof is open.

## Coverage handshake

At a cross-owner or cross-stage handoff, the receiver checks semantic coverage before accepting the work as continuity-complete:

```text
Incoming   material obligations received
Consumed   obligations this stage actually considered
Changed    REFINE / SPLIT / DERIVE / SUPERSEDE operations
Unresolved discovery gaps, contradictions, missing context
Outgoing   lineage + truth/disposition + proof/evidence references
```

The receiver MUST reject/hold semantic closure when a material incoming obligation disappears without lineage or disposition. This is coverage acceptance, not a requirement for human approval on every handoff.

Human/owner decision is required only when a material truth or governance decision exceeds the current workflow's authority. A canonical upstream truth change reopens affected downstream proof; downstream owners re-evaluate and may challenge new contradictions, but do not co-approve a decision merely because it affects their work.

Use [Artifact Linking Reference](artifact-linking-reference.md) to serialize the artifact-level handoff after semantic coverage is reconciled.

## Provider boundary

SDLC owns the semantic invariants above; it does not mandate physical lineage storage.

A provider may offer capabilities such as identity resolution, relevant-lineage read, revision binding, validated-delta commit, affected-dependency lookup, evidence-reference lookup, and stale/conflict detection. Provider-side impact results are candidates for semantic re-evaluation, not automatic invalidation decisions.

A weak/project-native provider is valid when it preserves the required facts/decisions truthfully. Unsupported capabilities MUST be reported as unsupported; use targeted source inspection for the ACTIVE scope when possible and leave broader impact/closure unproven when it cannot be established. Never weaken continuity invariants to fit a provider.

Persist facts and authorized decisions that cannot be reconstructed safely; derive conclusions and context projections when needed. Context capsules, prompt summaries, candidate impact lists, and parent closure are derived working state, not competing canonical truth.

## Suspend / resume checkpoint

When the ACTIVE unit suspends for a prerequisite, discovery gap, or owner decision, preserve enough checkpoint state to resume without trusting the checkpoint as truth:

```text
active obligation identity + bound source revision
expected truth / current hypothesis
proof expectation / observable boundary
evidence already inspected
known contradiction / unresolved question
reason for suspension + child/dependency branch
```

On resume, re-read/revalidate the canonical source revision, resolved child/gap, and evidence freshness. Recompute stale hypotheses before continuing.

## Child workflow exit contract

A material child workflow cannot establish semantic closure with a narrative `done` alone. Its control handoff must make these meanings available to the parent/control layer, in any project-appropriate representation:

```text
active semantic unit
current truth state
material refine/split/derive/discovery/supersede deltas
real evidence inspected and revision/provenance binding
challenge outcome
open material children/gaps
delta/checkpoint persistence result or unsupported capability
reason closure / suspension / block / continue-to-prove is valid
```

If the parent/control layer cannot derive closure from this information, semantic closure remains unproven even when the child workflow itself returns `READY` for its narrower declared job.

## Completion boundary

This contract does not create Product, BA, Design, Architecture, Engineering, QA, UAT, release, or risk-acceptance authority. It does not define domain-specific artifact fields and does not turn all work into a global serializer format.

Semantic continuity is established only for the scope whose canonical truth, material lineage, challenge, evidence, and unresolved/disposition state are inspectable. Missing wider provider support or unexamined legacy branches remain explicit; bootstrap old lineage just-in-time when it becomes material rather than claiming whole-project coverage by default.
