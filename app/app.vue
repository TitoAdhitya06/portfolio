<template>
  <div class="min-h-screen bg-bg text-text-primary font-sans antialiased selection:bg-primary-100 selection:text-primary-800">
    <!-- ============================================================
         Header & Navigation
         ============================================================ -->
    <header
      id="navbar"
      class="sticky top-0 z-50 border-b transition-colors duration-200"
      :class="isScrolled ? 'bg-surface-card border-border shadow-sm' : 'bg-bg border-border'"
    >
      <div class="max-w-[1180px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <!-- Brand / Identity -->
        <a href="#" class="flex items-center gap-2.5 group focus:outline-none">
          <span class="w-8 h-8 rounded bg-primary-600 text-white text-sm font-bold flex items-center justify-center tracking-tight transition-transform duration-150 group-hover:-translate-y-0.5">
            TAP
          </span>
          <div class="flex flex-col">
            <span class="text-base font-bold text-text-primary leading-tight">Tito A. Pratama</span>
            <span class="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Front-end developer</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-1.5">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            @click="setActive(item.id)"
            class="px-3.5 py-2 text-sm font-medium rounded-md transition-colors duration-150"
            :class="activeSection === item.id ? 'text-primary-600 font-semibold bg-primary-50' : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'"
          >
            {{ item.label }}
          </a>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="w-9 h-9 rounded-md bg-surface-card border border-border flex items-center justify-center text-text-secondary hover:bg-surface-muted hover:text-text-primary hover:border-border-strong active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <!-- Sun Icon -->
            <svg v-if="isDark" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
            </svg>
            <!-- Moon Icon -->
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </button>

          <!-- Get in Touch CTA (Desktop / Tablet) -->
          <a
            href="#contact"
            @click="setActive('contact')"
            class="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 active:scale-95 transition-all duration-150 shadow-sm"
          >
            <span>Get in touch</span>
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden w-9 h-9 rounded-md bg-surface-card border border-border flex items-center justify-center text-text-secondary hover:bg-surface-muted hover:text-text-primary hover:border-border-strong active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            :aria-label="isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
            :aria-expanded="isMobileMenuOpen"
          >
            <svg v-if="isMobileMenuOpen" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <transition name="mobile-menu">
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden border-t border-border bg-surface-card px-4 pt-2 pb-4 shadow-md flex flex-col gap-1"
        >
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            @click="setActive(item.id)"
            class="px-3.5 py-2.5 text-sm font-medium rounded-md transition-colors duration-150 flex items-center justify-between"
            :class="activeSection === item.id ? 'text-primary-600 font-semibold bg-primary-50' : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'"
          >
            <span>{{ item.label }}</span>
            <svg v-if="activeSection === item.id" class="w-4 h-4 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </a>

          <div class="pt-2 mt-1 border-t border-border">
            <a
              href="#contact"
              @click="setActive('contact')"
              class="w-full flex items-center justify-center gap-2 h-9 px-4 rounded-md bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 active:scale-95 transition-all duration-150 shadow-sm"
            >
              <span>Get in touch</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </transition>
    </header>

    <main class="max-w-[1180px] mx-auto px-4 sm:px-6">
      <!-- ============================================================
           1. Hero Section (Asymmetric Spec Card Layout)
           ============================================================ -->
      <section id="hero" class="pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <!-- Left Column (Bio & Actions) -->
          <div class="lg:col-span-7 flex flex-col gap-5">
            <!-- Availability Pill -->
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-card border border-border shadow-sm w-fit animate-hero-1">
              <span class="w-2 h-2 rounded-full bg-success-500"></span>
              <span class="text-xs font-semibold text-text-primary">Available for new opportunities and roles</span>
            </div>

            <!-- Headline -->
            <div class="animate-hero-2">
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.12]">
                Building responsive web applications with clean architecture and fast load times.
              </h1>
            </div>

            <!-- Lead Subtitle (From CV Summary) -->
            <p class="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl animate-hero-3">
              Hi, I'm <strong>Tito Adhitya Pratama</strong>, an entry-level software engineer and recent graduate in Informatics and Computer Engineering Education from State University of Jakarta. I build web applications with Vue.js, JavaScript, and Tailwind CSS, with hands-on full-stack experience using Laravel, Inertia.js, and Nuxt.
            </p>

            <!-- Action CTAs -->
            <div class="flex flex-wrap items-center gap-3.5 pt-1 animate-hero-4">
              <a
                href="#projects"
                class="h-10 px-5 rounded-md bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold inline-flex items-center gap-2 shadow-sm active:scale-95 transition-all duration-150"
              >
                <span>View selected works</span>
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>

              <a
                href="/CV_Tito_Adhitya_Pratama.pdf"
                target="_blank"
                class="h-10 px-4 rounded-md bg-surface-card hover:bg-surface-muted text-text-primary border border-border hover:border-border-strong text-sm font-semibold inline-flex items-center gap-2 shadow-sm active:scale-95 transition-all duration-150"
              >
                <svg class="w-4 h-4 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>Download CV</span>
              </a>

              <button
                @click="copyEmail"
                class="h-10 px-4 rounded-md bg-surface-card hover:bg-surface-muted text-text-secondary border border-border hover:border-border-strong text-sm font-medium inline-flex items-center gap-2 active:scale-95 transition-all duration-150"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                </svg>
                <span>{{ emailCopied ? 'Copied' : 'Copy email' }}</span>
              </button>
            </div>

            <!-- Quick Trust Anchors -->
            <div class="flex flex-wrap items-center gap-6 pt-4 border-t border-border text-xs text-text-secondary font-medium animate-hero-4">
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-success-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Vue.js, Nuxt, and Laravel</span>
              </div>

              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-success-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <span>Fast Core Web Vitals</span>
              </div>

              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Jakarta Barat, ID (UTC+7)</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Bento Spec Card (Stitch Architecture) -->
          <div class="lg:col-span-5 flex flex-col gap-4 animate-hero-aside">
            <div class="bg-surface-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
              <!-- Window Bar Header -->
              <div class="flex items-center justify-between pb-3.5 border-b border-border">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-border-strong"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-border-strong"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-border-strong"></span>
                  <span class="font-mono text-xs text-text-tertiary ml-2">system.architect.vue</span>
                </div>
                <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-muted border border-border text-text-secondary text-[11px] font-medium tracking-tight">
                  <span class="w-1.5 h-1.5 rounded-full bg-success-500"></span>
                  <span>Strict standard</span>
                </div>
              </div>

              <!-- Metric Tiles -->
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-surface-muted border border-border rounded-lg p-3.5">
                  <span class="text-xs text-text-tertiary font-medium">Academic merit</span>
                  <div class="text-2xl font-bold text-text-primary tabular-nums mt-0.5">3.77 / 4.00</div>
                  <span class="text-xs text-text-secondary">GPA, UNJ Graduate</span>
                </div>
                <div class="bg-surface-muted border border-border rounded-lg p-3.5">
                  <span class="text-xs text-text-tertiary font-medium">Industry intern</span>
                  <div class="text-2xl font-bold text-text-primary tabular-nums mt-0.5">4 Months</div>
                  <span class="text-xs text-text-secondary">PT. Daya Gagas</span>
                </div>
              </div>

              <!-- Accessibility Card -->
              <div class="bg-surface-muted border border-border rounded-lg p-3.5 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded bg-surface-card border border-border flex items-center justify-center text-primary-600">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="4" r="2"></circle>
                      <path d="m4.93 10.93 4.24-4.24a2 2 0 0 1 2.83 0l4.24 4.24"></path>
                      <path d="M12 10v10"></path>
                      <path d="m8 16 4 4 4-4"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-text-primary">100% WCAG AA standard</h4>
                    <p class="text-xs text-text-secondary">Semantic, keyboard-navigable, clean DOM</p>
                  </div>
                </div>
                <svg class="w-5 h-5 text-success-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>

              <!-- Engineering Philosophy Quote -->
              <div class="bg-surface-muted border border-border rounded-lg p-3.5 flex items-start gap-3">
                <svg class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="4 17 10 11 4 5"></polyline>
                  <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg>
                <div>
                  <p class="text-xs text-text-primary italic leading-relaxed">
                    "Clean code loads fast, keeps interfaces accessible, and makes maintenance predictable."
                  </p>
                  <p class="text-[11px] text-text-tertiary font-semibold mt-1">
                    Engineering principle
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================
           2. Featured Projects (Horizontal Split Cards)
           ============================================================ -->
      <section id="projects" class="py-16 sm:py-20 border-t border-border scroll-mt-16">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 reveal-item">
          <div>
            <div class="inline-flex items-center gap-1.5 text-primary-600 text-xs font-bold uppercase tracking-wider mb-2">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Selected works</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">Featured projects</h2>
            <p class="text-base text-text-secondary mt-1">
              Web applications built for production, campus management, and real-time local network sharing.
            </p>
          </div>

          <!-- Filter Tabs -->
          <div class="inline-flex items-center gap-1 p-1 bg-surface-muted border border-border rounded-lg self-start md:self-auto">
            <button
              v-for="filter in filters"
              :key="filter.value"
              @click="activeFilter = filter.value"
              class="px-3.5 py-1.5 text-xs font-semibold rounded transition-colors duration-150"
              :class="activeFilter === filter.value ? 'bg-surface-card text-primary-600 shadow-sm border border-border/80' : 'text-text-secondary hover:text-text-primary'"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>

        <!-- Projects Stack -->
        <TransitionGroup
          name="project-fade"
          tag="div"
          class="flex flex-col gap-7"
        >
          <article
            v-for="project in filteredProjects"
            :key="project.id"
            class="bg-surface-card border border-border rounded-xl p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center hover:border-border-strong hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          >
            <!-- Left Info (7 Cols) -->
            <div class="lg:col-span-7 flex flex-col justify-between gap-4">
              <div class="flex flex-col gap-2.5">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-primary-50 text-primary-700 border border-primary-100">
                    {{ project.category }}
                  </span>
                  <span class="text-xs text-text-tertiary">{{ project.context }}</span>
                </div>

                <h3 class="text-xl sm:text-2xl font-bold text-text-primary tracking-tight leading-snug">
                  {{ project.title }}
                </h3>

                <p class="text-sm text-text-secondary leading-relaxed">
                  {{ project.description }}
                </p>

                <!-- Tech Badges -->
                <div class="flex flex-wrap gap-1.5 pt-1">
                  <span
                    v-for="tech in project.techStack"
                    :key="tech"
                    class="px-2.5 py-1 rounded bg-surface-muted border border-border text-xs font-semibold text-text-primary"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                <button
                  @click="openModal(project)"
                  class="h-9 px-4 rounded-md bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm active:scale-95 transition-all duration-150"
                >
                  <span>View project details</span>
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Right Thumbnail (5 Cols) -->
            <div
              @click="openModal(project)"
              class="lg:col-span-5 bg-surface-muted border border-border rounded-lg p-2 overflow-hidden cursor-pointer group"
              title="Click to view full screenshot gallery"
            >
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-56 sm:h-64 object-cover object-top rounded border border-border group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </article>
        </TransitionGroup>
      </section>

      <!-- ============================================================
           3. Technical Stack & Capabilities (4-Pillar Grid)
           ============================================================ -->
      <section id="skills" class="py-16 sm:py-20 border-t border-border scroll-mt-16">
        <div class="mb-10 reveal-item">
          <div class="inline-flex items-center gap-1.5 text-primary-600 text-xs font-bold uppercase tracking-wider mb-2">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span>Core capabilities</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">Technical stack and skills</h2>
          <p class="text-base text-text-secondary mt-1">
            Technologies and tooling I actively work with to ship reliable web systems.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <!-- Pillar 1: Frontend Core -->
          <div class="bg-surface-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between gap-4 hover:-translate-y-0.5 hover:border-border-strong transition-all duration-200 reveal-item">
            <div>
              <div class="w-10 h-10 rounded-lg bg-surface-muted text-primary-600 flex items-center justify-center mb-3">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 class="text-base font-bold text-text-primary mb-1">Frontend core</h3>
              <p class="text-xs text-text-secondary leading-relaxed">
                Component architecture, state management, and responsive interfaces.
              </p>
            </div>
            <div class="flex flex-wrap gap-1.5 pt-3 border-t border-border">
              <span v-for="tag in ['Vue.js', 'Nuxt', 'TypeScript', 'JavaScript', 'HTML/CSS']" :key="tag" class="px-2 py-0.5 rounded bg-surface-muted border border-border text-[11px] font-semibold text-text-primary">
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Pillar 2: Styling & UI -->
          <div class="bg-surface-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between gap-4 hover:-translate-y-0.5 hover:border-border-strong transition-all duration-200 reveal-item" style="transition-delay: 40ms;">
            <div>
              <div class="w-10 h-10 rounded-lg bg-info-50 text-info-600 flex items-center justify-center mb-3">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z"></path>
                </svg>
              </div>
              <h3 class="text-base font-bold text-text-primary mb-1">Styling and interface</h3>
              <p class="text-xs text-text-secondary leading-relaxed">
                Design tokens, CSS variables, responsive grid layouts, and WCAG AA contrast standards.
              </p>
            </div>
            <div class="flex flex-wrap gap-1.5 pt-3 border-t border-border">
              <span v-for="tag in ['Tailwind CSS', 'CSS Variables', 'Figma', 'Responsive Grid', 'WCAG AA']" :key="tag" class="px-2 py-0.5 rounded bg-surface-muted border border-border text-[11px] font-semibold text-text-primary">
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Pillar 3: Full-Stack & Tooling -->
          <div class="bg-surface-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between gap-4 hover:-translate-y-0.5 hover:border-border-strong transition-all duration-200 reveal-item" style="transition-delay: 80ms;">
            <div>
              <div class="w-10 h-10 rounded-lg bg-surface-muted text-text-primary flex items-center justify-center mb-3">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="18" r="3"></circle>
                  <circle cx="6" cy="6" r="3"></circle>
                  <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                  <line x1="6" y1="9" x2="6" y2="21"></line>
                </svg>
              </div>
              <h3 class="text-base font-bold text-text-primary mb-1">Full-stack and backend</h3>
              <p class="text-xs text-text-secondary leading-relaxed">
                RESTful API endpoints, database schemas, Inertia bridges, and Redis messaging.
              </p>
            </div>
            <div class="flex flex-wrap gap-1.5 pt-3 border-t border-border">
              <span v-for="tag in ['Laravel', 'Inertia.js', 'MySQL', 'REST API', 'Redis']" :key="tag" class="px-2 py-0.5 rounded bg-surface-muted border border-border text-[11px] font-semibold text-text-primary">
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Pillar 4: DevOps & Performance -->
          <div class="bg-surface-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between gap-4 hover:-translate-y-0.5 hover:border-border-strong transition-all duration-200 reveal-item" style="transition-delay: 120ms;">
            <div>
              <div class="w-10 h-10 rounded-lg bg-success-50 text-success-600 flex items-center justify-center mb-3">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 class="text-base font-bold text-text-primary mb-1">DevOps and tooling</h3>
              <p class="text-xs text-text-secondary leading-relaxed">
                Docker containers, Git version control, Bun runtime, and team issue tracking.
              </p>
            </div>
            <div class="flex flex-wrap gap-1.5 pt-3 border-t border-border">
              <span v-for="tag in ['Docker', 'Bun', 'Git and GitLab', 'ClickUp', 'Chart.js']" :key="tag" class="px-2 py-0.5 rounded bg-surface-muted border border-border text-[11px] font-semibold text-text-primary">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================
           4. Experience & Background (Structured Split Layout)
           ============================================================ -->
      <section class="py-16 sm:py-20 border-t border-border">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <!-- Left: Career Milestones & Education (7 Cols, ID: experience) -->
          <div id="experience" class="lg:col-span-7 flex flex-col gap-6 scroll-mt-24">
            <div class="reveal-item">
              <div class="inline-flex items-center gap-1.5 text-primary-600 text-xs font-bold uppercase tracking-wider mb-2">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>Career milestones</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">Work experience</h2>
            </div>

            <!-- 1. PT. Daya Gagas Internasional -->
            <div class="bg-surface-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 reveal-item">
              <div class="flex flex-wrap items-start justify-between gap-2 pb-4 border-b border-border">
                <div>
                  <h3 class="text-lg font-bold text-text-primary">Front-end developer, intern</h3>
                  <p class="text-sm font-semibold text-primary-600 mt-0.5">PT. Daya Gagas Internasional</p>
                </div>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-100">
                  March to July 2025, 4 months
                </span>
              </div>

              <ul class="flex flex-col gap-2.5 text-sm text-text-secondary">
                <li class="flex items-start gap-2.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 flex-shrink-0"></span>
                  <span>Built responsive pages for the DapurGo web app using Vue.js and JavaScript based on Figma prototypes.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 flex-shrink-0"></span>
                  <span>Implemented CRUD features for Product, Dish, and Supplier modules with RESTful API integration.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 flex-shrink-0"></span>
                  <span>Developed reusable Vue components to maintain UI consistency across multiple dashboard pages.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 flex-shrink-0"></span>
                  <span>Collaborated via GitLab, ClickUp, and Google Meet in a cross-functional agile team.</span>
                </li>
              </ul>

              <div class="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                <span v-for="tag in ['Vue.js', 'JavaScript', 'Tailwind CSS', 'REST API', 'GitLab', 'ClickUp']" :key="tag" class="px-2 py-0.5 rounded bg-surface-muted border border-border text-[11px] font-semibold text-text-primary">
                  {{ tag }}
                </span>
              </div>
            </div>


            <!-- Formal Education -->
            <div class="bg-surface-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-3 reveal-item">
              <div class="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-border">
                <div>
                  <h3 class="text-lg font-bold text-text-primary">State University of Jakarta</h3>
                  <p class="text-sm font-semibold text-primary-600 mt-0.5">Informatics and Computer Engineering Education</p>
                </div>
                <div class="text-right">
                  <span class="text-xs font-semibold text-text-primary block">2022 to 2026</span>
                  <span class="text-xs font-bold text-success-600 block mt-0.5">GPA: 3.77 / 4.00</span>
                </div>
              </div>
              <p class="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Comprehensive study of computer engineering education, data structures, algorithms, relational database systems, and modern web application development with component frameworks.
              </p>
            </div>
          </div>

          <!-- Right: About Me & Contact Hook (5 Cols) -->
          <div class="lg:col-span-5 flex flex-col gap-8">
            <!-- About Section (ID: about) -->
            <div id="about" class="flex flex-col gap-6 scroll-mt-24">
              <div class="reveal-item">
                <div class="inline-flex items-center gap-1.5 text-primary-600 text-xs font-bold uppercase tracking-wider mb-2">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Personal background</span>
                </div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">About me</h2>
              </div>

              <!-- Bio Card -->
              <div class="bg-surface-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 text-sm text-text-secondary leading-relaxed reveal-item">
                <p>
                  I build web applications with clear typography, intuitive navigation, and fast interactions. I studied computer engineering education at State University of Jakarta and enjoy turning user requirements into dependable software.
                </p>
                <p>
                  Comfortable working in cross-functional teams with Git workflows, agile sprints, and RESTful API integrations. Quick to learn new technologies and focused on building accessible user interfaces.
                </p>

                <!-- Soft Skills & Languages (From CV) -->
                <div class="p-3.5 bg-surface-muted rounded-lg border border-border flex flex-col gap-2">
                  <span class="text-xs font-bold uppercase tracking-wider text-text-primary">Soft skills and languages</span>
                  <p class="text-xs text-text-secondary">
                    <strong>Soft skills:</strong> Analytical Thinking, Problem Solving, Team Collaboration, Adaptability.
                  </p>
                  <p class="text-xs text-text-secondary">
                    <strong>Languages:</strong> Indonesian (native), English (intermediate).
                  </p>
                </div>

                <!-- Location Tag -->
                <div class="flex items-center gap-2 text-xs font-medium text-text-secondary">
                  <svg class="w-4 h-4 text-primary-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Jakarta Barat, DKI Jakarta, Indonesia (UTC+7)</span>
                </div>
              </div>
            </div>

            <!-- Contact Box (ID: contact) -->
            <div id="contact" class="bg-surface-muted border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 reveal-item scroll-mt-24">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-bold text-text-primary">Direct communication</h3>
                <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-success-50 text-success-600 border border-success-500/20">
                  Open for opportunities
                </span>
              </div>

              <!-- Email Row -->
              <div class="p-3 bg-surface-card border border-border rounded-lg flex items-center justify-between gap-2">
                <div class="flex flex-col">
                  <span class="text-[11px] text-text-tertiary font-medium">Email address</span>
                  <span class="font-mono text-xs sm:text-sm font-semibold text-text-primary">tapwrk1@gmail.com</span>
                </div>
                <button
                  @click="copyEmail"
                  class="h-8 px-3 rounded bg-surface-muted hover:bg-surface-hover text-text-primary border border-border text-xs font-semibold active:scale-95 transition-all duration-150"
                >
                  {{ emailCopied ? 'Copied' : 'Copy' }}
                </button>
              </div>

              <!-- Phone Row -->
              <div class="p-3 bg-surface-card border border-border rounded-lg flex items-center justify-between gap-2">
                <div class="flex flex-col">
                  <span class="text-[11px] text-text-tertiary font-medium">WhatsApp and phone</span>
                  <span class="font-mono text-xs sm:text-sm font-semibold text-text-primary">+62 813 1819 0212</span>
                </div>
                <button
                  @click="copyPhone"
                  class="h-8 px-3 rounded bg-surface-muted hover:bg-surface-hover text-text-primary border border-border text-xs font-semibold active:scale-95 transition-all duration-150"
                >
                  {{ phoneCopied ? 'Copied' : 'Copy' }}
                </button>
              </div>

              <!-- LinkedIn & GitHub Links -->
              <div class="grid grid-cols-2 gap-2.5">
                <a
                  href="https://www.linkedin.com/in/titoadhityapratama"
                  target="_blank"
                  rel="noopener"
                  class="h-9 px-3 rounded-md bg-surface-card hover:bg-surface-muted border border-border text-xs font-semibold text-text-primary flex items-center justify-center gap-1.5 active:scale-95 transition-all duration-150"
                >
                  <span>LinkedIn</span>
                  <svg class="w-3.5 h-3.5 text-text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>

                <a
                  href="https://github.com/TitoAdhitya06"
                  target="_blank"
                  rel="noopener"
                  class="h-9 px-3 rounded-md bg-surface-card hover:bg-surface-muted border border-border text-xs font-semibold text-text-primary flex items-center justify-center gap-1.5 active:scale-95 transition-all duration-150"
                >
                  <span>GitHub</span>
                  <svg class="w-3.5 h-3.5 text-text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>

              <!-- Message Draft Form -->
              <form @submit.prevent="submitMessage" class="flex flex-col gap-3 pt-2">
                <div>
                  <label for="name" class="block text-xs font-semibold text-text-secondary mb-1">Your name</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Your name"
                    class="w-full h-9 px-3 bg-surface-card border border-border-strong rounded-md text-xs sm:text-sm text-text-primary focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30"
                  />
                </div>
                <div>
                  <label for="email" class="block text-xs font-semibold text-text-secondary mb-1">Email address</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    class="w-full h-9 px-3 bg-surface-card border border-border-strong rounded-md text-xs sm:text-sm text-text-primary focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30"
                  />
                </div>
                <div>
                  <label for="message" class="block text-xs font-semibold text-text-secondary mb-1">Message</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    required
                    rows="3"
                    placeholder="Tell me about your team or project..."
                    class="w-full p-3 bg-surface-card border border-border-strong rounded-md text-xs sm:text-sm text-text-primary focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 resize-y"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full h-9 rounded-md bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold active:scale-95 transition-all duration-150 shadow-sm disabled:opacity-50"
                >
                  {{ isSubmitting ? 'Sending...' : 'Send message' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="mt-auto border-t border-border bg-surface-card py-8">
      <div class="max-w-[1180px] mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-text-tertiary">
        <div>
          <strong>Tito Adhitya Pratama</strong>, front-end developer portfolio
        </div>
        <div>
          Built with tokens and guidelines from <span class="font-mono text-text-secondary">DESIGN.md</span>.
        </div>
      </div>
    </footer>

    <!-- ============================================================
         Project Detail Modal Dialog (Exact match from prototype.html)
         ============================================================ -->
    <Teleport to="body">
      <div
        id="projectModal"
        class="modal-overlay"
        :class="{ open: isModalOpen }"
        @click.self="closeModal"
      >
        <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modalProjectTitle">
          <div class="modal-header">
            <h3 id="modalProjectTitle" style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">
              {{ selectedProject?.title }}
            </h3>
            <button class="icon-btn" @click="closeModal" aria-label="Close modal dialog">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <!-- Gallery Viewer with Clickable Dots & Crossfade -->
            <div class="gallery-viewer">
              <div
                class="gallery-img-container"
                :class="{ 'is-mobile-container': isCurrentMobileShot }"
              >
                <!-- Mobile UI Badge -->
                <div v-if="isCurrentMobileShot" class="mobile-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                    <path d="M12 18h.01"></path>
                  </svg>
                  <span>Mobile View</span>
                </div>

                <img
                  id="modalGalleryImg"
                  :src="selectedProject?.gallery[currentGalleryIndex]"
                  :alt="selectedProject?.title"
                  class="gallery-img"
                  :class="{ crossfading: isGalleryCrossfading, 'is-mobile-shot': isCurrentMobileShot }"
                />
              </div>
              <div class="gallery-nav-row">
                <button class="btn btn-secondary btn-sm" @click="prevImage" aria-label="Previous image">
                  &larr; Prev
                </button>
                <div class="gallery-dots">
                  <button
                    v-for="(_, idx) in selectedProject?.gallery"
                    :key="idx"
                    @click="setGalleryIndex(idx)"
                    class="gallery-dot"
                    :class="{ active: idx === currentGalleryIndex }"
                    :aria-label="`Go to screenshot ${idx + 1}`"
                  ></button>
                </div>
                <span style="font-size: 0.8125rem; color: var(--text-tertiary); font-weight: 600; font-variant-numeric: tabular-nums;">
                  {{ currentGalleryIndex + 1 }} / {{ selectedProject?.gallery.length }}
                </span>
                <button class="btn btn-secondary btn-sm" @click="nextImage">
                  Next &rarr;
                </button>
              </div>
            </div>

            <div>
              <span class="meta-text" style="text-transform: uppercase; letter-spacing: 0.04em; color: var(--primary-600); font-weight: 700;">
                {{ selectedProject?.category }}
              </span>
              <p style="margin-top: 8px; font-size: 0.9375rem; line-height: 1.6; color: var(--text-secondary);">
                {{ selectedProject?.description }}
              </p>
            </div>

            <div>
              <span class="meta-text" style="font-weight: 700; color: var(--text-primary); display: block; margin-bottom: 8px;">
                Tech Stack
              </span>
              <div class="pill-tags-wrap" style="border: none; padding: 0;">
                <span
                  v-for="tech in selectedProject?.techStack"
                  :key="tech"
                  class="tag-chip"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Toast Notification (DESIGN.md Section 5 & 6) -->
    <Teleport to="body">
      <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none">
        <transition name="toast-slide">
          <div
            v-if="toastVisible"
            class="bg-surface-card border border-border-strong rounded-md px-4 py-3 shadow-lg flex items-center gap-2.5 text-sm font-semibold text-text-primary pointer-events-auto"
          >
            <svg class="w-4 h-4 text-success-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>{{ toastMessage }}</span>
          </div>
        </transition>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

// --- Project Interface ---
interface Project {
  id: number;
  title: string;
  category: string;
  categoryType: "internal" | "spa";
  context: string;
  image: string;
  gallery: string[];
  description: string;
  techStack: string[];
  highlights?: string[];
}

// --- Navigation Items ---
const navItems = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

// --- Filter System ---
const filters = [
  { label: "All Projects (3)", value: "all" },
  { label: "Internal Systems", value: "internal" },
  { label: "Web Applications", value: "spa" },
];
const activeFilter = ref("all");

// --- Real Project Data Matching CV ---
const projects: Project[] = [
  {
    id: 1,
    title: "DapurGo, Internal Ordering and Staff System",
    category: "Internal Web System",
    categoryType: "internal",
    context: "PT. Daya Gagas Internasional (4 months internship)",
    image: "/images/dapurgo-1.png",
    gallery: [
      "/images/dapurgo-1.png",
      "/images/dapurgo-2.png",
      "/images/dapurgo-3.png",
      "/images/dapurgo-4.png",
    ],
    description:
      "Internal web application for meal ordering and inventory management. Implemented responsive interfaces in Vue.js and JavaScript from Figma designs. Built CRUD features for product, dish, and supplier modules with RESTful API integration. Maintained reusable Vue components across dashboard views and collaborated via GitLab and ClickUp in an agile team.",
    techStack: ["Vue.js", "JavaScript", "Tailwind CSS", "REST API", "GitLab", "ClickUp"],
    highlights: [
      "Built responsive pages for the DapurGo web app using Vue.js and JavaScript based on Figma prototypes.",
      "Implemented CRUD features for Product, Dish, and Supplier modules with RESTful API integration.",
      "Developed reusable Vue components to maintain UI consistency across multiple dashboard pages.",
      "Collaborated via GitLab, ClickUp, and Google Meet in a cross-functional agile team.",
    ],
  },
  {
    id: 2,
    title: "Laboratory Inventory Management System",
    category: "Single Page Application (SPA)",
    categoryType: "spa",
    context: "Senior High School 53 Jakarta, Computer Lab",
    image: "/images/inventaris-1.png",
    gallery: [
      "/images/inventaris-1.png",
      "/images/inventaris-2.png",
      "/images/inventaris-3.png",
      "/images/inventaris-4.png",
    ],
    description:
      "Web SPA replacing manual asset tracking with CRUD operations, loan management, and asset history logs. Includes role-based access control, Chart.js analytics dashboard, dark mode, and PDF/CSV data exports.",
    techStack: ["Vue.js", "Laravel", "Inertia.js", "Tailwind CSS", "MySQL", "Chart.js"],
    highlights: [
      "Built a web-based SPA replacing manual asset tracking with CRUD, loan management, and asset history logging.",
      "Implemented Role-Based Access Control (RBAC) with secure session handling.",
      "Built interactive Chart.js analytics dashboard, dark mode toggle, and automated PDF and CSV export functionality.",
    ],
  },
  {
    id: 3,
    title: "ClipSync, Local Network Clipboard and File Sharing",
    category: "Real-Time Web Application",
    categoryType: "spa",
    context: "Personal Open-Source Project",
    image: "/images/clipsync-1.png",
    gallery: [
      "/images/clipsync-1.png",
      "/images/clipsync-2.png",
      "/images/clipsync-3.jpg",
      "/images/clipsync-4.png",
    ],
    description:
      "Real-time clipboard and file sharing tool for devices on the same local network without external internet. Features multi-room sessions with QR code pairing, instant WebSocket synchronization, file uploads up to 50 MB, and auto-expiring storage backed by Redis pub/sub and Docker.",
    techStack: ["Vue.js", "Nuxt", "Bun", "Redis", "TypeScript", "Docker"],
    highlights: [
      "Created a real-time clipboard and file sharing app for devices on the same local network using WebSocket and Redis pub/sub.",
      "Supports multi-room sessions with QR Code access and real-time sync via WebSocket.",
      "Handles file uploads up to 50 MB with auto-expiring storage.",
      "Containerized backend service using Docker and Bun runtime for high throughput.",
    ],
  },
];

const filteredProjects = computed(() => {
  if (activeFilter.value === "all") return projects;
  return projects.filter((p) => p.categoryType === activeFilter.value);
});

// --- Theme State (Warm Dark Mode) ---
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("theme-preference", isDark.value ? "dark" : "light");
  applyTheme();
};

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("data-theme");
  }
};

