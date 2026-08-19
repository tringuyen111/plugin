# Evidence Reliability and Oracle Composition

Load this reference when the planned evidence is not a simple deterministic boolean: retries or flakes matter, the failure depends on execution history, a claim is eventual/stochastic, a test substitutes operational configuration, or multiple observation channels can disagree.

This reference deepens **QA planning semantics for evidence reliability**. It does not diagnose why an executed test is flaky (`diagnosing-bugs` owns unknown/disputed cause), execute the probe, admit final runtime evidence, or issue the QA verdict (`verify-quality` owns those decisions).

## 1. Classify how the evidence can lie before choosing the probe

| Evidence shape | What can make the result misleading? | QA planning consequence |
|---|---|---|
| Deterministic | wrong oracle, wrong boundary, hidden substituted mechanism | tighten failure model/oracle or add complementary boundary |
| Flaky / stochastic | scheduler/environment variation, random action selection, intermittent product behavior, unstable oracle | preserve attempts/distribution; define a bounded repetition/inference plan rather than normalizing retry-pass to PASS |
| Sequence / path-dependent | prior requests/state/order are causal preconditions | preserve the smallest history that still carries the failure; reset/isolate the whole history, not just the final action |
| Eventual / temporal | the expected state is valid only after convergence or before expiry | assert the semantic condition over an authorized observation window; separate convergence correctness from performance/SLO timing |
| Non-hermetic | test binary/config/runtime/dependency differs from the operational composition | bind exact versions/configuration and add a complementary operational/configuration probe when that composition is part of the claim |
| Multi-oracle | UI, API, durable state, event stream, logs, or side effects disagree | decompose the claim and assign each oracle to the part it can prove; never majority-vote contradictory evidence |

A claim can activate several shapes. For example, a browser save may be eventual, multi-oracle, and non-hermetic. Compose only the dimensions that change the proof decision.

## 2. Retry is evidence, not erasure

Keep at least these outcomes distinct when retries are used:

```text
PASS_FIRST
FAIL_THEN_PASS   # flaky/unstable evidence
FAIL_REPEATED
INCONCLUSIVE     # environment/oracle could not produce a trustworthy verdict
```

Do not let a runner's final green status erase the first failure. A retry can be useful for estimating instability or collecting artifacts; it does not decide whether the instability is in the product, test, environment, or oracle.

Plan retry/repetition only when it changes a decision:

- one retry may expose isolation/setup leakage but cannot characterize a rare failure rate;
- repeated trials may bound stochastic behavior for a specific risk decision, but there is no universal correct count;
- if a failure is materially release-blocking, "eventually one run passed" is not a risk disposition;
- if the root cause of instability matters after execution, route diagnosis to `diagnosing-bugs` rather than baking causal guesses into the strategy.

## 3. Preserve history for higher-order failures

Some defects require a sequence of otherwise valid operations. Treat history as input when prior actions change later behavior:

```text
initial state
  -> A mutates hidden/shared state
  -> B changes ownership/order/version
  -> C exposes the invariant violation
```

Minimize by removing one history element and checking whether the failure model still holds. If removing A makes C pass, A remains part of the causal test state even if C is the only visible failing action.

Plan:

- the minimal load-bearing sequence, not merely the final request;
- state ownership and reset between independent trials;
- identity/order/time data needed to distinguish duplicate, stale, or reordered effects;
- parallelism when concurrency is part of the claim; disabling it may remove the failure mechanism rather than stabilize the test.

A fast C-only test can still be useful for a narrower local claim, but it is not equivalent evidence for the A -> B -> C failure.

## 4. Eventual claims need a condition and an authority-backed window

Separate two questions:

```text
functional convergence: does the required state eventually become true?
timing acceptance:       does it become true within the approved latency/SLO/UX bound?
```

For functional convergence, prefer condition-driven observation of the actual postcondition over a fixed sleep. A sleep proves only that time elapsed.

For timing acceptance, the bound must come from an authoritative requirement/NFR/contract or an explicit risk decision. Do not invent "5 seconds" because a framework default exists. If no acceptable window is sourced, mark the timing part unresolved while still planning how to observe functional convergence.

Increasing a timeout until a test turns green weakens evidence unless the requirement itself changed.

## 5. Stochastic and fault-injection evidence is distributional

Randomized, fuzz, scheduler, chaos, load, and fault-injection probes can find bugs that a fixed example misses. Their result may not replay exactly.

