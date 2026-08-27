import test from "node:test"
import assert from "node:assert/strict"
import { buildFlowchartModel } from "../flowchart.mjs"
import { serializeDrawio, serializeDrawioDocument, validateDrawioXml } from "../drawio.mjs"

function branchingFlowchart() {
  return buildFlowchartModel({
    version: "process-diagram-plan/v1",
    kind: "flowchart",
    title: "Draw.io terminal translation probe",
    direction: "left-to-right",
    nodes: [
      { id: "start", type: "start", label: "Start", stage: 0, track: 0 },
      { id: "decision", type: "decision", label: "Choose", stage: 1, track: 0 },
      { id: "a", type: "process", label: "A", stage: 2, track: -1 },
      { id: "b", type: "process", label: "B", stage: 2, track: 1 },
      { id: "merge", type: "process", label: "Merge", stage: 3, track: 0 },
      { id: "end", type: "end", label: "End", stage: 4, track: 0 }
    ],
    edges: [
      { id: "e1", type: "flow", from: "start", to: "decision" },
      { id: "e2", type: "flow", from: "decision", to: "a", label: "A" },
      { id: "e3", type: "flow", from: "decision", to: "b", label: "B" },
      { id: "e4", type: "flow", from: "a", to: "merge" },
      { id: "e5", type: "flow", from: "b", to: "merge" },
      { id: "e6", type: "flow", from: "merge", to: "end", label: "Done" }
    ]
  })
}

function cellXml(xml, edgeId) {
  const match = xml.match(new RegExp(`<mxCell[^>]*id="edge:${edgeId}"[^>]*>[\\s\\S]*?<\\/mxCell>`))
  assert.ok(match, `missing edge cell ${edgeId}`)
  return match[0]
}

function styleNumber(cell, key) {
  const match = cell.match(new RegExp(`${key}=([0-9.]+);`))
  assert.ok(match, `missing ${key}`)
  return Number(match[1])
}

test("Draw.io translator preserves centered terminals for single-edge node-sides", () => {
  const xml = serializeDrawio(branchingFlowchart().layout)
  const e1 = cellXml(xml, "e1")
  assert.equal(styleNumber(e1, "exitY"), 0.5)
  assert.equal(styleNumber(e1, "entryY"), 0.5)
})

test("Draw.io translator allocates distinct deterministic source slots for same-side fan-out", () => {
  const xml = serializeDrawio(branchingFlowchart().layout)
  const e2 = cellXml(xml, "e2")
  const e3 = cellXml(xml, "e3")
  assert.equal(styleNumber(e2, "exitX"), 1)
  assert.equal(styleNumber(e3, "exitX"), 1)
  assert.notEqual(styleNumber(e2, "exitY"), styleNumber(e3, "exitY"))
  assert.deepEqual([styleNumber(e2, "exitY"), styleNumber(e3, "exitY")].sort(), [0.35, 0.65])
})

test("Draw.io translator allocates distinct deterministic target slots for same-side convergence", () => {
  const xml = serializeDrawio(branchingFlowchart().layout)
  const e4 = cellXml(xml, "e4")
  const e5 = cellXml(xml, "e5")
  assert.equal(styleNumber(e4, "entryX"), 0)
  assert.equal(styleNumber(e5, "entryX"), 0)
  assert.notEqual(styleNumber(e4, "entryY"), styleNumber(e5, "entryY"))
  assert.deepEqual([styleNumber(e4, "entryY"), styleNumber(e5, "entryY")].sort(), [0.35, 0.65])
})

