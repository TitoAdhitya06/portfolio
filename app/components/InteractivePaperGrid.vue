<template>
  <div
    ref="hostEl"
    class="paper-canvas-host"
    aria-hidden="true"
    :data-canvas-active="isInteractive ? 'true' : 'false'"
    :data-warping="warpState"
  >
    <canvas
      v-show="isInteractive"
      ref="canvasEl"
      class="paper-grid-canvas"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps<{
  paused: boolean;
}>();

const emit = defineEmits<{
  (e: "active-change", active: boolean): void;
}>();

const GRID = 28;
const SAMPLE_STEP = 18;
const MARGIN_STEP = 14;
const COLS = 96;
const STEP_MS = 22;
const MAX_STEPS_PER_FRAME = 2;
const WAVE_C2 = 0.095;
const VEL_DAMPING = 0.932;
const HEIGHT_DECAY = 0.9985;
const CELL_CLAMP = 1.65;
const MAX_DISP = 8.5;
const REFRACT_GAIN = 11.5;
const MIN_MOVE_INTERVAL_MS = 24;
const SLEEP_THRESHOLD = 0.003;

const hostEl = ref<HTMLDivElement | null>(null);
const canvasEl = ref<HTMLCanvasElement | null>(null);
const isInteractive = ref(false);
const warpState = ref<"paused" | "idle" | "active">("paused");

let ctx: CanvasRenderingContext2D | null = null;
let vw = 0;
let vh = 0;
let dpr = 1;

let rows = 54;
let prevBuf = new Float32Array(COLS * rows);
let currBuf = new Float32Array(COLS * rows);
let maxEnergy = 0;

let lastMx = -9999;
let lastMy = -9999;
let hasLastPointer = false;
let lastFrameTime = 0;
let accumulator = 0;
let renderAlpha = 1;
let lastMoveTime = 0;

let rafId = 0;
let isSkippedByContentVis = false;
let hasVisiblePaperZone = true;
let finePointerMq: MediaQueryList | null = null;
let reducedMotionMq: MediaQueryList | null = null;
let resizeObserver: ResizeObserver | null = null;
let zoneObserver: IntersectionObserver | null = null;
const visibleZones = new Set<Element>();

const canActivate = () => {
  if (!finePointerMq || !reducedMotionMq) return false;
  return finePointerMq.matches && !reducedMotionMq.matches && !props.paused;
};

const allocBuffers = () => {
  rows = Math.max(48, Math.round(COLS * (vh / Math.max(vw, 1))));
  prevBuf = new Float32Array(COLS * rows);
  currBuf = new Float32Array(COLS * rows);
  maxEnergy = 0;
  lastFrameTime = 0;
  accumulator = 0;
  renderAlpha = 1;
  lastMoveTime = 0;
};

const injectImpulse = (px: number, py: number, radiusCells: number, strength: number) => {
  if (vw <= 0 || vh <= 0) return;
  const cx = (px / vw) * (COLS - 1);
  const cy = (py / vh) * (rows - 1);
  const rCeil = Math.ceil(radiusCells);
  const xMin = Math.max(1, Math.floor(cx - rCeil));
  const xMax = Math.min(COLS - 2, Math.ceil(cx + rCeil));
  const yMin = Math.max(1, Math.floor(cy - rCeil));
  const yMax = Math.min(rows - 2, Math.ceil(cy + rCeil));
  const r2 = radiusCells * radiusCells;

  const headroom = Math.max(0.18, 1 - maxEnergy * 0.55);
  const effectiveStrength = strength * headroom;

  for (let y = yMin; y <= yMax; y++) {
    const dy = y - cy;
    for (let x = xMin; x <= xMax; x++) {
      const dx = x - cx;
      const d2 = dx * dx + dy * dy;
      if (d2 < r2) {
        const w = Math.cos((Math.sqrt(d2) / radiusCells) * (Math.PI * 0.5));
        const idx = y * COLS + x;
        const delta = effectiveStrength * w * w;
        const nextCurr = Math.max(-CELL_CLAMP, Math.min(CELL_CLAMP, currBuf[idx]! + delta));
        const nextPrev = Math.max(-CELL_CLAMP, Math.min(CELL_CLAMP, prevBuf[idx]! + delta * 0.5));
        currBuf[idx] = nextCurr;
        prevBuf[idx] = nextPrev;
        const absNext = nextCurr < 0 ? -nextCurr : nextCurr;
        if (absNext > maxEnergy) maxEnergy = absNext;
      }
    }
  }
};

