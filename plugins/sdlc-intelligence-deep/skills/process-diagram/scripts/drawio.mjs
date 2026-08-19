import { routeTerminalAssignments } from "./route-geometry.mjs"
import { accessSync, constants, existsSync, statSync } from "node:fs"
import { extname, resolve } from "node:path"
import { spawnSync } from "node:child_process"
import { BOUNDARY, fail } from "./errors.mjs"
import { edgeLabelRole } from "./renderer-roles.mjs"

const RENDER_FORMATS = new Set(["png", "svg", "pdf"])
function sidePoint(side, fraction = 0.5) {
  switch (side) {
    case "west": return { x: 0, y: fraction }
    case "east": return { x: 1, y: fraction }
    case "north": return { x: fraction, y: 0 }
    case "south": return { x: fraction, y: 1 }
    default: return null
  }
}

function roundStyleNumber(value) {
  return Number.isInteger(value) ? value : Number(value.toFixed(3))
}


const DRAWIO_VISUAL = Object.freeze({
  fontFamily: "Helvetica",
  textPrimary: "#1f2937",
  textSecondary: "#475569",
  textEdge: "#334155",
  surfaceActivity: "#eff6ff",
  borderActivity: "#2563eb",
  surfaceStart: "#dcfce7",
  borderStart: "#16a34a",
  surfaceEnd: "#fee2e2",
  borderEnd: "#dc2626",
  surfaceDecision: "#fef9c3",
  borderDecision: "#ca8a04",
  surfaceIo: "#ecfeff",
  borderIo: "#0891b2",
  surfaceNeutral: "#f8fafc",
  borderNeutral: "#64748b",
  borderContainer: "#475569",
  borderLane: "#94a3b8",
  canvas: "#ffffff"
})

const TEXT_ROLE = Object.freeze({
  node: `fontFamily=${DRAWIO_VISUAL.fontFamily};fontColor=${DRAWIO_VISUAL.textPrimary};fontSize=12;`,
  externalNode: `fontFamily=${DRAWIO_VISUAL.fontFamily};fontColor=${DRAWIO_VISUAL.textPrimary};fontSize=11;`,
  pool: `fontFamily=${DRAWIO_VISUAL.fontFamily};fontColor=${DRAWIO_VISUAL.textPrimary};fontSize=12;fontStyle=1;`,
  lane: `fontFamily=${DRAWIO_VISUAL.fontFamily};fontColor=${DRAWIO_VISUAL.textPrimary};fontSize=11;fontStyle=1;`,
  edge: `fontFamily=${DRAWIO_VISUAL.fontFamily};fontColor=${DRAWIO_VISUAL.textEdge};fontSize=11;labelBackgroundColor=${DRAWIO_VISUAL.canvas};labelBorderColor=none;spacing=2;`,
  edgeBranch: `fontFamily=${DRAWIO_VISUAL.fontFamily};fontColor=${DRAWIO_VISUAL.textPrimary};fontSize=11;fontStyle=1;labelBackgroundColor=${DRAWIO_VISUAL.canvas};labelBorderColor=none;spacing=2;`,
  edgeMessage: `fontFamily=${DRAWIO_VISUAL.fontFamily};fontColor=${DRAWIO_VISUAL.textSecondary};fontSize=11;labelBackgroundColor=${DRAWIO_VISUAL.canvas};labelBorderColor=none;spacing=2;`
})

const TASK_STYLE_BASE = `shape=mxgraph.bpmn.task2;rectStyle=rounded;size=10;fillColor=${DRAWIO_VISUAL.surfaceActivity};strokeColor=${DRAWIO_VISUAL.borderActivity};strokeWidth=1.5;verticalAlign=middle;align=center;whiteSpace=wrap;html=1;${TEXT_ROLE.node}`
const BPMN_NODE_STYLE = Object.freeze({
  start: `shape=mxgraph.bpmn.event;outline=standard;symbol=general;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=${DRAWIO_VISUAL.surfaceStart};strokeColor=${DRAWIO_VISUAL.borderStart};${TEXT_ROLE.externalNode}`,
  "start-message": `shape=mxgraph.bpmn.event;outline=standard;symbol=message;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=${DRAWIO_VISUAL.surfaceStart};strokeColor=${DRAWIO_VISUAL.borderStart};${TEXT_ROLE.externalNode}`,
  "start-timer": `shape=mxgraph.bpmn.event;outline=standard;symbol=timer;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=${DRAWIO_VISUAL.surfaceStart};strokeColor=${DRAWIO_VISUAL.borderStart};${TEXT_ROLE.externalNode}`,
  end: `shape=mxgraph.bpmn.event;outline=end;symbol=general;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=${DRAWIO_VISUAL.surfaceEnd};strokeColor=${DRAWIO_VISUAL.borderEnd};${TEXT_ROLE.externalNode}`,
  "end-message": `shape=mxgraph.bpmn.event;outline=end;symbol=message;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=${DRAWIO_VISUAL.surfaceEnd};strokeColor=${DRAWIO_VISUAL.borderEnd};${TEXT_ROLE.externalNode}`,
  "end-error": `shape=mxgraph.bpmn.event;outline=end;symbol=error;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=${DRAWIO_VISUAL.surfaceEnd};strokeColor=${DRAWIO_VISUAL.borderEnd};${TEXT_ROLE.externalNode}`,
  "end-terminate": `shape=mxgraph.bpmn.event;outline=end;symbol=terminate;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=${DRAWIO_VISUAL.surfaceEnd};strokeColor=${DRAWIO_VISUAL.borderEnd};${TEXT_ROLE.externalNode}`,
  "intermediate-message": `shape=mxgraph.bpmn.event;outline=catching;symbol=message;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=${DRAWIO_VISUAL.surfaceDecision};strokeColor=${DRAWIO_VISUAL.borderDecision};${TEXT_ROLE.externalNode}`,
  "intermediate-timer": `shape=mxgraph.bpmn.event;outline=catching;symbol=timer;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=${DRAWIO_VISUAL.surfaceDecision};strokeColor=${DRAWIO_VISUAL.borderDecision};${TEXT_ROLE.externalNode}`,
  task: TASK_STYLE_BASE,
  "user-task": `${TASK_STYLE_BASE}taskMarker=user;`,
  "service-task": `${TASK_STYLE_BASE}taskMarker=service;`,
  "manual-task": `${TASK_STYLE_BASE}taskMarker=manual;`,
  "send-task": `${TASK_STYLE_BASE}taskMarker=send;`,
  "receive-task": `${TASK_STYLE_BASE}taskMarker=receive;`,
  subprocess: `shape=mxgraph.bpmn.task2;rectStyle=rounded;size=10;bpmnShapeType=subprocess;container=1;html=1;whiteSpace=wrap;fillColor=${DRAWIO_VISUAL.surfaceActivity};strokeColor=${DRAWIO_VISUAL.borderActivity};strokeWidth=1.5;align=center;verticalAlign=middle;${TEXT_ROLE.node}`,
  "gateway-exclusive": `shape=mxgraph.bpmn.gateway2;gwType=exclusive;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=${DRAWIO_VISUAL.surfaceDecision};strokeColor=${DRAWIO_VISUAL.borderDecision};${TEXT_ROLE.externalNode}`,
  "gateway-parallel": `shape=mxgraph.bpmn.gateway2;gwType=parallel;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=${DRAWIO_VISUAL.surfaceDecision};strokeColor=${DRAWIO_VISUAL.borderDecision};${TEXT_ROLE.externalNode}`,
  "gateway-inclusive": `shape=mxgraph.bpmn.gateway2;outline=end;symbol=general;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=${DRAWIO_VISUAL.surfaceDecision};strokeColor=${DRAWIO_VISUAL.borderDecision};${TEXT_ROLE.externalNode}`
})

