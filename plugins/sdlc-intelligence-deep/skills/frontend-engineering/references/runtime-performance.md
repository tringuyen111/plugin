# Frontend Runtime and Performance

Load this reference only when the current frontend unit depends materially on request timing, client async-result freshness or supersession, cancellation ownership, React/Next rendering boundaries, hydration, bundle loading, reactive invalidation, caching/deduplication, measured rendering cost, or interaction responsiveness/main-thread pressure. Framework-specific guidance is conditional on inspected repository/runtime evidence; translate the reasoning model, not React syntax, when another framework owns the mechanism.

## 1. Start with the critical path, not an optimization list

Reconstruct the path from user action/request to usable output. For every material unit of work identify:

- what starts it and when it can start;
- what data it actually depends on;
- whether another operation is truly dependent or merely sequenced in source;
- server versus client execution boundary;
- cache/deduplication scope and lifetime;
- serialization/network/bundle/render cost introduced at the boundary;
- the observable that would prove the bottleneck moved.

Optimize the longest decision-relevant path first. A smaller function or faster micro-benchmark is irrelevant when it is not on that path.

## 2. Async request graph

### Independent work serialized by source order

When operation B does not consume A's result, sequential `await` placement is evidence of a possible waterfall. Start independent work together or defer the await until the value is actually needed, while preserving failure/cancellation and side-effect order.

Do not parallelize because two promises exist. First prove there is no semantic, transactional, authorization, rate-limit, resource, or ordering dependency.

### Partial dependency graph

When some work depends on A and some does not, model the graph rather than choosing "parallel" versus "sequential" globally. Start the independent branch early; keep true dependents behind their prerequisite. For nested server rendering, consider whether the rendering boundary can start child work earlier instead of making the parent await data it does not render.

### Probe

Use server timing, request traces, logs with correlation, browser network waterfall or a targeted harness that reveals start/end overlap. Completion evidence must show critical-path change, not only syntactic concurrency.

## 3. Client async freshness and supersession

Treat an async completion as authoritative only for the UI intent, query, route, or state revision it was started to serve. When newer intent supersedes older in-flight work, model a freshness lifecycle:

`current intent/revision -> work starts -> intent may supersede -> completion arrives -> accept only if still authoritative -> cleanup/cancel/release`

### SHOW — late success loses authority after supersession

| Event | Current authoritative revision | Completion attempting UI mutation | Decision |
|---|---|---|---|
| Query `alpha` starts request A | `r1` | none | A may mutate current UI only while `r1` remains authoritative. |
| User changes to `beta`; request B starts | `r2` | A / `r1` still pending | A loses commit authority immediately even if transport cancellation is requested. |
| B resolves first | `r2` | B / `r2` | Accept B when its result satisfies the current contract. |
| A resolves successfully later | `r2` | A / `r1` | Reject/ignore A; transport success cannot restore obsolete UI authority. |
| Cleanup/abort for A runs or races | `r2` | A / `r1` may still complete | Treat cancellation as lifecycle/resource control; the revision/identity check remains the correctness boundary. |

Map this model onto the framework/router/query lifecycle when that layer already owns request identity and stale-result suppression; do not duplicate the mechanism merely to reproduce the table locally.

Bind work to the smallest semantic identity/revision that decides whether its result may still mutate current UI truth. On completion, reject or ignore stale results even when the transport succeeded. If the runtime or provider supports meaningful cancellation, use it to reduce wasted work and side effects, but do not treat an abort call as the correctness proof: cancellation can race, may arrive too late, or may only stop local observation.

Before adding local effect/cache/abort machinery, inspect whether the framework, router, query client, cache, loader, or data layer already owns request identity, freshness, deduplication, cancellation, retries, or stale-result suppression. Reuse that lifecycle when it already satisfies the contract; add local ownership only for a demonstrated remaining gap.

Probe with an out-of-order or supersession case that can falsify state correctness: start older work, supersede it with newer intent, let the older work finish last, and verify that current UI truth cannot regress.

## 4. Server/client and hydration boundaries

A hydration mismatch is usually conflicting first-render truth, not a warning to suppress. Classify the cause:

- browser-only state read during server/initial render;
- time/random/locale or environment-dependent output;
- data changed between server payload and client bootstrap;
- invalid markup or third-party DOM mutation;
- client/server component boundary moving non-serializable or unstable state;
- intentional client-only output without an explicit placeholder/transition contract.

Fix the ownership or transfer of first-render state. Use client-only rendering, an explicit stable server value, or a deliberate transition only when the approved UX permits it. Blanket warning suppression is a last resort for known, intentionally unavoidable differences and is not proof of correctness.

