# Evaluation Runtime Receipt Protocol

> Candidate reference. Not active until lifecycle promotion.

Use this protocol when `/qualify-sdlc-capability` receives output from a manual, external,
or provider-specific runtime. A receipt is a provenance envelope; it is not a
semantic PASS and never authorizes promotion.

## 1. Evidence dimensions

Keep these dimensions separate:

```text
integrity       referenced bytes match canonical hashes
execution       a runtime actually produced the output
isolation       process and context separation are declared or attested
review          assertion verdicts cite immutable observed output
independence    reviewer/process claims are separated from trusted attestation
safety          tool side effects and failures are recorded truthfully
lifecycle       promotion remains an explicit lifecycle decision
```

A receipt may be integrity-valid while process/reviewer provenance remains unverified. The generic validator never grants promotion eligibility.

## 2. Workspace and path binding

All receipt paths are POSIX-style paths relative to the validator root. Absolute
paths, empty segments, `.`/`..`, backslashes, symlink escapes, and paths outside
the root are rejected.

Each execution receipt records:

```text
workspace.id
workspace.source_revision_type = GIT_COMMIT
workspace.source_revision
workspace.source_files_must_match_revision
```

The validator confirms the declared commit exists, then reads the plan,
fixture, and every declared context file from that commit and compares those
bytes with the receipt hashes and current inspected bytes. This avoids a
circular clean-worktree requirement: raw output and receipt files may be created
after the source snapshot without changing which source bytes were evaluated.
A missing commit or untracked source input is `BLOCKED`; a source-byte mismatch
is `FAILED`.

## 3. Execution isolation classes

```text
PROCESS_ISOLATED
  Separate runtime process/session with declared context only. Runtime identity,
  session identifier, and enforcement mechanism are inspectable.

CONTEXT_ISOLATED_UNPROVEN_PROCESS
  Declared context is allowlisted and hashed, but process/session separation
  cannot be independently demonstrated.

PROCEDURAL_RESTRICTED
  A runtime followed an allowlist procedure, but the environment could retain
  undeclared context or prior conversation state.

SELF_REVIEWED
  Source author, generator, or reviewer roles overlap. Useful for revision but
  never independent promotion proof.
```

Only `PROCESS_ISOLATED` may declare process separation, and `process_isolation_enforced=true` is valid only for that class. In version 0.3.1 all runtime and reviewer provenance must be labeled `DECLARED_ONLY`; free-text identity or process evidence is not trusted attestation and cannot satisfy an independent-evidence gate.

## 4. Receipt chain

```text
evaluation plan
→ execution receipt for each mode/case
→ immutable raw output
→ anonymized A/B review input
→ frozen blind scores
→ mapping reveal
→ validation report
→ /qualify-sdlc-capability result
→ /manage-skill-lifecycle decision
```

Every link records parent IDs and SHA-256 hashes.

## 5. Canonical hashing

Use SHA-256 over UTF-8 bytes.

For JSON-derived hashes, use canonical JSON:

- object keys sorted lexicographically at every level;
- array order preserved;
- no insignificant whitespace;
- JSON primitives serialized by standard JSON rules;
- one final UTF-8 byte sequence, with no trailing newline.

The validator derives, rather than trusts:

- plan, fixture, context-file, execution-receipt, and raw-output file hashes;
- prompt hash from the exact prompt frozen in the committed plan case;
- frozen-score hash from `blind_scores.payload`;
- mapping hash from `mapping_reveal.mapping`.

## 6. Execution receipt requirements

An execution receipt records:

- workspace, plan, case, skill revision, and mode identities;
- adapter/runtime/model/version/session identity and isolation enforcement;
- fixture path and hash;
- exact context file paths and hashes;
- prompt text and hash, which must match the prompt frozen in the committed plan case;
- raw-output path, hash, byte count, and creation timestamp;
- at least one side-effect record, including explicit `NONE`;
- execution error separately from assertion verdicts;
- generator identity and role;
- `provenance_assurance: DECLARED_ONLY` for this protocol version.

The immutable plan is authoritative for the exact case prompt, fixture path, expected context files, and
forbidden globs. The fixture remains context evidence and is not required to duplicate the prompt. The validator derives the expected context set from
`shared_context` plus the selected candidate/baseline context, requires exact
set equality, scans those paths against forbidden globs, and rejects undeclared
or forbidden context.

Missing required artifacts produce `BLOCKED`; hash mismatch, path escape,
forbidden context, source mismatch, or contradictory isolation claims produce
`FAILED`.

## 7. Review receipt requirements

A review receipt references two validated execution receipts as labels `A` and
`B` and records:

- reviewer identity and role plus `provenance_assurance: DECLARED_ONLY`;
- whether A/B mapping was hidden before score freeze;
- `blind_scores.payload` containing per-dimension assertions, blind verdict,
  meaningful-improvement decision, and material-regression decision;
- `blind_scores.frozen_at` and derived canonical hash;
- `mapping_reveal.mapping`, reveal timestamp, and derived canonical hash;
- final comparison interpretation after reveal.

A review may declare the following independent-comparison conditions:

```text
reviewer identity != every generator identity
mapping_hidden_before_freeze = true
scores_frozen_at < mapping_revealed_at
both execution receipts = PROCESS_ISOLATED with enforcement evidence
plan/case match and modes are distinct
candidate maps to the blind winner
meaningful_improvement = true
material_regression = false
candidate has no critical FAIL, NOT_RUN, or INCONCLUSIVE assertion
```

These conditions support semantic review but do not prove provenance. Until a trusted attestation verifier is implemented and configured, the validator returns `independence_state: DECLARED_UNVERIFIED`, adds a blocking finding, and keeps `promotion_eligible: false`.

## 8. Validation result contract

The tool returns separate fields:

```yaml
integrity_valid: true | false
evidence_state: READY | PARTIAL | BLOCKED | FAILED
semantic_review_state: PASS | FAIL | NOT_RUN | INCONCLUSIVE
independence_state: NOT_CLAIMED | DECLARED_UNVERIFIED | VERIFIED | CONFLICT
promotion_eligible: false
findings: []
```

`integrity_valid=true` means only that the inspected receipt chain is internally
consistent and reproducible. It must not be used as a synonym for semantic PASS
or independent provenance. Promotion remains owned by `/manage-skill-lifecycle`.

## 9. Failure mapping

```text
READY    requested receipt evidence validates at its declared class
PARTIAL  useful valid evidence exists, but an optional bounded element is absent
BLOCKED  required runtime/reviewer/isolation evidence was not produced
FAILED   bytes, path, source, identity, context, timing, mapping, or critical claims conflict
```

Do not repair raw output while reviewing. A rerun creates a new execution
receipt; failed receipts remain provenance.

## 10. Side-effect and ownership boundary

The receipt tool may read files and write only explicit receipt/report paths. It
must not invoke a model, mutate a skill, alter active manifests/routes, promote
lifecycle state, or create project task truth. `/qualify-sdlc-capability` owns acceptance
of evaluation evidence; `/manage-skill-lifecycle` owns promotion.

Diagram and Draw.io scope is excluded.
