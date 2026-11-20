<template>
  <div
    class="page-shell bg-drafting-paper"
    :class="{ 'has-live-paper-grid': isPaperCanvasActive }"
  >
    <InteractivePaperGrid
      :paused="isMotionPaused"
      @active-change="isPaperCanvasActive = $event"
    />

    <!-- Skip link for keyboard navigation -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 pill-cta px-4 py-2 text-xs"
    >
      Skip to content
    </a>

    <!-- ============================================================
         Adaptive Sticky Header
         ============================================================ -->
    <header
      ref="headerEl"
      class="site-header"
      :class="{ 'on-dark': isHeaderOnDark }"
    >
      <div class="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">
        <!-- Brand -->
        <a href="#top" class="flex items-center gap-3 min-w-0 group" @click="isMobileMenuOpen = false">
          <span
            class="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-lg border-[1.5px] shrink-0 transition-colors"
            :class="isHeaderOnDark
              ? 'bg-surface text-ink border-surface'
              : 'bg-ink text-surface border-ink'"
            aria-hidden="true"
          >
            T
          </span>
          <div class="flex flex-col min-w-0">
            <span class="font-display font-semibold text-base sm:text-lg leading-tight truncate">
              {{ profile.shortName }}
            </span>
            <span
              class="text-[11px] font-mono-tabular tracking-wide leading-tight hidden sm:block"
              :class="isHeaderOnDark ? 'text-on-dark-muted' : 'text-ink-tertiary'"
            >
              Web &amp; Native Android · UTC+7
            </span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav aria-label="Primary navigation" class="hidden md:flex items-center gap-1">
          <a
            v-for="item in navLinks"
            :key="item.id"
            :href="`#${item.id}`"
            class="px-3.5 py-2 rounded-full text-sm font-medium transition-colors"
            :class="[
              activeSection === item.id
                ? (isHeaderOnDark
                    ? 'bg-dark-surface text-highlighter border border-dark-border font-semibold'
                    : 'bg-surface text-ink border border-ink font-semibold')
                : (isHeaderOnDark
                    ? 'text-on-dark-muted hover:text-on-dark hover:bg-dark-surface'
                    : 'text-ink-secondary hover:text-ink hover:bg-surface'),
            ]"
            @click="handleNavClick(item.id)"
          >
            {{ item.label }}
          </a>
        </nav>

        <!-- Header Controls -->
        <div class="flex items-center gap-2.5 shrink-0">
          <!-- WCAG 2.2.2 Motion Pause Control -->
          <button
            type="button"
            class="icon-hit-target w-9 h-9 rounded-full border-[1.5px] inline-flex items-center justify-center transition-colors active:scale-95"
            :class="isHeaderOnDark
              ? 'border-dark-border bg-dark-surface text-on-dark hover:border-highlighter'
              : 'border-ink bg-surface text-ink hover:bg-surface-muted'"
            aria-label="Pause animations"
            :aria-pressed="isMotionPaused"
            :title="isMotionPaused ? 'Resume animations' : 'Pause animations'"
            @click="toggleMotion"
          >
            <!-- Play icon when paused, Pause icon when active -->
            <svg
              v-if="isMotionPaused"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <polygon points="7 5 19 12 7 19 7 5" />
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          </button>

          <!-- Primary Header CTA -->
          <a
            href="#contact"
            class="pill-cta h-9 px-4 text-xs sm:text-sm hidden sm:inline-flex"
            @click="handleNavClick('contact')"
          >
            <span>Get in touch</span>
            <svg class="w-3.5 h-3.5 translate-y-[0.5px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>

          <!-- Mobile Drawer Trigger -->
          <button
            type="button"
            class="md:hidden icon-hit-target w-9 h-9 rounded-full border-[1.5px] inline-flex items-center justify-center transition-colors active:scale-95"
            :class="isHeaderOnDark
              ? 'border-dark-border bg-dark-surface text-on-dark hover:border-highlighter'
              : 'border-ink bg-surface text-ink hover:bg-surface-muted'"
            :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-nav-panel"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <svg v-if="isMobileMenuOpen" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div
        v-if="isMobileMenuOpen"
        id="mobile-nav-panel"
        class="md:hidden px-4 pb-4 pt-2 border-t"
        :class="isHeaderOnDark ? 'border-dark-border bg-dark-ink' : 'border-hairline bg-paper'"
      >
        <nav
          aria-label="Mobile navigation"
          class="rounded-card border-[1.5px] p-2 flex flex-col gap-1"
          :class="isHeaderOnDark
            ? 'bg-dark-surface border-dark-border shadow-[5px_5px_0_var(--highlight)]'
            : 'bg-surface border-ink shadow-[5px_5px_0_var(--border-strong)]'"
        >
          <a
            v-for="item in navLinks"
            :key="item.id"
            :href="`#${item.id}`"
            class="px-3.5 py-2.5 rounded-inner text-sm font-medium flex items-center justify-between transition-colors"
            :class="[
              activeSection === item.id
                ? (isHeaderOnDark
                    ? 'bg-dark-ink text-highlighter font-semibold'
                    : 'bg-highlighter text-ink font-semibold')
                : (isHeaderOnDark
                    ? 'text-on-dark-muted hover:text-on-dark hover:bg-dark-ink'
                    : 'text-ink-secondary hover:text-ink hover:bg-paper'),
            ]"
            @click="handleNavClick(item.id)"
          >
            <span>{{ item.label }}</span>
            <span class="text-xs font-mono-tabular opacity-75">&rarr;</span>
          </a>

          <div class="pt-2 mt-1 border-t space-y-2" :class="isHeaderOnDark ? 'border-dark-border' : 'border-hairline'">
            <a
              href="#contact"
              class="pill-cta h-10 w-full text-sm"
              :class="{ 'pill-cta-inverted': isHeaderOnDark }"
              @click="handleNavClick('contact')"
            >
              <span>Get in touch</span>
            </a>
            <a
              :href="cvHref"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-paper h-10 w-full text-sm"
            >
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </nav>
      </div>
    </header>

    <main id="main-content" class="flex-1">
      <!-- ============================================================
           1. Editorial Poster Hero (#top)
           ============================================================ -->
      <section id="top" data-paper-zone class="has-margin-rule pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-10 lg:pb-16">
        <div class="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Single top editorial registration line -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-hairline">
            <div class="flex items-center gap-2.5 text-xs font-mono-tabular uppercase tracking-wider text-ink-secondary">
              <span class="w-2 h-2 rounded-full bg-success shrink-0" aria-hidden="true"></span>
              <span>{{ profile.role }} · {{ profile.location }}</span>
            </div>
            <span class="text-xs font-mono-tabular text-ink-tertiary">
              Vue.js / Nuxt · Kotlin / Jetpack Compose
            </span>
          </div>

          <!-- Display Poster Statement -->
          <div class="pt-6 pb-7 sm:pt-8 sm:pb-9 lg:pt-8 lg:pb-10">
            <h1 class="font-display font-semibold text-ink tracking-[-0.03em] leading-[0.96] text-[clamp(2.65rem,6.1vw,5.4rem)] max-w-[15ch] text-balance">
              Building
              <span class="relative inline-block">
                <span>fast web</span>
                <svg
                  class="pen-stroke js-scroll-mark absolute left-0 -bottom-1.5 sm:-bottom-2 w-full h-3 sm:h-4 text-vermilion pointer-events-none"
                  viewBox="0 0 260 18"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 13 C 62 4, 184 5, 257 12"
                    stroke="currentColor"
                    stroke-width="3.2"
                    stroke-linecap="round"
                    pathLength="1"
                  />
                </svg>
              </span>
              interfaces and
              <span class="hl-sweep js-scroll-mark font-semibold">native Android</span>
              apps.
            </h1>
          </div>

          <!-- Bottom Hero Split: Bio & CTAs Left / Tilted Quick-Spec Card Right -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end pt-6 border-t border-hairline">
            <div class="lg:col-span-7 space-y-5">
              <p class="text-base sm:text-lg lg:text-[19px] text-ink-secondary leading-relaxed max-w-[58ch] text-pretty">
                I'm <strong class="font-semibold text-ink">{{ profile.name }}</strong>. I build responsive web systems in Vue.js, Nuxt, and Laravel alongside offline-capable native Android applications in Kotlin and Jetpack Compose.
              </p>

              <div class="flex flex-wrap items-center gap-3.5">
                <a href="#works" class="pill-cta h-11 px-6 text-sm">
                  <span>Explore works</span>
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                  </svg>
                </a>

                <a
                  :href="cvHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-paper h-11 px-5 text-sm"
                >
                  <svg class="w-4 h-4 text-ink-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  <span>Download CV</span>
                </a>

                <a
                  :href="profile.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="h-11 px-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-vermilion decoration-2 underline-offset-4 hover:bg-highlighter rounded-inner transition-colors"
                >
                  <span>GitHub</span>
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>

            <!-- Right Tilted Spec Card (Mint Offset Shadow) -->
            <div class="lg:col-span-5">
              <aside aria-label="Quick engineer profile" class="hero-spec-card p-5 sm:p-6">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-hairline">
                  <span class="text-xs font-mono-tabular uppercase tracking-wider text-ink-tertiary whitespace-nowrap">
                    ENGINEER SHEET
                  </span>
                  <span class="inline-flex items-center gap-1.5 text-xs font-mono-tabular font-semibold text-success whitespace-nowrap">
                    <span class="w-1.5 h-1.5 rounded-full bg-success" aria-hidden="true"></span>
                    <span>Available for roles</span>
                  </span>
                </div>

                <dl class="divide-y divide-hairline text-sm">
                  <div class="py-2.5 flex items-baseline justify-between gap-4">
                    <dt class="font-mono-tabular text-xs text-ink-tertiary shrink-0">Location</dt>
                    <dd class="font-medium text-ink text-right">{{ profile.location }} ({{ profile.timezone }})</dd>
                  </div>
                  <div class="py-2.5 flex items-baseline justify-between gap-4">
                    <dt class="font-mono-tabular text-xs text-ink-tertiary shrink-0">Experience</dt>
                    <dd class="font-medium text-ink text-right">{{ experience.company }}</dd>
                  </div>
                  <div class="py-2.5 flex items-baseline justify-between gap-4">
                    <dt class="font-mono-tabular text-xs text-ink-tertiary shrink-0">Primary Stack</dt>
                    <dd class="font-mono-tabular text-xs font-medium text-ink text-right">Vue, Nuxt, Kotlin, Compose</dd>
                  </div>
                </dl>

                <div class="pt-3 mt-1 border-t border-hairline flex flex-wrap items-center justify-between gap-2">
                  <a
                    :href="`mailto:${profile.email}`"
                    class="font-mono-tabular text-xs font-semibold text-ink underline decoration-vermilion decoration-2 underline-offset-4 hover:bg-highlighter px-1 -mx-1 rounded transition-colors"
                  >
                    {{ profile.email }}
                  </a>
                  <button
                    type="button"
                    class="h-8 px-3 rounded-full border-[1.5px] border-ink bg-surface-muted hover:bg-highlighter text-xs font-semibold text-ink active:scale-95 transition-all"
                    @click="copyEmail"
                  >
                    {{ emailCopied ? "Copied" : "Copy email" }}
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================
           2. Sticky Scroll Story: Selected Works (#works)
           ============================================================ -->
      <section id="works" data-paper-zone class="has-margin-rule py-16 sm:py-24 border-t-[1.5px] border-ink">
        <div class="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Section Header & Filter -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b-[1.5px] border-ink">
            <div class="space-y-2 max-w-[58ch]">
              <h2 class="font-display font-semibold text-ink tracking-[-0.02em] leading-[1.04] text-[clamp(2.125rem,4.4vw,3.75rem)] text-balance">
                Selected works
              </h2>
              <p class="text-base sm:text-lg text-ink-secondary text-pretty">
                Four shipped projects spanning internal business operations, role-based web dashboards, local network tooling, and native Android storage.
              </p>
            </div>

            <div class="inline-flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter works by platform">
              <button
                v-for="tab in filterOptions"
                :key="tab.value"
                type="button"
                class="h-9 px-3.5 rounded-full border-[1.5px] text-xs font-mono-tabular font-semibold transition-colors active:scale-95"
                :class="activeFilter === tab.value
                  ? 'bg-ink text-surface border-ink shadow-[2px_2px_0_var(--accent)]'
                  : 'bg-surface text-ink-secondary border-hairline hover:border-ink hover:text-ink'"
                :aria-pressed="activeFilter === tab.value"
                @click="activeFilter = tab.value"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Project Story Rows (4:8 Sticky Split on Desktop) -->
          <div class="divide-y divide-hairline">
            <article
              v-for="(project, pIdx) in filteredProjects"
              :key="project.id"
              class="py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              <!-- Sticky Left Narrative Column -->
              <div class="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
                <div class="flex items-baseline justify-between gap-3">
                  <span class="font-display text-5xl sm:text-6xl font-normal text-vermilion leading-none tabular-nums">
                    {{ project.index }}
                  </span>
                  <span class="font-mono-tabular text-xs uppercase tracking-wider text-ink-tertiary text-right">
                    {{ project.category }}
                  </span>
                </div>

                <div>
                  <h3 class="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight leading-[1.14] text-balance">
                    {{ project.title }}
                  </h3>
                  <p class="text-sm font-semibold text-signal-blue mt-1.5">
                    {{ project.editorialHook }}
                  </p>
                </div>

                <p class="text-sm sm:text-base text-ink-secondary leading-relaxed text-pretty">
                  {{ project.summary }}
                </p>

                <div class="flex flex-wrap gap-1.5 pt-1">
                  <span
                    v-for="tech in project.techStack"
                    :key="tech"
                    class="px-2.5 py-1 rounded-inner border border-hairline bg-surface text-xs font-mono-tabular text-ink"
                  >
                    {{ tech }}
                  </span>
                </div>

                <div class="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    class="pill-cta h-10 px-4 text-xs sm:text-sm"
                    @click="openProjectModal(project, getActiveScreenIndex(project))"
                  >
                    <span>Inspect gallery</span>
                    <span class="font-mono-tabular text-[11px] opacity-80">({{ project.screens.length }})</span>
                  </button>

                  <a
                    v-if="project.github"
                    :href="project.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-paper h-10 px-4 text-xs sm:text-sm"
                  >
                    <span>GitHub Repo</span>
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                  <span v-else class="text-xs font-mono-tabular text-ink-tertiary">
                    {{ project.accessLabel }}
                  </span>
                </div>
              </div>

              <!-- Right Visual Frame Stage -->
              <div class="lg:col-span-8">
                <div class="project-frame p-3 sm:p-4">
                  <!-- Top Switcher Strip -->
                  <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-hairline">
                    <!-- SpaceBridge Light vs Dark Pair Switcher -->
                    <div
                      v-if="project.isDualPortrait"
                      class="inline-flex items-center gap-1.5"
                      role="group"
                      aria-label="Switch SpaceBridge theme preview"
                    >
                      <button
                        type="button"
                        class="px-3 py-1 rounded-inner text-xs font-mono-tabular border transition-colors"
                        :class="spaceBridgeMode === 'light'
                          ? 'bg-ink text-surface border-ink font-semibold'
                          : 'bg-paper text-ink-secondary border-hairline hover:border-ink'"
                        :aria-pressed="spaceBridgeMode === 'light'"
                        @click="spaceBridgeMode = 'light'"
                      >
                        Light UI
                      </button>
                      <button
                        type="button"
                        class="px-3 py-1 rounded-inner text-xs font-mono-tabular border transition-colors"
                        :class="spaceBridgeMode === 'dark'
                          ? 'bg-ink text-surface border-ink font-semibold'
                          : 'bg-paper text-ink-secondary border-hairline hover:border-ink'"
                        :aria-pressed="spaceBridgeMode === 'dark'"
                        @click="spaceBridgeMode = 'dark'"
                      >
                        Dark UI
                      </button>
                    </div>

                    <!-- Standard Web / Hybrid Multi-Screen Tabs -->
                    <div v-else class="flex flex-wrap items-center gap-1.5">
                      <button
                        v-for="(scr, sIdx) in project.screens"
                        :key="scr.src"
                        type="button"
                        class="px-2.5 py-1 rounded-inner text-xs font-mono-tabular border transition-colors"
                        :class="getActiveScreenIndex(project) === sIdx
                          ? 'bg-ink text-surface border-ink font-semibold'
                          : 'bg-paper text-ink-secondary border-hairline hover:border-ink'"
                        :aria-pressed="getActiveScreenIndex(project) === sIdx"
                        @click="setProjectScreen(project.id, sIdx)"
                      >
                        {{ scr.label }}
                      </button>
                    </div>

                    <button
                      type="button"
                      class="text-xs font-mono-tabular font-semibold text-ink hover:text-vermilion underline underline-offset-4 ml-auto"
                      @click="openProjectModal(project, getActiveScreenIndex(project))"
                    >
                      Full details &rarr;
                    </button>
                  </div>

                  <!-- Dual Portrait Android Stage (SpaceBridge) -->
                  <div
                    v-if="project.isDualPortrait"
                    class="rounded-inner bg-surface-muted border border-hairline p-4 sm:p-6 cursor-pointer"
                    @click="openProjectModal(project, spaceBridgeMode === 'light' ? 0 : 2)"
                  >
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center justify-items-center max-w-[600px] mx-auto">
                      <figure
                        v-for="(phoneScreen, phoneIdx) in activeSpaceBridgePair"
                        :key="phoneScreen.src"
                        class="flex flex-col items-center gap-2.5"
                      >
                        <div class="rounded-[20px] border-[2px] border-ink bg-ink p-1.5 shadow-[4px_4px_0_var(--border-strong)]">
                          <img
                            :src="phoneScreen.src"
                            :alt="`${project.title} - ${phoneScreen.label}`"
                            :width="phoneScreen.width"
                            :height="phoneScreen.height"
                            :style="{ aspectRatio: `${phoneScreen.width} / ${phoneScreen.height}` }"
                            loading="lazy"
                            class="block h-[340px] sm:h-[380px] w-full max-w-[184px] rounded-[14px] object-contain"
                          />
                        </div>
                        <figcaption class="text-xs font-mono-tabular text-ink-secondary text-center">
                          {{ phoneIdx + 1 }}. {{ phoneScreen.label }}
                        </figcaption>
                      </figure>
                    </div>
                  </div>

                  <!-- Single Web or Portrait Stage -->
                  <div
                    v-else
                    class="rounded-inner bg-surface-muted border border-hairline overflow-hidden cursor-pointer flex items-center justify-center"
                    :class="getCurrentScreen(project).orientation === 'portrait' ? 'p-4 sm:p-6' : 'p-1.5 sm:p-2'"
                    @click="openProjectModal(project, getActiveScreenIndex(project))"
                  >
                    <div
                      v-if="getCurrentScreen(project).orientation === 'portrait'"
                      class="rounded-[20px] border-[2px] border-ink bg-ink p-1.5 shadow-[4px_4px_0_var(--border-strong)]"
                    >
                      <img
                        :src="getCurrentScreen(project).src"
                        :alt="`${project.title} - ${getCurrentScreen(project).label}`"
                        :width="getCurrentScreen(project).width"
                        :height="getCurrentScreen(project).height"
                        :style="{ aspectRatio: `${getCurrentScreen(project).width} / ${getCurrentScreen(project).height}` }"
                        loading="lazy"
                        class="block h-[360px] sm:h-[420px] w-full max-w-[198px] rounded-[14px] object-contain"
                      />
                    </div>

                    <img
                      v-else-if="pIdx === 0 && getActiveScreenIndex(project) === 0"
                      :src="getCurrentScreen(project).src"
                      :alt="`${project.title} - ${getCurrentScreen(project).label}`"
                      :width="getCurrentScreen(project).width"
                      :height="getCurrentScreen(project).height"
                      :style="{ aspectRatio: `${getCurrentScreen(project).width} / ${getCurrentScreen(project).height}` }"
                      fetchpriority="high"
                      class="block w-full max-h-[470px] object-contain rounded-[4px] border border-hairline bg-surface"
                    />

                    <img
                      v-else
                      :src="getCurrentScreen(project).src"
                      :alt="`${project.title} - ${getCurrentScreen(project).label}`"
                      :width="getCurrentScreen(project).width"
                      :height="getCurrentScreen(project).height"
                      :style="{ aspectRatio: `${getCurrentScreen(project).width} / ${getCurrentScreen(project).height}` }"
                      loading="lazy"
                      class="block w-full max-h-[470px] object-contain rounded-[4px] border border-hairline bg-surface"
                    />
                  </div>

                  <!-- Caption Footer -->
                  <div class="pt-3 mt-3 border-t border-hairline flex flex-wrap items-center justify-between gap-2 text-xs text-ink-secondary">
                    <span>
                      <strong class="font-semibold text-ink">{{ getCurrentCaptionTitle(project) }}:</strong>
                      {{ getCurrentCaptionBody(project) }}
                    </span>
                    <span class="font-mono-tabular text-ink-tertiary">
                      Click preview to expand
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ============================================================
           3. Dark Rhythm Break #1: Dual-Platform Craft Stage (#craft)
           ============================================================ -->
      <section
        id="craft"
        ref="craftSectionEl"
        class="bg-dark-ink py-20 sm:py-24 lg:py-28 border-y border-dark-border"
      >
        <div class="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <!-- Header & Platform Tabs -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-dark-border">
            <div class="space-y-3 max-w-[62ch]">
              <p class="font-mono-tabular text-xs uppercase tracking-widest text-mint">
                {{ activeCraftTrack.eyebrow }}
              </p>
              <h2 class="font-display font-semibold text-on-dark tracking-[-0.02em] leading-[1.04] text-[clamp(2rem,4.3vw,3.5rem)] text-balance">
                {{ activeCraftTrack.heading }}
              </h2>
              <p class="text-base text-on-dark-muted leading-relaxed text-pretty">
                {{ activeCraftTrack.summary }}
              </p>
            </div>

            <!-- Accessible Tablist -->
            <div
              ref="craftTablistEl"
              role="tablist"
              aria-label="Engineering craft focus"
              class="inline-flex flex-wrap gap-1.5 p-1.5 rounded-full border border-dark-border bg-dark-surface self-start lg:self-auto"
            >
              <button
                v-for="(track, tIdx) in craftTracks"
                :key="track.id"
                type="button"
                role="tab"
                :id="`craft-tab-${track.id}`"
                :aria-selected="activeCraftId === track.id"
                :aria-controls="`craft-panel-${track.id}`"
                :tabindex="activeCraftId === track.id ? 0 : -1"
                class="h-9 px-4 rounded-full text-xs font-mono-tabular font-semibold transition-colors"
                :class="activeCraftId === track.id
                  ? 'bg-highlighter text-ink'
                  : 'text-on-dark-muted hover:text-on-dark hover:bg-dark-ink'"
                @click="activeCraftId = track.id"
                @keydown.left.prevent="stepCraftTab(tIdx, -1)"
                @keydown.right.prevent="stepCraftTab(tIdx, 1)"
              >
                {{ track.label }}
              </button>
            </div>
          </div>

          <!-- Active Craft Panel -->
          <div
            :id="`craft-panel-${activeCraftTrack.id}`"
            role="tabpanel"
            :aria-labelledby="`craft-tab-${activeCraftTrack.id}`"
            class="space-y-8"
          >
            <!-- 2 Architecture Pillar Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="pillar in activeCraftTrack.pillars"
                :key="pillar.title"
                class="rounded-card border border-dark-border bg-dark-surface p-6 space-y-4"
              >
                <div class="space-y-2">
                  <h3 class="font-display text-xl sm:text-2xl font-semibold text-on-dark">
                    {{ pillar.title }}
                  </h3>
                  <p class="text-sm sm:text-base text-on-dark-muted leading-relaxed text-pretty">
                    {{ pillar.detail }}
                  </p>
                </div>
                <div class="flex flex-wrap gap-1.5 pt-2 border-t border-dark-border">
                  <span
                    v-for="tag in pillar.stack"
                    :key="tag"
                    class="px-2.5 py-1 rounded-inner border border-dark-border bg-dark-ink text-xs font-mono-tabular text-on-dark"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Real Paired Visual Proof -->
            <div v-if="activeCraftId === 'split'" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div class="lg:col-span-7 rounded-card border border-dark-border bg-dark-surface p-4 flex flex-col justify-between gap-4">
                <div class="flex items-center justify-between gap-3">
                  <span class="font-mono-tabular text-xs text-mint">WEB REAL-TIME · CLIPSYNC</span>
                  <span class="font-mono-tabular text-xs text-on-dark-muted">Nuxt · Bun · Redis Pub/Sub</span>
                </div>
                <img
                  src="/images/clipsync-2.png"
                  alt="ClipSync shared LAN room streaming code snippets and files"
                  width="1863"
                  height="926"
                  style="aspect-ratio: 1863 / 926;"
                  loading="lazy"
                  class="w-full rounded-inner border border-dark-border object-contain bg-surface"
                />
                <p class="text-xs sm:text-sm text-on-dark-muted">
                  Real-time room session exchanging code blocks and binary files up to 50 MB across devices on the same Wi-Fi network.
                </p>
              </div>

              <div class="lg:col-span-5 rounded-card border border-dark-border bg-dark-surface p-4 flex flex-col justify-between gap-4">
                <div class="flex items-center justify-between gap-3">
                  <span class="font-mono-tabular text-xs text-highlighter">NATIVE ANDROID · SPACEBRIDGE</span>
                  <span class="font-mono-tabular text-xs text-on-dark-muted">Kotlin · Compose · Material 3</span>
                </div>
                <div class="grid grid-cols-2 gap-3 items-center justify-items-center py-2">
                  <img
                    src="/images/SpaceBridge-5.jpeg"
                    alt="SpaceBridge dark theme checklist editor"
                    width="610"
                    height="1282"
                    style="aspect-ratio: 610 / 1282;"
                    loading="lazy"
                    class="h-[260px] sm:h-[290px] w-full max-w-[138px] rounded-[14px] border border-dark-border object-contain"
                  />
                  <img
                    src="/images/SpaceBridge-7.jpeg"
                    alt="SpaceBridge dark theme Google Drive catalog"
                    width="763"
                    height="1600"
                    style="aspect-ratio: 763 / 1600;"
                    loading="lazy"
                    class="h-[260px] sm:h-[290px] w-full max-w-[138px] rounded-[14px] border border-dark-border object-contain"
                  />
                </div>
                <p class="text-xs sm:text-sm text-on-dark-muted">
                  Offline-first Firestore checklist editor paired with in-app Google Drive file browsing and WorkManager chunked transfers.
                </p>
              </div>
            </div>

            <div v-else-if="activeCraftId === 'web'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="rounded-card border border-dark-border bg-dark-surface p-4 space-y-3">
                <div class="flex items-center justify-between gap-2">
                  <span class="font-mono-tabular text-xs text-mint">DAPURGO · CRUD TABLES</span>
                  <span class="font-mono-tabular text-xs text-on-dark-muted">Vue.js · REST API</span>
                </div>
                <img
                  src="/images/dapurgo-3.png"
                  alt="DapurGo product CRUD table"
                  width="1863"
                  height="892"
                  style="aspect-ratio: 1863 / 892;"
                  loading="lazy"
                  class="w-full rounded-inner border border-dark-border object-contain"
                />
              </div>

              <div class="rounded-card border border-dark-border bg-dark-surface p-4 space-y-3">
                <div class="flex items-center justify-between gap-2">
                  <span class="font-mono-tabular text-xs text-highlighter">INVENTORY SPA · TELEMETRY</span>
                  <span class="font-mono-tabular text-xs text-on-dark-muted">Laravel · Inertia.js · Chart.js</span>
                </div>
                <img
                  src="/images/inventaris-1.png"
                  alt="Laboratory Inventory Management analytics dashboard"
                  width="1843"
                  height="839"
                  style="aspect-ratio: 1843 / 839;"
                  loading="lazy"
                  class="w-full rounded-inner border border-dark-border object-contain"
                />
              </div>
            </div>

            <div v-else class="rounded-card border border-dark-border bg-dark-surface p-5">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span class="font-mono-tabular text-xs text-highlighter">SPACEBRIDGE NATIVE UI STATES</span>
                <span class="font-mono-tabular text-xs text-on-dark-muted">Light Feed · Dark Checklist Editor · Dark Drive Hub</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center justify-items-center">
                <img
                  src="/images/SpaceBridge-2.jpeg"
                  alt="SpaceBridge Cloud Firestore synced notes feed"
                  width="610"
                  height="1286"
                  style="aspect-ratio: 610 / 1286;"
                  loading="lazy"
                  class="h-[320px] w-full max-w-[152px] rounded-[16px] border border-dark-border object-contain"
                />
                <img
                  src="/images/SpaceBridge-5.jpeg"
                  alt="SpaceBridge checklist progress editor in dark theme"
                  width="610"
                  height="1282"
                  style="aspect-ratio: 610 / 1282;"
                  loading="lazy"
                  class="h-[320px] w-full max-w-[152px] rounded-[16px] border border-dark-border object-contain"
                />
                <img
                  src="/images/SpaceBridge-7.jpeg"
                  alt="SpaceBridge dark theme Google Drive catalog"
                  width="763"
                  height="1600"
                  style="aspect-ratio: 763 / 1600;"
                  loading="lazy"
                  class="h-[320px] w-full max-w-[152px] rounded-[16px] border border-dark-border object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================
           4. Light Ruled Spread: Experience & Technical Capabilities (#experience)
           ============================================================ -->
      <section id="experience" class="bg-ruled-paper has-margin-rule py-20 sm:py-24 lg:py-28">
        <div class="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <!-- Left 5 Cols: Experience -->
            <div class="lg:col-span-5 space-y-6 reveal-block">
              <div class="space-y-2">
                <span class="font-mono-tabular text-xs font-semibold uppercase tracking-wider text-vermilion">
                  Work history
                </span>
                <h2 class="font-display font-semibold text-ink tracking-[-0.02em] leading-[1.04] text-[clamp(2rem,4vw,3.15rem)]">
                  Practical industry experience
                </h2>
              </div>

              <div class="border-t-[1.5px] border-ink pt-5 space-y-4">
                <div class="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 class="font-display text-2xl font-semibold text-ink">
                      {{ experience.company }}
                    </h3>
                    <p class="text-sm font-semibold text-signal-blue mt-0.5">
                      {{ experience.role }}
                    </p>
                  </div>
                  <span class="px-2.5 py-1 rounded-full bg-highlighter border border-ink text-xs font-mono-tabular font-semibold text-ink">
                    {{ experience.period }} · {{ experience.duration }}
                  </span>
                </div>

                <ul class="space-y-2.5 text-sm sm:text-base text-ink-secondary">
                  <li
                    v-for="(item, idx) in experience.highlights"
                    :key="idx"
                    class="flex items-start gap-2.5"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-vermilion mt-2.5 shrink-0" aria-hidden="true"></span>
                    <span class="leading-relaxed">{{ item }}</span>
                  </li>
                </ul>

                <div class="flex flex-wrap gap-1.5 pt-2">
                  <span
                    v-for="tag in experience.stack"
                    :key="tag"
                    class="px-2.5 py-1 rounded-inner border border-hairline bg-paper text-xs font-mono-tabular text-ink"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="border-t border-hairline pt-5 flex flex-wrap items-center justify-between gap-3">
                <p class="text-xs sm:text-sm text-ink-tertiary max-w-[34ch]">
                  Complete resume documentation is available in the downloadable PDF.
                </p>
                <a
                  :href="cvHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-paper h-10 px-4 text-xs sm:text-sm shrink-0"
                >
                  <span>Open CV (PDF)</span>
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>

            <!-- Right 7 Cols: Editorial Typographic Capabilities Index -->
            <div class="lg:col-span-7 space-y-6 reveal-block">
              <div class="space-y-2">
                <span class="font-mono-tabular text-xs font-semibold uppercase tracking-wider text-ink-tertiary">
                  Technical capabilities
                </span>
                <h2 class="font-display font-semibold text-ink tracking-[-0.02em] leading-[1.04] text-[clamp(2rem,4vw,3.15rem)]">
                  Core stack and tools
                </h2>
              </div>

              <div class="border-t-[1.5px] border-ink divide-y divide-hairline">
                <div
                  v-for="group in capabilityGroups"
                  :key="group.index"
                  class="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-5 items-start"
                >
                  <div class="sm:col-span-5 flex items-baseline gap-3">
                    <span class="font-mono-tabular text-xs font-semibold text-vermilion shrink-0">
                      {{ group.index }}
                    </span>
                    <div>
                      <h3 class="font-display text-lg sm:text-xl font-semibold text-ink">
                        {{ group.title }}
                      </h3>
                      <p class="text-xs text-ink-tertiary mt-0.5 leading-relaxed">
                        {{ group.description }}
                      </p>
                    </div>
                  </div>

                  <div class="sm:col-span-7 flex flex-wrap gap-1.5">
                    <span
                      v-for="item in group.items"
                      :key="item"
                      class="px-2.5 py-1 rounded-inner border border-hairline bg-paper text-xs font-mono-tabular text-ink"
                    >
                      {{ item }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Languages & Working Style Strip -->
              <div class="pt-4 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div class="font-mono-tabular text-xs uppercase tracking-wider text-ink-tertiary mb-1">
                    Collaboration
                  </div>
                  <p class="text-ink-secondary">
                    {{ collaborationMeta.workingStyle.join(" · ") }}
                  </p>
                </div>
                <div>
                  <div class="font-mono-tabular text-xs uppercase tracking-wider text-ink-tertiary mb-1">
                    Languages
                  </div>
                  <p class="text-ink-secondary">
                    {{ collaborationMeta.languages }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================
           5. Dark Rhythm Break #2: Direct Contact & Tilted Note Form (#contact)
           ============================================================ -->
      <section
        id="contact"
        ref="contactSectionEl"
        class="bg-dark-ink py-20 sm:py-24 lg:py-28 border-t border-dark-border"
      >
        <div class="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <!-- Left 6 Cols: Direct Contact Channels -->
            <div class="lg:col-span-6 space-y-6">
              <div class="space-y-3">
                <p class="font-mono-tabular text-xs uppercase tracking-widest text-mint">
                  DIRECT CONTACT · JAKARTA BARAT (UTC+7)
                </p>
                <h2 class="font-display font-semibold text-on-dark tracking-[-0.02em] leading-[0.98] text-[clamp(2.35rem,5vw,4.15rem)] text-balance">
                  Start a direct conversation.
                </h2>
                <p class="text-base sm:text-lg text-on-dark-muted leading-relaxed max-w-[46ch] text-pretty">
                  Open to Front-End and Native Android engineering roles, product builds, and technical interviews.
                </p>
              </div>

              <!-- Contact Channel Rows -->
              <div class="border-t border-dark-border divide-y divide-dark-border">
                <!-- Email (mailto + copy) -->
                <div class="py-4 flex flex-wrap items-center justify-between gap-3">
                  <div class="min-w-0">
                    <div class="font-mono-tabular text-xs text-on-dark-muted">Email</div>
                    <a
                      :href="`mailto:${profile.email}`"
                      class="font-mono-tabular text-sm sm:text-base font-semibold text-on-dark underline decoration-highlighter decoration-2 underline-offset-4 hover:text-highlighter transition-colors break-all"
                    >
                      {{ profile.email }}
                    </a>
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    <a
                      :href="`mailto:${profile.email}`"
                      class="h-9 px-3.5 rounded-full border border-dark-border bg-dark-surface text-xs font-semibold text-on-dark inline-flex items-center hover:border-highlighter transition-colors"
                    >
                      Mail &rarr;
                    </a>
                    <button
                      type="button"
                      class="h-9 px-3.5 rounded-full border border-dark-border bg-dark-surface text-xs font-semibold text-on-dark hover:border-highlighter active:scale-95 transition-all"
                      @click="copyEmail"
                    >
                      {{ emailCopied ? "Copied" : "Copy" }}
                    </button>
                  </div>
                </div>

                <!-- Phone / WhatsApp (tel + wa + copy) -->
                <div class="py-4 flex flex-wrap items-center justify-between gap-3">
                  <div class="min-w-0">
                    <div class="font-mono-tabular text-xs text-on-dark-muted">WhatsApp &amp; Phone</div>
                    <a
                      :href="profile.phoneHref"
                      class="font-mono-tabular text-sm sm:text-base font-semibold text-on-dark underline decoration-mint decoration-2 underline-offset-4 hover:text-mint transition-colors"
                    >
                      {{ profile.phoneDisplay }}
                    </a>
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    <a
                      :href="profile.whatsappHref"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="h-9 px-3.5 rounded-full border border-dark-border bg-dark-surface text-xs font-semibold text-on-dark inline-flex items-center hover:border-mint transition-colors"
                    >
                      WhatsApp &nearr;
                    </a>
                    <button
                      type="button"
                      class="h-9 px-3.5 rounded-full border border-dark-border bg-dark-surface text-xs font-semibold text-on-dark hover:border-mint active:scale-95 transition-all"
                      @click="copyPhone"
                    >
                      {{ phoneCopied ? "Copied" : "Copy" }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Profile & CV Links -->
              <div class="flex flex-wrap items-center gap-3 pt-2">
                <a
                  :href="cvHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="pill-cta pill-cta-inverted h-10 px-5 text-xs sm:text-sm"
                >
                  <span>Download CV (PDF)</span>
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>

                <a
                  :href="profile.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-dark-outline h-10 px-4 text-xs sm:text-sm"
                >
                  <span>GitHub</span>
                  <span aria-hidden="true">&nearr;</span>
                </a>

                <a
                  :href="profile.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-dark-outline h-10 px-4 text-xs sm:text-sm"
                >
                  <span>LinkedIn</span>
                  <span aria-hidden="true">&nearr;</span>
                </a>
              </div>
            </div>

            <!-- Right 6 Cols: Tilted Warm-Paper Note Form with Yellow Offset Shadow -->
            <div class="lg:col-span-6">
              <div class="contact-note-card p-6 sm:p-8">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-hairline">
                  <h3 class="font-display text-2xl font-semibold text-ink">
                    Leave a note
                  </h3>
                  <span class="px-2.5 py-1 rounded-full bg-surface-muted border border-hairline font-mono-tabular text-xs text-ink-secondary">
                    Direct message
                  </span>
                </div>

                <form
                  ref="contactFormEl"
                  class="space-y-4"
                  @submit.prevent="submitMessage"
                >
                  <!-- Honeypot field -->
                  <input
                    v-model="botcheck"
                    type="checkbox"
                    name="botcheck"
                    class="hidden"
                    tabindex="-1"
                    autocomplete="off"
                  />

                  <div>
                    <label for="contact-name" class="block font-mono-tabular text-xs font-semibold uppercase tracking-wide text-ink mb-1.5">
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      v-model="form.name"
                      name="name"
                      type="text"
                      required
                      autocomplete="name"
                      :disabled="isSubmitting"
                      data-error="contact-name-error"
                      placeholder="Your name or team"
                      class="field-input"
                    />
                    <div id="contact-name-error" class="field-error">
                      <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>Please enter your name.</span>
                    </div>
                  </div>

                  <div>
                    <label for="contact-email" class="block font-mono-tabular text-xs font-semibold uppercase tracking-wide text-ink mb-1">
                      Email address
                    </label>
                    <span id="contact-email-hint" class="block text-xs text-ink-tertiary mb-1.5">
                      Format: name@company.com
                    </span>
                    <input
                      id="contact-email"
                      v-model="form.email"
                      name="email"
                      type="email"
                      required
                      autocomplete="email"
                      :disabled="isSubmitting"
                      aria-describedby="contact-email-hint"
                      data-error="contact-email-error"
                      placeholder="name@company.com"
                      class="field-input"
                    />
                    <div id="contact-email-error" class="field-error">
                      <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>Please enter a valid email address, such as name@company.com.</span>
                    </div>
                  </div>

                  <div>
                    <label for="contact-message" class="block font-mono-tabular text-xs font-semibold uppercase tracking-wide text-ink mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      v-model="form.message"
                      name="message"
                      rows="4"
                      required
                      minlength="8"
                      :disabled="isSubmitting"
                      data-error="contact-message-error"
                      placeholder="Share details about the role, project scope, or timeline..."
                      class="field-input resize-y"
                    ></textarea>
                    <div id="contact-message-error" class="field-error">
                      <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>Please enter a message of at least 8 characters.</span>
                    </div>
                  </div>

                  <div class="pt-1">
                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      class="pill-cta w-full h-11 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <svg
                        v-if="isSubmitting"
                        class="btn-spinner w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" opacity="0.25" />
                        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                      </svg>
                      <span>{{ isSubmitting ? "Sending message..." : "Send message" }}</span>
                      <span v-if="!isSubmitting" aria-hidden="true">&rarr;</span>
                    </button>
                  </div>

                  <div
                    v-if="formFeedback"
                    role="status"
                    class="rounded-inner border px-3.5 py-2.5 text-xs sm:text-sm font-medium flex items-start gap-2"
                    :class="formFeedback.type === 'success'
                      ? 'bg-[#E9F6EE] border-success text-success'
                      : 'bg-[#FDF0EE] border-danger text-danger'"
                  >
                    <span>{{ formFeedback.text }}</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ============================================================
         Minimal Editorial Footer
         ============================================================ -->
    <footer data-paper-zone class="site-footer bg-drafting-paper border-t-[1.5px] border-ink py-8">
      <div class="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-ink-secondary">
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span class="font-display font-semibold text-base text-ink">{{ profile.name }}</span>
          <span class="font-mono-tabular text-xs text-ink-tertiary">{{ profile.location }} ({{ profile.timezone }})</span>
        </div>

        <div class="flex flex-wrap items-center gap-4 font-mono-tabular text-xs">
          <a
            :href="cvHref"
            target="_blank"
            rel="noopener noreferrer"
            class="text-ink hover:text-vermilion underline underline-offset-4"
          >
            CV PDF
          </a>
          <a
            :href="profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-ink hover:text-vermilion underline underline-offset-4"
          >
            GitHub
          </a>
          <a
            :href="profile.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-ink hover:text-vermilion underline underline-offset-4"
          >
            LinkedIn
          </a>
          <a href="#top" class="text-ink hover:text-vermilion underline underline-offset-4">
            Top &uarr;
          </a>
        </div>
      </div>
    </footer>

    <!-- Native Top-Layer Project Lightbox Dialog -->
    <ProjectLightboxDialog ref="lightboxRef" />

    <!-- Interruptible Toast Notification -->
    <div
      class="fixed bottom-5 right-5 z-50 pointer-events-none max-w-[calc(100vw-40px)]"
      role="status"
      aria-live="polite"
    >
      <div
        v-if="toastVisible"
        class="pointer-events-auto rounded-card border-[1.5px] border-ink bg-surface px-4 py-3 shadow-[4px_4px_0_var(--border-strong)] flex items-center gap-2.5 text-sm font-medium text-ink"
        @mouseenter="pauseToastTimer"
        @mouseleave="resumeToastTimer"
        @focusin="pauseToastTimer"
        @focusout="resumeToastTimer"
      >
        <span class="w-2 h-2 rounded-full bg-success shrink-0" aria-hidden="true"></span>
        <span>{{ toastMessage }}</span>
      </div>
    </div>

    <!-- Single polite live region for blur validation announcements -->
    <div ref="liveAnnouncerEl" aria-live="polite" class="visually-hidden"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import InteractivePaperGrid from "~/components/InteractivePaperGrid.vue";
import ProjectLightboxDialog from "~/components/ProjectLightboxDialog.vue";
import {
  capabilityGroups,
  collaborationMeta,
  craftTracks,
  experience,
  navLinks,
  profile,
  projects,
  type CraftTrack,
  type ProjectItem,
} from "~/data/portfolio";

const config = useRuntimeConfig();
const cvHref = computed(() => `/CV_Tito_Adhitya_Pratama.pdf?v=${config.public.cvVersion}`);

// --- Header & Scroll Adaptation ---
const headerEl = ref<HTMLElement | null>(null);
const craftSectionEl = ref<HTMLElement | null>(null);
const contactSectionEl = ref<HTMLElement | null>(null);
const isHeaderOnDark = ref(false);
const activeSection = ref("works");
const isMobileMenuOpen = ref(false);

let manualNavFlag = false;
let manualNavTimer: ReturnType<typeof setTimeout> | null = null;

const handleNavClick = (id: string) => {
  activeSection.value = id;
  isMobileMenuOpen.value = false;
  manualNavFlag = true;
  if (manualNavTimer) clearTimeout(manualNavTimer);
  manualNavTimer = setTimeout(() => {
    manualNavFlag = false;
  }, 800);
};

const updateHeaderAndScrollSpy = () => {
  const headerHeight = headerEl.value?.offsetHeight || 68;
  const headerMid = headerHeight / 2;

  const darkSections = [craftSectionEl.value, contactSectionEl.value];
  isHeaderOnDark.value = darkSections.some((el) => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top <= headerMid && rect.bottom > headerMid;
  });

  if (manualNavFlag) return;

  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 40) {
    activeSection.value = "contact";
    return;
  }

  const orderedIds = ["contact", "experience", "craft", "works"];
  for (const id of orderedIds) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= headerHeight + 80) {
      activeSection.value = id;
      return;
    }
  }
  activeSection.value = "works";
};

// --- WCAG 2.2.2 Motion Pause Control ---
const isMotionPaused = ref(false);
const isPaperCanvasActive = ref(false);

const toggleMotion = () => {
  isMotionPaused.value = !isMotionPaused.value;
  document.documentElement.classList.toggle("motion-paused", isMotionPaused.value);
  try {
    localStorage.setItem("tap-motion-paused", isMotionPaused.value ? "true" : "false");
  } catch {
    // Ignore storage write restriction
  }
};

// --- Works Filter & Inline Screen Switchers ---
const filterOptions = [
  { label: "All (4)", value: "all" as const },
  { label: "Web Systems (3)", value: "web" as const },
  { label: "Native Android (1)", value: "android" as const },
];
const activeFilter = ref<"all" | "web" | "android">("all");

const filteredProjects = computed(() => {
  if (activeFilter.value === "all") return projects;
  return projects.filter((p) => p.filterGroup === activeFilter.value);
});

const projectScreenMap = reactive<Record<number, number>>({
  1: 0,
  2: 0,
  3: 0,
  4: 0,
});
const spaceBridgeMode = ref<"light" | "dark">("light");

const activeSpaceBridgePair = computed(() => {
  const sb = projects.find((p) => p.slug === "spacebridge");
  if (!sb) return [];
  return spaceBridgeMode.value === "light" ? sb.screens.slice(0, 2) : sb.screens.slice(2, 4);
});

const getActiveScreenIndex = (project: ProjectItem) => {
  if (project.isDualPortrait) {
    return spaceBridgeMode.value === "light" ? 0 : 2;
  }
  return projectScreenMap[project.id] || 0;
};

const setProjectScreen = (projectId: number, idx: number) => {
  projectScreenMap[projectId] = idx;
};

const getCurrentScreen = (project: ProjectItem) => {
  const idx = getActiveScreenIndex(project);
  return project.screens[idx] || project.screens[0];
};

const getCurrentCaptionTitle = (project: ProjectItem) => {
  if (project.isDualPortrait) {
    return spaceBridgeMode.value === "light" ? "Light UI Pair" : "Dark UI Pair";
  }
  return getCurrentScreen(project).label;
};

const getCurrentCaptionBody = (project: ProjectItem) => {
  if (project.isDualPortrait) {
    return spaceBridgeMode.value === "light"
      ? "Synced Firestore notes and checklists paired with the /SpaceBridge Google Drive catalog."
      : "Material 3 dark theme checklist editor paired with the dark Google Drive file hub.";
  }
  return getCurrentScreen(project).caption;
};

// --- Lightbox Modal ---
const lightboxRef = ref<InstanceType<typeof ProjectLightboxDialog> | null>(null);

const openProjectModal = (project: ProjectItem, initialIndex = 0) => {
  lightboxRef.value?.open(project, initialIndex);
};

// --- Dark Craft Stage Tabs ---
const craftTablistEl = ref<HTMLElement | null>(null);
const activeCraftId = ref<CraftTrack["id"]>("split");
const activeCraftTrack = computed(() => {
  return craftTracks.find((t) => t.id === activeCraftId.value) || craftTracks[0];
});

const stepCraftTab = (currentIdx: number, delta: number) => {
  const nextIdx = (currentIdx + delta + craftTracks.length) % craftTracks.length;
  const nextTrack = craftTracks[nextIdx];
  if (!nextTrack) return;
  activeCraftId.value = nextTrack.id;
  const buttons = craftTablistEl.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
  buttons?.[nextIdx]?.focus();
};

// --- Toast Notification (Interruptible & Pause on Hover/Focus) ---
const toastVisible = ref(false);
const toastMessage = ref("");
let toastTimer: ReturnType<typeof setTimeout> | null = null;

const startToastTimer = () => {
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastVisible.value = false;
  }, 3500);
};

