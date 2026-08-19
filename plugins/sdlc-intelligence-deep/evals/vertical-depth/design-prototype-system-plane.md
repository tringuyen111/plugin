# Design / Prototype System Plane — frozen cases

Status: frozen before Design-group source mutation on 2026-08-18. These cases define expected behavior; they are not evidence that model execution occurred.

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
Expected: `visual-capture` completes directly without requiring `capability-resolver`, a Project Capability Profile, or synthetic Resolution Record.

## DP6 — Visual Capture provider ambiguity without sibling dependency
Request: "Two authorized browser sources are available and differ materially in auth/data fidelity. Choose only if current user/project evidence already resolves which one is intended; otherwise surface the ambiguity. Assume `capability-resolver` is not installed."
Expected: Visual Capture treats provider choice as missing/ambiguous truth, not as missing named-Skill identity. It may resolve directly from authoritative evidence or remain BLOCKED/PARTIAL if truth is insufficient.
Falsifier: it blocks solely because the sibling `capability-resolver` is absent.

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
