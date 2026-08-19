# Causal Localization and Probe Selection

Load this reference when the symptom can arise from multiple plausible mechanisms, crosses component/state/time boundaries, changes under instrumentation, depends on concurrency/performance/environment differences, or a regression search has an unstable classifier.

The goal is not to enumerate causes. The goal is to reduce causal uncertainty with the smallest representative evidence that changes the next decision.

## 1. Build the causal slice before naming the cause

Trace only the path capable of producing the reported symptom:

```text
relevant input / prior state
  -> caller and decision boundary
  -> state mutation / cache / transaction
  -> async or external boundary
  -> retry / queue / scheduler / concurrency edge
  -> output or durable effect
  -> observed symptom
```

Add branches only when inspected evidence says they can affect the symptom. Mark where identity, ordering, ownership, version/config, time/deadline, or resource consumption changes. A full architecture map is usually worse than a small causal slice because it creates hypotheses unrelated to the observed path.

Find the **earliest discriminating boundary**:

- bad and healthy runs first differ there; or
- the violated invariant is first observable there; or
- a wait/resource class first becomes abnormal there; or
- a required event/effect is first missing, duplicated, reordered, or stale there.

Do not confuse the last visible error with the first causal divergence.

## 2. Choose the localization lens from the failure shape

| Failure shape | First expert question | Useful discriminator | Common wrong turn |
|---|---|---|---|
| Wrong value / corrupt state | Where is the invariant first violated? | good-vs-bad value/state at successive boundaries | Starting at the final exception or patching output formatting |
| Missing / duplicate external effect | Which logical operation and execution attempt produced each effect? | operation identity, attempt identity, commit/effect ordering, retry/redelivery trace | Assuming timeout means the effect failed, or payload equality means same intent |
| Intermittent / timing-sensitive | What ordering or shared state differs across occurrences? | happens-before/order/ownership evidence under representative workload | Adding sleeps/logs until the race disappears and treating that as proof |
| Latency / throughput regression | Is wall time spent doing work, waiting, queueing, blocking, retrying, or contending? | trace/profile/queue/resource evidence normalized to comparable work | Optimizing a CPU-looking function while the request waits elsewhere |
| Memory/resource growth | Is growth live ownership, bounded cache, backlog, allocator/runtime retention, or unreleased resource? | retained-object/owner profile, queue depth, cache cardinality, lifecycle evidence | Calling every rising RSS graph a leak |
| Environment-only failure | Which runtime/config/dependency/data fact differs materially? | bounded environment fingerprint plus same meaningful workload | Blaming "production" as one undifferentiated variable |
| Revision regression | Can one stable property partition known-good and known-bad revisions? | repeatable classifier / differential result | Running automated bisection with a flaky or adjacent predicate |

A failure can activate more than one lens. Keep them separate until evidence shows an interaction.

## 3. Maintain hypotheses by mechanism, not by count

A useful live hypothesis explains the symptom through a distinct mechanism and makes a prediction that another live hypothesis does not.

Bad set:

```text
H1 caching bug
H2 cache invalidation bug
H3 stale cache bug
H4 cache timing issue
```

These may be one mechanism family with renamed symptoms.

Better set for a stale response:

```text
H1 = stale value is read from a cache after authoritative state changes
H2 = authoritative update commits after the response path has already read old state
H3 = response belongs to an older request/generation and wins a later race
```

Prefer a small set that spans plausible mechanism families. Do not invent a fixed number. If two factors must interact, keep the composite only when neither factor alone predicts all observations and the interaction itself has a falsifiable signature.

## 4. Select probes for information gain without fake precision

Evaluate a candidate probe qualitatively across these variables:

```text
discrimination     -> do different outcomes kill different hypotheses?
representativeness -> does it preserve the real path/state/load/timing that matters?
perturbation       -> can observing or changing the system alter the failure mechanism?
safety/reversibility -> can it be run within authority and recovered cleanly?
cost               -> runtime, human effort, environment scarcity, repeated trials
```

Prefer a probe that splits the live hypothesis set cleanly over one that merely produces more data. Do not compute a fake numeric score when the variables are qualitative.

When possible, use **contrastive evidence** because it controls irrelevant variation:

- affected request versus nearby successful request;
- old versus new revision with the same meaningful input;
- same revision across two bounded config/runtime states;
- one execution before versus after a suspected invariant boundary;
- profile/trace of comparable work, not equal wall-clock duration when throughput differs.

## 5. Distinguish observation from intervention

A debugger, logging, tracing, profiling, stress mode, sleep, fault injection, replay, cache clear, restart, or configuration toggle can change the system it measures.

If the symptom changes after introducing the probe, classify the result before interpreting it:

