---
name: diagnosing-bugs
description: Technical causal diagnosis for hard bugs and performance regressions. Use when the user explicitly asks to diagnose/debug, or when a reported failure has an unknown or disputed cause that needs evidence before implementation. Active production incident command and stabilization belong to `incident-response`; use this Skill for the technical diagnosis in parallel or after stabilization.
---

# Diagnosing Bugs
## Runtime context

- **When deterministic reproduction is unsafe, unavailable, destructive, or unrepresentative, or an intermittent failure needs a non-replay path:** read [Evidence Loop Selection](references/evidence-loop.md) to choose `REPRODUCTION | OBSERVATION | FORENSIC | INSUFFICIENT` evidence without weakening causal proof.
- **When multiple causes remain plausible, the failure crosses components/state/time, instrumentation changes the symptom, a regression predicate is flaky, or performance/concurrency/environment differences must be localized:** read [Causal Localization and Probe Selection](references/causal-localization.md) to build the causal slice, choose a high-discrimination probe, and re-enter when the probe itself invalidates the evidence path.
- Read project-native rules, accepted technical decisions, and actual runtime/tool capability when they are material. Tool availability is not mutation authority; protected production instrumentation or destructive/external actions require their real user/project authority.



A discipline for hard bugs. Skip phases only when explicitly justified.

## Bind the requested terminal outcome

Keep causal diagnosis and source correction on separate axes. Determine the requested terminal outcome from the user's surrounding scope; do not infer fix intent merely because the repository is writable or because the word `debug` appears.

- **`DIAGNOSE_ONLY`** — use when the user asks why, root cause, causal analysis, investigation, or otherwise excludes correction. Own the causal truth only. A supported causal conclusion may complete the job without a source fix or regression-fix ceremony.
- **`DIAGNOSE_AND_FIX`** — use when the user asks to find-and-fix or otherwise requests correction. Preserve diagnosis ownership through the causal gate; enter source correction only after the mechanism is sufficiently supported and the relevant mutation authority exists.

If the cause is already supported before entry and the requested job is only the correction, do not restart broad causal ceremony merely because the work is bug-related. Preserve the existing causal evidence as input and let ordinary implementation or the dominant domain specialist own the known-cause correction.

For unknown-cause find-and-fix work, keep one causal chain from symptom -> supported mechanism -> correction. When the correction becomes materially cross-domain or implementation-complex, use `implement` or domain-specialist depth when available, but do not make a named sibling Skill a completion dependency. If multiple specialists contribute, reconcile their constraints before concurrent writes to shared contracts, schemas, state, or enforcement semantics.

Both terminal modes may require authorized, reversible diagnostic instrumentation while gathering evidence. Temporary diagnostic mutations do not imply permission for a product fix and must be cleaned up or explicitly preserved under real authority before clean completion.

When exploring the codebase, resolve the project-authorized glossary, domain
context, and accepted technical decisions for the failing area. Use
`CONTEXT.md` or an ADR directory only when the project selected those
conventions; do not treat fixed filenames as universal authority.

## Phase 1 — Establish a discriminating evidence loop

**This is the skill.** Everything else consumes this evidence. Prefer a **tight red-capable reproduction** when one is safe and representative, because repeated falsification is the strongest debugging loop. But do not confuse "reproducible command" with "evidence": a live, timing-sensitive, or production-only failure may require observation or forensic evidence instead.

The hard gate is: **no cause-discriminating evidence, no causal claim or causal fix.** You may form provisional hypotheses to decide what evidence to collect, but do not promote correlation or code-reading intuition into root-cause truth.

When replay is unsafe, unavailable, destructive, or unrepresentative, read [Evidence Loop Selection](references/evidence-loop.md) before deciding that diagnosis is blocked. If active production impact is being stabilized, `incident-response` owns command and mitigation; technical diagnosis may proceed in parallel without delaying an obvious authorized stabilization action.

### Prefer a reproduction loop when it is valid

Try these roughly in order when they exercise the real symptom without unacceptable side effects:

