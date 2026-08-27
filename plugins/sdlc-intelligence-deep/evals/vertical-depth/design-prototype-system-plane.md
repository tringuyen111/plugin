# Design / Prototype System Plane — frozen cases

Evidence-State: `NOT_RUN`

Freeze-Note: Frozen before Design-group source mutation on 2026-08-18; these cases define expected behavior rather than executed results.

## DP1 — Minimal executable assertion is the best prototype discriminator
Request: "We are unsure whether this state machine can ever transition from PAID back to DRAFT after refund. Build the cheapest runnable prototype that answers only that question."
Expected: `prototype` may use a tiny executable assertion/probe or equally small runner if that is the fastest reliable observation. It must not reject the method merely because it is test-shaped, and it must not grow a production test suite.
Falsifier: the Skill says any prototype with a test is no longer a prototype, or builds a TUI only to satisfy ceremony.

## DP2 — Prototype feedback is evidence, not Design approval
Request: "In the runtime comparison I prefer header B and sidebar C. Capture what we learned; I have not approved a final design yet."
Expected: record the observed preference/learning and route any canonical Design decision to the actual Design authority. Do not claim that the mixed direction is already the approved design.
Falsifier: feedback is rewritten as canonical/approved Design truth.

## DP3 — Static mockup is not runtime Prototype
Request: "Make three static dashboard visual directions so I can choose typography and hierarchy. No runtime behavior is relevant."
Expected: `prototype` should not be the primary capability merely because the user said prototype/mockup colloquially; this is Product Design/static design work.
Falsifier: Prototype activates and creates throwaway runtime code despite no runtime discriminator.

## DP4 — Runtime density/interaction does justify Prototype
Request: "We already have a fixed interaction concept, but we do not know whether it remains understandable with the real authenticated shell, live event density, and responsive behavior."
Expected: Prototype owns the bounded runtime-learning experiment and records the decision rule/evidence/disposition without claiming production readiness.

## DP5 — Visual Capture standalone single-source
Request: "Capture this local HTML page at desktop and mobile, with a required PII mask and manifest. No alternative browser/provider source exists."
Expected: `visual-capture` completes directly without requiring `provider-source-selection`, a Project Capability Profile, or synthetic Resolution Record.

## DP6 — Visual Capture provider ambiguity without sibling dependency
Request: "Two authorized browser sources are available and differ materially in auth/data fidelity. Choose only if current user/project evidence already resolves which one is intended; otherwise surface the ambiguity. Assume `provider-source-selection` is not installed."
Expected: Visual Capture treats provider choice as missing/ambiguous truth, not as missing named-Skill identity. It may resolve directly from authoritative evidence or remain BLOCKED/PARTIAL if truth is insufficient.
Falsifier: it blocks solely because the sibling `provider-source-selection` is absent.

## DP7 — Design Intelligence conflict reconciliation
Input: a concrete app-design question whose top local corpus hits recommend two materially incompatible patterns, plus explicit current project constraints that favor only one.
Expected for first-class Skill KEEP: the Skill must do more than list/search hits; it should reconcile relevance/conflict against project truth, bound provenance/freshness, and return a scoped recommendation without inventing Design approval.
Falsifier: output is materially equivalent to raw ranked records plus paraphrase.

## DP8 — Design Intelligence current-truth conflict
Input: local corpus recommends a stack practice that conflicts with inspected current authoritative framework/project guidance.
Expected: current authoritative truth wins; local corpus remains advisory and the conflict is explicit.

## DP9 — Design Intelligence raw retrieval only
Request: "Show the most relevant local corpus records for keyboard focus/error feedback; do not recommend a design."
Expected: return bounded retrieval/provenance without manufacturing a recommendation/decision.

## DP10 — Design Intelligence standalone advisory job
Request: "Using only the bundled local corpus and these explicit product constraints, advise which of the retrieved patterns best fits this authenticated operations screen. Do not create/approve the design."
Expected for first-class Skill KEEP: complete a bounded advisory judgment without requiring Product Design/Frontend/Review sibling installation; missing source truth is named directly.

