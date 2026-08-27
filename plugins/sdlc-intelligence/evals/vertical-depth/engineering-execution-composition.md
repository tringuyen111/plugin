# Frozen Behavioral Qualification Cases — engineering execution composition

Evidence-State: `NOT_RUN`

Frozen before the first v1.0.31 Engineering-composition Skill mutation.

Baseline Plugin: `sdlc-intelligence-deep` v1.0.31  
Baseline ZIP SHA-256: `5f09993dfa78ea819af03fc4756425e58499fa0e9d4e26f2a1d7cce96e04d63b`  
Baseline `implement/SKILL.md` SHA-256: `9862346590112acaea317c84b3e2e648df9b86851fa8138f1643c7d9b89f0f90`  
Behavioral/model runtime execution: `NOT_RUN`.

These cases test composition semantics, not whether the model can merely name the installed Skills. A strong result must preserve one coherent engineering outcome while exploiting decision-changing specialist depth without making sibling presence a hidden dependency.

## Rubric dimensions

- `PRIMARY_JOB`: identifies the accountable job/epistemic mode for the bounded request instead of treating every relevant Skill as an equal owner.
- `DEPTH_SELECTION`: activates only specialist dimensions that can materially change mechanism, constraints, failure handling, or proof.
- `SHARED_TRUTH`: gives supporting depth the same bound request/current/target truth and prevents independent widening or redesign.
- `SEMANTIC_RECONCILIATION`: distinguishes overlapping concepts by scope/authority and resolves contradictions from evidence rather than majority vote.
- `MUTATION_COHERENCE`: produces one compatible mutation/cutover shape and avoids concurrent competing writes or duplicate active truth.
- `PARALLEL_SAFETY`: uses host parallelism only for independent analysis/probes or already-separated write units; correctness does not depend on parallel execution.
- `PROOF_FANIN`: carries specialist falsifiers/proof obligations into one integrated completion claim without upgrading bounded proof to E2E.
- `STANDALONE_INDEPENDENCE`: a direct specialist job does not require `implement`; `implement` does not require a named sibling merely because the domain is relevant.
- `ORTHOGONAL_MODES`: keeps TDD as an optional implementation method, Diagnosis as causal work for unknown/disputed causes, and Code Review as read-only work on a frozen change.

## EC1 — checkout feature crosses frontend, API, backend, data and security

The user asks to implement checkout end to end. The browser owns interaction/loading state, an HTTP operation starts payment, backend calls a payment provider, order state is durable, and tenant/payment controls are material. A lost provider response and client retry are plausible failure paths.

Strong behavior must:
- keep one bounded implementation outcome rather than create five independent feature owners;
- identify only the domain dimensions that can change the mechanism or proof and obtain their depth;
- distinguish caller idempotency/retry, backend logical-operation identity, durable uniqueness/transaction semantics, and security replay/freshness instead of collapsing them into one generic "idempotency" rule;
- reconcile the final API/backend/data/security behavior before shared-seam mutation;
- prove domain obligations plus the real integrated consumed path without treating isolated domain proof as E2E completion.

## EC2 — direct cursor pagination contract is an API job

The user asks only to implement and prove a caller-visible cursor pagination contract for an existing endpoint. The storage/query implementation already satisfies the fixed ordering semantics and no material backend/data redesign is required.

Strong behavior must:
- allow `api-engineering` to own the bounded job directly and finish without a parent `implement` invocation;
- load backend/data depth only if inspected evidence makes those dimensions decision-changing;
- avoid manufacturing a broad cross-domain implementation ceremony.

## EC3 — unknown duplicate charge is diagnosis first

Production occasionally charges a customer twice after a timeout/retry. The causal mechanism is not established. API retry behavior, backend operation identity, durable order/payment state and replay controls may all be relevant.

Strong behavior must:
- keep `diagnosing-bugs` as primary while the cause is unknown/disputed;
- use domain depth to form discriminating causal hypotheses/probes rather than speculative fixes;
- avoid beginning an `implement` mutation merely because a likely retry bug is imaginable;
- if the user requested diagnosis only, permit completion at a supported causal conclusion without unauthorized mutation.

## EC4 — known duplicate-charge cause, authorized fix, TDD requested

Evidence already proves that the client retries with a new logical operation identifier after one specific timeout branch. The approved correction is fixed. The user explicitly asks to implement the correction using TDD.

Strong behavior must:
- treat implementation as the job and TDD as the selected method for the bounded regression/change seam;
- use API/backend/data/security depth only where it changes the approved correction or proof;
- avoid rerunning broad causal diagnosis once the cause is sufficiently established;
- avoid claiming the TDD green slice alone proves the whole integrated feature if additional real seams remain material.

## EC5 — review a checkout PR

The user asks to review an exact branch/PR diff for checkout correctness and security. No source mutation is authorized during the review.

Strong behavior must:
- keep `code-review` as the owner of the frozen revision;
- use review-local domain lenses or equivalent specialist cognition without turning implementation Skills into mutation owners;
- freeze findings against the reviewed bytes;
- if fixes are later authorized, treat the changed revision as a new implementation/review surface.

## EC6 — direct migration/backfill is a Data/Persistence job

The user asks to add a required durable field, backfill existing rows, preserve mixed-version safety during rollout, and prove the migration path. The caller-visible API does not change.

Strong behavior must:
- allow `data-persistence-engineering` to own the bounded job directly;
- bring in backend/deployment depth only when current rollout/runtime evidence makes it material;
- avoid requiring `implement` merely as a wrapper.

## EC7 — host supports parallel analysis

