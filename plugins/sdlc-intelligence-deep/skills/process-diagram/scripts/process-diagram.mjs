#!/usr/bin/env node
import { createHash } from "node:crypto"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { BPMN_COMPOSITION_METRICS, buildBpmnModel } from "./bpmn.mjs"
import { navigationByPage, normalizeDocumentManifest, resolveDocumentPlanPath, validateDocumentNavigation } from "./document.mjs"
import { FLOWCHART_COMPOSITION_METRICS, buildFlowchartModel } from "./flowchart.mjs"
import { probeDrawioRuntime, renderDrawio, serializeDrawio, serializeDrawioDocument, validateDrawioXml } from "./drawio.mjs"
import { BOUNDARY, actionForBoundary, fail, normalizeFailure } from "./errors.mjs"
import { assertMaterializableRouteSafety, measureEdge, measureEnvelope, measurePair } from "./measure.mjs"

const RECOMPOSE_VERSION = "process-diagram-recompose/v1"
const SIDES = new Set(["west", "east", "north", "south"])

const USAGE = `Usage:
  node scripts/process-diagram.mjs build --plan <plan.json> --out-dir <directory> [--debug]
  node scripts/process-diagram.mjs build-document --manifest <document.json> --out-dir <directory> [--debug]
  node scripts/process-diagram.mjs measure --plan <plan.json> --a <node-id> --b <node-id> --axis <P|Q> [--gutter <px>] [--debug]
  node scripts/process-diagram.mjs measure --plan <plan.json> --nodes <id,id,...> [--gutter <px>] [--debug]
  node scripts/process-diagram.mjs measure --plan <plan.json> --edge <edge-id> [--gutter <px>] [--debug]
  node scripts/process-diagram.mjs recompose --plan <plan.json> --delta <delta.json> --out-plan <plan.json> --out-dir <directory> [--debug]
  node scripts/process-diagram.mjs validate --source <diagram.drawio> [--out <validation.json>] [--debug]
  node scripts/process-diagram.mjs render --source <diagram.drawio> --out <preview.png|svg|pdf> [--page <page-id>] [--debug]
  node scripts/process-diagram.mjs doctor [--debug]
`

function parseArgs(values) {
  const args = {}
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i]
    if (!value.startsWith("--")) throw fail(BOUNDARY.INPUT, "CLI_ARGUMENT_UNEXPECTED", `Unexpected argument '${value}'.`)
    const key = value.slice(2)
    const next = values[i + 1]
    if (next === undefined || next.startsWith("--")) args[key] = true
    else { args[key] = next; i += 1 }
  }
  return args
}

function requiredPath(value, label) {
  if (!value || value === true) throw fail(BOUNDARY.INPUT, "CLI_PATH_REQUIRED", `${label} is required.`)
  const path = resolve(String(value))
  if (!existsSync(path)) throw fail(BOUNDARY.INPUT, "CLI_PATH_NOT_FOUND", `${label} does not exist: ${path}`, { path })
  return path
}

function outputPath(value, label) {
  if (!value || value === true) throw fail(BOUNDARY.INPUT, "CLI_PATH_REQUIRED", `${label} is required.`)
  return resolve(String(value))
}

function readJsonDocument(path) {
  const bytes = readFileSync(path)
  try {
    return { value: JSON.parse(bytes.toString("utf8")), bytes }
  } catch (error) {
    throw fail(BOUNDARY.INPUT, "JSON_INVALID", `Invalid JSON in ${path}: ${error.message}`)
  }
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true })
  return path
}

function jsonText(value) {
  return `${JSON.stringify(value, null, 2)}\n`
}

function writeJson(path, value) {
  ensureDir(dirname(path))
  const text = jsonText(value)
  writeFileSync(path, text, "utf8")
  return text
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex")
}

function stableJson(value) {
  const visit = item => {
    if (Array.isArray(item)) return item.map(visit)
    if (item && typeof item === "object") return Object.fromEntries(Object.keys(item).sort().map(key => [key, visit(item[key])]))
    return item
  }
  return JSON.stringify(visit(value))
}

function errorPacket(error, stage, debug = false) {
  const failure = normalizeFailure(error)
  return {
    status: "failed",
    stage,
    code: failure.code,
    boundary: failure.boundary,
    message: failure.message,
    action: actionForBoundary(failure.boundary),
    ...(debug && failure.details !== undefined ? { debug: failure.details } : {})
  }
}

