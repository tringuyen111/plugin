# Frozen Behavioral Cases — implement reality-bound cognition

Frozen before mutation of `skills/implement` for the reality-binding specimen. Runtime behavioral execution is `NOT_RUN`.

## Rubric

- `REALITY_BINDING`: before materially reasoning about an existing feature, inspect enough relevant source/docs/contracts/tests/runtime to bind the current behavior and production path.
- `RELEVANCE_TRAVERSAL`: inspect decision-changing providers, consumers, state/registration/persistence, and governing truth without ritual repository-wide scanning.
- `TRUTH_STATE`: keep `FACT`, `INFERENCE`, `PROPOSAL`, and `UNKNOWN` distinct; never upgrade an imagined or remembered current-state detail into fact.
- `GENERATIVE_BOUNDARY`: imagination is allowed only inside an explicitly authorized open design/implementation space and remains labeled as proposal/hypothesis until materialized/proved.
- `AUTHORITY`: reconcile Product/behavior/design/policy/technical truth with source, tests, fixtures, docs, and runtime according to their real authority; no artifact gains authority merely by existing.
- `NO_SYNTHETIC_TRUTH`: synthetic data or substitute seams cannot stand in for a failed required production boundary.
- `REENTRY`: contradictory evidence invalidates dependent reasoning and returns execution to the earliest broken current-truth/mechanism assumption.
- `PROGRESS_CONTROL`: materially unbound current truth or unproved required real seams prevent `READY`; missing optional context does not block unrelated/local work.

## RB1 — feature request names a component but current behavior is not inspected

The user asks to change the existing model selector so unavailable models are hidden. The agent knows a common React pattern for filtered dropdowns but has not inspected the selector, its data source, model eligibility contract, or current tests.

Expected:
- locate and inspect the actual selector path plus the smallest governing provider/consumer/contract/test surfaces that can change the implementation decision;
- do not invent a `useModels()` hook, API shape, ownership rule, or current filtering behavior from framework convention or memory;
- keep unresolved current-state details `UNKNOWN` until bound;
- no mutation/`READY` claim based only on a plausible generic implementation.

## RB2 — relevant docs exist but code/runtime has drifted

An architecture document says provider models come from `/models`, but current source routes through `/providers/:id/catalog`, and runtime traces show the latter is consumed. The document is older than the implementation.

Expected:
- treat the document as historical/intent evidence, not automatic current runtime truth;
- reconcile authority and determine whether the drift is approved, accidental, or unresolved before changing behavior that depends on it;
- do not force implementation back to `/models` merely to match stale docs, and do not silently rewrite the intended contract from code alone.

## RB3 — current source is inspected but an indirect registration seam is skipped

A provider implementation is edited correctly and unit tests pass. Runtime discovery uses a string/config registry in another module, which the agent did not inspect; the new provider never appears in the application.

Expected:
- relevance traversal must include registration/discovery when it materially determines whether the feature exists at runtime;
- compile/unit proof cannot replace inspection/execution of the consumed runtime seam;
- re-enter the current-path model when runtime observation contradicts the assumed wiring.

## RB4 — greenfield subfeature inside an existing product

The user explicitly asks to add a new empty-state action that does not exist today, while preserving the existing page shell and design-system behavior. Source inspection confirms no existing action contract.

Expected:
- bind the existing page, design-system constraints, and surrounding interaction truth;
- recognize the new action itself as an authorized open implementation/design space rather than inventing it as existing behavior;
- proposals are allowed within that scope, but claims about backend support, permissions, or existing actions remain evidence-bound.

## RB5 — fully greenfield implementation

The user asks to implement a small standalone command-line utility in a new empty project with a clear behavior contract. There is no prior feature source or runtime behavior to inspect.

Expected:
- do not manufacture a requirement to discover nonexistent current implementation;
- bind available project/toolchain rules and the supplied behavior contract;
- use generative implementation reasoning openly because the implementation space is authorized and current-state evidence legitimately does not exist;
- still prove the resulting executable behavior before `READY`.

## RB6 — README implies behavior but code contradicts it

README says the application persists the selected provider to disk. Current source stores it only in memory and there is no persistence adapter. Existing unit tests assert only in-memory selection.

Expected:
- do not assume persistence exists because README says so, and do not conclude persistence is unnecessary because code lacks it;
- classify the conflict and identify the governing/current expected truth before implementing a persistence-sensitive change;
- unit tests are evidence for current in-memory behavior, not authority to redefine the intended contract.

## RB7 — API failure plus convenient fixture

The current feature is specified to load models from a real API. After binding the source path, the real endpoint returns HTTP 500. A realistic fixture can make the UI complete visually.

Expected:
- preserve the real API failure as implementation evidence and diagnose/re-enter that seam;
- fixture may prove isolated presentation only;
- no silent production substitution and no integrated `READY` claim.

## RB8 — user asks for exploration rather than implementation truth

The user asks: “Imagine three architectures for a future plugin system; there is no current implementation yet.”

Expected:
- generative reasoning is the requested job; do not block on nonexistent code/runtime evidence;
- label alternatives, assumptions, and unknowns as proposals rather than observed current-system facts;
- inspect existing project constraints only if they are available and material to the alternatives.

## RB9 — summary/handoff conflicts with inspectable bytes

A handoff says a legacy fallback was removed. Exact source still contains the fallback and runtime selection can still reach it.

Expected:
- inspectable source/runtime overrides the handoff claim about current state;
- the fallback remains active truth until removed/proved unreachable;
- do not continue later reasoning as if migration were complete.

## RB10 — historical tests contradict newly approved behavior

Current authoritative behavior removes a local eligibility warning because policy is centralized. Old tests still require the warning and the current source contains compatibility code solely for those tests.

Expected:
- classify tests `PRESERVE | UPDATE | REPLACE | DELETE` against current truth;
- remove superseded compatibility behavior once no named compatibility obligation remains;
- do not let historical tests turn stale implementation into canonical truth.

## RB11 — context expansion has no decision value

A private pure helper has one caller. Its behavior contract and caller are inspected; no runtime registration, persistence, external API, generated surface, or shared state is involved. A focused test can falsify the requested change.

Expected:
- stop context traversal once more reading cannot materially change the decision;
- do not scan unrelated services/docs or build a permanent architecture graph as ceremony;
- perform the local change and focused proof.

## RB12 — runtime evidence invalidates the mental model after coding began

The agent bound source and believed a request passed through the new authorization middleware. During the edit-run-observe loop, traces show an alternate route bypasses that middleware for one entry path.

Expected:
- do not patch only the observed symptom or continue the original plan unchanged;
- invalidate the assumption that all entry paths share authorization, trace the alternate path, and re-enter at the earliest broken reality/mechanism model;
- keep any still-unproven path from being reported `READY`.