const stepSimulation = () => {
  let peak = 0;
  for (let y = 1; y < rows - 1; y++) {
    const rowOff = y * COLS;
    for (let x = 1; x < COLS - 1; x++) {
      const i = rowOff + x;
      const c = currBuf[i]!;
      const p = prevBuf[i]!;
      const laplacian =
        currBuf[i - 1]! + currBuf[i + 1]! + currBuf[i - COLS]! + currBuf[i + COLS]! - 4 * c;
      let val = c * HEIGHT_DECAY + (c - p) * VEL_DAMPING + WAVE_C2 * laplacian;
      if (val > CELL_CLAMP) val = CELL_CLAMP;
      else if (val < -CELL_CLAMP) val = -CELL_CLAMP;
      prevBuf[i] = val;

      const absVal = val < 0 ? -val : val;
      const absVel = val > c ? val - c : c - val;
      const energy = absVal > absVel ? absVal : absVel;
      if (energy > peak) peak = energy;
    }
  }

  // Zero out outer boundary cells to keep edge absorption clean
  for (let x = 0; x < COLS; x++) {
    prevBuf[x] = 0;
    prevBuf[(rows - 1) * COLS + x] = 0;
  }
  for (let y = 0; y < rows; y++) {
    prevBuf[y * COLS] = 0;
    prevBuf[y * COLS + (COLS - 1)] = 0;
  }

  const tmp = prevBuf;
  prevBuf = currBuf;
  currBuf = tmp;
  maxEnergy = peak;
};

const sampleRefraction = (x: number, y: number): [number, number, number] => {
  if (maxEnergy < SLEEP_THRESHOLD || vw <= 0 || vh <= 0) {
    return [0, 0, 0];
  }

  const gx = Math.max(1, Math.min(COLS - 2.001, (x / vw) * (COLS - 1)));
  const gy = Math.max(1, Math.min(rows - 2.001, (y / vh) * (rows - 1)));
  const ix = Math.floor(gx);
  const iy = Math.floor(gy);
  const fx = gx - ix;
  const fy = gy - iy;
  const a = renderAlpha;

  const hAt = (idx: number) => prevBuf[idx]! + (currBuf[idx]! - prevBuf[idx]!) * a;

  const slopeAt = (cx: number, cy: number): [number, number] => {
    const idx = cy * COLS + cx;
    const dhdx = (hAt(idx + 1) - hAt(idx - 1)) * 0.5;
    const dhdy = (hAt(idx + COLS) - hAt(idx - COLS)) * 0.5;
    return [dhdx, dhdy];
  };

  const [sx00, sy00] = slopeAt(ix, iy);
  const [sx10, sy10] = slopeAt(ix + 1, iy);
  const [sx01, sy01] = slopeAt(ix, iy + 1);
  const [sx11, sy11] = slopeAt(ix + 1, iy + 1);

  const w00 = (1 - fx) * (1 - fy);
  const w10 = fx * (1 - fy);
  const w01 = (1 - fx) * fy;
  const w11 = fx * fy;

  const dhdx = sx00 * w00 + sx10 * w10 + sx01 * w01 + sx11 * w11;
  const dhdy = sy00 * w00 + sy10 * w10 + sy01 * w01 + sy11 * w11;

  const ox = Math.tanh((dhdx * REFRACT_GAIN) / MAX_DISP) * MAX_DISP;
  const oy = Math.tanh((dhdy * REFRACT_GAIN) / MAX_DISP) * MAX_DISP;
  const slopeMag = Math.sqrt(dhdx * dhdx + dhdy * dhdy);

  return [ox, oy, slopeMag];
};

