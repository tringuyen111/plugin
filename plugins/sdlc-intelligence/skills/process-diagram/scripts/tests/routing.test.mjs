import test from "node:test"
import assert from "node:assert/strict"
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"
import { buildBpmnModel } from "../bpmn.mjs"

function parallelCrossLanePlan({ explicitSides = false } = {}) {
  const edge = (id, from, to, sides = {}) => ({ id, type: "sequence", from, to, ...(explicitSides ? sides : {}) })
  return {
    version: "process-diagram-plan/v1",
    kind: "bpmn",
    title: "Parallel split composition boundary",
    direction: "left-to-right",
    pools: [{ id: "company", label: "Company" }],
    lanes: [
      { id: "it", poolId: "company", label: "IT" },
      { id: "hr", poolId: "company", label: "HR" },
      { id: "fac", poolId: "company", label: "Facilities" }
    ],
    nodes: [
      { id: "start", type: "start", label: "Start", laneId: "hr", stage: 0, track: 0 },
      { id: "fork", type: "gateway-parallel", label: "", laneId: "hr", stage: 1, track: 0 },
      { id: "hrWork", type: "user-task", label: "HR work", laneId: "hr", stage: 3, track: 0 },
      { id: "itWork", type: "service-task", label: "IT work", laneId: "it", stage: 3, track: 0 },
      { id: "facWork", type: "manual-task", label: "Facilities work", laneId: "fac", stage: 3, track: 0 },
      { id: "join", type: "gateway-parallel", label: "", laneId: "hr", stage: 6, track: 0 },
      { id: "end", type: "end", label: "End", laneId: "hr", stage: 7, track: 0 }
    ],
    edges: [
      { id: "e1", type: "sequence", from: "start", to: "fork" },
      edge("hrOut", "fork", "hrWork", { fromSide: "east", toSide: "west" }),
      edge("itOut", "fork", "itWork", { fromSide: "north", toSide: "west" }),
      edge("facOut", "fork", "facWork", { fromSide: "south", toSide: "west" }),
      edge("hrIn", "hrWork", "join", { fromSide: "east", toSide: "west" }),
      edge("itIn", "itWork", "join", { fromSide: "east", toSide: "north" }),
      edge("facIn", "facWork", "join", { fromSide: "east", toSide: "south" }),
      { id: "e8", type: "sequence", from: "join", to: "end" }
    ]
  }
}

function edgeById(built, edgeId) {
  const edge = built.layout.edges.find(candidate => candidate.id === edgeId)
  assert.ok(edge, `missing edge ${edgeId}`)
  return edge
}

test("BPMN rejects plan-level waypoint coordinates instead of silently accepting a routing IR", () => {
  const plan = parallelCrossLanePlan({ explicitSides: true })
  plan.edges.find(edge => edge.id === "itOut").waypoints = [{ x: 400, y: 120 }]
  assert.throws(
    () => buildBpmnModel(plan),
    error => error?.code === "BPMN_EDGE_WAYPOINTS_UNSUPPORTED" && error?.boundary === "composition"
  )
})

test("BPMN ordinary routing remains semantic-agnostic and does not infer gateway-specific fan sides", () => {
  const built = buildBpmnModel(parallelCrossLanePlan())
  for (const edgeId of ["hrOut", "itOut", "facOut", "hrIn", "itIn", "facIn"]) {
    const edge = edgeById(built, edgeId)
    assert.equal(edge.fromSide, "east")
    assert.equal(edge.toSide, "west")
    assert.equal(Object.hasOwn(edge, "waypoints"), false)
  }
})

test("BPMN preserves Agent-selected endpoint faces without deriving them from gateway type or lane index", () => {
  const built = buildBpmnModel(parallelCrossLanePlan({ explicitSides: true }))
  assert.deepEqual(
    ["hrOut", "itOut", "facOut"].map(edgeId => {
      const edge = edgeById(built, edgeId)
      return [edgeId, edge.fromSide, edge.toSide]
    }),
    [
      ["hrOut", "east", "west"],
      ["itOut", "north", "west"],
      ["facOut", "south", "west"]
    ]
  )
  assert.deepEqual(
    ["hrIn", "itIn", "facIn"].map(edgeId => {
      const edge = edgeById(built, edgeId)
      return [edgeId, edge.fromSide, edge.toSide]
    }),
    [
      ["hrIn", "east", "west"],
      ["itIn", "east", "north"],
      ["facIn", "east", "south"]
    ]
  )
})

test("recompose rejects waypoint coordinates as a non-canonical edge field", () => {
  const directory = mkdtempSync(join(tmpdir(), "process-diagram-waypoint-reject-"))
  const planPath = join(directory, "plan.json")
  const deltaPath = join(directory, "delta.json")
  const outPlanPath = join(directory, "next.json")
  writeFileSync(planPath, `${JSON.stringify(parallelCrossLanePlan({ explicitSides: true }), null, 2)}\n`, "utf8")
  writeFileSync(deltaPath, `${JSON.stringify({ version: "process-diagram-recompose/v1", edges: { itOut: { waypoints: [{ x: 400, y: 120 }] } } }, null, 2)}\n`, "utf8")
  const cliPath = fileURLToPath(new URL("../process-diagram.mjs", import.meta.url))
  const result = spawnSync(process.execPath, [cliPath, "recompose", "--plan", planPath, "--delta", deltaPath, "--out-plan", outPlanPath, "--out-dir", join(directory, "out")], { encoding: "utf8" })
  assert.notEqual(result.status, 0)
  assert.match(`${result.stdout}\n${result.stderr}`, /RECOMPOSE_EDGE_FIELD_UNSUPPORTED/)
  assert.throws(() => readFileSync(outPlanPath, "utf8"))
})
