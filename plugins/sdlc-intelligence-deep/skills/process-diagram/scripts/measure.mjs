import { BOUNDARY, fail } from "./errors.mjs"
import { edgeLabelRole } from "./renderer-roles.mjs"
import { fractionTowardPoint, terminalPoint } from "./route-geometry.mjs"

const AXES = new Set(["p", "q"])

function input(condition, code, message, details = undefined) {
  if (!condition) throw fail(BOUNDARY.INPUT, code, message, details)
}

function numeric(value, label) {
  input(Number.isFinite(value), "MEASURE_NUMBER_REQUIRED", `${label} must be a finite number.`, { value })
  return value
}

function nonNegativeInteger(value, label) {
  input(Number.isSafeInteger(value) && value >= 0, "MEASURE_NON_NEGATIVE_INTEGER_REQUIRED", `${label} must be a non-negative safe integer.`, { value })
  return value
}

function containerKey(container) {
  return container ? `${container.kind}:${container.id}` : "__canvas__"
}

function layoutIndexes(layout) {
  const containers = new Map((layout.containers || []).map(container => [containerKey(container), container]))
  const absoluteContainers = new Map()

  function absoluteContainer(key, stack = new Set()) {
    if (absoluteContainers.has(key)) return absoluteContainers.get(key)
    const container = containers.get(key)
    input(container, "MEASURE_CONTAINER_UNKNOWN", `Layout references unknown container '${key}'.`, { key })
    input(!stack.has(key), "MEASURE_CONTAINER_CYCLE", `Layout container hierarchy contains a cycle at '${key}'.`, { key })
    stack.add(key)

    let parentOffset = { x: 0, y: 0 }
    if (container.kind === "lane") {
      input(container.poolId, "MEASURE_LANE_POOL_REQUIRED", `Lane '${container.id}' is missing poolId in the derived layout.`)
      parentOffset = absoluteContainer(`pool:${container.poolId}`, stack)
    }

    const geometry = container.geometry || {}
    const absolute = {
      x: numeric(geometry.x ?? 0, `${key}.geometry.x`) + parentOffset.x,
      y: numeric(geometry.y ?? 0, `${key}.geometry.y`) + parentOffset.y
    }
    stack.delete(key)
    absoluteContainers.set(key, absolute)
    return absolute
  }

  for (const key of containers.keys()) absoluteContainer(key)

  const nodes = new Map()
  for (const node of layout.nodes || []) {
    const geometry = node.geometry || {}
    const offset = node.container ? absoluteContainer(containerKey(node.container)) : { x: 0, y: 0 }
    nodes.set(node.id, {
      id: node.id,
      container: node.container || null,
      geometry: {
        x: numeric(geometry.x, `node:${node.id}.geometry.x`) + offset.x,
        y: numeric(geometry.y, `node:${node.id}.geometry.y`) + offset.y,
        width: numeric(geometry.width, `node:${node.id}.geometry.width`),
        height: numeric(geometry.height, `node:${node.id}.geometry.height`)
      }
    })
  }
  return { nodes }
}

function planNodeMap(plan) {
  return new Map((plan.nodes || []).map(node => [node.id, node]))
}

function projectedAxis(direction, axis) {
  const normalized = String(axis || "").toLowerCase()
  input(AXES.has(normalized), "MEASURE_AXIS_UNSUPPORTED", "measure axis must be P or Q.", { axis })
  if (direction === "left-to-right") return normalized === "p" ? "x" : "y"
  if (direction === "top-to-bottom") return normalized === "p" ? "y" : "x"
  throw fail(BOUNDARY.INTERNAL, "MEASURE_DIRECTION_UNSUPPORTED", `Derived layout has unsupported direction '${direction}'.`)
}

function axisExtent(geometry, physicalAxis) {
  return physicalAxis === "x" ? geometry.width : geometry.height
}

function axisCenter(geometry, physicalAxis) {
  return physicalAxis === "x"
    ? geometry.x + geometry.width / 2
    : geometry.y + geometry.height / 2
}

function nodeOrFail(index, id) {
  const node = index.get(id)
  input(node, "MEASURE_NODE_UNKNOWN", `measure references unknown node '${id}'.`, { nodeId: id })
  return node
}

