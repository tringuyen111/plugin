# Process Diagram integration pressure cases

Evidence-State: `NOT_RUN`

Freeze-Note: Frozen before Plugin source integration; these are source/discovery expectations.

| ID | Request | Expected capability truth |
|---|---|---|
| PD1 | "Model our order-fulfillment handoffs as BPMN with pools/lanes and return an editable Draw.io file." | `process-diagram` primary; standalone completion must not require Product Design or another sibling. |
| PD2 | "Turn this troubleshooting decision logic into a flowchart and render it." | `process-diagram` primary; Flowchart executable subset applies. |
| PD3 | "Redesign the checkout screen and responsive states." | `product-design`, not `process-diagram`; a visual artifact alone does not transfer product UI ownership. |
| PD4 | "Build a throwaway runnable interaction to determine whether this state transition works." | `prototype`, not `process-diagram`, unless a process diagram is separately requested as supporting output. |
| PD5 | "Capture a screenshot of this application state with viewport and callouts." | `visual-capture`, not `process-diagram`. |
| PD6 | "Create a campaign poster and social banner." | `creative-production`, not `process-diagram`. |
| PD7 | "Create a UML class diagram for these domain classes." | `process-diagram` must expose that UML is not implemented rather than silently approximating it as BPMN/Flowchart. |
| PD8 | "Write an admin guide and include an editable BPMN workflow for the escalation process." | `user-guide` may own the reader guidance; `process-diagram` may provide bounded diagram depth/output without becoming a mandatory parent or taking documentation ownership. |
| PD9 | Directly invoke `process-diagram` with process requirements and no sibling Skills loaded. | Must perform its accountable process-modeling/diagram job from local Skill instructions/resources plus actual tools/runtime; missing sibling identity is never the blocker. |
| PD10 | Draw.io Desktop is unavailable or unusable. | Preserve process truth and deterministic build/validation evidence, return renderer runtime `BLOCKED`; do not mutate process semantics to hide a runtime failure. |

| PD11 | "The current process meaning is correct; keep working in this session and repair only the rendered connector/spacing defect." | Preserve the current plan/process truth and return only bounded repair continuation state. Do not manufacture a Plugin Handoff artifact merely because the workflow moves from visual diagnosis back to composition/rebuild. |
| PD12 | "Show where responsibility passes from Sales to Fulfillment and make that operational handoff obvious in BPMN." | Preserve `handoff` as legitimate process-domain semantics (responsibility/message/control transfer) when it is part of the modeled business truth; do not erase or rename that domain concept merely because the Plugin also has a Handoff capability. |
