# Frozen Behavioral Qualification Cases — design-review

Evidence-State: `NOT_RUN`

Frozen before any `design-review` source mutation.

## Rubric dimensions
- `FIXED_POINT`: binds exact artifact/version, review question, task/behavior truth, authority basis, states/viewports and accepted differences without relying on filenames or memory.
- `AUTHORITY_DISCIPLINE`: distinguishes approved contract/system/task truth from Design critique judgment and does not invent canonical authority.
- `EVIDENCE_DISCIPLINE`: opens/uses representative evidence, narrows unsupported claims, and treats missing/stale coverage as evidence work rather than a defect.
- `CAUSAL_DIAGNOSIS`: reasons intended relation -> signals -> perception/consequence -> mismatch -> cause scope instead of taste labels or pixel prescriptions.
- `CAUSE_SCOPE`: discriminates LOCAL / REPEATED_PATTERN / SYSTEMIC / UNKNOWN and tests an alternative explanation before broad changes.
- `CORRECTION_COHERENCE`: chooses the smallest coherent Design/system lever and avoids symptom patches.
- `CONTINUATION_OWNERSHIP`: distinguishes Design contract changes, implementation gaps, evidence gaps, and optional refinement; assigns the correct correction owner and re-review target.
- `BOUNDARY_DISCIPLINE`: does not redesign, edit source, issue formal QA/UAT/release acceptance, or absorb capture mechanics.
- `CONTENT_STRESS`: uses material content/state/viewport/localization/repetition pressure when it can invalidate the conclusion.
- `REVIEW_CYCLE`: correction re-enters at the earliest invalid fixed-point/evidence state and reuses still-valid evidence instead of ceremonial full recapture.

## DR1 — Fixed screenshot critique without approved visual contract
A user uploads a screenshot of a production settings page and asks, “Review this UI; what is structurally weak?” There is no approved Figma or Visual Contract, but the user goal, current Product behavior, and Design System are known.

Strong behavior must:
- perform a bounded fixed-artifact Design critique rather than refusing solely because an approved visual contract is absent;
- bind the artifact and current task/system truth as the authority basis that is actually available;
- label parity/contract-conformance claims as unavailable rather than inventing a target;
- keep recommendations as Design-review findings unless the user asks to author a replacement, in which case `product-design` owns that terminal job.

## DR2 — Implementation diverges from approved design
An approved design specifies a persistent primary action and compact comparison table at desktop and tablet. The implemented tablet screenshot hides the action in an overflow menu and turns every row into a large card.

Strong behavior must:
- identify an `IMPLEMENTATION_GAP` against the exact approved reference;
- ground the finding in task/action persistence and comparison relations, not “looks less modern”;
- assign correction to Engineering and define tablet evidence required for re-review;
- avoid silently changing the approved design during review.

## DR3 — Approved design itself creates the problem
The implementation matches the approved Figma exactly, but the approved flow places a destructive account action beside ordinary profile settings with equal hierarchy and no consequence boundary.

Strong behavior must:
- avoid blaming Engineering for exact implementation parity;
- classify the material issue as `CONTRACT_CHANGE` / Design change;
- explain the grouping/consequence relation causally;
- return the change to the accountable Design/Product approval path and define the new reference needed before implementation parity can be re-reviewed.

## DR4 — Stale/mismatched evidence
The reference is v12, screenshots are from an unknown commit, one image is desktop only, and the reported issue is “mobile spacing is broken.”

Strong behavior must:
- keep the material mobile claim as `EVIDENCE_GAP`;
- request only the missing/invalid source/version/viewport evidence;
- not turn stale screenshots into a confirmed defect or require a full ceremonial recapture of unaffected states.

## DR5 — Many symptoms, one possible systemic cause
Six screens show cramped icon-label controls and inconsistent alignment. One shared control primitive may be responsible, but two screens add local wrappers.

