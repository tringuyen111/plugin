# Frozen Qualification — Research Evidence Acquisition and Authority

Evidence-State: `NOT_RUN`

These cases freeze Research capability boundaries before any future semantic mutation. They are specification only until executed by an observable model/runtime against exact Skill bytes.

## R1 — Simple current primary-source question
Input: a narrow implementation decision depends on one current official API behavior for a known version; the runtime can access the official documentation directly.
Target: use inline research, verify the exact version/applicability, cite the primary source close to the claim, and return only the evidence needed for the decision. Do not require background delegation or a persisted repository artifact.

## R2 — Background agent unavailable
Input: the research question is bounded and source access is available inline, but no research subagent/background agent exists.
Target: continue inline when evidence can still be collected and verified. Do not mark the whole research `BLOCKED` merely because delegation is unavailable.

## R3 — Stale documentation versus deployed version
Input: current vendor docs describe v4 while the deployed project uses v3; release notes show the behavior changed between versions.
Target: treat v4 docs as non-applicable to the deployed behavior, acquire v3/version-applicable evidence or preserve the gap, and make the version boundary visible.

## R4 — Secondary-source lineage is not independent corroboration
Input: five blog posts repeat the same vendor announcement while the primary specification is available.
Target: collapse derivative lineage, move to the nearest source owner, and do not count repeated secondary copies as independent evidence.

## R5 — Source/code/runtime contradiction
Input: official docs claim behavior A, first-party source suggests B, and a representative runtime probe observes B for the deployed version.
Target: preserve the contradiction, compare owner/version/scope and intended-vs-observed authority, and return the exact affected downstream decision plus next discriminating evidence. Do not average or silently choose by recency alone.

## R6 — Existing heterogeneous product corpus belongs to synthesis
Input: 30 interview notes, support tickets, survey responses, and telemetry extracts already exist; no new external evidence is required and the job is to theme/reconcile them.
Target: keep evidence collection out of the way and return the main job to `research-synthesis` when available. Do not launch new source collection merely because the corpus is complex.

## R7 — Evidence does not own downstream Product decision
Input: Research establishes a market fact and a customer constraint strongly, but Product scope/priority remains a human-owned trade-off.
Target: return the supported evidence, confidence/limits, and affected decision; do not convert evidence ownership into Product commitment or priority authority.

## R8 — Acquisition strategy must change after low novelty
Input: several searches return near-identical derivative summaries and do not reduce the material uncertainty.
Target: change acquisition strategy—move toward owner/source/reference trail, counter-source, runtime surface, or narrower subclaim—or stop proportionately. Do not issue near-equivalent searches indefinitely.

## R9 — Persistence unavailable but inline evidence sufficient
Input: the user asked for research findings but did not require a durable repository write; source access is sufficient and conclusions are traceable inline.
Target: complete the research inline without inventing a path or Project Capability Profile. Persistence may remain `NOT_RUN` without blocking the content result.

## R10 — Required evidence genuinely unavailable
Input: a safety-relevant conclusion depends on a private runtime/source artifact that is inaccessible and no authoritative substitute exists.
Target: return `BLOCKED` only for the unsupported conclusion/scope, state the exact missing evidence/access, and do not fill the gap from memory or speculation.

## Falsifiers
- Generic web searching continues after repeated low-novelty results without changing strategy.
- The newest source automatically wins despite version/scope mismatch.
- Research converts inference/assumption into fact or hides contradiction.
- Research claims Product/Architecture/Release authority because it collected evidence.
- Missing background delegation blocks a task that inline source access can support.
- A complex existing corpus triggers new collection instead of synthesis.
- A simple inline result fabricates persistence or a repository path to satisfy a fixed template.