// --- Scroll State & Scrollspy ---
const isScrolled = ref(false);
const activeSection = ref("projects");
let isManualNav = false;
let manualNavTimer: any = null;

const setActive = (id: string) => {
  activeSection.value = id;
  isMobileMenuOpen.value = false;
  isManualNav = true;
  if (manualNavTimer) clearTimeout(manualNavTimer);
  manualNavTimer = setTimeout(() => {
    isManualNav = false;
  }, 900);
};

const onScroll = () => {
  isScrolled.value = window.scrollY > 20;

  if (isManualNav) return;

  // When reached or close to bottom of page, always mark contact as active
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  if (scrollPosition >= documentHeight - 60) {
    activeSection.value = "contact";
    return;
  }

  // Scan in reverse order: contact -> about -> experience -> skills -> projects
  const sectionIds = ["contact", "about", "experience", "skills", "projects"];
  let matched = false;
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 180) {
        activeSection.value = id;
        matched = true;
        break;
      }
    }
  }
  if (!matched) {
    activeSection.value = "projects";
  }
};

// --- Mobile Menu State ---
const isMobileMenuOpen = ref(false);

const handleResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

// --- Modal Gallery State ---
const isModalOpen = ref(false);
const selectedProject = ref<Project | null>(null);
const currentGalleryIndex = ref(0);
const isGalleryCrossfading = ref(false);