Strong behavior must:
- test the strongest alternative explanation before declaring a systemic component defect;
- inspect a representative shared primitive/system basis plus at least one local-wrapper case;
- consolidate only verified shared-cause findings while preserving local exceptions and evidence trails;
- leave scope `UNKNOWN` when evidence cannot discriminate.

## DR6 — Card soup versus under-enclosure
A dense administration page has 14 independent-looking cards. A proposed correction removes every card, leaving controls and operational data directly on the shell background with no perceptible work surface.

Strong behavior must:
- reject both “card per semantic group” and “remove all enclosure” recipes;
- diagnose surface membership, grouping strength, comparison needs, and attention mass;
- recommend the weakest **sufficient** surface/grouping cues, potentially one shared work surface plus quiet internal groups and stronger local enclosure only where semantics justify it;
- avoid prescribing arbitrary shadow/radius/token values without canonical Design truth.

## DR7 — Clean Design review is not QA acceptance
A fixed implementation looks coherent against the reviewed Design reference. The user asks, “So can we call visual QA PASS and release?”

Strong behavior must:
- state that Design Review can report no blocking Design feedback for its reviewed scope;
- not issue QA, UAT, or release acceptance;
- return the acceptance question to the QA/release owner with the exact reviewed evidence/limitations.

## DR8 — Review request turns into redesign
A user starts with “critique this dashboard,” then asks “replace it with a new hierarchy and visual direction.”

Strong behavior must:
- finish or summarize the critique truth that remains useful;
- recognize that the terminal job has changed from review to authoring;
- continue the recomposition/design decision through `product-design` rather than redesigning inside `design-review`.

## DR9 — Localization and responsive stress invalidate a clean screenshot
English desktop screenshots look clean. German 200% text scaling causes action labels to wrap over values and destroys table comparison; no mobile screenshot exists.

Strong behavior must:
- treat typography/content pressure as structural evidence, not polish;
- ground the desktop-scaled issue if inspectable and mark mobile as unreviewed/evidence gap;
- avoid shrinking text or clipping labels merely to preserve the original frame;
- define the smallest responsive/typographic relation to re-review after correction.

## DR10 — Capture only when needed
A review already has exact screenshots with hashes, states, viewports and provenance. A reviewer proposes re-running `visual-capture` “because the workflow says so.”

Strong behavior must:
- reuse valid evidence when it is sufficient for the fixed point;
- invoke `visual-capture` only for missing, stale, invalid, or newly material states/viewports;
- keep capture as evidence mechanics, not a mandatory review stage or judgment owner.


Runtime execution remains `NOT_RUN` until these frozen cases are executed against an actual model/runtime with the final Skill loaded.

# Claim-centered Design Review cohort — frozen before source mutation

These cases extend the original visual/fixed-point cohort. They falsify the broader Design Review job: independently challenge the Design proposition, its reasoning, its projections, and its experienced consequence without stealing authoring, Product, Engineering, or QA authority.

Additional rubric dimensions:
- `CLAIM_RECONSTRUCTION`: reconstructs only the material claim chain from upstream truth/premise through Design decision/model, projection/implementation, and experienced consequence.
- `NODE_CHALLENGE`: tests whether a material premise/decision/model is supported, complete, coherent, and explicit about trade-offs instead of accepting canonical text as automatically correct.
- `EDGE_CHALLENGE`: tests whether one claim actually justifies/specifies/projects/realizes/produces the next relation instead of merely noticing an end symptom.
- `EARLIEST_BREAK`: locates the earliest evidence-supported broken relation and avoids fixing a downstream symptom when an upstream Design error explains it.
- `HYPOTHESIS_DISCRIMINATION`: generates plausible competing causes only when needed, seeks evidence that distinguishes them, and preserves uncertainty when evidence cannot discriminate.
- `AUTHORITY_WITH_CHALLENGE`: may challenge approved Design truth or unsupported upstream premises but never silently rewrites canonical Design/Product truth or claims ownership of upstream resolution.
- `REVIEW_NOT_REDESIGN`: states correction intent, relation, trade-off, or re-open requirement without materializing a replacement design unless the terminal job explicitly moves to Product Design.
- `OUTCOME_REASONING`: can identify an experience failure even when declaration/artifact/implementation are internally consistent, while grounding the claim in actual outcome evidence rather than speculation.

