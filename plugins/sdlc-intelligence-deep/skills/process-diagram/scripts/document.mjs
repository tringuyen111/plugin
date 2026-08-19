import { isAbsolute, relative, resolve } from "node:path"
import { BOUNDARY, fail } from "./errors.mjs"

export const DOCUMENT_VERSION = "process-diagram-document/v1"
const ID_RE = /^[A-Za-z][A-Za-z0-9._-]{0,63}$/

function object(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_OBJECT_REQUIRED", `${label} must be an object.`)
  return value
}

function array(value, label) {
  if (!Array.isArray(value)) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_ARRAY_REQUIRED", `${label} must be an array.`)
  return value
}

function text(value, label, { max = 160 } = {}) {
  if (typeof value !== "string") throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_TEXT_REQUIRED", `${label} must be a string.`)
  const normalized = value.trim()
  if (!normalized) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_TEXT_EMPTY", `${label} must not be empty.`)
  if (normalized.length > max) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_TEXT_TOO_LONG", `${label} exceeds ${max} characters.`, { length: normalized.length, max })
  return normalized
}

function id(value, label) {
  const normalized = text(value, label, { max: 64 })
  if (!ID_RE.test(normalized)) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_ID_INVALID", `${label} must match ${ID_RE}.`, { value: normalized })
  return normalized
}

function onlyKeys(value, allowed, label) {
  const extras = Object.keys(value).filter(key => !allowed.has(key))
  if (extras.length) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_FIELD_UNSUPPORTED", `${label} contains unsupported field(s): ${extras.join(", ")}.`, { fields: extras })
}

function normalizePage(raw, index) {
  const page = object(raw, `pages[${index}]`)
  onlyKeys(page, new Set(["id", "label", "plan"]), `pages[${index}]`)
  return {
    id: id(page.id, `pages[${index}].id`),
    label: text(page.label, `pages[${index}].label`, { max: 120 }),
    plan: text(page.plan, `pages[${index}].plan`, { max: 260 })
  }
}

function normalizeNavigation(raw, index) {
  const navigation = object(raw, `navigation[${index}]`)
  onlyKeys(navigation, new Set(["fromPage", "fromNode", "toPage"]), `navigation[${index}]`)
  return {
    fromPage: id(navigation.fromPage, `navigation[${index}].fromPage`),
    fromNode: id(navigation.fromNode, `navigation[${index}].fromNode`),
    toPage: id(navigation.toPage, `navigation[${index}].toPage`)
  }
}

export function normalizeDocumentManifest(input) {
  const manifest = object(input, "document")
  onlyKeys(manifest, new Set(["version", "title", "pages", "navigation"]), "document")
  if (manifest.version !== DOCUMENT_VERSION) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_VERSION_UNSUPPORTED", `document.version must be '${DOCUMENT_VERSION}'.`, { actual: manifest.version ?? null })

  const pages = array(manifest.pages, "pages").map(normalizePage)
  if (pages.length < 2) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_PAGES_MINIMUM", "Multi-page document build requires at least two pages.", { pages: pages.length })
  const pageIds = new Set()
  for (const page of pages) {
    if (pageIds.has(page.id)) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_PAGE_ID_DUPLICATE", `Duplicate document page id '${page.id}'.`)
    pageIds.add(page.id)
  }

  const navigation = array(manifest.navigation ?? [], "navigation").map(normalizeNavigation)
  const linkedSources = new Map()
  for (const link of navigation) {
    if (!pageIds.has(link.fromPage)) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_NAVIGATION_SOURCE_PAGE_UNKNOWN", `Navigation source page '${link.fromPage}' is not declared.`)
    if (!pageIds.has(link.toPage)) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_NAVIGATION_TARGET_PAGE_UNKNOWN", `Navigation target page '${link.toPage}' is not declared.`)
    const sourceKey = `${link.fromPage}\u0000${link.fromNode}`
    const prior = linkedSources.get(sourceKey)
    if (prior && prior !== link.toPage) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_NAVIGATION_SOURCE_AMBIGUOUS", `Node '${link.fromNode}' on page '${link.fromPage}' cannot navigate to multiple pages.`, { targets: [prior, link.toPage] })
    if (prior === link.toPage) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_NAVIGATION_DUPLICATE", `Duplicate navigation from '${link.fromPage}:${link.fromNode}' to '${link.toPage}'.`)
    linkedSources.set(sourceKey, link.toPage)
  }

  return {
    version: DOCUMENT_VERSION,
    title: text(manifest.title, "title", { max: 120 }),
    pages,
    navigation
  }
}

export function resolveDocumentPlanPath(manifestPath, planReference) {
  const ref = text(planReference, "page.plan", { max: 260 })
  if (isAbsolute(ref)) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_PLAN_PATH_ABSOLUTE", "Document page plan references must be relative to the manifest for portability.", { plan: ref })
  const base = resolve(manifestPath, "..")
  const target = resolve(base, ref)
  const rel = relative(base, target)
  if (!rel || rel === "." || rel.startsWith("..") || isAbsolute(rel)) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_PLAN_PATH_ESCAPE", "Document page plan reference must stay inside the manifest directory.", { plan: ref })
  return target
}

export function validateDocumentNavigation(document, builtPagesById) {
  for (const link of document.navigation) {
    const page = builtPagesById.get(link.fromPage)
    if (!page) throw fail(BOUNDARY.INTERNAL, "DOCUMENT_PAGE_BUILD_MISSING", `Built page '${link.fromPage}' is missing during navigation validation.`)
    const nodeExists = page.built.plan.nodes.some(node => node.id === link.fromNode)
    if (!nodeExists) throw fail(BOUNDARY.PLAN_CONTRACT, "DOCUMENT_NAVIGATION_SOURCE_NODE_UNKNOWN", `Navigation source node '${link.fromNode}' does not exist on page '${link.fromPage}'.`, { fromPage: link.fromPage, fromNode: link.fromNode })
  }
  return document
}

export function navigationByPage(document) {
  const result = new Map(document.pages.map(page => [page.id, new Map()]))
  for (const link of document.navigation) result.get(link.fromPage).set(link.fromNode, link.toPage)
  return result
}