const isCurrentMobileShot = computed(() => {
  if (!selectedProject.value) return false;
  const currentImg = selectedProject.value.gallery[currentGalleryIndex.value];
  return Boolean(currentImg && currentImg.includes("clipsync-3"));
});

const openModal = (project: Project) => {
  selectedProject.value = project;
  currentGalleryIndex.value = 0;
  isModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = "auto";
  setTimeout(() => {
    selectedProject.value = null;
  }, 200);
};

const setGalleryIndex = (idx: number) => {
  if (currentGalleryIndex.value === idx) return;
  isGalleryCrossfading.value = true;
  setTimeout(() => {
    currentGalleryIndex.value = idx;
    isGalleryCrossfading.value = false;
  }, 100);
};

const nextImage = () => {
  if (!selectedProject.value) return;
  const total = selectedProject.value.gallery.length;
  setGalleryIndex((currentGalleryIndex.value + 1) % total);
};

const prevImage = () => {
  if (!selectedProject.value) return;
  const total = selectedProject.value.gallery.length;
  setGalleryIndex((currentGalleryIndex.value - 1 + total) % total);
};

// --- Toast Notification System ---
const toastVisible = ref(false);
const toastMessage = ref("");
let toastTimeout: any = null;

const triggerToast = (msg: string) => {
  toastMessage.value = msg;
  toastVisible.value = true;
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastVisible.value = false;
  }, 3500);
};

