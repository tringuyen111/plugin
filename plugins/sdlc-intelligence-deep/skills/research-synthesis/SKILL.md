---
name: research-synthesis
description: Synthesize an existing corpus of interviews, surveys, support reports, feedback, and product data into traceable product findings. Use when another Product or Learn workflow must compare, theme, reconcile, or assess confidence across an existing corpus without losing provenance; do not use as a substitute for collecting or verifying missing primary evidence.
---

# Research Synthesis

Turn an existing evidence corpus into findings whose analytical path remains visible. Keep Product Discovery or Learn primary when they own the surrounding decision.

Own synthesis quality. Do not collect missing primary evidence, set Product priority, define acceptance criteria, choose a design, or convert analytical confidence into approval authority.

Use [EVIDENCE-CONTRACT.md](EVIDENCE-CONTRACT.md) as the projection contract. Read [SYNTHESIS-METHOD.md](SYNTHESIS-METHOD.md) when the corpus is heterogeneous, cases or segments must be compared, qualitative and quantitative evidence must be integrated, evidence conflicts, analyst interpretation is decision-material, or a finding survives only by ignoring negative cases.

## Establish the analytical frame

Before coding or grouping evidence, establish:

1. **Research question / decision use.** State what the synthesis must help understand. Do not let available fields or familiar themes redefine the question.
2. **Corpus topology.** Identify source types, populations/segments, collection methods, time windows, case boundaries, and evidence-generation lineage.
3. **Analysis unit.** Choose the smallest unit that can answer the question: participant/case, task, event, segment, source, metric, or another explicit unit. Do not compare unlike units as peers.
4. **Comparability.** Decide which cases, segments, periods, or measures can be compared directly and which require separate treatment.
5. **Analytical shape.** Choose the cheapest method that can discriminate the question:
   - lightweight pattern synthesis for a small coherent round;
   - case-by-dimension comparison when comparable cases/segments matter;
   - iterative code/theme development for exploratory pattern or meaning questions;
   - mixed-evidence integration when qualitative and quantitative or otherwise heterogeneous evidence must be related.

Do not force every corpus through one named research framework. Methodological rigor comes from fit between question, evidence, analytical assumptions, and claims.

## Synthesis loop

1. **Inventory evidence and lineage.** Record source identity, collection context, represented population, method, limitations, and dependency on other sources. Multiple reports derived from one evidence-generation process are not independent corroboration.
2. **Extract before interpreting.** Preserve observations, reported statements, events, and measurements separately from analyst interpretation. Re-check source context when an extract controls a material finding.
3. **Build and revise analytical handles.** Create codes/categories only when they help answer the research question. Give material codes a meaning boundary; split, merge, rename, or discard them when the corpus disproves the boundary. A recurring topic label is not automatically a finding.
4. **Compare at the right level.** When cases are comparable, understand each material case/segment before aggregating across them. Preserve conditions that explain why the same pattern does or does not hold elsewhere.
5. **Pressure candidate findings.** Seek negative/deviant cases, contradictory evidence, and high-impact outliers. Narrow, split, qualify, or retract a finding when contrary evidence changes its scope or mechanism. Frequency is neither importance nor validity by itself.
6. **Integrate evidence deliberately.** Before calling sources reinforcing or conflicting, align the construct/question, population/segment, analysis unit, time window, and measurement meaning. For mixed evidence, state whether one source reinforces, explains, qualifies, contradicts, or is not comparable to another. Never vote-count sources or average unlike evidence into pseudo-certainty.
7. **Construct the finding boundary.** Make each finding answer the research question with a clear scope, source support, contrary evidence, and limitations. Keep descriptive observation, analytical interpretation, causal claim, implication, and recommendation distinct. Do not claim causality unless the evidence design supports it.
8. **Justify confidence and transferability separately.** Explain confidence using the material quality/directness, relevance, adequacy/coverage, coherence, dependency, selection, and methodological limitations of the evidence. Then state where the finding is likely or not known to transfer. Do not manufacture numeric confidence scores or universal sample thresholds.
9. **Expose material interpretive ambiguity.** When analysts can reasonably read the same evidence differently and the difference changes a downstream decision, record the competing interpretations, inspect definitions/source context, seek discriminating evidence, or keep the unresolved interpretation with the qualified research/domain authority. If the same session can obtain the missing evidence, continue there and merge the bounded result back into the synthesis. Do not use analyst majority vote as proof.
10. **Route implications, not decisions.** State what the finding may imply for Product, BA, Design, Engineering, or further research. Preserve the downstream owner's authority to choose priority, scope, behavior, design, or implementation.

## Correction and re-entry

Re-enter at the earliest invalidated step instead of preserving a polished finding:

- source context breaks an extraction -> correct the extraction and dependent codes/findings;
- code/category boundaries overlap or fail examples -> revise the analytical framework;
- a negative case breaks a theme/finding -> narrow, split, qualify, or retract the finding;
- apparent mixed-evidence conflict uses different populations/units/time/constructs -> realign before integration;
- source dependency removes claimed corroboration -> revise confidence and expose the evidence gap;
- an implication exceeds the evidence or owner authority -> return to the finding boundary and reframe it.

## Collection and owner boundary

Require a named or inspectable corpus with enough readable material to support synthesis. If a material claim requires new external, versioned, or primary-source evidence, use `research` as a bounded evidence-acquisition capability when available, then continue the same synthesis with the returned evidence. Keep the affected synthesis `PARTIAL` only while that required evidence remains unresolved.

If the input is one supplied document and the user only asks for a summary, summarize it directly rather than forcing a corpus-synthesis workflow.

## Completion

`READY` requires:

- the research question, corpus topology, analysis unit, and chosen analytical shape are explicit enough to judge the findings;
- every material finding traces to source evidence and keeps observation separate from interpretation;
- negative/conflicting evidence and source dependency are visible rather than suppressed;
- finding scope and transferability do not exceed represented populations/contexts/time;
- confidence has a qualitative rationale tied to the actual evidence and limitations;
- material analyst ambiguity is resolved, bounded, or explicitly unresolved;
- implications remain implications and no unsupported persona, market size, causal claim, priority, or approval is invented.