Plan for reproducibility of **evidence**, not false determinism:

- capture seed/action/event sequence when the tool supports it;
- preserve the failing artifact and the system/config revision;
- repeat only enough to support the concrete decision, recording attempts and outcomes rather than a single final color;
- if the mechanism can be isolated, derive a deterministic regression or controlled fault sequence that directly exercises it;
- after a fix, absence of failure across a few random reruns narrows risk but does not prove a rare stochastic defect impossible.

Mutation/perturbation can validate that an oracle is capable of going red. It proves oracle sensitivity to that perturbation, not product correctness under all faults.

## 6. Hermetic success can be operationally incomplete

A hermetic test is valuable because it controls variables, but it may intentionally replace runtime composition. Bind what actually ran:

```text
candidate revision
configuration revision/defaults
dependency/provider versions
feature/release state
data/schema state
environment/runtime class
```

If the approved claim includes deployed/runtime composition, add the smallest complementary probe that observes that composition. Examples include configuration/version equivalence, generated-config output, real serialization/provider contract, or a bounded production-like probe under the proper owner controls.

Do not call a hermetic pass "production proof" merely because the code under test is the same repository revision.

## 7. Compose oracles by claim, not by vote

When channels disagree, split the claim into observable postconditions.

Example: "Save succeeds" might mean:

```text
request accepted
+ user sees durable success acknowledgement
+ canonical record is durably stored
+ required event/effect is emitted exactly as specified
```

A browser banner can prove the visible acknowledgement, but not durable storage. A database row can prove durable state at that boundary, but not that the browser showed the correct state. If the approved contract requires both, plan both; if only one boundary is observable, narrow the supported claim.

Contradictory oracles are not averaged. Either they prove different subclaims, one is outside its authority, or the system is inconsistent. Strategy should expose the conflict so execution/diagnosis can resolve it.

## 8. Contrastive hard cases

### Retry passes after a timeout

Preserve `FAIL_THEN_PASS`. Check whether the planned oracle is condition-driven and whether state is isolated across worker/retry boundaries. Do not decide "test flake" versus "product race" in the strategy; plan the evidence required to distinguish them and hand actual causal diagnosis to `diagnosing-bugs` if execution remains unstable.

### A -> B -> C corrupts state, C alone passes

Keep the smallest history that preserves the invariant failure. A C-only test is a different claim. Capture the state transition or durable postcondition after each load-bearing step when that gives a stronger oracle than the final symptom alone.

### UI eventually shows a record, but no convergence SLA exists

Plan a semantic convergence condition. Keep the timing threshold unresolved instead of importing a runner timeout as Product/NFR truth. If a later source provides the bound, add a timing condition without rewriting the functional evidence.

### Randomized fault sequence no longer reproduces after five runs

Record the original failure trace/seed and the five non-failures as distributional evidence. If the cause can be converted into a controlled sequence, add that regression. Otherwise state the remaining probability/coverage limitation; do not claim deterministic closure.

### Integration test passes with a different runtime configuration

Keep the integration result as valid hermetic evidence for the bound config. Add a configuration/composition probe only when the operational claim depends on the differing default/generated/runtime state.

### UI says Saved; durable record is absent

The oracles are not competing votes. The visible acknowledgement and durable postcondition are different subclaims. If both are required, the end-to-end claim fails until both can be observed consistently.

## 9. Re-entry and evidence-planning closure

Re-enter the QA planning/probe decision when:

- retries reveal instability that invalidates the assumed deterministic oracle;
- minimization removes a required history/state precondition;
- the observation window is not source-backed for a timing claim;
- a stochastic probe cannot preserve enough provenance to support the intended decision;
- environment/configuration drift makes a hermetic probe non-representative for an operational claim;
- two oracles disagree about subclaims the contract requires simultaneously.

Reliability-aware planning closes only when each material claim states the failure model, evidence shape, oracle authority, required state/history, boundary/substitution gap, and any repetition/window/complementary-evidence rule needed to interpret the future result without laundering uncertainty into PASS.

## Provenance

Derived from primary sources reviewed on 2026-08-16: Google SRE **Testing for Reliability** and Microsoft Playwright **Retries**, **Assertions**, and **Auto-waiting** documentation. The reference extracts decision mechanisms rather than copying source prose. Runtime/framework details must be re-verified against the inspected project versions when they can change execution semantics.
