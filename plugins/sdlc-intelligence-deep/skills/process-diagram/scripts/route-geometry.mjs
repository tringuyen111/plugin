function round(value) {
  return Number.isInteger(value) ? value : Number(value.toFixed(6))
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value))
}

export function terminalFractions(count) {
  if (count <= 1) return [0.5]
  const span = Math.min(0.6, 0.3 * (count - 1))
  const start = 0.5 - span / 2
  const step = span / (count - 1)
  return Array.from({ length: count }, (_, index) => round(start + step * index))
}

export function tangentCoordinate(geometry, side) {
  if (!geometry) return 0
  return side === "west" || side === "east"
    ? geometry.y + geometry.height / 2
    : geometry.x + geometry.width / 2
}

export function fractionTowardPoint(geometry, side, point, fallback = 0.5) {
  if (!geometry || !point) return fallback
  const raw = side === "west" || side === "east"
    ? (point.y - geometry.y) / geometry.height
    : side === "north" || side === "south"
      ? (point.x - geometry.x) / geometry.width
      : fallback
  return Number.isFinite(raw) ? clamp01(raw) : fallback
}

export function terminalPoint(geometry, side, fraction = 0.5) {
  if (!geometry) return null
  switch (side) {
    case "west": return { x: geometry.x, y: geometry.y + geometry.height * fraction }
    case "east": return { x: geometry.x + geometry.width, y: geometry.y + geometry.height * fraction }
    case "north": return { x: geometry.x + geometry.width * fraction, y: geometry.y }
    case "south": return { x: geometry.x + geometry.width * fraction, y: geometry.y + geometry.height }
    default: return null
  }
}

export function routeTerminalAssignments(layout, absoluteNodes) {
  const assignments = new Map((layout.edges || []).map(edge => [edge.id, { sourceFraction: 0.5, targetFraction: 0.5 }]))

  function assignGroups(endpoint) {
    const groups = new Map()
    for (const edge of layout.edges || []) {
      const nodeId = endpoint === "source" ? edge.from : edge.to
      const side = endpoint === "source" ? edge.fromSide : edge.toSide
      const key = `${nodeId}|${side}`
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key).push(edge)
    }
    for (const group of groups.values()) {
      if (group.length <= 1) continue
      const side = endpoint === "source" ? group[0].fromSide : group[0].toSide
      const sorted = [...group].sort((a, b) => {
        const otherA = absoluteNodes.get(endpoint === "source" ? a.to : a.from)
        const otherB = absoluteNodes.get(endpoint === "source" ? b.to : b.from)
        return tangentCoordinate(otherA, side) - tangentCoordinate(otherB, side) || a.id.localeCompare(b.id)
      })
      const fractions = terminalFractions(sorted.length)
      sorted.forEach((edge, index) => {
        const assignment = assignments.get(edge.id)
        if (endpoint === "source") assignment.sourceFraction = fractions[index]
        else assignment.targetFraction = fractions[index]
      })
    }
  }

  assignGroups("source")
  assignGroups("target")

  // Explicit layout route geometry wins over generic same-side spreading.
  // Today this is produced by Flowchart corridorTrack projection. The first/last
  // point determines where the route approaches the already-selected cardinal
  // side; mechanics does not invent a corridor or another side here.
  for (const edge of layout.edges || []) {
    if (!Array.isArray(edge.waypoints) || edge.waypoints.length === 0) continue
    const source = absoluteNodes.get(edge.from)
    const target = absoluteNodes.get(edge.to)
    const assignment = assignments.get(edge.id)
    assignment.sourceFraction = fractionTowardPoint(source, edge.fromSide, edge.waypoints[0], assignment.sourceFraction)
    assignment.targetFraction = fractionTowardPoint(target, edge.toSide, edge.waypoints.at(-1), assignment.targetFraction)
  }

  return assignments
}