const FLOWCHART_NODE_STYLE = Object.freeze({
  start: `rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=${DRAWIO_VISUAL.surfaceStart};strokeColor=${DRAWIO_VISUAL.borderStart};strokeWidth=1.5;align=center;verticalAlign=middle;${TEXT_ROLE.node}`,
  end: `rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=${DRAWIO_VISUAL.surfaceEnd};strokeColor=${DRAWIO_VISUAL.borderEnd};strokeWidth=2;align=center;verticalAlign=middle;${TEXT_ROLE.node}`,
  process: `rounded=0;whiteSpace=wrap;html=1;fillColor=${DRAWIO_VISUAL.surfaceActivity};strokeColor=${DRAWIO_VISUAL.borderActivity};strokeWidth=1.5;align=center;verticalAlign=middle;${TEXT_ROLE.node}`,
  decision: `rhombus;whiteSpace=wrap;html=1;fillColor=${DRAWIO_VISUAL.surfaceDecision};strokeColor=${DRAWIO_VISUAL.borderDecision};strokeWidth=1.5;align=center;verticalAlign=middle;${TEXT_ROLE.node}`,
  "input-output": `shape=parallelogram;perimeter=parallelogramPerimeter;fixedSize=1;whiteSpace=wrap;html=1;fillColor=${DRAWIO_VISUAL.surfaceIo};strokeColor=${DRAWIO_VISUAL.borderIo};strokeWidth=1.5;align=center;verticalAlign=middle;${TEXT_ROLE.node}`,
  document: `shape=document;whiteSpace=wrap;html=1;boundedLbl=1;fillColor=${DRAWIO_VISUAL.surfaceNeutral};strokeColor=${DRAWIO_VISUAL.borderNeutral};strokeWidth=1.5;align=center;verticalAlign=middle;${TEXT_ROLE.node}`
})

const EDGE_STYLE = Object.freeze({
  sequence: `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;endArrow=blockThin;endFill=1;strokeColor=${DRAWIO_VISUAL.borderContainer};strokeWidth=1.5;`,
  message: `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;dashed=1;dashPattern=8 4;endArrow=blockThin;endFill=1;startArrow=oval;startFill=0;endSize=6;startSize=4;strokeColor=${DRAWIO_VISUAL.borderContainer};strokeWidth=1.5;`,
  flow: `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;jumpStyle=arc;jumpSize=6;html=1;endArrow=blockThin;endFill=1;strokeColor=${DRAWIO_VISUAL.borderContainer};strokeWidth=1.5;`
})