function resultFailurePacket(result, stage, debug = false) {
  const failure = normalizeFailure(result, {
    boundary: result?.boundary || BOUNDARY.INTERNAL,
    code: result?.code || "PROCESS_DIAGRAM_FAILED",
    message: result?.message || "Process diagram operation failed."
  })
  const debugData = { ...result }
  delete debugData.status
  delete debugData.boundary
  delete debugData.code
  delete debugData.message
  return {
    status: result?.status === "blocked" ? "blocked" : "failed",
    stage,
    code: failure.code,
    boundary: failure.boundary,
    message: failure.message,
    action: actionForBoundary(failure.boundary),
    ...(debug ? { debug: debugData } : {})
  }
}

function buildDiagramModel(input) {
  switch (input?.kind) {
    case "bpmn": return buildBpmnModel(input)
    case "flowchart": return buildFlowchartModel(input)
    default:
      throw fail(BOUNDARY.PLAN_CONTRACT, "DIAGRAM_KIND_UNSUPPORTED", `Unsupported diagram kind '${input?.kind ?? "missing"}'.`, { supported: ["bpmn", "flowchart"] })
  }
}

function materializePlan(input, inputPlanBytes, outDir) {
  const built = buildDiagramModel(input)
  assertMaterializableRouteSafety({ built })
  const xml = serializeDrawio(built.layout)
  const sourceValidation = validateDrawioXml(xml)
  if (sourceValidation.status !== "pass") throw fail(BOUNDARY.DRAWIO_ADAPTER, "GENERATED_SOURCE_INVALID", "Generated Draw.io source failed structural validation.", sourceValidation)

  const sourcePath = resolve(outDir, "diagram.drawio")
  const reportPath = resolve(outDir, "build-report.json")
  writeFileSync(sourcePath, xml, "utf8")
  const report = {
    schemaVersion: "process-diagram-build-report/v2",
    status: "generated",
    kind: built.plan.kind,
    inputPlanSha256: sha256(inputPlanBytes),
    normalizedPlanSha256: sha256(stableJson(built.plan)),
    layoutSha256: sha256(stableJson(built.layout)),
    sourceSha256: sha256(xml),
    nodeCount: built.plan.nodes.length,
    edgeCount: built.plan.edges.length,
    poolCount: built.plan.pools?.length ?? 0,
    laneCount: built.plan.lanes?.length ?? 0,
    page: built.layout.page,
    sourceValidation
  }
  writeJson(reportPath, report)
  return { built, sourcePath, reportPath, report }
}

function buildPacket(stage, materialized, extra = {}) {
  const { report, sourcePath, reportPath } = materialized
  return {
    status: "generated",
    stage,
    ...extra,
    source: sourcePath,
    report: reportPath,
    page: report.page,
    nodes: report.nodeCount,
    edges: report.edgeCount,
    next: "render"
  }
}

function runBuild(args) {
  const planPath = requiredPath(args.plan, "--plan")
  const outDir = ensureDir(outputPath(args["out-dir"], "--out-dir"))
  const document = readJsonDocument(planPath)
  return buildPacket("build", materializePlan(document.value, document.bytes, outDir))
}

