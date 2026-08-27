# Multi-page Document Composition

## Contents
- When a second page earns its navigation cost
- Page truth versus document truth
- Thin document manifest
- Navigation ownership
- Build, validate, and render proof
- Failure patterns and correction

Use this reference only when one truthful communication view is insufficient and the approved decomposition should remain together in one editable Draw.io document. A multi-page document is not a cure for a poorly composed single page.

## Make decomposition earn its cost

A second page adds navigation and context-reconstruction cost. Create it only when all of these are true:

1. the child page has a stable semantic/communication boundary;
2. the parent reader task does not require tracing the hidden child internals continuously;
3. removing those internals materially improves the parent primary read, density, or scale;
4. the reader can recognize where to enter the detail and what context survives the jump.

Prefer a flatter page when the reader must constantly alternate between parent and child to answer one question. Prefer local grouping or label compression before page fragmentation when the content still belongs to one scan/trace field.

## Keep page truth and document truth separate

Each page remains an independently valid `process-diagram-plan/v1`:

```text
process truth + reader task
        |
        +--> overview plan/v1  --> layout/v2
        |
        +--> detail plan/v1    --> layout/v2

thin document manifest
        |
        +-- page identity/order
        +-- plan references
        +-- explicit node -> page navigation
        |
        v
one editable multi-page .drawio
```

Do not add page identity, page order, or navigation fields to the page plans. Do not duplicate process semantics into the document manifest. The manifest owns only stable document composition truth that cannot be derived without remembering the Agent/user's decomposition decision.

## Thin document manifest

Use `process-diagram-document/v1`:

```json
{
  "version": "process-diagram-document/v1",
  "title": "Customer request overview and validation detail",
  "pages": [
    {"id": "overview", "label": "Overview", "plan": "overview.json"},
    {"id": "validation-detail", "label": "Validation detail", "plan": "detail.json"}
  ],
  "navigation": [
    {"fromPage": "overview", "fromNode": "validate", "toPage": "validation-detail"}
  ]
}
```

The manifest is deliberately narrow:

- `pages` order is the document tab order;
- `id` is stable page identity and must be unique;
- `label` is the human-facing page tab name;
- `plan` is a relative local reference to an independently valid page plan;
- `navigation` attaches a page jump to an existing source node; it does not create process flow.

Keep plan references inside the manifest directory so the document is portable as a local bundle. Do not use the manifest for style, metadata, layers, arbitrary Draw.io properties, business facts, or a second process graph.

## Navigation ownership

A page link is communication/navigation truth, not causal process truth.

Agent decides:

- which existing node is a useful entry to a child page;
- whether a return link is useful and which existing node should carry it;
- page order and labels;
- whether the navigation reduces rather than increases reader reconstruction cost.

Mechanics may only verify that the source page/node and target page exist, then translate the decision to the renderer's internal page-link primitive. It must not invent links from subprocess shapes, titles, naming similarity, or graph structure.

A linked node keeps its original process meaning. Clicking it adds navigation behavior; it does not mean the node executes the child page or changes control flow semantics.

## Build and proof

Build the editable document:

```bash
node scripts/process-diagram.mjs build-document \
  --manifest <document.json> \
  --out-dir <out-dir>
```

Validate the complete source:

```bash
node scripts/process-diagram.mjs validate --source <out-dir>/diagram.drawio
```

Validation inspects every page and internal page-link target. A PASS is document structural proof, not visual acceptance of all pages.

Render each page explicitly:

```bash
node scripts/process-diagram.mjs render \
  --source <out-dir>/diagram.drawio \
  --page overview \
  --out <out-dir>/overview.png

node scripts/process-diagram.mjs render \
  --source <out-dir>/diagram.drawio \
  --page validation-detail \
  --out <out-dir>/validation-detail.png
```

For multi-page sources, do not omit `--page`: a single PNG/SVG/PDF export cannot be treated as visual proof of the whole document when only one page is selected. Inspect every page that is part of the completion claim, then also check whether the page split and navigation make sense as a whole.

## Cross-page visual review

After inspecting each page locally, zoom out conceptually to the document:

- Does the overview still answer its required question without opening detail?
- Is the linked node an obvious, truthful entry to the child page?
- Does the child preserve enough parent context to orient the reader?
- Are page labels discriminative rather than generic `Page 1 / Detail` noise?
- Does the reader need to bounce repeatedly between pages? If so, the split may be wrong.
- Does each page have a clear local entry/outcome instead of feeling like a cropped fragment?

## Failure patterns -> correction

| Failure | Why it fails | Corrective move |
|---|---|---|
| Split because the canvas is merely large | size is a symptom, not a semantic boundary | repair composition first; split only if reader-task abstraction improves |
| Parent hides a branch/join/exception required to interpret the visible flow | parent primary read becomes misleading | keep the critical context on the parent or change the decomposition boundary |
| Auto-link every subprocess-looking node | mechanics invents communication behavior | link only Agent-selected nodes in the manifest |
| Duplicate process fields in the manifest | creates competing durable truth | keep process semantics in page plans only |
| Put Draw.io link strings in page plans | renderer syntax leaks into canonical process truth | keep node-to-page intent in the renderer-neutral document manifest |
| Validation passes page 1 while page 2 is broken | false whole-document proof | validate every page and internal page target |
| Render one page and claim the document is visually accepted | proof scope mismatch | render/inspect each claimed page |
| Two pages require constant back-and-forth | navigation cost exceeds abstraction benefit | flatten or move the shared critical context back into one page |

Pages are a communication structure, not a hierarchy for its own sake. Stop when the document is easier to understand and edit than the equivalent flat composition; do not manufacture more levels just because Draw.io supports unlimited pages.