const EDGE_LABEL_STYLE = Object.freeze({
  none: "",
  route: TEXT_ROLE.edge,
  "branch-condition": TEXT_ROLE.edgeBranch,
  message: TEXT_ROLE.edgeMessage
})

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function attrs(values) {
  return Object.entries(values)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}="${escapeXml(value)}"`)
    .join(" ")
}

function geometryXml(geometry, { relative = false } = {}) {
  return `<mxGeometry ${attrs({ x: geometry?.x, y: geometry?.y, width: geometry?.width, height: geometry?.height, relative: relative ? 1 : undefined, as: "geometry" })}/>`
}

function vertexXml(cell) {
  const linked = Boolean(cell.link)
  const nested = `<mxCell ${attrs({ id: linked ? undefined : cell.id, value: linked ? undefined : cell.value, style: cell.style, vertex: 1, parent: cell.parent })}>${geometryXml(cell.geometry)}</mxCell>`
  if (!linked) return nested
  return `<object ${attrs({ id: cell.id, label: cell.value, link: cell.link })}>${nested}</object>`
}

function edgeGeometryXml(waypoints, labelAnchor = null) {
  const hasWaypoints = Array.isArray(waypoints) && waypoints.length > 0
  if (!hasWaypoints && !labelAnchor) return geometryXml({}, { relative: true })
  const points = hasWaypoints
    ? `<Array as="points">${waypoints.map(point => `<mxPoint ${attrs({ x: point.x, y: point.y })}/>`).join("")}</Array>`
    : ""
  const offset = labelAnchor ? '<mxPoint as="offset"/>' : ""
  return `<mxGeometry ${attrs({ x: labelAnchor?.x, y: labelAnchor?.y, relative: 1, as: "geometry" })}>${points}${offset}</mxGeometry>`
}

function edgeXml(edge) {
  return `<mxCell ${attrs({ id: edge.id, value: edge.value, style: edge.style, edge: 1, parent: edge.parent, source: edge.source, target: edge.target })}>${edgeGeometryXml(edge.waypoints, edge.labelAnchor)}</mxCell>`
}

function pageDimension(value, label) {
  const dimension = Number(value)
  if (!Number.isFinite(dimension) || dimension <= 0) throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_PAGE_DIMENSION_INVALID", `${label} must be a positive finite number.`)
  return Math.ceil(dimension)
}

function poolStyle(headerSize, direction) {
  const horizontal = direction === "top-to-bottom" ? 1 : 0
  return `swimlane;html=1;startSize=${headerSize};collapsible=0;horizontal=${horizontal};fillColor=${DRAWIO_VISUAL.surfaceNeutral};swimlaneFillColor=${DRAWIO_VISUAL.canvas};strokeColor=${DRAWIO_VISUAL.borderContainer};strokeWidth=2;whiteSpace=wrap;${TEXT_ROLE.pool}`
}

function laneStyle(headerSize, direction) {
  const horizontal = direction === "top-to-bottom" ? 1 : 0
  return `swimlane;html=1;startSize=${headerSize};collapsible=0;horizontal=${horizontal};fillColor=${DRAWIO_VISUAL.surfaceNeutral};swimlaneFillColor=${DRAWIO_VISUAL.canvas};strokeColor=${DRAWIO_VISUAL.borderLane};strokeWidth=1.5;whiteSpace=wrap;${TEXT_ROLE.lane}`
}

function containerCell(container, direction) {
  if (container.kind === "pool") {
    return { id: `pool:${container.id}`, value: container.label, style: poolStyle(container.headerSize, direction), parent: "1", geometry: container.geometry }
  }
  if (container.kind === "lane") {
    if (!container.poolId) throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_LANE_POOL_REQUIRED", `Lane '${container.id}' requires poolId in layout/v2.`)
    return { id: `lane:${container.id}`, value: container.label, style: laneStyle(container.headerSize, direction), parent: `pool:${container.poolId}`, geometry: container.geometry }
  }
  throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_CONTAINER_KIND_UNSUPPORTED", `Unsupported layout container kind '${container.kind ?? "missing"}'.`)
}

function nodeParent(container) {
  if (!container) return "1"
  if (container.kind === "pool") return `pool:${container.id}`
  if (container.kind === "lane") return `lane:${container.id}`
  throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_NODE_CONTAINER_UNSUPPORTED", `Unsupported node container kind '${container.kind ?? "missing"}'.`)
}

function nodeCell(node, layoutKind, link = null) {
  const styles = layoutKind === "bpmn" ? BPMN_NODE_STYLE : layoutKind === "flowchart" ? FLOWCHART_NODE_STYLE : null
  if (!styles) throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_LAYOUT_KIND_UNSUPPORTED", `Draw.io adapter has no translation for layout kind '${layoutKind ?? "missing"}'.`)
  const style = styles[node.type]
  if (!style) throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_NODE_TYPE_UNSUPPORTED", `Draw.io adapter has no style for ${layoutKind} node type '${node.type ?? "missing"}'.`)
  return { id: `node:${node.id}`, value: node.label, style, parent: nodeParent(node.container), geometry: node.geometry, ...(link ? { link } : {}) }
}

function absoluteNodeGeometries(layout) {
  const containers = new Map((layout.containers || []).map(container => [`${container.kind}:${container.id}`, container]))
  const offsets = new Map()

  function containerOffset(container) {
    if (!container) return { x: 0, y: 0 }
    const key = `${container.kind}:${container.id}`
    if (offsets.has(key)) return offsets.get(key)
    const geometry = container.geometry || {}
    let parent = { x: 0, y: 0 }
    if (container.kind === "lane" && container.poolId) parent = containerOffset(containers.get(`pool:${container.poolId}`))
    const offset = { x: Number(geometry.x || 0) + parent.x, y: Number(geometry.y || 0) + parent.y }
    offsets.set(key, offset)
    return offset
  }

  return new Map((layout.nodes || []).map(node => {
    const offset = containerOffset(node.container ? containers.get(`${node.container.kind}:${node.container.id}`) : null)
    const geometry = node.geometry || {}
    return [node.id, {
      x: Number(geometry.x || 0) + offset.x,
      y: Number(geometry.y || 0) + offset.y,
      width: Number(geometry.width || 0),
      height: Number(geometry.height || 0)
    }]
  }))
}


function absoluteTerminalPoint(geometry, side, fraction) {
  const point = sidePoint(side, fraction)
  if (!point || !geometry) return null
  return {
    x: geometry.x + point.x * geometry.width,
    y: geometry.y + point.y * geometry.height
  }
}

function participantPoolId(node, containers) {
  if (!node?.container) return null
  if (node.container.kind === "pool") return node.container.id
  if (node.container.kind === "lane") return containers.get(`lane:${node.container.id}`)?.poolId || null
  return null
}

function messageLabelPathPosition(edge, sourceNode, targetNode, terminals, layout, absoluteNodes) {
  const containers = new Map((layout.containers || []).map(container => [`${container.kind}:${container.id}`, container]))
  const sourcePoolId = participantPoolId(sourceNode, containers)
  const targetPoolId = participantPoolId(targetNode, containers)
  if (!sourcePoolId || !targetPoolId || sourcePoolId === targetPoolId) return 0

  const sourcePool = containers.get(`pool:${sourcePoolId}`)?.geometry
  const targetPool = containers.get(`pool:${targetPoolId}`)?.geometry
  const sourceGeometry = absoluteNodes.get(edge.from)
  const targetGeometry = absoluteNodes.get(edge.to)
  const sourcePoint = absoluteTerminalPoint(sourceGeometry, edge.fromSide, terminals.sourceFraction)
  const targetPoint = absoluteTerminalPoint(targetGeometry, edge.toSide, terminals.targetFraction)
  if (!sourcePool || !targetPool || !sourcePoint || !targetPoint) return 0

  let gapCoordinate = null
  let sourceCoordinate = null
  let targetCoordinate = null
  const sourceBottom = sourcePool.y + sourcePool.height
  const targetBottom = targetPool.y + targetPool.height
  const sourceRight = sourcePool.x + sourcePool.width
  const targetRight = targetPool.x + targetPool.width

  if (sourceBottom <= targetPool.y || targetBottom <= sourcePool.y) {
    const upperBottom = Math.min(sourceBottom, targetBottom)
    const lowerTop = Math.max(sourcePool.y, targetPool.y)
    gapCoordinate = (upperBottom + lowerTop) / 2
    sourceCoordinate = sourcePoint.y
    targetCoordinate = targetPoint.y
  } else if (sourceRight <= targetPool.x || targetRight <= sourcePool.x) {
    const leftRight = Math.min(sourceRight, targetRight)
    const rightLeft = Math.max(sourcePool.x, targetPool.x)
    gapCoordinate = (leftRight + rightLeft) / 2
    sourceCoordinate = sourcePoint.x
    targetCoordinate = targetPoint.x
  }

  if (gapCoordinate === null || sourceCoordinate === targetCoordinate) return 0
  const t = (gapCoordinate - sourceCoordinate) / (targetCoordinate - sourceCoordinate)
  if (!(t > 0 && t < 1)) return 0
  return roundStyleNumber(2 * t - 1)
}

function edgeLabelAnchor(edge, sourceNode, targetNode, terminals, layout, absoluteNodes) {
  const role = edgeLabelRole(edge, sourceNode?.type)
  if (role === "none") return null
  if (role === "branch-condition") return { x: -0.55, y: -8 }
  if (role === "message") return { x: messageLabelPathPosition(edge, sourceNode, targetNode, terminals, layout, absoluteNodes), y: -10 }
  return { x: 0, y: -8 }
}

function edgeStyle(edge, sourceNode, terminals = { sourceFraction: 0.5, targetFraction: 0.5 }) {
  const base = EDGE_STYLE[edge.type]
  if (!base) throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_EDGE_TYPE_UNSUPPORTED", `Draw.io adapter has no style for edge type '${edge.type ?? "missing"}'.`)
  const exit = sidePoint(edge.fromSide, terminals.sourceFraction)
  const entry = sidePoint(edge.toSide, terminals.targetFraction)
  if (!exit || !entry) throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_EDGE_SIDE_UNSUPPORTED", `Draw.io adapter requires resolved west/east/north/south edge sides.`, { edgeId: edge.id, fromSide: edge.fromSide, toSide: edge.toSide })
  const labelRole = edgeLabelRole(edge, sourceNode?.type)
  const labelStyle = EDGE_LABEL_STYLE[labelRole]
  if (labelStyle === undefined) throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_EDGE_LABEL_ROLE_UNSUPPORTED", `Draw.io adapter has no visual translation for edge label role '${labelRole}'.`, { edgeId: edge.id })
  return `${base}${labelStyle}exitX=${exit.x};exitY=${exit.y};exitDx=0;exitDy=0;entryX=${entry.x};entryY=${entry.y};entryDx=0;entryDy=0;`
}

function edgeCell(edge, terminals, sourceNode, targetNode, layout, absoluteNodes) {
  return {
    id: `edge:${edge.id}`,
    value: edge.label,
    style: edgeStyle(edge, sourceNode, terminals),
    parent: "1",
    source: `node:${edge.from}`,
    target: `node:${edge.to}`,
    waypoints: edge.waypoints,
    labelAnchor: edgeLabelAnchor(edge, sourceNode, targetNode, terminals, layout, absoluteNodes)
  }
}

function graphModelXml(layout, nodeLinks = new Map()) {
  if (layout?.schemaVersion !== "process-diagram-layout/v2") {
    throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_LAYOUT_VERSION_UNSUPPORTED", "Draw.io adapter requires 'process-diagram-layout/v2'.", { actual: layout?.schemaVersion ?? null })
  }
  const pageWidth = pageDimension(layout?.page?.width, "layout.page.width")
  const pageHeight = pageDimension(layout?.page?.height, "layout.page.height")
  const nodesById = new Map((layout.nodes || []).map(node => [node.id, node]))
  const absoluteNodes = absoluteNodeGeometries(layout)
  const terminals = routeTerminalAssignments(layout, absoluteNodes)
  const cells = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',
    ...(layout.containers || []).map(container => containerCell(container, layout.direction ?? "left-to-right")).map(vertexXml),
    ...(layout.nodes || []).map(node => nodeCell(node, layout.kind, nodeLinks.get(node.id) ? `data:page/id,${nodeLinks.get(node.id)}` : null)).map(vertexXml),
    ...(layout.edges || []).map(edge => edgeCell(edge, terminals.get(edge.id), nodesById.get(edge.from), nodesById.get(edge.to), layout, absoluteNodes)).map(edgeXml)
  ].join("")
  return `<mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${pageWidth}" pageHeight="${pageHeight}" math="0" shadow="0"><root>${cells}</root></mxGraphModel>`
}