For server/client component systems, challenge unnecessary client boundaries: every client boundary can expand serialization, bundle and hydration work. Conversely, do not force server rendering when the interaction genuinely requires client state or browser APIs.

## 5. Bundle and loading pressure

Treat bundle work as a user-path problem:

- Is the module on the initial/critical interaction path?
- Is a broad/barrel import preventing tree shaking or pulling avoidable code?
- Is a heavy editor/chart/media/tool only needed after an optional interaction?
- Does dynamic loading improve time-to-usable output or merely move cost to the next click?
- Does the dependency already have a narrower entry point?
- Is the chunk/network overhead material at the target runtime?

Prefer narrow imports and deferred/dynamic loading when evidence shows non-critical code is paid on a critical path. Do not fragment small or immediately required code merely to increase chunk count.

Proof can include bundle analysis, route chunk output, network transfer/parse cost and representative interaction timing. "Bundle became smaller" is incomplete if the critical interaction became slower.

## 6. Reactive invalidation and rerender pressure

Find why the component is invalidated before applying memoization.

Common mechanisms:

- subscribing to a whole store/context when one stable slice is consumed;
- effect-driven derived state that could be computed from current inputs;
- unstable object/function dependencies causing effect or memo churn;
- state stored too high, causing broad invalidation;
- transient values stored as render-driving state when a ref/non-reactive holder would suffice;
- component identity recreated in a hot parent path;
- expensive children receiving changed references without semantic changes.

Fix dependency/ownership breadth first. Memoization is useful when it demonstrably prevents expensive repeated work across stable semantic inputs; it is not a correctness blanket and can add comparison/retention complexity.

Use profiler/rerender instrumentation or targeted counters when the performance claim depends on rerender frequency/cost.

## 7. Caching and request deduplication

Name cache semantics before using a cache:

- key and identity;
- scope (request, render, process, user, tenant, shared service);
- lifetime/expiry and invalidation;
- authorization/sensitive-data boundary;
- stale-data tolerance;
- failure caching/retry behavior;
- memory/eviction cost.

Deduplicate identical work when repeated callers can safely share the result in the same valid scope. Never use a broader cache to hide a missing data-ownership or authorization decision.

## 8. Rendering and large collections

When DOM/render cost is material, inspect actual item count, update frequency, layout/paint cost and interaction needs. Options such as pagination, windowing/virtualization, content visibility, incremental rendering or lower update frequency solve different mechanisms. Pick the smallest mechanism that attacks the measured bottleneck and verify scroll/focus/accessibility semantics are preserved.

## 9. Interaction responsiveness and main-thread pressure

For a slow click, keypress, pointer action, or other user interaction, reconstruct the interaction critical path rather than assuming bundle size or rerender count is the cause:

`input queued -> handler starts -> synchronous/async processing -> render/style/layout/paint -> next visible feedback`

Locate where delay is actually paid: before the handler can run, inside long synchronous JavaScript, in repeated state/render work, during style/layout/paint, or in another task that monopolizes the main thread. Inspect representative browser timing or a performance trace when the claim depends on responsiveness. Field evidence and lab reproduction answer different questions; do not silently substitute one for the other.

Reduce, defer, chunk/yield, or move work only when the runtime supports the mechanism and doing so preserves ordering, state, accessibility, and user-visible semantics. Re-measure the same representative interaction and record any cost moved to startup, network, memory, later interaction, or visual completion.

Treat INP or another responsiveness threshold as project/NFR/Operations truth, not an implementation default. When no approved threshold exists, report the measured symptom and improvement without manufacturing an acceptance target.

## 10. Performance closure

Before claiming improvement, record:

1. baseline symptom and representative path;
2. winning mechanism hypothesis;
3. measurement/probe used;
4. before/after observation under comparable conditions;
5. trade-off moved elsewhere (network, memory, next interaction, freshness, complexity);
6. affected sibling paths rerun.

Do not turn one synthetic metric into a universal performance claim.

## Provenance

This reference is a paraphrased/derived reasoning aid informed by Vercel's `react-best-practices` Agent Skill at repository revision `b8caa260a420a73042e35521de4b5c8baf6446cc` (MIT). Exact inspected source and rule inventory are preserved in the frozen Depth Program knowledge source pack; no upstream rule file is copied wholesale here. Current guidance was rechecked on 2026-08-15 against Vercel's official `agent-skills` collection plus React/Next official runtime documentation; framework examples remain conditional on inspected project truth.
