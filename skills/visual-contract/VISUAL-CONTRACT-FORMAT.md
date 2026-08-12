# Visual Contract Format

```markdown
# VD-<id> — <name>

## Status and owner
- Maturity: DRAFT | REVIEWED | APPROVED | SUPERSEDED
- Design owner:
- Approval owner:
- Version / date:
- Supersedes:

## Source artifacts
- Product outcome / scope:
- Behavior package:
- UX package:
- Current verified UI:
- Design system / brand sources:

## Visual intent
- User problem addressed:
- Hierarchy and reading order:
- Primary / secondary actions:
- Density target:
- Brand or emotional direction:
- Non-goals:

## Surface matrix
| Surface | Behavior state | Responsive capability mode | Content stress | Reference |
|---|---|---|---|---|

## Composition and layout semantics
- Grouping and scanning order:
- Alignment / rhythm / grid relationships:
- Persistent vs contextual regions:
- Progressive disclosure:
- Overflow and long-content behavior:

## Existing UI-system disposition
Use only `REUSE | EXTEND | DIVERGE | REPLACE | NOT_AVAILABLE`.

| System surface | Disposition | Evidence / canonical source | Visual rationale | Scope | Technical owner / open decision |
|---|---|---|---|---|---|
| Tokens | | | | | |
| Typography | | | | | |
| Iconography | | | | | |
| Components | | | | | |
| Layout patterns | | | | | |
| Interaction patterns | | | | | |

## Token intent
| Layer | Existing / proposed role | Meaning | Applies to | Reuse / divergence | Notes |
|---|---|---|---|---|---|
| Primitive token | | | | | |
| Semantic token | | | | | |
| Component token | | | | | |
| State token | | | | | |

## Component role matrix
| Component role | Variants | Visual / interaction states | Density | Content limits | Reuse scope | Accessibility semantics |
|---|---|---|---|---|---|---|

Component roles describe visual/system responsibility. They do not require a
one-role-to-one-code-component mapping.

## Material component anatomy and UI-system conformance
Use this section only for roles/variants where micro-composition can materially
change usability, consistency, reuse, or UI-system truth. Do not expand every
component into a fixed anatomy checklist.

| Role / variant | Verified primitive / pattern / token source | Disposition | Material anatomy invariants | State / target invariants | Content stress | Conformance result / unresolved |
|---|---|---|---|---|---|---|

Material anatomy invariants may include, when relevant: container/enclosure,
text font/line-box relationship, icon optical size/alignment, icon-text gap,
internal spacing, shape/radius/border/surface semantics, and content-driven vs
fixed sizing. State/target invariants may include hover/pressed/focus/disabled,
coarse-pointer target, keyboard/focus affordance, and non-color feedback.

A `REUSE` claim requires inspected evidence for the material role, not visual
similarity. Per-label/manual widths, ad-hoc radius/color/spacing values, or a
visual affordance that does not exist in the verified system are contradiction
signals. Resolve them by proving the current system already supports the role,
classifying an intentional `EXTEND | DIVERGE | REPLACE | NOT_AVAILABLE`, or
recording an explicit exception/debt/open decision. Missing source evidence does
not become inferred conformance.

## Responsive capability modes
| Mode | Information priority | Permitted actions | Composition transformation | Persistence / navigation | Input / content pressure |
|---|---|---|---|---|---|

## State-to-visual mapping
| Approved behavior state | Affected surfaces | Visual / non-color cues | Action availability | Persistence / recovery | Evidence |
|---|---|---|---|---|---|

## Accessibility constraints
- Contrast and non-color meaning:
- Focus order / visible focus:
- Zoom, reflow, and text scaling:
- Target size / input modality:
- Motion / reduced motion:
- Assistive semantics that presentation must expose:

## Exception and design-system debt register
| Item | Type: NEW_PATTERN / ONE_OFF / TEMPORARY_DIVERGENCE / DESIGN_SYSTEM_DEBT | Reason | Owner | Affected surfaces | Review / expiry condition |
|---|---|---|---|---|---|

## UI-system impact
- Impact: NONE | CONTAINED | SHARED | FOUNDATION
- Shared tokens or token semantics:
- Reusable components / patterns:
- Layout or responsive foundation:
- Shared or cross-route state implications:
- UI library / styling foundation implications:
- Accessibility primitive implications:
- Large-data, virtualization, hydration, or runtime-sensitive presentation:
- Frontend technical-design decision required: YES | NO
- Fixed decision question for `/codebase-design`:

## Approved references and accepted differences

## Parity characteristics
- Exact:
- Semantic:
- Approximate:

## Implementation handoff
- Required visual/system invariants:
- Existing contracts to reuse:
- Declared UI-system extensions / divergence / debt:
- Decisions forbidden to infer:
- Required frontend technical-design artifact:
- Content/state fixtures:

## Visual QA handoff
- States and responsive modes:
- Content stress:
- Material anatomy / UI-system conformance checks:
- Visible accessibility checks:
- Exact / semantic / approximate checks:

## Rejected alternatives

## Open decisions
```

The contract records design decisions, not CSS, component props, framework
choice, state-manager choice, or implementation instructions. Tool-specific node
IDs, Figma links, or image paths may be attached without becoming the only
readable source of truth.
