import { BOUNDARY, assertThat } from "./errors.mjs"

const GEOMETRY = Object.freeze({
  pageMargin: 40,
  minPageWidth: 850,
  minPageHeight: 600,
  maxPageDimension: 20000,
  poolGap: 40,
  poolHeader: 32,
  laneHeader: 28,
  stageStart: 90,
  stageGap: 220,
  trackGap: 62,
  bandPaddingY: 34,
  bandPaddingX: 45,
  minBandHeight: 154,
  minBandWidth: 250
})

export const BPMN_COMPOSITION_METRICS = Object.freeze({
  stageGap: GEOMETRY.stageGap,
  trackGap: GEOMETRY.trackGap
})

const NODE_SIZE = Object.freeze({
  event: { width: 50, height: 50 },
  gateway: { width: 60, height: 60 },
  task: { width: 160, height: 64 },
  subprocess: { width: 180, height: 82 }
})

const NODE_FAMILY = Object.freeze({
  start: "event",
  "start-message": "event",
  "start-timer": "event",
  end: "event",
  "end-message": "event",
  "end-error": "event",
  "end-terminate": "event",
  "intermediate-message": "event",
  "intermediate-timer": "event",
  task: "task",
  "user-task": "task",
  "service-task": "task",
  "manual-task": "task",
  "send-task": "task",
  "receive-task": "task",
  subprocess: "subprocess",
  "gateway-exclusive": "gateway",
  "gateway-parallel": "gateway",
  "gateway-inclusive": "gateway"
})

const SUPPORTED_NODE_TYPES = new Set(Object.keys(NODE_FAMILY))
const SUPPORTED_EDGE_TYPES = new Set(["sequence", "message"])
const SIDES = new Set(["west", "east", "north", "south"])
const DIRECTIONS = new Set(["left-to-right", "top-to-bottom"])
const ID_RE = /^[A-Za-z][A-Za-z0-9_.-]{0,63}$/

function contract(condition, code, message, details = undefined) {
  assertThat(condition, BOUNDARY.PLAN_CONTRACT, code, message, details)
}

function semantic(condition, code, message, details = undefined) {
  assertThat(condition, BOUNDARY.BPMN_SEMANTICS, code, message, details)
}

function composition(condition, code, message, details = undefined) {
  assertThat(condition, BOUNDARY.COMPOSITION, code, message, details)
}

function object(value, label) {
  contract(value && typeof value === "object" && !Array.isArray(value), "BPMN_PLAN_OBJECT_REQUIRED", `${label} must be an object.`)
  return value
}

function array(value, label) {
  contract(Array.isArray(value), "BPMN_PLAN_ARRAY_REQUIRED", `${label} must be an array.`)
  return value
}

function text(value, label, { allowEmpty = false, max = 180 } = {}) {
  contract(typeof value === "string", "BPMN_PLAN_TEXT_REQUIRED", `${label} must be a string.`)
  const normalized = value.trim()
  contract(allowEmpty || normalized.length > 0, "BPMN_PLAN_TEXT_EMPTY", `${label} must not be empty.`)
  contract(normalized.length <= max, "BPMN_PLAN_TEXT_TOO_LONG", `${label} exceeds ${max} characters.`, { length: normalized.length, max })
  return normalized
}

function id(value, label) {
  const normalized = text(value, label, { max: 64 })
  contract(ID_RE.test(normalized), "BPMN_PLAN_ID_INVALID", `${label} must match ${ID_RE}.`, { value: normalized })
  return normalized
}

