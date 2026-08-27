# Persistence and Release

## Contents
1. Persistence is conditional
2. Acceptance record shape
3. Record currentness
4. Traceability composition
5. Release handoff contract
6. Contrastive examples

## 1. Persistence is conditional

Do not require a durable UAT record merely to design, witness, evaluate, or even record an explicit in-session business decision when the user/project has not requested durable persistence.

Separate:

```text
business decision semantics
record persistence status
record currentness
release consumability
```

An authorized decision can be semantically established while `persistence=NOT_RUN|UNVERIFIED`. If downstream Release requires immutable acceptance identity, then release consumability is `NOT_READY` until that identity is established.

Never fabricate an ID/revision/digest because a writable filesystem or connector exists.

## 2. Acceptance record shape

When a durable record is actually required, use the project-native schema if compatible. Otherwise preserve at least:

```markdown
# UAT / User Acceptance — <scope / candidate>

## Record identity
- Record ID:
- Revision:
- Digest / immutable identity:
- Supersedes:
- Finalized/evidence cutoff:
- Record validity: CURRENT | STALE | UNVERIFIED | CONFLICTING

## Acceptance basis
- Exact Product/Requirements/domain source revisions:
- Included/excluded scope:
- Acceptance design / representations:

## Execution evidence
- Candidate/build/environment:
- Representative/data/context:
- Witnessed results/evidence:
- Evidence currentness / limitations:

## QA evidence actually consumed, if any
- Requiredness/policy reason:
- QA report revision/digest/currentness:
- QA verdict/readiness/provenance as supplied by QA:

## Evaluation
- Material item dispositions:
- Hard blockers / evidence pending:
- Conditions / waivers and authority:

## Decision
- State: PENDING | ACCEPTED | ACCEPTED_WITH_CONDITIONS | REJECTED
- Decision statement:
- Approver / authority / date:
- Conditions / waivers / expiry / recheck:

## Downstream
- Traceability reference when material:
- Release-consumability status:
- Invalidation triggers:
```

Do not force empty QA or Release sections when they are not applicable; omit or mark `NOT_APPLICABLE` with reason.

## 3. Record currentness

A record handed downstream must bind the exact meaning it claims. Common invalidators include:
- candidate/scope mismatch;
- target acceptance meaning changed;
- a QA revision changed **when the acceptance decision actually depended on that QA evidence**;
- condition/waiver expiry or material change;
- contradictory/missing immutable identity when that identity is required.

Preserve stale/superseded records historically. Create a new current revision after re-evaluation/reconfirmation; do not rewrite history.

## 4. Traceability composition

Use `traceability` only when durable cross-lifecycle lineage/change impact is actually required. User Acceptance should keep enough local source/evidence linkage to explain its own decision without requiring the Traceability Skill for every session.

## 5. Release handoff contract

`devops-engineering` owns release assessment. When project policy requires UAT acceptance for release, hand off:
- exact current acceptance record identity if release policy requires durable identity;
- exact accepted scope/candidate/environment meaning;
- authorized decision and currentness;
- conditions/waivers and applicability;
- acceptance evidence limitations;
- **QA evidence identity only if User Acceptance actually consumed QA for the acceptance decision or Release independently requires that QA under its own policy**.

Release must not infer that every UAT decision consumed QA. Conversely, Release may independently require current QA even when UAT did not.

Acceptance makes a candidate eligible to be **assessed** for release only. It never establishes release readiness, deployment authority, rollback readiness, or production health.

## 6. Contrastive examples

**Decision without persistence:** authorized owner says "Accept candidate A for scope X" after reviewing current acceptance evidence. Record decision semantics in conversation; `persistence=NOT_RUN`; if Release requires exact persisted identity, `release_consumability=NOT_READY`.

**UAT did not depend on QA:** acceptance was based on representative workflow evidence and project policy does not require QA for that decision. Later QA Q7 -> Q8 does not automatically stale UAT. Release may still require Q8 independently.

**UAT explicitly depended on QA Q7:** after Q8 appears, preserve witnessed UAT observations but re-admit Q8 and reconfirm the dependent acceptance decision before presenting it as current release-consumable acceptance.