const drawGridPass = (scrollOffsetY: number) => {
  if (!ctx) return;

  ctx.beginPath();
  ctx.strokeStyle = "rgba(34, 70, 184, 0.068)";
  ctx.lineWidth = 1;

  for (let x = 0; x <= vw + GRID; x += GRID) {
    for (let y = -GRID; y <= vh + GRID; y += SAMPLE_STEP) {
      const [ox, oy] = sampleRefraction(x, y);
      if (y === -GRID) ctx.moveTo(x + ox, y + oy);
      else ctx.lineTo(x + ox, y + oy);
    }
  }

  const startY = -scrollOffsetY - GRID;
  for (let y = startY; y <= vh + GRID; y += GRID) {
    for (let x = -GRID; x <= vw + GRID; x += SAMPLE_STEP) {
      const [ox, oy] = sampleRefraction(x, y);
      if (x === -GRID) ctx.moveTo(x + ox, y + oy);
      else ctx.lineTo(x + ox, y + oy);
    }
  }
  ctx.stroke();

  // Subtle highlight pass on active water wave crests so ripples catch light cleanly
  if (maxEnergy > 0.03) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(34, 70, 184, 0.105)";
    ctx.lineWidth = 1;

    for (let x = 0; x <= vw + GRID; x += GRID) {
      let drawing = false;
      for (let y = -GRID; y <= vh + GRID; y += SAMPLE_STEP) {
        const [ox, oy, mag] = sampleRefraction(x, y);
        if (mag > 0.07) {
          if (!drawing) {
            ctx.moveTo(x + ox, y + oy);
            drawing = true;
          } else {
            ctx.lineTo(x + ox, y + oy);
          }
        } else {
          drawing = false;
        }
      }
    }

    for (let y = startY; y <= vh + GRID; y += GRID) {
      let drawing = false;
      for (let x = -GRID; x <= vw + GRID; x += SAMPLE_STEP) {
        const [ox, oy, mag] = sampleRefraction(x, y);
        if (mag > 0.07) {
          if (!drawing) {
            ctx.moveTo(x + ox, y + oy);
            drawing = true;
          } else {
            ctx.lineTo(x + ox, y + oy);
          }
        } else {
          drawing = false;
        }
      }
    }
    ctx.stroke();
  }
};

const drawFrame = () => {
  if (!ctx || !isInteractive.value) return;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, vw, vh);

  const scrollOffsetY = (window.scrollY || 0) % GRID;
  drawGridPass(scrollOffsetY);

  if (window.innerWidth >= 1280) {
    const marginX = Math.max(24, (window.innerWidth - 1220) / 2 - 28);
    ctx.beginPath();
    ctx.strokeStyle = "rgba(199, 51, 28, 0.28)";
    ctx.lineWidth = 1.5;
    for (let y = -GRID; y <= vh + GRID; y += MARGIN_STEP) {
      const [ox, oy] = sampleRefraction(marginX, y);
      if (y === -GRID) ctx.moveTo(marginX + ox, y + oy);
      else ctx.lineTo(marginX + ox, y + oy);
    }
    ctx.stroke();
  }
};

const stopRaf = () => {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
  lastFrameTime = 0;
  accumulator = 0;
};

const step = (now: number) => {
  rafId = 0;
  if (!isInteractive.value || document.hidden || isSkippedByContentVis || !hasVisiblePaperZone) {
    lastFrameTime = 0;
    accumulator = 0;
    warpState.value = isInteractive.value ? "idle" : "paused";
    return;
  }

  if (lastFrameTime === 0) {
    lastFrameTime = now - STEP_MS;
  }
  const dt = Math.min(48, Math.max(0, now - lastFrameTime));
  lastFrameTime = now;
  accumulator += dt;

  let steps = 0;
  while (accumulator >= STEP_MS && steps < MAX_STEPS_PER_FRAME) {
    stepSimulation();
    accumulator -= STEP_MS;
    steps++;
  }
  if (accumulator > STEP_MS) {
    accumulator = STEP_MS;
  }
  renderAlpha = accumulator / STEP_MS;

  drawFrame();

  if (maxEnergy >= SLEEP_THRESHOLD) {
    warpState.value = "active";
    rafId = requestAnimationFrame(step);
  } else {
    prevBuf.fill(0);
    currBuf.fill(0);
    maxEnergy = 0;
    lastFrameTime = 0;
    accumulator = 0;
    renderAlpha = 1;
    drawFrame();
    warpState.value = "idle";
  }
};

const wake = () => {
  if (!isInteractive.value || document.hidden || isSkippedByContentVis || !hasVisiblePaperZone) {
    return;
  }
  if (!rafId) {
    warpState.value = "active";
    rafId = requestAnimationFrame(step);
  }
};

const syncCanvasSize = () => {
  const el = canvasEl.value;
  if (!el) return;
  vw = window.innerWidth;
  vh = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  el.width = Math.max(1, Math.round(vw * dpr));
  el.height = Math.max(1, Math.round(vh * dpr));
  ctx = el.getContext("2d");
  allocBuffers();
  if (isInteractive.value) {
    drawFrame();
  }
};

