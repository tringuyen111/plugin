import test from "node:test"
import assert from "node:assert/strict"
import { mkdtempSync, writeFileSync, readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { spawnSync } from "node:child_process"
import { normalizeDocumentManifest, resolveDocumentPlanPath, validateDocumentNavigation } from "../document.mjs"
import { validateDrawioXml } from "../drawio.mjs"

function manifest(overrides = {}) {
  return {
    version: "process-diagram-document/v1",
    title: "Overview and detail",
    pages: [
      { id: "overview", label: "Overview", plan: "overview.json" },
      { id: "detail", label: "Detail", plan: "detail.json" }
    ],
    navigation: [{ fromPage: "overview", fromNode: "detailLink", toPage: "detail" }],
    ...overrides
  }
}

function simplePlan(title, nodeId) {
  return {
    version: "process-diagram-plan/v1",
    kind: "flowchart",
    title,
    direction: "left-to-right",
    nodes: [
      { id: "start", type: "start", label: "Start", stage: 0, track: 0 },
      { id: nodeId, type: "process", label: title, stage: 1, track: 0 },
      { id: "end", type: "end", label: "End", stage: 2, track: 0 }
    ],
    edges: [
      { id: "e1", type: "flow", from: "start", to: nodeId },
      { id: "e2", type: "flow", from: nodeId, to: "end" }
    ]
  }
}

function obstructedPlan() {
  return {
    version: "process-diagram-plan/v1",
    kind: "flowchart",
    title: "Obstructed detail",
    direction: "left-to-right",
    nodes: [
      { id: "start", type: "start", label: "Start", stage: 0, track: 0 },
      { id: "decision", type: "decision", label: "Choose", stage: 1, track: 0 },
      { id: "blocker", type: "process", label: "Blocker", stage: 2, track: 0 },
      { id: "target", type: "process", label: "Target", stage: 3, track: 0 },
      { id: "end", type: "end", label: "End", stage: 4, track: 0 }
    ],
    edges: [
      { id: "e1", type: "flow", from: "start", to: "decision" },
      { id: "skip", type: "flow", from: "decision", to: "target", label: "Skip" },
      { id: "use", type: "flow", from: "decision", to: "blocker", label: "Use" },
      { id: "join", type: "flow", from: "blocker", to: "target" },
      { id: "finish", type: "flow", from: "target", to: "end" }
    ]
  }
}

test("document manifest preserves only durable page composition truth", () => {
  const normalized = normalizeDocumentManifest(manifest())
  assert.equal(normalized.version, "process-diagram-document/v1")
  assert.deepEqual(normalized.pages.map(page => page.id), ["overview", "detail"])
  assert.deepEqual(normalized.navigation, [{ fromPage: "overview", fromNode: "detailLink", toPage: "detail" }])
})

test("document manifest rejects duplicate page ids and ambiguous navigation", () => {
  assert.throws(() => normalizeDocumentManifest(manifest({ pages: [
    { id: "overview", label: "Overview", plan: "a.json" },
    { id: "overview", label: "Duplicate", plan: "b.json" }
  ] })), error => error.code === "DOCUMENT_PAGE_ID_DUPLICATE")

  assert.throws(() => normalizeDocumentManifest(manifest({ navigation: [
    { fromPage: "overview", fromNode: "detailLink", toPage: "detail" },
    { fromPage: "overview", fromNode: "detailLink", toPage: "overview" }
  ] })), error => error.code === "DOCUMENT_NAVIGATION_SOURCE_AMBIGUOUS")
})

test("document plan references remain relative to the manifest directory", () => {
  const root = mkdtempSync(join(tmpdir(), "process-diagram-doc-"))
  const manifestPath = join(root, "document.json")
  assert.equal(resolveDocumentPlanPath(manifestPath, "pages/detail.json"), resolve(root, "pages/detail.json"))
  assert.throws(() => resolveDocumentPlanPath(manifestPath, "../outside.json"), error => error.code === "DOCUMENT_PLAN_PATH_ESCAPE")
  assert.throws(() => resolveDocumentPlanPath(manifestPath, resolve(root, "absolute.json")), error => error.code === "DOCUMENT_PLAN_PATH_ABSOLUTE")
})

test("document navigation rejects a node that is not present on the source page", () => {
  const document = normalizeDocumentManifest(manifest())
  const builtPages = new Map([
    ["overview", { built: { plan: { nodes: [{ id: "other" }] } } }],
    ["detail", { built: { plan: { nodes: [{ id: "detail" }] } } }]
  ])
  assert.throws(() => validateDocumentNavigation(document, builtPages), error => error.code === "DOCUMENT_NAVIGATION_SOURCE_NODE_UNKNOWN")
})

test("build-document CLI composes independent page plans and page links", () => {
  const root = mkdtempSync(join(tmpdir(), "process-diagram-build-doc-"))
  const overview = simplePlan("Open detail", "detailLink")
  const detail = simplePlan("Detailed step", "detailStep")
  writeFileSync(join(root, "overview.json"), JSON.stringify(overview), "utf8")
  writeFileSync(join(root, "detail.json"), JSON.stringify(detail), "utf8")
  writeFileSync(join(root, "document.json"), JSON.stringify(manifest()), "utf8")
  const outDir = join(root, "out")
  const cli = resolve(new URL("../process-diagram.mjs", import.meta.url).pathname)
  const result = spawnSync(process.execPath, [cli, "build-document", "--manifest", join(root, "document.json"), "--out-dir", outDir], { encoding: "utf8" })
  assert.equal(result.status, 0, result.stdout || result.stderr)
  const packet = JSON.parse(result.stdout)
  assert.equal(packet.status, "generated")
  assert.equal(packet.pages.length, 2)
  const xml = readFileSync(join(outDir, "diagram.drawio"), "utf8")
  assert.match(xml, /link="data:page\/id,detail"/)
  const validation = validateDrawioXml(xml)
  assert.equal(validation.status, "pass")
  assert.equal(validation.data.pageCount, 2)
})

test("build-document CLI rejects a page with a known aligned ordinary route obstruction", () => {
  const root = mkdtempSync(join(tmpdir(), "process-diagram-build-doc-route-gate-"))
  const overview = simplePlan("Open detail", "detailLink")
  const detail = obstructedPlan()
  writeFileSync(join(root, "overview.json"), JSON.stringify(overview), "utf8")
  writeFileSync(join(root, "detail.json"), JSON.stringify(detail), "utf8")
  writeFileSync(join(root, "document.json"), JSON.stringify(manifest()), "utf8")
  const outDir = join(root, "out")
  const cli = resolve(new URL("../process-diagram.mjs", import.meta.url).pathname)
  const result = spawnSync(process.execPath, [cli, "build-document", "--manifest", join(root, "document.json"), "--out-dir", outDir, "--debug"], { encoding: "utf8" })
  assert.equal(result.status, 1)
  const packet = JSON.parse(result.stdout)
  assert.equal(packet.code, "FLOWCHART_ORDINARY_ROUTE_OBSTRUCTED")
  assert.equal(packet.boundary, "composition")
  assert.equal(packet.debug.edgeId, "skip")
  assert.deepEqual(packet.debug.blockingNodeIds, ["blocker"])
})