function edgeOrFail(edges, id) {
  const edge = (edges || []).find(item => item.id === id)
  input(edge, "MEASURE_EDGE_UNKNOWN", `measure references unknown edge '${id}'.`, { edgeId: id })
  return edge
}

function sidePoint(geometry, side, fraction = 0.5) {
  const point = terminalPoint(geometry, side, fraction)
  if (!point) throw fail(BOUNDARY.INTERNAL, "MEASURE_EDGE_SIDE_UNSUPPORTED", `Derived layout edge has unsupported side '${side}'.`)
  return point
}

function inflatedGeometry(geometry, gutter) {
  return {
    x: geometry.x - gutter,
    y: geometry.y - gutter,
    width: geometry.width + gutter * 2,
    height: geometry.height + gutter * 2
  }
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

function edgePath(edge, sourceGeometry, targetGeometry, assignment = { sourceFraction: 0.5, targetFraction: 0.5 }) {
  const source = sidePoint(sourceGeometry, edge.fromSide, assignment.sourceFraction)
  const target = sidePoint(targetGeometry, edge.toSide, assignment.targetFraction)
  if (Array.isArray(edge.waypoints) && edge.waypoints.length > 0) {
    return { mode: "explicit-waypoints", rendererOwnedInterior: false, source, target, points: [source, ...edge.waypoints, target] }
  }
  if (source.x === target.x || source.y === target.y) {
    return { mode: "aligned-direct", rendererOwnedInterior: false, source, target, points: [source, target] }
  }
  return { mode: "renderer-owned-orthogonal", rendererOwnedInterior: true, source, target, points: null }
}

function round(value) {
  return Number.isInteger(value) ? value : Number(value.toFixed(3))
}

function logicalControl({ built, layoutNodes, nodeA, nodeB, axis, requiredCenterGap, gutter, metrics }) {
  const layoutA = nodeOrFail(layoutNodes, nodeA.id)
  const layoutB = nodeOrFail(layoutNodes, nodeB.id)
  const sameFrame = containerKey(layoutA.container) === containerKey(layoutB.container)
  if (!sameFrame) {
    return {
      direct: false,
      field: null,
      gapPx: null,
      currentDelta: null,
      currentSignedDelta: null,
      minimumDelta: null,
      reason: "nodes use different container coordinate frames; measure absolute clearance, then let the Agent choose band order/size and candidate stage/track changes"
    }
  }

  const field = axis === "p" ? "stage" : "track"
  const gapPx = axis === "p" ? metrics.stageGap : metrics.trackGap
  input(Number.isFinite(gapPx) && gapPx > 0, "MEASURE_METRIC_INVALID", `Missing positive ${field} gap for '${built.plan.kind}'.`, { metrics })
  const currentSignedDelta = nodeB[field] - nodeA[field]

  // Tracks are center-step coordinates, so Q clearance is symmetric around
  // node centers. Stages are different: notation geometry anchors each node's
  // leading P edge at stageStart + stage * stageGap. For unequal P extents,
  // the minimum therefore depends on which node is earlier. Mechanics can
  // report both directional constraints, but must not choose that ordering.
  if (axis === "p") {
    const physicalAxis = projectedAxis(built.plan.direction, axis)
    const extentA = axisExtent(layoutA.geometry, physicalAxis)
    const extentB = axisExtent(layoutB.geometry, physicalAxis)
    const minimumDeltaByOrder = {
      bAfterA: Math.ceil((extentA + gutter) / gapPx),
      bBeforeA: Math.ceil((extentB + gutter) / gapPx)
    }
    const minimumDelta = currentSignedDelta > 0
      ? minimumDeltaByOrder.bAfterA
      : currentSignedDelta < 0
        ? minimumDeltaByOrder.bBeforeA
        : null
    return {
      direct: true,
      field,
      gapPx,
      currentDelta: Math.abs(currentSignedDelta),
      currentSignedDelta,
      minimumDelta,
      minimumDeltaByOrder,
      reason: currentSignedDelta === 0
        ? "nodes share the same stage; P ordering is Agent-owned, so mechanics reports directional minima without choosing before/after"
        : null
    }
  }

  return {
    direct: true,
    field,
    gapPx,
    currentDelta: Math.abs(currentSignedDelta),
    currentSignedDelta,
    minimumDelta: Math.ceil(requiredCenterGap / gapPx),
    reason: null
  }
}

export function measurePair({ built, metrics, a, b, axis, gutter = 0 } = {}) {
  input(built?.plan && built?.layout, "MEASURE_MODEL_REQUIRED", "measurePair requires a built process-diagram model.")
  input(typeof a === "string" && a.length > 0, "MEASURE_NODE_ID_REQUIRED", "--a requires a node id.")
  input(typeof b === "string" && b.length > 0, "MEASURE_NODE_ID_REQUIRED", "--b requires a node id.")
  input(a !== b, "MEASURE_DISTINCT_NODES_REQUIRED", "Pair measurement requires two distinct node ids.", { a, b })
  nonNegativeInteger(gutter, "gutter")

  const normalizedAxis = String(axis || "").toLowerCase()
  const physicalAxis = projectedAxis(built.plan.direction, normalizedAxis)
  const layout = layoutIndexes(built.layout)
  const planNodes = planNodeMap(built.plan)
  const layoutA = nodeOrFail(layout.nodes, a)
  const layoutB = nodeOrFail(layout.nodes, b)
  const planA = nodeOrFail(planNodes, a)
  const planB = nodeOrFail(planNodes, b)
  const extentA = axisExtent(layoutA.geometry, physicalAxis)
  const extentB = axisExtent(layoutB.geometry, physicalAxis)
  const centerA = axisCenter(layoutA.geometry, physicalAxis)
  const centerB = axisCenter(layoutB.geometry, physicalAxis)
  const signedOffset = centerB - centerA
  const currentCenterGap = Math.abs(signedOffset)
  const requiredCenterGap = extentA / 2 + extentB / 2 + gutter
  const clearance = currentCenterGap - requiredCenterGap

  return {
    status: "measured",
    stage: "measure",
    mode: "pair-clearance",
    kind: built.plan.kind,
    direction: built.plan.direction,
    scope: "hard node-body occupancy only; label territory and renderer-owned ordinary edge paths are excluded",
    pair: {
      a,
      b,
      axis: normalizedAxis.toUpperCase(),
      physicalAxis: physicalAxis.toUpperCase(),
      gutterPx: gutter,
      extentAPx: round(extentA),
      extentBPx: round(extentB),
      currentCenterGapPx: round(currentCenterGap),
      offsetBFromAPx: round(signedOffset),
      requiredCenterGapPx: round(requiredCenterGap),
      clearancePx: round(clearance),
      clear: clearance >= 0
    },
    logicalControl: logicalControl({ built, layoutNodes: layout.nodes, nodeA: planA, nodeB: planB, axis: normalizedAxis, requiredCenterGap, gutter, metrics })
  }
}

export function measureEnvelope({ built, nodeIds, gutter = 0 } = {}) {
  input(built?.plan && built?.layout, "MEASURE_MODEL_REQUIRED", "measureEnvelope requires a built process-diagram model.")
  input(Array.isArray(nodeIds) && nodeIds.length > 0, "MEASURE_NODE_SET_REQUIRED", "Envelope measurement requires at least one node id.")
  nonNegativeInteger(gutter, "gutter")
  const unique = [...new Set(nodeIds)]
  input(unique.length === nodeIds.length, "MEASURE_NODE_SET_DUPLICATE", "Envelope node ids must be unique.", { nodeIds })

  const layout = layoutIndexes(built.layout)
  const rectangles = unique.map(id => nodeOrFail(layout.nodes, id).geometry)
  const left = Math.min(...rectangles.map(rect => rect.x)) - gutter
  const top = Math.min(...rectangles.map(rect => rect.y)) - gutter
  const right = Math.max(...rectangles.map(rect => rect.x + rect.width)) + gutter
  const bottom = Math.max(...rectangles.map(rect => rect.y + rect.height)) + gutter
  const geometry = { x: left, y: top, width: right - left, height: bottom - top }
  const pSpan = built.plan.direction === "left-to-right" ? geometry.width : geometry.height
  const qSpan = built.plan.direction === "left-to-right" ? geometry.height : geometry.width

  return {
    status: "measured",
    stage: "measure",
    mode: "node-envelope",
    kind: built.plan.kind,
    direction: built.plan.direction,
    scope: "hard node-body occupancy plus caller-supplied outer gutter; label territory and renderer-owned ordinary edge paths are excluded",
    nodes: unique,
    gutterPx: gutter,
    geometry: Object.fromEntries(Object.entries(geometry).map(([key, value]) => [key, round(value)])),
    pSpanPx: round(pSpan),
    qSpanPx: round(qSpan)
  }
}

export function measureEdge({ built, edgeId, gutter = 0 } = {}) {
  input(built?.plan && built?.layout, "MEASURE_MODEL_REQUIRED", "measureEdge requires a built process-diagram model.")
  input(typeof edgeId === "string" && edgeId.length > 0, "MEASURE_EDGE_ID_REQUIRED", "--edge requires an edge id.")
  nonNegativeInteger(gutter, "gutter")

  const layout = layoutIndexes(built.layout)
  const planNodes = planNodeMap(built.plan)
  const edge = edgeOrFail(built.layout.edges, edgeId)
  const source = nodeOrFail(layout.nodes, edge.from)
  const target = nodeOrFail(layout.nodes, edge.to)
  const sourcePlan = nodeOrFail(planNodes, edge.from)
  const assignment = { sourceFraction: 0.5, targetFraction: 0.5 }
  if (Array.isArray(edge.waypoints) && edge.waypoints.length > 0) {
    assignment.sourceFraction = fractionTowardPoint(source.geometry, edge.fromSide, edge.waypoints[0], 0.5)
    assignment.targetFraction = fractionTowardPoint(target.geometry, edge.toSide, edge.waypoints.at(-1), 0.5)
  }
  const path = edgePath(edge, source.geometry, target.geometry, assignment)
  const sourcePeers = (built.layout.edges || [])
    .filter(item => item.from === edge.from && item.fromSide === edge.fromSide)
    .map(item => item.id)
    .sort()
  const targetPeers = (built.layout.edges || [])
    .filter(item => item.to === edge.to && item.toSide === edge.toSide)
    .map(item => item.id)
    .sort()

  let segments = null
  let blockingNodeIds = null
  let clear = null
  let nonOrthogonalSegmentIndexes = []
  let outOfBoundsPointIndexes = []
  if (path.points) {
    const blocked = new Set()
    const page = built.layout.page || {}
    outOfBoundsPointIndexes = path.points.flatMap((point, index) =>
      point.x < 0 || point.y < 0 || point.x > Number(page.width) || point.y > Number(page.height) ? [index] : []
    )
    segments = []
    for (let index = 0; index < path.points.length - 1; index += 1) {
      const from = path.points[index]
      const to = path.points[index + 1]
      const orthogonal = from.x === to.x || from.y === to.y
      if (!orthogonal) nonOrthogonalSegmentIndexes.push(index)
      const segmentBlocking = []
      if (orthogonal) {
        for (const node of layout.nodes.values()) {
          if (node.id === edge.from || node.id === edge.to) continue
          if (!segmentIntersectsEnvelopeInterior(from, to, inflatedGeometry(node.geometry, gutter))) continue
          blocked.add(node.id)
          segmentBlocking.push(node.id)
        }
      }
      segments.push({
        index,
        from: { x: round(from.x), y: round(from.y) },
        to: { x: round(to.x), y: round(to.y) },
        orthogonal,
        blockingNodeIds: segmentBlocking.sort()
      })
    }
    blockingNodeIds = [...blocked].sort()
    clear = blockingNodeIds.length === 0 && nonOrthogonalSegmentIndexes.length === 0 && outOfBoundsPointIndexes.length === 0
  }

  return {
    status: "measured",
    stage: "measure",
    mode: "edge-trace",
    kind: built.plan.kind,
    direction: built.plan.direction,
    scope: "resolved terminals plus explicit/aligned hard-geometry segments only; non-aligned ordinary interior routing remains Draw.io-owned and requires rendered-pixel review",
    edge: {
      id: edge.id,
      type: edge.type,
      from: edge.from,
      to: edge.to,
      fromSide: edge.fromSide,
      toSide: edge.toSide,
      label: edge.label,
      labelRole: edgeLabelRole(edge, sourcePlan.type),
      labelLength: edge.label.length,
      ...(edge.corridorTrack === undefined ? {} : { corridorTrack: edge.corridorTrack }),
      ...(edge.waypoints === undefined ? {} : { waypoints: edge.waypoints.map(point => ({ x: round(point.x), y: round(point.y) })) })
    },
    endpointGeometry: {
      source: { geometry: Object.fromEntries(Object.entries(source.geometry).map(([key, value]) => [key, round(value)])), terminalFraction: round(assignment.sourceFraction), terminal: { x: round(path.source.x), y: round(path.source.y) } },
      target: { geometry: Object.fromEntries(Object.entries(target.geometry).map(([key, value]) => [key, round(value)])), terminalFraction: round(assignment.targetFraction), terminal: { x: round(path.target.x), y: round(path.target.y) } }
    },
    terminalFanout: {
      source: { nodeId: edge.from, side: edge.fromSide, count: sourcePeers.length, edgeIds: sourcePeers },
      target: { nodeId: edge.to, side: edge.toSide, count: targetPeers.length, edgeIds: targetPeers }
    },
    path: {
      mode: path.mode,
      rendererOwnedInterior: path.rendererOwnedInterior,
      points: path.points ? path.points.map(point => ({ x: round(point.x), y: round(point.y) })) : null,
      segments,
      nonOrthogonalSegmentIndexes,
      outOfBoundsPointIndexes,
      blockingNodeIds,
      clear
    }
  }
}
export function assertMaterializableRouteSafety({ built, gutter = 0 } = {}) {
  input(built?.plan && built?.layout, "MEASURE_MODEL_REQUIRED", "assertMaterializableRouteSafety requires a built process-diagram model.")
  nonNegativeInteger(gutter, "gutter")

  let explicitChecked = 0
  for (const edge of built.layout.edges || []) {
    if (!Array.isArray(edge.waypoints) || edge.waypoints.length === 0) continue
    explicitChecked += 1
    const result = measureEdge({ built, edgeId: edge.id, gutter })
    if (result.path.nonOrthogonalSegmentIndexes.length > 0) {
      throw fail(BOUNDARY.COMPOSITION, "DIAGRAM_EXPLICIT_ROUTE_NON_ORTHOGONAL", `Explicit route for edge '${edge.id}' contains non-orthogonal segment(s): ${result.path.nonOrthogonalSegmentIndexes.join(", ")}. Explicit layout route points must form an orthogonal path; mechanics will not reshape them.`, { edgeId: edge.id, segments: result.path.segments })
    }
    if (result.path.outOfBoundsPointIndexes.length > 0) {
      throw fail(BOUNDARY.COMPOSITION, "DIAGRAM_EXPLICIT_ROUTE_OUTSIDE_PAGE", `Explicit route for edge '${edge.id}' leaves the computed page at point(s): ${result.path.outOfBoundsPointIndexes.join(", ")}. Recompose nodes or route points; mechanics will not expand/rewrite the route silently.`, { edgeId: edge.id, page: built.layout.page, points: result.path.points })
    }
    if (result.path.blockingNodeIds.length > 0) {
      throw fail(BOUNDARY.COMPOSITION, "DIAGRAM_EXPLICIT_ROUTE_OBSTRUCTED", `Explicit route for edge '${edge.id}' crosses node envelope(s): ${result.path.blockingNodeIds.join(", ")}. Choose a different supported route intent or recompose the local group; mechanics will not auto-route around the obstruction.`, { edgeId: edge.id, blockingNodeIds: result.path.blockingNodeIds, segments: result.path.segments })
    }
  }

  if (built.plan.kind !== "flowchart") return { status: "pass", checked: explicitChecked, explicitChecked }

  let ordinaryChecked = 0
  for (const edge of built.layout.edges || []) {
    if (edge.corridorTrack !== undefined) continue
    const result = measureEdge({ built, edgeId: edge.id, gutter })
    if (result.path.mode !== "aligned-direct") continue
    ordinaryChecked += 1
    if (result.path.clear !== false) continue
    throw fail(BOUNDARY.COMPOSITION, "FLOWCHART_ORDINARY_ROUTE_OBSTRUCTED", `Flowchart edge '${edge.id}' has a deterministic direct route that crosses node envelope(s): ${result.path.blockingNodeIds.join(", ")}. Choose explicit endpoint sides/corridor or recompose the local group; mechanics will not auto-route around the obstruction.`, {
      edgeId: edge.id,
      from: edge.from,
      to: edge.to,
      fromSide: edge.fromSide,
      toSide: edge.toSide,
      blockingNodeIds: result.path.blockingNodeIds,
      segments: result.path.segments
    })
  }
  return { status: "pass", checked: explicitChecked + ordinaryChecked, explicitChecked, ordinaryChecked }
}

