# Projection and merge provenance

## SDLC Intelligence baseline supplied for this merge

Input archive SHA-256:

`d335e7f8c931d1e56a8937631cacf71b1102de7fbee67d3d82a5bfa147148786` (`sdlc-intelligence.zip`)

That supplied portable projection identifies itself as version 0.8.7 and records its historical native 0.7.0 source archive SHA-256 as:

`3aef887eec6d6871488f1acc490438a792e69101c1ef2e18b3336a720c7a77fd`

The supplied archive contains no Git metadata, so branch, HEAD, tag, or commit provenance cannot be independently reconstructed from this package.

## UI/UX plugin source incorporated selectively

Input archive SHA-256:

`abc04a9dc62b73fc3ce9388157dd9982e3669de51bb52584497fa475e23850d0` (`ui-ux-pro-max-codex-native-v1(1).zip`)

Incorporated material is limited to:

- the local UI/UX data/search mechanism, reclassified as `design-intelligence` and stripped of MASTER design-system persistence;
- `creative-production` data, references, and local research helpers under revised SDLC ownership boundaries;
- selected design-token references/helpers under existing `frontend-engineering`;
- an adapted UI registry helper requiring an explicit project-relative registry path.

Not incorporated as autonomous owners: `design-engineering`, duplicate `frontend-engineering`, `verification`, `design-system`, `ui-architecture`, `slides`, and `banner-design`.

The UI/UX archive also contains no Git metadata. Its retained MIT attribution/permission notice is preserved in `THIRD_PARTY_NOTICES.md`; the retained Apache-2.0 ui-styling notice is preserved in `licenses/Apache-2.0.txt`.
