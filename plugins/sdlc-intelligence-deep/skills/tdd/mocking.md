# Test Doubles and Proof Fidelity

Choose a test dependency from the **claim and proof boundary**, not from a universal rule such as “mock only external systems” or “never mock owned code.” Prefer the most representative mechanism that keeps the current red/green slice fast, deterministic, diagnosable, and resilient enough to be useful.

## Selection order is a preference, not a law

1. **Real implementation** when it is deterministic, fast enough, and easy to construct inside the test size you need. This gives the highest local fidelity.
2. **Maintained fake** when the real dependency is expensive/slow/non-hermetic but the fake preserves a useful behavioral model. Prefer a fake owned or tested against the real contract when available.
3. **Stub / controlled response** when the slice needs a specific state or rare failure that is difficult to produce with the real implementation and the claim is how the caller reacts to that state.
4. **Mock / interaction verification** when the interaction itself is the material observable contract, especially a state-changing command with no better post-state seam. Keep interaction assertions narrow.
5. **Representative integration/runtime proof** when the claim depends on the actual protocol, database concurrency/constraint, filesystem semantics, queue delivery, security enforcement, provider behavior, or another mechanism a double would remove.

Do not automatically escalate every unit test to integration. Do not automatically isolate every collaborator with a mock.

## Decision variables

Before choosing a double, ask:

- **Claim fidelity:** which production mechanism must execute for this green result to support the claim?
- **Determinism:** does the real dependency make the red/green loop flaky or uncontrollable?
- **Failure-state controllability:** is the important timeout/error/rejection state impractical to trigger reliably without a controlled double?
- **Precision/diagnosability:** will a smaller seam make failure easier to localize?
- **Resilience:** will the test survive behavior-preserving refactors, or does it encode incidental calls/order/structure?
- **Cost/test size:** can the real mechanism run within an appropriate developer loop, or should its proof live in a complementary integration check?

Use these variables qualitatively. “Owned versus external” can influence construction/maintenance cost, but it is not a sufficient selection rule.

## Distinguish doubles by what they prove

### Fake
A lightweight implementation with useful behavior. Good when it can exercise many realistic states cheaply. Risk: the fake can drift from production semantics. Bind the final claim to real-boundary evidence when that drift matters.

### Stub
Returns controlled values/states. Good for driving caller behavior through difficult branches. Risk: it proves the caller reacts to the modeled state, not that production generates that state correctly.

### Mock / interaction verification
Checks a call/command contract. Good when the call itself is the observable obligation and no more resilient state/output seam exists. Risk: verifying non-material queries, call order, or internal collaboration makes tests brittle and implementation-coupled.

### Simulator / in-memory adapter
Can be a high-value fast proof when it preserves the claim-relevant model. Risk: it may remove concurrency, protocol, persistence, scheduling, permission, or failure mechanics that the production claim requires.

## Designing a controllable seam

Dependency injection is useful when it makes a real/fake/stub/mocked boundary explicit without changing the public product contract solely for tests. Prefer specific domain/operation interfaces over a generic fetcher when the specific interface makes behavior and failure states clearer.

```typescript
function processPayment(order, paymentClient) {
  return paymentClient.charge(order.total);
}
```

The purpose is not “make everything mockable.” The purpose is a seam where the current behavior can be falsified cleanly and where a representative implementation can still be substituted when fidelity matters.

## Proof boundary of a double

Before treating a green result as evidence, name:

- the production/runtime boundary the double replaces;
- the bounded behavior the test can still falsify;
- the failure/consistency/protocol mechanism it removes or simplifies;
- the wider claim that therefore remains unproven;
- the complementary evidence needed when that wider claim is material.

Examples:

- An in-memory repository can prove how application code reacts to a modeled uniqueness conflict, but it cannot prove a production database enforces the invariant under concurrent writes.
- A stubbed payment client can prove application handling of a decline/timeout result, but it cannot prove provider/network timeout, retry, signature, or delivery semantics.
- A deterministic clock fake can prove time-dependent domain transitions when clock integration itself is not the risk.
- An owned collaborator may be stubbed to force a rare error path when the claim is caller recovery; a separate real-collaborator test is needed only if the collaborator behavior itself is material.

## Brittleness correction

Interaction-heavy tests are a design signal. When a test needs long mock setup, exact internal call order, or many irrelevant argument expectations:

1. restate the behavior claim;
2. look for a more expressive public/owned seam;
3. use a real implementation or maintained fake when practical;
4. narrow interaction verification to state-changing/material calls only;
5. assert only properties the behavior contract actually cares about.

## Re-enter on contradiction

If a fake/mock-based red-green slice later disagrees with representative integration/runtime evidence, the real evidence invalidates the modeled proof boundary. Revisit the double, seam, and expected behavior; do not preserve the green unit test as the stronger truth.
