# Skill Creation Standard

## 1. Choose the correct artifact before authoring

Classify the need first:

| Need | Correct artifact |
|---|---|
| Independently invokable reasoning or decision workflow | Skill |
| Additional knowledge reused by existing workflows | Shared reference |
| External provider/tool translation | Adapter or integration |
| Exact repeatable transform or validation | Script/tool |
| New lifecycle branch selecting a canonical owner | Router route |
| Project-specific fact, policy, credential, or convention | Target-project artifact/profile |

Reject a proposed skill that only renames an existing branch, wraps one tool call, copies project policy, or adds prose that an existing skill can load conditionally.

## 2. Capability gap

Every proposal must state:

```markdown
## Capability gap
- User/project scenario:
- Current failure or weakness:
- Existing skills/references/adapters considered:
- Why extension or composition is insufficient:
- Expected behavioral improvement:
```

## 3. Ownership

Require:

```markdown
## Owns
## Does not own
## Upstream owners
## Downstream owners
## Human/project approvals
```

Reject duplicate canonical ownership, self-approval, shadow task truth, or a supporting skill that changes Product, BA, Design, Architecture, QA, UAT, or Operations truth.

For supporting composition, declare the bounded result returned to the caller and keep the primary owner active. Do not require a handoff artifact for an in-process supporting call. Reserve persistent/inline handoff artifacts for real owner/authority/session/runtime/persistence boundaries; a control result may name the next owner without transferring authority.

## 4. Invocation and context

The proposal must justify user-invoked versus model-invoked behavior, distinct leading words, router reach, neighbor overlap, context acquisition order, source authority, missing/conflicting/stale context handling, and conditional reference loading.

Do not optimize by line count. Optimize predictable invocation and the smallest sufficient runtime context.

## 5. Bounded capability strength

Every skill declares a **bounded capability claim**: the scenario, decision or artifact improved, excluded responsibilities, and observable difference from the base agent. Strength is depth inside that boundary, not breadth or universality.

Keep **source-designed strength** separate from **observed evidence**:

| Level | Source-designed capability |
|---|---|
| S0 | Alias, topic prompt, or wrapper with no distinct competence; do not promote as a skill. |
| S1 | Repeatable procedure or consistency guard with explicit inputs, outputs, and failure truth. |
| S2 | Bounded judgment capability with a non-obvious mental model, decision variables, trade-offs, correction loops, and artifact quality criteria. |
| S3 | Operational capability that resolves tools/adapters, executes or inspects real outputs, and verifies side effects and failure paths. |
| S4 | Demonstrated adaptive capability with representative with-skill uplift, robust near-miss behavior, and evidence across important context/failure variations. |

These levels describe the claim and design target. An S3 design with behavioral execution `NOT_RUN` remains unproven. Promotion never converts missing observed evidence into strength.

Apply type-specific gates:

- **Router:** owner-selection accuracy, collision resistance, and no domain-work leakage.
- **Orchestrator:** coherent composition, preserved child ownership, and no duplicate truth.
- **Judgment skill:** decision model, ambiguity handling, counterexamples, and correction.
- **Adapter/integration:** live discovery, authorization, idempotency, partial failure, provenance, and output verification.
- **Deterministic tool:** exact I/O, reproducibility, validation, and tested failure behavior.
- **Evidence/verification skill:** fixed candidate, risk coverage, real probes, and truthful verdict.

A narrow skill may be short. A generic checklist without a distinct decision or execution mechanism is S0/S1, not expert capability.

## 6. Workflow, control result, and domain output contracts

Each branch states:

```text
action
→ context/evidence used
→ decision or artifact
→ stop/block/completion criterion
```

Separate three layers:

- **Control result:** shared workflow state, canonical owner/workflow identity, evidence profile/status, blockers, revision binding when relevant, and optional next-owner routing metadata. Use the shared Workflow Result Contract and machine schema; a dedicated handoff artifact is a separate continuation capability.
- **Domain output:** skill-specific semantic identity, source links, maturity/status, assumptions, evidence, affected/superseded artifacts, and next-owner meaning. These requirements belong to the owning skill/reference.
- **Presentation:** user-requested or context-appropriate rendering. Do not make JSON, a fixed Markdown footer, or one global report layout mandatory unless the actual consumer requires that serialization.

A deterministic adapter or provider contract may require a fixed machine format because that format is itself the domain interface. A reasoning/judgment skill should constrain semantic content and completion truth without turning normal user-facing output into a serializer exercise.

## 7. Capabilities and side effects

Skills request abstract capabilities unless provider semantics are the subject. Declare required/optional capabilities, availability checks, side-effect classes, approval, fallback, blocker, and integration-result provenance. Live provider discovery overrides remembered schemas.

## 8. Completion and evaluation

Map all specialized outcomes to `READY | PARTIAL | BLOCKED | FAILED`. Never hide `NOT_RUN`, `INCONCLUSIVE`, fallback, denied approval, failed action, or unverified output.