const pauseToastTimer = () => {
  if (toastTimer) clearTimeout(toastTimer);
};

const resumeToastTimer = () => {
  if (toastVisible.value) startToastTimer();
};

const triggerToast = (msg: string) => {
  toastMessage.value = msg;
  toastVisible.value = true;
  startToastTimer();
};

// --- Copy Actions ---
const emailCopied = ref(false);
const phoneCopied = ref(false);

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profile.email);
  } catch {
    // Fallback notification still surfaces exact address
  }
  emailCopied.value = true;
  triggerToast(`Copied email: ${profile.email}`);
  setTimeout(() => {
    emailCopied.value = false;
  }, 2000);
};

const copyPhone = async () => {
  try {
    await navigator.clipboard.writeText(profile.phoneRaw);
  } catch {
    // Fallback notification still surfaces exact number
  }
  phoneCopied.value = true;
  triggerToast(`Copied phone: ${profile.phoneDisplay}`);
  setTimeout(() => {
    phoneCopied.value = false;
  }, 2000);
};

// --- Contact Form & Accessible Validation ---
const contactFormEl = ref<HTMLFormElement | null>(null);
const liveAnnouncerEl = ref<HTMLDivElement | null>(null);
const form = reactive({
  name: "",
  email: "",
  message: "",
});
const botcheck = ref(false);
const isSubmitting = ref(false);
const formFeedback = ref<{ type: "success" | "error"; text: string } | null>(null);

