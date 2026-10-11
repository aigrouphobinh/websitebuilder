import { ref } from "vue";

export function useCanvasTransform(options?: {
  minScale?: number;
  maxScale?: number;
}) {
  const minScale = options?.minScale ?? 0.3;
  const maxScale = options?.maxScale ?? 2.0;

  const scale = ref(1);
  const translateX = ref(0);
  const translateY = ref(0);

  function clampScale(v: number) {
    return Math.min(maxScale, Math.max(minScale, v));
  }

  let rafId: number | null = null;
  function applyTransform(target: HTMLElement | null) {
    if (!target) return;
    if (rafId != null) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const sx = Math.round(translateX.value);
      const sy = Math.round(translateY.value);
      const sc = Math.round(scale.value * 1000) / 1000;
      target.style.transform = `translate(${sx}px, ${sy}px) scale(${sc})`;
      target.style.transformOrigin = "0 0";
      target.style.willChange = "transform";
      rafId = null;
    });
  }

  function setScale(
    next: number,
    anchorX: number,
    anchorY: number,
    target: HTMLElement | null,
  ) {
    const prev = scale.value;
    const s = clampScale(next);
    if (s === prev) return;
    const k = s / prev;
    translateX.value = anchorX - k * (anchorX - translateX.value);
    translateY.value = anchorY - k * (anchorY - translateY.value);
    scale.value = s;
    applyTransform(target);
  }

  function zoomBy(
    delta: number,
    anchorX: number,
    anchorY: number,
    target: HTMLElement | null,
  ) {
    const factor = 1 + delta;
    setScale(scale.value * factor, anchorX, anchorY, target);
  }

  function panBy(dx: number, dy: number, target: HTMLElement | null) {
    translateX.value += dx;
    translateY.value += dy;
    applyTransform(target);
  }

  function center(
    container: HTMLElement | null,
    contentWidth: number,
    target: HTMLElement | null,
  ) {
    if (!container) return;
    const cw = container.clientWidth;
    translateX.value = Math.round((cw - scale.value * contentWidth) / 2);
    translateY.value = 0;
    applyTransform(target);
  }

  function fitWidth(
    container: HTMLElement | null,
    contentWidth: number,
    target: HTMLElement | null,
  ) {
    if (!container) return;
    const cw = container.clientWidth;
    const s = clampScale(cw / contentWidth);
    scale.value = s;
    translateX.value = Math.round((cw - s * contentWidth) / 2);
    translateY.value = 0;
    applyTransform(target);
  }

  function fitWidthCenterY(
    container: HTMLElement | null,
    contentWidth: number,
    contentHeight: number,
    target: HTMLElement | null,
  ) {
    if (!container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const s = clampScale(cw / contentWidth);
    scale.value = s;
    translateX.value = Math.round((cw - s * contentWidth) / 2);
    const centeredY = Math.round((ch - s * contentHeight) / 2);
    translateY.value = centeredY > 0 ? centeredY : 0;
    applyTransform(target);
  }

  function centerY(
    container: HTMLElement | null,
    contentHeight: number,
    target: HTMLElement | null,
  ) {
    if (!container) return;
    const ch = container.clientHeight;
    const centeredY = Math.round((ch - scale.value * contentHeight) / 2);
    translateY.value = centeredY > 0 ? centeredY : 0;
    applyTransform(target);
  }

  function setPercent(
    percent: number,
    anchorX: number,
    anchorY: number,
    target: HTMLElement | null,
  ) {
    setScale(percent / 100, anchorX, anchorY, target);
  }

  return {
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
  };
}
