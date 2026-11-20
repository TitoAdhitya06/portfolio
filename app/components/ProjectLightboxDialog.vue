<template>
  <dialog
    ref="dialogEl"
    class="project-dialog"
    closedby="any"
    aria-labelledby="lightbox-project-title"
    @close="handleClose"
  >
    <div v-if="project" class="flex flex-col max-h-[min(90dvh,880px)]">
      <!-- Top bar -->
      <div class="flex items-start justify-between gap-4 px-5 py-4 sm:px-6 border-b border-hairline bg-surface">
        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-ink-tertiary">
            <span class="font-semibold text-vermilion">{{ project.index }}</span>
            <span>/</span>
            <span>{{ project.category }}</span>
          </div>
          <h3 id="lightbox-project-title" class="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight mt-0.5 text-balance">
            {{ project.title }}
          </h3>
        </div>

        <button
          type="button"
          autofocus
          class="icon-hit-target shrink-0 w-9 h-9 rounded-full border-[1.5px] border-ink bg-surface text-ink inline-flex items-center justify-center hover:bg-surface-muted transition-colors"
          aria-label="Close project gallery"
          @click="close"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <!-- Scrollable body -->
      <div class="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6 space-y-6 bg-paper">
        <!-- Active screenshot viewport -->
        <div class="rounded-card border-[1.5px] border-ink bg-surface overflow-hidden">
          <div
            class="relative flex items-center justify-center bg-surface-muted p-3 sm:p-5"
            :class="activeScreen.orientation === 'portrait' ? 'min-h-[340px] sm:min-h-[420px]' : 'min-h-[220px] sm:min-h-[360px]'"
          >
            <div
              v-if="activeScreen.orientation === 'portrait'"
              class="rounded-[20px] border-[2px] border-ink bg-ink p-1.5 shadow-[4px_4px_0_var(--border-strong)]"
            >
              <img
                :src="activeScreen.src"
                :alt="`${project.title} - ${activeScreen.label}`"
                :width="activeScreen.width"
                :height="activeScreen.height"
                fetchpriority="low"
                class="block max-h-[380px] w-auto rounded-[14px] object-contain"
              />
            </div>

            <img
              v-else
              :src="activeScreen.src"
              :alt="`${project.title} - ${activeScreen.label}`"
              :width="activeScreen.width"
              :height="activeScreen.height"
              fetchpriority="low"
              class="block w-full max-h-[420px] object-contain rounded-inner border border-hairline bg-surface"
            />
          </div>

          <!-- Gallery navigation bar -->
          <div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-hairline bg-surface">
            <div class="min-w-0 flex-1">
              <div class="text-xs font-mono-tabular font-semibold text-ink">
                {{ activeScreen.label }}
              </div>
              <p class="text-xs sm:text-sm text-ink-secondary mt-0.5">
                {{ activeScreen.caption }}
              </p>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <button
                type="button"
                class="h-9 px-3 rounded-full border-[1.5px] border-ink bg-surface text-xs font-semibold text-ink hover:bg-surface-muted active:scale-95 transition-transform"
                aria-label="Previous screenshot"
                @click="prev"
              >
                &larr; Prev
              </button>
              <span class="text-xs font-mono-tabular text-ink-tertiary px-1">
                {{ screenIndex + 1 }} / {{ project.screens.length }}
              </span>
              <button
                type="button"
                class="h-9 px-3 rounded-full border-[1.5px] border-ink bg-surface text-xs font-semibold text-ink hover:bg-surface-muted active:scale-95 transition-transform"
                aria-label="Next screenshot"
                @click="next"
              >
                Next &rarr;
              </button>
            </div>
          </div>

          <!-- Screen selector strip -->
          <div class="flex flex-wrap gap-1.5 px-4 py-2.5 border-t border-hairline bg-paper">
            <button
              v-for="(scr, idx) in project.screens"
              :key="scr.src"
              type="button"
              class="px-2.5 py-1 rounded-inner text-xs font-mono-tabular transition-colors border"
              :class="idx === screenIndex
                ? 'bg-ink text-surface border-ink font-semibold'
                : 'bg-surface text-ink-secondary border-hairline hover:border-ink'"
              @click="screenIndex = idx"
            >
              {{ scr.label }}
            </button>
          </div>
        </div>

        <!-- Narrative details -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="md:col-span-7 space-y-4">
            <div>
              <div class="text-xs font-mono-tabular uppercase tracking-wider text-ink-tertiary mb-1.5">
                Overview
              </div>
              <p class="text-sm sm:text-base text-ink-secondary leading-relaxed text-pretty">
                {{ project.summary }}
              </p>
            </div>

            <div>
              <div class="text-xs font-mono-tabular uppercase tracking-wider text-ink-tertiary mb-2">
                Implemented architecture
              </div>
              <ul class="space-y-2 text-sm text-ink-secondary">
                <li
                  v-for="(item, hIdx) in project.highlights"
                  :key="hIdx"
                  class="flex items-start gap-2.5"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-vermilion mt-2 shrink-0" aria-hidden="true"></span>
                  <span class="leading-relaxed">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="md:col-span-5 space-y-4 md:border-l md:border-hairline md:pl-6">
            <div>
              <div class="text-xs font-mono-tabular uppercase tracking-wider text-ink-tertiary mb-1">
                Context
              </div>
              <p class="text-sm font-medium text-ink">
                {{ project.context }}
              </p>
            </div>

            <div>
              <div class="text-xs font-mono-tabular uppercase tracking-wider text-ink-tertiary mb-2">
                Stack & tools
              </div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tech in project.techStack"
                  :key="tech"
                  class="px-2 py-1 rounded-inner border border-hairline bg-surface text-xs font-mono-tabular text-ink"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="pt-2">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="pill-cta h-10 px-5 text-xs sm:text-sm w-full sm:w-auto"
              >
                <span>View GitHub Repository</span>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
              <p v-else class="text-xs font-mono-tabular text-ink-tertiary">
                Source code is private ({{ project.accessLabel }}).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import type { ProjectItem } from "~/data/portfolio";

