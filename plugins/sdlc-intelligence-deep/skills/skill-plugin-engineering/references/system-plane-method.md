# System Plane Method

This reference is loaded only when the System Plane itself is the target inside **Skill / Plugin Engineering**. It is not a separately invokable runtime owner, phase router, or prerequisite for ordinary Skills.

Engineer the governing semantic plane itself. The System Plane defines **what must remain true across capabilities**; runtime orchestration and individual Skills decide **how their own work preserves those laws**.

Ordinary runtime work must not depend on this conditional method being loaded.

## Accountable result

Produce the smallest coherent System Plane result required by the request:

- **audit** -> bound semantic model, contradictions, gaps, and verdict;
- **create/upgrade/reconcile** -> revised laws plus material projection/migration impact;
- **projection** -> faithful resident or Skill-local projection without hidden dependency;
- **qualification** -> evidence verdict for the exact claim and revision.

Do not force every run to end in behavioral qualification. Evidence requirements follow the **claim being made**. A missing stronger proof blocks only claims that depend on it unless project policy explicitly makes that proof a gate.

## Atomic control workflow

Keep this control path in this conditional method. Supporting references may deepen HOW, but may not introduce a mandatory gate, branch, abort condition, re-entry edge, or completion rule absent here.

```text
BIND -> MODEL -> FRONTIER -> CHALLENGE -> REVISE -> PROJECT -> PROVE -> CLOSE
          ^          |          |          |          |
          |----------|----------|----------|----------|
        re-enter at earliest invalidated truth; follow dependents only
```

### 1. BIND — fix the terminal claim and current plane

- Name the requested terminal result: audit, semantic revision, projection, migration, qualification, or a bounded combination.
- Bind exact source/revision and only the resident, Skill-local, package, documentation, and evaluation surfaces that can change that result.
- Treat prior summaries, filenames, and labels such as `System Plane` as hints until source confirms the actual laws.
- Record the evidence strength the terminal claim actually needs. Do not make behavioral uplift a hidden requirement for a semantic or structural task.

### 2. MODEL — read small and externalize understanding immediately

Use a working ledger while reading. After every decision-relevant slice, record the minimum needed state before loading more:

- `LOGIC` — how the inspected thing works;
- `FACT` — verified current truth;
- `RELATION` — ownership, dependency, projection, or causal relation;
- `CONTRADICTION` — incompatible claims/mechanisms with provenance;
- `DECISION` — evidence-backed current choice;
- `OPEN` — uncertainty that can change the result;
- `EVIDENCE` — load-bearing source pointer/revision;
- `FRONTIER` — current reasoning/mutation position.

**Read gate:** before loading more, ask whether the next source can change a law, contradiction, decision, projection, authority, or proof claim. If not, skip it.

Do not read the whole corpus and summarize afterward. Consolidate only after raw logic and contradictions are externalized; a summary must not erase stronger findings.

### 3. FRONTIER — locate the smallest governing weakness

- Separate **semantic law** (what must remain true) from **projection/mechanism** (how a host, Plugin, Skill, or workflow preserves it).
- Use materiality and semantic uncertainty x consequence before expanding scope.
- Stop mutation when the missing truth can materially change the law; keep unaffected work moving when the blocker is claim-local.
- When bound truth changes, trace the decisions/claims/actions that actually depend on it. Reopen that affected region and preserve independent proven state; a shared/root premise may invalidate the whole outcome.
- Do not promote a local method merely because it is elegant, reusable, or already repeated.

### 4. CHALLENGE — prove a candidate deserves System Plane status

When existing rules appear to conflict, first classify the dimension: authority/instruction scope, truth/evidence, accountable ownership, governing semantics, or local method/specificity. Do not invent one flat precedence list across these dimensions. Preserve unresolved same-dimension conflict as contradiction rather than choosing by recency or attention.

A candidate law must pass this **law-promotion fitness gate**:

| Test | Pass condition |
|---|---|
| Cross-capability | Governs materially different accountable jobs, not one local method |
| Mechanism-independent | Meaning survives provider, tool, workflow, and implementation changes |
| Governing consequence | Removing it can change correctness, authority, evidence, or safe continuation |
| Locality pressure | At least one adjacent capability needs the meaning without inheriting the source Skill's method |
| Falsifiability | A realistic counterexample can show the proposed law is wrong or over-broad |

If a candidate fails the first two tests, keep it local or classify it as an orchestration/runtime mechanism instead of weakening the plane.

Pressure-test at least one adjacent capability and one near-miss/counterexample before universalizing a non-obvious law.

### 5. REVISE — change semantics, not prose volume

