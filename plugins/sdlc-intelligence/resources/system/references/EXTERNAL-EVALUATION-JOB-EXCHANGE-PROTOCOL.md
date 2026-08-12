# External Evaluation Job Exchange Protocol

> Candidate reference `candidate.4`. Not active until lifecycle promotion.

ER-03 prepares and verifies filesystem exchange artifacts for an external evaluation runtime. It does not invoke a model, hold provider credentials, sign attestations, score semantics, or authorize promotion.

## 1. Ownership

```text
/qualify-sdlc-capability
→ prepares sealed jobs
→ verifies imported result bytes and bindings
→ assembles ER-01 receipt inputs
→ hands verified evidence to ER-02 and lifecycle

external adapter/runtime
→ executes only the declared job
→ writes raw output and declared execution metadata
→ may produce policy-authorized signatures outside this repository

/manage-skill-lifecycle
→ decides whether verified evidence changes artifact lifecycle
```

Prepared jobs are operational artifacts, not execution evidence. Imported unsigned results remain declared evidence. Only ER-02 may classify signed provenance as trusted.

## 2. Job stages

```text
GENERATE
→ one candidate or baseline context
→ one prompt and fixture
→ raw model output + execution metadata

REVIEW_BLIND
→ anonymized outputs A and B
→ rubric and case evidence
→ frozen blind scores
→ no A/B mapping

REVIEW_FINALIZE
→ frozen score payload and hash
→ mapping reveal after freeze
→ final ER-01 review receipt and optional ER-02 review attestation
```

Candidate and baseline generation are separate jobs. The review package contains neither candidate/baseline source labels nor coordinator mapping. `REVIEW_FINALIZE` may reveal mapping only after a previously imported frozen-score artifact is verified.

## 3. Directory contract

Every dispatched job is a directory containing only:

```text
JOB.json
INPUT-MANIFEST.json
inputs/**
SEAL.json
```

`INPUT-MANIFEST.json` follows the closed package-manifest schema. Entries are sorted by `package_path` and bind role, bytes, SHA-256, and one source class: `GIT_BLOB`, `RUNTIME_HASH`, `ACCEPTED_RESULT`, or `COORDINATOR_DERIVED`. For `GIT_BLOB`, the coordinator reads exact bytes using the job's Git commit and `git_path`; copied bytes must match.

### Plan-derived context authority

For execution-plan schema version 1, the Git-bound plan is the canonical owner of the selected case, prompt, fixture, candidate/baseline revision, and context split. The coordinator may materialize the inline prompt, but package verification recomputes the expected prompt bytes from the selected plan case. `GENERATE` input paths must equal the plan-derived set exactly: `shared_context + candidate_context` for `CANDIDATE`/`WITH_SKILL`, or `shared_context + baseline_context` for `BASELINE`/`WITHOUT_SKILL`. A descriptor `context_policy` may narrow access but cannot add, remove, or substitute plan-owned context. Review stages require the same plan case and the plan's independent-review/post-freeze mapping controls.

`tree_sha256` is SHA-256 of SDLC canonical JSON v1 over the sorted manifest entry array. Descriptor and manifest JSON files are emitted as canonical JSON v1 UTF-8 bytes with no trailing newline. `SEAL.json` follows the closed seal schema and binds those exact descriptor bytes, exact manifest bytes, and `tree_sha256`. The package seal hash used by parents/ledger is SHA-256 of exact `SEAL.json` bytes. Extra files, missing files, symlinks, non-regular files, path escapes, duplicate paths, absolute paths, excessive depth/count/total bytes, and per-file limit violations fail closed.

Coordinator-only state, including A/B mapping, lives outside every dispatched job directory and is never copied into `inputs/**`.

## 4. Job binding

Every job binds:

- exchange/job IDs and stage;
- workspace ID and exact Git commit;
- plan ID/path/hash and case ID;
- evaluation mode and skill revision;
- adapter contract ID and required capability;
- prompt/fixture/context file hashes;
- expected result schema and maximum output bytes;
- ER-01 receipt mode and ER-02 attestation requirement;
- creation/expiry timestamps and a coordinator nonce;
- parent job/result hashes for review stages.

All source-controlled input bytes must match the declared Git commit. Runtime-only case inputs must be hash-bound in the manifest.

## 5. Result contract

Every imported result directory contains only:

```text
RESULT.json
RESULT-MANIFEST.json
artifacts/**
SEAL.json
```

The result binds the exact job seal and job ID. `RESULT-MANIFEST.json` lists every artifact. `RESULT.json` declares adapter/runtime/model/session/process identity, completion state, timing, side effects, and artifact roles.

For a `COMPLETED` `GENERATE`, artifacts include exact raw output and an ER-01 execution receipt. For a completed `REVIEW_BLIND`, artifacts include frozen scores and optional raw review notes; mapping fields are forbidden. For a completed `REVIEW_FINALIZE`, artifacts include an ER-01 review receipt whose frozen-score hash matches the imported blind result, plus optional ER-02 attestation.

For `ERROR`, `TIMED_OUT`, or `NOT_RUN`, completed-evidence roles are forbidden. The result contains exactly one stage-appropriate diagnostic artifact and a non-empty error/reason. Such a package may be integrity-valid but returns `BLOCKED`; it never becomes ER-01 evidence.

The coordinator validates imported artifacts but never repairs or normalizes raw output.

## 6. Blind mapping

