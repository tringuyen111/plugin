# Optional HTML Report Format

Use this format only when an authorized HTML artifact is materially useful. The architecture analysis must remain complete without it.

## Portability contract

- Produce one self-contained HTML file.
- Use inline CSS and inline SVG/HTML diagrams by default.
- Do not require Tailwind, Mermaid, a CDN, network access, a browser opener, or a fixed OS temp directory.
- Resolve an authorized output location; report the exact path written.
- Report “opened” only after an opener actually succeeds.
- If rendering/opening fails, preserve the candidate analysis in Markdown/conversation and report the failure truthfully.

## Required content

The report contains:

1. repository/snapshot identity, driver/authority, and evidence scope;
2. a compact analytical legend only when it clarifies project-native names;
3. one card per eligible candidate;
4. a top recommendation or explicit tie/no-change;
5. inspected evidence, limitations, and falsifiers;
6. a selection question only when exploration was requested **and** a genuine unresolved human-owned choice remains.

Each candidate card includes:

- title and recommendation strength;
- project-native units and representative callers/runtime paths;
- driver/pressure and architecture-root relation;
- direction-level intervention and responsibility/state/boundary movement;
- expected gain and load-bearing quality/constraint;
- regression/cost pressure in other qualities/boundaries;
- compact before/after relationship diagram;
- compatibility/migration pressure, reversibility, and proofability;
- ADR/authority conflict or fixed-design frontier where relevant.

Do not include exact methods/types/schema/queue/broker/cutover steps merely to make the report look complete.

## Diagram patterns

Choose the representation that matches the reasoning shape rather than defaulting to “shallow modules -> deep module”:

- ownership/knowledge-flow graph;
- split/isolation and blast-radius view;
- state-authority relationship;
- trust-boundary map;
- synchronous/temporal dependency path;
- performance/resource critical path;
- deployment/lifecycle boundary;
- before/after seam comparison.

The diagram must make the load-bearing relationship and claimed improvement visible. Visual polish does not replace evidence.

## Vocabulary

Use the repository's meaningful architecture names in titles, candidate records, labels, and diagrams. Terms such as **owner, seam, coupling, leakage, isolation, depth, leverage, locality, adapter, trust boundary,** or **failure domain** are analytical vocabulary; use them only when they clarify the actual relation.

Avoid claims such as “cleaner,” “more maintainable,” “more scalable,” or “best practice” without a source-grounded driver, architecture relation, trade-off, and falsifiable proof.
