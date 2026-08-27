---
name: qualify-sdlc-capability
description: 'Create, execute, preserve, and review behavioral qualification evidence for an exact reusable capability or revision. Use when qualification itself is the bounded job: freeze representative cases, bind execution/provenance, evaluate explicit invariants, compare a baseline when required, and report truthful evidence strength. Do not redesign the capability or invent runtime/attestation.'
---

# Qualify SDLC Capability

Qualify a falsifiable **Qualification Claim** against evidence that was actually produced for the exact candidate. Keep behavioral qualification, native package validity, capability design, and lifecycle publication separate.

## Operating law

### CRITICAL INVARIANTS

- **Freeze before outcome knowledge can bias the proof.** Bind the exact candidate and Qualification Claim before execution; freeze each Case input before its execution, then freeze the resulting Execution Record before semantic review. Changing claim, candidate, prompt/context, Case, Runner, or preserved output creates a new execution identity for affected claims.
- **Proof never widens itself.** Native/package validity is not behavioral evidence; final output does not prove an unobserved process; candidate quality does not prove comparative uplift; same-session role switching does not prove Independence. Admit each observation only to the Claim Axis and boundary it actually supports.
- **Qualification never mutates its target by implication.** Freeze a demonstrated failure before any redesign. A changed candidate is new bytes/new identity and needs new qualification evidence; automatic Skill discovery never grants redesign, publication, deployment, risk-acceptance, or protected-write authority.

### DECISION RULES

- Structural-only claim -> use native structural/package proof and stop at that claim.
- Behavioral claim -> require an actual Runner before execution evidence can exist.
- Comparative claim -> require the exact Baseline under declared comparable conditions before claiming uplift.
- Process/tool-action claim -> require inspectable trajectory/action evidence for that axis.
- Independent/attested or project-native claim -> prove that evidence obligation separately; do not infer it from ordinary candidate execution.

### HEURISTICS

- Prefer observed failures before synthetic Cases, then add only uncovered material boundaries.
- For non-deterministic behavior, prefer observable semantic Invariants over exact prose matching.
- Keep the qualification record as small as possible **without dropping a required axis, limitation, prerequisite, or re-entry fact**.

## Core terms

- **Qualification Claim** — the bounded proposition the evidence is meant to support. Do not strengthen it after seeing results.
- **Claim Axis** — one independently reviewable dimension of that claim, such as invocation, decision quality, authority, evidence truth, side-effect safety, or domain output. Different axes may end in different Evidence States.
- **Runner** — the actual model/runtime/adapter path that can execute a frozen Case against the exact candidate and expose observable output plus material execution provenance. A script, schema, filename, or available host model is not a Runner by implication.
- **Case** — a frozen decision-relevant input situation plus observable Invariants that could falsify the Qualification Claim.
- **Invariant** — an observable semantic or execution condition used to judge a Case. Prefer invariants over exact prose for non-deterministic outputs.
- **Execution Record** — the frozen Case input, exact artifact/runtime identity, Runner provenance, observable output, material tool/action side effects, and postconditions captured before semantic review.
- **Evidence State** — `PASS | FAIL | NOT_RUN | INCONCLUSIVE` for a required Invariant or Claim Axis. It states what the observed assertion evidence supports.
- **Prerequisite State** — preserve `MISSING` when a required Runner/Baseline/provenance/evidence capability is absent or cannot be identified, and `BLOCKED` when it is identified but execution/evidence production is prevented by authority, policy, provider access, or another explicit gate. This is orthogonal to Evidence State: an affected behavioral axis can remain `NOT_RUN` while its re-entry reason is `MISSING` or `BLOCKED`.

## Qualification control loop

Use this as the executable shape; the numbered sections below define each edge in depth. Do not turn it into a central Skill router or a maturity ladder.

```text
BIND exact candidate + bounded Qualification Claim
  -> CLAIM GATE
     structural-only -> native structural proof -> REPORT
     behavioral -> EVIDENCE-PROFILE GATE
  -> EVIDENCE-PROFILE GATE (before execution)
     comparative? -> bind exact Baseline + comparable conditions
     process claim? -> require trajectory/action capture for that axis
     independent/project-native? -> bind the separate provenance/contract obligation
  -> RUNNER / PREREQUISITE GATE
     required Runner/evidence capability absent -> affected axis NOT_RUN + MISSING -> REPORT / re-entry
     known but gated -> affected axis NOT_RUN + BLOCKED -> REPORT / re-entry
     available but not executed -> affected axis NOT_RUN; invent no missing/blocked reason
     execution proceeds -> freeze Cases -> execute with required observations -> freeze Execution Record
  -> SEMANTIC REVIEW -> per-Invariant / per-axis Evidence States
  -> OBLIGATION CLOSURE
     compare only when exact Baseline evidence exists
     admit process evidence only from captured trajectory/action observations
     admit independent/project-native conclusions only from their bound proof
  -> derive strongest conclusion supported by admitted evidence
  -> contradiction or invalidation?
     yes -> invalidate only dependent conclusions and re-enter at earliest affected truth
     no -> REPORT smallest complete qualification record
```

If execution is not requested, authorized, or possible, the workflow may validly end in a truthful qualification plan/review record with `NOT_RUN`, `MISSING`, `BLOCKED`, or `INCONCLUSIVE` preserved where applicable. Do not manufacture execution merely to force a terminal `PASS`/`FAIL`.

## 1. Bind the claim and exact target

