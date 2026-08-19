import { BOUNDARY, assertThat } from "./errors.mjs"

const GEOMETRY = Object.freeze({
  pageMargin: 40,
  minPageWidth: 850,
  minPageHeight: 600,
  maxPageDimension: 20000,
  stageStart: 70,
  stageGap: 220,
  trackGap: 110,
  bandPaddingY: 60,
  bandPaddingX: 60
})

export const FLOWCHART_COMPOSITION_METRICS = Object.freeze({
  stageGap: GEOMETRY.stageGap,
  trackGap: GEOMETRY.trackGap
})

const NODE_SIZE = Object.freeze({
  start: { width: 130, height: 54 },
  end: { width: 130, height: 54 },
  process: { width: 160, height: 64 },
  decision: { width: 90, height: 90 },
  "input-output": { width: 170, height: 70 },
  document: { width: 170, height: 72 }
})

const SUPPORTED_NODE_TYPES = new Set(Object.keys(NODE_SIZE))
const SUPPORTED_EDGE_TYPES = new Set(["flow"])
const SIDES = new Set(["west", "east", "north", "south"])
const DIRECTIONS = new Set(["left-to-right", "top-to-bottom"])
const ROUTING = Object.freeze({ stub: 28 })
const ID_RE = /^[A-Za-z][A-Za-z0-9_.-]{0,63}$/

function contract(condition, code, message, details = undefined) {
  assertThat(condition, BOUNDARY.PLAN_CONTRACT, code, message, details)
}

function semantic(condition, code, message, details = undefined) {
  assertThat(condition, BOUNDARY.FLOWCHART_SEMANTICS, code, message, details)
}

function composition(condition, code, message, details = undefined) {
  assertThat(condition, BOUNDARY.COMPOSITION, code, message, details)
}

function object(value, label) {
  contract(value && typeof value === "object" && !Array.isArray(value), "FLOWCHART_PLAN_OBJECT_REQUIRED", `${label} must be an object.`)
  return value
}

function array(value, label) {
  contract(Array.isArray(value), "FLOWCHART_PLAN_ARRAY_REQUIRED", `${label} must be an array.`)
  return value
}

function text(value, label, { allowEmpty = false, max = 180 } = {}) {
  contract(typeof value === "string", "FLOWCHART_PLAN_TEXT_REQUIRED", `${label} must be a string.`)
  const normalized = value.trim()
  contract(allowEmpty || normalized.length > 0, "FLOWCHART_PLAN_TEXT_EMPTY", `${label} must not be empty.`)
  contract(normalized.length <= max, "FLOWCHART_PLAN_TEXT_TOO_LONG", `${label} exceeds ${max} characters.`, { length: normalized.length, max })
  return normalized
}

function id(value, label) {
  const normalized = text(value, label, { max: 64 })
  contract(ID_RE.test(normalized), "FLOWCHART_PLAN_ID_INVALID", `${label} must match ${ID_RE}.`, { value: normalized })
  return normalized
}