1. **Failing test** at whatever seam reaches the bug — unit, integration, e2e.
2. **Curl / HTTP script** against a running dev server.
3. **CLI invocation** with a fixture input, diffing stdout against a known-good snapshot.
4. **Headless browser script** (Playwright / Puppeteer) — drives the UI, asserts on DOM/console/network.
5. **Replay a captured trace** when replay itself is safe and semantically valid.
6. **Throwaway harness** that exercises the relevant path with representative dependencies.
7. **Property / fuzz loop** for input-sensitive or intermittent failures.
8. **Bisection harness** only when a stable predicate can classify the property being searched.
9. **Differential loop** over old/new versions, configs, or environments with the same meaningful input.
10. **HITL loop** as a last resort. If a human action is unavoidable, adapt `scripts/hitl-loop.template.sh` for a user-accessible interactive terminal. Run it directly only when the user can participate in that same session; otherwise provide the adapted script for the user to run and return the machine-readable captured block. Preserve that result as labeled HITL evidence.

### Tighten the evidence

For a reproduction loop, make it faster, sharper, and more deterministic without changing the causal mechanism. For non-reproduction modes, make provenance, time alignment, symptom identity, and the hypothesis-discriminating signal sharper. A fast loop that tests the wrong symptom is worse than a slower representative one.

For nondeterministic bugs, increase reproduction or observation probability when safe: repeat representative workload, control inputs, use race/scheduler tooling, or collect the same discriminating signal across more occurrences. Do not force sleeps, stress, or replay into production merely to manufacture a clean red loop.

### When evidence is insufficient

Say so explicitly. List what was inspected and why it cannot distinguish the live hypotheses. Ask for the smallest missing item: access to a representative environment, a captured artifact (HAR/log/core/trace/crash report), an existing telemetry slice, or authority to consider bounded temporary instrumentation. **No discriminating evidence means `BLOCKED` for root-cause/fix claims, not permission to guess.**

If production instrumentation is proposed, do not execute from tool availability or casual permission alone. Resolve the responsible owner, exact scope/environment, blast radius, data/privacy impact, retention and removal trigger, postcondition verification, rollback/recovery path, and current capability/policy verdict first. Missing authority or recovery keeps the mutation `BLOCKED` or approval-gated according to policy.

### Completion criterion — an evidence path that can falsify

Phase 1 reaches one of two valid outcomes: **(A)** a selected evidence mode can test the reported symptom and separate at least the material hypotheses, or **(B)** current evidence is explicitly classified `INSUFFICIENT` with the missing discriminator named. Outcome B is `BLOCKED` for causal testing/fixing and does **not** authorize Phase 2:

- [ ] **Symptom-bound** — evidence matches the user's actual failure, not a nearby error.
- [ ] **Discriminating** — name the prediction/probe and a result that would weaken or kill the hypothesis.
- [ ] **Representative** — the evidence comes from the relevant path/state; provenance and time/window are explicit for observation/forensic modes.
- [ ] **Repeatable when possible** — a safe reproduction has an executed red-capable command; an observation mode names how the signal can be sampled again; a one-shot forensic artifact keeps its confidence bounded.
- [ ] **Agent-evaluable** — the agent can evaluate the result, or an unavoidable HITL step is labeled rather than silently treated as automated evidence.

Record the baseline symptom and map only the source, callers, contracts, configuration, logs, and runtime entrypoints reached by the selected evidence path. Prefer real source/runtime evidence over summaries, and keep substituted or one-shot evidence bounded to the claim it can actually falsify.

## Phase 2 — Confirm the symptom + minimise the evidence surface

For `REPRODUCTION`, run the loop and watch the actual reported symptom go red. For `OBSERVATION` or `FORENSIC`, verify that the evidence has the right provenance, time/state alignment, and symptom identity; do not fabricate repeatability the artifact does not have.

