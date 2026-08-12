# Behavioral Evaluation Contract

Use this contract when `/qualify-sdlc-capability` needs reusable behavioral cases or persisted execution/review evidence.

This contract defines **evaluation semantics and evidence persistence**, not a provider/model runner and not a required user-facing response format. The current native Codex plugin ships no model credential, provider adapter, or independent-attestation implementation.

Machine contracts:

- [Behavioral Evaluation Suite schema](../../../architecture/runtime/evaluation/behavioral-eval-suite.schema.json)
- [Behavioral Evaluation Report schema](../../../architecture/runtime/evaluation/behavioral-eval-report.schema.json)
- [Behavioral Evaluation Evidence verifier](../../../scripts/verify_behavioral_eval_evidence.py)

The canonical evidence-profile and assurance rules remain in [Sandbox-Native Evaluation Policy](SANDBOX-EVALUATION-POLICY.md). Do not duplicate or override its lifecycle/profile truth here.

## 1. Suite semantics

Freeze the suite **before revision-sensitive execution**. Bind it to the exact artifact identity/revision and one bounded capability claim.

Each case records:

- a stable case ID and behavioral class;
- the semantic prompt plus declared context/capability assumptions needed to reproduce the case;
- invariant statements that describe what must remain true;
- whether each invariant is critical;
- forbidden behavior when a negative boundary matters.

Write invariants as semantic criteria, not exact prose snapshots. Exact wording/format is an invariant only when presentation serialization is itself part of the capability claim.

Use case classes to cover positive trigger, near miss, missing/conflicting/stale context, owner/provider boundaries, approval/side effects, failure/completion, regressions, and comparison needs. A suite may contain only the classes material to the bounded capability; the enum is coverage vocabulary, not a checklist quota.

When comparison is required, declare `WITHOUT_SKILL` or `PREVIOUS_REVISION` as the baseline kind. For `PREVIOUS_REVISION`, bind `comparison.baseline_revision` to the exact prior artifact revision before execution and require it to differ from the candidate revision. `NONE` and `WITHOUT_SKILL` must not carry a baseline revision. Do not invent or change a baseline after seeing candidate output.

## 2. Execution adapter boundary

A host/runtime adapter may consume one frozen suite case and emit raw output plus execution identity. An adapter implementation is **not bundled by this contract** and must not be claimed available until a real runtime primitive is inspectable and executable.

A persisted report must first record the qualifier's actual execution environment: `RUNTIME_ADVISORY`, `SANDBOX_EXECUTABLE`, or `CANONICAL_SOURCE_QUALIFICATION`.

When the environment is `RUNTIME_ADVISORY`, no model execution path exists for the required behavior. Persist `evidence_profile: null` and `runtime: null`, keep candidate/baseline execution and semantic-review states `NOT_RUN`, keep `ASSURED` promotion through this behavioral-evidence path blocked, and name the blocker. An eligible lifecycle-level `SKILL_CREATOR_VALIDATED` prompt-only profile is a separate package-acceptance decision and does not convert this report to PASS. `null` means **no evidence profile was produced**; it is not a new profile named `NONE` or `NOT_RUN`.

When an executable environment exists, use a non-null evidence profile permitted by the active Sandbox Evaluation Policy and preserve concrete runtime/model/adapter identity. An executable adapter must preserve:

```text
suite_id + case_id + candidate artifact revision
exact previous revision when baseline_kind = PREVIOUS_REVISION
candidate | baseline variant
execution environment + evidence profile
host/runtime/model/adapter identity
exact prompt and declared context used
raw output bytes or execution error
material tool/side-effect observations
```

The adapter does not score, repair, normalize, or rewrite model output. Candidate and baseline execution must not silently share mutable state that changes the comparison semantics.

No contract file or synthetic fixture proves a provider/runtime is available.

## 3. Frozen raw evidence

Store raw output separately from the review report. The report references it by a safe path relative to an explicitly approved evidence root plus lowercase SHA-256.

Never:

- accept absolute or parent-traversal evidence paths;
- replace a failing raw output in place after review begins;
- recalculate a hash and call changed bytes the same execution;
- treat a synthetic validator fixture as model behavior.

A rerun is a new execution record or evaluation identity.

## 4. Human semantic review rubric

Review frozen output against the suite invariants. Do not improve the answer while scoring it.

For each invariant use:

```text
PASS | FAIL | INCONCLUSIVE | NOT_RUN
```

Judge only dimensions material to the case, commonly:

- decision quality and correctness;
- canonical ownership/non-ownership;
- evidence and assumption truthfulness;
- completion/blocker truth;
- side-effect/approval safety;
- required domain-output semantics.

A polished or longer response is not automatically better. A critical forbidden behavior fails the relevant invariant even when the rest of the answer is useful. Missing evidence that prevents a verdict is `INCONCLUSIVE` or `NOT_RUN`, not PASS.

The report records review rationale for inspectability, but rationale style is not standardized prose.

## 5. Comparison semantics

Follow Sandbox-Native Evaluation Policy for evidence profiles and assurance tiers.

For sandbox procedural comparison:

- candidate and baseline raw outputs must both exist and remain hash-bound;
- review the same declared invariants;
- `DIRECTIONAL_PASS` requires meaningful intended improvement and no material regression in safety, ownership, or truthfulness;
- it is not independent superiority.

`ATTESTED_INDEPENDENT` remains unavailable while active policy marks its provenance contracts unavailable. This contract must not activate ER candidate protocols.

## 6. Deterministic verifier boundary

Run:

```text
python -B scripts/verify_behavioral_eval_evidence.py \
  --suite <suite.json> \
  --report <report.json> \
  --evidence-root <approved-evidence-directory>
```

The verifier checks machine/evidence integrity such as:

- suite/report identity and revision binding;
- unique/resolvable case and invariant IDs;
- safe raw-output paths and SHA-256 matches;
- execution-before-review consistency;
- candidate/baseline presence when comparison requires it;
- sandbox evidence cannot claim independent provenance;
- critical candidate failures cannot coexist with a passing/eligible aggregate claim.

The verifier **does not read raw text to decide whether model reasoning is correct**. Semantic scoring remains owned by qualification review. A verifier PASS proves evidence-package consistency only.

## 7. Completion and lifecycle boundary

Keep these axes separate:

```text
evidence profile
evaluation status
workflow state
promotion gate
lifecycle promotion state
```

A structurally valid suite/report with no representative model execution is still behavioral `NOT_RUN`. That fact blocks `ASSURED` promotion when behavioral evidence is required; it does not by itself invalidate a separately selected eligible `SKILL_CREATOR_VALIDATED` prompt-only package profile. In a `RUNTIME_ADVISORY` report, null profile/runtime plus all-`NOT_RUN` execution/review state are the truthful machine representation of that absence; deterministic validation of those fields is not behavioral evidence. Qualification can make evidence eligible for lifecycle review; only `/manage-skill-lifecycle` owns active promotion/publication.
