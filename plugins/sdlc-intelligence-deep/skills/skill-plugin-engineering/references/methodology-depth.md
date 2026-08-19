# Methodology Depth

A strong Skill changes decisions or execution because it teaches a non-obvious mechanism, not because it contains many steps.

## Depth model

Look for the minimum domain/expert knowledge needed to earn the claimed behavioral delta:

- mental model or governing principles;
- decision variables and how they interact;
- trade-offs and selection criteria;
- failure model and counterexamples;
- correction and re-entry logic;
- authority/boundary/completion semantics;
- falsifiable quality expectations;
- deterministic support where exactness or repetition justifies it.

A procedure may be deep through exact ordering and failure recovery. A judgment Skill may be deep through variables, trade-offs, and counterexamples. Do not force the same form onto both.

## Diagnose shallow content

Red flags:

- checklist applies almost unchanged to unrelated domains;
- instructions say **what** to inspect but not **how** findings change the decision;
- headings mirror a template but carry no decision logic;
- examples show only the happy path;
- definitions are extensive but correction behavior is absent;
- validator or conformance status is used as a proxy for domain quality;
- repeated prohibitions substitute for a positive method;
- a long reference adds facts without changing execution.

## Deepening method

For each material decision, ask:

1. What variables actually control this decision?
2. What evidence makes one option better than another?
3. What trade-off prevents a universal answer?
4. What failure pattern would reveal the method is wrong or incomplete?
5. What correction should follow that failure?
6. What can be made deterministic instead of leaving fragile prose?
7. What context must be visible at this exact decision point?

Add only knowledge that changes an answer to one of these questions.

## Counterexample pressure

A mechanism is not credible until it handles cases where the obvious heuristic fails. Include near-miss or adversarial examples such as:

- a long Skill that is coherent and should not be split;
- a short Skill that has a real independent outcome and should remain first-class;
- an adapter proposal that is only a rename wrapper and should be rejected;
- a validator-green package whose behavior is still unexecuted;
- an instruction that is conceptually correct but unreachable when needed;
- a migration that preserves a legacy fallback and therefore has two active truths.

## Falsifiability

State what evidence would make the capability claim weaker or false. If no realistic failure can falsify the claimed improvement, the method is probably too vague to qualify as expert depth.
