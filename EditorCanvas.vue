<template>
  <div
    ref="shellRef"
    class="editor-canvas"
    v-bind="attrs"
    @wheel="onWheel"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    @mouseleave="onMouseUp"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div ref="transformRef" class="transform-layer">
      <div class="canvas-frame">
        <div ref="mountRef" class="mount"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  ref,
  watchEffect,
  computed,
  useAttrs,
} from "vue";
import { useCanvasTransform } from "./useCanvasTransform";
import "grapesjs/dist/css/grapes.min.css";

const props = defineProps<{ baseWidth?: number; useGrapesZoom?: boolean }>();
const emit = defineEmits<{
  ready: [el: HTMLElement];
  zoom: [{ delta: number; x: number; y: number }];
}>();
const attrs = useAttrs();

const shellRef = ref<HTMLElement | null>(null);
const transformRef = ref<HTMLElement | null>(null);
const mountRef = ref<HTMLElement | null>(null);

const {
  minScale,
  maxScale,
  scale,
  translateX,
  translateY,
  applyTransform,
  setScale,
  zoomBy,
  panBy,
  center,
  fitWidth,
  fitWidthCenterY,
  centerY,
  setPercent,
} = useCanvasTransform({ minScale: 0.3, maxScale: 2.0 });

const isGrapesZoom = computed(() => !!props.useGrapesZoom);

let isSpaceDown = false;
let isPanning = false;
let panOriginX = 0;
let panOriginY = 0;
let lastZoomAt = 0;
const ZOOM_THROTTLE_MS = 80;
let roShell: ResizeObserver | null = null;
let roMount: ResizeObserver | null = null;