function runBuildDocument(args) {
  const manifestPath = requiredPath(args.manifest, "--manifest")
  const outDir = ensureDir(outputPath(args["out-dir"], "--out-dir"))
  const manifestDocument = readJsonDocument(manifestPath)
  const document = normalizeDocumentManifest(manifestDocument.value)
  const builtPages = new Map()

  for (const page of document.pages) {
    const planPath = resolveDocumentPlanPath(manifestPath, page.plan)
    if (!existsSync(planPath)) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_PLAN_NOT_FOUND", `Document page '${page.id}' plan does not exist: ${page.plan}`, { pageId: page.id, plan: page.plan, resolved: planPath })
    const planDocument = readJsonDocument(planPath)
    const built = buildDiagramModel(planDocument.value)
    assertMaterializableRouteSafety({ built })
    builtPages.set(page.id, { page, planPath, planBytes: planDocument.bytes, built })
  }
  validateDocumentNavigation(document, builtPages)
  const linksByPage = navigationByPage(document)
  const pages = document.pages.map(page => ({
    id: page.id,
    name: page.label,
    layout: builtPages.get(page.id).built.layout,
    nodeLinks: linksByPage.get(page.id)
  }))
  const xml = serializeDrawioDocument({ pages })
  const sourceValidation = validateDrawioXml(xml)
  if (sourceValidation.status !== "pass") throw fail(BOUNDARY.DRAWIO_ADAPTER, "GENERATED_DOCUMENT_SOURCE_INVALID", "Generated multi-page Draw.io source failed structural validation.", sourceValidation)

  const sourcePath = resolve(outDir, "diagram.drawio")
  const reportPath = resolve(outDir, "document-build-report.json")
  writeFileSync(sourcePath, xml, "utf8")
  const report = {
    schemaVersion: "process-diagram-document-build-report/v1",
    status: "generated",
    title: document.title,
    inputManifestSha256: sha256(manifestDocument.bytes),
    normalizedDocumentSha256: sha256(stableJson(document)),
    sourceSha256: sha256(xml),
    pageCount: document.pages.length,
    navigationCount: document.navigation.length,
    pages: document.pages.map((page, index) => {
      const material = builtPages.get(page.id)
      return {
        index: index + 1,
        id: page.id,
        label: page.label,
        plan: page.plan,
        inputPlanSha256: sha256(material.planBytes),
        normalizedPlanSha256: sha256(stableJson(material.built.plan)),
        layoutSha256: sha256(stableJson(material.built.layout)),
        nodes: material.built.plan.nodes.length,
        edges: material.built.plan.edges.length
      }
    }),
    sourceValidation
  }
  writeJson(reportPath, report)
  return {
    status: "generated",
    stage: "build-document",
    source: sourcePath,
    report: reportPath,
    pages: report.pages.map(page => ({ index: page.index, id: page.id, label: page.label, nodes: page.nodes, edges: page.edges })),
    navigation: document.navigation,
    next: "render each page with --page <page-id> and inspect pixels"
  }
}


function nonNegativeIntegerArg(value, label, fallback = 0) {
  if (value === undefined) return fallback
  if (value === true || !/^(?:0|[1-9][0-9]*)$/.test(String(value))) throw fail(BOUNDARY.INPUT, "CLI_NON_NEGATIVE_INTEGER_REQUIRED", `${label} must be a non-negative integer.`)
  const parsed = Number(value)
  if (!Number.isSafeInteger(parsed)) throw fail(BOUNDARY.INPUT, "CLI_NON_NEGATIVE_INTEGER_REQUIRED", `${label} must be a safe non-negative integer.`)
  return parsed
}

function compositionMetrics(kind) {
  if (kind === "bpmn") return BPMN_COMPOSITION_METRICS
  if (kind === "flowchart") return FLOWCHART_COMPOSITION_METRICS
  throw fail(BOUNDARY.INTERNAL, "MEASURE_KIND_UNSUPPORTED", `No composition metrics are registered for '${kind}'.`)
}

function runMeasure(args) {
  const planPath = requiredPath(args.plan, "--plan")
  const built = buildDiagramModel(readJsonDocument(planPath).value)
  const gutter = nonNegativeIntegerArg(args.gutter, "--gutter")
  const hasNodes = args.nodes !== undefined
  const hasEdge = args.edge !== undefined
  const hasPair = args.a !== undefined || args.b !== undefined || args.axis !== undefined
  const modeCount = Number(hasNodes) + Number(hasEdge) + Number(hasPair)
  if (modeCount > 1) throw fail(BOUNDARY.INPUT, "MEASURE_MODE_CONFLICT", "Use exactly one measure mode: --nodes, --edge, or the --a/--b/--axis pair.")
  if (hasNodes) {
    if (args.nodes === true) throw fail(BOUNDARY.INPUT, "MEASURE_NODE_SET_REQUIRED", "--nodes requires a comma-separated node-id list.")
    const nodeIds = String(args.nodes).split(",").map(value => value.trim()).filter(Boolean)
    if (!nodeIds.length) throw fail(BOUNDARY.INPUT, "MEASURE_NODE_SET_REQUIRED", "--nodes requires at least one node id.")
    return measureEnvelope({ built, nodeIds, gutter })
  }
  if (hasEdge) {
    if (args.edge === true) throw fail(BOUNDARY.INPUT, "MEASURE_EDGE_ID_REQUIRED", "--edge requires an edge id.")
    return measureEdge({ built, edgeId: String(args.edge), gutter })
  }
  if (!hasPair) throw fail(BOUNDARY.INPUT, "MEASURE_MODE_REQUIRED", "measure requires --nodes, --edge, or the pair --a/--b/--axis.")
  if (!args.a || args.a === true || !args.b || args.b === true || !args.axis || args.axis === true) throw fail(BOUNDARY.INPUT, "MEASURE_PAIR_ARGUMENTS_REQUIRED", "Pair measurement requires --a <node-id> --b <node-id> --axis <P|Q>.")
  return measurePair({ built, metrics: compositionMetrics(built.plan.kind), a: String(args.a), b: String(args.b), axis: String(args.axis), gutter })
}