const syncInteractiveMode = () => {
  const nextActive = canActivate();
  if (nextActive === isInteractive.value) return;

  isInteractive.value = nextActive;
  emit("active-change", nextActive);

  if (nextActive) {
    syncCanvasSize();
    warpState.value = "idle";
    drawFrame();
  } else {
    stopRaf();
    prevBuf.fill(0);
    currBuf.fill(0);
    maxEnergy = 0;
    renderAlpha = 1;
    lastMoveTime = 0;
    hasLastPointer = false;
    warpState.value = "paused";
  }
};

const onPointerMove = (e: PointerEvent) => {
  if (!isInteractive.value || e.pointerType === "touch") return;
  const mx = e.clientX;
  const my = e.clientY;
  const now = performance.now();

  if (!hasLastPointer) {
    lastMx = mx;
    lastMy = my;
    lastMoveTime = now;
    hasLastPointer = true;
    injectImpulse(mx, my, 3.6, 0.24);
    wake();
    return;
  }

  if (now - lastMoveTime < MIN_MOVE_INTERVAL_MS) return;

  const dx = mx - lastMx;
  const dy = my - lastMy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 3) return;

  lastMoveTime = now;
  const subSteps = Math.min(5, Math.max(1, Math.ceil(dist / 22)));
  const amp = Math.min(0.45, Math.max(0.14, dist * 0.014)) / Math.sqrt(subSteps);
  for (let s = 1; s <= subSteps; s++) {
    const t = s / subSteps;
    injectImpulse(lastMx + dx * t, lastMy + dy * t, 3.8, amp);
  }

  lastMx = mx;
  lastMy = my;
  wake();
};

const onPointerDown = (e: PointerEvent) => {
  if (!isInteractive.value || e.pointerType === "touch") return;
  const target = e.target as Element | null;
  if (target?.closest("a, button, input, textarea, select, dialog")) return;

  injectImpulse(e.clientX, e.clientY, 4.5, 1.15);
  wake();
};

const onPointerOutWindow = () => {
  hasLastPointer = false;
  lastMoveTime = 0;
};

const onScroll = () => {
  if (!isInteractive.value || isSkippedByContentVis || !hasVisiblePaperZone) return;
  drawFrame();
};

const onVisibilityChange = () => {
  if (document.hidden) {
    stopRaf();
  } else if (isInteractive.value) {
    drawFrame();
  }
};

const onContentVisChange = (event: Event) => {
  const cvEvent = event as Event & { skipped?: boolean };
  isSkippedByContentVis = Boolean(cvEvent.skipped);
  if (isSkippedByContentVis) {
    stopRaf();
  } else if (isInteractive.value) {
    drawFrame();
  }
};

watch(
  () => props.paused,
  () => {
    syncInteractiveMode();
  }
);

onMounted(() => {
  finePointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");
  reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

  syncInteractiveMode();

  finePointerMq.addEventListener("change", syncInteractiveMode);
  reducedMotionMq.addEventListener("change", syncInteractiveMode);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  document.addEventListener("mouseleave", onPointerOutWindow);
  window.addEventListener("blur", onPointerOutWindow);
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);

  if (hostEl.value) {
    hostEl.value.addEventListener("contentvisibilityautostatechange", onContentVisChange);
    resizeObserver = new ResizeObserver(() => {
      syncCanvasSize();
    });
    resizeObserver.observe(hostEl.value);
  }

  const zones = document.querySelectorAll("[data-paper-zone]");
  if (zones.length > 0 && "IntersectionObserver" in window) {
    zoneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleZones.add(entry.target);
          else visibleZones.delete(entry.target);
        });
        hasVisiblePaperZone = visibleZones.size > 0;
        if (!hasVisiblePaperZone) {
          stopRaf();
        } else if (isInteractive.value) {
          drawFrame();
        }
      },
      { rootMargin: "120px 0px" }
    );
    zones.forEach((z) => zoneObserver?.observe(z));
  }
});

onUnmounted(() => {
  stopRaf();
  finePointerMq?.removeEventListener("change", syncInteractiveMode);
  reducedMotionMq?.removeEventListener("change", syncInteractiveMode);
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerdown", onPointerDown);
  document.removeEventListener("mouseleave", onPointerOutWindow);
  window.removeEventListener("blur", onPointerOutWindow);
  window.removeEventListener("scroll", onScroll);
  document.removeEventListener("visibilitychange", onVisibilityChange);
  hostEl.value?.removeEventListener("contentvisibilityautostatechange", onContentVisChange);
  resizeObserver?.disconnect();
  zoneObserver?.disconnect();
});
</script>
