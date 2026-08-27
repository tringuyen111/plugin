# Evidence Loop Selection

Use this reference when a deterministic reproduction is unavailable, unsafe, too destructive, or unrepresentative, or when an intermittent failure needs an observation strategy before causal diagnosis can continue.

The invariant is not "always reproduce first." It is:

> Do not claim a cause or implement a causal fix until the current evidence path can distinguish the relevant hypothesis from plausible alternatives.

Prefer reproduction when it is safe and representative because it gives the strongest, cheapest repeated falsification loop. Do not force replay when replay would change the system state, create unacceptable production risk, erase the timing condition, or require an environment that does not exist.

## Choose the evidence mode

| Mode | Use when | Minimum evidence before causal testing | Completion consequence |
| --- | --- | --- | --- |
| `REPRODUCTION` | A representative trigger can be run safely and repeatedly. | Exact symptom, executable trigger, observed red result, and a verdict/predicate that can distinguish change. | Tighten and minimize the repro; use it as the primary red/green loop. |
| `OBSERVATION` | The failure occurs in a live, remote, timing-sensitive, or otherwise non-replayable path, but telemetry/logs/traces/events can be sampled again. | Symptom identity + provenance/time window + at least one observation or probe whose predicted outcome differs across hypotheses. | Hypotheses may proceed; keep conclusions bounded to what the observations falsify. Re-observe after any authorized fix. |
| `FORENSIC` | Only a captured artifact exists, such as a core dump, HAR, trace, log bundle, crash report, or state snapshot. | Artifact provenance + symptom match + a causal chain or discriminating prediction that can be checked against the artifact or another obtainable artifact. | Produce provisional or supported diagnosis only to the strength of the artifact. Request the next evidence needed before a causal fix when alternatives remain live. |
| `INSUFFICIENT` | Available evidence cannot distinguish plausible causes. | None. Correlation, intuition, code reading, or an error-adjacent metric alone is not enough. | Stop causal claims and speculative fixes. Request the smallest missing artifact/access/probe, or an authorized instrumentation path. |

A mode can change as evidence improves. For example, a forensic crash dump can identify a candidate invariant, then a throwaway harness can convert the diagnosis to `REPRODUCTION`. Re-enter at the earliest invalidated evidence truth rather than preserving the old mode ceremonially.

## HOW — make the signal discriminating

For every hypothesis under test, write four fields:

```text
hypothesis: <candidate cause>
prediction: <what should differ if it is true>
probe: <repro action or observation that can expose that difference>
falsifier: <result that weakens or kills the hypothesis>
```

Prefer probes that partition the hypothesis set. A log line is useful only if its possible values change the decision. "Add more logs" is not a probe until the boundary, expected alternatives, and falsifier are named.

For automated bisection, the command must classify the property being searched well enough to produce meaningful good/bad verdicts. If the predicate is flaky or tests a nearby symptom, tighten the predicate before using bisection.

For concurrency/timing failures, first improve observation or reproduction probability without changing the causal mechanism: representative load, repeated execution, scheduler/race tooling, or existing timing/trace evidence. Do not inject sleeps or stress into production merely to make a bug easier to see.

## SHOW — same discipline, different evidence mode

### Local deterministic failure

Observed symptom: a specific fixture makes a parser return the wrong currency total.

```text
mode       = REPRODUCTION
trigger    = pytest tests/test_invoice.py::test_mixed_currency_total
red        = expected 120 EUR, observed 138 EUR
hypothesis = cached conversion state leaks from the previous line item
prediction = clearing state between line items removes the 18 EUR excess while the same fixture stays otherwise unchanged
probe      = inspect/reset only the per-line conversion state in a throwaway diagnostic branch
falsifier  = excess remains 18 EUR after state is proven isolated
```

Here, replacing the red command with screenshots or broad logs would weaken the loop. Minimize the fixture, test the hypothesis, and rerun the exact original fixture after the fix.

### Live intermittent failure without safe replay

Observed symptom: a small subset of production requests times out, and replaying them would repeat an external side effect. Existing traces and request IDs can be read safely.

```text
mode       = OBSERVATION
symptom    = timeout for the affected request IDs in the incident window
H1         = downstream latency consumes the deadline before the write begins
H2         = an internal retry duplicates waiting time after the first downstream response
probe      = compare existing span order/durations for affected vs nearby successful request IDs
H1 falsifier = affected traces show downstream returning early with most delay occurring after that span
H2 falsifier = affected traces show no repeated internal attempt or post-response wait
```

Do not block all hypothesis work merely because there is no safe red command. Also do not call either hypothesis the root cause from a generic latency spike: the observation must discriminate them. If an active incident is being stabilized, `incident-response` owns command and mitigation; this technical diagnosis can run in parallel without delaying an obvious authorized stabilization action.

## False proof patterns

- A metric moved at the same time as the symptom, but the proposed cause makes no unique prediction about that metric.
- A test is red, but it exercises a different failure than the user's reported symptom.
- A one-shot artifact is treated as repeated evidence even though its provenance or time alignment is uncertain.
- A stress/sleep injection makes the failure common but also changes the mechanism being diagnosed.
- An authorized mitigation makes impact disappear, and the mitigation is then reported as proof of root cause.
- A production issue cannot be replayed, so the agent either guesses from source code or refuses to inspect already-available discriminating telemetry.

When these occur, correct the evidence mode or probe. Do not widen confidence to make the workflow look complete.