function diagramPageXml({ id, name, layout, nodeLinks = new Map() }) {
  return `<diagram id="${escapeXml(id)}" name="${escapeXml(name)}">${graphModelXml(layout, nodeLinks)}</diagram>`
}

export function serializeDrawio(layout) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<mxfile host="app.diagrams.net" agent="process-diagram" version="1.0" compressed="false">${diagramPageXml({ id: "process-diagram", name: layout?.title || "Process", layout })}</mxfile>\n`
}

export function serializeDrawioDocument({ pages } = {}) {
  if (!Array.isArray(pages) || pages.length < 2) throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_DOCUMENT_PAGES_REQUIRED", "Draw.io document serialization requires at least two pages.")
  const ids = new Set()
  const pageXml = pages.map((page, index) => {
    if (!page || typeof page !== "object" || Array.isArray(page)) throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_DOCUMENT_PAGE_INVALID", `Document page ${index + 1} must be an object.`)
    const id = String(page.id || "").trim()
    const name = String(page.name || "").trim()
    if (!id) throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_DOCUMENT_PAGE_ID_REQUIRED", `Document page ${index + 1} requires id.`)
    if (!name) throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_DOCUMENT_PAGE_NAME_REQUIRED", `Document page '${id}' requires name.`)
    if (ids.has(id)) throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_DOCUMENT_PAGE_ID_DUPLICATE", `Duplicate Draw.io page id '${id}'.`)
    ids.add(id)
    return diagramPageXml({ id, name, layout: page.layout, nodeLinks: page.nodeLinks || new Map() })
  }).join("")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<mxfile host="app.diagrams.net" agent="process-diagram" version="1.0" compressed="false">${pageXml}</mxfile>\n`
}