function objectValue(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw fail(BOUNDARY.COMPOSITION, "RECOMPOSE_OBJECT_REQUIRED", `${label} must be an object.`)
  return value
}

function applyRecomposeDelta(planInput, deltaInput) {
  const plan = objectValue(planInput, "plan")
  const delta = objectValue(deltaInput, "delta")
  if (delta.version !== RECOMPOSE_VERSION) throw fail(BOUNDARY.COMPOSITION, "RECOMPOSE_VERSION_UNSUPPORTED", `delta.version must be '${RECOMPOSE_VERSION}'.`)

  const topKeys = new Set(Object.keys(delta))
  for (const allowed of ["version", "nodes", "edges"]) topKeys.delete(allowed)
  if (topKeys.size) throw fail(BOUNDARY.COMPOSITION, "RECOMPOSE_FIELD_UNSUPPORTED", `Unsupported recomposition field(s): ${[...topKeys].join(", ")}.`)

  const nodeDelta = delta.nodes === undefined ? {} : objectValue(delta.nodes, "delta.nodes")
  const edgeDelta = delta.edges === undefined ? {} : objectValue(delta.edges, "delta.edges")
  if (!Object.keys(nodeDelta).length && !Object.keys(edgeDelta).length) throw fail(BOUNDARY.COMPOSITION, "RECOMPOSE_EMPTY", "Recomposition delta must contain at least one node or edge change.")

  const nodes = Array.isArray(plan.nodes) ? plan.nodes.map(node => ({ ...node })) : []
  const edges = Array.isArray(plan.edges) ? plan.edges.map(edge => ({ ...edge })) : []
  const nodesById = new Map(nodes.map(node => [node.id, node]))
  const edgesById = new Map(edges.map(edge => [edge.id, edge]))
  const touchedNodes = new Set()
  const touchedEdges = new Set()
  let fieldChanges = 0

  for (const [nodeId, patchRaw] of Object.entries(nodeDelta)) {
    const node = nodesById.get(nodeId)
    if (!node) throw fail(BOUNDARY.COMPOSITION, "RECOMPOSE_NODE_UNKNOWN", `Recomposition references unknown node '${nodeId}'.`)
    const patch = objectValue(patchRaw, `delta.nodes.${nodeId}`)
    for (const key of Object.keys(patch)) {
      if (!["stage", "track"].includes(key)) throw fail(BOUNDARY.COMPOSITION, "RECOMPOSE_NODE_FIELD_UNSUPPORTED", `Node recomposition may change only stage/track; '${key}' is not allowed.`, { nodeId, key })
      if (!Number.isSafeInteger(patch[key]) || (key === "stage" && patch[key] < 0)) throw fail(BOUNDARY.COMPOSITION, "RECOMPOSE_NODE_VALUE_INVALID", `${nodeId}.${key} must be ${key === "stage" ? "a non-negative" : "a"} safe integer.`, { nodeId, key, value: patch[key] })
      if (node[key] !== patch[key]) {
        node[key] = patch[key]
        touchedNodes.add(nodeId)
        fieldChanges += 1
      }
    }
  }

  for (const [edgeId, patchRaw] of Object.entries(edgeDelta)) {
    const edge = edgesById.get(edgeId)
    if (!edge) throw fail(BOUNDARY.COMPOSITION, "RECOMPOSE_EDGE_UNKNOWN", `Recomposition references unknown edge '${edgeId}'.`)
    const patch = objectValue(patchRaw, `delta.edges.${edgeId}`)
    for (const key of Object.keys(patch)) {
      if (!["fromSide", "toSide", "corridorTrack"].includes(key)) throw fail(BOUNDARY.COMPOSITION, "RECOMPOSE_EDGE_FIELD_UNSUPPORTED", `Edge recomposition may change only fromSide/toSide/corridorTrack; '${key}' is not allowed.`, { edgeId, key })
      if (["fromSide", "toSide"].includes(key) && patch[key] !== null && (typeof patch[key] !== "string" || !SIDES.has(patch[key]))) throw fail(BOUNDARY.COMPOSITION, "RECOMPOSE_EDGE_SIDE_INVALID", `${edgeId}.${key} must be west/east/north/south or null.`, { edgeId, key, value: patch[key] })
      if (key === "corridorTrack" && patch[key] !== null && !Number.isSafeInteger(patch[key])) throw fail(BOUNDARY.COMPOSITION, "RECOMPOSE_EDGE_CORRIDOR_TRACK_INVALID", `${edgeId}.corridorTrack must be a safe integer or null.`, { edgeId, key, value: patch[key] })
      const before = edge[key] ?? null
      const after = patch[key]
      const changed = before !== after
      if (changed) {
        if (after === null) delete edge[key]
        else edge[key] = after
        touchedEdges.add(edgeId)
        fieldChanges += 1
      }
    }
  }

  if (fieldChanges === 0) throw fail(BOUNDARY.COMPOSITION, "RECOMPOSE_NO_EFFECT", "Recomposition delta does not change the current plan.")
  return { plan: { ...plan, nodes, edges }, changes: { nodes: touchedNodes.size, edges: touchedEdges.size, fields: fieldChanges } }
}