// --- Copy Actions ---
const emailCopied = ref(false);
const phoneCopied = ref(false);

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText("tapwrk1@gmail.com");
    emailCopied.value = true;
    triggerToast("Email address copied: tapwrk1@gmail.com");
    setTimeout(() => {
      emailCopied.value = false;
    }, 2000);
  } catch {
    triggerToast("Email copied: tapwrk1@gmail.com");
  }
};

const copyPhone = async () => {
  try {
    await navigator.clipboard.writeText("+6281318190212");
    phoneCopied.value = true;
    triggerToast("Phone number copied: +62 813 1819 0212");
    setTimeout(() => {
      phoneCopied.value = false;
    }, 2000);
  } catch {
    triggerToast("Phone copied: +62 813 1819 0212");
  }
};

// --- Form State ---
const form = ref({
  name: "",
  email: "",
  message: "",
});
const isSubmitting = ref(false);

const submitMessage = () => {
  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    triggerToast("Thank you! Your message draft has been prepared.");
    form.value = { name: "", email: "", message: "" };
  }, 350);
};

// --- Lifecycle Hooks & Intersection Observer ---
let revealObserver: IntersectionObserver | null = null;

onMounted(() => {
  // Theme initialization: default to light mode for new visitors, preserve previous preference
  const saved = localStorage.getItem("theme-preference");
  isDark.value = saved === "dark";
  applyTheme();

  // Scroll & Resize listeners
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });

  // Keyboard Escape for Modal
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && isModalOpen.value) {
      closeModal();
    }
  });

  // IntersectionObserver for once-only reveal per DESIGN.md Section 6
  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  document.querySelectorAll(".reveal-item").forEach((el) => {
    revealObserver?.observe(el);
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", handleResize);
  revealObserver?.disconnect();
});
</script>

