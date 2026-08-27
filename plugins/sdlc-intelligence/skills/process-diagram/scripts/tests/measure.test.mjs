import test from "node:test"
import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import { mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { BPMN_COMPOSITION_METRICS, buildBpmnModel } from "../bpmn.mjs"
import { FLOWCHART_COMPOSITION_METRICS, buildFlowchartModel } from "../flowchart.mjs"
import { assertMaterializableRouteSafety, measureEdge, measureEnvelope, measurePair } from "../measure.mjs"

function flowchartTopToBottom() {
  return buildFlowchartModel({
    version: "process-diagram-plan/v1",
    kind: "flowchart",
    title: "Rotated clearance probe",
    direction: "top-to-bottom",
    nodes: [
      { id: "start", type: "start", label: "Start", stage: 0, track: 0 },
      { id: "a", type: "process", label: "A", stage: 1, track: 0 },
      { id: "b", type: "process", label: "B", stage: 1, track: 2 },
      { id: "end", type: "end", label: "End", stage: 2, track: 0 }
    ],
    edges: [
      { id: "e1", type: "flow", from: "start", to: "a" },
      { id: "e2", type: "flow", from: "a", to: "b" },
      { id: "e3", type: "flow", from: "b", to: "end" }
    ]
  })
}

function flowchartLeftToRight({ processStage = 1, processTrack = 0 } = {}) {
  return buildFlowchartModel({
    version: "process-diagram-plan/v1",
    kind: "flowchart",
    title: "Primary-axis clearance probe",
    direction: "left-to-right",
    nodes: [
      { id: "start", type: "start", label: "Start", stage: 0, track: 0 },
      { id: "process", type: "process", label: "Process", stage: processStage, track: processTrack },
      { id: "end", type: "end", label: "End", stage: 2, track: 0 }
    ],
    edges: [
      { id: "e1", type: "flow", from: "start", to: "process" },
      { id: "e2", type: "flow", from: "process", to: "end" }
    ]
  })
}

function flowchartEdgeProbe({ explicitCorridor = false } = {}) {
  return buildFlowchartModel({
    version: "process-diagram-plan/v1",
    kind: "flowchart",
    title: "Edge trace probe",
    direction: "left-to-right",
    nodes: [
      { id: "start", type: "start", label: "Start", stage: 0, track: 0 },
      { id: "decision", type: "decision", label: "Choose", stage: 1, track: 0 },
      { id: "blocker", type: "process", label: "Blocker", stage: 2, track: 0 },
      { id: "target", type: "process", label: "Target", stage: 3, track: 0 },
      { id: "end", type: "end", label: "End", stage: 4, track: 0 }
    ],
    edges: [
      { id: "s", type: "flow", from: "start", to: "decision" },
      explicitCorridor
        ? { id: "direct", type: "flow", from: "decision", to: "target", label: "Skip", fromSide: "south", toSide: "south", corridorTrack: 2 }
        : { id: "direct", type: "flow", from: "decision", to: "target", label: "Skip" },
      { id: "via", type: "flow", from: "decision", to: "blocker", label: "Use" },
      { id: "join", type: "flow", from: "blocker", to: "target" },
      { id: "finish", type: "flow", from: "target", to: "end" }
    ]
  })
}

function flowchartRendererOwnedProbe() {
  return buildFlowchartModel({
    version: "process-diagram-plan/v1",
    kind: "flowchart",
    title: "Renderer-owned route probe",
    direction: "left-to-right",
    nodes: [
      { id: "start", type: "start", label: "Start", stage: 0, track: 0 },
      { id: "decision", type: "decision", label: "Choose", stage: 1, track: 0 },
      { id: "side", type: "process", label: "Side", stage: 1, track: 2 },
      { id: "end", type: "end", label: "End", stage: 2, track: 0 }
    ],
    edges: [
      { id: "s", type: "flow", from: "start", to: "decision" },
      { id: "side-edge", type: "flow", from: "decision", to: "side", label: "Side" },
      { id: "forward", type: "flow", from: "decision", to: "end", label: "Forward" },
      { id: "side-end", type: "flow", from: "side", to: "end" }
    ]
  })
}

function bpmnWithTwoLanes() {
  return buildBpmnModel({
    version: "process-diagram-plan/v1",
    kind: "bpmn",
    title: "BPMN measurement probe",
    direction: "left-to-right",
    pools: [{ id: "company", label: "Company" }],
    lanes: [
      { id: "laneA", poolId: "company", label: "A" },
      { id: "laneB", poolId: "company", label: "B" }
    ],
    nodes: [
      { id: "start", type: "start", label: "Start", laneId: "laneA", stage: 0, track: 0 },
      { id: "a", type: "task", label: "A", laneId: "laneA", stage: 1, track: 0 },
      { id: "aPeer", type: "task", label: "A peer", laneId: "laneA", stage: 1, track: 2 },
      { id: "b", type: "task", label: "B", laneId: "laneB", stage: 1, track: 0 },
      { id: "end", type: "end", label: "End", laneId: "laneA", stage: 2, track: 0 }
    ],
    edges: [
      { id: "e1", type: "sequence", from: "start", to: "a" },
      { id: "e2", type: "sequence", from: "a", to: "aPeer" },
      { id: "e3", type: "sequence", from: "aPeer", to: "b" },
      { id: "e4", type: "sequence", from: "b", to: "end" }
    ]
  })
}

test("rotated Flowchart Q measurement uses width and reports minimum track delta", () => {
  const built = flowchartTopToBottom()
  const result = measurePair({ built, metrics: FLOWCHART_COMPOSITION_METRICS, a: "a", b: "b", axis: "Q", gutter: 0 })
  assert.equal(result.pair.physicalAxis, "X")
  assert.equal(result.pair.extentAPx, 160)
  assert.equal(result.pair.extentBPx, 160)
  assert.equal(result.logicalControl.field, "track")
  assert.equal(result.logicalControl.gapPx, 110)
  assert.equal(result.logicalControl.minimumDelta, 2)
  assert.equal(result.logicalControl.currentDelta, 2)
  assert.equal(result.logicalControl.currentSignedDelta, 2)
  assert.equal(result.pair.offsetBFromAPx, 220)
  assert.equal(result.pair.clear, true)
})

test("left-to-right P measurement respects leading-edge stage anchoring", () => {
  const built = flowchartLeftToRight()
  const result = measurePair({ built, metrics: FLOWCHART_COMPOSITION_METRICS, a: "start", b: "process", axis: "P", gutter: 80 })
  assert.equal(result.pair.physicalAxis, "X")
  assert.equal(result.pair.clear, true)
  assert.equal(result.logicalControl.currentDelta, 1)
  assert.equal(result.logicalControl.currentSignedDelta, 1)
  assert.equal(result.logicalControl.minimumDelta, 1)
  assert.deepEqual(result.logicalControl.minimumDeltaByOrder, { bAfterA: 1, bBeforeA: 2 })
})

test("P measurement uses B extent when B is before A", () => {
  const built = flowchartLeftToRight()
  const result = measurePair({ built, metrics: FLOWCHART_COMPOSITION_METRICS, a: "process", b: "start", axis: "P", gutter: 80 })
  assert.equal(result.pair.clear, true)
  assert.equal(result.logicalControl.currentSignedDelta, -1)
  assert.equal(result.logicalControl.minimumDelta, 1)
  assert.deepEqual(result.logicalControl.minimumDeltaByOrder, { bAfterA: 2, bBeforeA: 1 })
})

test("top-to-bottom P measurement uses projected height of the leading node", () => {
  const built = buildFlowchartModel({
    version: "process-diagram-plan/v1",
    kind: "flowchart",
    title: "Rotated primary-axis probe",
    direction: "top-to-bottom",
    nodes: [
      { id: "start", type: "start", label: "Start", stage: 0, track: 0 },
      { id: "process", type: "process", label: "Process", stage: 1, track: 0 },
      { id: "decision", type: "decision", label: "Continue?", stage: 2, track: 0 },
      { id: "end", type: "end", label: "End", stage: 3, track: 0 }
    ],
    edges: [
      { id: "e1", type: "flow", from: "start", to: "process" },
      { id: "e2", type: "flow", from: "process", to: "decision" },
      { id: "e3", type: "flow", from: "decision", to: "end", label: "Yes" },
      { id: "e4", type: "flow", from: "decision", to: "process", label: "No" }
    ]
  })
  const result = measurePair({ built, metrics: FLOWCHART_COMPOSITION_METRICS, a: "process", b: "decision", axis: "P", gutter: 145 })
  assert.equal(result.pair.physicalAxis, "Y")
  assert.equal(result.pair.clear, true)
  assert.equal(result.logicalControl.minimumDelta, 1)
  assert.deepEqual(result.logicalControl.minimumDeltaByOrder, { bAfterA: 1, bBeforeA: 2 })
})

test("same-stage P measurement exposes directional minima without choosing order", () => {
  const built = flowchartLeftToRight({ processStage: 0, processTrack: 2 })
  const result = measurePair({ built, metrics: FLOWCHART_COMPOSITION_METRICS, a: "start", b: "process", axis: "P", gutter: 80 })
  assert.equal(result.logicalControl.currentSignedDelta, 0)
  assert.equal(result.logicalControl.minimumDelta, null)
  assert.deepEqual(result.logicalControl.minimumDeltaByOrder, { bAfterA: 1, bBeforeA: 2 })
  assert.match(result.logicalControl.reason, /Agent-owned/)
})

test("BPMN P measurement uses leading-edge extent and preserves Agent-owned order", () => {
  const built = bpmnWithTwoLanes()
  const forward = measurePair({ built, metrics: BPMN_COMPOSITION_METRICS, a: "start", b: "a", axis: "P", gutter: 80 })
  assert.equal(forward.pair.physicalAxis, "X")
  assert.equal(forward.pair.clear, true)
  assert.equal(forward.logicalControl.minimumDelta, 1)
  assert.deepEqual(forward.logicalControl.minimumDeltaByOrder, { bAfterA: 1, bBeforeA: 2 })

  const reverse = measurePair({ built, metrics: BPMN_COMPOSITION_METRICS, a: "a", b: "start", axis: "P", gutter: 80 })
  assert.equal(reverse.logicalControl.currentSignedDelta, -1)
  assert.equal(reverse.logicalControl.minimumDelta, 1)
  assert.deepEqual(reverse.logicalControl.minimumDeltaByOrder, { bAfterA: 2, bBeforeA: 1 })
})

test("BPMN same-band Q measurement exposes 64px task extent over 62px track gap", () => {
  const built = bpmnWithTwoLanes()
  const result = measurePair({ built, metrics: BPMN_COMPOSITION_METRICS, a: "a", b: "aPeer", axis: "Q", gutter: 0 })
  assert.equal(result.pair.physicalAxis, "Y")
  assert.equal(result.pair.requiredCenterGapPx, 64)
  assert.equal(result.logicalControl.gapPx, 62)
  assert.equal(result.logicalControl.minimumDelta, 2)
  assert.equal(result.logicalControl.currentDelta, 2)
})

test("cross-band measurement reports absolute clearance without pretending track is a direct control", () => {
  const built = bpmnWithTwoLanes()
  const result = measurePair({ built, metrics: BPMN_COMPOSITION_METRICS, a: "a", b: "b", axis: "Q", gutter: 20 })
  assert.equal(result.logicalControl.direct, false)
  assert.equal(result.logicalControl.field, null)
  assert.equal(result.logicalControl.minimumDelta, null)
  assert.ok(result.pair.currentCenterGapPx > 0)
})

test("node-set envelope resolves nested BPMN container offsets and adds caller gutter", () => {
  const built = bpmnWithTwoLanes()
  const withoutGutter = measureEnvelope({ built, nodeIds: ["a", "b"], gutter: 0 })
  const withGutter = measureEnvelope({ built, nodeIds: ["a", "b"], gutter: 10 })
  assert.ok(withoutGutter.qSpanPx > 64)
  assert.equal(withGutter.geometry.width, withoutGutter.geometry.width + 20)
  assert.equal(withGutter.geometry.height, withoutGutter.geometry.height + 20)
  assert.equal(withGutter.pSpanPx, withoutGutter.pSpanPx + 20)
  assert.equal(withGutter.qSpanPx, withoutGutter.qSpanPx + 20)
})

test("measurement rejects unknown nodes and duplicate envelope ids", () => {
  const built = flowchartTopToBottom()
  assert.throws(
    () => measurePair({ built, metrics: FLOWCHART_COMPOSITION_METRICS, a: "missing", b: "b", axis: "P", gutter: 0 }),
    error => error?.code === "MEASURE_NODE_UNKNOWN" && error?.boundary === "input"
  )
  assert.throws(
    () => measureEnvelope({ built, nodeIds: ["a", "a"], gutter: 0 }),
    error => error?.code === "MEASURE_NODE_SET_DUPLICATE" && error?.boundary === "input"
  )
})

test("measurement rejects unsupported axes and negative gutters", () => {
  const built = flowchartTopToBottom()
  assert.throws(
    () => measurePair({ built, metrics: FLOWCHART_COMPOSITION_METRICS, a: "a", b: "b", axis: "Z", gutter: 0 }),
    error => error?.code === "MEASURE_AXIS_UNSUPPORTED"
  )
  assert.throws(
    () => measureEnvelope({ built, nodeIds: ["a"], gutter: -1 }),
    error => error?.code === "MEASURE_NON_NEGATIVE_INTEGER_REQUIRED"
  )
})

test("edge trace reports direct aligned obstruction without choosing a repair", () => {
  const built = flowchartEdgeProbe()
  const result = measureEdge({ built, edgeId: "direct", gutter: 0 })
  assert.equal(result.mode, "edge-trace")
  assert.equal(result.edge.labelRole, "branch-condition")
  assert.equal(result.path.mode, "aligned-direct")
  assert.equal(result.path.rendererOwnedInterior, false)
  assert.equal(result.path.clear, false)
  assert.deepEqual(result.path.blockingNodeIds, ["blocker"])
  assert.equal(result.terminalFanout.source.count, 2)
  assert.deepEqual(result.terminalFanout.source.edgeIds, ["direct", "via"])
})

test("materialization safety rejects known aligned ordinary obstruction without choosing a detour", () => {
  const built = flowchartEdgeProbe()
  assert.throws(
    () => assertMaterializableRouteSafety({ built }),
    error => error?.code === "FLOWCHART_ORDINARY_ROUTE_OBSTRUCTED"
      && error?.boundary === "composition"
      && error?.details?.edgeId === "direct"
      && error?.details?.blockingNodeIds?.includes("blocker")
  )
})

test("materialization safety preserves renderer-owned uncertainty for non-aligned ordinary routing", () => {
  const built = flowchartRendererOwnedProbe()
  const result = assertMaterializableRouteSafety({ built })
  assert.equal(result.status, "pass")
  assert.ok(result.checked >= 1)
})

test("materialization safety accepts an explicit clear corridor", () => {
  const built = flowchartEdgeProbe({ explicitCorridor: true })
  const result = assertMaterializableRouteSafety({ built })
  assert.equal(result.status, "pass")
  assert.ok(result.checked >= 1)
})

test("edge trace reports explicit corridor geometry as clear", () => {
  const built = flowchartEdgeProbe({ explicitCorridor: true })
  const result = measureEdge({ built, edgeId: "direct", gutter: 0 })
  assert.equal(result.path.mode, "explicit-waypoints")
  assert.equal(result.path.rendererOwnedInterior, false)
  assert.equal(result.path.clear, true)
  assert.deepEqual(result.path.blockingNodeIds, [])
  assert.ok(result.path.segments.length >= 2)
})

test("edge trace preserves renderer-owned uncertainty for non-aligned ordinary routing", () => {
  const built = flowchartRendererOwnedProbe()
  const result = measureEdge({ built, edgeId: "side-edge", gutter: 0 })
  assert.equal(result.path.mode, "renderer-owned-orthogonal")
  assert.equal(result.path.rendererOwnedInterior, true)
  assert.equal(result.path.points, null)
  assert.equal(result.path.clear, null)
  assert.equal(result.path.blockingNodeIds, null)
})

test("edge trace classifies BPMN message labels and shared target fan-out", () => {
  const built = buildBpmnModel({
    version: "process-diagram-plan/v1",
    kind: "bpmn",
    title: "Message fanout probe",
    direction: "left-to-right",
    pools: [{ id: "a", label: "A" }, { id: "b", label: "B" }],
    lanes: [],
    nodes: [
      { id: "aStart", type: "start", label: "Start", poolId: "a", stage: 0, track: 0 },
      { id: "aSend1", type: "send-task", label: "Send 1", poolId: "a", stage: 1, track: 0 },
      { id: "aSend2", type: "send-task", label: "Send 2", poolId: "a", stage: 1, track: 2 },
      { id: "aEnd", type: "end", label: "End", poolId: "a", stage: 2, track: 0 },
      { id: "bStart", type: "start-message", label: "Receive", poolId: "b", stage: 1, track: 0 },
      { id: "bEnd", type: "end", label: "Done", poolId: "b", stage: 2, track: 0 }
    ],
    edges: [
      { id: "a1", type: "sequence", from: "aStart", to: "aSend1" },
      { id: "a2", type: "sequence", from: "aSend1", to: "aSend2" },
      { id: "a3", type: "sequence", from: "aSend2", to: "aEnd" },
      { id: "b1", type: "sequence", from: "bStart", to: "bEnd" },
      { id: "m1", type: "message", from: "aSend1", to: "bStart", label: "One" },
      { id: "m2", type: "message", from: "aSend2", to: "bStart", label: "Two" }
    ]
  })
  const result = measureEdge({ built, edgeId: "m1", gutter: 0 })
  assert.equal(result.edge.labelRole, "message")
  assert.equal(result.terminalFanout.target.count, 2)
  assert.deepEqual(result.terminalFanout.target.edgeIds, ["m1", "m2"])
})

test("edge trace rejects unknown edge ids", () => {
  const built = flowchartEdgeProbe()
  assert.throws(
    () => measureEdge({ built, edgeId: "missing", gutter: 0 }),
    error => error?.code === "MEASURE_EDGE_UNKNOWN" && error?.boundary === "input"
  )
})

test("build CLI blocks a known direct obstruction while measure CLI still diagnoses it", () => {
  const built = flowchartEdgeProbe()
  const directory = mkdtempSync(join(tmpdir(), "process-diagram-route-gate-"))
  const planPath = join(directory, "plan.json")
  const outDir = join(directory, "out")
  writeFileSync(planPath, `${JSON.stringify(built.plan, null, 2)}\n`, "utf8")
  const cliPath = fileURLToPath(new URL("../process-diagram.mjs", import.meta.url))

  const build = spawnSync(process.execPath, [cliPath, "build", "--plan", planPath, "--out-dir", outDir, "--debug"], { encoding: "utf8" })
  assert.equal(build.status, 1)
  const buildPacket = JSON.parse(build.stdout)
  assert.equal(buildPacket.code, "FLOWCHART_ORDINARY_ROUTE_OBSTRUCTED")
  assert.equal(buildPacket.boundary, "composition")
  assert.deepEqual(buildPacket.debug.blockingNodeIds, ["blocker"])

  const measure = spawnSync(process.execPath, [cliPath, "measure", "--plan", planPath, "--edge", "direct"], { encoding: "utf8" })
  assert.equal(measure.status, 0, measure.stdout || measure.stderr)
  const measurePacket = JSON.parse(measure.stdout)
  assert.equal(measurePacket.path.clear, false)
  assert.deepEqual(measurePacket.path.blockingNodeIds, ["blocker"])
})

test("measure CLI rejects conflicting edge and node-set modes", () => {
  const built = flowchartEdgeProbe()
  const directory = mkdtempSync(join(tmpdir(), "process-diagram-measure-"))
  const planPath = join(directory, "plan.json")
  writeFileSync(planPath, `${JSON.stringify(built.plan, null, 2)}\n`, "utf8")
  const cliPath = fileURLToPath(new URL("../process-diagram.mjs", import.meta.url))
  const result = spawnSync(process.execPath, [cliPath, "measure", "--plan", planPath, "--edge", "direct", "--nodes", "decision,target"], { encoding: "utf8" })
  assert.equal(result.status, 1)
  const packet = JSON.parse(result.stdout)
  assert.equal(packet.code, "MEASURE_MODE_CONFLICT")
  assert.equal(packet.boundary, "input")
})