function getLocalPoint(e: MouseEvent | WheelEvent) {
  const shell = shellRef.value;
  if (!shell) return { x: 0, y: 0 };
  const rect = shell.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function onWheel(e: WheelEvent) {
  const layer = transformRef.value;
  if (!layer) return;
  if (e.ctrlKey) {
    // throttle zoom to avoid multiple jumps and focus loss
    const now = performance.now();
    if (now - lastZoomAt < ZOOM_THROTTLE_MS) {
      e.preventDefault();
      return;
    }
    lastZoomAt = now;
    // if editing text or input inside mount, do not zoom
    const active = document.activeElement as HTMLElement | null;
    const mount = mountRef.value;
    if (
      active &&
      mount &&
      mount.contains(active) &&
      (active.isContentEditable ||
        /^(INPUT|TEXTAREA|SELECT)$/i.test(active.tagName))
    ) {
      return;
    }
    e.preventDefault();
    const { x, y } = getLocalPoint(e);
    const dir = e.deltaY > 0 ? -0.08 : 0.08;
    if (isGrapesZoom.value) {
      emit("zoom", { delta: dir, x, y });
    } else {
      zoomBy(dir, x, y, layer);
    }
  } else {
    // default scroll passes through for vertical scrolling
  }
}

function onKeyDown(e: KeyboardEvent) {
  if (e.code === "Space") {
    const active = document.activeElement as HTMLElement | null;

    // Check if we are editing in the main document (e.g. Sidebar inputs)
    if (
      active &&
      (active.isContentEditable ||
        /^(INPUT|TEXTAREA|SELECT)$/i.test(active.tagName))
    ) {
      return;
    }

    // Check if we are editing inside the canvas (iframe)
    const mount = mountRef.value;
    if (
      active &&
      active.tagName === "IFRAME" &&
      mount &&
      mount.contains(active)
    ) {
      try {
        const inner = (active as HTMLIFrameElement).contentDocument
          ?.activeElement as HTMLElement | null;
        if (
          inner &&
          (inner.isContentEditable ||
            /^(INPUT|TEXTAREA|SELECT)$/i.test(inner.tagName))
        ) {
          return;
        }
      } catch {}
    }

    isSpaceDown = true;
    e.preventDefault();
  }
}
function onKeyUp(e: KeyboardEvent) {
  if (e.code === "Space") {
    isSpaceDown = false;
  }
}

function onMouseDown(e: MouseEvent) {
  const layer = transformRef.value;
  if (!layer) return;
  if (isGrapesZoom.value) return;
  if (e.button === 1 || (isSpaceDown && e.button === 0)) {
    isPanning = true;
    panOriginX = e.clientX;
    panOriginY = e.clientY;
    e.preventDefault();
  }
}
function onMouseUp(e: MouseEvent) {
  if (e.button === 1 || e.button === 0) {
    isPanning = false;
  }
}
function onMouseMove(e: MouseEvent) {
  const layer = transformRef.value;
  if (!layer) return;
  if (isGrapesZoom.value) return;
  if (isPanning) {
    const dx = e.clientX - panOriginX;
    const dy = e.clientY - panOriginY;
    panOriginX = e.clientX;
    panOriginY = e.clientY;
    panBy(dx, dy, layer);
    e.preventDefault();
  }
}

function onTouchStart(e: TouchEvent) {
  const layer = transformRef.value;
  if (!layer) return;
  if (isGrapesZoom.value) return;
  if (e.touches.length === 1) {
    const touch = e.touches[0];
    isPanning = true;
    panOriginX = touch.clientX;
    panOriginY = touch.clientY;
  }
}

function onTouchMove(e: TouchEvent) {
  const layer = transformRef.value;
  if (!layer) return;
  if (isGrapesZoom.value) return;
  if (isPanning && e.touches.length === 1) {
    const touch = e.touches[0];
    const dx = touch.clientX - panOriginX;
    const dy = touch.clientY - panOriginY;
    panOriginX = touch.clientX;
    panOriginY = touch.clientY;
    panBy(dx, dy, layer);
    e.preventDefault();
  }
}

function onTouchEnd(e: TouchEvent) {
  if (e.touches.length === 0) {
    isPanning = false;
  }
}

const baseWidth = ref(props.baseWidth ?? 1024);
const contentHeight = ref(800);

function applyTransformLayer() {
  const layer = transformRef.value;
  if (!layer) return;
  if (isGrapesZoom.value) {
    layer.style.transform = "";
    layer.style.transformOrigin = "0 0";
    layer.style.willChange = "auto";
  } else {
    applyTransform(layer);
  }
}

onMounted(() => {
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  applyTransformLayer();
  const shell = shellRef.value;
  const layer = transformRef.value;
  if (shell && layer) {
    if (!isGrapesZoom.value) {
      fitWidthCenterY(shell, baseWidth.value, contentHeight.value, layer);
    }
  }
  if (mountRef.value) {
    emit("ready", mountRef.value);
  } else {
    // Retry in next tick in case of mounting delay
    setTimeout(() => {
      if (mountRef.value) emit("ready", mountRef.value);
    }, 0);
  }
  if (shellRef.value) {
    roShell = new ResizeObserver(() => {
      const shell = shellRef.value;
      const layer = transformRef.value;
      if (!shell || !layer) return;
      if (!isGrapesZoom.value) {
        fitWidthCenterY(shell, baseWidth.value, contentHeight.value, layer);
      }
    });
    roShell.observe(shellRef.value);
  }
  if (mountRef.value) {
    roMount = new ResizeObserver(() => {
      const m = mountRef.value;
      const shell = shellRef.value;
      const layer = transformRef.value;
      if (!m || !shell || !layer) return;
      contentHeight.value = m.clientHeight || 800;
      if (!isGrapesZoom.value) {
        centerY(shell, contentHeight.value, layer);
      }
    });
    roMount.observe(mountRef.value);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeyDown);
  document.removeEventListener("keyup", onKeyUp);
  if (roShell) {
    try {
      roShell.disconnect();
    } catch {}
    roShell = null;
  }
  if (roMount) {
    try {
      roMount.disconnect();
    } catch {}
    roMount = null;
  }
});

defineExpose({
  getMountEl: () => mountRef.value as HTMLElement,
  setScalePercent: (p: number) => {
    const shell = shellRef.value;
    const layer = transformRef.value;
    if (!shell || !layer) return;
    const rect = shell.getBoundingClientRect();
    if (!isGrapesZoom.value) {
      setPercent(p, rect.width / 2, rect.height / 2, layer);
      centerY(shell, contentHeight.value, layer);
    }
  },
  fitWidth: () => {
    const shell = shellRef.value;
    const layer = transformRef.value;
    if (!shell || !layer) return;
    if (!isGrapesZoom.value) {
      fitWidthCenterY(shell, baseWidth.value, contentHeight.value, layer);
    }
  },
  center: () => {
    const shell = shellRef.value;
    const layer = transformRef.value;
    if (!shell || !layer) return;
    if (!isGrapesZoom.value) {
      centerY(shell, contentHeight.value, layer);
    }
  },
});

watchEffect(() => {
  applyTransformLayer();
});
</script>

<style scoped>
.editor-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 600px;
  background: radial-gradient(#cccccc 1px, transparent 1px);
  background-size: 10px 10px;
  background-position: 0 0;
}
.transform-layer {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  transform-origin: 0 0;
}

.mount {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 600px;
}
:deep(.gjs-editor) {
  width: 100% !important;
  height: 100% !important;
}
:deep(.gjs-cv-canvas) {
  width: 100% !important;
  height: 100% !important;
}
:deep(.gjs-frame) {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
}
</style>