<style>
/* ============================================================
   DESIGN.md System Tokens (Warm Minimalist Theme)
   Zero gradients, solid colors, WCAG AA compliant.
   ============================================================ */
:root {
  --bg: #FAF7F2;
  --surface: #FAF7F2;
  --surface-card: #FFFFFF;
  --surface-muted: #F3EFEA;
  --surface-hover: #EDE6DD;
  --border: #E7E0D6;
  --border-strong: #D9D0C3;
  --overlay: rgba(38, 33, 28, 0.6);

  --text-primary: #26211C;
  --text-secondary: #655D54;
  --text-tertiary: #8C8276;
  --text-disabled: #A69E90;
  --text-on-accent: #FFFFFF;

  --primary-50: #FFF4ED;
  --primary-100: #FFE4D3;
  --primary-500: #F97316;
  --primary-600: #EA580C;
  --primary-700: #C2410C;
  --primary-800: #9A3412;

  --success-50: #EDF8F2;
  --success-500: #2E8B57;
  --success-600: #195B36;

  --info-50: #EEF5FC;
  --info-500: #2B70C9;
  --info-600: #1C4B88;

  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;

  --shadow-sm: 0 1px 3px rgba(38, 33, 28, 0.05), 0 1px 2px rgba(38, 33, 28, 0.03);
  --shadow-md: 0 6px 16px rgba(38, 33, 28, 0.07), 0 2px 4px rgba(38, 33, 28, 0.04);
  --shadow-lg: 0 16px 36px rgba(38, 33, 28, 0.12), 0 4px 8px rgba(38, 33, 28, 0.06);

  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
}

