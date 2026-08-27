# Multi-specialist Composition

Load this only when **two or more engineering dimensions can materially change the same bounded implementation**, or when a broad change has no single domain proof boundary. Do not load it for a genuinely local change or merely because several Skills are installed.

The goal is not to simulate a team, create a scheduler, or make every relevant specialist an equal implementation owner. Keep one accountable implementation outcome and use specialist depth to improve the decisions inside it.

## Contents

1. Composition invariant
2. Select depth from the actual seam
3. Give supporting depth the same bounded truth
4. Collect decision packets
5. Reconcile by semantic scope and authority
6. Fan in before shared mutation
7. Fan proof into one completion claim
8. Missing-sibling behavior
9. Contrastive checkout example

## Composition invariant

```text
one bound user/change truth
        |
        +-- decision-changing specialist depth
        |      -> constraints / mechanism consequences / falsifiers / proof obligations
        |
        +-- optional implementation method such as TDD
        |
        v
one reconciled mechanism + coherent mutation/cutover + integrated proof claim
```

When `implement` is the primary job, a co-loaded specialist is **supporting depth for the bounded question it was asked**. It does not independently widen Product behavior, redesign unrelated seams, mutate a conflicting version of shared truth, or claim whole-change completion. This does not weaken specialist independence: when a domain Skill is invoked directly for a domain-bounded job, it retains its own full execution/proof loop and does not require `implement`.

## 1. Select depth from the actual seam, not the technology list

Activate only dimensions that can change the mechanism, failure behavior, or proof.

| Dimension | Decision-changing cues |
|---|---|
| Frontend | browser/user-visible state authority, interaction lifecycle, rendering/runtime integration, accessibility or network-state behavior |
| API | caller-visible operation/contract, validation/errors, retry/idempotency, continuation, compatibility, request-response proof |
| Backend | logical-operation ownership, service/runtime behavior, external effects, background work, cancellation, recovery or concurrency |
| Data/Persistence | durable meaning, transaction/atomicity, schema/migration/backfill, concurrent writers, storage-level enforcement |
| Security | trust boundary, authn/authz, tenant isolation, secrets, unsafe input/output, abuse/replay or negative security proof |

Do not infer relevance from filenames such as `controller`, `service`, `model`, or `component`. Inspect the production path first.

Treat orthogonal capabilities according to their job:

- **TDD** is an optional implementation method for approved behavior at a bound observable seam. It may refine an implementation-level seam inside already-authorized technical space, but it must not redefine externally owned Product/API/data/security/material architecture truth; it is not another domain owner and its green slice does not automatically prove the whole feature.
- **Diagnosis** becomes primary for an affected scope when the material cause is unknown/disputed. Do not keep speculative mutation moving merely because `implement` was loaded first. Resume implementation when causal truth is sufficient for the authorized correction.
- **Codebase design** owns a material unresolved technical seam/interface decision when implementation would otherwise invent architecture authority.
- **Code review** owns a frozen immutable change review; do not turn review-time domain lenses into competing source mutation.

## 2. Give every supporting depth the same bounded truth

Before asking for specialist depth, bind a compact shared packet from inspected evidence:

```text
REQUEST / FIXED OUTCOME
CURRENT PRODUCTION PATH + EXACT RELEVANT STATE
AUTHORITATIVE CONSTRAINTS / INVARIANTS
AUTHORIZED OPEN PROPOSAL SPACE
BOUNDED QUESTION FOR THIS SPECIALIST
PROOF SEAM THE OVERALL CHANGE MUST EVENTUALLY SATISFY
```

Do not ask each specialist to rediscover or redefine the whole feature independently. A specialist may expose that the shared packet is false or incomplete; if so, re-bind the common truth before continuing dependent work.

## 3. Collect decision packets, not independent mini-plans

From each supporting dimension, extract only what can change the integrated decision:

```text
BOUND FACT / EVIDENCE
CONSTRAINT OR INVARIANT
MECHANISM CONSEQUENCE / OPTION DISPOSITION
FAILURE MODE OR FALSIFIER
PROOF OBLIGATION
UNRESOLVED EXTERNAL TRUTH, if any
```