## DR11 — Unsupported upstream premise drives a polished design
Product Design says, “Feature X is a daily task for most users, therefore it belongs in persistent primary navigation.” The design and implementation are polished, but the review packet contains no research, telemetry, requirement, or accountable Product decision supporting the frequency premise.

Strong behavior must:
- reconstruct the dependency `frequency premise -> navigation priority -> persistent visual/space allocation`;
- classify the upstream premise as unsupported at the available evidence level rather than asserting that the premise is false;
- explain which downstream Design decisions depend on that premise and therefore remain challengeable;
- return premise resolution to the accountable Product/research owner instead of silently removing or relocating Feature X.

## DR12 — Correct implementation of a weak Design inference
An approved Design claim says, “Users need fast access to advanced filters, therefore the filter panel must remain permanently open.” Runtime exactly matches the approved design. Evidence confirms users need fast access, but also shows the open panel consumes critical comparison width and the same access can be achieved through an already-supported persistent control plus state preservation.

Strong behavior must:
- distinguish a supported premise from a challengeable inference/decision;
- evaluate the trade-off between access latency, occupied workspace, comparison, and state continuity;
- classify the issue at the Design-claim/decision level, not as an Engineering divergence;
- state the relation that needs reconsideration without authoring a replacement composition.

## DR13 — Design claims conflict with each other
The design principles for a workflow declare both “routine save status must never interrupt task flow” and “every successful save must require explicit acknowledgement.” The artifact uses a blocking modal after every autosave and faithfully implements the second claim.

Strong behavior must:
- detect an internal Design-claim conflict rather than treating the modal only as a visual hierarchy problem;
- identify which decisions cannot simultaneously hold under routine autosave behavior;
- avoid choosing a new canonical policy without accountable authority;
- request/recommend resolution of the conflicting Design truth before polishing the modal.

## DR14 — Omitted recovery state makes the flow incomplete
A destructive bulk operation has carefully designed selection, review, confirmation, pending, and success states. The Product behavior permits partial failure and retry, but no Design artifact covers partial failure, preserved selection, or recovery continuation.

Strong behavior must:
- locate an omission between behavior truth and the Design experience/state model;
- treat missing recovery as a Design-model completeness problem, not merely missing implementation screenshots;
- explain the user consequence of losing continuation/recovery semantics;
- avoid inventing retry behavior that Product truth has not authorized.

## DR15 — Design model is sound; artifact projection is not
The approved interaction model requires tab-local state to survive switching between sections. The design specification states this clearly, but the high-fidelity prototype resets filters and scroll position when the user returns to a tab. No production implementation exists yet.

Strong behavior must:
- preserve the underlying Design-model claim as sound if evidence supports it;
- locate the break at the projection/prototype representation rather than calling the Product behavior wrong;
- define the observable continuity relation that the corrected artifact must demonstrate;
- avoid routing the issue to Frontend Engineering when the implementation does not yet exist.

## DR16 — Visual symptom originates in semantic action classification
A recovery-critical “Restore previous version” action is visually styled and positioned as low-priority metadata because the Design model classified it as an auxiliary action. Typography, spacing, and color tokens are all correctly applied for that auxiliary role.

Strong behavior must:
- distinguish a correct visual realization of the wrong semantic role from a visual styling defect;
- trace the symptom from perception back to action-role classification;
- challenge the Design decision before recommending stronger color/weight/spacing;
- state a correction intent at the role/hierarchy relation without designing the replacement control.

## DR17 — Individually valid components create an emergent page failure
Every dashboard card follows the approved component contract and looks coherent in isolation. A realistic page repeats twelve equally elevated cards, causing all regions to compete equally and destroying scan priority and comparison.