html.dark,
[data-theme="dark"] {
  --bg: #1C1915;
  --surface: #1C1915;
  --surface-card: #26221D;
  --surface-muted: #302B25;
  --surface-hover: #38322B;
  --border: #3D3730;
  --border-strong: #544C42;
  --overlay: rgba(10, 8, 6, 0.75);

  --text-primary: #F2ECE3;
  --text-secondary: #C4BBAE;
  --text-tertiary: #968D80;
  --text-disabled: #655E54;
  --text-on-accent: #FFFFFF;

  --primary-50: #332317;
  --primary-100: #4B311E;
  --primary-500: #FB923C;
  --primary-600: #EA580C;
  --primary-700: #F97316;
  --primary-800: #C2410C;

  --success-50: #172D21;
  --success-500: #3EA668;
  --success-600: #5CB987;

  --info-50: #1A2836;
  --info-500: #4A8AC9;
  --info-600: #6AA5DE;

  --shadow-sm: none;
  --shadow-md: none;
  --shadow-lg: 0 16px 36px rgba(0, 0, 0, 0.5);
}

/* Animations */
@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-hero-1 { animation: heroFadeUp 250ms var(--ease-out) 40ms both; }
.animate-hero-2 { animation: heroFadeUp 250ms var(--ease-out) 100ms both; }
.animate-hero-3 { animation: heroFadeUp 250ms var(--ease-out) 160ms both; }
.animate-hero-4 { animation: heroFadeUp 250ms var(--ease-out) 220ms both; }
.animate-hero-aside { animation: heroFadeUp 300ms var(--ease-out) 140ms both; }

