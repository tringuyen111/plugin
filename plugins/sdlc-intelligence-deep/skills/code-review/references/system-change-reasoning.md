# System Change Reasoning

Load this reference when the frozen change alters behavior, state, contracts, ownership, defaults/policy, recovery, or interactions across more than a trivial mechanical unit. The purpose is to decide **where review depth belongs** before the coverage ledger proves completeness.

Do not build a giant diagram for every change. Reconstruct only enough of the system around the changed behavior to expose changed assumptions, risky seams, semantic owners, and affected consumers.

## 1. Name the semantic change before inspecting every detail

Start from what becomes observably different, not from the file list:

```text
before behavior / meaning
  -> changed responsibility, contract, state, or assumption
  -> after behavior / meaning
```

Examples of semantic changes include:
- request completion no longer means business completion;
- a value becomes cached/reused rather than freshly read;
- one state transition becomes legal/illegal;
- a default/policy moves or gains a fallback;
- execution becomes asynchronous/retriable;
- an identity/authorization decision trusts a different source;
- a UI state gains a new authority or asynchronous writer.

If the change is genuinely mechanical and preserves behavior/ownership, record that evidence and keep this reconstruction shallow.

## 2. Reconstruct the bounded E2E behavior

Trace the changed responsibility through the smallest end-to-end path that can explain user/system consequences:

```text
entry / trigger
  -> decision / validation
  -> state reads/writes
  -> external effects
  -> observable outcome
  -> recovery / next attempt when failure is material
```

Generate branches from the mechanism, not from a generic edge-case checklist:

- **happy** — intended successful path;
- **edge/state** — boundary states, alternate valid inputs, stale/duplicate requests;
- **failure/partial progress** — failures before/after state or external effects;
- **concurrency/order** — overlapping writers, stale completion, reordering when the mechanism permits it;
- **recovery** — retry, replay, resume, rollback, compensation, invalidation, or terminal disposition when applicable.

The goal is not exhaustive combinatorics. Keep branches that can change correctness, compatibility, security/integrity, operability, or the chosen domain lens.

## 3. Identify state authority and invariants

Ask what must remain true across every material branch, and who is authoritative for each state/decision.

Useful forms:

```text
state transition: S1 -> S2 -> S3
invariant: condition that must remain true across branches
freshness/authority: which observation is allowed to win
completion: what fact means the operation is actually done
```

Examples:
- one business intent must not duplicate an external effect;
- a cache hit must preserve the identity/scope dimensions required by its consumer;
- visible UI results must correspond to the latest authoritative query;
- every path authorizing the same transition must apply one governing policy;
- a migration phase must remain restartable or have an explicit repair path.

Use these invariants to generate review hypotheses. Do not invent project policy that the source cannot support.

## 4. Build one semantic impact + ownership graph

Trace relationships around the **changed responsibility/invariant**, not only imports or changed files:

```text
changed responsibility / invariant
  -> callers / entry paths
  -> readers / writers
  -> enforcers / validators / policy owners
  -> persistence / caches / invalidators
  -> external contracts / consumers
  -> operators / recovery paths
  -> sibling implementations / fallbacks / defaults
```

Use the graph for two questions at once:

1. **Blast radius:** what depends on the old behavior/meaning and can now break?
2. **Ownership/reuse:** does something already own or implement this responsibility?

Search outside the diff only along concrete semantic edges discovered here. Do not turn review into an unbounded repository audit.

## 5. Decide reuse by semantics, not similarity

Code similarity is only a search signal. A reuse/consolidation candidate is stronger when these align:

```text
same responsibility / meaning
+ same governing invariant or policy
+ compatible state/lifecycle
+ compatible failure/recovery semantics
+ sensible common owner
```

Then prefer one owner with adapters/presentation at the edges over competing policy/default/validation implementations.

Reject forced consolidation when similar code lives under materially different semantics. For example, a request-scoped retry policy and a durable worker redelivery policy may share backoff arithmetic but differ in deadline, persistence, ambiguity, completion, and terminal failure. A small stateless primitive may be shareable while higher-level policy ownership remains separate.

Treat these as higher-risk than textual duplication:
- duplicate policy/default/validation/recovery authority;
- parallel state-transition rules;
- local fallback that bypasses canonical configuration/default resolution;
- new path that reimplements an existing authorization/eligibility decision;
- old/new implementations both active without an explicit migration boundary.

A review finding may require convergence on one semantic owner without prescribing the exact module/interface. Route a material seam/interface redesign to `codebase-design`.

## 6. Derive risky seams and activate domain lenses

Use the reconstructed model to focus expert depth where assumptions change:

```text
semantic change
  -> branch/invariant at risk
  -> concrete seam or owner
  -> applicable domain lens
  -> discriminating source/tool evidence
```

Examples:
- caller-visible acceptance/completion change -> API + async;
- mixed-version state/schema transition -> data/migration;
- cached authority/freshness -> performance + security;
- stale async UI completion -> frontend;
- duplicated canonical policy -> correctness/maintainability plus the policy's domain lens.

Multiple lenses may apply. Do not run every lens over every file.

## 7. Cross-check material truths after Code and Spec are frozen

Preserve the independent Code and Spec reports. Then compare only material claims discovered during review **within and across** these source classes (including docs <-> docs and code/config <-> code/config):

```text
authoritative spec / ADR / policy
          <->
descriptive docs / runbooks / comments
          <->
code / config / schema
          <->
tests / fixtures / generated contracts
```

For each contradiction, bind:
- the claim from each source;
- authority, applicability, and freshness;
- the concrete behavior/owner affected;
- whether evidence supports a source defect, stale documentation, false test oracle, config/schema mismatch, duplicate active truth, or an unresolved design/authority question.

Do not assume docs are correct because they are docs, or code is correct because it runs. Do not rewrite frozen Code/Spec findings after cross-learning. Record any newly discovered inconsistency with explicit `Cross-check` provenance.

## 8. Stop condition

The reconstruction is deep enough when the reviewer can state, for the material changed behavior:

- what changed semantically;
- the bounded E2E path and material branches;
- governing state/invariants/authority;
- concrete affected consumers/owners outside the local hunk when any exist;
- why the selected lenses are sufficient;
- whether an existing semantic owner should be reused/extended, must remain separate, or is unresolved;
- which material truth conflicts remain.

Then use the coverage ledger to prove no material changed unit or discovered edge was silently skipped. Do not keep expanding the graph without a concrete unresolved review hypothesis.
