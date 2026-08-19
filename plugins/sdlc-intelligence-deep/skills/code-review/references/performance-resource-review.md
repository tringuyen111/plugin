# Performance and Resource Review Lens

Load when the change introduces repeated work/I/O, fan-out, scale-sensitive loops, locking/contention, cache scope, resource acquisition/lifetime, or a material performance claim.

## Find concrete amplification

Tie the concern to a realistic path and growth variable:

```text
one request -> N items -> N database/network/filesystem calls
one event -> fan-out to N consumers/tasks
one retry layer -> nested retry amplification
one render/update -> repeated expensive work
```

Do not label a loop or allocation a performance bug without a plausible scale/trigger and consequence.

## Resource lifetime

For files, sockets, streams, transactions, locks, tasks, subscriptions, browser observers, or other owned resources, trace acquire -> use -> release across:

- success;
- error/exception;
- early return;
- cancellation/timeout;
- retry;
- shutdown/unmount when applicable.

A source-visible path that leaks or retains ownership can be a Correctness finding even without a benchmark.

## Contention and shared scope

Inspect whether new locking/serialization/shared-cache scope can create blocking, cross-user/tenant leakage, stale data, or thundering-herd/retry amplification. Do not widen cache/shared state merely to hide a missing ownership or authorization decision.

## Performance evidence boundary

Separate source-grounded amplification from measured performance. Do not invent latency, throughput, memory, CPU, query-plan, or production-volume claims. When severity depends on magnitude, request/route the smallest representative benchmark, trace, profile, query plan, or runtime probe rather than guessing.