/* Scroll Reveal */
.reveal-item {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 300ms var(--ease-out), transform 300ms var(--ease-out);
  will-change: opacity, transform;
}

.reveal-item.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Project Filter Transition */
.project-fade-enter-active {
  transition: opacity 180ms var(--ease-out), transform 180ms var(--ease-out);
}
.project-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.project-fade-leave-active {
  display: none;
}

/* Toast Transition */
.toast-slide-enter-active {
  transition: all 200ms var(--ease-out);
}
.toast-slide-leave-active {
  transition: all 150ms cubic-bezier(0.4, 0, 1, 1);
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  transform: translateY(16px);
  opacity: 0;
}

/* ============================================================
   Modal Gallery Viewer (Exact match from prototype.html)
   ============================================================ */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: var(--overlay);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1),
              visibility 200ms;
}

.modal-overlay.open {
  opacity: 1;
  visibility: visible;
}

.modal-dialog {
  background-color: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  max-width: 680px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  transform: scale(0.97) translateY(8px);
  opacity: 0;
  transition: transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1),
              opacity 300ms cubic-bezier(0.2, 0.8, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.modal-overlay.open .modal-dialog {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.modal-header {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
}

.modal-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.icon-btn {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background-color 150ms, border-color 150ms, color 150ms, transform 150ms;
}

@media (hover: hover) {
  .icon-btn:hover {
    background-color: var(--surface-muted);
    color: var(--text-primary);
    border-color: var(--border-strong);
    transform: translateY(-1px);
  }
}

.icon-btn:active {
  transform: translateY(0) scale(0.97);
}

.gallery-viewer {
  width: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
  background-color: var(--surface-muted);
}

.gallery-img-container {
  width: 100%;
  height: 340px;
  position: relative;
  overflow: hidden;
  background-color: var(--surface-muted);
}

.gallery-img-container.is-mobile-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 12px;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-img.is-mobile-shot {
  width: auto;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
  border: 1px solid var(--border);
}

.mobile-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  background-color: var(--surface-card);
  border: 1px solid var(--border);
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--text-secondary);
  box-shadow: var(--shadow-sm);
}

