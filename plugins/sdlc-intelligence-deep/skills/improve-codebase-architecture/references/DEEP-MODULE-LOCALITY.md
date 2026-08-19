# Deep Module and Locality Branch

Read this branch only when the architecture pressure is primarily **knowledge/change scatter, shallow ownership, leaked policy, or a weak representative seam**. It is not a universal architecture pattern.

## Mechanism

Use information hiding to move design knowledge to the narrowest owner that should change with it:

```text
observed scatter
  -> leaked/shared design truth
  -> current owner(s)
  -> better responsibility owner
  -> smaller knowledge surface
  -> representative proof seam
```

A good deepening move makes callers know **less design policy**, not merely call fewer functions or depend on fewer files.

## Evidence and falsifiers

Strong evidence includes:

- one rule/policy change repeatedly requires coordinated edits across several callers;
- a missed caller causes repeated regressions of the same semantic rule;
- callers know ordering, normalization, retry, validation, mapping, or persistence detail that should belong to one responsibility;
- tests require exposing internals because the meaningful behavior has no stable seam;
- failures cannot be observed or classified at the responsibility boundary that should own them.

Use the **deletion test**: deleting a suspected shallow module should allow complexity/knowledge to concentrate behind a better owner. If deletion merely moves the same complexity or leaks it to a different set of callers, the deepening claim is weak.

Use the **representative-change test**: imagine one realistic future change to the leaked rule. If the proposed owner cannot make that change local without coordinated caller knowledge, the improvement is not yet demonstrated.

## Boundary fit gate

Do not deepen/consolidate through a material boundary merely to remove duplication or reduce file count. Reframe or reject when consolidation would erase a current:

- trust/privilege boundary;
- independent state authority;
- deployment or lifecycle boundary;
- failure-isolation/recovery boundary;
- performance/resource boundary;
- protocol/compatibility boundary;
- independent change/governance boundary.

One real production adapter can justify a seam when it protects a current protocol/trust/ownership/change boundary. Multiple hypothetical consumers do not justify a seam by themselves.

## Contrastive cases

**Eligible deepening:** four changes to one normalization rule required matching edits in five callers; a missed caller caused the same regression twice. The callers own leaked normalization knowledge. A candidate may move that rule behind an existing domain owner and prove the claim with representative caller behavior plus a future rule change.

**No-change:** a 900-line parser has one stable public interface, changes remain local, callers do not know internals, and failures are observable. File size is a smell lead, not architecture evidence.

**Do not consolidate:** two services repeat validation but intentionally have separate trust/deployment/failure boundaries. Preserve those boundaries; look only for a narrower shared truth owner if source evidence shows it can be shared without coupling their independent semantics.
