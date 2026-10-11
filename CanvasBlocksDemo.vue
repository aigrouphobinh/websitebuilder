<template>
  <div class="canvas-demo">
    <div class="demo-controls">
      <button class="demo-btn" type="button" @click="renderDemo">
        Xem Demo
      </button>
      <button class="demo-btn" type="button" @click="clearCanvas">Xóa</button>
    </div>
    <div class="demo-status">
      Trạng thái canvas:
      <strong>{{ isReady ? "Đã khởi tạo" : "Chưa khởi tạo" }}</strong>
    </div>
    <EditorCanvas @ready="onReady" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import grapesjs from "grapesjs";
import EditorCanvas from "./EditorCanvas.vue";
import spec from "./blocks-spec.json";

const editor = ref<any>(null);
const isReady = ref(false);

function onReady(el: HTMLElement) {
  isReady.value = true;
  editor.value = grapesjs.init({
    container: el,
    height: "100%",
    storageManager: false,
    styleManager: { sectors: [] },
    projectData: {},
  });
}

function clearCanvas() {
  if (!editor.value) return;
  editor.value.getWrapper().components().reset();
}

function renderDemo() {
  if (!editor.value) return;
  const root = editor.value.getWrapper() as any;
  const blocks = (spec as any).blocks as any[];

  const containerDef = blocks.find((b) => b.id === "container");
  const textDef = blocks.find((b) => b.id === "text");
  const mediaDef = blocks.find((b) => b.id === "media");
  const tableDef = blocks.find((b) => b.id === "table");
  const formDef = blocks.find((b) => b.id === "form");

  const cont = root.append({
    type: "text",
    tagName: "div",
    attributes: { style: toStyle(containerDef?.defaults?.style) },
  });

  cont.append({
    type: "text",
    tagName: "h1",
    content: "Tiêu đề H1",
    attributes: {
      style: toStyle({
        ...(textDef?.defaults?.style || {}),
        "font-size": "24px",
        "font-weight": "700",
      }),
    },
  });
  cont.append({
    type: "text",
    tagName: "p",
    content: "Đoạn văn mô tả",
    attributes: { style: toStyle(textDef?.defaults?.style) },
  });

  cont.append({
    type: "image",
    attributes: {
      src: "data:image/gif;base64,R0lGODlhAQABAPAAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
      alt: "",
      style: toStyle(mediaDef?.defaults?.style),
    },
  });

  const tbl = cont.append({
    type: "text",
    tagName: "table",
    attributes: { style: toStyle(tableDef?.defaults?.style), border: "1" },
  });
  const thead = (tbl as any).append({ type: "text", tagName: "thead" });
  const headRow = (thead as any).append({ type: "text", tagName: "tr" });
  headRow.append({ type: "text", tagName: "td", content: "Cột A" });
  headRow.append({ type: "text", tagName: "td", content: "Cột B" });
  const tbody = (tbl as any).append({ type: "text", tagName: "tbody" });
  for (let i = 0; i < 2; i++) {
    const r = (tbody as any).append({ type: "text", tagName: "tr" });
    r.append({ type: "text", tagName: "td", content: `Hàng ${i + 1}-A` });
    r.append({ type: "text", tagName: "td", content: `Hàng ${i + 1}-B` });
  }

  const frm = cont.append({
    type: "text",
    tagName: "form",
    attributes: { style: toStyle(formDef?.defaults?.style) },
  });
  (frm as any).append({
    type: "text",
    tagName: "input",
    attributes: { type: "text", placeholder: "Nhập tên" },
  });
  (frm as any).append({
    type: "text",
    tagName: "select",
    content: `<option>Chọn</option><option>A</option>`,
  });
  (frm as any).append({
    type: "text",
    tagName: "textarea",
    content: "Ghi chú",
  });
  (frm as any).append({
    type: "button",
    content: "Gửi",
    attributes: {
      style:
        "padding:8px 12px;background:#2563eb;color:#fff;border:none;border-radius:6px;",
    },
  });

  try {
    editor.value.select(cont);
  } catch {}
}

function toStyle(obj: Record<string, string> | undefined) {
  if (!obj) return "";
  return Object.entries(obj)
    .map(([k, v]) => `${k}: ${v}`)
    .join("; ");
}
</script>

<style scoped>
.canvas-demo {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 8px;
  height: 100%;
}
.demo-controls {
  display: flex;
  gap: 8px;
}
.demo-status {
  font-size: 12px;
  color: #4b5563;
}
.demo-btn {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 12px;
  font-weight: 600;
}
</style>
