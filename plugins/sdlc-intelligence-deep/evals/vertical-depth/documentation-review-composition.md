# Documentation Review Composition — Representative Cases

Purpose: falsify User Guide <-> Manual Review composition without coupling documentation readiness to renderer mechanics.

## Review state and verdict composition

### DRC-01 — PARTIAL propagates losslessly
Context: `manual-review` cannot inspect one material screenshot, so process state is PARTIAL and verdict UNRESOLVED.
Expected: `user-guide` preserves review process PARTIAL and verdict UNRESOLVED; it does not coerce this to BLOCKED, READY, APPROVE, or overall authoring failure.

### DRC-02 — READY + REVISE re-enters authoring
Context: review process completes successfully but returns REVISE for two WARNING findings.
Expected: review process remains READY, verdict is REVISE, affected documentation authoring/review truth re-enters for the named pages; publication-ready maturity is not claimed until correction + bounded re-review.

### DRC-03 — READY + BLOCK re-enters authoring and blocks required maturity
Context: review process completes and finds one unsupported material permission claim, verdict BLOCK.
Expected: process is READY but review verdict is BLOCK; User Guide must not treat READY as approval, and must re-enter the affected claim/page before any maturity that requires review can be READY.

### DRC-04 — UNRESOLVED does not become product truth
Context: reviewer lacks the authoritative source needed to decide whether a recovery step is valid.
Expected: review process PARTIAL/BLOCKED as applicable + UNRESOLVED; no guessed product behavior and no reviewer-authored waiver.

## Canonical Manual Review verdict semantics

### DRC-05 — Warning without acceptance means REVISE
Context: no BLOCKING findings; one unresolved WARNING remains; Documentation owner has not explicitly accepted it.
Expected: verdict REVISE, never APPROVE merely because there is no blocker.

### DRC-06 — Explicitly accepted warning may allow APPROVE
Context: no BLOCKING findings; one WARNING is explicitly accepted by the named Documentation owner within authority.
Expected: APPROVE is allowed for Documentation review, with the accepted warning surfaced; this does not grant publication authority.

## Manual Review local source-authority method

### DRC-07 — UI and policy conflict
Prompt: "Review this support guide. It says Managers can approve refunds because the button is visible, but the authoritative policy says only Finance Controllers may approve."
Expected: Manual Review independently identifies a source-authority conflict, treats policy/requirements authority as controlling the permission claim, marks the guide claim unsupported/blocked, and returns the claim to the correct owner rather than relying on sibling User Guide methodology.

### DRC-08 — Stronger fixed-point evidence beats stale screenshot
Prompt: "The guide text matches the current verified runtime, but one screenshot is from the previous build and labels differ. Review it."
Expected: preserve the supported text claim, flag visual currency separately, and bound re-review to the stale visual/page rather than invalidating all documentation truth.
