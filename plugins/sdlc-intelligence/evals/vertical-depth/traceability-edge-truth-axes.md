# Frozen Qualification — Traceability Edge Truth Axes

Evidence-State: `NOT_RUN`

These cases are frozen before candidate edits. They are behavioral falsifiers for Traceability Prompt/Context semantics, not executed results.

## T1 — Stale and conflicting can coexist

Input: A canonical edge was verified for Requirement R1 revision 4 -> Design D1 revision 2. R1 materially changes to revision 5, so the old binding is superseded. Current source/runtime inspection also shows the implementation dependency contradicts the old canonical relationship.

Expected: preserve the edge as stale for binding freshness and conflicting for declaration/observation agreement at the same time; do not force one condition to erase the other.

Falsifier: choose either `STALE` or `CONFLICTING` as the sole edge state and lose the other material fact.

## T2 — Missing revision and conflict can coexist

Input: A trace link names an artifact ID but lacks an exact target revision. Runtime evidence contradicts the canonical declaration associated with that logical artifact.

Expected: preserve an unbound/unverified edge plus the observed conflict. Missing revision prevents current coverage but does not make the conflict disappear.

Falsifier: classify only `UNVERIFIED` and suppress conflicting evidence, or classify only `CONFLICTING` and pretend the revision binding is adequate.

## T3 — Current binding does not imply verification

Input: Source and target revision identifiers match the latest canonical artifacts, but the edge has no usable truth basis/evidence and provenance is unresolved.

Expected: record current binding freshness but unverified relationship truth; it must not count as current verified coverage.

Falsifier: infer `CURRENT` coverage solely from endpoint revision equality.

## T4 — Verified historical edge may still be stale for current coverage

Input: An edge has strong evidence proving a relationship between exact historical revisions, then one endpoint changes materially without revalidation.

Expected: preserve that the historical binding was verified while marking the binding stale for current coverage. Revalidation against the new revision is required before freshness can become current again.

Falsifier: erase historical verification because the edge became stale, or keep current coverage because the old evidence was strong.

## T5 — Revalidation may fix freshness without resolving disagreement

Input: The edge is rebound and verified against the new endpoint revisions, but canonical declaration and runtime observation still disagree about whether the dependency exists.

Expected: refresh binding/verification while retaining `CONFLICTING` agreement until the canonical owner resolves the disagreement.

Falsifier: treat revalidation/new revisions as automatically resolving the canonical-versus-observed conflict.

## T6 — Graph-quality counts are overlapping dimensions

Input: A graph has ten material edges. One edge is both stale and conflicting, another is current-binding but unverified, and the rest are current/verified/consistent.

Expected: graph-quality findings/counts may count the first edge in both stale and conflicting categories. The counts are diagnostic dimensions, not a partition that must sum to ten.

Falsifier: force each edge into one mutually-exclusive bucket or "fix" counts by dropping one defect.

## T7 — Traversal preserves unresolved axes

Input: A change-impact path crosses an edge that has current endpoint revisions but is unverified and conflicting.

Expected: keep both unresolved axes visible; the branch cannot become `CONFIRMED` or `NO_MATERIAL_IMPACT` until the required edge truth is resolved.

Falsifier: use current revision binding alone to launder the branch into confirmed coverage.
