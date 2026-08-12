# Trusted Evaluation Attestation Protocol

> Candidate reference. Not active until lifecycle promotion.

Use this protocol only after ER-01 has validated execution and review receipts.
The protocol verifies cryptographic provenance against an explicitly anchored
trust policy. It does not score content and never authorizes promotion.

## 1. Trust boundary

Trust begins with two inputs supplied separately:

```text
trust-policy JSON bytes
out-of-band expected SHA-256 of those exact bytes
```

The verifier rejects a missing or mismatched expected policy hash. Accepting a
policy merely because it accompanies an attestation would allow an attacker to
substitute both key and policy.

Private keys are never repository or release inputs. The protocol distributes
public keys and verifies Ed25519 signatures only.

## 2. Evidence chain

```text
ER-01 plan and receipts
→ trust policy anchored by expected SHA-256
→ execution attestation for each execution receipt
→ review attestation for the review receipt
→ trusted chain report
→ optional replay-consumption ledger entry
→ /qualify-sdlc-capability result
→ /manage-skill-lifecycle decision
```

Each attestation signs canonical JSON containing every field except the
`signature` object.

## 3. Canonical signature payload and key fingerprint

Use SDLC canonical JSON version 1:

- sort object keys lexicographically at every level;
- preserve array order;
- serialize JSON primitives with standard JSON rules;
- encode as UTF-8 with no trailing newline;
- omit only the top-level `signature` field from the signed payload.

The signature algorithm is `Ed25519`. The verifier rejects every other algorithm
or canonicalization identifier.

A public-key fingerprint is:

```text
SHA-256(DER SubjectPublicKeyInfo bytes)
```

The verifier imports the PEM key with Node crypto, exports `spki`/`der`, and
hashes those DER bytes. It never fingerprints PEM text or line endings.

## 4. Trust policy

The policy declares:

- `policy_id`, `workspace_id`, owner, validity interval, clock skew, and maximum attestation age;
- one canonical `replay_ledger_id` and relative `replay_ledger_path` for the workspace;
- authorized signer ID and key ID;
- public Ed25519 key and SPKI-DER SHA-256 fingerprint;
- signer status: `ACTIVE` or `REVOKED`;
- allowed roles: `EXECUTION_ATTESTER` and/or `REVIEW_ATTESTER`;
- an `independence_domain` controlled by the trust-policy owner;
- exact allowed adapter IDs;
- signer validity and optional revocation evidence.

Policy validation requires:

```text
valid_from < valid_until
signer.valid_from < signer.valid_until
signer interval is within policy interval
ACTIVE signer has no revoked_at
REVOKED signer has revoked_at and reason
signer_id unique
key_id unique
public-key fingerprint unique
same key cannot appear under multiple signers or domains
allowed_adapter_ids use exact string membership; wildcard matching is absent
```

The verifier derives signer identity, role authorization, independence domain,
and key status only from the anchored policy. Matching strings inside an
attestation are not trust roots.

Different independence domains are policy-governance evidence, not proof of
organizational independence by cryptography alone. Reports expose the policy
hash, owner, signer IDs, key fingerprints, and domains for lifecycle review.

## 5. Attestation envelope

Every attestation binds:

- `attestation_id`, nonce, issued/expiry timestamps;
- exact workspace ID and Git source revision;
- exact plan ID, case ID, and receipt mode/type;
- exact receipt ID, relative path, byte count, and SHA-256;
- signer ID, key ID, and signer role;
- adapter/session/process identifiers appropriate to the attestation type;
- type-specific claims and an Ed25519 signature.

The verifier requires:

```text
attestation_type EXECUTION
→ subject.receipt_type EXECUTION
→ signer.role EXECUTION_ATTESTER
→ evaluation.mode CANDIDATE|BASELINE|WITH_SKILL|WITHOUT_SKILL
→ claims process_isolation_enforced, context_allowlist_enforced,
  undeclared_context_blocked
→ review-only claims absent

attestation_type REVIEW
→ subject.receipt_type REVIEW
→ signer.role REVIEW_ATTESTER
→ evaluation.mode REVIEW
→ claims reviewer_identity, mapping_hidden_until_score_freeze,
  frozen_scores_sha256, mapping_sha256
→ execution-only isolation claims absent
```

Unknown fields and contradictory type/role/subject combinations fail.

## 6. Receipt binding and ER-01 resolution boundary

Before signature acceptance, the verifier runs the promoted ER-01 validator and
cross-checks attested binding fields against the validated receipt.

Trusted attestation may resolve only these ER-01 provenance blockers:

```text
PROCESS_PROVENANCE_UNATTESTED
INDEPENDENCE_ATTESTATION_MISSING
```

The same codes may be prefixed by execution labels in review validation, for
example `EXECUTION_A_PROCESS_PROVENANCE_UNATTESTED`.

Attestation cannot resolve:

- `EXECUTION_NOT_COMPLETED` or `ISOLATION_UNPROVEN`;
- missing source/plan/fixture/context/output evidence;
- path, hash, binding, timing, score, or mapping conflicts;
- reviewer identity collision;
- semantic `FAIL`, `NOT_RUN`, or `INCONCLUSIVE`.

