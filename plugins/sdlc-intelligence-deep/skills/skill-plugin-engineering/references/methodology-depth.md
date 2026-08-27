# Methodology Depth

A strong Skill changes decisions or execution because it teaches a non-obvious mechanism, not because it contains many steps or many prohibitions.

## Expert completeness law

Keep the accountable outcome narrow enough that ownership is clear, then go deep enough to complete that outcome under material real-world pressure.

```text
narrow accountability
        +
ordinary case
hard / edge case
failure recognition
correction / recovery
adjacent-domain effects on this outcome
completion proof
        =
expert capability depth
```

Adjacent knowledge does not automatically widen ownership. A Backend Skill may need to reason about a Security constraint that changes the backend outcome without claiming Security policy authority. A Skill should stop, compose, or return an unresolved dependency only when the remaining decision truly belongs to another accountable outcome/authority; it should continue all unblocked work it still owns.

## Depth model

Look for the smallest **sufficient** domain/expert knowledge that earns the claimed behavioral delta while covering the accountable outcome under material pressure. “Smallest” removes irrelevant context; it does not mean happy-path minimum:

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
- scope language repeatedly ejects difficult but outcome-material cases to neighboring capabilities;
- a long reference adds facts without changing execution.

### Guardrail-removal test

Temporarily ignore every `do not`, `never`, prohibition, and negative-scope sentence. Ask:

> Does the remaining Skill still teach enough positive HOW to choose well, handle a material failure/edge case, recover, and prove completion better than a generally capable base agent?

If the answer is no, the Skill is governance-heavy but methodologically shallow. Repair the positive mechanism before adding more guardrails.

## Deepening method

For each material decision, ask:

1. What variables actually control this decision?
2. What evidence makes one option better than another?
3. What trade-off prevents a universal answer?
4. What failure pattern would reveal the method is wrong or incomplete?
5. What correction should follow that failure?
6. Which sub-mechanic is truly exact/repeatable enough for a script or schema, and which semantic judgment must remain explicit in Prompt/Context?
7. What context and terminology must be visible at this exact decision point?
8. Which hard/edge/failure cases are still part of this accountable outcome, and what recovery keeps the Skill responsible rather than merely safe?

Add only knowledge that changes an answer to one of these questions.

## Counterexample pressure

A mechanism is not credible until it handles cases where the obvious heuristic fails. Include near-miss or adversarial examples such as:

- a long Skill that is coherent and should not be split;
- a short Skill that has a real independent outcome and should remain first-class;
- an adapter proposal that is only a rename wrapper and should be rejected;
- a validator-green package whose behavior is still unexecuted;
- an instruction that is conceptually correct but unreachable when needed;
- a migration that preserves a legacy fallback and therefore has two active truths.
- a difficult case touched by an adjacent specialty that still belongs to this Skill's outcome and therefore must not be discarded as “out of scope”.

## Minimum HOW + SHOW for judgment

When several plausible readings can lead to different dispositions, a useful demonstration should expose the transfer relation, not just the answer:

```text
EVIDENCE      the concrete signals available
HOW           the variables/relationship/trade-off that interpret them
DISPOSITION   the chosen action/verdict and why the near-miss loses
CORRECTION    the signal that would invalidate the choice and where to re-enter
```

One compact contrastive case is usually enough. Add more only when a distinct failure pattern changes the mechanism.

## Falsifiability

State what evidence would make the capability claim weaker or false. If no realistic failure can falsify the claimed improvement, the method is probably too vague to qualify as expert depth.