| Result | Meaning | Next move |
|---|---|---|
| Probe changes only visibility, symptom remains | Evidence can be used within its proof boundary | Continue hypothesis test |
| Probe makes timing-sensitive symptom disappear | Possible observer/perturbation effect; not a fix | Prefer lower-overhead observation, repeated representative workload, or forensic evidence |
| Replay cannot reproduce a production-only path | Replay may be unrepresentative, not exculpatory | Re-enter evidence-mode selection; compare runtime/config/data/load facts |
| Stress makes failure common but also changes bottleneck/order | Mechanism may have changed | Reduce stress or use the result only to form a narrower hypothesis |
| Tool is clean | Negative evidence only for executed paths and the defect class/tool semantics | Keep unexercised or out-of-model mechanisms live |

## 6. Hard-case tactics

### A. Duplicate effect disappears under debugging

Do not jump from "logging fixes it" to "race condition proven." Bind the logical operation and attempt identities, compare affected and healthy orderings, and inspect where duplicate external effects become possible. If low-overhead traces show two attempts reaching the effect boundary for one logical operation, that separates retry/redelivery ownership failures from a pure storage race. If the evidence cannot distinguish them, keep both live.

### B. Bisection predicate is flaky

A revision search requires a classifier that meaningfully separates the searched property. If one run passes 80% of the time, a single `good`/`bad` verdict is weak evidence. First tighten the symptom oracle, repeat enough to bound the property for the current decision, or find a stronger differential signal. Mark untestable revisions as such; do not convert skipped/ambiguous points into certainty about the first bad change.

### C. Latency rises while CPU looks normal

Do not equate slow with CPU-expensive. Decompose wall time into useful service work and waiting classes: queue/admission, locks/contention, downstream I/O, retry/backoff, scheduler/runtime, or other blocking. Compare affected and healthy traces/profiles at the earliest boundary that separates these classes. If the client may hide retries, verify actual runtime/client behavior before attributing all downstream time to one call.

### D. Race detector is clean but corruption persists

Dynamic race tools only observe executed paths and specific memory-access races. Check whether the representative high-contention path actually ran and whether the suspected defect is a data race versus a higher-level atomicity/order/invariant bug. A clean run can kill a narrow hypothesis on the exercised path; it cannot prove that all concurrency mechanisms are correct.

### E. Minimized harness goes green after a change

A minimized harness is causal evidence only for mechanisms it retained. If minimization removed a queue, retry, cache, external system, or concurrency edge, then a green harness after a change is not closure for the original symptom. Rerun the original representative path or add the smallest complementary probe that restores the omitted mechanism.

## 7. Re-entry rules

Re-enter instead of pushing forward when the evidence invalidates an earlier assumption:

- **Observed symptom differs from the report:** re-enter symptom/evidence binding; do not debug the nearby failure.
- **Probe outcome supports multiple hypotheses equally:** the probe had low discrimination; redesign at a boundary where predictions diverge.
- **Instrumentation changes the failure signature:** re-enter evidence-mode selection with a less perturbing path.
- **New evidence shows a different first divergence:** rebuild the causal slice from that boundary and discard hypotheses that depended on the old topology.
- **A single-factor hypothesis cannot explain path-dependent observations:** test the smallest interaction/composite prediction rather than adding unrelated causes.
- **Fix passes only the minimized harness:** re-enter proof at the original representative path or explicit missing boundary.
- **Bisection classifier is unstable:** stop revision localization until the classifier is made decision-useful; do not average noise into a fake culprit.

Negative results are progress when they eliminate a mechanism. Preserve them so later attempts do not resurrect killed hypotheses without new evidence.

## 8. Completion of causal localization

Localization is strong enough to support a causal fix only when:

- the surviving mechanism explains the bound symptom and all load-bearing observations at the stated confidence;
- at least one discriminating prediction survived a representative probe while plausible competing mechanisms were materially weakened or killed;
- instrumentation/replay limitations are explicit;
- any composite cause has an observed/predictive interaction, not merely co-occurring factors;
- the proposed fix targets the owning mechanism/invariant rather than a downstream symptom;
- post-fix proof returns to the original representative evidence path or names the exact boundary that still prevents closure.

If several mechanisms remain observationally equivalent, report that equivalence and the smallest missing discriminator. Do not choose one for narrative neatness.

## Provenance

This is a derived reasoning aid informed by primary technical sources reviewed on 2026-08-16: Google SRE **Effective Troubleshooting**; Git **git-bisect** documentation; Go **Data Race Detector**, **Diagnostics**, and **Profiling Go Programs** documentation. It intentionally extracts decision mechanisms rather than copying source prose. Re-verify tool/runtime-specific semantics against the inspected project versions before treating them as project truth.
