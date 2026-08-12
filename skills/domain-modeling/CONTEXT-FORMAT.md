# Domain Glossary Projection Format

Use this reference when the project has authorized a durable glossary or context artifact. Resolve the canonical store and write authority first. `CONTEXT.md` and `CONTEXT-MAP.md` are supported conventions, not required filenames or locations.

## Minimum semantic structure

```md
# {Context or domain area}

{One or two sentences describing the responsibility and why this boundary exists.}

## Language

**Order**:
{A one or two sentence definition of the domain term.}
_Avoid_: Purchase, transaction

**Invoice**:
A request for payment sent to a customer after delivery.
_Avoid_: Bill, payment request
```

Preserve the same semantics in a wiki, knowledge system, tracker, database, or another project-selected store when Markdown files are not canonical.

## Rules

- **Be opinionated.** Select one canonical term and record material aliases or discouraged alternatives.
- **Keep definitions tight.** Define what the concept means in this domain, not its implementation.
- **Keep implementation detail out.** A glossary is not a spec, scratchpad, class catalog, or architecture approval surface.
- **Record authority and uncertainty.** Do not convert unresolved terminology into canonical truth.
- **Group terms by bounded context or domain area** when the project already recognizes those boundaries.

## One or multiple contexts

Use the project's existing context model when one exists. When no model exists, do not infer a repository-wide structure from filenames alone.

For a single coherent domain area, one glossary artifact may be enough. For multiple bounded contexts, preserve:

- each context's responsibility;
- its canonical language;
- relationships and directional dependencies;
- shared identifiers or value concepts;
- unresolved ownership conflicts.

A Markdown project may express this through a root context map and linked context files, but that is only one projection. If the correct target or context is unclear, keep the result inline and ask the decision owner rather than writing to a guessed location.