The coordinator creates one closed-schema mapping record outside dispatched packages. Production mapping uses cryptographic randomness for both A/B selection and a 32-byte commitment salt. Tests may inject a deterministic seed only when the committed mapping record sets `test_control=true`; that field is included in the mapping commitment payload so test evidence cannot later masquerade as production randomness.

Before `REVIEW_BLIND` dispatch, the coordinator computes `mapping_commitment_sha256 = SHA-256(canonical JSON v1(mapping record with the top-level mapping_commitment_sha256 field omitted))`. The payload therefore includes exchange/case/mapping IDs, the secret salt, A/B mapping, exact candidate/baseline result references, and creation time. The ledger records `MAPPING_COMMITTED`; the blind job receives only the commitment hash. `REVIEW_FINALIZE` receives the mapping record and salt after a frozen-score result is accepted. Reveal bytes must reproduce the prior commitment.

```text
review package created
→ outputs copied as A/B according to hidden mapping
→ reviewer freezes score payload and hash
→ blind result imported and sealed
→ coordinator creates REVIEW_FINALIZE job with frozen scores + mapping
→ reviewer may attest final receipt without changing frozen scores
```

A mapping present in a `GENERATE` or `REVIEW_BLIND` package is a critical failure. A final receipt whose frozen-score hash differs from the blind result is a critical failure.

## 7. Import and replay safety

The coordinator maintains a fixed-path workspace-local append-only exchange ledger using the closed exchange-ledger schema. Each entry binds sequence, event, stage, artifact ID/hash, prior head, and entry hash. `entry_sha256 = SHA-256(canonical JSON v1(entry with the top-level entry_sha256 field omitted))`. The empty-ledger head is 64 lowercase zeroes; every later `previous_head_sha256` equals the prior entry hash and `head_sha256` equals the final entry hash. Legal transitions are:

```text
GENERATE JOB_PREPARED → GENERATE RESULT_ACCEPTED
both generation results accepted → MAPPING_COMMITTED
MAPPING_COMMITTED → REVIEW_BLIND JOB_PREPARED/REVIEW_DISPATCHED
REVIEW_BLIND RESULT_ACCEPTED → MAPPING_REVEALED
MAPPING_REVEALED → REVIEW_FINALIZE JOB_PREPARED
REVIEW_FINALIZE RESULT_ACCEPTED → CHAIN_READY
```

Duplicate job/result seals, job IDs, coordinator nonces, mappings, or invalid stage transitions fail closed. Existing-ledger mutation requires an out-of-band expected head supplied separately from mutable operation config.

The coordinator exchange root and accepted-result storage must be canonical relative paths inside the Git repository passed to ER-01; this lets imported raw output and receipts be referenced and revalidated under the same repository root. Writable paths must be canonical relative paths under that approved exchange root. Symlinked parents or targets are forbidden. Imports use descriptor/inode checks, bounded reads, same-directory temporary files, atomic rename, and post-write revalidation. External archives are not extracted by the core coordinator; callers must provide an already materialized directory whose contents pass the exact allowlist.

## 8. Adapter boundary

An adapter declares capabilities, not trust:

```yaml
adapter_id:
transport: FILE_EXCHANGE | PROVIDER_API | LOCAL_PROCESS | CI_WORKER
capabilities:
  - evaluation.generate
  - evaluation.review_blind
  - evaluation.review_finalize
credential_owner:
side_effect_class:
```

The live adapter contract wins over documentation. Missing capability/auth returns `BLOCKED`. Adapter strings, process IDs, separate folders, or subprocesses do not prove independence. Trusted provenance requires ER-02 policy and attestations.

## 9. Result axes

```yaml
job_integrity: READY | BLOCKED | FAILED
result_integrity: READY | BLOCKED | FAILED | NOT_RUN
execution_state: COMPLETED | ERROR | TIMED_OUT | NOT_RUN
blind_review_state: PASS | FAIL | INCONCLUSIVE | NOT_RUN
trusted_provenance: VERIFIED | DECLARED_UNVERIFIED | CONFLICT | NOT_CLAIMED
lifecycle_review_ready: true | false
promotion_authorized: false
findings: []
```

`promotion_authorized` is always false. Job preparation returns `READY_FOR_DISPATCH`, not `PASS`. A valid imported result may still remain `BLOCKED` for missing attestation, semantic review, authority, or external runtime independence.

## 10. Failure mapping

```text
READY   exact package/result bytes and stage bindings verify
PARTIAL valid bounded subset exists; optional evidence is absent
BLOCKED required runtime, capability, result, attestation, or authority is absent
FAILED  path, hash, leakage, binding, replay, stage, freeze, or mutation conflict
```

## 11. Traceability boundary

ER-03 may prepare jobs for `traceability@0.3.0-p1-revision-1`. The job kit must preserve active `traceability@0.3.0` as baseline and candidate revision as separate allowlisted context. No prepared or imported job changes active skill discovery. Traceability promotion remains blocked until genuine external generation, blind review, trusted attestation, and lifecycle evidence exist.

## 13. Schema set and runtime checks

The candidate schema set is closed and includes job, result, package manifest, package seal, mapping record, and exchange ledger. Dependency-free runtime validation must additionally enforce constraints JSON Schema cannot express reliably here: unique/sorted paths and roles, exact stage role sets, semantic timestamp order, mapping A/B opposition, legal ledger transitions, canonical hashes, Git blob equality, allowed/forbidden roots, and immutable accepted-result materialization.