function malformedXml(message, offset = undefined) {
  return fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_XML_MALFORMED", message, offset === undefined ? undefined : { offset })
}

function validateEntities(value, offset = 0) {
  const invalid = String(value).replace(/&(?:amp|lt|gt|quot|apos|#[0-9]+|#x[0-9A-Fa-f]+);/g, "")
  if (invalid.includes("&")) throw malformedXml("Invalid or unterminated XML entity reference.", offset)
}

const XML_TOKEN = /<\?xml\b[^?]*\?>|<!--[\s\S]*?-->|<\/?[A-Za-z_:][A-Za-z0-9_.:-]*(?:\s+[A-Za-z_:][A-Za-z0-9_.:-]*\s*=\s*(?:"[^"<]*"|'[^'<]*'))*\s*\/?>/g
const XML_NAME = "[A-Za-z_:][A-Za-z0-9_.:-]*"

function startTag(token, offset) {
  const nameMatch = new RegExp(`^<(${XML_NAME})`).exec(token)
  if (!nameMatch) throw malformedXml("Invalid XML start tag.", offset)
  const selfClosing = /\/>$/.test(token)
  const body = token.slice(nameMatch[0].length, token.length - (selfClosing ? 2 : 1))
  const attributes = {}
  const pattern = new RegExp(`\\s+(${XML_NAME})\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "g")
  let cursor = 0
  for (const match of body.matchAll(pattern)) {
    if (body.slice(cursor, match.index).trim()) throw malformedXml(`Invalid attributes on <${nameMatch[1]}>.`, offset + nameMatch[0].length + cursor)
    if (Object.hasOwn(attributes, match[1])) throw malformedXml(`Duplicate attribute '${match[1]}' on <${nameMatch[1]}>.`, offset + match.index)
    const value = match[2] ?? match[3] ?? ""
    validateEntities(value, offset + match.index)
    attributes[match[1]] = value
    cursor = match.index + match[0].length
  }
  if (body.slice(cursor).trim()) throw malformedXml(`Invalid attributes on <${nameMatch[1]}>.`, offset + cursor)
  return { node: { name: nameMatch[1], attrs: attributes, children: [] }, selfClosing }
}

function parseXmlDocument(raw) {
  const source = String(raw ?? "")
  if (!source.trim()) throw malformedXml("XML source is empty.", 0)
  if (/<!DOCTYPE/i.test(source)) throw fail(BOUNDARY.DRAWIO_ADAPTER, "DRAWIO_XML_DOCTYPE_UNSUPPORTED", "DOCTYPE declarations are not supported in Draw.io source.")

  const stack = []
  let root = null
  let cursor = 0
  let sawDeclaration = false
  XML_TOKEN.lastIndex = 0

  for (const match of source.matchAll(XML_TOKEN)) {
    const between = source.slice(cursor, match.index)
    validateEntities(between, cursor)
    if (between.includes("<")) throw malformedXml("Unsupported or malformed XML markup.", cursor + between.indexOf("<"))
    if (stack.length === 0 && between.trim()) throw malformedXml("Non-whitespace text is not allowed outside the document element.", cursor)

    const token = match[0]
    if (token.startsWith("<!--")) {
      cursor = match.index + token.length
      continue
    }
    if (token.startsWith("<?xml")) {
      if (sawDeclaration || root || stack.length) throw malformedXml("XML declaration must appear once before the document element.", match.index)
      sawDeclaration = true
      cursor = match.index + token.length
      continue
    }
    if (token.startsWith("</")) {
      const name = new RegExp(`^</(${XML_NAME})\\s*>$`).exec(token)?.[1]
      const open = stack.pop()
      if (!name || !open) throw malformedXml(`Unexpected closing tag '${token}'.`, match.index)
      if (open.name !== name) throw malformedXml(`Mismatched closing tag </${name}>; expected </${open.name}>.`, match.index)
      cursor = match.index + token.length
      continue
    }

    const { node, selfClosing } = startTag(token, match.index)
    if (stack.length) stack.at(-1).children.push(node)
    else {
      if (root) throw malformedXml("XML source contains multiple document elements.", match.index)
      root = node
    }
    if (!selfClosing) stack.push(node)
    cursor = match.index + token.length
  }

  const trailing = source.slice(cursor)
  validateEntities(trailing, cursor)
  if (trailing.includes("<")) throw malformedXml("Unsupported or malformed XML markup.", cursor + trailing.indexOf("<"))
  if (stack.length) throw malformedXml(`Unclosed XML element <${stack.at(-1).name}>.`, source.length)
  if (!root) throw malformedXml("XML document element is missing.", 0)
  if (trailing.trim()) throw malformedXml("Non-whitespace text is not allowed after the document element.", cursor)
  return root
}

function child(node, name) {
  return node?.children?.find(item => item.name === name) || null
}

function descendants(node, name, output = []) {
  if (!node) return output
  for (const item of node.children || []) {
    if (item.name === name) output.push(item)
    descendants(item, name, output)
  }
  return output
}

function validationIssue(code, message, details = undefined) {
  return { boundary: BOUNDARY.DRAWIO_ADAPTER, code, message, ...(details === undefined ? {} : { details }) }
}

function graphCellEntries(graphRoot, errors) {
  const entries = []
  for (const item of graphRoot?.children || []) {
    if (item.name === "mxCell") {
      entries.push({ node: item, attrs: item.attrs, wrapper: null })
      continue
    }
    if (item.name !== "object" && item.name !== "UserObject") continue

    const nestedCells = item.children.filter(childNode => childNode.name === "mxCell")
    if (nestedCells.length !== 1) {
      errors.push(validationIssue("DRAWIO_OBJECT_CELL_REQUIRED", `<${item.name}> '${item.attrs.id || "?"}' must contain exactly one direct <mxCell>.`, { wrapper: item.name, id: item.attrs.id || null, cells: nestedCells.length }))
      continue
    }
    const cell = nestedCells[0]
    if (item.attrs.id && cell.attrs.id && item.attrs.id !== cell.attrs.id) {
      errors.push(validationIssue("DRAWIO_OBJECT_CELL_ID_CONFLICT", `<${item.name}> id '${item.attrs.id}' conflicts with nested mxCell id '${cell.attrs.id}'.`, { wrapperId: item.attrs.id, cellId: cell.attrs.id }))
    }
    entries.push({
      node: cell,
      attrs: { ...cell.attrs, id: item.attrs.id || cell.attrs.id },
      wrapper: item
    })
  }
  return entries
}

function validateDiagramPage(diagram, pageIndex, pageIds, errors, warnings) {
  const pageId = diagram?.attrs?.id || null
  const pageName = diagram?.attrs?.name || null
  const pageDetails = { pageIndex, pageId, pageName }
  const graphModel = child(diagram, "mxGraphModel")
  if (!graphModel) {
    errors.push(validationIssue("DRAWIO_GRAPH_MODEL_MISSING", `<diagram> page ${pageIndex} must contain <mxGraphModel>.`, pageDetails))
    return { ...pageDetails, cellCount: 0, vertexCount: 0, edgeCount: 0 }
  }
  const graphRoot = child(graphModel, "root")
  if (!graphRoot) {
    errors.push(validationIssue("DRAWIO_GRAPH_ROOT_MISSING", `<mxGraphModel> on page ${pageIndex} must contain <root>.`, pageDetails))
    return { ...pageDetails, cellCount: 0, vertexCount: 0, edgeCount: 0 }
  }

  const cells = graphCellEntries(graphRoot, errors)
  const ids = new Set()
  for (const { attrs: cell } of cells) {
    if (!cell.id) {
      errors.push(validationIssue("DRAWIO_CELL_ID_MISSING", `An mxCell on page ${pageIndex} is missing id.`, pageDetails))
      continue
    }
    if (ids.has(cell.id)) errors.push(validationIssue("DRAWIO_CELL_ID_DUPLICATE", `Duplicate mxCell id '${cell.id}' on page ${pageIndex}.`, { ...pageDetails, cellId: cell.id }))
    ids.add(cell.id)
  }

  const rootCell = cells.find(({ attrs }) => attrs.id === "0")?.attrs
  if (!rootCell) errors.push(validationIssue("DRAWIO_ROOT_CELL_MISSING", `Root cell id=0 is missing on page ${pageIndex}.`, pageDetails))
  const layerCell = cells.find(({ attrs }) => attrs.id === "1")?.attrs
  if (!layerCell) errors.push(validationIssue("DRAWIO_LAYER_CELL_MISSING", `Default layer cell id=1 is missing on page ${pageIndex}.`, pageDetails))
  else if (layerCell.parent !== "0") errors.push(validationIssue("DRAWIO_LAYER_PARENT_INVALID", `Default layer cell id=1 on page ${pageIndex} must have parent id=0.`, pageDetails))

  for (const { node, attrs: cell, wrapper } of cells) {
    const isVertex = cell.vertex === "1"
    const isEdge = cell.edge === "1"
    if (isVertex && isEdge) errors.push(validationIssue("DRAWIO_CELL_KIND_CONFLICT", `Cell '${cell.id || "?"}' on page ${pageIndex} cannot be both vertex and edge.`, pageDetails))
    for (const key of ["parent", "source", "target"]) {
      if (cell[key] && !ids.has(cell[key])) errors.push(validationIssue("DRAWIO_CELL_REFERENCE_DANGLING", `Cell '${cell.id || "?"}' on page ${pageIndex} references missing ${key} '${cell[key]}'.`, { ...pageDetails, cellId: cell.id || null, reference: key, target: cell[key] }))
    }
    if ((isVertex || isEdge) && !cell.parent) errors.push(validationIssue("DRAWIO_CELL_PARENT_MISSING", `Cell '${cell.id || "?"}' on page ${pageIndex} must have a parent.`, pageDetails))
    if (isEdge && (!cell.source || !cell.target)) errors.push(validationIssue("DRAWIO_EDGE_ENDPOINT_MISSING", `Edge '${cell.id || "?"}' on page ${pageIndex} must have source and target.`, pageDetails))

    const link = wrapper?.attrs?.link
    if (typeof link === "string" && link.startsWith("data:page/id,")) {
      const targetPageId = link.slice("data:page/id,".length)
      if (!targetPageId || !pageIds.has(targetPageId)) errors.push(validationIssue("DRAWIO_PAGE_LINK_TARGET_MISSING", `Cell '${cell.id || "?"}' on page ${pageIndex} links to missing page id '${targetPageId || "?"}'.`, { ...pageDetails, cellId: cell.id || null, targetPageId: targetPageId || null }))
    }

    if (isVertex || isEdge) {
      const geometry = node.children.filter(item => item.name === "mxGeometry")
      if (geometry.length !== 1) errors.push(validationIssue("DRAWIO_GEOMETRY_REQUIRED", `Cell '${cell.id || "?"}' on page ${pageIndex} must contain exactly one direct mxGeometry child.`, pageDetails))
      else {
        if (geometry[0].attrs.as !== "geometry") errors.push(validationIssue("DRAWIO_GEOMETRY_ROLE_INVALID", `Cell '${cell.id || "?"}' on page ${pageIndex} mxGeometry must declare as='geometry'.`, pageDetails))
        if (isEdge && geometry[0].attrs.relative !== "1") errors.push(validationIssue("DRAWIO_EDGE_GEOMETRY_RELATIVE_REQUIRED", `Edge '${cell.id || "?"}' on page ${pageIndex} mxGeometry must declare relative='1'.`, pageDetails))
      }
    }
  }

  if (cells.length < 3) warnings.push({ code: "DRAWIO_GRAPH_EMPTY", message: `Diagram page ${pageIndex} contains no user cells.`, details: pageDetails })
  return {
    ...pageDetails,
    cellCount: cells.length,
    vertexCount: cells.filter(({ attrs }) => attrs.vertex === "1").length,
    edgeCount: cells.filter(({ attrs }) => attrs.edge === "1").length
  }
}

export function validateDrawioXml(xml) {
  const source = String(xml ?? "")
  const errors = []
  const warnings = []
  let document
  try {
    document = parseXmlDocument(source)
  } catch (error) {
    errors.push({ boundary: error?.boundary || BOUNDARY.DRAWIO_ADAPTER, code: error?.code || "DRAWIO_XML_MALFORMED", message: error?.message || String(error), ...(error?.details ? { details: error.details } : {}) })
    return { status: "failed", errors, warnings, data: { pageCount: 0, pages: [], cellCount: 0, vertexCount: 0, edgeCount: 0 } }
  }

  if (document.name !== "mxfile") errors.push(validationIssue("DRAWIO_MXFILE_MISSING", "Document element must be <mxfile>."))
  const diagrams = document.children.filter(item => item.name === "diagram")
  if (!diagrams.length) errors.push(validationIssue("DRAWIO_DIAGRAM_MISSING", "<mxfile> must contain at least one <diagram>."))

  const pageIds = new Set()
  diagrams.forEach((diagram, index) => {
    const pageIndex = index + 1
    const pageId = diagram.attrs.id
    if (!pageId) errors.push(validationIssue("DRAWIO_PAGE_ID_MISSING", `Draw.io page ${pageIndex} is missing id.`, { pageIndex }))
    else if (pageIds.has(pageId)) errors.push(validationIssue("DRAWIO_PAGE_ID_DUPLICATE", `Duplicate Draw.io page id '${pageId}'.`, { pageIndex, pageId }))
    else pageIds.add(pageId)
  })

  const pages = diagrams.map((diagram, index) => validateDiagramPage(diagram, index + 1, pageIds, errors, warnings))
  return {
    status: errors.length ? "failed" : "pass",
    errors,
    warnings,
    data: {
      pageCount: pages.length,
      pages,
      cellCount: pages.reduce((sum, page) => sum + page.cellCount, 0),
      vertexCount: pages.reduce((sum, page) => sum + page.vertexCount, 0),
      edgeCount: pages.reduce((sum, page) => sum + page.edgeCount, 0)
    }
  }
}

function commandPath(command) {
  const lookup = process.platform === "win32" ? "where.exe" : "which"
  const result = spawnSync(lookup, [command], { encoding: "utf8", windowsHide: true, timeout: 2000 })
  if (result.status !== 0) return null
  return String(result.stdout || "").split(/\r?\n/).map(line => line.trim()).find(Boolean) || null
}

function executable(path) {
  try {
    accessSync(path, process.platform === "win32" ? constants.F_OK : constants.X_OK)
    return true
  } catch {
    return false
  }
}

function findDrawioRuntime(env = process.env) {
  const home = env.HOME || env.USERPROFILE || ""
  const localAppData = env.LOCALAPPDATA || (env.USERPROFILE ? `${env.USERPROFILE}\\AppData\\Local` : "")
  const candidates = process.platform === "win32"
    ? [
        env.DRAWIO_DESKTOP_PATH, env.DRAWIO_CLI_PATH,
        "C:\\Program Files\\draw.io\\draw.io.exe",
        "C:\\Program Files (x86)\\draw.io\\draw.io.exe",
        localAppData ? `${localAppData}\\Programs\\draw.io\\draw.io.exe` : null,
        commandPath("drawio"), commandPath("draw.io")
      ]
    : process.platform === "darwin"
      ? [
          env.DRAWIO_DESKTOP_PATH, env.DRAWIO_CLI_PATH,
          "/Applications/draw.io.app/Contents/MacOS/draw.io",
          home ? `${home}/Applications/draw.io.app/Contents/MacOS/draw.io` : null,
          commandPath("drawio"), commandPath("draw.io")
        ]
      : [
          env.DRAWIO_DESKTOP_PATH, env.DRAWIO_CLI_PATH,
          "/usr/bin/drawio", "/usr/local/bin/drawio", "/opt/drawio/drawio", "/snap/bin/drawio",
          home ? `${home}/Applications/drawio.AppImage` : null,
          home ? `${home}/.local/bin/drawio` : null,
          commandPath("drawio"), commandPath("draw.io")
        ]
  const checked = [...new Set(candidates.filter(Boolean).map(String))]
  const runtimePath = checked.find(executable) || null
  const xvfbRun = process.platform === "linux" ? commandPath("xvfb-run") : null
  return {
    available: Boolean(runtimePath),
    runtimePath,
    checked,
    platform: process.platform,
    displayEnvironmentSet: Boolean(env.DISPLAY),
    xvfbRun
  }
}

function invokeDrawio(runtime, cliArgs, env, timeoutMs) {
  const runtimeArgs = []
  if (process.platform === "linux" && typeof process.getuid === "function" && process.getuid() === 0) runtimeArgs.push("--no-sandbox")
  runtimeArgs.push("--disable-update", ...cliArgs)

  let command = runtime.runtimePath
  let args = runtimeArgs
  if (process.platform === "linux" && runtime.xvfbRun) {
    command = runtime.xvfbRun
    args = ["-a", runtime.runtimePath, ...runtimeArgs]
  }
  const result = spawnSync(command, args, { encoding: "utf8", windowsHide: true, timeout: timeoutMs, env })
  return { command, args, result }
}

export function probeDrawioRuntime(env = process.env, timeoutMs = 10000) {
  const runtime = findDrawioRuntime(env)
  if (!runtime.available) return { ...runtime, operational: false, version: null, probe: null }

  const invocation = invokeDrawio(runtime, ["--version"], env, timeoutMs)
  const { result } = invocation
  const output = String(result.stdout || result.stderr || "").trim()
  const operational = !result.error && result.status === 0
  const version = operational ? (output.split(/\r?\n/).find(line => /^\d+(?:\.\d+)+$/.test(line.trim()))?.trim() || null) : null
  return {
    ...runtime,
    operational,
    version,
    probe: {
      command: invocation.command,
      args: invocation.args,
      exitStatus: result.status,
      signal: result.signal || null,
      errorCode: result.error?.code || null,
      output: output.slice(0, 1000)
    }
  }
}

function outputFormat(path) {
  const format = extname(path).replace(/^\./, "").toLowerCase()
  if (!RENDER_FORMATS.has(format)) throw fail(BOUNDARY.RENDERER_RUNTIME, "DRAWIO_RENDER_FORMAT_UNSUPPORTED", "Render output extension must be .png, .svg, or .pdf.")
  return format
}

export function renderDrawio({ sourcePath, outputPath, pageIndex = undefined, env = process.env, timeoutMs = 45000 } = {}) {
  const source = resolve(String(sourcePath))
  const output = resolve(String(outputPath))
  const format = outputFormat(output)
  if (pageIndex !== undefined && (!Number.isSafeInteger(pageIndex) || pageIndex < 1)) throw fail(BOUNDARY.RENDERER_RUNTIME, "DRAWIO_RENDER_PAGE_INDEX_INVALID", "Draw.io pageIndex must be a positive 1-based safe integer.", { pageIndex })
  const runtime = findDrawioRuntime(env)
  if (!runtime.available) return { status: "blocked", boundary: BOUNDARY.RENDERER_RUNTIME, code: "DRAWIO_DESKTOP_CLI_MISSING", message: "Draw.io Desktop CLI is not installed or discoverable.", runtime }
  const cliArgs = ["--export", "--format", format, "--output", output]
  if (pageIndex !== undefined) cliArgs.push("--page-index", String(pageIndex))
  cliArgs.push(source)
  const invocation = invokeDrawio(runtime, cliArgs, env, timeoutMs)
  const { command, args, result } = invocation
  if (result.error || result.status !== 0) {
    return {
      status: "failed",
      boundary: BOUNDARY.RENDERER_RUNTIME,
      code: result.error?.code === "ETIMEDOUT" ? "DRAWIO_RENDER_TIMEOUT" : "DRAWIO_RENDER_FAILED",
      message: result.error?.message || String(result.stderr || result.stdout || "Draw.io Desktop export failed.").trim(),
      runtime,
      invocation: { command, args, exitStatus: result.status, signal: result.signal || null }
    }
  }
  if (!existsSync(output)) return { status: "failed", boundary: BOUNDARY.RENDERER_RUNTIME, code: "DRAWIO_RENDER_OUTPUT_MISSING", message: "Draw.io Desktop returned success but produced no output file.", runtime }
  const stats = statSync(output)
  if (stats.size <= 0) return { status: "failed", boundary: BOUNDARY.RENDERER_RUNTIME, code: "DRAWIO_RENDER_OUTPUT_EMPTY", message: "Rendered output is empty.", runtime }
  return { status: "rendered", outputPath: output, format, sizeBytes: stats.size, runtime, invocation: { command, args, exitStatus: result.status } }
}
