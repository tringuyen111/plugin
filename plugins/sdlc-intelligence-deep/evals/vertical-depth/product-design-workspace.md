# Product Design — Spatial Workspace / Coordinate-Space Pressure Test

Status: FROZEN BEFORE PRODUCT-DESIGN SOURCE MUTATION

## Exact real application binding

- Application: draw.io desktop AppImage 31.1.8 supplied in-session.
- AppImage SHA-256: `19b208eb2b54fd6dda64fbfe403379458f12e1e0265b66c3386d1c021085efa2`.
- Runtime: extracted AppImage under Xvfb, Electron CDP capture; no draw.io source modification.
- Product Design plugin baseline SHA-256: `c7c325d69496dce85af01b69c6ec6238e18c14b6fbdf1935ec9953bc63d161d8`.

## Frozen cases

### PDW1 — Docked chrome collapses around a zoomable canvas

At `1200x800`, draw.io presents left shape library, central diagram viewport, right format inspector, top chrome and bottom page tabs. At `700x400`, both side panels collapse while toolbar affordances remain available.

Expected Product Design reasoning:
- distinguish application chrome from the document/canvas coordinate system;
- preserve access to collapsed capabilities through the actual controls rather than calling absence of docked panels a defect by itself;
- do not treat diagram objects as responsive page content that should reflow because chrome changes.

### PDW2 — Active object falls outside the visible viewport after window-height collapse

Observed runtime geometry before viewport-only correction at `700x400`:
- diagram viewport rect: `[1, 102, 698, 266]`;
- viewport scroll: `[664, 232]`;
- selected shape screen rect: `[301.5, 402.5, 120, 60]` — below the visible diagram viewport;
- selected shape SVG/document rect: `x=964, y=532, w=120, h=60`.

A viewport-only experiment changed only `scrollTop` from `232` to `351` and made the shape visible at screen rect `[301.5, 283.5, 120, 60]`; document/SVG geometry remained exactly `964,532,120,60`.

Expected reasoning:
- bind task locus/current edit subject and the world->viewport transform separately;
- never move canonical document objects merely to compensate for app-chrome/viewport pressure;
- decide whether to preserve viewport anchor/spatial memory or reveal the active subject according to the interaction cause and approved behavior;
- when reveal is warranted, adjust viewport/chrome before document geometry.

### PDW3 — World-anchored context menu is placed in screen space

At `1200x800`, a right-click on the selected shape opens a context menu at screen rect approximately `[593, 346, 257, 454]`, shifted upward to fit the available viewport rather than appearing exactly at the click Y coordinate.

Expected reasoning:
- distinguish the document/world anchor from final screen-space overlay placement;
- project the anchor through the current pan/zoom/viewport transform, then collision-adjust the transient plane in usable screen space;
- do not move the underlying shape to make the menu fit.

### PDW4 — Docked inspector reclaims canvas space

At `700x480`, opening the Format inspector produces a right panel approximately `240px` wide and reduces the diagram viewport accordingly while preserving the document state.

Expected reasoning:
- treat this as a workspace/chrome mode transition, not ordinary page-column responsive layout;
- preserve selection/edit identity and intentionally manage the viewport/task locus;
- distinguish docked chrome geometry from document geometry.

### PDW5 — Menu height pressure

At `700x400`, the Arrange menu uses a constrained scrollable transient plane (`scrollHeight≈423`, `clientHeight≈356`, `maxHeight=350px`) rather than expanding beyond the usable viewport.

Expected reasoning:
- recognize bounded screen-space overlay adaptation;
- preserve option identity/action hierarchy while changing only transient-plane geometry/scroll behavior;
- do not infer that desktop-width rules alone determine the menu mode.

## Falsifier

FAIL if Product Design can describe generic responsive/editor concepts but lacks a representation that prevents these confusions:

1. screen-space application chrome vs viewport vs document/world coordinates;
2. responsive chrome change vs mutation/reflow of canonical document geometry;
3. viewport transform/spatial memory vs active-subject visibility;
4. world-anchored object vs screen-space transient overlay placement.

PASS only when the method makes these distinctions explicit enough to guide a fresh application case without inventing a layout engine or deterministic geometry schema.