function integer(value, label, { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = {}) {
  contract(Number.isSafeInteger(value) && value >= min && value <= max, "BPMN_PLAN_INTEGER_INVALID", `${label} must be a safe integer from ${min} to ${max}.`, { value })
  return value
}

function normalizePool(raw, index) {
  object(raw, `pools[${index}]`)
  return { id: id(raw.id, `pools[${index}].id`), label: text(raw.label ?? raw.id, `pools[${index}].label`, { max: 100 }) }
}

function normalizeLane(raw, index) {
  object(raw, `lanes[${index}]`)
  return {
    id: id(raw.id, `lanes[${index}].id`),
    poolId: id(raw.poolId, `lanes[${index}].poolId`),
    label: text(raw.label ?? raw.id, `lanes[${index}].label`, { max: 100 })
  }
}

function normalizeNode(raw, index) {
  object(raw, `nodes[${index}]`)
  const type = text(raw.type, `nodes[${index}].type`, { max: 40 })
  semantic(SUPPORTED_NODE_TYPES.has(type), "BPMN_NODE_TYPE_UNSUPPORTED", `Unsupported BPMN node type '${type}'.`, { supported: [...SUPPORTED_NODE_TYPES] })
  const node = {
    id: id(raw.id, `nodes[${index}].id`),
    type,
    label: text(raw.label ?? "", `nodes[${index}].label`, { allowEmpty: true, max: 160 }),
    stage: integer(raw.stage, `nodes[${index}].stage`, { min: 0 }),
    track: integer(raw.track ?? 0, `nodes[${index}].track`)
  }
  if (raw.poolId !== undefined) node.poolId = id(raw.poolId, `nodes[${index}].poolId`)
  if (raw.laneId !== undefined) node.laneId = id(raw.laneId, `nodes[${index}].laneId`)
  return node
}

function normalizeEdge(raw, index) {
  object(raw, `edges[${index}]`)
  const type = text(raw.type ?? "sequence", `edges[${index}].type`, { max: 30 })
  semantic(SUPPORTED_EDGE_TYPES.has(type), "BPMN_EDGE_TYPE_UNSUPPORTED", `Unsupported BPMN edge type '${type}'.`, { supported: [...SUPPORTED_EDGE_TYPES] })
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
      composition(SIDES.has(side), "BPMN_EDGE_SIDE_UNSUPPORTED", `${key} must be one of ${[...SIDES].join(", ")}.`, { value: side })
      edge[key] = side
    }
  }
  composition(raw.waypoints === undefined, "BPMN_EDGE_WAYPOINTS_UNSUPPORTED", "BPMN plan-level waypoints are unsupported. Compose with lane order, stage/track, and endpoint sides; if those controls cannot preserve a material route relation, report a translator gap instead of persisting pixel route geometry.", { edgeId: edge.id })
  composition(raw.corridorTrack === undefined, "BPMN_EDGE_CORRIDOR_TRACK_UNSUPPORTED", "corridorTrack is currently implemented only for Flowchart edges. BPMN has no canonical interior-route primitive; recompose with lane order, stage/track, and endpoint sides or report a translator gap.", { edgeId: edge.id })
  return edge
}