Then shrink the evidence surface without destroying representativeness. Cut inputs, callers, config, components, time ranges, or candidate boundaries one at a time and re-check what evidence remains load-bearing. In reproduction mode, every retained element should be necessary to keep the symptom red. In observation/forensic mode, every retained element should be necessary to preserve or distinguish the causal signal.

Do not proceed to causal testing until the symptom is confirmed on the selected evidence path and the surface is minimized as far as the available evidence safely allows.

## Phase 3 — Localise and maintain live hypotheses

Do not generate hypotheses to satisfy a numeric quota. Reconstruct the smallest **causal slice** that can carry the reported symptom through the actual execution path: relevant input/state -> decisions and boundaries -> asynchronous/external work -> observed result. Compare bad versus healthy execution, or observed state versus the violated invariant, and find the earliest boundary where they meaningfully diverge.

When the causal slice is non-trivial, read [Causal Localization and Probe Selection](references/causal-localization.md). Use its failure-family distinctions and contrastive cases to decide *where* to look before deciding *what* to blame.

Maintain only **mechanism-distinct** live hypotheses. Each one must state:

```text
mechanism   = what could produce the symptom
prediction  = what should differ if it is true
falsifier   = what result would materially weaken or kill it
coverage    = which observations it explains and which it does not
```

Rank plausibility from inspected system facts and prior evidence, but choose the next probe by how well its possible outcomes **partition the live hypotheses** while remaining representative, safe/reversible, and cheap enough. A likely hypothesis may still be a poor first test when its probe cannot distinguish it from alternatives.

Permit the smallest composite hypothesis only when the evidence is path-dependent or multiple factors are jointly required and no single factor explains all observations. State the interaction prediction explicitly; do not turn every unexplained detail into another cause.

Expose the compact live set to the user when their domain/deployment knowledge can materially re-rank it, but do not create a ceremonial approval checkpoint for ordinary reversible diagnosis.

## Phase 4 — Probe the discriminating boundary

Each probe must map to a prediction and falsifier from Phase 3. **Isolate one causal distinction at a time, not necessarily one variable.** Passive observation, a differential trace/profile, controlled variants, bisection, or a concurrency tool may observe many signals at once when their outcomes separate hypotheses better than a single-variable edit.

Choose the tool from the question being separated:

- **Boundary/value/invariant divergence:** debugger/REPL, structured trace, or targeted logs at the first divergent boundary.
- **Revision regression:** differential old/new evidence or bisection only after the same property can classify revisions meaningfully; a flaky predicate must be tightened/bounded before a culprit claim.
- **Concurrency/timing:** representative repeated workload, race/scheduler tooling, ordering/identity traces, or existing timing evidence. A clean dynamic detector run proves only exercised paths and the defect class it detects.
- **Performance/resource:** establish a representative baseline, split useful service work from queue/wait/blocking/resource pressure, then use the corresponding profiler/trace/plan. Do not optimize a hot-looking function from source when wall time is dominated elsewhere.
- **Environment/config/data-shape:** compare bounded fingerprints or the same meaningful workload across environments; keep revision, configuration, dependency, and data differences separate until evidence collapses them.

Treat instrumentation as an intervention. If a debugger, log, profiler, stress mode, sleep, or replay makes the symptom disappear or changes its failure signature, do **not** call that a fix. Record the perturbation and re-enter Phase 1/2 with a lower-perturbation evidence path or a narrower claim.

Never "log everything and grep". A probe without named alternative outcomes is observation volume, not diagnosis.

**Tag temporary debug instrumentation** with a unique prefix, e.g. `[DEBUG-a4f2]`, when the project/runtime supports that cleanup mechanism. Do not mutate protected production telemetry merely because a local convention exists.

## Phase 5 — Conditional correction + regression proof

Enter this phase only for `DIAGNOSE_AND_FIX`, after cause-discriminating evidence supports the correction strongly enough to act and the relevant repository/user authority covers the mutation. For `DIAGNOSE_ONLY`, skip source correction and proceed to shared cleanup + causal closure in Phase 6. Do not convert tool availability, a writable repository, or successful diagnosis into fix authorization.