let announceTimer: ReturnType<typeof setTimeout> | null = null;
let announcedField: Element | null = null;
const flaggedFields = new WeakSet<Element>();
const announcedFields = new WeakSet<Element>();
const fallbackDirtyMap = new WeakMap<Element, { hasInteracted: boolean; hasBlurred: boolean }>();

const linkError = (el: HTMLElement, shown: boolean) => {
  const errorId = el.dataset.error;
  if (!errorId) return;
  const ids = (el.getAttribute("aria-describedby") || "")
    .split(/\s+/)
    .filter((id) => id && id !== errorId);
  if (shown) ids.push(errorId);
  if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
  else el.removeAttribute("aria-describedby");
};

const spokenText = (node: HTMLElement) => {
  const copy = node.cloneNode(true) as HTMLElement;
  copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
  return (copy.textContent || "").replace(/\s+/g, " ").trim();
};

const announceFieldError = (el: HTMLInputElement | HTMLTextAreaElement) => {
  const errorId = el.dataset.error;
  if (!errorId || !liveAnnouncerEl.value) return;
  const errorEl = document.getElementById(errorId);
  if (!errorEl) return;
  const label = el.labels?.[0] ? `${spokenText(el.labels[0])}: ` : "";
  if (announceTimer) clearTimeout(announceTimer);
  liveAnnouncerEl.value.textContent = "";
  announcedField = el;
  announceTimer = setTimeout(() => {
    if (liveAnnouncerEl.value) {
      liveAnnouncerEl.value.textContent = `${label}${spokenText(errorEl)}`;
    }
  }, 500);
};