Strong behavior must:
- avoid blaming the component contract solely because every repeated instance uses it;
- reason part -> whole -> part and identify whether composition policy, usage density, or component role breadth creates the emergent failure;
- test at least one plausible alternative cause before escalating to a shared-system change;
- recommend the smallest relation/scope that can restore page hierarchy without shotgun restyling.

## DR18 — Outcome evidence contradicts an apparently coherent design
An account-deletion confirmation flow is internally coherent, matches its approved specification, and is implemented exactly. Repeated usability evidence supplied in the review packet shows users habitually confirm without reading and cannot recover after accidental deletion.

Strong behavior must:
- admit the supplied outcome evidence and challenge the Design claim that the confirmation pattern sufficiently prevents harmful mistakes;
- distinguish `implementation parity` from `Design outcome success`;
- identify recoverability/risk mitigation as the claim that must be reopened without automatically prescribing Undo or another solution;
- avoid presenting external pattern preference as evidence stronger than the supplied outcome evidence.

## DR19 — Approved Design truth can be challenged but not silently replaced
An approved navigation model works for the original product scope. A newly approved Product requirement adds a second workspace whose navigation semantics conflict with the old model. The user asks Design Review whether the approved navigation should remain canonical.

Strong behavior must:
- review the current approved Design against the new governing Product truth;
- state when the approved Design is now inconsistent/incomplete and requires reopening;
- preserve `APPROVED` authority semantics until the accountable owner actually supersedes it;
- not write a replacement navigation model inside the review.

## DR20 — Explicit conformance request is not broad Design Review
The user provides an approved design reference and exact rendered implementation and asks only, “Does this build conform to the approved design? Give PASS/FAIL.” No broader critique or challenge of the Design proposition is requested.

Strong behavior must:
- recognize that the terminal job is Design/visual conformance rather than Design Review;
- continue the PASS/FAIL acceptance question through `verify-quality` with visual-conformance scope;
- not expand the request into a broad critique unless a material contradiction blocks conformance truth;
- preserve any existing Design Review findings as context only, never inherited QA verdicts.

## Continuation / Handoff boundary cohort — frozen before source mutation

## DR21 — Same-session redesign continuation is not a Handoff artifact
A Design Review identifies the exact failed relation and the user immediately asks the same capable session to author the corrected composition. Canonical project sources already contain the review evidence and current Design truth.

Strong behavior must:
- close the review finding at correction intent/re-review target without authoring inside Design Review;
- continue the new terminal authoring job through `product-design` without creating a Handoff artifact merely because the capability changes;
- preserve the review evidence as bounded context rather than turning it into Design approval or Product truth.

## DR22 — Downstream owner/action notes are not a default Handoff section
A material Design Review result needs to record one Product decision to reopen, one Engineering divergence, and a future QA visual-conformance scope. All state is recoverable from the review result and canonical project sources.

Strong behavior must:
- record bounded continuation/owner/re-review notes without labeling the section `Handoff` by default;
- keep each downstream authority separate and avoid inventing a route/orchestration sequence;
- invoke dedicated Handoff semantics only when a real owner/agent/session/runtime transfer needs state that canonical sources cannot safely recover.

## DR23 — Real transfer boundary still permits dedicated Handoff semantics
A different external owner must continue the review correction in another runtime that cannot access the current evidence bundle or reconstruct the discriminating evidence from canonical sources.

Strong behavior must:
- recognize that this is a genuine transfer boundary rather than ordinary capability continuation;
- preserve Design Review's bounded finding/authority and use the dedicated Handoff contract only for the unrecoverable continuation state;
- not redefine every Product Design, Engineering, QA, or evidence-acquisition continuation as Handoff merely because this case qualifies.


Runtime execution remains `NOT_RUN` until both the original and claim-centered cohorts are executed against an actual model/runtime with the final Skill loaded.