Before writing a regression test, source fix, cleanup, or source-control state, confirm the repository/user authority that covers that mutation. Ordinary source changes inside an already-authorized coding scope need no Plugin-side operation record; production instrumentation, destructive external changes, deployment, credential/identity mutation, or other protected effects still require their real authority and recovery boundary.

Write the regression test **before the fix** — but only if there is a **correct seam** for it.

A correct seam is one where the test exercises the **real bug pattern** as it occurs at the call site. If the only available seam is too shallow (single-caller test when the bug needs multiple callers, unit test that can't replicate the chain that triggered the bug), a regression test there gives false confidence.

**If no correct seam exists, that itself is the finding.** Note it. The codebase architecture is preventing the bug from being locked down. Flag this for the next phase.

If a correct seam exists:

1. Turn the minimized causal mechanism into a failing regression test at that seam. For a non-replay production bug, encode the proven mechanism or a safe fault-injection condition rather than pretending the test reproduces the exact production event.
2. Watch it fail for the intended causal reason.
3. Apply the fix.
4. Watch it pass.
5. Re-evaluate the original Phase 1 evidence path: rerun the original scenario when reproducible, or re-observe the agreed discriminating signal when replay is unsafe/unavailable.

## Phase 6 — Shared cleanup + causal closure

Required for both terminal modes before declaring clean completion:

- [ ] All `[DEBUG-...]` instrumentation is removed/reverted and the cleanup is verified, or explicitly preserved under real authority with its owner, scope, and removal trigger
- [ ] Throwaway prototypes are deleted or moved to a clearly-marked debug location when preservation is intentional
- [ ] The causal conclusion names the surviving/winning mechanism, important falsifying probes or counter-evidence, affected owner/invariant, supporting evidence, and confidence limit; if material alternatives remain observationally equivalent, keep them live rather than manufacturing a root cause
- [ ] Evidence mode, unverified environments, and the smallest missing discriminator are stated when they bound the claim

### Close `DIAGNOSE_ONLY`

Do not write a causal product fix solely to complete diagnosis. Report the strongest supported causal truth and the cleanup state, then stop.

- `READY` is valid when the requested causal explanation/investigation is complete at its stated evidence strength, even though the product behavior was not changed.
- Use `PARTIAL` or `BLOCKED` when material causes cannot yet be discriminated or required evidence/authority is missing.
- Never claim that the user-visible behavior is fixed, regression-protected, QA-approved, or release-ready merely because diagnosis completed.

### Close `DIAGNOSE_AND_FIX`

Before declaring the causal correction complete:

- [ ] Original evidence path is re-evaluated: the exact repro is green when reproducible, or the agreed post-fix observation no longer shows the causal condition at the evidence-appropriate scope/window; if neither can be checked, keep that proof gap explicit
- [ ] Regression test passes, or absence of a correct regression seam is documented without converting a shallow test into proof
- [ ] The affected user-visible or machine-consumed output is inspected in the relevant state/environment
- [ ] Related callers and the affected integration/runtime path are rerun at a scope proportionate to blast radius
- [ ] Error behavior, logs, manifests, or data invariants are checked when they are part of the symptom
- [ ] When a commit / PR is created, it states the supported causal conclusion at the same confidence level as the evidence so the next debugger does not inherit false certainty

End with `READY`, `PARTIAL`, `BLOCKED`, or `FAILED`. Name the evidence mode, red/green command when one exists, original-path rerun or post-fix observation, output inspected, unverified environments, and known risk. A green minimized regression alone is not proof that the user's original path is fixed. Developer/debug closure proves only the causal correction at the exercised evidence scope; it does not manufacture an independent QA or release verdict.

After an actual correction, ask what would have prevented the bug. If the answer involves architectural change (no good test seam, tangled callers, hidden coupling), record the observed friction, current seam, likely better seam, migration risk, and proof target; use `improve-codebase-architecture` when a separate architecture-improvement decision is actually requested or material. Make that recommendation after the correction path is understood, not as a prerequisite for causal diagnosis.
