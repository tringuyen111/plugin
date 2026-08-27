# Frozen Behavioral Qualification Cases — verify-quality planning/evidence reliability

Evidence-State: `NOT_RUN`

Frozen before candidate edits. Runtime execution remains `NOT_RUN` until a real model/Skill runner exists.

## Rubric dimensions

- `FAILURE_MODEL`: probe follows a plausible defect mechanism rather than a fashionable test type.
- `EVIDENCE_RELIABILITY`: strategy distinguishes deterministic, stochastic/flaky, stateful/sequence, temporal, and non-hermetic evidence when material.
- `ORACLE_AUTHORITY`: oracle actually observes the claim at the right boundary.
- `RETRY_SEMANTICS`: pass-on-retry does not erase first failure.
- `STATE_HISTORY`: preserves sequence/history when the failure depends on it.
- `PROOF_BOUNDARY`: substituted/hermetic evidence is not promoted into operational truth.

## Case T1 — pass on retry

A browser checkout test fails once with a timeout and passes on automatic retry. The proposed QA plan/result treats the condition as clean PASS because the retry succeeded.

Strong behavior must:
- preserve the first failure and classify the result as flaky/unstable evidence rather than clean PASS;
- distinguish a synchronization/oracle issue from potential product nondeterminism without diagnosing the root cause inside QA planning;
- prefer condition-driven assertions over fixed sleeps when the contract is asynchronous;
- specify what repeated evidence or complementary boundary is needed before relying on the condition for release risk.

## Case T2 — sequence-dependent corruption

A corruption occurs only after requests A -> B -> C. Testing C alone never fails. A teammate proposes minimizing the test to only C because it is faster.

Strong behavior must:
- identify prior state/history as part of the failure model;
- preserve the smallest sequence that maintains the invariant violation rather than minimize away causal history;
- plan state isolation/reset around the whole sequence;
- avoid calling a fast isolated C test equivalent evidence.

## Case T3 — eventual consistency without a sourced bound

A UI should eventually show a processed record. No requirement states whether convergence should occur in 2 seconds or 2 minutes. Existing tests sleep 10 seconds then assert.

Strong behavior must:
- define the semantic condition to observe;
- refuse to invent a product/NFR convergence threshold;
- plan condition-driven observation with the currently authorized bound if one exists, otherwise mark the timing acceptance bound unresolved;
- separate functional convergence from performance/SLO acceptance.

## Case T4 — randomized failure injection

A chaos/fault test finds a rare duplicate-processing defect. After a fix, five reruns do not reproduce it. The team wants to mark the claim proven.

Strong behavior must:
- preserve the original action/seed/event history when available;
- treat non-reproduction as probabilistic evidence rather than deterministic proof;
- derive a deterministic regression or controlled fault sequence when the mechanism can be isolated;
- state remaining uncertainty when only stochastic evidence is available.

## Case T5 — hermetic pass, operational mismatch

An integration test uses the latest checked-in configuration and passes. Production currently runs an older binary with a different generated/default configuration path.

Strong behavior must:
- keep the hermetic result valid only for its bound revision/configuration;
- identify runtime configuration/version composition as an unproven mechanism;
- require the smallest complementary non-hermetic/configuration probe when operational compatibility is part of the claim;
- not relabel the integration test as production proof.

## Case T6 — conflicting oracles

A browser assertion shows “Saved”, but the durable backend record is absent. Both are candidate success signals for an end-to-end save claim.

Strong behavior must:
- decompose the claim: UI acknowledgement versus durable postcondition;
- choose oracles according to claim authority rather than majority vote;
- require both channels when the approved end-to-end contract includes both acknowledgement and durability;
- narrow the claim if only one boundary can be observed.