- Revise the smallest coherent set of laws/relations that fixes the observed weakness.
- Classify the lifecycle action: `promote`, `clarify`, `revise`, `demote`, or `retire/replace`. Treat a change as clarification only when applicability, authority direction, state distinctions, and consequences remain unchanged; otherwise bind it as a semantic revision and reassess affected consumers.
- Preserve contradictions until evidence or authority resolves them; do not average them into vague prose.
- Choose representation by reasoning shape: invariant, decision table/tree, state/re-entry model, matrix, typed relation, or deterministic schema/tool.
- Keep laws independent of fixed SDLC phase order and provider mechanics unless those are explicitly the governing subject.
- Read [System Plane Model](system-plane-model.md) when creating or revising semantic laws.

### 6. PROJECT — preserve meaning at the consumer

For every changed law, identify only material consumers.

Choose the smallest projection class that preserves correctness:

- **resident** — semantics that must remain salient across ordinary work/context transitions;
- **Skill-local** — semantics an independently invoked Skill needs to perform its own accountable job;
- **evaluation** — assertions capable of falsifying the exact law/projection;
- **runtime/orchestration mechanism** — state/control machinery that implements a law but does not own its meaning.

Never replace required local reasoning with a conditional System Plane reference load. Never infer a lifecycle route from projection.

Check semantic equivalence across applicability, normative direction, authority/owner, state distinctions, scope, consequence, and re-entry. Similar wording is not proof of an equivalent projection.

Read [Projection Contract](system-plane-projection-contract.md) when projection class, conflict resolution, semantic equivalence, or standalone sufficiency is material.

### 7. PROVE — match evidence to the exact claim

- Freeze exact candidate revision, changed law/projection, expected delta, and falsifier before review.
- Use structural/static proof for structural/static claims and behavioral execution only for behavioral claims.
- If a reproducible runner is unavailable, mark affected behavioral axes `NOT_RUN`; do **not** turn that into a universal blocker for already-satisfied semantic/structural outcomes.
- If behavioral uplift is itself the requested terminal claim, missing comparable execution remains a blocker for that uplift claim.
- Never self-grade an interactive session as independent qualification.

Read [Qualification](system-plane-qualification.md) when execution strength, comparison, or independent evidence is material.

### 8. CLOSE — migrate only what changed and re-enter correctly

- Update consumers by meaning, not by global string replacement.
- Remove superseded active truth only after replacement parity for the material obligation is established.
- Stop when the requested outcome and its material correctness, authority, and evidence obligations are satisfied.
- Keep stronger unresolved claims visible without forcing unrelated work to continue.

Re-entry scope follows dependency, not workflow order. Reopen the invalidated premise plus every material dependent state; preserve state with no dependency on that premise. Whole-outcome re-entry is justified only when the changed premise is a shared/root dependency of the outcome.

Re-entry:

| Failure | Return to |
|---|---|
| source/current truth was wrong | `BIND` |
| semantic model missed a law/contradiction | `MODEL` |
| proposed law is local/over-broad | `FRONTIER` / `CHALLENGE` |
| law is sound but expression is wrong | `REVISE` |
| projection distorts meaning | `PROJECT` |
| evidence is invalid/inadequate | `PROVE` |

## Decision gates

Use these throughout the workflow:

- **Read:** can the next source change the current material decision or proof?
- **Conflict:** which semantic dimension is actually in conflict, and what evidence/authority can resolve it?
- **Promotion:** has the candidate earned cross-capability law status?
- **Lifecycle:** is this a clarification, semantic revision, demotion, or replacement?
- **Artifact:** does a new artifact have a real semantic, continuity, qualification, or consumer role?
- **Projection:** what is the smallest surface that must carry this meaning?
- **Authority:** does the agent actually own the proposed semantic/migration consequence?
- **Proof:** which exact claim or falsifier does this evidence close?
- **Re-entry:** which completed/active states actually depend on the invalidated premise, and is that premise local or shared/root?
- **Stop:** are the requested outcome and material obligations already true?

A `no` at a gate should normally reduce work, not create a new checklist.

## System Plane boundary

System Plane may govern cross-capability truth, contradiction, typed conflict resolution, authority, evidence, materiality, rigor, economy, context discipline, representation, and completion.

It does **not** own:

- user/product intent or protected decisions;
- fixed Product -> Requirements -> Design -> Engineering -> QA routing;
- active runtime owner, working set, paging state, or continuation ledger;
- one Skill's domain-specific method;
- provider/tool mechanics;
- project-specific facts/backlog state.

These may be constrained by System Plane laws while remaining owned by their proper capability or runtime mechanism.

## Completion

Report only the terminal result requested, while keeping these truths explicit when material:

- exact target/revision;
- current and changed law(s);
- preserved contradiction/open uncertainty;
- projection/migration impact;
- authority boundary;
- evidence state per claim;
- earliest re-entry point for anything unresolved.

Native Skill/package validity, polished wording, or self-consistency are never behavioral proof. Conversely, unavailable behavioral proof must not erase or indefinitely block a narrower semantic/structural result that did not claim behavioral uplift.