## DP11 — Design Intelligence no-match synthesis must not fabricate support
Request: "Using the bundled corpus, synthesize a design recommendation for `zzzxxyyqq nonexistentsignal`, where the original query has no matching product/style/color/landing/typography evidence."
Expected: preserve `NO_MATCH`/bounded insufficiency and do not emit a concrete Design Intelligence recommendation by injecting generic reasoning seeds, styles, colors, typography, or layout defaults as if they were query-supported corpus evidence.
Falsifier: `--design-system` returns a specific recommendation such as Glassmorphism/default colors/Inter/Hero+CTA even though the original query has no corpus support.
## DP12 — Recommendation judgment stays in Skill reasoning
Request: "Use the bundled corpus to advise which pattern best fits this current product context, and show your evidence."
Expected: deterministic code supplies traceable retrieval/provenance/validation mechanics; `design-intelligence` reasoning compares relevant records against current project constraints, names conflicts/limitations, and owns the bounded advisory judgment. No deterministic script, generated MASTER, token source, or persisted design-system artifact becomes a second Design brain.
Falsifier: semantic choice of pattern/style/color/type/motion is delegated to hard-coded synthesis logic rather than reasoned from retrieved evidence and current constraints.

## DP13 — Curated reasoning rows are evidence, not hidden executable authority
Input: local `ui-reasoning.csv` contains category-level pattern/style/decision-rule guidance relevant to the question.
Expected: expose relevant rows through the same traceable local-evidence path (or otherwise make their evidence role explicit) so the Skill can weigh them against project truth. Treat them as `ADVISORY_LOCAL_CORPUS`, not hidden code-owned policy.
Falsifier: the rows influence a recommendation only through opaque hard-coded synthesis, or become canonical Design/Product authority.

## DP14 — Logic prototype uses the cheapest sufficient runtime shape
Request: "We only need to prove whether one state transition is reachable under this exact event sequence. A tiny executable assertion would answer it; no human interaction is needed."
Expected: choose the smallest runnable probe/assertion/module that exposes the declared discriminator. A TUI is optional only when interactive driving itself adds decision evidence; it is not a mandatory Logic-prototype shell.
Falsifier: the Skill builds a terminal UI, keyboard loop, task-runner integration, or portable shell ceremony solely because the Logic branch prescribes that shape.

## DP15 — Prototype evidence requires observed execution, not artifact delivery alone
Request: "Build the prototype and tell me whether the hypothesis survives. You have a runnable local environment."
Expected: the Agent runs the bounded experiment, inspects the discriminating observation, and classifies it against the predeclared decision rule. Human interaction may be part of the experiment when human behavior is the discriminator; if execution is unavailable, report that evidence as NOT_RUN/BLOCKED rather than claiming the question answered.
Falsifier: the Skill merely gives the user a run command, marks the prototype READY, or records a conclusion without observing the required runtime evidence.

## DP16 — UI prototype does not manufacture variant apparatus
Request: "We have one fixed interaction hypothesis. I only need to know whether it remains understandable inside the real authenticated shell with production-like density."
Expected: build the cheapest runtime artifact that preserves the load-bearing shell/data/interaction context. One candidate is valid when no competing UI hypotheses need comparison; no `?variant=` switcher, floating control, or three-variant scaffold is required.
Falsifier: the Skill generates multiple structurally different variants or a shared variant switcher despite the experiment having only one hypothesis/runtime discriminator.

## DP17 — Native discovery owns capability continuation
Input: the bound question turns out to be static visual hierarchy rather than runtime uncertainty, or a finished implementation now needs critique.
Expected: stop Prototype, return the bounded unresolved/design-review concern and preserve current evidence. Host-native discovery/invocation selects any subsequent capability; Prototype does not encode `/product-design`, `/design-review`, `/implement`, or another named Skill as a runtime route.
Falsifier: Prototype prescribes a next-Skill command/route as if it owns Plugin routing.

## DP18 — Same-session continuation is not a Handoff by default
Input: the prototype answered its question and the learned invariant should continue into ordinary design/spec/implementation work in the same session, with canonical evidence already available.
Expected: preserve the bounded learning/prototype reference and continue through the owning work when applicable without manufacturing a Handoff artifact. Use the dedicated Handoff contract only for a real owner/agent/session/runtime transfer that needs unrecoverable continuation state or when policy requires persistence.
Falsifier: ordinary Prototype completion is described as `hand it over`/handoff ceremony solely because another capability becomes relevant.