const dialogEl = ref<HTMLDialogElement | null>(null);
const project = ref<ProjectItem | null>(null);
const screenIndex = ref(0);

const activeScreen = computed(() => {
  const list = project.value?.screens || [];
  return list[screenIndex.value] || list[0];
});

const open = async (item: ProjectItem, initialIndex = 0) => {
  project.value = item;
  screenIndex.value = Math.min(Math.max(0, initialIndex), item.screens.length - 1);
  await nextTick();
  if (dialogEl.value && !dialogEl.value.open) {
    dialogEl.value.showModal();
  }
};

const close = () => {
  dialogEl.value?.close();
};

const handleClose = () => {
  if (dialogEl.value) {
    dialogEl.value.returnValue = "";
  }
  project.value = null;
  screenIndex.value = 0;
};

const next = () => {
  if (!project.value) return;
  screenIndex.value = (screenIndex.value + 1) % project.value.screens.length;
};

const prev = () => {
  if (!project.value) return;
  const total = project.value.screens.length;
  screenIndex.value = (screenIndex.value - 1 + total) % total;
};

let cleanupFallback: (() => void) | null = null;
let cleanupKeyNav: (() => void) | null = null;

onMounted(() => {
  const el = dialogEl.value;
  if (!el) return;

  // Fallback for browsers lacking HTMLDialogElement.prototype.closedBy (e.g., Safari)
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    let pressedOutside = false;
    const isOutside = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    const onPointerDown = (e: PointerEvent) => {
      if (el.open) pressedOutside = isOutside(e);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (el.open && pressedOutside && isOutside(e)) {
        el.close();
      }
      pressedOutside = false;
    };
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    cleanupFallback = () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
    };
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (!el.open || !project.value) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };
  window.addEventListener("keydown", onKeyDown);
  cleanupKeyNav = () => window.removeEventListener("keydown", onKeyDown);
});

onUnmounted(() => {
  cleanupFallback?.();
  cleanupKeyNav?.();
});

defineExpose({ open, close });
</script>