function runRecompose(args) {
  const planPath = requiredPath(args.plan, "--plan")
  const deltaPath = requiredPath(args.delta, "--delta")
  const outPlanPath = outputPath(args["out-plan"], "--out-plan")
  const outDir = ensureDir(outputPath(args["out-dir"], "--out-dir"))
  const revised = applyRecomposeDelta(readJsonDocument(planPath).value, readJsonDocument(deltaPath).value)
  const revisedPlanText = jsonText(revised.plan)
  const materialized = materializePlan(revised.plan, revisedPlanText, outDir)
  ensureDir(dirname(outPlanPath))
  writeFileSync(outPlanPath, revisedPlanText, "utf8")
  return buildPacket("recompose", materialized, { plan: outPlanPath, changes: revised.changes })
}

function runValidate(args) {
  const sourcePath = requiredPath(args.source, "--source")
  const sourceBytes = readFileSync(sourcePath)
  const sourceSha256 = sha256(sourceBytes)
  const validation = validateDrawioXml(sourceBytes.toString("utf8"))
  const report = {
    schemaVersion: "process-diagram-validation-report/v2",
    stage: "validate",
    source: sourcePath,
    sourceSha256,
    ...validation
  }
  if (args.out && args.out !== true) writeJson(resolve(String(args.out)), report)
  if (validation.status !== "pass") {
    const first = validation.errors?.[0] || { boundary: BOUNDARY.DRAWIO_ADAPTER, code: "SOURCE_INVALID", message: "Draw.io source failed structural validation." }
    const packet = errorPacket(fail(first.boundary || BOUNDARY.DRAWIO_ADAPTER, first.code, first.message, report), "validate", Boolean(args.debug))
    packet.source = sourcePath
    packet.sourceSha256 = sourceSha256
    packet.errors = validation.errors?.length || 1
    return packet
  }
  const pages = validation.data?.pages || []
  return { status: "pass", stage: "validate", source: sourcePath, sourceSha256, cells: validation.data?.cellCount ?? null, pages: pages.map(page => ({ index: page.pageIndex, id: page.pageId, name: page.pageName, cells: page.cellCount })), next: pages.length > 1 ? "render each page with --page <page-id>" : "render" }
}

function runDoctor(args) {
  const runtime = probeDrawioRuntime()
  if (runtime.operational) return { status: "pass", stage: "doctor", version: runtime.version || "unknown" }
  if (runtime.available) return resultFailurePacket({ status: "blocked", boundary: BOUNDARY.RENDERER_RUNTIME, code: "DRAWIO_DESKTOP_CLI_UNUSABLE", message: "Draw.io Desktop CLI was discovered but could not execute successfully.", runtime }, "doctor", Boolean(args.debug))
  return resultFailurePacket({ status: "blocked", boundary: BOUNDARY.RENDERER_RUNTIME, code: "DRAWIO_DESKTOP_CLI_MISSING", message: "Draw.io Desktop CLI is not installed or discoverable.", runtime }, "doctor", Boolean(args.debug))
}

