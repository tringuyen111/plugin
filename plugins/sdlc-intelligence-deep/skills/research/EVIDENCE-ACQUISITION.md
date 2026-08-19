# Evidence Acquisition Frontier

Read this reference when the research contract is clear but initial retrieval is incomplete, repetitive, contradictory, stale, or not yet anchored to the nearest source owner. The purpose is to make **how evidence is acquired** adaptive rather than treating search as a list of queries.

## Model the frontier

Represent each material unresolved claim as a frontier item:

`claim / decision consequence -> current best evidence -> gap class -> next acquisition move -> expected discrimination -> result -> next state`

Use qualitative judgment. Do not manufacture an additive information score. Prefer the move that can most change the downstream decision while staying close to the authoritative owner and within the available evidence budget.

### Gap classes

- **Coverage gap** — a material branch, population, failure mode, or alternative is not represented.
- **Authority gap** — evidence exists, but only from derivative or weak sources while a nearer owner may exist.
- **Version/applicability gap** — evidence may be correct for another version, environment, product, population, or time.
- **Contradiction gap** — material sources disagree and the disagreement could change the decision.
- **Runtime/source gap** — documentation claims behavior that only source, schema, configuration, or runtime evidence can confirm.
- **Meaning gap** — terms, units, or claims are not comparable enough to integrate yet.

## Choose a materially different acquisition move

Do not answer every gap with another broad search. Select among:

1. **Reformulate around the owner and exact boundary.** Add the applicable version, operation, normative term, error code, schema field, or exact quoted phrase when generic queries return broad summaries.
2. **Move closer to the owner.** Traverse from secondary prose to the normative spec, source module, schema, release note, configuration, issue/change record, provider contract, or runtime surface that actually owns the claim.
3. **Traverse references.** Follow backward references/citations for provenance and forward/linked change trails for corrections, supersession, compatibility, and later qualification. Treat derivative sources as one lineage, not independent votes.
4. **Expand laterally to an adjacent authoritative surface.** For example, compare docs with source/config/schema, a public contract with release notes, or intended behavior with runtime evidence when the consequence warrants it.
5. **Seek a counter-source deliberately.** Search for conditions under which the current leading claim fails: limitations, incompatibilities, negative cases, errata, incident reports, conflicting owner evidence, or a representative runtime probe.
6. **Narrow the question.** When evidence cannot resolve a broad claim, split it into the smallest decision-relevant subclaim that available evidence can actually support.

## Evaluate the move

After each material move, ask:

- Did it add an independent evidence lineage or only another copy of the same source?
- Did it move closer to the owner or only add commentary?
- Is it applicable to the required version/scope/time/population?
- Did it resolve, create, or relocate a contradiction?
- Did it change the likely answer, confidence, or next decision?
- What newly exposed unknown now dominates the decision?

Repeated low-novelty retrieval is a **strategy-change signal**. Switch owner surface, evidence channel, reference trail, counter-source, or question granularity rather than issuing near-equivalent searches indefinitely.

## Reprioritize and re-enter

The frontier is not FIFO. When new evidence exposes a more consequential unknown, move that item ahead of lower-value collection. Preserve already supported claims; re-enter at the earliest acquisition assumption invalidated by the new evidence.

Typical corrections:

| Failure pattern | Correction |
|---|---|
| many hits, same derivative source | collapse the lineage; move to owner/reference trail |
| current docs conflict with deployed version | retrieve version-applicable source/changelog/runtime evidence |
| all evidence confirms the leading claim | deliberately seek a credible counter-source or failure boundary when consequence warrants it |
| searches add no decision-changing novelty | change strategy or stop under the research contract |
| source/code/runtime contradict | preserve the conflict and acquire the evidence needed to locate authority/scope rather than averaging claims |
| a new dependency unknown dominates | reprioritize the frontier and defer lower-value collection |

## Stop proportionately

Stop when the declared research question, confidence target, and decision-relevant coverage are satisfied, material contradictions are resolved or explicitly bounded, and additional retrieval has negligible expected decision-changing novelty. Record residual uncertainty and the best next evidence if the downstream owner later needs higher confidence.
