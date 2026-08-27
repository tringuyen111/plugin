# QA Probe Execution Discipline

Load this reference when executing a material condition whose result can be distorted by harness validity, timing/synchronization, shared state, substituted dependencies, fault placement, retries/flakiness, or environment mismatch. This discipline governs evidence production; it does not change the condition oracle, approved scope, or QA verdict rules.

## 1. Preflight the probe before trusting its result

Freeze:

```text
condition / oracle
candidate fixed point
required environment + data state
probe boundary
mechanisms the probe exercises
mechanisms it substitutes/bypasses
command/tool + material version/config
raw artifact destination
```

A command that cannot reach the condition's falsifier is not a failed product test; it is an invalid or narrower probe.

## 2. Establish controlled starting state

Before execution, identify condition-relevant state: user/account/data fixtures, cookies/session/local storage, cache/queue state, clock/expiry, feature/configuration, dependency stubs, database state and prior side effects. Use isolated/provisioned/reset state only under authorized environment policy.

When two conditions share mutable state, preserve that coupling explicitly. Order-dependent pollution makes the evidence unreliable until the starting state is re-established.

## 3. Synchronize on observable conditions

For asynchronous systems, wait for the condition the claim depends on, not an arbitrary duration. Use the runtime's retry/actionability/await primitives where available. A fixed sleep proves only that time elapsed and can hide both races and unnecessarily slow paths.

For browser conditions, prefer user-visible/accessibility semantics and condition-driven assertions. CSS/DOM structure or framework state is implementation-coupled unless the approved contract exposes it.

## 4. Keep retries as evidence

Automatic retry is a diagnostic mechanism, not an eraser. Preserve failed and successful attempts with candidate/environment binding.

If a condition expected to be deterministic fails then passes, classify the instability before PASS. Determine whether the source is:

- candidate nondeterminism/race;
- stale/shared test state;
- missing synchronization or brittle locator/oracle;
- environment/resource pressure;
- uncontrolled dependency;
- tool/runner defect.

A known probabilistic condition needs a source-backed statistical/repetition rule; do not invent “pass if one retry succeeds.”

## 5. Distinguish candidate failure from probe failure

Before recording a candidate `FAIL`, show that the probe reached the material candidate path with a valid oracle and expected environment/data.

Examples of probe failure that do not directly prove a candidate defect:

- fixture points at a removed/wrong endpoint;
- selector no longer reaches the approved user-visible element because the test is implementation-coupled;
- dependency setup failed before the candidate path ran;
- environment unavailable/misconfigured relative to the condition;
- test data violates the precondition;
- harness crashes or times out outside the behavior being judged.

Preserve the condition as `NOT_RUN` or `INCONCLUSIVE` according to the executed evidence, and repair/revalidate the QA probe through the appropriate owner before rerun.

## 6. Control irrelevant dependencies; exercise material ones

If an external dependency is not part of the condition, use an authorized stable substitute and record the removed proof. If the integration itself is material, at least one representative probe must exercise its real contract/environment at the required assurance level.

Do not let an unrelated third-party widget/service turn a different acceptance condition red. Conversely, do not mock away the exact dependency failure the condition claims to cover.

## 7. Inject the failure at the mechanism that matters

A generic exception is not equivalent to every failure mode. When the condition concerns timeout after commit, duplicate delivery, concurrent writers, crash/restart, stale credential/data, network partition, resource exhaustion or partial backfill, place the perturbation where it reproduces the material ambiguity/failure mechanism.

Keep fault injection bounded, reversible and authorized. Capture both injected condition and observed recovery/postcondition.

## 8. Preserve raw, multi-channel evidence

Capture the smallest raw evidence needed to review the result: command/stdout/stderr/exit, request/response, browser trace/screenshot/console/network, data query, timing distribution, logs or other artifacts. Diagnostic artifacts explain a result but do not automatically become the oracle.

For browser claims spanning visual, interaction, accessibility, hydration or network behavior, admit each channel only for the property it can establish. A screenshot is visual evidence, not keyboard/focus proof.

## 9. Environment and workload authority

A result inherits only the environment/data/workload actually executed. A laptop single-request timing cannot close a production-like P95 NFR; a simulator cannot prove a hardware/provider behavior it replaces; serial requests cannot prove concurrency.

When the exact required environment is unavailable, preserve useful narrower evidence and keep the wider condition non-PASS rather than pretending equivalence.

## 10. Evidence packet for QA admission

After execution record:

1. actual starting state/environment/data;
2. exact command/tool/probe and candidate binding;
3. attempts/retries including failures;
4. raw artifacts;
5. whether the material candidate path and falsifier were reached;
6. substitutions/uncontrolled dependencies;
7. execution validity: `VALID_FOR_CLAIM | VALID_FOR_NARROWER_CLAIM | INVALID_PROBE | ENVIRONMENT_BLOCKED`;
8. bounded observation, without pre-emptively rewriting the QA condition verdict.

`verify-quality` then applies its existing evidence-admission and verdict derivation rules.

## Provenance

Browser synchronization/isolation/user-visible assertion principles are paraphrased/derived from Microsoft Playwright Best Practices `nodejs/docs/best-practices.mdx`, blob `253dad0ea13200c1053fc9ecb220c3bd900cf0d5` (CC BY 4.0), preserved in the frozen Depth Program source pack. General execution/falsifier semantics extend the existing SDLC QA evidence contract; no external mandatory workflow is imported.
