# Shared Runtime References

These compact references expose execution-critical SDLC contracts to skills without loading the full maintainer architecture on every invocation.

They are not skills, routers, project state, or provider adapters. A skill links a reference only at the branch where that contract affects a decision.

| Reference | Meaning owner | Maintainer source |
|---|---|---|
| [Workflow result contract](workflow-result-contract.md) | truthful workflow completion | `packaged compact runtime contract` |
| [Role boundary reference](role-boundary-reference.md) | decision ownership and role transitions | `packaged compact runtime contract` |
| [Artifact linking reference](artifact-linking-reference.md) | portable artifact continuity and handoff envelope | `packaged compact runtime contract` |
| [External side-effect policy](external-side-effect-policy.md) | authority for writes, commits, deploys, destructive actions, and communications | `packaged compact runtime contract` plus project policy |
| [Project capability profile reference](project-capability-profile-reference.md) | discovery of project truth, live capabilities, provider resolution, and retention policy | P0 Project Capability Model |
| [Claim challenge contract](claim-challenge-contract.md) | bounded challenge of load-bearing claims and authority/evidence separation | this runtime contract |

The full architecture remains canonical for maintainers. These files own the compact runtime wording used by promoted skills. When the maintainer source changes materially, update the corresponding runtime reference and its evaluation cases in the same batch.