test("Draw.io translator applies semantic edge-label roles without plan style fields", () => {
  const xml = serializeDrawio(branchingFlowchart().layout)
  const branch = cellXml(xml, "e2")
  const route = cellXml(xml, "e6")
  const unlabeled = cellXml(xml, "e1")

  assert.match(branch, /fontFamily=Helvetica;/)
  assert.match(branch, /fontSize=11;/)
  assert.match(branch, /fontStyle=1;/)
  assert.match(branch, /labelBackgroundColor=#ffffff;/)
  assert.match(branch, /<mxGeometry x="-0\.55" y="-8" relative="1" as="geometry"><mxPoint as="offset"\/><\/mxGeometry>/)

  assert.match(route, /fontColor=#334155;/)
  assert.match(route, /fontSize=11;/)
  assert.match(route, /spacing=2;/)
  assert.match(route, /<mxGeometry x="0" y="-8" relative="1" as="geometry"><mxPoint as="offset"\/><\/mxGeometry>/)

  assert.doesNotMatch(unlabeled, /labelBackgroundColor=/)
})

test("Draw.io translator gives message labels a distinct secondary role and offset", () => {
  const layout = {
    schemaVersion: "process-diagram-layout/v2",
    kind: "bpmn",
    title: "Message label role",
    direction: "left-to-right",
    page: { width: 640, height: 320 },
    containers: [],
    nodes: [
      { id: "send", type: "send-task", label: "Send", geometry: { x: 80, y: 100, width: 160, height: 64 } },
      { id: "receive", type: "receive-task", label: "Receive", geometry: { x: 400, y: 100, width: 160, height: 64 } }
    ],
    edges: [
      { id: "m1", type: "message", from: "send", to: "receive", label: "Request", fromSide: "east", toSide: "west" }
    ]
  }
  const xml = serializeDrawio(layout)
  const message = cellXml(xml, "m1")
  assert.match(message, /dashed=1;/)
  assert.match(message, /fontColor=#475569;/)
  assert.match(message, /fontSize=11;/)
  assert.match(message, /labelBackgroundColor=#ffffff;/)
  assert.match(message, /<mxGeometry x="0" y="-10" relative="1" as="geometry"><mxPoint as="offset"\/><\/mxGeometry>/)
})


test("Draw.io translator places cross-participant message labels near the participant gap", () => {
  const layout = {
    schemaVersion: "process-diagram-layout/v2",
    kind: "bpmn",
    title: "Participant gap label",
    direction: "left-to-right",
    page: { width: 640, height: 400 },
    containers: [
      { id: "p1", kind: "pool", label: "A", headerSize: 30, geometry: { x: 0, y: 0, width: 640, height: 120 } },
      { id: "p2", kind: "pool", label: "B", headerSize: 30, geometry: { x: 0, y: 200, width: 640, height: 120 } }
    ],
    nodes: [
      { id: "send", type: "send-task", label: "Send", container: { kind: "pool", id: "p1" }, geometry: { x: 100, y: 30, width: 120, height: 40 } },
      { id: "receive", type: "receive-task", label: "Receive", container: { kind: "pool", id: "p2" }, geometry: { x: 100, y: 30, width: 120, height: 40 } }
    ],
    edges: [
      { id: "m1", type: "message", from: "send", to: "receive", label: "Request", fromSide: "south", toSide: "north" }
    ]
  }
  const xml = serializeDrawio(layout)
  const message = cellXml(xml, "m1")
  assert.match(message, /<mxGeometry x="0\.125" y="-10" relative="1" as="geometry"><mxPoint as="offset"\/><\/mxGeometry>/)
})

test("Draw.io connector roles use line jumps as non-join crossing notation", () => {
  const xml = serializeDrawio(branchingFlowchart().layout)
  for (const edgeId of ["e1", "e2", "e6"]) {
    const edge = cellXml(xml, edgeId)
    assert.match(edge, /jumpStyle=arc;/)
    assert.match(edge, /jumpSize=6;/)
  }
})

test("translated Draw.io XML remains structurally valid", () => {
  const xml = serializeDrawio(branchingFlowchart().layout)
  const validation = validateDrawioXml(xml)
  assert.equal(validation.status, "pass")
})


test("Draw.io validator accepts object metadata wrappers with wrapper-owned ids", () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile compressed="false"><diagram id="p1" name="Metadata"><mxGraphModel><root>
<mxCell id="0"/><mxCell id="1" parent="0"/>
<object id="node:approve" label="Approve" tooltip="Owner: Risk" tags="control critical" link="https://example.com/control/27" controlId="CTRL-27">
  <mxCell style="rounded=1;html=1;" vertex="1" parent="1"><mxGeometry x="10" y="10" width="120" height="50" as="geometry"/></mxCell>
</object>
</root></mxGraphModel></diagram></mxfile>`
  const validation = validateDrawioXml(xml)
  assert.equal(validation.status, "pass")
  assert.equal(validation.data.vertexCount, 1)
  assert.equal(validation.data.cellCount, 3)
})

test("Draw.io validator rejects ambiguous wrapper and nested cell ids", () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile compressed="false"><diagram id="p1" name="Conflict"><mxGraphModel><root>
<mxCell id="0"/><mxCell id="1" parent="0"/>
<object id="wrapper-id" label="A"><mxCell id="cell-id" style="rounded=1;" vertex="1" parent="1"><mxGeometry x="10" y="10" width="120" height="50" as="geometry"/></mxCell></object>
</root></mxGraphModel></diagram></mxfile>`
  const validation = validateDrawioXml(xml)
  assert.equal(validation.status, "failed")
  assert.ok(validation.errors.some(error => error.code === "DRAWIO_OBJECT_CELL_ID_CONFLICT"))
})

test("Draw.io validator validates all pages in a multi-page document", () => {
  const page = (id, label) => `<diagram id="${id}" name="${label}"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="n" value="${label}" vertex="1" parent="1"><mxGeometry x="10" y="10" width="120" height="50" as="geometry"/></mxCell></root></mxGraphModel></diagram>`
  const validation = validateDrawioXml(`<?xml version="1.0" encoding="UTF-8"?><mxfile compressed="false">${page("overview", "Overview")}${page("detail", "Detail")}</mxfile>`)
  assert.equal(validation.status, "pass")
  assert.equal(validation.data.pageCount, 2)
  assert.deepEqual(validation.data.pages.map(pageData => pageData.pageId), ["overview", "detail"])
})

test("Draw.io validator rejects a dangling reference on the second page", () => {
  const overview = `<diagram id="overview" name="Overview"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="n" value="Overview" vertex="1" parent="1"><mxGeometry x="10" y="10" width="120" height="50" as="geometry"/></mxCell></root></mxGraphModel></diagram>`
  const detail = `<diagram id="detail" name="Detail"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="e" edge="1" parent="1" source="missing" target="also-missing"><mxGeometry relative="1" as="geometry"/></mxCell></root></mxGraphModel></diagram>`
  const validation = validateDrawioXml(`<?xml version="1.0" encoding="UTF-8"?><mxfile compressed="false">${overview}${detail}</mxfile>`)
  assert.equal(validation.status, "failed")
  assert.ok(validation.errors.some(error => error.code === "DRAWIO_CELL_REFERENCE_DANGLING" && error.details?.pageId === "detail"))
})

test("Draw.io document serializer preserves page navigation outside the page plan", () => {
  const layout = branchingFlowchart().layout
  const xml = serializeDrawioDocument({ pages: [
    { id: "overview", name: "Overview", layout, nodeLinks: new Map([["decision", "detail"]]) },
    { id: "detail", name: "Detail", layout }
  ] })
  assert.match(xml, /<diagram id="overview" name="Overview">/)
  assert.match(xml, /<diagram id="detail" name="Detail">/)
  assert.match(xml, /<object id="node:decision" label="Choose" link="data:page\/id,detail"><mxCell style=/)
  const validation = validateDrawioXml(xml)
  assert.equal(validation.status, "pass")
  assert.equal(validation.data.pageCount, 2)
})

test("Draw.io validator rejects internal page links to missing targets", () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?><mxfile compressed="false"><diagram id="overview" name="Overview"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><object id="go" label="Go" link="data:page/id,missing"><mxCell vertex="1" parent="1"><mxGeometry x="10" y="10" width="120" height="50" as="geometry"/></mxCell></object></root></mxGraphModel></diagram></mxfile>`
  const validation = validateDrawioXml(xml)
  assert.equal(validation.status, "failed")
  assert.ok(validation.errors.some(error => error.code === "DRAWIO_PAGE_LINK_TARGET_MISSING" && error.details?.targetPageId === "missing"))
})

test("Draw.io validator accepts additional layer cells without assigning product semantics", () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile compressed="false"><diagram id="p1" name="Layers"><mxGraphModel><root>
<mxCell id="0"/><mxCell id="1" value="Process" parent="0"/><mxCell id="review" value="Review" parent="0" visible="0"/>
<mxCell id="n" value="Core" vertex="1" parent="1"><mxGeometry x="10" y="10" width="120" height="50" as="geometry"/></mxCell>
<mxCell id="note" value="Note" vertex="1" parent="review"><mxGeometry x="10" y="80" width="120" height="50" as="geometry"/></mxCell>
</root></mxGraphModel></diagram></mxfile>`
  const validation = validateDrawioXml(xml)
  assert.equal(validation.status, "pass")
  assert.equal(validation.data.vertexCount, 2)
})
