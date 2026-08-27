# Deepening

How to deepen a cluster of shallow modules safely, given its dependencies. Assumes the vocabulary in the [Codebase Design workflow](SKILL.md) — **module**, **interface**, **seam**, **adapter**.

## Fit gate before dependency category

Dependency category informs the design; it does not grant permission to deepen. Deepen only when source evidence shows that consolidation reduces leaked caller knowledge, duplicated policy, or change/failure scatter while preserving the right owner and operational boundaries.

Keep or introduce separation when it preserves a material protocol, trust, ownership, deployment, lifecycle, failure-isolation, performance, or independent-change boundary. Reject deepening whose main benefit is fewer files, a cleaner diagram, or easier mocking.

## Dependency categories

Classify dependencies to choose appropriate seam and proof tactics after the fit gate passes.

### 1. In-process

Pure computation or in-memory state with no I/O is often the cheapest place to deepen **when the code shares one owner, invariants, change pressure, and failure model**. Merge when doing so hides duplicated knowledge from callers and produces a clearer interface. Keep separate modules when a distinct responsibility or change/failure boundary remains material. No adapter is required merely because code was merged.

### 2. Local-substitutable

Dependencies may have local high-fidelity stand-ins such as an embedded database or in-memory filesystem. A stand-in is a proof option, not justification for the boundary by itself. Deepen when the fit gate passes, then use the highest-fidelity practical proof that exercises the relevant contract. Do not expose a port at the external module interface solely to inject a test double.

### 3. Remote but owned (Ports & Adapters)

For owned services across a network boundary, define a **port** when callers need a stable purposeful protocol independent of transport details. Keep transport behavior in an **adapter** and make remote failure, retry, timeout, ordering, and compatibility semantics explicit when material.

A production HTTP/gRPC/queue adapter is common. A second in-memory/fake adapter can be useful when it proves the contract faithfully enough, but a test adapter is not required to make the seam "real" and does not by itself justify the port.

### 4. True external

For third-party services you do not control, isolate provider-specific semantics behind a port when doing so protects the owned caller contract from provider protocol, failure, trust, or change pressure. Tests may use fakes/mocks for selected behavior, but provider isolation must be earned by the production boundary rather than by test convenience alone. Use integration/runtime proof when mock fidelity cannot establish a load-bearing claim.

## Seam discipline

- **Earn seams from production truth.** Multiple current adapters are strong evidence that behavior varies across a seam. One current adapter is inconclusive: keep a seam when a source-grounded protocol, trust, ownership, deployment, or change boundary requires a stable contract; reject it when its only purpose is mockability or speculative future variation.
- **Internal seams vs external seams.** A deep module can have internal seams private to its implementation and an external seam at its caller-facing interface. Do not expose internal seams through the external interface just because a narrow test uses them.
- **Do not erase real boundaries while deepening.** Locality is useful only when it does not merge responsibilities whose independent failure, ownership, security, or deployment semantics must remain visible.

## Testing strategy: preserve proof, remove sediment

- Prove caller-visible behavior at the deepened module's interface, but do not treat that interface as the only legitimate test scope.
- Before deleting or rewriting an existing narrow test, compare proof value. Remove it when its old contract is superseded, it only encodes implementation structure or duplicated behavior, current consumers are migrated, and replacement proof covers the material falsifier.
- Retain a narrow test when it uniquely and economically falsifies an invariant, algorithmic edge, rare failure mode, or fidelity property not established by the interface/integration/runtime proof.
- Use integration or runtime probes when transport, persistence, provider, concurrency, timing, or other fidelity is load-bearing; mocks/fakes do not prove behavior they cannot reproduce.
- Assert observable outcomes, including owned effects and their state/telemetry when material. Do not require every test to reduce to a return value.
- Test obligations follow material behaviors, invariants, failures, risks, and fidelity. Fewer interface methods may simplify setup but do not imply that fewer tests are sufficient.
- Delete obsolete executable tests together with superseded surfaces after parity/cutover proof; Git stores history, not an active test suite.
