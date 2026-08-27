export const BOUNDARY = Object.freeze({
  INPUT: "input",
  PLAN_CONTRACT: "plan-contract",
  BPMN_SEMANTICS: "bpmn-semantics",
  FLOWCHART_SEMANTICS: "flowchart-semantics",
  COMPOSITION: "composition",
  DRAWIO_ADAPTER: "drawio-adapter",
  RENDERER_RUNTIME: "renderer-runtime",
  INTERNAL: "internal"
})

const BOUNDARIES = new Set(Object.values(BOUNDARY))

const ACTION = Object.freeze({
  [BOUNDARY.INPUT]: "correct the command or input artifact",
  [BOUNDARY.PLAN_CONTRACT]: "correct the canonical process-diagram plan contract",
  [BOUNDARY.BPMN_SEMANTICS]: "return to BPMN translation/semantic reasoning; do not approximate unsupported meaning",
  [BOUNDARY.FLOWCHART_SEMANTICS]: "return to Flowchart control/decision semantics; use BPMN if participant, message, concurrency, or exception semantics are material",
  [BOUNDARY.COMPOSITION]: "recompose stages/tracks/edge sides or decompose the process without changing process truth",
  [BOUNDARY.DRAWIO_ADAPTER]: "inspect deterministic Draw.io translation/source generation; do not change process semantics",
  [BOUNDARY.RENDERER_RUNTIME]: "repair renderer/runtime or render request; do not change process semantics",
  [BOUNDARY.INTERNAL]: "inspect the implementation defect before changing process truth"
})

export class ProcessDiagramError extends Error {
  constructor(boundary, code, message, details = undefined) {
    if (!BOUNDARIES.has(boundary)) throw new Error(`Unknown process-diagram failure boundary '${boundary}'.`)
    super(message)
    this.name = "ProcessDiagramError"
    this.boundary = boundary
    this.code = code
    if (details !== undefined) this.details = details
  }
}

export function fail(boundary, code, message, details = undefined) {
  return new ProcessDiagramError(boundary, code, message, details)
}

export function assertThat(condition, boundary, code, message, details = undefined) {
  if (!condition) throw fail(boundary, code, message, details)
}

export function normalizeFailure(error, fallback = {}) {
  if (error && BOUNDARIES.has(error.boundary)) {
    return {
      boundary: error.boundary,
      code: error.code || fallback.code || "PROCESS_DIAGRAM_FAILED",
      message: error.message || fallback.message || String(error),
      ...(error.details !== undefined ? { details: error.details } : {})
    }
  }
  return {
    boundary: fallback.boundary || BOUNDARY.INTERNAL,
    code: fallback.code || error?.code || "PROCESS_DIAGRAM_FAILED",
    message: fallback.message || error?.message || String(error),
    ...(error?.details !== undefined ? { details: error.details } : {})
  }
}

export function actionForBoundary(boundary) {
  return ACTION[boundary] || ACTION[BOUNDARY.INTERNAL]
}