function runRender(args) {
  const sourcePath = requiredPath(args.source, "--source")
  const output = outputPath(args.out, "--out")
  ensureDir(dirname(output))
  const sourceBytes = readFileSync(sourcePath)
  const sourceSha256 = sha256(sourceBytes)
  const sourceValidation = validateDrawioXml(sourceBytes.toString("utf8"))
  if (sourceValidation.status !== "pass") {
    const first = sourceValidation.errors?.[0] || { boundary: BOUNDARY.DRAWIO_ADAPTER, code: "SOURCE_INVALID", message: "Refusing to render structurally invalid Draw.io source." }
    throw fail(first.boundary || BOUNDARY.DRAWIO_ADAPTER, first.code, first.message, sourceValidation)
  }
  const pages = sourceValidation.data?.pages || []
  let selectedPage = null
  if (pages.length > 1) {
    if (!args.page || args.page === true) throw fail(BOUNDARY.INPUT, "DRAWIO_PAGE_SELECTION_REQUIRED", "Multi-page Draw.io rendering requires --page <page-id>; refusing to imply whole-document proof by silently exporting page 1.", { pages: pages.map(page => page.pageId) })
    selectedPage = pages.find(page => page.pageId === String(args.page)) || null
    if (!selectedPage) throw fail(BOUNDARY.INPUT, "DRAWIO_PAGE_UNKNOWN", `Unknown Draw.io page id '${args.page}'.`, { pages: pages.map(page => page.pageId) })
  } else if (args.page !== undefined) {
    if (args.page === true) throw fail(BOUNDARY.INPUT, "DRAWIO_PAGE_ID_REQUIRED", "--page requires a page id.")
    selectedPage = pages.find(page => page.pageId === String(args.page)) || null
    if (!selectedPage) throw fail(BOUNDARY.INPUT, "DRAWIO_PAGE_UNKNOWN", `Unknown Draw.io page id '${args.page}'.`, { pages: pages.map(page => page.pageId) })
  }
  const rendered = renderDrawio({ sourcePath, outputPath: output, pageIndex: selectedPage?.pageIndex })
  if (rendered.status !== "rendered") return { ...resultFailurePacket(rendered, "render", Boolean(args.debug)), source: sourcePath, sourceSha256 }
  const renderSha256 = sha256(readFileSync(rendered.outputPath))
  return {
    status: "rendered",
    stage: "render",
    source: sourcePath,
    sourceSha256,
    output: rendered.outputPath,
    renderSha256,
    format: rendered.format,
    bytes: rendered.sizeBytes,
    ...(selectedPage ? { page: { index: selectedPage.pageIndex, id: selectedPage.pageId, name: selectedPage.pageName } } : {}),
    next: "inspect-pixels"
  }
}

function main() {
  const argv = process.argv.slice(2)
  if (!argv.length || ["help", "--help", "-h"].includes(argv[0])) {
    console.log(USAGE)
    process.exitCode = 0
    return
  }
  const command = argv[0]
  let run
  switch (command) {
    case "build": run = runBuild; break
    case "build-document": run = runBuildDocument; break
    case "measure": run = runMeasure; break
    case "recompose": run = runRecompose; break
    case "validate": run = runValidate; break
    case "render": run = runRender; break
    case "doctor": run = runDoctor; break
    default:
      console.log(JSON.stringify(errorPacket(fail(BOUNDARY.INPUT, "COMMAND_UNKNOWN", `Unknown command '${command}'.`), "prepare")))
      process.exitCode = 1
      return
  }
  let args = {}
  try {
    args = parseArgs(argv.slice(1))
    const result = run(args)
    console.log(JSON.stringify(result))
    process.exitCode = ["generated", "measured", "pass", "rendered"].includes(result.status) ? 0 : 1
  } catch (error) {
    console.log(JSON.stringify(errorPacket(error, command, Boolean(args.debug))))
    process.exitCode = 1
  }
}

main()
