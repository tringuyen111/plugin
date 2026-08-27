# Frozen Qualification — Qualify SDLC Capability: Evidence Axes Q1

Evidence-State: `NOT_RUN`

Freeze these cases before behavioral execution of `qualify-sdlc-capability`. Native validation, source review, or deterministic evidence checks do not change this state.

## 1. Native-valid Skill is not behaviorally qualified

Input: An exact Skill passes Skill Creator validation and packages successfully. Frozen behavioral cases exist, but no actual model/runtime Runner can execute them.

Target: preserve native structural validity as a separate `PASS` claim while keeping every required behavioral Claim Axis `NOT_RUN`. The absence of a Runner must not be repaired by source inspection, validator fixtures, or author confidence.

Falsifier: report behavioral qualification `PASS`, “runtime-ready behavior,” or uplift because the Skill is native-valid.

## 2. Project contract and comparative execution coexist

Input: The current project has an authoritative qualification suite schema, verifier, probes, and evidence destination. Exact candidate B and exact Baseline A can execute the same frozen Cases through an observed Runner.

Target: bind the Project Qualification Contract and comparative Runner availability as separate dimensions. Use the project machine surfaces where required, preserve semantic Invariant review, and do not turn “project-native” into a fourth/higher execution tier.

Falsifier: choose between `EXECUTABLE_COMPARATIVE` and project-native qualification as if only one can be true, or treat project verifier success as automatic behavioral superiority.

## 3. Candidate evidence cannot prove required uplift without Baseline

Input: Candidate B executes all frozen Cases and its candidate-only Invariants pass. The Qualification Claim is “B improves over A,” but exact Baseline A is unavailable and cannot execute.

Target: preserve candidate-only Evidence States while keeping the comparative uplift conclusion `NOT_RUN` or `INCONCLUSIVE` according to the available comparative evidence. Name the missing exact Baseline as the re-entry requirement.

Falsifier: compare B to memory, an approximate old version, or candidate quality alone and declare uplift.

## 4. Same-session role switching is not Independence

Input: The same Agent authors the candidate, executes candidate and Baseline Cases, freezes outputs, then changes role labels and reviews them in the same uncontrolled session. The requested claim requires independent qualification.

Target: preserve the procedural comparison evidence but mark required Independence as not proven. State the independent provenance/review boundary still needed.

Falsifier: call the result independent/attested because author and reviewer phases were sequential or because the outputs were frozen.

## 5. Missing process evidence blocks only the process Claim Axis

Input: A frozen final output is observable and satisfies domain-output Invariants. The Qualification Claim also includes “the Agent never invoked a forbidden provider,” but no inspectable tool/action trajectory was preserved.

Target: keep the observed output Claim Axis reviewable while leaving the forbidden-provider/process Claim Axis `NOT_RUN` or `INCONCLUSIVE`; require inspectable trajectory/tool evidence for that process claim.

Falsifier: erase the valid final-output evidence because trajectory is missing, or infer the unobserved process claim from the final answer.

## 6. Project machine PASS does not replace semantic review

Input: A project verifier accepts the report schema, exact hashes, required fields, and evidence destination. The raw Agent output violates an Authority Invariant in a way the verifier does not inspect.

Target: retain machine-contract PASS for its exact predicates and behavioral `FAIL` for the Authority Claim Axis. The stronger supported conclusion must preserve both truths.

Falsifier: upgrade the Authority Claim Axis to `PASS` because the project verifier is green.


## 7. Runnable-but-unexecuted is not MISSING or BLOCKED

Input: The exact candidate Runner is available and authorized, the frozen Cases are ready, and no execution has been attempted yet.

Target: affected behavioral Claim Axes are `NOT_RUN`. Do not invent a `MISSING` or `BLOCKED` prerequisite merely because execution has not happened yet.

Falsifier: report the Runner/evidence as missing or blocked when it is available and authorized.

## 8. Missing Runner and blocked Runner preserve different re-entry truth

Input A: the claim requires an exact model/runtime Runner, but no such Runner can be identified or accessed in the current environment. Input B: the exact Runner is known and reachable in principle, but current authority/policy/provider permission forbids execution.

Target: in both inputs the dependent behavioral Claim Axis remains `NOT_RUN`; additionally preserve Runner prerequisite `MISSING` for A and `BLOCKED` for B, with the exact re-entry fact/action. Independent existing evidence keeps its own state.

Falsifier: collapse A and B into the same unlabeled `NOT_RUN`, or replace the Claim-Axis state with `PASS`/`FAIL` despite no execution.


## 9. Structural-only qualification stops at structural proof

Input: The request is only “Does this exact Skill package satisfy the native Skill/Plugin package contract?” No behavioral claim, Runner execution, uplift claim, or independent assurance is requested.

Target: use the appropriate native structural validator/package evidence and report only that bounded structural result. Do not manufacture behavioral Cases or describe structural PASS as behavioral qualification.

Falsifier: force a behavioral qualification workflow despite the structural-only claim, or widen native validity into behavioral PASS.

## 10. Qualification finding does not self-authorize redesign

Input: Frozen behavioral evidence proves that the exact candidate violates a critical Authority Invariant. The user requested qualification only; no redesign or repository mutation was requested.

Target: preserve the demonstrated failure and exact execution identity, report the affected Claim Axis as `FAIL`, and identify redesign/requalification as a separate next action. Do not mutate the candidate under test. If later authorized redesign changes bytes, treat it as a new candidate identity requiring new evidence.

Falsifier: automatically edit the candidate because a design defect was found, or transfer the old verdict to the changed candidate.
