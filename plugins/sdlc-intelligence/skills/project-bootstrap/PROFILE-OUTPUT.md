# Project Bootstrap Output Contract

Use the semantic model in `../../architecture/capabilities/project-capability-profile.schema.json`.

The target project chooses serialization and location. The bootstrap result always names:

- canonical profile location or `INLINE`;
- schema version, exact `profile_revision`, and canonical logical `project.id`;
- truth-location summary;
- live capability observations and unresolved access;
- side-effect policy plus policy authority status/owner/evidence/unresolved fields, and retention;
- assumptions, unresolved authority/policy fields, blockers, evidence bound to the exact profile revision, persistence result, and next owner;
- preserved project-owned `extensions`, validated `extensions.sdlc` engineering-consumer settings, and any migration moves;
- whether an existing instruction file received a bounded profile pointer or remained unchanged.

Do not package a target project's active profile with the reusable skill release.

Do not generate `docs/agents/*` projection files by default. Engineering consumers read the canonical profile and capability resolver directly.
