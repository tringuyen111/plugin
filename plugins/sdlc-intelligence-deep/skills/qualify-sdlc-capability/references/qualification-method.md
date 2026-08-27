# Qualification Method — Advanced Evidence Dimensions

Load this reference only when Independence, process/trajectory evidence, a Project Qualification Contract, or interacting evidence-production dimensions can change the supported conclusion. The universal Case -> Execution Record -> Invariant review lifecycle remains in `SKILL.md`; do not repeat it here.

## Evidence profile — orthogonal dimensions, not a tier ladder

Resolve only the dimensions material to the Qualification Claim:

| Dimension | Material question | Claim consequence |
| --- | --- | --- |
| Runner availability | Can the exact candidate, and the exact Baseline when required, actually execute the frozen Cases with preservable observations? | Controls which behavioral axes can move beyond `NOT_RUN` |
| Comparison obligation | Is the claim candidate-only or comparative? | A missing required Baseline blocks the comparative conclusion, not unrelated candidate-only evidence |
| Process evidence | Is final output enough, or does the claim depend on observable tool/action trajectory? | Missing trajectory blocks only the process-dependent axis |
| Project Qualification Contract | Does the current project require exact schemas, verifiers, probes, evidence destinations, or policy for this claim? | Controls project-native admissibility; it does not create stronger behavioral evidence by itself |
| Independence | Does the claim require independent/attested provenance and review separation? | Controls whether an independent/attested conclusion is supportable |
| Assertion result | What does the actual evidence say for each Invariant/Claim Axis? | `PASS | FAIL | NOT_RUN | INCONCLUSIVE` remains axis-specific |

For any dimension that cannot produce required evidence, preserve the reason separately from the assertion result: `MISSING` means the required capability/evidence identity is absent or not identifiable; `BLOCKED` means it is known but an authority/policy/provider gate prevents use. The dependent Claim Axis may still be `NOT_RUN` or `INCONCLUSIVE`.

A stronger-looking value on one dimension never upgrades another. In particular:

- project-machine validation cannot turn an unexecuted behavioral axis into `PASS`;
- candidate + Baseline execution does not prove Independence;
- independent review cannot replace a missing required Baseline;
- missing process evidence does not erase independently observed final-output evidence.

Return from this reference with the material dimensions only: their observed state, which Claim Axes they affect, any explicit `MISSING`/`BLOCKED` prerequisite, the strongest conclusion still supportable, and the exact fact/action needed to re-enter.

## Process evidence

Use process/trajectory evidence only when the Qualification Claim depends on *how* execution occurred: tool choice, forbidden provider use, state transition, side-effect sequence, retry behavior, or another observable path property.

Require inspectable tool/action/state-transition evidence. Never request private chain-of-thought and never infer an unobserved process property from a plausible final answer.

## Independence

**Independence** means provenance and review separation sufficient for the specific independent/attested claim. Same-session role switching, timestamps, copied receipts, or frozen outputs alone do not establish it.

For an Independence claim, bind the provenance that matters: who/what executed, exact artifact/context, how Execution Records were preserved, and what review boundary makes the evaluator independent for the bounded claim. If that boundary is not proven, preserve other evidence and mark only the independence-dependent conclusion unsupported.

## Project Qualification Contract

A **Project Qualification Contract** is the current project-specific policy and machine surface governing qualification: authoritative suite/report schemas, verifiers, probes, evidence destinations, and authorization rules that the requested claim actually depends on.

When required:

1. inspect current project instructions and qualification source;
2. bind the exact active schemas/verifiers/probes/destinations/policy;
3. run only obligations material to the Qualification Claim;
4. preserve project-machine results beside semantic Invariant review;
5. keep missing or failed project dependencies as blockers only for claims that require them.

A project path, old execution map, remembered convention, or schema file by itself does not prove that contract is active. Project-native machine PASS proves only the predicates that machine check actually inspected.

## Contrastive SHOW cases

### Native-valid but behavior unexecuted

An exact Skill passes Skill Creator validation and packages successfully, but no Runner executes the frozen behavioral Cases.

- Structural/native claim: may be `PASS` on exact bytes.
- Behavioral Claim Axes: `NOT_RUN`.
- Wrong move: call behavior qualified because packaging is valid.

### Comparative project evidence without Independence

Exact candidate B and Baseline A execute the same frozen Cases through an observed Runner, and the current project verifier accepts both evidence records. The author then reviews both outputs in the same uncontrolled session.

- Comparative execution: available.
- Project Qualification Contract: may be satisfied for the predicates it owns.
- Directional comparison: may be reviewable.
- Independence: not proven.
- Wrong move: collapse these facts into “canonical/independent PASS.”

### Final output observed, required process evidence missing

The frozen final output satisfies its domain Invariants, but the claim also says the Agent never invoked a forbidden provider and no inspectable trajectory was preserved.

- Domain-output axis: reviewable from observed output.
- Forbidden-provider/process axis: `NOT_RUN` or `INCONCLUSIVE` according to available evidence.
- Wrong move: erase the valid output evidence or infer the missing process fact from the answer.

## Re-entry

Re-enter at the earliest invalidated truth and preserve unaffected evidence:

`claim/binding -> material evidence dimension -> Cases -> Execution Records -> semantic review -> required comparison -> advanced project/Independence conclusion -> later lifecycle decision`.