An attestation never upgrades an ER-01 `FAILED` result.

## 7. Trusted comparison chain

A trusted chain requires:

- both execution receipts are integrity-valid and blocked only by the allowed provenance code;
- each execution attestation is `VERIFIED`;
- the review receipt is integrity-valid and semantic state is `PASS`;
- the review attestation is `VERIFIED`;
- candidate and baseline execution session/process pairs are distinct;
- the review signer independence domain differs from every execution signer domain;
- review session/process identifiers differ from all execution identifiers;
- A/B mapping remained hidden until scores were frozen;
- all attestation IDs and nonces are unique and absent from the replay ledger.

The same execution signer may attest candidate and baseline only when distinct
sessions/process instances are bound. Reviewer independence still requires a
different policy-controlled independence domain and a different public-key
fingerprint.

## 8. Verification time, revocation, and expiry

Resolve one `verification_time` at verifier start and record it in the report.
Tests may inject an ISO timestamp. Normal CLI use resolves current UTC once.
All time checks use this single instant and the policy clock-skew allowance.

Reject attestations when:

- policy or signer is not valid at verification time;
- `issued_at >= expires_at`;
- issued before signer/policy validity;
- issued at or after signer revocation;
- expired beyond allowed skew;
- age exceeds `max_attestation_age_seconds`;
- signer is revoked at verification time.

## 9. Replay ledger and atomic consumption

The anchored trust policy binds exactly one replay ledger ID and relative path.
A verifier must reject any caller-selected alternate ledger path or ledger ID.
This prevents replaying the same attestations by creating a second empty ledger.

The consumption ledger is append-only and hash-chained. Each entry hashes its
canonical payload excluding `entry_sha256`. The ledger stores its current head.

Replay verification requires:

```text
new ledger
→ explicit create mode
→ requested path equals policy.replay_ledger_path
→ new ledger ID equals policy.replay_ledger_id
→ no pre-existing file
→ expected head omitted

existing ledger
→ requested path and ledger ID equal the anchored policy
→ expected ledger-head SHA-256 supplied out-of-band
→ expected head equals computed current head
```

An internal chain without the external expected head cannot detect complete
replacement or truncation and therefore returns `BLOCKED`.

Recording consumption uses:

- an exclusive same-directory `.lock` created with fail-if-exists semantics;
- no symlinked ledger target or parent-directory alias;
- regular-file descriptor read with identity verification;
- re-read and revalidation after lock acquisition;
- expected current head comparison;
- same-directory temporary file plus atomic rename;
- post-write re-open, full chain validation, and new-head comparison;
- no stale-lock auto-deletion;
- lock conflict reported as `BLOCKED`.

`consumed_at` is the chain's single resolved `verification_time`; callers may
inject that clock for deterministic tests but may not supply a second timeline.

Ledger corruption, sequence gaps, duplicate IDs/nonces, replacement, truncation,
or concurrency conflicts fail closed. Recording evidence consumption does not
mutate lifecycle state.

## 10. Result contract

```yaml
integrity_valid: true | false
trust_policy_state: VERIFIED | BLOCKED | FAILED
trusted_execution_state: VERIFIED | BLOCKED | FAILED | NOT_RUN
trusted_review_state: VERIFIED | BLOCKED | FAILED | NOT_RUN
semantic_review_state: PASS | FAIL | NOT_RUN | INCONCLUSIVE
independence_state: VERIFIED | DECLARED_UNVERIFIED | CONFLICT | NOT_CLAIMED
lifecycle_review_ready: true | false
promotion_authorized: false
verification_time: ISO-8601
policy:
  id: string
  owner: string
  sha256: string
  signer_fingerprints: []
  replay_ledger_id: string
  replay_ledger_path: string
findings: []
```

`lifecycle_review_ready=true` means the evidence chain may be considered by
`/manage-skill-lifecycle`. It is not a lifecycle decision and never changes an
artifact state.

## 11. Failure mapping

```text
READY    anchored policy and required signed chain verify
PARTIAL  valid trusted subset exists but optional bounded evidence is absent
BLOCKED  required policy anchor, signer, attestation, receipt, review, or ledger head is absent
FAILED   signature, hash, path, binding, role, time, revocation, replay, or ledger conflicts
```

Preserve ER-01 evidence when trusted attestation is blocked. Do not rewrite
declared evidence as failed unless its own bytes or claims conflict.

## 12. Side effects and ownership

The verifier reads receipts, policies, attestations, and optional ledgers. It may
write only an explicitly requested replay-consumption ledger or report. It must
not:

- generate or retain private keys;
- invoke a model or provider;
- alter active skills, manifests, routes, project truth, or lifecycle state;
- treat a signature as semantic quality;
- create or modify diagram/Draw.io artifacts.

CLI config files contain paths and operation parameters only. The expected
trust-policy SHA-256 and existing-ledger head SHA-256 are supplied separately
by the caller, never read from the mutable config stored beside evaluated
artifacts. A deterministic verification clock may be injected as a separate
test flag; normal execution resolves current UTC once.
