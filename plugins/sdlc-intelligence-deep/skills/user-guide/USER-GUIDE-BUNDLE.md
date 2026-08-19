# User Guide Bundle Contract

Use this reference when documentation spans several pages/topics, needs shared navigation/source linkage, or must be mapped into a selected delivery target. A bundle is a **semantic set of reader guidance plus evidence/provenance obligations**, not a mandatory Markdown directory or rendering pipeline.

## 1. Bind the real target before choosing file shape

Prefer, in order:

1. an existing compatible project documentation convention and build/preview path;
2. the explicitly requested target/source format;
3. a representation-neutral outline/content model when the target is not yet selected.

Valid target-native mappings include project Markdown/MkDocs, MDX/Docusaurus, AsciiDoc/Antora, direct HTML, a help-center CMS, or another established documentation system. Do not convert through Markdown merely because Markdown is convenient.

If a selected target requires a deterministic transform, use its established renderer/build tool or a narrow adapter that owns only the transform it can verify. User Guide does not own markup grammar or a general static-site renderer.

## 2. Keep only material bundle obligations

```text
GUIDE IDENTITY
  audience + language + scope + product fixed point + release/preview truth

NAVIGATION / INFORMATION MODEL
  reader jobs/topics + grouping/order/cross-links + topic type when material

CONTENT UNITS
  reader need + supported content + source/open-question linkage + visual linkage when needed

DELIVERY / PROOF
  selected target/source + actual preview/consumer path + requested review/publish state
```

Do not materialize empty metadata just to satisfy a schema. Preserve exact fixed points and unresolved truth strongly enough to prevent stale or unsupported guidance.

## 3. Adapt each topic to its reader job

A procedural topic needs enough information for the reader to know: why/when this is the right task, whether the starting state is valid, what to do, what material result to observe, which visible condition changes the path, and what supported recovery/escalation applies when expected state does not occur.

A reference topic optimizes exact lookup. An explanation topic optimizes conceptual relations. Do not force procedural headings into non-procedural content.

## 4. Design multi-page information architecture by reader intent

Group and label by reader task/intent, not internal module ownership unless the reader already navigates the product that way and evidence supports that mapping.

Use cross-links when they reduce duplication or bridge a real reader transition. Factor shared prerequisites/reference only when genuinely reused; do not make every small task traverse a long prerequisite chain.

If the unresolved issue is the **visible help/docs application surface**—navigation interaction, responsive reading shell, spatial hierarchy, component composition—pass the semantic navigation/content constraints to `product-design`. Markup parser/build semantics remain with the selected target stack.

For visual selection/framing/annotation decisions, use the directly linked Visual Instruction method from `SKILL.md`; this bundle only records the visual linkage/provenance required by scope.

## 5. Prove only the selected target operation

- Source update only: reopen/inspect the exact source files and stop if no build/render is required.
- Built docs/site: use the project's actual build and inspect the real consumed result.
- CMS/help center: verify the target entry/version/postcondition through the authorized interface.
- Direct HTML: use the established HTML path; do not create a Markdown round trip.
- Target not selected: keep delivery proof `NOT_REQUIRED`/`NOT_RUN` as appropriate; do not invent a renderer.

A build/export/preview result proves that target operation only. It does not prove product behavior, reader success, visual currency, review approval, or publication authority.
