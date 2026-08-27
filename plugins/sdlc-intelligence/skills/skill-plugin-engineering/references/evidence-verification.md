# Evidence and Verification

Verification strength must match the exact claim. Bind evidence to the exact candidate/source/runtime revision it evaluates.

## Claim -> proof

| Claim | Minimum relevant proof |
|---|---|
| OpenAI Skill is natively valid | `skill-creator` validation/package on exact Skill bytes |
| Plugin package is natively valid | `plugin-creator` validation on exact Plugin/package bytes |
| deterministic transform is correct | executable tests including failure cases |
| provider operation works | live/inspectable interface, auth/failure/provenance/output/postcondition evidence |
| Prompt/Context changes behavior | frozen representative behavioral cases; comparison if claiming uplift |
| trigger/boundary is correct | positive plus near-miss/non-trigger cases |
| migration/replacement is safe | consumer inventory, cutover/removal evidence, postcondition checks |
| candidate is better than baseline | baseline frozen before change, same invariants/cases, representative comparison |
| independent qualification | evidence produced/reviewed under the required independent/attested boundary |

## Exactness rules

Record the exact path/revision/hash for load-bearing artifacts. If a file is intended for review, verify that the bytes/path being shared are the current intended artifact, not a stale copy.

A structural validator result applies only to the bytes it consumed and only to the invariants it checks.

## Evidence states

Preserve distinctions:

```text
PASS | FAIL | NOT_RUN | INCONCLUSIVE | MISSING | BLOCKED
```

Do not upgrade a state through wording, approval, or package success. Approval can accept a risk or authorize a write; it cannot make a failed test pass.

## Self-check vs independent qualification

The engineer/author may:

- freeze cases;
- run deterministic checks;
- run representative self-evaluation;
- compare against a frozen baseline when the environment permits;
- report exact failures and limitations.

Do not label author self-review as independent qualification. If the claim or governance policy requires independent/attested evidence, use the separate evaluator/qualification boundary and keep the candidate status pending until that evidence exists.

## Behavioral comparison

For an uplift claim:

1. freeze baseline bytes before mutation;
2. freeze representative positive, near-miss, failure, context, authority, and completion cases before revision-sensitive drafting when practical;
3. run the same cases/invariants against baseline and candidate;
4. preserve raw outputs or inspectable reports;
5. compare decision/artifact quality, not prose similarity;
6. report regressions and inconclusive cases;
7. avoid superiority claims when representative execution did not occur.

## Migration proof

Before removing an active predecessor:

- enumerate discovery/trigger, indexes, context pointers, references, tests/evals, docs, package/manifest, scripts/adapters/fixtures, and external consumers that name or depend on it;
- prove replacement/reclassification for each material semantic obligation;
- update consumers by meaning, not global string replacement;
- verify postconditions after cutover;
- remove silent fallback and duplicate active truth;
- retain historical provenance outside active runtime surfaces.

Stop at the smallest sufficient evidence for the current decision; do not run expensive assurance that cannot affect the next action.