const syncFieldAria = (el: Element | null, announce = false, forceCheck = false) => {
  if (!el || !(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) return;
  if (el.name === "botcheck") return;

  const supportsUserInvalid = CSS.supports("selector(:user-invalid)");
  let isInvalid = false;

  if (supportsUserInvalid) {
    isInvalid = el.matches(":user-invalid");
  } else {
    const state = fallbackDirtyMap.get(el);
    if (forceCheck || (state?.hasBlurred && state?.hasInteracted)) {
      isInvalid = !el.validity.valid;
      el.classList.toggle("user-invalid-fallback", isInvalid);
    }
  }

  if (isInvalid) {
    if (announce && !announcedFields.has(el)) {
      announceFieldError(el);
      announcedFields.add(el);
    }
    el.setAttribute("aria-invalid", "true");
    linkError(el, true);
    flaggedFields.add(el);
  } else if (flaggedFields.has(el) || el.getAttribute("aria-invalid") !== "true") {
    el.setAttribute("aria-invalid", "false");
    linkError(el, false);
    flaggedFields.delete(el);
    announcedFields.delete(el);
    if (!supportsUserInvalid) {
      el.classList.remove("user-invalid-fallback");
    }
    if (announcedField === el) {
      if (announceTimer) clearTimeout(announceTimer);
      if (liveAnnouncerEl.value) liveAnnouncerEl.value.textContent = "";
    }
  }
};

const submitMessage = async () => {
  if (isSubmitting.value) return;
  formFeedback.value = null;

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    triggerToast("Please fill in all fields.");
    return;
  }

  if (botcheck.value) {
    formFeedback.value = { type: "success", text: "Thank you. Your message has been sent." };
    triggerToast("Message sent.");
    form.name = "";
    form.email = "";
    form.message = "";
    contactFormEl.value?.reset();
    return;
  }

  isSubmitting.value = true;
  try {
    const accessKey = (config.public.web3formsAccessKey as string) || "";
    if (!accessKey) {
      const subject = encodeURIComponent(`Portfolio Message from ${form.name}`);
      const body = encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      formFeedback.value = {
        type: "success",
        text: `Opening your email client to send this note to ${profile.email}.`,
      };
      triggerToast("Opening email client...");
      return;
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: form.name,
        email: form.email,
        message: form.message,
        subject: `Portfolio inquiry from ${form.name}`,
        from_name: "Tito Portfolio Website",
      }),
    });

    const result = await response.json();
    if (result.success) {
      formFeedback.value = {
        type: "success",
        text: "Thank you. Your message has been delivered to Tito's inbox.",
      };
      triggerToast("Message sent successfully.");
      form.name = "";
      form.email = "";
      form.message = "";
      botcheck.value = false;
      contactFormEl.value?.reset();
    } else {
      const errText = result.message || `Could not deliver message. Please email ${profile.email} directly.`;
      formFeedback.value = { type: "error", text: errText };
      triggerToast(errText);
    }
  } catch {
    const netText = `Network error while sending. Please email ${profile.email} directly.`;
    formFeedback.value = { type: "error", text: netText };
    triggerToast(netText);
  } finally {
    isSubmitting.value = false;
  }
};

