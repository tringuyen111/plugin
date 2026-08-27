# Service Runtime Discipline

Read this reference when a request-serving backend process, shared runtime resource, or outbound service client makes startup/readiness, resource lifetime, deadline/cancellation, remaining deadline budget, request admission, in-flight concurrency, serving queue pressure, overload, remote-result ambiguity, retry-layer interaction, drain, or cleanup material to correctness or proof.

This reference owns **implementation and proof discipline** for service/runtime boundaries. It does not redefine caller-visible API behavior, data/transaction semantics, security policy, readiness/SLO criteria, retry budgets, capacity targets, deployment policy, or operational recovery decisions. Consume those from their canonical owners.

## Contents

- [Bind source authority before runtime mechanics](#bind-source-authority-before-runtime-mechanics)
- [Use boundary lifecycle as the execution lens](#use-boundary-lifecycle-as-the-execution-lens)
- [Build process and resource lifecycle from actual runtime facts](#build-process-and-resource-lifecycle-from-actual-runtime-facts)
- [Carry deadline and cancellation through the real path](#carry-deadline-and-cancellation-through-the-real-path)
- [Bound request-serving pressure at the admission seam](#bound-request-serving-pressure-at-the-admission-seam)
- [Make outbound adapters honest about client behavior](#make-outbound-adapters-honest-about-client-behavior)
- [Classify remote outcomes without inventing certainty](#classify-remote-outcomes-without-inventing-certainty)
- [Bound retry layers instead of stacking them blindly](#bound-retry-layers-instead-of-stacking-them-blindly)
- [Drain and release what this process actually owns](#drain-and-release-what-this-process-actually-owns)
- [Challenge the runtime failure path](#challenge-the-runtime-failure-path)
- [Return owner and runtime-fact gaps precisely](#return-owner-and-runtime-fact-gaps-precisely)
- [Completion](#completion)

## Bind source authority before runtime mechanics

Before changing startup, readiness, client, timeout, cancellation, admission, concurrency, shutdown, or cleanup code, bind three sources of truth:

1. **Approved semantics** — required configuration meaning, caller-visible deadline/error behavior, external-operation retryability/idempotency, security decisions, readiness/health contract, and applicable NFR/operational constraints.
2. **Observed runtime/client facts** — how this actual framework, host, SDK, client, proxy, or provider initializes, pools/reuses resources, admits and queues work, limits concurrency, propagates cancellation, applies timeouts/retries, represents remote outcomes, drains, and releases resources.
3. **Current implementation evidence** — composition root, startup hooks, client construction, request admission/concurrency/queue seams, request context propagation, response/stream handling, shutdown path, observability, and tests that actually cross the affected seam.

Treat an unknown material item as an exact owner/runtime-fact gap. Do not replace missing facts with a familiar framework recipe.

## Use boundary lifecycle as the execution lens

Use **boundary lifecycle** for service-process and outbound-resource execution:

```text
approved semantics + observed runtime facts
        ↓
acquire / configure
        ↓
become usable / ready
        ↓
admit / execute + propagate deadline / cancellation
        ↓
classify result / failure / ambiguity
        ↓
release / drain / cleanup
        ↓
prove or return an exact owner/runtime-fact gap
```

Model only lifecycle dimensions that can change the active unit's correctness or proof. Do not activate a branch merely because production services commonly have it.

When queue/job/scheduler delivery identity, temporary work ownership, redelivery, replay, partial progress, or retry exhaustion is material, use [Background Execution Discipline](background-execution-discipline.md) for the attempt lifecycle. An outbound call made *inside* a background attempt may require both lenses: attempt ownership remains background truth; client/resource execution remains boundary-lifecycle truth.

## Build process and resource lifecycle from actual runtime facts

Identify the resources this process actually owns or coordinates: server/listener, external-service clients, executors, caches, subscriptions, file/stream handles, telemetry exporters, or other shared runtime components. Keep database session/pool/transaction mechanics as a bounded Data/Persistence concern when they are the material boundary; host-native discovery owns any separate capability selection.

For each material resource:

- locate acquisition/configuration in the real composition/startup path;
- determine whether its lifetime is process-wide, scoped, pooled, leased, or otherwise defined by the actual framework/client;
- define what must succeed before the resource is usable by the active path;
- preserve cleanup when later initialization fails after earlier resources were acquired;
- keep one canonical owner for construction and release instead of creating hidden secondary lifetimes.

Do not turn "dependency injection", "singleton client", "connection pool", or another common pattern into a portable default. Choose from inspected runtime semantics and established project structure.

### Distinguish alive from ready

A running process is not proof that the approved service is ready to accept work.

Implement the already-approved readiness/health semantics at the seam that can observe the required conditions. If readiness criteria, degradation rules, dependency requirements, or thresholds are missing, return the owning Design/NFR/Operations gap rather than inventing them in backend code.

Proof must exercise the readiness transition that matters to the claim, including a material initialization failure when one can occur.

## Carry deadline and cancellation through the real path

When the caller/runtime exposes deadline or cancellation semantics, trace them through the actual execution graph rather than stopping at the controller boundary.

For each material synchronous or asynchronous sub-operation:

1. identify the approved deadline/cancellation source;
2. inspect how the local framework represents and propagates it;
3. pass or translate it across use-case and adapter boundaries where the downstream API supports it;
4. classify what happens when cancellation arrives during acquisition, execution, response streaming, or cleanup;
5. preserve required cleanup and truthful outcome reporting.

Do not manufacture a universal timeout. A client timeout, request deadline, proxy timeout, provider timeout, and business deadline may be different mechanisms with different owners.

If a downstream primitive cannot cancel an already-issued external side effect, keep that limitation explicit and use the approved ambiguity/reconciliation contract rather than claiming cancellation erased the effect.

When the runtime exposes a remaining deadline/budget and the next stage has material acquisition, queueing, computation, or remote-call cost, check that remaining usable budget before starting the expensive stage. Follow the approved timeout/cancellation/degradation semantics when the budget is already exhausted or cannot support the required stage; preserve cleanup and truthful outcome reporting. Do not invent a universal minimum budget or infer one from a single timing sample.

When approved semantics define one end-to-end deadline, treat queueing, acquisition, retry backoff and every downstream attempt as spending that same enclosing budget. Do not silently reset the original full timeout for each attempt or retry layer. The owner of the deadline/retry policy decides any allocation or reserve; Backend Engineering binds the implementation to the remaining budget and the runtime's actual timeout/retry mechanics.

## Bound request-serving pressure at the admission seam

When accepted request work can outpace the service's approved capacity or consume deadline budget while waiting, treat pressure as an admission/execution correctness concern rather than merely a latency symptom.

Bind three things before changing behavior:

1. **Approved capacity/degradation semantics** — applicable concurrency or queue bounds, priority, rejection/degradation behavior, and caller-visible outcome owned by Architecture/NFR/Operations/API truth.
2. **Observed serving mechanics** — where this actual server/framework/proxy/executor queues work, which seam limits in-flight concurrency, what cancellation does to queued work, and which pressure signals are observable.
3. **Active-path cost and effects** — which stages acquire scarce resources, perform expensive computation, or issue side effects after admission.

Then:

- identify the earliest supported seam that can bound new work before the material scarce/expensive stage;
- distinguish admission backlog, in-flight concurrency, downstream-pool saturation, and provider throttling instead of treating one knob as a universal capacity control;
- apply the already-approved bound/degradation behavior at that seam and keep caller-visible mapping with its canonical owner;
- avoid starting a material next stage for already-expired work when the runtime can observe the deadline/cancellation state and approved semantics require stopping;
- do not use retries to compensate for overload unless an approved retry budget and layer explicitly authorize that repetition;
- prove the branch with the smallest falsifying pressure probe: cross the approved bound just far enough to observe admitted/queued/rejected/expired behavior, bounded in-flight/backlog state, truthful outcomes, and recovery after pressure subsides.

If the capacity bound, degradation/rejection contract, priority policy, or provider/runtime admission facts are missing, return the exact owner/runtime-fact gap. Backend implementation must not manufacture those thresholds to make the test pass.

## Make outbound adapters honest about client behavior

For an external HTTP/RPC/provider call, bind implementation to the approved external-call contract and the actual client/runtime behavior.

Inspect at least the material parts of:

- **client lifetime** — construction, reuse, pooling, thread/task safety, connection ownership, close semantics;
- **request context** — deadline, cancellation, correlation/trace context, tenant/security context already approved for propagation;
- **transport behavior** — connection establishment, streaming/body lifecycle, concurrency limits, redirects or retries when they affect correctness;
- **error surface** — timeout, cancellation, transport failure, protocol/application failure, partial response, and provider-specific ambiguous states;
- **cleanup** — response/body/stream consumption, connection release, task cancellation, client close, and cleanup after exceptions.

Keep caller-visible error mapping and retryability/idempotency semantics owned by API/design truth. The adapter implements those semantics; it does not redefine them from SDK exception classes.

## Classify remote outcomes without inventing certainty

When remote ambiguity is material, use **Effect Evidence State** for what authoritative evidence establishes about the remote effect: `ESTABLISHED`, `NOT_ESTABLISHED`, or `UNKNOWN`. A timeout, connection reset, lost response, or cancellation after dispatch can leave the remote effect `UNKNOWN`; transport failure alone does not prove it did not happen.

Before deciding whether to repeat or fail an outbound operation:

1. inspect the approved operation identity and retry/idempotency contract;
2. determine what the actual client/provider can prove about request dispatch and response receipt;
3. inspect any approved observation/reconciliation seam;
4. classify the next action as retry, observe, reconcile, fail terminally, or return an owner/runtime-fact gap;
5. keep the ambiguous path observable enough to prove which branch ran.

Transport failure is not proof that the provider made no effect. Likewise, an SDK exception name is not canonical business outcome truth.

## Bound retry layers instead of stacking them blindly

Trace every component that may repeat an outbound call: application code, framework middleware, SDK/client, service mesh/proxy, gateway, provider, or another established layer.

When retries are material:

- identify which layer is authorized to repeat which operation;
- bind its count/backoff/deadline to approved semantics and actual runtime configuration;
- account for multiplicative amplification when several layers retry;
- preserve one observable terminal outcome for the active unit;
- return missing retry budget, provider retryability, or operational policy to its owner.

Do not add retries because the call is remote. A no-retry path can be the correct implementation when the approved contract or ambiguity cost requires it.

### Contrastive example: hidden retry under one deadline

Suppose the inspected outbound client is gRPC. Application source may contain no retry loop while the actual gRPC client can still perform limited transparent retry in pre-commit failure states. If the request also carries an end-to-end deadline, enumerate that runtime retry behavior and make every authorized attempt/backoff spend the remaining budget instead of starting a fresh copy of the original timeout. Preserve the approved ambiguity/retryability contract for any effectful call.

The near-miss is to claim “exactly one attempt” from application source alone or to copy gRPC retry behavior into a different client without inspecting its runtime/configuration. Prove the configured/observed layer that can repeat the call and the terminal outcome under the real deadline.

## Drain and release what this process actually owns

Bind shutdown to the actual host lifecycle and the resources owned by this process.

When graceful service shutdown is material:

1. stop or reduce new admission at the supported seam;
2. propagate the real shutdown/cancellation signal to in-flight work where allowed;
3. drain, cancel, or finish owned work within the approved/runtime deadline;
4. close/release owned clients, listeners, streams, executors, and exporters in a dependency-safe order;
5. account for forced termination and preserve truthful recovery/ambiguity evidence for work that could not finish.

A signal hook, `finally` block, or client `close()` call is not sufficient proof by itself. Exercise the path that demonstrates the material resource or request disposition.

## Challenge the runtime failure path

For every material boundary-lifecycle dimension, choose the smallest probe that could falsify the implementation claim:

- fail a required dependency during startup and inspect readiness plus partial cleanup;
- cancel or expire a request while downstream work is active and inspect propagation/cleanup;
- exercise an outbound timeout or lost response after dispatch and inspect ambiguity handling;
- expose multiple configured retry layers and verify amplification is bounded/intentional;
- interrupt response/stream consumption and inspect release behavior;
- terminate with in-flight requests/resources and inspect admission stop, drain/cancel, and cleanup.

Use real framework/client/runtime seams when the claim depends on their behavior. A test double that bypasses pooling, cancellation, retry, streaming, or shutdown narrows the proof to the seam it actually executes.

## Return owner and runtime-fact gaps precisely

Stop the affected backend work instead of inventing truth when correctness depends on an unresolved decision outside the current technical mandate. Name the missing class:

- **API/design gap** — caller-visible deadline, retryability/idempotency, error or ambiguous-result contract;
- **Data/design gap** — durable transaction/reconciliation semantics or DB-specific resource policy owned by the data path;
- **Security gap** — secret, identity, tenant, trust/TLS, authorization, or credential-propagation policy;
- **NFR/Operations gap** — readiness criteria, timeout/retry budget, capacity/SLO threshold, shutdown deadline, degradation or recovery policy;
- **Runtime-fact gap** — actual framework/client/provider lifecycle, cancellation, pooling, retry, streaming, or termination behavior is unverified.

## Completion

The service-runtime branch is complete only when every **material** boundary-lifecycle dimension is in one of these states:

```text
implemented + proof-bound
OR
returned as an exact missing-owner/runtime-fact gap
```

Do not claim production-runtime correctness from generic framework knowledge. Bind implementation to current approved semantics, inspected project/runtime behavior, and evidence from the seam that carries the claim.
