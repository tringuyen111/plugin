# Test Design for TDD

A useful TDD test is not defined by `unit`, `integration`, mock count, or assertion count. Start from the **behavioral claim**, choose the smallest stable seam that contains the mechanism the current slice needs to learn/prove, then balance the test properties that make the feedback valuable.

## One behavioral reason to fail

Prefer one coherent behavior/failure meaning per test. This is not the same as "one assertion".

A test may use several assertions when they jointly express one observable behavior or postcondition. Split the test when separate assertions represent materially independent behaviors, different failure semantics, or different setup/state paths that should be diagnosable independently.

```typescript
// GOOD: two assertions, one behavior — an accepted create exposes the identity
// needed to observe the newly created resource.
test("accepted user creation returns a retrievable identity", async () => {
  const created = await createUser({ name: "Alice" });
  expect(created.status).toBe("accepted");
  expect((await getUser(created.id)).name).toBe("Alice");
});
```

Do not split this mechanically just to satisfy an assertion-count rule. Split when the result would become more specific/readable without losing the behavior relationship.

## Test-value model

Use these properties as interacting design variables, not a checklist that every test can maximize at once.

| Property | Useful test behavior | Failure signal / correction |
|---|---|---|
| **Behavioral sensitivity** | fails when the bounded behavior changes incorrectly | test stays green across a real behavior regression -> strengthen oracle/seam/example |
| **Structure-insensitivity** | survives behavior-preserving refactors | private-call/order/shape edits break it -> move toward a stable observable seam unless the interaction is the contract |
| **Specificity / diagnosability** | a failure points to a small behavioral cause | huge scenario fails ambiguously -> shrink/separate the seam or improve fixture/oracle diagnostics |
| **Determinism / isolation** | same relevant state gives the same result regardless of test order | flake/shared-state/order dependence -> control state/time/randomness or choose a more reliable seam |
| **Speed / writability** | fast/cheap enough to sustain the red-green-refactor feedback loop | loop cost prevents frequent execution -> use a smaller claim-preserving test and retain complementary wider proof |
| **Readability** | names/setup/assertions expose why the behavior matters | test reads like framework plumbing -> introduce domain helpers or a clearer behavior-facing seam |
| **Predictive fit** | green meaning is strong enough for the bounded developer claim | a double/snapshot/fixture removes the mechanism being claimed -> narrow the claim or add complementary real-boundary proof |

A wider test may improve fidelity but hurt speed/specificity. A smaller test may improve feedback but remove production mechanics. Choose deliberately from the current claim; do not turn one style into doctrine.

## Choose test size from the mechanism

Labels such as unit/integration/E2E describe shape, not quality. Prefer the **smallest test that still contains the mechanism the current TDD decision depends on**.

Examples:

- Pure domain rule -> a small deterministic function/module test is often enough.
- Service state transition -> exercise the stable service/module interface; use a real or fake dependency according to which mechanism the claim needs.
- Database constraint/concurrency -> if the constraint/concurrency mechanism itself is the claim, a real representative database boundary is required for that claim; an in-memory fake can only prove narrower caller behavior.
- Provider timeout handling -> a controlled stub can efficiently drive caller recovery; it does not prove the real provider/network timeout semantics.
- Command interaction with no resilient post-state seam -> narrow interaction verification can be valid when the call itself is the material contract.

Read [Test Doubles and Proof Fidelity](mocking.md) for the full selection method.

## Behavior-oriented versus structure-coupled

Prefer tests that explain what a caller/consumer can observe.

```typescript
// GOOD: behavior remains meaningful if internal collaborators change.
test("checkout confirms a valid cart", async () => {
  const result = await checkout(validCart(), validPaymentMethod());
  expect(result.status).toBe("confirmed");
});
```

Avoid interaction assertions that merely mirror current structure:

```typescript
// WEAK when this call is not itself the contract.
test("checkout calls paymentService.process once", async () => {
  const payment = mockPaymentService();
  await checkout(validCart(), payment);
  expect(payment.process).toHaveBeenCalledTimes(1);
});
```

But do **not** convert this into "never mock owned code". If the command interaction itself is the externally meaningful obligation and no more resilient state/output seam exists, a narrow interaction test may be the right proof. Judge the claim, not ownership labels.

## Do not bypass the real claim

Direct inspection is not inherently wrong; it is wrong when it bypasses the behavior you claim to prove.

```typescript
// If the claim is user retrieval behavior, verify through the retrieval contract.
const created = await createUser({ name: "Alice" });
expect((await getUser(created.id)).name).toBe("Alice");
```

If the claim instead concerns a durable database invariant, migration, constraint, or concurrency mechanism, inspecting/exercising the real database can be exactly the correct seam. Do not ban a proof boundary merely because it sits below an application API.

## Independent oracles

Avoid expected values produced with the same algorithm/fixture transformation as production.

```typescript
// BAD: expected value recomputes the same relation.
const items = [{ price: 10 }, { price: 5 }];
const expected = items.reduce((sum, i) => sum + i.price, 0);
expect(calculateTotal(items)).toBe(expected);

// BETTER: independent worked example.
expect(calculateTotal([{ price: 10 }, { price: 5 }])).toBe(15);
```

When the expected answer cannot yet be derived from approved truth, do not invent it to obtain RED. Characterize current behavior or explore the problem until a valid oracle exists.

## Refactor tests as well as production code

After GREEN, test structure is also eligible for behavior-preserving refactor:

- remove duplicated fixture/setup that obscures the behavior;
- extract domain helpers that improve readability without hiding important inputs;
- prune redundant checks when the suite composition already preserves predictiveness and specificity;
- replace structure-sensitive setup/assertions with a more stable seam;
- keep each test independently reproducible and deterministic where the chosen test size permits it.

Do not "refactor" by weakening the oracle, changing expected Product behavior, or deleting the only proof of a still-valid partition just to make the suite green.
