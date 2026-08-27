export function edgeLabelRole(edge, sourceType) {
  if (!edge?.label) return "none"
  if (edge.type === "message") return "message"
  if (sourceType === "decision" || String(sourceType || "").startsWith("gateway-")) return "branch-condition"
  return "route"
}
