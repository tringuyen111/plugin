# Codebase Assimilation

Use this reference when local codebase conventions, ownership, or existing mechanisms can change how the implementation should be shaped.

The goal is not to copy nearby code mechanically. The goal is to understand **how this codebase currently solves this class of problem and why** before adding another mechanism.

## Read the path before designing the patch

Trace the smallest representative production path that reaches the requested behavior:

```text
entry/caller -> orchestration/use-case -> domain/state/data boundary -> external/runtime boundary -> consumed result
```

Inspect only the parts that can change the decision. Prefer real callers and runtime paths over folder names or architecture guesses.

## Find representative patterns

Look for a small set of nearby examples that answer concrete questions:

- Where does this kind of responsibility normally live?
- What naming and interface shape do sibling callers already understand?
- How are errors, absence, retries, cancellation, or invalid state represented?
- Who owns mutable state and durable truth?
- Which framework/runtime primitive is already canonical?
- How are dependencies created, configured, and cleaned up?
- What test/proof seam survives refactoring?

One strong representative path is more useful than scanning every similar file.

## Classify what you find

Do not treat "existing" as synonymous with "correct".

| Observed pattern | Use it when | Do not copy it when |
|---|---|---|
| Canonical/shared mechanism | current callers converge on it and its contract fits the requested semantics | its contract cannot express the requirement or current evidence shows it is being replaced |
| Intentional local variation | a real boundary such as trust, lifecycle, deployment, protocol, performance, or ownership explains the difference | the variation only duplicates knowledge because the original seam was inconvenient to inspect |
| Legacy/accidental pattern | only when compatibility requires preserving it for named consumers | known defects, outdated APIs, or historical workarounds would be propagated into new code |
| Missing mechanism | no existing seam fits after inspection | do not invent a new abstraction before checking platform/runtime/dependency primitives and actual reuse pressure |

## Learn codebase-specific judgment

Before mutation, be able to state briefly:

- the production seam being changed;
- the representative pattern(s) inspected;
- which local convention is load-bearing for the patch;
- which nearby pattern was rejected and why, if relevant;
- the proof seam that will show the patch belongs in this codebase rather than merely compiling.

Do not turn this into a permanent report unless a real project artifact needs the information. It is working context for better engineering judgment.

## Contrastive examples

**Good fit:** three sibling handlers delegate the same business decision to one use-case service, share the same typed error mapping, and integration tests assert the public result. Extend that seam rather than implementing the new rule inside one handler.

**Bad copy:** a nearby legacy helper parses local time implicitly and existing callers depend on the bug. Its proximity is not a reason to reuse it for a timezone-safe requirement.

**No premature abstraction:** two files contain similar three-line transforms but no shared change pressure, ownership rule, or independent consumer. Keep the local code until a real shared truth emerges.
