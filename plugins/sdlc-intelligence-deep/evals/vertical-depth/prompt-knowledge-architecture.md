# Prompt / Knowledge Architecture — frozen cases

Evidence-State: `NOT_RUN`


These cases falsify F5 representation/context claims. Structural wording checks are not behavioral proof.

1. **Complex branch hidden in prose** — A Skill contains all branch conditions and consequences somewhere in several paragraphs, but no decision table/tree or equivalent structure exposes which condition selects which action/re-entry. Expected: identify a representation defect even though F4 control presence may technically pass.
2. **Simple invariant over-modeled** — A one-line authority or re-entry invariant is rewritten into a universal YAML/state-machine template with no decision benefit. Expected: reject the extra schema and keep the concise invariant.
3. **Reference with no return contract** — `SKILL.md` says `WHEN` and `TARGET` for a deep reference, but after reading it the Agent has no explicit decision/state/evidence result to integrate. Expected: require a material `RETURN` or classify the load as optional/non-material.
4. **Reference owns mandatory control** — A conditional file contains the only abort/re-entry/completion edge. Expected: F4 defect; move minimum control to `SKILL.md` before optimizing F5 representation.
5. **Competing knowledge representation** — deterministic lookup data and a prose reference independently enumerate the same active taxonomy and can drift. Expected: choose one canonical bundled lookup representation and retain only distinct HOW/SHOW/caveat value in prose.
6. **No universal serialization** — Two Skills have materially different reasoning shapes (simple invariant vs governed lifecycle). Expected: use different faithful representations rather than forcing both into one YAML/JSON schema.
7. **Knowledge widens capability boundary** — A visual-direction Skill loads a useful reference that also contains frontend/presentation implementation mechanics. Expected: keep the visual decision/evidence return, reject the foreign implementation semantics, and route any real implementation need to the proper capability instead of expanding the parent job.

8. **Terminology without a semantic anchor** — A Skill repeatedly uses `frontier`, `binding`, and `closure`, but nearby sections use those words for different things. Expected: promote only decision-material terms into a canonical local Glossary, define each against its nearest confusion, and use the canonical term consistently afterward; do not solve the problem by adding more synonyms.
9. **Judgment compiled into code** — A Skill's provider or architecture choice depends on interpreting intent, trade-offs, evidence strength, and authority, but the author moves the decision into a weighted Python script so it can be unit-tested. Expected: reject the script as the owner of semantic judgment; teach the decision mechanism in Prompt/Context and keep code only for exact sub-mechanics such as validation or normalization.
10. **Glossary inflation** — A simple Skill defines generic words such as `input`, `output`, and `step` in a long glossary even though none of the distinctions alter behavior. Expected: prune decorative terminology; a term earns glossary status only when ambiguity can change trigger, authority, decision, evidence, re-entry, or completion.

Behavioral execution remains `NOT_RUN` until a reproducible model/runtime run exercises these cases on exact revisions.
