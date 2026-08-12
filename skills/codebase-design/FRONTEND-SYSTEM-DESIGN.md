# Frontend System Design Reference

Read this reference when an approved Visual Contract reports `SHARED` or
`FOUNDATION` UI-system impact, or when a named technical decision concerns a UI
library, component interface, state ownership, token/styling pipeline,
responsive implementation, accessibility primitive, or large-data rendering.

The Visual Contract owns visual meaning. Engineering owns how that meaning is
implemented, shared, tested, migrated, and operated. Do not replace approved
behavior or visual semantics with technical convenience.

## Required source inspection

Inspect the actual frontend runtime before selecting a design:

- framework/runtime and rendering boundaries;
- installed UI libraries and wrappers;
- current token and styling pipeline;
- component catalog, callers, variants, and duplicated patterns;
- route/layout ownership and responsive implementation;
- server state, URL state, local interaction state, form state, and shared client
  state;
- accessibility primitives and test coverage;
- data volume, rendering cost, virtualization, hydration, caching, and failure
  behavior;
- representative tests, stories/previews, screenshots, and runtime evidence.

If these sources are unavailable, return `BLOCKED` or `PARTIAL`; do not select a
library or state manager from preference.

## Decision surfaces

### Library and styling selection

Choose whether to reuse, extend, wrap, replace, or avoid a library based on
approved visual requirements, existing source, accessibility, bundle/runtime
cost, ownership, migration, and rollback. Tool popularity is not evidence.

Define the token and styling pipeline: canonical token source, generated/runtime
representations, theme or mode behavior, validation, and prevention of local
magic values. Preserve primitive, semantic, component, and state-token meaning
from the Visual Contract without forcing identical storage syntax.

### Visual-system delta closure

For every material component/token role whose Visual Contract names a system
disposition or UI-system impact, map that Design truth to an inspectable
technical seam:

- `REUSE` must identify the existing primitive/token/interface and stay inside
  its supported variation surface. If matching the approved contract requires a
  one-off override outside that interface, treat that as evidence that the reuse
  claim or technical seam is wrong; do not normalize the override as local CSS.
- `EXTEND` must name the canonical extension seam, affected callers/surfaces,
  migration/compatibility obligation, and proof that the extension does not
  become a feature-local shadow system.
- `DIVERGE` or `NEW` must preserve the approved reason and ownership boundary;
  shared/foundation semantics require an explicit canonical technical decision,
  not duplicated local tokens/components.
- `CONTAINED` work may remain feature-local only when current approved
  primitives/tokens/interfaces actually cover the required semantics without a
  new shared contract.

If the Visual Contract lacks a material system disposition or conflicts with the
real frontend foundation, keep the design `PARTIAL` and route the missing truth
instead of repairing the gap through one-off styling or component forks.

### Component interfaces and composition

Translate visual component roles into the fewest useful technical modules. A
role may be composition rather than a public component. For every proposed
interface, define:

- callers and reuse scope;
- variants and invariant states;
- controlled versus uncontrolled behavior;
- content and accessibility contract;
- error/loading behavior;
- extension points and forbidden customization;
- test seam and migration path.

Do not mandate Atomic Design or decompose by visual size alone. Prefer semantic
components, reusable patterns, feature surfaces, and page composition only when
they improve locality and leverage.

### State ownership

Classify each state before choosing technology:

- server state;
- URL state;
- local interaction state;
- form state;
- derived state;
- shared client state;
- persisted/offline state.

Name the canonical owner, lifecycle, synchronization, error/retry behavior, and
cross-route scope. Introduce a state manager only when shared client-state
pressure remains after server, URL, local, and derived state are placed
correctly. Do not default to Redux or any equivalent library.

### Layout and responsive implementation

Map responsive capability modes to implementation boundaries: route/layout
ownership, container behavior, grid/flex constraints, container/media queries,
render-versus-hide decisions, navigation persistence, overflow, zoom/reflow,
and input modality. Pixel breakpoints are implementation evidence, not the
source of capability semantics.

### Accessibility primitives

Decide whether focus management, dialogs, menus, live regions, keyboard
navigation, status semantics, reduced motion, or target sizing require reusable
primitives. Prefer verified platform/library primitives when they preserve the
contract; do not recreate them without a demonstrated gap.

### Large-data and runtime behavior

For dense tables, feeds, timelines, or dashboards, evaluate rendering budget,
virtualization, pagination/windowing, measurement, hydration, loading/error
states, and observability. A visually compact design is not proof that 200 or
20,000 items render acceptably.

## Required frontend technical design extension

Add these sections to the normal `codebase-design` artifact:

```markdown
## Visual Contract and UI-system impact
## Existing frontend runtime and design-system inventory
## Library / styling / token-pipeline decision
## Component interfaces and composition
## State ownership and synchronization
## Layout and responsive implementation
## Accessibility primitives
## Large-data, hydration, and performance behavior
## Migration, compatibility, rollback, and design-system debt
## Component, integration, visual, accessibility, and runtime proof
```

## Proof

The proof plan must name representative runtime paths and falsifiable evidence:
component/interface tests, integration behavior, keyboard and accessibility
checks, responsive/content-stress inspection, visual regression, bundle/render
or virtualization evidence when relevant, migration compatibility, failure
signals, and rollback. A clean component tree or attractive screenshot is not
runtime proof.