function integer(value, label, { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = {}) {
  contract(Number.isSafeInteger(value) && value >= min && value <= max, "FLOWCHART_PLAN_INTEGER_INVALID", `${label} must be a safe integer from ${min} to ${max}.`, { value })
  return value
}

function normalizeNode(raw, index) {
  object(raw, `nodes[${index}]`)
  const type = text(raw.type, `nodes[${index}].type`, { max: 40 })
  semantic(SUPPORTED_NODE_TYPES.has(type), "FLOWCHART_NODE_TYPE_UNSUPPORTED", `Unsupported Flowchart node type '${type}'.`, { supported: [...SUPPORTED_NODE_TYPES] })
  return {
    id: id(raw.id, `nodes[${index}].id`),
    type,
    label: text(raw.label ?? "", `nodes[${index}].label`, { allowEmpty: true, max: 160 }),
    stage: integer(raw.stage, `nodes[${index}].stage`, { min: 0 }),
    track: integer(raw.track ?? 0, `nodes[${index}].track`)
  }
}

function normalizeEdge(raw, index) {
  object(raw, `edges[${index}]`)
  const type = text(raw.type ?? "flow", `edges[${index}].type`, { max: 30 })
  semantic(SUPPORTED_EDGE_TYPES.has(type), "FLOWCHART_EDGE_TYPE_UNSUPPORTED", `Unsupported Flowchart edge type '${type}'.`, { supported: [...SUPPORTED_EDGE_TYPES] })
  const edge = {
    id: id(raw.id, `edges[${index}].id`),
    type,
    from: id(raw.from, `edges[${index}].from`),
    to: id(raw.to, `edges[${index}].to`),
    label: text(raw.label ?? "", `edges[${index}].label`, { allowEmpty: true, max: 90 })
  }
  for (const key of ["fromSide", "toSide"]) {
    if (raw[key] !== undefined) {
      const side = text(raw[key], `edges[${index}].${key}`, { max: 10 })
      composition(SIDES.has(side), "FLOWCHART_EDGE_SIDE_UNSUPPORTED", `${key} must be one of ${[...SIDES].join(", ")}.`, { value: side })
      edge[key] = side
    }
  }
  if (raw.corridorTrack !== undefined) edge.corridorTrack = integer(raw.corridorTrack, `edges[${index}].corridorTrack`)
  return edge
}

function traverse(seedIds, adjacency) {
  const seen = new Set(seedIds)
  const queue = [...seedIds]
  for (let index = 0; index < queue.length; index += 1) {
    const current = queue[index]
    for (const next of adjacency.get(current) || []) {
      if (seen.has(next)) continue
      seen.add(next)
      queue.push(next)
    }
  }
  return seen
}

function normalizeFlowchartPlan(input) {
  const plan = object(input, "plan")
  contract(plan.version === "process-diagram-plan/v1", "FLOWCHART_PLAN_VERSION_UNSUPPORTED", "version must be 'process-diagram-plan/v1'.", { actual: plan.version ?? null })
  semantic(plan.kind === "flowchart", "FLOWCHART_KIND_REQUIRED", "Flowchart library requires kind 'flowchart'.", { actual: plan.kind ?? null })
  const direction = plan.direction ?? "left-to-right"
  composition(DIRECTIONS.has(direction), "FLOWCHART_DIRECTION_UNSUPPORTED", "Flowchart direction must be 'left-to-right' or 'top-to-bottom'.", { actual: direction })

  const pools = array(plan.pools ?? [], "pools")
  const lanes = array(plan.lanes ?? [], "lanes")
  semantic(pools.length === 0 && lanes.length === 0, "FLOWCHART_CONTAINERS_UNSUPPORTED", "Flowchart does not support BPMN pools/lanes. Use BPMN when participant or responsibility semantics matter.", { pools: pools.length, lanes: lanes.length })

  const normalized = {
    version: "process-diagram-plan/v1",
    kind: "flowchart",
    title: text(plan.title ?? "Flowchart", "title", { max: 120 }),
    direction,
    nodes: array(plan.nodes ?? [], "nodes").map(normalizeNode),
    edges: array(plan.edges ?? [], "edges").map(normalizeEdge)
  }
  contract(normalized.nodes.length > 0, "FLOWCHART_NODES_REQUIRED", "At least one Flowchart node is required.")

  const nodes = new Map()
  const edges = new Map()
  for (const node of normalized.nodes) {
    contract(!nodes.has(node.id), "FLOWCHART_NODE_ID_DUPLICATE", `Duplicate node id '${node.id}'.`)
    nodes.set(node.id, node)
  }

  const incoming = new Map(normalized.nodes.map(node => [node.id, 0]))
  const outgoing = new Map(normalized.nodes.map(node => [node.id, 0]))
  const adjacency = new Map(normalized.nodes.map(node => [node.id, []]))
  const reverse = new Map(normalized.nodes.map(node => [node.id, []]))
  const outgoingEdges = new Map(normalized.nodes.map(node => [node.id, []]))

  for (const edge of normalized.edges) {
    contract(!edges.has(edge.id), "FLOWCHART_EDGE_ID_DUPLICATE", `Duplicate edge id '${edge.id}'.`)
    const source = nodes.get(edge.from)
    const target = nodes.get(edge.to)
    contract(source, "FLOWCHART_EDGE_SOURCE_UNKNOWN", `Edge '${edge.id}' references unknown source '${edge.from}'.`)
    contract(target, "FLOWCHART_EDGE_TARGET_UNKNOWN", `Edge '${edge.id}' references unknown target '${edge.to}'.`)
    semantic(source.id !== target.id, "FLOWCHART_EDGE_SELF_LOOP_UNSUPPORTED", `Edge '${edge.id}' cannot connect a node to itself.`)
    incoming.set(target.id, incoming.get(target.id) + 1)
    outgoing.set(source.id, outgoing.get(source.id) + 1)
    adjacency.get(source.id).push(target.id)
    reverse.get(target.id).push(source.id)
    outgoingEdges.get(source.id).push(edge)
    edges.set(edge.id, edge)
  }

  const starts = normalized.nodes.filter(node => node.type === "start")
  const ends = normalized.nodes.filter(node => node.type === "end")
  semantic(starts.length > 0, "FLOWCHART_START_REQUIRED", "At least one start node is required.")
  semantic(ends.length > 0, "FLOWCHART_END_REQUIRED", "At least one end node is required.")

  for (const node of normalized.nodes) {
    if (node.type === "start") {
      semantic(incoming.get(node.id) === 0, "FLOWCHART_START_HAS_INCOMING_FLOW", `Start node '${node.id}' cannot have incoming flow.`)
      semantic(outgoing.get(node.id) === 1, "FLOWCHART_START_OUTGOING_REQUIRED", `Start node '${node.id}' must have exactly one outgoing flow. Put branching in an explicit decision node.`, { outgoing: outgoing.get(node.id) })
      continue
    }
    semantic(incoming.get(node.id) > 0, "FLOWCHART_NODE_MISSING_INCOMING_FLOW", `Flowchart node '${node.id}' requires incoming control flow.`)
    if (node.type === "end") {
      semantic(outgoing.get(node.id) === 0, "FLOWCHART_END_HAS_OUTGOING_FLOW", `End node '${node.id}' cannot have outgoing flow.`)
      continue
    }
    semantic(outgoing.get(node.id) > 0, "FLOWCHART_NODE_MISSING_OUTGOING_FLOW", `Flowchart node '${node.id}' requires outgoing control flow. Use an explicit end node for a terminal path.`)
    if (node.type !== "decision") {
      semantic(outgoing.get(node.id) === 1, "FLOWCHART_BRANCH_REQUIRES_DECISION", `Non-decision node '${node.id}' cannot branch in the current Flowchart subset. Use an explicit decision node.`, { outgoing: outgoing.get(node.id) })
    }
  }

  for (const decision of normalized.nodes.filter(node => node.type === "decision")) {
    const branches = outgoingEdges.get(decision.id)
    semantic(branches.length >= 2, "FLOWCHART_DECISION_BRANCHES_REQUIRED", `Decision '${decision.id}' requires at least two outgoing branches.`, { outgoing: branches.length })
    const labels = branches.map(edge => edge.label)
    semantic(labels.every(Boolean), "FLOWCHART_DECISION_LABEL_REQUIRED", `Every outgoing branch from decision '${decision.id}' requires a non-empty label.`)
    semantic(new Set(labels.map(label => label.toLowerCase())).size === labels.length, "FLOWCHART_DECISION_LABEL_DUPLICATE", `Decision '${decision.id}' requires distinct outgoing branch labels.`, { labels })
  }

  const reachableFromStart = traverse(starts.map(node => node.id), adjacency)
  const canReachEnd = traverse(ends.map(node => node.id), reverse)
  for (const node of normalized.nodes) {
    semantic(reachableFromStart.has(node.id), "FLOWCHART_NODE_UNREACHABLE_FROM_START", `Flowchart node '${node.id}' is not reachable from any start.`)
    semantic(canReachEnd.has(node.id), "FLOWCHART_NODE_CANNOT_REACH_END", `Flowchart node '${node.id}' has no path to an end.`)
  }

  const slots = new Set()
  for (const node of normalized.nodes) {
    const key = `${node.stage}|${node.track}`
    composition(!slots.has(key), "FLOWCHART_COMPOSITION_SLOT_COLLISION", `Two nodes occupy the same stage/track slot '${key}'.`, { nodeId: node.id })
    slots.add(key)
  }

  return normalized
}

function nodeRelativeGeometry(node, minTrack, maxTrack, crossSpan, direction) {
  const size = NODE_SIZE[node.type]
  const centerTrack = (minTrack + maxTrack) / 2
  if (direction === "top-to-bottom") {
    return {
      x: crossSpan / 2 - size.width / 2 + (node.track - centerTrack) * GEOMETRY.trackGap,
      y: GEOMETRY.stageStart + node.stage * GEOMETRY.stageGap,
      width: size.width,
      height: size.height
    }
  }
  return {
    x: GEOMETRY.stageStart + node.stage * GEOMETRY.stageGap,
    y: crossSpan / 2 - size.height / 2 + (node.track - centerTrack) * GEOMETRY.trackGap,
    width: size.width,
    height: size.height
  }
}

function rectanglesOverlapInterior(a, b) {
  return a.x < b.x + b.width
    && a.x + a.width > b.x
    && a.y < b.y + b.height
    && a.y + a.height > b.y
}

function validateNodeNonOverlap(nodes) {
  const ordered = [...nodes].sort((a, b) => a.geometry.x - b.geometry.x || a.geometry.y - b.geometry.y || a.id.localeCompare(b.id))
  for (let leftIndex = 0; leftIndex < ordered.length; leftIndex += 1) {
    const left = ordered[leftIndex]
    const leftRight = left.geometry.x + left.geometry.width
    for (let rightIndex = leftIndex + 1; rightIndex < ordered.length; rightIndex += 1) {
      const right = ordered[rightIndex]
      if (right.geometry.x >= leftRight) break
      if (!rectanglesOverlapInterior(left.geometry, right.geometry)) continue
      composition(false, "FLOWCHART_COMPOSITION_NODE_OVERLAP", `Flowchart nodes '${left.id}' and '${right.id}' overlap after physical projection. Recompose stage/track spacing; mechanics will not move nodes automatically.`, {
        nodeAId: left.id,
        nodeBId: right.id,
        geometryA: left.geometry,
        geometryB: right.geometry
      })
    }
  }
}

function sidePoint(geometry, side) {
  switch (side) {
    case "west": return { x: geometry.x, y: geometry.y + geometry.height / 2 }
    case "east": return { x: geometry.x + geometry.width, y: geometry.y + geometry.height / 2 }
    case "north": return { x: geometry.x + geometry.width / 2, y: geometry.y }
    case "south": return { x: geometry.x + geometry.width / 2, y: geometry.y + geometry.height }
    default: throw new Error(`Unsupported side '${side}'.`)
  }
}

function offsetPoint(point, side, distance = ROUTING.stub) {
  switch (side) {
    case "west": return { x: point.x - distance, y: point.y }
    case "east": return { x: point.x + distance, y: point.y }
    case "north": return { x: point.x, y: point.y - distance }
    case "south": return { x: point.x, y: point.y + distance }
    default: throw new Error(`Unsupported side '${side}'.`)
  }
}

function compactWaypoints(points) {
  const unique = []
  for (const point of points) {
    const previous = unique.at(-1)
    if (previous && previous.x === point.x && previous.y === point.y) continue
    unique.push(point)
  }
  if (unique.length <= 2) return unique
  const compact = [unique[0]]
  for (let index = 1; index < unique.length - 1; index += 1) {
    const before = compact.at(-1)
    const current = unique[index]
    const after = unique[index + 1]
    if ((before.x === current.x && current.x === after.x) || (before.y === current.y && current.y === after.y)) continue
    compact.push(current)
  }
  compact.push(unique.at(-1))
  return compact
}

function corridorWaypoints(edge, sourceGeometry, targetGeometry, minTrack, maxTrack, crossSpan, direction) {
  if (edge.corridorTrack === undefined) return undefined
  const centerTrack = (minTrack + maxTrack) / 2
  const source = sidePoint(sourceGeometry, edge.fromSide)
  const target = sidePoint(targetGeometry, edge.toSide)
  const sourceStub = offsetPoint(source, edge.fromSide)
  const targetStub = offsetPoint(target, edge.toSide)
  if (direction === "top-to-bottom") {
    const railX = GEOMETRY.pageMargin + crossSpan / 2 + (edge.corridorTrack - centerTrack) * GEOMETRY.trackGap
    return compactWaypoints([
      sourceStub,
      { x: railX, y: sourceStub.y },
      { x: railX, y: targetStub.y },
      targetStub
    ])
  }
  const railY = GEOMETRY.pageMargin + crossSpan / 2 + (edge.corridorTrack - centerTrack) * GEOMETRY.trackGap
  return compactWaypoints([
    sourceStub,
    { x: sourceStub.x, y: railY },
    { x: targetStub.x, y: railY },
    targetStub
  ])
}

function segmentIntersectsEnvelopeInterior(a, b, geometry) {
  const left = geometry.x
  const right = geometry.x + geometry.width
  const top = geometry.y
  const bottom = geometry.y + geometry.height
  if (a.x === b.x) {
    if (!(a.x > left && a.x < right)) return false
    const low = Math.min(a.y, b.y)
    const high = Math.max(a.y, b.y)
    return high > top && low < bottom
  }
  if (a.y === b.y) {
    if (!(a.y > top && a.y < bottom)) return false
    const low = Math.min(a.x, b.x)
    const high = Math.max(a.x, b.x)
    return high > left && low < right
  }
  return false
}

function validateCorridorVisibility(edge, sourceGeometry, targetGeometry, nodes) {
  if (!Array.isArray(edge.waypoints) || edge.waypoints.length === 0) return
  const points = [
    sidePoint(sourceGeometry, edge.fromSide),
    ...edge.waypoints,
    sidePoint(targetGeometry, edge.toSide)
  ]
  for (let segmentIndex = 0; segmentIndex < points.length - 1; segmentIndex += 1) {
    const from = points[segmentIndex]
    const to = points[segmentIndex + 1]
    for (const node of nodes) {
      if (!segmentIntersectsEnvelopeInterior(from, to, node.geometry)) continue
      composition(false, "FLOWCHART_CORRIDOR_INTERSECTS_NODE", `Flowchart edge '${edge.id}' corridor crosses node envelope '${node.id}'. Choose a visible endpoint face/corridor or recompose the local group.`, {
        edgeId: edge.id,
        nodeId: node.id,
        segmentIndex,
        segment: { from, to }
      })
    }
  }
}

function resolvedEdgeSides(edge, source, target, direction) {
  let fromSide = edge.fromSide
  let toSide = edge.toSide
  if (!fromSide || !toSide) {
    if (direction === "top-to-bottom") {
      if (target.stage <= source.stage) {
        fromSide ||= "east"
        toSide ||= "east"
      } else {
        fromSide ||= "south"
        toSide ||= "north"
      }
    } else if (target.stage <= source.stage) {
      fromSide ||= "south"
      toSide ||= "south"
    } else {
      fromSide ||= "east"
      toSide ||= "west"
    }
  }
  return { fromSide, toSide }
}

export function buildFlowchartModel(input) {
  const plan = normalizeFlowchartPlan(input)
  const nodesById = new Map(plan.nodes.map(node => [node.id, node]))
  const maxStage = plan.nodes.reduce((max, node) => Math.max(max, node.stage), 0)
  const corridorTracks = plan.edges.flatMap(edge => edge.corridorTrack === undefined ? [] : [edge.corridorTrack])
  const minTrack = [...plan.nodes.map(node => node.track), ...corridorTracks].reduce((min, track) => Math.min(min, track), 0)
  const maxTrack = [...plan.nodes.map(node => node.track), ...corridorTracks].reduce((max, track) => Math.max(max, track), 0)
  const maxNodeWidth = Math.max(...plan.nodes.map(node => NODE_SIZE[node.type].width))
  const maxNodeHeight = Math.max(...plan.nodes.map(node => NODE_SIZE[node.type].height))
  let crossSpan
  let pageWidth
  let pageHeight

  if (plan.direction === "top-to-bottom") {
    crossSpan = maxNodeWidth + GEOMETRY.bandPaddingX * 2 + (maxTrack - minTrack) * GEOMETRY.trackGap
    pageWidth = GEOMETRY.pageMargin * 2 + crossSpan
    pageHeight = GEOMETRY.pageMargin * 2 + GEOMETRY.stageStart + maxStage * GEOMETRY.stageGap + maxNodeHeight + 90
    pageWidth = Math.max(GEOMETRY.minPageHeight, pageWidth)
    pageHeight = Math.max(GEOMETRY.minPageWidth, pageHeight)
  } else {
    crossSpan = maxNodeHeight + GEOMETRY.bandPaddingY * 2 + (maxTrack - minTrack) * GEOMETRY.trackGap
    pageWidth = GEOMETRY.pageMargin * 2 + GEOMETRY.stageStart + maxStage * GEOMETRY.stageGap + maxNodeWidth + 90
    pageHeight = GEOMETRY.pageMargin * 2 + crossSpan
    pageWidth = Math.max(GEOMETRY.minPageWidth, pageWidth)
    pageHeight = Math.max(GEOMETRY.minPageHeight, pageHeight)
  }
  composition(pageWidth <= GEOMETRY.maxPageDimension && pageHeight <= GEOMETRY.maxPageDimension, "FLOWCHART_LAYOUT_PAGE_TOO_LARGE", `Computed page exceeds the ${GEOMETRY.maxPageDimension}px safety limit. Recompose or decompose the plan.`, { width: Math.ceil(pageWidth), height: Math.ceil(pageHeight), max: GEOMETRY.maxPageDimension })

  const nodes = plan.nodes.map(node => {
    const g = nodeRelativeGeometry(node, minTrack, maxTrack, crossSpan, plan.direction)
    const geometry = { ...g, x: g.x + GEOMETRY.pageMargin, y: g.y + GEOMETRY.pageMargin }
    composition(geometry.x >= 0 && geometry.y >= 0, "FLOWCHART_LAYOUT_NODE_OUTSIDE_PAGE", `Node '${node.id}' is outside the page after layout.`)
    return { id: node.id, type: node.type, label: node.label, container: null, geometry }
  })

  validateNodeNonOverlap(nodes)

  const placedNodesById = new Map(nodes.map(node => [node.id, node]))
  const edges = plan.edges.map(edge => {
    const sides = resolvedEdgeSides(edge, nodesById.get(edge.from), nodesById.get(edge.to), plan.direction)
    const routed = { ...edge, ...sides }
    const waypoints = corridorWaypoints(routed, placedNodesById.get(edge.from).geometry, placedNodesById.get(edge.to).geometry, minTrack, maxTrack, crossSpan, plan.direction)
    return {
      id: edge.id,
      type: edge.type,
      from: edge.from,
      to: edge.to,
      label: edge.label,
      ...sides,
      ...(edge.corridorTrack === undefined ? {} : { corridorTrack: edge.corridorTrack, waypoints })
    }
  })

  for (const edge of edges) {
    if (edge.corridorTrack === undefined) continue
    validateCorridorVisibility(edge, placedNodesById.get(edge.from).geometry, placedNodesById.get(edge.to).geometry, nodes)
  }

  return {
    plan,
    layout: {
      schemaVersion: "process-diagram-layout/v2",
      kind: "flowchart",
      direction: plan.direction,
      title: plan.title,
      page: { width: Math.ceil(pageWidth), height: Math.ceil(pageHeight) },
      containers: [],
      nodes,
      edges
    }
  }
}
