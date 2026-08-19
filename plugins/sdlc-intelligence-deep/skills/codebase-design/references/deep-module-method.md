# Deep-module architecture method

Use this reference when interface/seam placement, caller knowledge, locality, leverage, or testability can materially change the technical design. These are **reasoning lenses**, not a vocabulary replacement policy.

## Preserve project language; map the lens

Start from the names the inspected system actually uses. If the repository calls something `PaymentService`, `Orders API`, `CheckoutComponent`, `bounded context`, or `service boundary`, keep those names in the design artifact when they are current and meaningful.

Map them internally only as needed:

```text
project-native thing
  -> what responsibility does it own?
  -> what must callers know?
  -> where can behavior change without leaking that knowledge?
  -> what implementation detail should remain hidden?
  -> what proof seam can falsify the design?
```

Use an explicit legend only when normalization clarifies several inconsistent terms. Never silently rename the source model to satisfy this method.

## Core concepts

- **Module** — analytical shorthand for anything with a caller-facing contract and hidden implementation. It can correspond to a function, class, package, component, service, or cross-tier slice in the real project.
- **Interface** — everything a caller must know to use that owner correctly: type/protocol plus invariants, ordering, errors, configuration, lifecycle, and material performance/failure semantics. A project `API` may be part or all of this interface; do not erase that noun.
- **Implementation** — behavior hidden behind the interface.
- **Seam** — a place where behavior/implementation can change behind a stable caller contract. A project may legitimately call this a boundary, adapter point, provider interface, extension point, or another native term.
- **Adapter** — a concrete participant satisfying a seam/interface role.
- **Depth** — leverage created when substantial behavior/knowledge is hidden behind a comparatively small caller knowledge surface. Do not measure it from source lines.
- **Locality** — related change, failure diagnosis, and proof concentrate behind the owner instead of scattering through callers.
- **Leverage** — many callers or behaviors benefit from one stable owner without learning its internals.

## Decision packet

Use this mechanism rather than merely asking whether a module “looks deep”:

1. **Cue:** repeated change, bugs, tests, or policy knowledge cross several callers; an existing seam leaks implementation knowledge; a new technical decision needs a stable owner.
2. **Mechanism:** identify the semantic owner, caller knowledge surface, hidden responsibility, real protocol/trust/deployment/lifecycle/failure boundaries, and representative proof seam.
3. **Selection:** prefer the design that concentrates shared truth while preserving boundaries that must fail, deploy, evolve, or be governed independently.
4. **Failure:** a wrapper only forwards parameters, callers still know the same policy, a seam exists only for a hypothetical mock/provider, or consolidation erases a real trust/deployment/failure boundary.
5. **Correction:** move responsibility to the real owner, delete the pass-through seam, narrow the shared abstraction, or preserve the independent boundary and share only the smaller truth that is actually common.
6. **Consequence:** the chosen interface hides more relevant knowledge, affected changes become more local, and a representative public/runtime proof can falsify the claim.

## Deep vs shallow — contrastive SHOW

### Shallow wrapper

```text
Caller -> OrderService.create(order, db, queue, paymentClient, retryPolicy)
                 |
                 +-> mostly forwards the same details
```

If callers still choose retry policy, transaction/effect order, provider behavior, and recovery, the wrapper did not hide the difficult knowledge. A smaller file or fewer call sites does not make it deep.

### Deeper owner

```text
Caller --"place order"--> OrderService
                           | owns validation/invariants
                           | owns effect ordering/retry semantics
                           | hides provider/storage mechanics
                           +-> exposes outcome callers can act on
```

The exact project name may remain `OrderService`; the architectural improvement is reduced caller knowledge and concentrated responsibility, not the word “module”.

### One adapter can still earn a seam

A second provider is not required. One production adapter can justify a seam when a current protocol, trust, deployment, ownership, failure-isolation, or independent-change boundary already requires a stable contract. Conversely, several similar implementations do not justify one shared seam if they must evolve or fail independently.

## Testability without architecture-by-mock

Prefer interfaces whose public behavior can be exercised without knowing internals. Accept dependencies when that reflects a real seam, but do not manufacture a dependency interface solely because a mock is imaginable.

For owned side effects, keep the effect contract visible: ordering, idempotency/retry, ambiguous outcomes, observability, and recovery. A pure-return wrapper that hides a real side-effect responsibility is not automatically more testable or deeper.

The deletion test is useful: if deleting the owner makes its knowledge scatter back through several callers, it was earning locality. If deletion mostly removes forwarding boilerplate, it was probably shallow.

## Falsifiers

Reopen the design if representative implementation/runtime work shows:
- callers still require the supposedly hidden implementation knowledge;
- the new seam adds coordination without reducing change/failure scatter;
- a real trust/deployment/lifecycle boundary was collapsed;
- tests became easier only because they bypass the production mechanism;
- a project-native contract can no longer be traced through the design language;
- migration/rollback requires long-lived duplicate truth not justified by current consumers.
