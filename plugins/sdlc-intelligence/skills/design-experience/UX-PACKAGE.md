# UX Package Contract

Use the project's selected serialization while preserving these semantics. The package is a composition/index artifact: it links child Design artifacts and unresolved decisions; it must not copy the child artifact's semantic contents into a second source of truth.

```markdown
# UX Package — <scope>

- Package identity:
- Project truth location:
- Package revision / maturity:
- Source Behavior package identity / revision:
- Design owner:

## Journey / information architecture decisions

## User flow artifacts
- <canonical user-flow artifact link / revision>

## Device / channel scope

## Wireframe artifacts
- <canonical wireframe artifact link / revision>

## Usability risks and unresolved Design decisions

## Visual handoff

## Technical handoff
```

`design-experience` owns the package composition/readiness and journey/information-architecture decisions. `/user-flow` and `/wireframe` remain canonical owners of their own artifact semantics. When a child changes, update the link/revision and package readiness; do not reproduce the child content in this package.