function normalizeBpmnPlan(input) {
  const plan = object(input, "plan")
  contract(plan.version === "process-diagram-plan/v1", "BPMN_PLAN_VERSION_UNSUPPORTED", "version must be 'process-diagram-plan/v1'.", { actual: plan.version ?? null })
  semantic(plan.kind === "bpmn", "BPMN_KIND_REQUIRED", "BPMN library requires kind 'bpmn'.", { actual: plan.kind ?? null })
  const direction = plan.direction ?? "left-to-right"
  composition(DIRECTIONS.has(direction), "BPMN_DIRECTION_UNSUPPORTED", "BPMN direction must be 'left-to-right' or 'top-to-bottom'.", { actual: direction })

  const normalized = {
    version: "process-diagram-plan/v1",
    kind: "bpmn",
    title: text(plan.title ?? "Process", "title", { max: 120 }),
    direction,
    pools: array(plan.pools ?? [], "pools").map(normalizePool),
    lanes: array(plan.lanes ?? [], "lanes").map(normalizeLane),
    nodes: array(plan.nodes ?? [], "nodes").map(normalizeNode),
    edges: array(plan.edges ?? [], "edges").map(normalizeEdge)
  }
  contract(normalized.nodes.length > 0, "BPMN_NODES_REQUIRED", "At least one BPMN node is required.")

  const pools = new Map()
  const lanes = new Map()
  const nodes = new Map()
  const edges = new Map()
  for (const pool of normalized.pools) {
    contract(!pools.has(pool.id), "BPMN_POOL_ID_DUPLICATE", `Duplicate pool id '${pool.id}'.`)
    pools.set(pool.id, pool)
  }
  for (const lane of normalized.lanes) {
    contract(!lanes.has(lane.id), "BPMN_LANE_ID_DUPLICATE", `Duplicate lane id '${lane.id}'.`)
    contract(pools.has(lane.poolId), "BPMN_LANE_POOL_UNKNOWN", `Lane '${lane.id}' references unknown pool '${lane.poolId}'.`)
    lanes.set(lane.id, lane)
  }
  for (const node of normalized.nodes) {
    contract(!nodes.has(node.id), "BPMN_NODE_ID_DUPLICATE", `Duplicate node id '${node.id}'.`)
    if (node.laneId) {
      const lane = lanes.get(node.laneId)
      contract(lane, "BPMN_NODE_LANE_UNKNOWN", `Node '${node.id}' references unknown lane '${node.laneId}'.`)
      if (node.poolId) contract(node.poolId === lane.poolId, "BPMN_NODE_POOL_LANE_CONFLICT", `Node '${node.id}' poolId conflicts with lane '${node.laneId}'.`)
      node.poolId = lane.poolId
    }
    if (node.poolId) contract(pools.has(node.poolId), "BPMN_NODE_POOL_UNKNOWN", `Node '${node.id}' references unknown pool '${node.poolId}'.`)
    if (normalized.pools.length > 0) contract(node.poolId, "BPMN_NODE_POOL_REQUIRED", `Node '${node.id}' requires poolId or laneId because pools are declared.`)
    nodes.set(node.id, node)
  }

  const lanesByPool = new Map(normalized.pools.map(pool => [pool.id, normalized.lanes.filter(lane => lane.poolId === pool.id)]))
  for (const node of normalized.nodes) {
    if (!node.poolId) continue
    const declaredLanes = lanesByPool.get(node.poolId) || []
    if (declaredLanes.length > 0) contract(node.laneId, "BPMN_NODE_LANE_REQUIRED", `Node '${node.id}' must belong to a lane because pool '${node.poolId}' declares lanes.`)
  }

  for (const edge of normalized.edges) {
    contract(!edges.has(edge.id), "BPMN_EDGE_ID_DUPLICATE", `Duplicate edge id '${edge.id}'.`)
    const source = nodes.get(edge.from)
    const target = nodes.get(edge.to)
    contract(source, "BPMN_EDGE_SOURCE_UNKNOWN", `Edge '${edge.id}' references unknown source '${edge.from}'.`)
    contract(target, "BPMN_EDGE_TARGET_UNKNOWN", `Edge '${edge.id}' references unknown target '${edge.to}'.`)
    semantic(source.id !== target.id, "BPMN_EDGE_SELF_LOOP_UNSUPPORTED", `Edge '${edge.id}' cannot connect a node to itself in the current library.`)
    if (edge.type === "sequence") {
      semantic((source.poolId ?? null) === (target.poolId ?? null), "BPMN_SEQUENCE_CROSSES_POOL", `Sequence flow '${edge.id}' cannot cross participant pools.`, { fromPool: source.poolId ?? null, toPool: target.poolId ?? null })
    }
    if (edge.type === "message") {
      semantic(source.poolId && target.poolId && source.poolId !== target.poolId, "BPMN_MESSAGE_REQUIRES_DISTINCT_POOLS", `Message flow '${edge.id}' requires two distinct participant pools.`, { fromPool: source.poolId ?? null, toPool: target.poolId ?? null })
    }
    edges.set(edge.id, edge)
  }

  const incomingSequence = new Map(normalized.nodes.map(node => [node.id, 0]))
  const outgoingSequence = new Map(normalized.nodes.map(node => [node.id, 0]))
  for (const edge of normalized.edges.filter(item => item.type === "sequence")) {
    incomingSequence.set(edge.to, incomingSequence.get(edge.to) + 1)
    outgoingSequence.set(edge.from, outgoingSequence.get(edge.from) + 1)
  }
  for (const node of normalized.nodes) {
    if (node.type.startsWith("start")) semantic(incomingSequence.get(node.id) === 0, "BPMN_START_HAS_INCOMING_SEQUENCE", `Start event '${node.id}' cannot have incoming sequence flow.`)
    if (node.type.startsWith("end")) semantic(outgoingSequence.get(node.id) === 0, "BPMN_END_HAS_OUTGOING_SEQUENCE", `End event '${node.id}' cannot have outgoing sequence flow.`)
  }
  for (const node of normalized.nodes) {
    if (!node.type.startsWith("start")) semantic(incomingSequence.get(node.id) > 0, "BPMN_FLOW_NODE_MISSING_INCOMING_SEQUENCE", `Flow node '${node.id}' requires incoming sequence control in the current executable subset. Message flow does not carry the participant's control token.`, { nodeId: node.id, nodeType: node.type })
  }
  for (const node of normalized.nodes) {
    if (!node.type.startsWith("end")) semantic(outgoingSequence.get(node.id) > 0, "BPMN_FLOW_NODE_MISSING_OUTGOING_SEQUENCE", `Flow node '${node.id}' requires outgoing sequence control in the current executable subset. Use an explicit End Event for a terminal path.`, { nodeId: node.id, nodeType: node.type })
  }

  const slots = new Set()
  for (const node of normalized.nodes) {
    const band = node.laneId || node.poolId || "__canvas__"
    const key = `${band}|${node.stage}|${node.track}`
    composition(!slots.has(key), "BPMN_COMPOSITION_SLOT_COLLISION", `Two nodes occupy the same stage/track slot '${key}'.`, { nodeId: node.id })
    slots.add(key)
  }

  return normalized
}

