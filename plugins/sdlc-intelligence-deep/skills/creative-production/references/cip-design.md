# Corporate Identity Program Direction Method

Use this reference when the parent workflow needs to turn a brand direction into a coherent identity program. The CSV/search corpus owns bundled deliverable/style/industry/mockup lookup; this file owns **selection and coherence logic**.

## Decision method

1. Bind the actual touchpoints the user/project needs. Do not turn the bundled deliverable list into a mandatory checklist.
2. Use `scripts/cip/search.py` to retrieve candidate industry/style/deliverable/mockup evidence only for open decisions.
3. Choose one governing identity expression and test whether logo use, color, typography, material/finish, imagery, and spacing can remain recognizable across the selected touchpoints.
4. Select deliverables by user consequence: recognition, operational use, customer contact, environment, event, or distribution need. Omit artifacts with no consumer.
5. Treat materials/finishes/mockup contexts as brand-expression and stress-test variables, not procurement or production authority. Printer/vendor/project specifications control physical dimensions, color mode, bleed, substrates, accessibility, and fabrication constraints when material.
6. Use mockups to test consistency in representative contexts; do not mistake a photogenic mockup for proof that the system works across all applications.

## Coherence checks

- Primary/secondary marks retain hierarchy and clear-space intent across applications.
- Color and typography roles remain stable even when media/material changes.
- The system can degrade gracefully to constrained contexts (single color, small format, low-production budget).
- Deliverable variations are governed by the same identity logic rather than individually styled one-offs.
- Context-specific adaptations remain recognizable as the same brand.

## Search mechanics

```bash
python3 "<skill-dir>/scripts/cip/search.py" "tech startup" --all
python3 "<skill-dir>/scripts/cip/search.py" "business card letterhead" --domain deliverable
python3 "<skill-dir>/scripts/cip/search.py" "luxury premium elegant" --domain style
python3 "<skill-dir>/scripts/cip/search.py" "hospitality hotel" --domain industry
python3 "<skill-dir>/scripts/cip/search.py" "office reception" --domain mockup
```

Return to the parent workflow with: identity-system direction, selected deliverables/contexts, material/finish rationale when relevant, and the invariants that keep the system coherent. Do not return the whole catalog.
