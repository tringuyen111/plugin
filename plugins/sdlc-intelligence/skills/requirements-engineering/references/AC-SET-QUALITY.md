# Acceptance Set Quality

Use this reference when acceptance meaning spans multiple criteria/branches or when a draft set appears individually plausible but may still be incomplete, redundant, or mixed. This is **requirements refinement**, not executable test-case design.

## Model acceptance partitions

An acceptance partition is a source-grounded condition or class of examples that leads to a materially distinct observable acceptance outcome. Partitions are useful only when they change what stakeholders would accept: success, rejection, no-change, state transition, permission, timing, boundary, or another authorized result.

Do not copy combinatorial test-design techniques into AC. QA may later derive many executable probes from one acceptance partition.

Build a small map when useful:

`source obligation / condition -> representative examples -> distinct observable outcome -> criterion(s) -> unresolved owner`


## Criterion, example, or question?

Keep discovery artifacts semantically distinct:

- **Criterion / acceptance obligation** — the source-grounded observable condition that must hold for this item to be accepted.
- **Example** — a concrete instance used to clarify, pressure, or falsify the criterion boundary. One example does not automatically become a new criterion.
- **Question** — missing authority or meaning that can change acceptance. Keep it unresolved; do not rewrite it as a guessed criterion.

Promote an example into a separate criterion only when it reveals a distinct source-authorized acceptance partition or independent observable guarantee. Turn a question into a criterion only after the missing normative truth is resolved.

## Critique the set

Pressure-test the **collection**, not just the wording of each criterion.

### Gap
A grounded source obligation or materially distinct outcome has no criterion/disposition. Add or refine a criterion only for the uncovered acceptance meaning.

### Redundancy
Two criteria restate the same acceptance partition with different examples or UI wording. Merge or remove the weaker duplicate while preserving any distinct negative/postcondition guarantee.

### Overlap
Two criteria partially cover the same condition/outcome but disagree on boundary or postcondition. Narrow their boundaries, merge them, or return the contradiction to the source owner. Do not keep both and hope QA reconciles them.

### Mixed concern
One criterion bundles independently acceptable/rejectable obligations or multiple canonical authorities/capabilities. Split when independent failure/acceptance matters; keep unresolved policy/quality truth explicit and use the relevant canonical capability rather than inventing it.

### Over-broad criterion
A single statement hides branches whose outcomes differ materially. Split at the smallest source-authorized boundary that changes acceptance.

### Example explosion
Many examples prove the same partition. Keep enough representative examples to clarify boundaries; do not create one criterion per example.

## Split, merge, narrow, or return upstream

- **Split** when one criterion contains distinct acceptance outcomes or owner responsibilities.
- **Merge** when criteria differ only in redundant examples/phrasing and no material guarantee is lost.
- **Narrow** when a criterion overgeneralizes beyond the source-authorized population/condition.
- **Return upstream** when the partition itself depends on unresolved policy, eligibility, threshold, precedence, or behavior meaning. AC cannot manufacture normative truth.

## Minimum-sufficient completion

The target is not maximum criterion count. A strong set is the **minimum sufficient acceptance set** that:

- covers every material grounded acceptance partition in declared scope;
- preserves distinct negative/no-change guarantees and postconditions;
- has no known redundant duplicate or unresolved overlap;
- keeps unresolved owner questions explicit;
- remains business-observable and solution/test-mechanism neutral.

Stop refining when additional examples no longer reveal a new acceptance partition, change a boundary/outcome, or expose an unresolved authority question.
