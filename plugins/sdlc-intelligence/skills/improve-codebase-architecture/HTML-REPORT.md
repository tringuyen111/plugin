# Optional HTML Report Format

Use this format only when the project capability profile permits a local write and an HTML artifact is useful to the user. The architecture analysis must remain usable without it.

## Portability contract

- Produce one self-contained HTML file.
- Use inline CSS and inline SVG/HTML diagrams by default.
- Do not require Tailwind, Mermaid, a CDN, network access, a browser opener, or a fixed OS temp directory.
- Mermaid may be used only when an already-available local/runtime capability can render it without weakening offline use. Include a readable non-Mermaid fallback.
- Resolve an authorized output location. If using a temporary location, derive it from the runtime rather than assuming `/tmp`.
- Report the exact path written. Report “opened” only after an opener succeeds.
- If rendering or opening fails, preserve the candidate records in Markdown/conversation and report the failed operation truthfully.

## Required content

The report contains:

1. repository/snapshot identity and evidence scope;
2. a compact legend: module, interface, seam, leakage, deep module;
3. one card per eligible candidate;
4. a top recommendation;
5. inspected evidence and limitations;
6. the single selection question.

Each candidate card includes:

- title and recommendation strength;
- files/modules and representative callers;
- observed evidence;
- current and proposed truth owner;
- problem and proposed deepening;
- locality and leverage gains;
- before/after diagram;
- migration, compatibility, rollback, and proof plan;
- ADR conflict where relevant.

## Minimal scaffold

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Architecture review</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
    body { margin: 0; background: #fafaf9; color: #0f172a; }
    main { max-width: 1040px; margin: 0 auto; padding: 40px 24px 64px; }
    article { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px; margin: 24px 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 16px; }
    .diagram { min-height: 220px; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; overflow: auto; }
    .module { border: 2px solid #334155; border-radius: 8px; padding: 10px; margin: 8px; }
    .deep { border-width: 5px; background: #f8fafc; }
    .seam { border-top: 2px dashed #64748b; margin: 14px 0; }
    .leak { color: #b91c1c; font-weight: 700; }
    .badge { display: inline-block; border-radius: 999px; padding: 4px 9px; background: #e2e8f0; font-size: 12px; }
    code { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
  </style>
</head>
<body>
  <main>
    <header><!-- identity, scope, limitations --></header>
    <section><!-- candidate articles --></section>
    <section><!-- top recommendation and selection question --></section>
  </main>
</body>
</html>
```

## Diagram patterns

Use inline HTML/CSS or SVG for whichever pattern best communicates the evidence:

- dependency/call-flow graph;
- stacked shallow modules versus one deep module;
- interface-to-implementation mass comparison;
- call-graph collapse;
- adapter/seam comparison.

The diagram must explain the candidate without relying on a paragraph of decoration. Visual polish does not replace evidence.

## Vocabulary

Use: **module, interface, implementation, depth, deep, shallow, seam, adapter, leverage, locality**.

Avoid substituting vague claims such as “cleaner,” “more maintainable,” or “best practice” without a concrete evidence and proof plan.