function sizeForNode(node) {
  return NODE_SIZE[NODE_FAMILY[node.type]]
}

function horizontalBandLayout(nodes) {
  const tracks = nodes.map(node => node.track)
  const minTrack = tracks.length ? Math.min(...tracks) : 0
  const maxTrack = tracks.length ? Math.max(...tracks) : 0
  const centerTrack = (minTrack + maxTrack) / 2
  const maxHeight = nodes.reduce((max, node) => Math.max(max, sizeForNode(node).height), NODE_SIZE.task.height)
  const trackSpan = maxTrack - minTrack
  const height = Math.max(GEOMETRY.minBandHeight, maxHeight + GEOMETRY.bandPaddingY * 2 + trackSpan * GEOMETRY.trackGap)
  return { height, centerTrack }
}

function verticalBandLayout(nodes) {
  const tracks = nodes.map(node => node.track)
  const minTrack = tracks.length ? Math.min(...tracks) : 0
  const maxTrack = tracks.length ? Math.max(...tracks) : 0
  const centerTrack = (minTrack + maxTrack) / 2
  const maxWidth = nodes.reduce((max, node) => Math.max(max, sizeForNode(node).width), NODE_SIZE.task.width)
  const trackSpan = maxTrack - minTrack
  const width = Math.max(GEOMETRY.minBandWidth, maxWidth + GEOMETRY.bandPaddingX * 2 + trackSpan * GEOMETRY.trackGap)
  return { width, centerTrack }
}

