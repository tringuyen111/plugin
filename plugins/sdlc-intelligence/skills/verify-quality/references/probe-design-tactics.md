# Probe Design Tactics

Load this reference when a material risk/claim is known but the QA plan/proof model could still choose a generic or weak probe. Convert the claim into a falsifiable failure model before choosing test level/tool.

## 1. Claim -> failure model -> oracle

For each material claim write:

```text
claim / invariant
-> plausible way it can be false
-> observable consequence if false
-> smallest boundary where that consequence can be distinguished
-> controllable state/data/input needed
-> oracle that separates pass from fail
-> substituted mechanism and remaining proof gap
```

A probe is strong when it can actually make the bounded claim false. “Run an E2E test” or “add integration coverage” is not an authoritative probe decision until the failure mechanism and oracle are explicit.

## 2. Choose the boundary from proof authority

Prefer the lowest-cost boundary that still contains every mechanism the claim depends on.

- **Pure/component** — deterministic computation, parsing, local state transitions, isolated policy functions.
- **Contract/integration** — serialization, persistence, broker/database/provider adapter, transaction or protocol semantics.
- **End-to-end/real output** — cross-component routing, browser interaction, deployment/configuration, external system composition or user-visible acceptance.

If a lower boundary substitutes a material mechanism, either narrow the claim or add one complementary probe that exercises the missing boundary. Do not stack three mocks and call the result stronger.

## 3. Select data from decision structure

Use source-backed partitions and boundaries rather than random variety:

- exact threshold and values on each side;
- empty/single/many/maximum or representative large set when quantity changes behavior;
- valid/invalid/unknown/null/default states where semantics differ;
- same-scope/cross-scope identities for permission boundaries;
- fresh/stale/expired/revoked states for lifecycle rules;
- first/duplicate/reordered/retried inputs for idempotency/order;
- before/during/after cutover for migration/compatibility.

Property/generative data is useful when the invariant spans a large input space and a compact generator/shrinker can find counterexamples. It is not a substitute for known semantic boundary cases.

## 4. State, isolation and cleanup

Evidence is unreliable when tests accidentally depend on each other. Plan:

- test-owned or safely provisioned state;
- known baseline and deterministic seed/time when material;
- cleanup/reconciliation that cannot corrupt shared environments;
- parallelism/isolation constraints;
- idempotent setup where retries are possible.

Shared state is acceptable when explicitly read-only or when the environment provides safe isolation/reset. Disabling parallelism can reduce symptoms but does not prove hidden dependencies are gone.

## 5. Fault and temporal probes

Select only the failure modes supported by the risk model:

- timeout/lost response after an effect may have happened;
- dependency unavailable/slow/partial response;
- duplicate/reordered delivery;
- concurrent writers/readers;
- stale cache/replica/session/config;
- restart/crash/interruption during multi-step work;
- resource exhaustion/backpressure;
- clock/expiry boundary;
- retry after ambiguous failure;
- recovery/reconciliation after partial progress.

Control the fault at the smallest realistic seam. A generic thrown exception may not reproduce an ambiguous network timeout or a process crash after durable commit.

## 6. Performance and reliability evidence

Match the measurement to the claim:

- percentile claim -> percentile under representative workload, not average microbenchmark;
- throughput -> workload mix plus saturation/error/resource signals;
- memory/leak -> time/iteration pressure and retained-state observation;
- startup/first interaction -> cold/warm distinction;
- concurrency -> actual competing execution, not serial loops.

Lower-level profiling helps diagnose why an integrated metric fails; it does not inherit the authority of the integrated NFR.

## 7. Mutation and perturbation as strategy tools

When confidence depends on whether the oracle can detect a realistic defect, consider a safe bounded perturbation: invert a rule in a test fixture, remove an authorization condition in a disposable seam, corrupt a message in a harness, alter ordering or force a dependency failure. The purpose is to validate the test/oracle, not to modify production or create an offensive capability.

Use only when the perturbation is reversible, isolated and materially improves confidence that the probe can go red.

## 8. Probe-selection closure

For every must-run claim, QA should be able to answer: **what exact defect could this probe catch that the neighboring probes cannot?** If the answer is unclear, the probe is probably redundant, too generic or attached to the wrong boundary.

## Provenance

This reference combines existing SDLC claim/risk/evidence semantics with distilled testing-practice principles from the frozen Depth Program source pack. It intentionally rejects the mandatory multi-phase workflow shape of the excluded community Quality Playbook; failure-mode depth is conditional and proportional to material risk.