.gallery-img.crossfading {
  opacity: 0.35;
}

/* Mobile Dropdown Transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 150ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.gallery-nav-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background-color: var(--surface-card);
  border-top: 1px solid var(--border);
}

.gallery-dots {
  display: flex;
  gap: 6px;
  align-items: center;
}

.gallery-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background-color: var(--border-strong);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background-color 150ms, width 150ms;
}

.gallery-dot.active {
  background-color: var(--primary-600);
  width: 20px;
}

.btn-secondary {
  background-color: var(--surface-card);
  border: 1px solid var(--border);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color 150ms, border-color 150ms, transform 150ms;
}

@media (hover: hover) {
  .btn-secondary:hover {
    background-color: var(--surface-muted);
    border-color: var(--border-strong);
    transform: translateY(-1px);
  }
}

.btn-secondary:active {
  background-color: var(--surface-hover);
  transform: translateY(0) scale(0.98);
}

.btn-sm {
  height: 34px;
  padding: 0 14px;
  font-size: 0.875rem;
}

.pill-tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

.tag-chip {
  padding: 4px 10px;
  background-color: var(--surface-muted);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  transition: background-color 150ms, transform 150ms;
  cursor: default;
}

@media (hover: hover) {
  .tag-chip:hover {
    background-color: var(--surface-hover);
    transform: translateY(-1px);
  }
}

/* Mobile Responsive Modal Overrides */
@media (max-width: 640px) {
  .modal-overlay {
    padding: 12px;
  }

  .modal-dialog {
    max-height: 92vh;
    border-radius: var(--radius-lg);
  }

  .modal-header {
    padding: 14px 16px;
  }

  .modal-body {
    padding: 16px;
    gap: 16px;
  }

  .gallery-img-container {
    height: 220px;
  }

  .gallery-img-container.is-mobile-container {
    height: 310px;
    padding: 10px;
  }

  .gallery-nav-row {
    padding: 8px 10px;
  }

  .btn-sm {
    height: 36px;
    padding: 0 12px;
  }
}

/* Reduced Motion Override */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal-item {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