// --- Lifecycle: Scroll marks, Resize & Validation Hooks ---
let markObserver: IntersectionObserver | null = null;
let cleanupFormListeners: (() => void) | null = null;

const handleWindowResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
  updateHeaderAndScrollSpy();
};

const handleWindowKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  isMotionPaused.value = document.documentElement.classList.contains("motion-paused");

  updateHeaderAndScrollSpy();
  window.addEventListener("scroll", updateHeaderAndScrollSpy, { passive: true });
  window.addEventListener("resize", handleWindowResize, { passive: true });
  window.addEventListener("keydown", handleWindowKeyDown);

  // Scroll-tied highlighter sweeps, SVG strokes, and subtle editorial reveals
  const revealNodes = document.querySelectorAll(".reveal-block");
  revealNodes.forEach((node) => node.setAttribute("data-reveal-ready", "true"));

  markObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
  );

  document.querySelectorAll(".js-scroll-mark, .reveal-block").forEach((el) => {
    markObserver?.observe(el);
  });

  // Form ARIA & validation sync
  const formEl = contactFormEl.value;
  if (formEl) {
    formEl.querySelectorAll("input, textarea").forEach((el) => {
      if (el instanceof HTMLInputElement && el.name === "botcheck") return;
      el.setAttribute("aria-invalid", "false");
    });

    const onBlur = (e: Event) => {
      const target = e.target as Element;
      const state = fallbackDirtyMap.get(target) || { hasInteracted: false, hasBlurred: false };
      state.hasBlurred = true;
      fallbackDirtyMap.set(target, state);
      syncFieldAria(target, true);
    };

    const onInput = (e: Event) => {
      const target = e.target as Element;
      const state = fallbackDirtyMap.get(target) || { hasInteracted: false, hasBlurred: false };
      state.hasInteracted = true;
      fallbackDirtyMap.set(target, state);
      if (target.hasAttribute("aria-invalid")) {
        syncFieldAria(target, false);
      }
    };

    const onInvalid = (e: Event) => {
      const target = e.target as Element;
      const state = { hasInteracted: true, hasBlurred: true };
      fallbackDirtyMap.set(target, state);
      announcedFields.add(target);
      syncFieldAria(target, false, true);
    };

    const onReset = () => {
      setTimeout(() => {
        formEl.querySelectorAll("input, textarea").forEach((el) => {
          fallbackDirtyMap.delete(el);
          el.classList.remove("user-invalid-fallback");
          syncFieldAria(el, false);
        });
      });
    };

    formEl.addEventListener("blur", onBlur, true);
    formEl.addEventListener("input", onInput);
    formEl.addEventListener("invalid", onInvalid, true);
    formEl.addEventListener("reset", onReset, true);

    cleanupFormListeners = () => {
      formEl.removeEventListener("blur", onBlur, true);
      formEl.removeEventListener("input", onInput);
      formEl.removeEventListener("invalid", onInvalid, true);
      formEl.removeEventListener("reset", onReset, true);
    };
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateHeaderAndScrollSpy);
  window.removeEventListener("resize", handleWindowResize);
  window.removeEventListener("keydown", handleWindowKeyDown);
  markObserver?.disconnect();
  cleanupFormListeners?.();
  if (manualNavTimer) clearTimeout(manualNavTimer);
  if (toastTimer) clearTimeout(toastTimer);
  if (announceTimer) clearTimeout(announceTimer);
});
</script>