Create capability-specific behavioral evals with the artifact, including positive trigger, near-miss, context conflict, owner/forbidden assumptions, required domain-output semantics, control-result truth, failure behavior, and representative with-skill/baseline comparison metadata. Test visible formatting only when presentation format is itself part of the capability claim. Generated structural guards prove discovery and contract coverage only; they are not behavioral strength evidence.

## 9. Acceptance

`ASSURED` promotion requires an accepted bounded capability claim, correct artifact type, target source-designed strength, ownership, context/depth review, composition review, capability-specific behavioral evidence appropriate to the claim, package/context-load impact, versioning, and migration notes. A maintainer-selected `SKILL_CREATOR_VALIDATED` profile may promote an eligible prompt-only OpenAI Skill after review plus exact-byte Skill Creator/package and structural gates while behavioral status remains explicitly `NOT_RUN`; this profile cannot support demonstrated-strength, safety, independent-verification, or executable/provider-operation claims. Valid Markdown alone remains insufficient.

## 10. Self-hosted capability maturation

Use this section when an existing SDLC Intelligence Skill/reference/tool/route is being improved from real usage, monitoring, an audit finding, a user correction, or an accepted reusable reasoning principle. Apply the Shared Kernel Semantic Continuity contract to the reusable-system capability truth itself.

### Maturation loop

Treat the current artifact and its bounded capability claim as the continuity subject:

```text
observed failure / monitoring signal / audit finding / accepted reusable principle
-> bind canonical artifact + revision
-> reconstruct expected capability, owner boundary, and falsifier before reading a candidate patch
-> shallow-map neighboring topology only for dependency/overlap/context cost
-> deep-audit exactly one ACTIVE artifact
-> diagnose the smallest root cause
-> choose the smallest justified disposition
-> freeze regression/near-miss cases
-> revise or reclassify through the canonical construction owner
-> challenge source/dependencies and run the required provider validation/evidence gate
-> close, suspend, or block the ACTIVE artifact
-> only then deep-activate another artifact
```

A portfolio scan may prioritize candidates, but it MUST NOT manufacture final dispositions for artifacts that were not individually audited. Material findings discovered while another artifact is ACTIVE are recorded as candidate gaps and remain shallow until activated.

### Diagnose before changing topology

Classify the dominant gap before authoring:

```text
DEPTH_OR_REASONING
CONTEXT_OR_DISCLOSURE
STEERING_OR_COMPLETION
OWNERSHIP_OR_AUTHORITY
COMPOSITION_OR_OVERLAP
ARTIFACT_CLASS
EVIDENCE_OR_PROOF
PORTABILITY_OR_PROVIDER
```

The taxonomy is extensible. The invariant is to fix the nearest real cause rather than treating every failure as evidence that a new Skill is needed.

Choose the smallest defensible disposition for the audited artifact:

- **KEEP** — current owner/class/mechanism remains fit; no material revision is justified.
- **REVISE** — keep identity/class/owner and correct depth, context, steering, completion, or another bounded weakness.
- **MERGE** — consolidate duplicated capability/ownership into one canonical artifact; name consumers, cutover, and removal conditions.
- **RECLASSIFY** — change artifact class when the current class no longer matches the actual capability, including reference-to-Skill or Skill-to-reference when warranted.
- **DEPRECATE** — retire an active artifact through lifecycle authority when it is unsafe, obsolete, or replaced.
- **REMOVE** — remove non-canonical/superseded material only with the required lifecycle and consumer evidence.

A split/extraction is a topology operation, not automatic evidence of maturity. Model the original artifact's resulting disposition plus each extracted candidate independently; each new Skill candidate must pass its own Skill-worthiness, ownership, evaluation, and lifecycle gates.

### Materiality gate for new Skill identity

Do not create or extract a Skill because a domain is important, a reference is long, failures are frequent, or specialization sounds cleaner. A new Skill identity is justified only when the capability must survive routing as an independently closable unit and the existing six-part Skill-worthiness gate passes.

For a reference/branch-to-Skill reclassification, also require inspectable evidence that at least one of these cuts earns its cost under `SKILL-AUTHORING-HEURISTICS.md`:

- **invocation cut** — a distinct leading concept/job should be selected independently and the discovery/cognitive-load cost is justified;
- **sequence cut** — hiding later work materially prevents premature completion or allows an independent correction/closure loop;
- **ownership/proof cut** — the candidate owns a distinct reusable decision/execution boundary with its own falsifier and closure evidence, while remaining inside the ecosystem role model.

If the capability is only conditional knowledge or domain depth consumed by an existing owner, prefer a reference/context pointer. If the failure is local weakness inside a correct owner, prefer `REVISE`. If two artifacts own the same decision/mechanism, prefer consolidation over additional identity.

### Self-hosting and lifecycle boundary

Maturation may discover, audit, challenge, recommend topology change, and materialize an authorized draft. It MUST NOT self-promote or silently rewrite canonical ownership/discovery. Active promotion, deprecation, replacement, migration, and removal remain lifecycle decisions with their own authority/evidence gates.

Source/validator/package success proves the matching structural/source claim only. Preserve behavioral execution as `NOT_RUN` when it did not run, even when the maintainer's selected draft-closure gate intentionally does not require model/network evidence.

