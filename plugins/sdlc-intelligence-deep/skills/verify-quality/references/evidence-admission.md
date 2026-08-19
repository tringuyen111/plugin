# QA Evidence Admission

Use this reference when evidence quality, process assurance, substituted boundaries, or an agent-produced change could change the QA conclusion.

## Two independent proof dimensions

For a fixed QA claim distinguish:

```text
artifact/output proof        -> what the candidate actually does
execution/trajectory proof  -> what inspectable verification/actions actually occurred
```

Do not require trajectory proof merely because an agent produced the change. Require it only when an approved control, risk, release condition, or claimed assurance depends on the process itself.

A passing final artifact does not prove that a required migration check, security probe, rollback exercise, data validation, or other mandated verification step ran. Conversely, a missing process trace does not automatically make an observed output failure disappear. Preserve the two dimensions separately.

## Admissible inspectable execution evidence

Use evidence the run can actually inspect, for example:

- commands and raw outputs;
- tool-call/action logs or trace records;
- test/eval reports bound to the candidate;
- manifests, hashes, provenance records, CI job/step results;
- screenshots, API responses, queries, telemetry, or other consumed outputs;
- recorded environment/configuration/data identity when material.

Never require, invent, or claim access to private chain-of-thought. A trace claim must be about observable actions/provenance, not hidden reasoning.

## Admission questions

For each material evidence item ask:

1. **Claim:** what bounded condition can this evidence falsify?
2. **Fixed point:** which candidate/source/environment/data/configuration does it bind?
3. **Producer:** who/what produced it and when?
4. **Mechanism:** did the probe exercise every mechanism required by the claim, or substitute/bypass one?
5. **Integrity:** can the raw output/artifact or immutable reference be inspected?
6. **Limit:** what wider claim would be unjustified from this evidence alone?

Admit narrower truth when appropriate. Do not throw away useful evidence merely because it cannot close the widest claim.

## Re-entry

When evidence is stale, contaminated, ambiguous, or process proof is missing:

- keep the affected condition `INCONCLUSIVE` or `NOT_RUN` as appropriate;
- preserve valid unaffected evidence;
- identify the earliest invalid fixed point/probe/admission decision;
- acquire or rerun the smallest evidence that can discriminate the unresolved claim;
- re-derive the QA verdict/readiness only from the current admitted set.
