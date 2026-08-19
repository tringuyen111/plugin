# Claim Support and Staleness

Use this reference when a guide claim has conflicting/ambiguous authority or when source changes may stale only part of the documentation.

## Support rule

A documentation claim is admissible when the cited evidence actually supports the reader-facing proposition at the selected product fixed point.

```text
source identity + fixed point + claim meaning
        -> support relation
        -> reader-facing wording
```

Do not infer a stronger proposition than the source proves.

### Contrastive examples

**Permission**

- UI shows an Approve button to managers.
- Policy says only Finance Controllers may approve.
- Correct: document the authorized policy; expose the UI/policy conflict if relevant.
- Wrong: infer approval authority from button visibility.

**Failure behavior**

- QA report for billing is current.
- The guide claim concerns profile-photo upload and is directly verified in the current UI.
- Correct: use the direct profile evidence; billing QA is irrelevant.
- Wrong: load the entire QA report because a QA artifact exists.

**Preview behavior**

- Preview environment proves a new workflow not present in release.
- Correct: label the page/claim as preview and bind it to the preview fixed point.
- Wrong: silently describe preview behavior as released.

## Local staleness

Track enough dependency meaning to re-enter only affected documentation:

```text
[S1 policy] --SUPPORTS--> [C1 password expiry]
[C1] --APPEARS_IN--> [P1 account-security]
[V1 screenshot] --VISUALIZES--> [P1 step 3]

S1 changes
-> C1 stale
-> P1 affected
-> V1 stale only if the visualized state/label also changed
```

Do not persist a formal graph unless broader traceability is itself a project need. If source lineage must be maintained across many lifecycle artifacts, compose `/traceability` with exact source/page fixed points.

## Re-entry table

| Change | Revisit | Preserve when independently supported |
|---|---|---|
| business rule changed | dependent claim/page/review | unrelated pages and visuals |
| UI label/state changed | dependent step + relevant visual | policy meaning if unchanged |
| screenshot became stale | visual proof and affected presentation | textual claim supported elsewhere |
| known defect resolved | recovery/limitation guidance | unaffected task flow |
| publication destination changed | persistence/publication proof | authored content unless formatting semantics changed |

A promised update is not proof. Re-open or re-inspect the exact affected artifact/evidence before marking the stale relation closed.