A broad feature has independent browser-state analysis, API compatibility analysis and security threat/control analysis. The final API contract and shared schema are not yet reconciled.

Strong behavior must:
- permit independent analysis/probes to run in parallel when the host supports it;
- not assume parallelism exists or is required for correctness;
- fan results into one shared truth before conflicting edits to the API/schema or other shared seams;
- reject "each specialist implements its own answer then merge" when recommendations conflict.

## EC8 — true local helper change

A private pure helper has one caller, fixed behavior, no durable state, API contract, security boundary, browser state, registration/configuration or cross-component consumer. A focused executable test can falsify the requested change.

Strong behavior must:
- use the ordinary implementation loop;
- not load a multi-specialist composition method just because many Skills are installed;
- not create an owner graph or cross-domain proof plan.

## EC9 — specialist recommendations appear to conflict

For a payment operation, API reasoning recommends safe client retries after lost responses, Security reasoning requires anti-replay freshness for signed requests, Data reasoning identifies an existing durable unique operation key, and Backend reasoning finds that provider dispatch can succeed before local finalize.

Strong behavior must:
- separate the scopes rather than choose a recommendation by vote;
- preserve the approved caller retry contract while choosing a compatible request-auth/replay mechanism and durable/provider recovery behavior;
- surface a genuinely unresolved Product/security/data policy instead of inventing it;
- produce one coherent operation lifecycle and proof strategy.

## EC10 — a named specialist is unavailable

A broad implementation has a material persistence seam, but `data-persistence-engineering` is not installed in the host. The source/schema/database behavior and project constraints are inspectable, and the base agent can reason about the bounded persistence change.

Strong behavior must:
- not fail merely because the named sibling Skill is absent;
- bind the actual persistence truth and proceed if sufficient cognition/evidence exists;
- return the precise missing fact/capability/expertise gap only if it genuinely prevents a safe decision or proof;
- never fabricate a sibling result.

## EC11 — parallel writers share one generated contract

Two independent implementation workers could edit server schema and generated client output at the same time. The generated client is owned by a code generator, and the API contract change must be coherent before generation.

Strong behavior must:
- serialize/synthesize the shared contract decision before write fan-out;
- mutate the canonical schema then regenerate through the owning mechanism rather than hand-merge competing generated edits;
- re-bind exact resulting bytes and representative consumers before completion.

## EC12 — review an immutable API contract PR

The user asks to review an exact PR/diff that changes caller-visible errors, retry/idempotency behavior, and generated-client compatibility. Source mutation is not authorized during review.

Strong behavior must:
- keep `code-review` as the primary owner of the frozen revision;
- activate its local API review lens for caller-contract/retry/compatibility risk rather than turn `api-engineering` into a mutation owner;
- freeze findings against the exact reviewed bytes and preserve unresolved Product/security/data authority instead of redesigning the contract;
- if remediation is later authorized, treat the new source revision as an implementation surface and allow `api-engineering` to own the bounded caller-visible implementation when that boundary dominates.

Behavioral/model runtime execution: `NOT_RUN`.

## EC13 — native discovery must not collapse a cross-domain job to exactly one Skill

A fixed-semantics feature spans browser state, caller-visible API behavior, backend effects, durable state, and security enforcement. No single specialist domain is the whole terminal proof boundary. The host supports automatic use of one or more installed Skills.

Strong behavior must:
- allow the broad implementation job plus only decision-changing specialist depth rather than force exactly one "most specific" Skill;
- keep one coherent accountable implementation outcome and shared truth instead of five competing mutation/completion owners;
- permit each specialist to remain independently primary when a different request is genuinely domain-dominant;
- avoid inventing a supervisory router/handoff or requiring sibling presence merely because multiple Skills are useful.

Failure includes either extreme: selecting one narrow specialist and omitting material cross-domain cognition solely because it is "most specific", or activating every installed Skill as an equal owner without relevance/fan-in discipline.

Behavioral/model runtime execution: `NOT_RUN`.

## EC14 — composed TDD may refine an internal implementation seam

A broader implementation has fixed Product/API behavior and explicitly uses TDD for one bounded slice. Two internal module interfaces are both allowed by current technical authority; neither is externally consumed or architecturally fixed. The first test exposes that one interface is awkward and implementation-coupled.

Strong behavior must:
- preserve `implement` as the broader change outcome when it is the active implementation job;
- allow TDD to propose/refine the implementation-level seam inside the already-authorized technical space instead of requiring a pre-approved public seam;
- stop/re-enter only if the seam choice would redefine externally owned Product/API/data/security/material architecture truth;
- keep TDD RED/GREEN/REFACTOR evidence bounded to the slice and carry any wider proof obligation back into the broader implementation claim;
- preserve direct TDD invocation as independently capable of the same bounded design-feedback mechanism.

Failure includes making TDD weaker when composed than when invoked directly, or allowing TDD to redefine an externally owned contract merely because it is test-driven.

Behavioral/model runtime execution: `NOT_RUN`.

## EC15 — separate review need does not become a hard-coded sibling route

A bounded implementation is complete enough for a separate frozen-revision review to be materially useful. The host supports native capability discovery, but the exact installed Skill set/runtime identity may vary.

Strong behavior must:
- preserve the review boundary: a frozen immutable change review is a separate capability and does not become part of implementation completion by default;
- return the bounded review need/frozen revision context when separate review is required or materially useful;
- leave subsequent capability selection to host-native discovery rather than require a literal `/code-review` command or manufacture a Handoff for ordinary same-session continuation;
- remain usable when a named sibling is unavailable instead of treating its absence as an implementation failure.

Behavioral/model runtime execution: `NOT_RUN`.
