# User Guide Bundle Contract

Default portable structure:

```text
docs/user-guide/
├── index.md
├── pages/
├── images/
├── evidence/
└── user-guide.html
```

A project adapter may choose another path, but the bundle should expose one obvious entry artifact and keep supporting files together.

## Index

```yaml
type: user-guide-index
scope:
audience:
language:
product_fixed_point:
authoring_scope: OUTLINE_ONLY | REVIEWED_DRAFT | PUBLICATION_READY
status: draft | reviewed | ready | partial | stale
publication_state: NOT_REQUESTED | NOT_RUN | READY | PUBLISHED | BLOCKED
output_target:
render_export_state: NOT_REQUIRED | NOT_RUN | READY | FAILED
updated:
```

The index records:

- approved outline;
- page type and source links;
- page status;
- Open Questions;
- screenshot/evidence status;
- publication state.

## Page contract

Every page contains:

```markdown
# <task or concept title>

> What this page helps the reader do or understand, for whom, and when.

**When to use:**

**Before you start:**

## Steps / Reference / Explanation / Troubleshooting

## Expected result

## If it does not work

## Related pages

<!-- Sources: artifact IDs, paths, runtime evidence -->
<!-- TBD: unsupported statement or missing source -->
```

Use one primary content type per page:

- tutorial;
- how-to;
- reference;
- explanation;
- troubleshooting;
- FAQ;
- glossary.

## Screenshot contract

Each image records or links:

- fixed application build/commit and environment;
- route and state;
- viewport;
- capture actions;
- callouts and masks;
- image SHA-256;
- source-content SHA-256 when local content is captured;
- capture time;
- associated page and step.

Use no more callouts than necessary. Inspect the actual image before publishing.

## Deterministic renderer

```bash
python -B skills/user-guide/scripts/render_user_guide.py \
  docs/user-guide \
  --out docs/user-guide/user-guide.html
```

The renderer:

- follows `pages/*.md` links in `index.md` order;
- escapes raw HTML;
- fails on missing linked pages and unsafe local paths;
- writes a stable HTML artifact and `.manifest.json` with source/output SHA-256;
- includes responsive navigation and content styling without external assets.

Rendering does not prove page correctness. When HTML is the selected consumed artifact, open it and run the relevant Documentation visual-capture job before publication. When another output target is selected, verify that target through its real adapter/consumer path instead of forcing this renderer.
