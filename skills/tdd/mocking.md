# When to Mock

Mock at **system boundaries** only:

- External APIs (payment, email, etc.)
- Databases (sometimes - prefer test DB)
- Time/randomness
- File system (sometimes)

Don't mock:

- Your own classes/modules
- Internal collaborators
- Anything you control

## Designing for Mockability

At system boundaries, design interfaces that are easy to mock:

**1. Use dependency injection**

Pass external dependencies in rather than creating them internally:

```typescript
// Easy to mock
function processPayment(order, paymentClient) {
  return paymentClient.charge(order.total);
}

// Hard to mock
function processPayment(order) {
  const client = new StripeClient(process.env.STRIPE_KEY);
  return client.charge(order.total);
}
```

**2. Prefer SDK-style interfaces over generic fetchers**

Create specific functions for each external operation instead of one generic function with conditional logic:

```typescript
// GOOD: Each function is independently mockable
const api = {
  getUser: (id) => fetch(`/users/${id}`),
  getOrders: (userId) => fetch(`/users/${userId}/orders`),
  createOrder: (data) => fetch('/orders', { method: 'POST', body: data }),
};

// BAD: Mocking requires conditional logic inside the mock
const api = {
  fetch: (endpoint, options) => fetch(endpoint, options),
};
```

The SDK approach means:
- Each mock returns one specific shape
- No conditional logic in test setup
- Easier to see which endpoints a test exercises
- Type safety per endpoint

## Proof boundary of a mock or fake

A mock, fake, stub, simulator, or in-memory substitute is acceptable only for the
behavioral seam it actually exercises. Before treating its green result as
evidence, name:

- the production/runtime boundary it replaces;
- the bounded behavior the substitute can still falsify;
- the failure mechanism it removes or simplifies;
- the wider claim that therefore remains unproven;
- the complementary integration/runtime evidence needed when that wider claim is
  material.

Examples:

- An in-memory repository can prove how application code reacts to a modeled
  uniqueness conflict, but it cannot prove a production database actually
  enforces the invariant under concurrent writes.
- A mocked payment client can prove application handling of a decline/timeout
  result, but it cannot prove provider/network timeout, retry, signature, or
  delivery behavior.
- A deterministic clock fake can prove time-dependent domain transitions when
  clock integration itself is not the risk.

Prefer a representative real boundary when the claim depends on the mechanism
that the substitute would remove and that boundary is available at reasonable
cost. Do not escalate every test to integration/E2E merely because a substitute
exists; keep the claim scoped to the smallest authoritative seam.