This is a reasoning shape, not a mandatory persistent form. Do not create a ledger unless the project needs one.

A supporting answer that merely says "use pattern X" without binding why X fits the inspected semantics is not enough. A supporting answer that expands scope beyond the bounded request is advisory only until that expansion is separately authorized.

## 4. Reconcile by semantic scope and authority, never by vote

Different domains often use similar words for different mechanisms. Before calling recommendations contradictory, name the scope of each concept.

Example for a retried payment operation:

```text
API idempotency        -> what repeated caller intent can observe / repeat safely
Backend operation ID   -> which executions belong to one logical business attempt
Data uniqueness        -> what durable duplicate state the store can atomically prevent
Security replay guard  -> whether an authenticated request/message may be accepted again
Provider idempotency   -> how the external effect provider identifies repeated intent
```

These may need to compose; none automatically substitutes for the others.

When recommendations truly conflict:

1. prefer inspected facts over remembered conventions;
2. preserve current approved Product/policy/technical authority over a specialist preference;
3. use the real boundary that can enforce the invariant, not the loudest or most numerous recommendation;
4. if the conflict is actually a missing Product/security/data/architecture decision, stop only the affected scope and expose that unresolved truth;
5. never use majority vote to manufacture authority.

## 5. Fan in before shared mutation

Before editing a shared seam, synthesize the selected depth into **one compatible mechanism**:

- state which semantic owner/invariant each changed surface serves;
- resolve incompatible assumptions about contract, state, retries, failure/recovery and authority;
- choose one coherent change topology/cutover when readers/writers or old/new paths coexist;
- avoid duplicate active truth introduced because different specialists independently implemented the same meaning.

Host parallelism is an optimization, not a correctness contract. Parallelize only:

- independent analysis or evidence probes;
- implementation units whose interfaces, semantic ownership and write boundaries are already fixed and disjoint.

Serialize/synthesize before conflicting writes to the same contract, schema, state machine, generated surface, registry, policy owner, or other shared truth. After parallel work returns, re-bind the exact resulting revision before integrated proof; do not assume workers edited compatible bytes.

## 6. Fan proof back into one truthful completion claim

Carry every material specialist falsifier/proof obligation into the implementation proof plan, then classify the evidence by what it actually exercised.

```text
specialist-local proof  != integrated feature proof
real API proof          != durable restart proof
DB constraint proof     != provider-effect reconciliation proof
TDD green slice         != whole-change E2E proof
security negative probe != Product/UAT/release approval
```

The overall change can be `READY` only when the selected specialist constraints have been reconciled into the implemented mechanism and every proof surface required by the **overall claim** has direct claim-relevant evidence. Keep unexecuted or insufficient proof `NOT_RUN`/unproved rather than inheriting a sibling's stronger-sounding status.

## 7. Missing sibling is not automatically a blocker

A named specialist Skill is optional depth, not a runtime dependency of `implement`.

If a useful specialist is unavailable:

1. bind the same project/source/runtime truth directly;
2. reason with available domain knowledge and evidence;
3. proceed when the bounded decision and proof are still supportable;
4. return the precise missing fact, tool, environment, authority, or expertise only when it genuinely prevents a safe decision or required proof.

Do not fabricate a specialist result and do not report `BLOCKED` merely because a sibling name is absent.

## Contrastive example — checkout

**Weak flat composition:** Frontend adds optimistic success, API retries every timeout, Backend retries provider calls, Data adds a uniqueness key, and Security rejects repeated signed requests. Each local idea is plausible, but together they can contradict the business operation and produce duplicate or unrecoverable payment state.

**Strong composition:** bind one purchase intent and current payment/order path; use Frontend/API/Backend/Data/Security depth to distinguish presentation state, caller retry contract, logical operation/provider effects, durable invariants and replay control; reconcile their scopes against approved payment semantics; choose one compatible operation lifecycle; then prove the browser-to-API-to-service-to-durable/provider behavior required by the claim. If one required policy such as refund/reconciliation authority is missing, keep that affected completion claim unresolved rather than letting a specialist invent it.