function nodeRelativeGeometry(node, layout, direction) {
  const size = sizeForNode(node)
  if (direction === "top-to-bottom") {
    return {
      x: layout.width / 2 - size.width / 2 + (node.track - layout.centerTrack) * GEOMETRY.trackGap,
      y: GEOMETRY.stageStart + node.stage * GEOMETRY.stageGap,
      width: size.width,
      height: size.height
    }
  }
  return {
    x: GEOMETRY.stageStart + node.stage * GEOMETRY.stageGap,
    y: layout.height / 2 - size.height / 2 + (node.track - layout.centerTrack) * GEOMETRY.trackGap,
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

function nodeContainerKey(node) {
  return node.container ? `${node.container.kind}:${node.container.id}` : "__canvas__"
}

function validateNodeNonOverlap(nodes) {
  const nodesByContainer = new Map()
  for (const node of nodes) {
    const key = nodeContainerKey(node)
    if (!nodesByContainer.has(key)) nodesByContainer.set(key, [])
    nodesByContainer.get(key).push(node)
  }

  for (const [container, members] of nodesByContainer) {
    const ordered = [...members].sort((a, b) => a.geometry.x - b.geometry.x || a.geometry.y - b.geometry.y || a.id.localeCompare(b.id))
    for (let leftIndex = 0; leftIndex < ordered.length; leftIndex += 1) {
      const left = ordered[leftIndex]
      const leftRight = left.geometry.x + left.geometry.width
      for (let rightIndex = leftIndex + 1; rightIndex < ordered.length; rightIndex += 1) {
        const right = ordered[rightIndex]
        if (right.geometry.x >= leftRight) break
        if (!rectanglesOverlapInterior(left.geometry, right.geometry)) continue
        composition(false, "BPMN_COMPOSITION_NODE_OVERLAP", `BPMN nodes '${left.id}' and '${right.id}' overlap after physical projection. Recompose stage/track spacing; mechanics will not move nodes automatically.`, {
          nodeAId: left.id,
          nodeBId: right.id,
          container,
          geometryA: left.geometry,
          geometryB: right.geometry
        })
      }
    }
  }
}

function resolvedEdgeSides(edge, source, target, poolOrder, direction) {
  let fromSide = edge.fromSide
  let toSide = edge.toSide
  if (!fromSide || !toSide) {
    if (edge.type === "message" && source.poolId && target.poolId) {
      const fromIndex = poolOrder.get(source.poolId) ?? 0
      const toIndex = poolOrder.get(target.poolId) ?? 0
      const forward = toIndex >= fromIndex
      if (direction === "top-to-bottom") {
        fromSide ||= forward ? "east" : "west"
        toSide ||= forward ? "west" : "east"
      } else {
        fromSide ||= forward ? "south" : "north"
        toSide ||= forward ? "north" : "south"
      }
    } else if (direction === "top-to-bottom") {
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

export function buildBpmnModel(input) {
  const plan = normalizeBpmnPlan(input)
  const maxStage = plan.nodes.reduce((max, node) => Math.max(max, node.stage), 0)
  const contentWidth = GEOMETRY.stageStart + maxStage * GEOMETRY.stageGap + NODE_SIZE.subprocess.width + 90
  const contentHeight = GEOMETRY.stageStart + maxStage * GEOMETRY.stageGap + NODE_SIZE.subprocess.height + 90
  const lanesByPool = new Map(plan.pools.map(pool => [pool.id, plan.lanes.filter(lane => lane.poolId === pool.id)]))
  const nodesById = new Map(plan.nodes.map(node => [node.id, node]))
  const poolOrder = new Map(plan.pools.map((pool, index) => [pool.id, index]))

  const containers = []
  const placedNodes = []
  let pageWidth
  let pageHeight

  if (plan.direction === "top-to-bottom") {
    if (plan.pools.length === 0) {
      const layout = verticalBandLayout(plan.nodes)
      pageWidth = GEOMETRY.pageMargin * 2 + layout.width
      pageHeight = GEOMETRY.pageMargin * 2 + contentHeight
      for (const node of plan.nodes) {
        const g = nodeRelativeGeometry(node, layout, plan.direction)
        const geometry = { ...g, x: g.x + GEOMETRY.pageMargin, y: g.y + GEOMETRY.pageMargin }
        placedNodes.push({ id: node.id, type: node.type, label: node.label, container: null, geometry })
        composition(geometry.x >= 0 && geometry.y >= 0, "BPMN_LAYOUT_NODE_OUTSIDE_PAGE", `Node '${node.id}' is outside the page after layout.`)
      }
    } else {
      let xCursor = GEOMETRY.pageMargin
      let maxPoolHeight = 0
      for (const pool of plan.pools) {
        const poolLanes = lanesByPool.get(pool.id) || []
        const poolNodes = plan.nodes.filter(node => node.poolId === pool.id)
        let poolWidth
        let poolHeight
        let poolBand = null
        const laneLayouts = []

        if (poolLanes.length > 0) {
          let laneX = 0
          for (const lane of poolLanes) {
            const laneNodes = poolNodes.filter(node => node.laneId === lane.id)
            const band = verticalBandLayout(laneNodes)
            laneLayouts.push({ lane, x: laneX, band, nodes: laneNodes })
            laneX += band.width
          }
          poolWidth = laneX
          poolHeight = GEOMETRY.poolHeader + GEOMETRY.laneHeader + contentHeight
        } else {
          poolBand = verticalBandLayout(poolNodes)
          poolWidth = poolBand.width
          poolHeight = GEOMETRY.poolHeader + contentHeight
        }

        containers.push({
          kind: "pool",
          id: pool.id,
          label: pool.label,
          headerSize: GEOMETRY.poolHeader,
          geometry: { x: xCursor, y: GEOMETRY.pageMargin, width: poolWidth, height: poolHeight }
        })

        if (poolLanes.length > 0) {
          for (const laneLayout of laneLayouts) {
            containers.push({
              kind: "lane",
              id: laneLayout.lane.id,
              poolId: pool.id,
              label: laneLayout.lane.label,
              headerSize: GEOMETRY.laneHeader,
              geometry: { x: laneLayout.x, y: GEOMETRY.poolHeader, width: laneLayout.band.width, height: poolHeight - GEOMETRY.poolHeader }
            })
            for (const node of laneLayout.nodes) {
              const geometry = nodeRelativeGeometry(node, laneLayout.band, plan.direction)
              placedNodes.push({ id: node.id, type: node.type, label: node.label, container: { kind: "lane", id: laneLayout.lane.id }, geometry })
              composition(xCursor + laneLayout.x + geometry.x >= 0 && GEOMETRY.pageMargin + GEOMETRY.poolHeader + geometry.y >= 0, "BPMN_LAYOUT_NODE_OUTSIDE_PAGE", `Node '${node.id}' is outside the page after layout.`)
            }
          }
        } else {
          for (const node of poolNodes) {
            const geometry = nodeRelativeGeometry(node, poolBand, plan.direction)
            placedNodes.push({ id: node.id, type: node.type, label: node.label, container: { kind: "pool", id: pool.id }, geometry })
            composition(xCursor + geometry.x >= 0 && GEOMETRY.pageMargin + geometry.y >= 0, "BPMN_LAYOUT_NODE_OUTSIDE_PAGE", `Node '${node.id}' is outside the page after layout.`)
          }
        }
        xCursor += poolWidth + GEOMETRY.poolGap
        maxPoolHeight = Math.max(maxPoolHeight, poolHeight)
      }
      pageWidth = xCursor - GEOMETRY.poolGap + GEOMETRY.pageMargin
      pageHeight = GEOMETRY.pageMargin * 2 + maxPoolHeight
    }
    pageWidth = Math.max(GEOMETRY.minPageHeight, pageWidth)
    pageHeight = Math.max(GEOMETRY.minPageWidth, pageHeight)
  } else {
    if (plan.pools.length === 0) {
      const layout = horizontalBandLayout(plan.nodes)
      pageWidth = GEOMETRY.pageMargin * 2 + contentWidth
      pageHeight = GEOMETRY.pageMargin * 2 + layout.height
      for (const node of plan.nodes) {
        const g = nodeRelativeGeometry(node, layout, plan.direction)
        const geometry = { ...g, x: g.x + GEOMETRY.pageMargin, y: g.y + GEOMETRY.pageMargin }
        placedNodes.push({ id: node.id, type: node.type, label: node.label, container: null, geometry })
        composition(geometry.y >= 0, "BPMN_LAYOUT_NODE_OUTSIDE_PAGE", `Node '${node.id}' is outside the page after layout.`)
      }
    } else {
      const poolWidth = GEOMETRY.poolHeader + GEOMETRY.laneHeader + contentWidth
      let yCursor = GEOMETRY.pageMargin
      for (const pool of plan.pools) {
        const poolLanes = lanesByPool.get(pool.id) || []
        const poolNodes = plan.nodes.filter(node => node.poolId === pool.id)
        let poolHeight
        let poolBand = null
        const laneLayouts = []
        if (poolLanes.length > 0) {
          let laneY = 0
          for (const lane of poolLanes) {
            const laneNodes = poolNodes.filter(node => node.laneId === lane.id)
            const band = horizontalBandLayout(laneNodes)
            laneLayouts.push({ lane, y: laneY, band, nodes: laneNodes })
            laneY += band.height
          }
          poolHeight = laneY
        } else {
          poolBand = horizontalBandLayout(poolNodes)
          poolHeight = poolBand.height
        }

        containers.push({
          kind: "pool",
          id: pool.id,
          label: pool.label,
          headerSize: GEOMETRY.poolHeader,
          geometry: { x: GEOMETRY.pageMargin, y: yCursor, width: poolWidth, height: poolHeight }
        })

        if (poolLanes.length > 0) {
          for (const laneLayout of laneLayouts) {
            containers.push({
              kind: "lane",
              id: laneLayout.lane.id,
              poolId: pool.id,
              label: laneLayout.lane.label,
              headerSize: GEOMETRY.laneHeader,
              geometry: { x: GEOMETRY.poolHeader, y: laneLayout.y, width: poolWidth - GEOMETRY.poolHeader, height: laneLayout.band.height }
            })
            for (const node of laneLayout.nodes) {
              const geometry = nodeRelativeGeometry(node, laneLayout.band, plan.direction)
              placedNodes.push({ id: node.id, type: node.type, label: node.label, container: { kind: "lane", id: laneLayout.lane.id }, geometry })
              composition(yCursor + laneLayout.y + geometry.y >= 0, "BPMN_LAYOUT_NODE_OUTSIDE_PAGE", `Node '${node.id}' is outside the page after layout.`)
            }
          }
        } else {
          for (const node of poolNodes) {
            const geometry = nodeRelativeGeometry(node, poolBand, plan.direction)
            placedNodes.push({ id: node.id, type: node.type, label: node.label, container: { kind: "pool", id: pool.id }, geometry })
            composition(yCursor + geometry.y >= 0, "BPMN_LAYOUT_NODE_OUTSIDE_PAGE", `Node '${node.id}' is outside the page after layout.`)
          }
        }
        yCursor += poolHeight + GEOMETRY.poolGap
      }
      pageWidth = GEOMETRY.pageMargin * 2 + poolWidth
      pageHeight = yCursor - GEOMETRY.poolGap + GEOMETRY.pageMargin
    }
    pageWidth = Math.max(GEOMETRY.minPageWidth, pageWidth)
    pageHeight = Math.max(GEOMETRY.minPageHeight, pageHeight)
  }

  composition(pageWidth <= GEOMETRY.maxPageDimension && pageHeight <= GEOMETRY.maxPageDimension, "BPMN_LAYOUT_PAGE_TOO_LARGE", `Computed page exceeds the ${GEOMETRY.maxPageDimension}px safety limit. Recompose or decompose the plan.`, { width: Math.ceil(pageWidth), height: Math.ceil(pageHeight), max: GEOMETRY.maxPageDimension })
  validateNodeNonOverlap(placedNodes)

  const edges = plan.edges.map(edge => ({
    id: edge.id,
    type: edge.type,
    from: edge.from,
    to: edge.to,
    label: edge.label,
    ...resolvedEdgeSides(edge, nodesById.get(edge.from), nodesById.get(edge.to), poolOrder, plan.direction)
  }))

  return {
    plan,
    layout: {
      schemaVersion: "process-diagram-layout/v2",
      kind: "bpmn",
      direction: plan.direction,
      title: plan.title,
      page: { width: Math.ceil(pageWidth), height: Math.ceil(pageHeight) },
      containers,
      nodes: placedNodes,
      edges
    }
  }
}