Before designing Cases, establish:

- exact candidate identity/revision and the bounded Qualification Claim;
- required Claim Axes, critical Invariants, and realistic falsifiers;
- the decision this evidence may support;
- whether the claim is candidate-only or comparative;
- whether the claim requires inspectable process evidence, independent/attested assurance, project-native qualification machinery, or protected side effects.

Do not let the candidate assign its own assurance need or redefine the claim after results appear.

If the request is only native Skill/Plugin validity, use the appropriate native validator/package proof and stop at that structural claim. Native validity is not behavioral `PASS`.

**WHEN** the claim requires independent/attested evidence, inspectable process/tool-action evidence, a project-native qualification contract, or several evidence-production dimensions whose interaction can change the conclusion, **READ** [Qualification Method](references/qualification-method.md) **BECAUSE** these are orthogonal evidence obligations rather than a single maturity tier; **RETURN** only the material evidence profile, unsupported axes, and exact re-entry requirement.

## 2. Establish executable evidence

Confirm the actual Runner before treating Cases as behavioral evidence.

- If no reproducible candidate Runner can execute and preserve the required observations, Case design/qualification review may continue, but affected behavioral Claim Axes remain `NOT_RUN`. Preserve why separately: `MISSING` when the required Runner/capability cannot be identified or does not exist; `BLOCKED` when the Runner is known but execution is prevented by an authority/policy/provider gate.
- If the claim says candidate B improves over A, bind the exact **Baseline** — the comparison artifact/revision that will run the same frozen Cases under declared comparable conditions. If the required Baseline cannot execute, candidate-only evidence may remain valid while the comparative claim stays `NOT_RUN` or `INCONCLUSIVE`; preserve the exact Baseline prerequisite as `MISSING` or `BLOCKED` when that distinction is known.
- If a process claim depends on what tools/actions occurred, require inspectable trajectory/tool/action evidence; never infer an unobserved process from final output.

Do not substitute source review, native validation, deterministic fixtures, memory, or an approximate prior revision for execution the claim actually requires.

## 3. Build representative Cases

Prefer observed failures, then add synthetic Cases only for uncovered material boundaries. Pressure the failure surfaces relevant to the claim, for example:

- positive trigger and near-miss/non-trigger;
- missing, conflicting, or stale context;
- authority/ownership and forbidden assumptions;
- provider/tool absence, denial, partial results, or ambiguous side effects;
- recovery/re-entry and completion/evidence truth;
- prior regressions or costly edge conditions.

A Case identifier or rubric label is not an executable input. When behavior is non-deterministic, judge observable Invariants rather than exact wording.

## 4. Freeze execution before semantic review

For every executed candidate or Baseline variant:

1. freeze the Case input and exact artifact/runtime identity;
2. execute without semantic reviewer intervention;
3. preserve the Execution Record before review;
4. record material side effects and postconditions;
5. only then review the output against Invariants.

Do not coach, repair, rewrite, or selectively rerun an output under frozen review. Changing candidate, prompt, context, Case, Runner, or output creates a new execution identity for affected claims.

## 5. Review only what the evidence can support

Assign `PASS | FAIL | NOT_RUN | INCONCLUSIVE` to every required Invariant and Claim Axis. For any axis that cannot advance because a required execution/evidence prerequisite is absent or gated, also preserve the exact `MISSING` or `BLOCKED` prerequisite and its re-entry condition.

One critical forbidden behavior can fail a Case even when other Invariants pass. Missing evidence blocks only the axis that depends on it: absent trajectory need not erase valid final-output evidence, and a passing project/native verifier cannot repair a semantic failure it never inspected.

When evidence invalidates an earlier conclusion, re-enter at the earliest affected truth rather than restarting unrelated evidence.

## 6. Compare only for a comparative claim

Use the exact Baseline, same frozen Cases, and declared comparable conditions. Require the intended improvement without material regression in safety, authority, ownership, or truthfulness.

Candidate quality alone does not prove uplift. Procedurally separated self-comparison may support a bounded directional result, but it is not independent certification. If the claim requires independent/attested assurance, load the advanced evidence method and prove that obligation separately.

## 7. Report evidence without taking lifecycle authority

Report the smallest complete qualification record:

- exact candidate and Baseline identity when applicable;
- Qualification Claim and required Claim Axes;
- actual Runner/provenance and Cases executed versus not run;
- evidence locations/Execution Records when they exist;
- per-Invariant or per-axis Evidence States, critical failures, and material `MISSING`/`BLOCKED` prerequisites with their exact re-entry fact/action;
- comparison result and advanced evidence obligations only when material;
- other evidence limitations not already represented above.

Qualification can state that evidence is sufficient for a later authorized decision. It does not publish, promote, deploy, accept risk, or grant write authority. Before any protected repository/provider/publication/destructive action, verify authority and expected postcondition at that action.

If qualification exposes a capability-design defect, freeze the demonstrated failure before any authorized redesign. Do not mutate the candidate under test and then transfer the old verdict to the new bytes.

## Completion

Complete when every required Claim Axis has an explicit Evidence State, every material missing/blocked prerequisite remains explicit, and the strongest conclusion is no stronger than the observed proof.

Keep `FAIL`, `NOT_RUN`, `INCONCLUSIVE`, missing required Baseline/Runner/provenance, or any advanced evidence obligation unresolved for the affected claim visible. Structural/native validity remains valid only for the structural claim it actually proves.
