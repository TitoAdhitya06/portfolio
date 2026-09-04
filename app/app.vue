<template>
  <main
    class="bg-animated min-h-screen font-sans overflow-x-hidden relative selection:bg-violet-400 selection:text-white
           dark:text-white text-slate-800"
  >
      <!-- ===========
           Navbar
           =========== -->
      <nav
        class="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-8 py-3 rounded-full shadow-lg
               bg-white/70 border border-slate-200/80
               dark:bg-slate-900/60 dark:border-slate-700/50
               backdrop-blur-md transition-all duration-500"
      >
        <ul
          class="flex items-center gap-4 sm:gap-8 text-sm font-semibold
                 text-slate-600 dark:text-slate-300"
        >
          <li>
            <a
              href="#"
              class="hover:text-violet-500 dark:hover:text-violet-400 transition-all duration-300"
            >Home</a>
          </li>
          <li>
            <a
              href="#about"
              class="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-300"
            >About</a>
          </li>
          <li>
            <a
              href="#projects"
              class="hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-300"
            >Projects</a>
          </li>
          <li>
            <a
              href="#contact"
              class="hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-300"
            >Contact</a>
          </li>
          <!-- Dark Mode Toggle -->
          <li>
            <button
              @click="toggleDark"
              class="p-2 rounded-full transition-all duration-300
                     bg-slate-100 hover:bg-slate-200 text-amber-500
                     dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-400
                     hover:rotate-180 hover:scale-110"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <!-- Sun Icon (shown in dark mode) -->
              <svg
                v-if="isDark"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <!-- Moon Icon (shown in light mode) -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Floating Background Blobs -->
      <div
        class="fixed top-10 left-10 sm:left-24 w-36 h-36 rounded-full mix-blend-multiply dark:mix-blend-screen blur-[80px] pointer-events-none z-0 animate-float
               bg-violet-300 dark:bg-violet-600 opacity-40 dark:opacity-60"
      ></div>
      <div
        class="fixed top-1/3 right-10 sm:right-20 w-44 h-44 rounded-full mix-blend-multiply dark:mix-blend-screen blur-[90px] pointer-events-none z-0 animate-float-delayed
               bg-cyan-300 dark:bg-cyan-600 opacity-30 dark:opacity-50"
      ></div>
      <div
        class="fixed bottom-20 left-1/4 w-32 h-32 rounded-full mix-blend-multiply dark:mix-blend-screen blur-[70px] pointer-events-none z-0 animate-float-slow
               bg-rose-300 dark:bg-rose-600 opacity-30 dark:opacity-40"
      ></div>
      <div
        class="fixed bottom-10 right-1/4 w-40 h-40 rounded-full mix-blend-multiply dark:mix-blend-screen blur-[100px] pointer-events-none z-0 animate-float
               bg-amber-200 dark:bg-amber-600 opacity-30 dark:opacity-30"
        style="animation-delay: 3s"
      ></div>

      <!-- =========================
           Hero Section
           ========================= -->
      <section
        class="min-h-screen flex items-center justify-center p-6 sm:p-12 relative z-10"
      >
        <div
          class="relative max-w-4xl w-full flex flex-col items-center text-center space-y-8"
        >
          <div class="space-y-4">
            <p
              class="font-semibold tracking-widest uppercase text-sm md:text-base
                     text-violet-500 dark:text-violet-400"
            >
              Hello, my name
            </p>
            <h1
              class="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg gradient-text"
            >
              {{ userProfile.name }}
            </h1>
            <h2
              class="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center justify-center gap-1 min-h-[40px]
                     text-slate-500 dark:text-slate-300"
            >
              {{ displayedRole
              }}<span class="text-violet-500 dark:text-violet-400 animate-pulse">|</span>
            </h2>
          </div>

          <div
            class="inline-block font-mono text-sm sm:text-base px-5 py-3 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 cursor-default
                   bg-white border border-slate-200 text-amber-600
                   dark:bg-slate-900 dark:border-slate-700 dark:text-amber-400"
          >
            > {{ userProfile.tagline
            }}<span
              class="inline-block ml-1 w-2 h-4 align-middle animate-ping
                     bg-amber-500 dark:bg-amber-400"
            ></span>
          </div>

          <p
            class="max-w-2xl text-base md:text-lg leading-relaxed
                   text-slate-600 dark:text-slate-300"
          >
            {{ userProfile.description }}
          </p>

          <div class="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
            <span
              v-for="(skill, index) in userProfile.skills"
              :key="index"
              class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-default hover:-translate-y-1"
              :class="skillColors[index % skillColors.length]"
            >
              {{ skill }}
            </span>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto">
            <a
              href="#projects"
              class="w-full sm:w-auto px-8 py-3 font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 text-center
                     bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 text-white
                     shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)]"
            >
              View Projects
            </a>
            <a
              href="/CV_Tito_Adhitya_Pratama.pdf"
              target="_blank"
              class="w-full sm:w-auto px-8 py-3 font-semibold rounded-xl border transition-all duration-300 shadow-lg hover:-translate-y-1
                     bg-white hover:bg-slate-50 text-slate-700 border-slate-200
                     dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-slate-600"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>

      <!-- Divider 1 — Violet to Cyan -->
      <div class="reveal relative z-10 w-full flex justify-center py-12">
        <div
          class="h-1 w-11/12 max-w-6xl rounded-full opacity-90
                 bg-gradient-to-r from-transparent via-violet-500 to-transparent
                 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
        ></div>
      </div>

      <!-- ==========================
           ABOUT ME SECTION
           ========================== -->
      <section
        id="about"
        class="py-24 px-6 sm:px-12 max-w-6xl mx-auto relative z-10"
      >
        <div class="flex flex-col lg:flex-row gap-12 items-center reveal">
          <!-- Left Column -->
          <div class="w-full lg:w-1/2 space-y-6">
            <div class="space-y-4">
              <h3
                class="text-3xl sm:text-5xl font-extrabold tracking-tight
                       text-slate-800 dark:text-white"
              >
                About Me
              </h3>
              <div class="w-20 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            </div>

            <div
              class="space-y-4 text-base sm:text-lg leading-relaxed font-light
                     text-slate-600 dark:text-slate-300"
            >
              <p>
                I recently graduated with a degree in Informatics and Computer
                Engineering Education from State University of Jakarta, and I am
                currently focusing on my journey as a Front-End Developer.
              </p>
              <p>
                During my studies, I completed a 4-month internship at
                <span class="font-semibold text-emerald-600 dark:text-emerald-400"
                  >PT. Daya Gagas Internasional</span
                >, where I honed my skills in translating complex design
                prototypes into responsive, interactive web interfaces using
                Vue.js and Tailwind CSS.
              </p>
              <p>
                Beyond coding, I am a collaborative problem-solver who values
                clean code and continuous learning. I am always eager to adapt to
                new technologies and grow within a professional team environment.
              </p>
            </div>
          </div>

          <!-- Right Column -->
          <div class="w-full lg:w-1/2 flex flex-col gap-6">
            <!-- Internship Card -->
            <div
              class="relative overflow-hidden rounded-2xl transition-all duration-300 group hover:-translate-y-1
                     bg-white/80 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-300
                     dark:bg-slate-900/50 dark:backdrop-blur-sm dark:border-slate-700 dark:hover:border-emerald-500/50 dark:hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)]"
            >
              <!-- Colored left accent bar -->
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-l-2xl"></div>
              <div class="p-6 sm:p-8 pl-8 sm:pl-10">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h4
                      class="text-xl font-bold transition-colors
                             text-slate-800 group-hover:text-emerald-600
                             dark:text-white dark:group-hover:text-emerald-300"
                    >
                      Front-End Developer Intern
                    </h4>
                    <p class="text-sm font-semibold mt-1 text-emerald-600 dark:text-emerald-500">
                      PT. Daya Gagas Internasional
                    </p>
                  </div>
                  <span
                    class="text-xs font-semibold px-3 py-1 rounded-full border shrink-0
                           bg-emerald-50 text-emerald-600 border-emerald-200
                           dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                    >Mar - Jul 2025</span
                  >
                </div>
                <p class="text-sm leading-relaxed mt-4 text-slate-500 dark:text-slate-400">
                  Contributed to the DapurGo web interface, integrated RESTful APIs,
                  and built reusable Vue components to ensure consistency across
                  dashboard pages.
                </p>
              </div>
            </div>

            <!-- Education Card -->
            <div
              class="relative overflow-hidden rounded-2xl transition-all duration-300 group hover:-translate-y-1
                     bg-white/80 border border-slate-200 shadow-sm hover:shadow-lg hover:border-violet-300
                     dark:bg-slate-900/50 dark:backdrop-blur-sm dark:border-slate-700 dark:hover:border-violet-500/50 dark:hover:shadow-[0_10px_30px_rgba(139,92,246,0.1)]"
            >
              <!-- Colored left accent bar -->
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-400 to-indigo-500 rounded-l-2xl"></div>
              <div class="p-6 sm:p-8 pl-8 sm:pl-10">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h4
                      class="text-xl font-bold transition-colors
                             text-slate-800 group-hover:text-violet-600
                             dark:text-white dark:group-hover:text-violet-300"
                    >
                      Bachelor's Degree
                    </h4>
                    <p class="text-sm font-semibold mt-1 text-violet-600 dark:text-violet-500">
                      State University of Jakarta
                    </p>
                  </div>
                  <span
                    class="text-xs font-semibold px-3 py-1 rounded-full border shrink-0
                           bg-violet-50 text-violet-600 border-violet-200
                           dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20"
                    >2022 - 2026</span
                  >
                </div>
                <p class="text-sm leading-relaxed mt-4 text-slate-500 dark:text-slate-400">
                  Majored in Informatics and Computer Engineering Education. Built a
                  strong foundation in web development, algorithms, and software
                  engineering principles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Divider 2 — Emerald to Teal -->
      <div class="reveal relative z-10 w-full flex justify-center py-12">
        <div
          class="h-1 w-11/12 max-w-6xl rounded-full opacity-90
                 bg-gradient-to-r from-transparent via-emerald-500 to-transparent
                 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
        ></div>
      </div>

      <!-- ==========================================
           Projects Section
           ========================================== -->
      <section
        id="projects"
        class="py-24 px-6 sm:px-12 max-w-6xl mx-auto relative z-10"
      >
        <!-- Section Title -->
        <div class="text-center mb-16 space-y-4">
          <h3
            class="text-3xl sm:text-5xl font-extrabold tracking-tight
                   text-slate-800 dark:text-white"
          >
            Featured Projects
          </h3>
          <div class="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-violet-400 to-indigo-500"></div>
          <p class="text-lg text-slate-500 dark:text-slate-400">
            Some of the works I've built and contributed to.
          </p>
        </div>

        <!-- Project Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            v-for="(project, index) in projects"
            :key="project.id"
            @click="openModal(project)"
            class="reveal group rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 flex flex-col
                   bg-white/80 border border-slate-200 shadow-sm hover:shadow-xl hover:border-violet-300
                   dark:bg-slate-900/50 dark:backdrop-blur-sm dark:border-slate-700 dark:hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] dark:hover:border-violet-500/50"
            :class="`delay-${((index % 3) + 1) * 100}`"
          >
            <!-- Project Image -->
            <div class="h-56 overflow-hidden relative">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 transition-colors duration-300
                       bg-white/10 group-hover:bg-transparent
                       dark:bg-slate-900/20 dark:group-hover:bg-transparent"
              ></div>
            </div>

            <!-- Card Text Area -->
            <div class="p-6 flex-grow flex flex-col justify-between">
              <div>
                <p class="text-sm font-semibold mb-2 text-violet-500 dark:text-violet-400">
                  {{ project.category }}
                </p>
                <h4
                  class="text-2xl font-bold mb-3 transition-colors
                         text-slate-800 group-hover:text-violet-600
                         dark:text-slate-100 dark:group-hover:text-violet-300"
                >
                  {{ project.title }}
                </h4>
                <p class="text-sm line-clamp-3 mb-4 text-slate-500 dark:text-slate-400">
                  {{ project.description }}
                </p>
              </div>

              <!-- Tech Stack Mini Tags -->
              <div class="flex flex-wrap gap-2 mt-auto">
                <span
                  v-for="tech in project.techStack.slice(0, 3)"
                  :key="tech"
                  class="text-xs font-medium px-3 py-1 rounded-md
                         text-slate-600 bg-slate-100 border border-slate-200
                         dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700"
                >
                  {{ tech }}
                </span>
                <span
                  v-if="project.techStack.length > 3"
                  class="text-xs font-medium px-3 py-1 rounded-md
                         text-slate-400 bg-slate-50 border border-slate-200/50
                         dark:text-slate-400 dark:bg-slate-800/50 dark:border-slate-700/50"
                >
                  +{{ project.techStack.length - 3 }} more
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Divider 3 — Rose to Amber -->
      <div class="reveal relative z-10 w-full flex justify-center py-12">
        <div
          class="h-1 w-11/12 max-w-6xl rounded-full opacity-90
                 bg-gradient-to-r from-transparent via-rose-500 to-transparent
                 shadow-[0_0_20px_rgba(244,63,94,0.5)]"
        ></div>
      </div>

      <!-- =============================
           Contact Section
           ============================= -->
      <section
        id="contact"
        class="reveal py-24 px-6 sm:px-12 max-w-3xl mx-auto relative z-10 text-center"
      >
        <h3
          class="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4
                 text-slate-800 dark:text-white"
        >
          Get In Touch
        </h3>
        <div class="w-16 h-1 mx-auto rounded-full mb-8 bg-gradient-to-r from-rose-400 to-pink-500"></div>

        <p class="text-lg leading-relaxed mb-10 text-slate-600 dark:text-slate-300">
          I am currently open to new opportunities as a Front-End Developer.
          Whether you have a question, a project proposal, or just want to say hi,
          my inbox is always open. I'll try my best to get back to you!
        </p>

        <!-- Contact Buttons -->
        <div
          class="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6"
        >
          <!-- Email Button -->
          <button
            @click="copyEmail"
            class="flex items-center justify-center gap-3 px-8 py-4 backdrop-blur-sm rounded-2xl transition-all duration-300 group shadow-lg hover:-translate-y-1 w-full sm:w-auto min-w-[180px]
                   bg-white/80 border border-slate-200 hover:border-[#EA4335] hover:bg-red-50 text-slate-600 hover:text-[#EA4335]
                   dark:bg-slate-900/80 dark:border-slate-700 dark:hover:border-[#EA4335] dark:hover:bg-[#EA4335]/20 dark:text-slate-300 dark:hover:text-[#EA4335]
                   hover:shadow-[0_0_20px_rgba(234,67,53,0.2)] dark:hover:shadow-[0_0_20px_rgba(234,67,53,0.3)]"
          >
            <svg
              v-if="!emailCopied"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 group-hover:animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-500 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span
              class="font-bold text-lg"
              :class="
                emailCopied ? 'text-green-500 dark:text-green-400' : ''
              "
            >
              {{ emailCopied ? "Email Copied!" : "Email" }}
            </span>
          </button>

          <!-- WhatsApp Button -->
          <a
            href="https://wa.me/6281318190212"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-3 px-8 py-4 backdrop-blur-sm rounded-2xl transition-all duration-300 group shadow-lg hover:-translate-y-1 w-full sm:w-auto min-w-[180px]
                   bg-white/80 border border-slate-200 hover:border-green-400 hover:bg-green-50 text-slate-600 hover:text-green-500
                   dark:bg-slate-900/80 dark:border-slate-700 dark:hover:border-green-400 dark:hover:bg-green-500/20 dark:text-slate-300 dark:hover:text-green-400
                   hover:shadow-[0_0_20px_rgba(74,222,128,0.2)] dark:hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 group-hover:animate-bounce"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.898-4.45 9.898-9.892 0-2.64-1.024-5.119-2.887-6.982-1.864-1.864-4.343-2.892-6.983-2.893-5.451 0-9.896 4.448-9.896 9.891.001 2.062.536 3.963 1.565 5.626l-1.127 4.116 4.238-1.46zM17.15 14.18c-.287-.144-1.696-.837-1.958-.934-.263-.096-.454-.144-.645.144-.191.288-.74 .934-.907 1.125-.167.192-.335.216-.622.072-2.176-1.085-3.666-2.079-5.127-4.22-.167-.245-.045-.357.106-.48.113-.092.247-.287.371-.431.124-.144.165-.246.247-.409.083-.163.042-.307-.021-.451-.062-.144-.645-1.554-.883-2.127-.233-.556-.47-.481-.645-.49-.166-.008-.356-.009-.547-.009s-.5.072-.763.36c-.262.288-1 .978-1 2.383s1.025 2.766 1.167 2.958c.143.192 2.015 3.076 4.881 4.312 2.115.912 2.951 1.011 3.967.925 1.096-.093 3.367-1.376 3.839-2.707.471-1.331.471-2.472.328-2.708-.143-.236-.531-.383-.818-.527z"
              />
            </svg>
            <span class="font-bold text-lg">WhatsApp</span>
          </a>

          <!-- LinkedIn Button -->
          <a
            href="https://www.linkedin.com/in/titoadhityapratama"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-3 px-8 py-4 backdrop-blur-sm rounded-2xl transition-all duration-300 group shadow-lg hover:-translate-y-1 w-full sm:w-auto min-w-[180px]
                   bg-white/80 border border-slate-200 hover:border-[#0A66C2] hover:bg-blue-50 text-slate-600 hover:text-[#0A66C2]
                   dark:bg-slate-900/80 dark:border-slate-700 dark:hover:border-[#0A66C2] dark:hover:bg-[#0A66C2]/20 dark:text-slate-300 dark:hover:text-[#0A66C2]
                   hover:shadow-[0_0_20px_rgba(10,102,194,0.2)] dark:hover:shadow-[0_0_20px_rgba(10,102,194,0.3)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 group-hover:animate-bounce"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              />
            </svg>
            <span class="font-bold text-lg">LinkedIn</span>
          </a>
        </div>
      </section>

      <!-- ==================
           Footer
           ================== -->
      <footer
        class="py-8 text-center relative z-10 mt-12 backdrop-blur-md
               border-t border-slate-200/50 bg-white/30
               dark:border-t dark:border-slate-800/50 dark:bg-slate-950/20"
      >
        <div class="flex flex-col items-center justify-center gap-2">
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
            © 2026 <span class="gradient-text-sm">Tito Adhitya Pratama</span>. All rights reserved.
          </p>
          <p class="text-xs flex items-center gap-1 text-slate-400 dark:text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            West Jakarta, Indonesia
          </p>
        </div>
      </footer>

      <!-- ==========================================
           Scroll To Top Button
           ========================================== -->
      <Transition name="fade-up">
        <button
          v-if="showScrollTop"
          @click="scrollToTop"
          class="fixed bottom-8 right-8 z-50 p-4 rounded-full transition-all duration-300 hover:-translate-y-2 group
                 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 text-white
                 shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.8)]"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 group-hover:animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </Transition>

      <!-- ==========================================
           Modal / LightBox Pop-up
           ========================================== -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md transition-opacity
               bg-white/80 dark:bg-slate-950/80"
        @click.self="closeModal"
      >
        <div
          v-if="selectedProject"
          class="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col animate-fadeIn rounded-3xl
                 bg-white border border-slate-200
                 dark:bg-slate-900 dark:border-slate-700"
        >
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm transition-colors duration-300
                   bg-slate-100/80 hover:bg-red-500 text-slate-600 hover:text-white
                   dark:bg-slate-800/80 dark:hover:bg-red-500 dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Modal Image -->
          <div class="w-full h-64 sm:h-80 lg:h-96 shrink-0 relative group">
            <img
              :src="selectedProject.gallery[currentImageIndex]"
              :alt="selectedProject.title"
              class="w-full h-full object-cover transition-all duration-500"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent
                     dark:from-slate-900 dark:via-transparent dark:to-transparent"
            ></div>

            <!-- Navigation Buttons -->
            <div
              v-if="selectedProject.gallery.length > 1"
              class="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <button
                @click="prevImage"
                class="p-2 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg hover:scale-110
                       bg-white/80 hover:bg-violet-500 text-slate-700 hover:text-white
                       dark:bg-slate-900/80 dark:hover:bg-violet-500 dark:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                @click="nextImage"
                class="p-2 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg hover:scale-110
                       bg-white/80 hover:bg-violet-500 text-slate-700 hover:text-white
                       dark:bg-slate-900/80 dark:hover:bg-violet-500 dark:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <!-- Dots Indicator -->
            <div
              v-if="selectedProject.gallery.length > 1"
              class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10"
            >
              <span
                v-for="(img, idx) in selectedProject.gallery"
                :key="idx"
                class="w-2 h-2 rounded-full transition-all duration-300"
                :class="
                  idx === currentImageIndex
                    ? 'bg-violet-500 dark:bg-violet-400 w-6'
                    : 'bg-slate-400/50 dark:bg-white/50'
                "
              ></span>
            </div>
          </div>

          <!-- Modal Content -->
          <div class="p-6 sm:p-10 -mt-10 relative z-10">
            <p
              class="font-semibold uppercase tracking-wider text-sm mb-2
                     text-violet-500 dark:text-violet-400"
            >
              {{ selectedProject.category }}
            </p>
            <h3 class="text-3xl sm:text-4xl font-extrabold mb-6 text-slate-800 dark:text-white">
              {{ selectedProject.title }}
            </h3>

            <p class="text-base sm:text-lg leading-relaxed mb-8 text-slate-600 dark:text-slate-300">
              {{ selectedProject.description }}
            </p>

            <div class="mb-8">
              <h4
                class="text-lg font-bold mb-3 flex items-center gap-2
                       text-slate-800 dark:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-violet-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.3 1.046A12.014 12.014 0 0010.3 1 12.014 12.014 0 009.298 2C4.195 2.158 1.43 5.437 1 9.5c0 4 2.89 7.02 6.7 7.5.5.06 1.01.1 1.5.1s1-.04 1.5-.1c3.81-.48 6.7-3.5 6.7-7.5-.43-4.063-3.195-7.342-8.298-7.5zM10 14a4 4 0 110-8 4 4 0 010 8z"
                    clip-rule="evenodd"
                  />
                </svg>
                Technologies Used
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in selectedProject.techStack"
                  :key="tech"
                  class="px-4 py-2 text-sm font-medium rounded-lg border
                         bg-slate-50 text-violet-600 border-slate-200
                         dark:bg-slate-800 dark:text-violet-300 dark:border-slate-700"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-4 border-t pt-6 border-slate-200 dark:border-slate-800">
              <a
                v-if="selectedProject.demoUrl && selectedProject.demoUrl !== '#'"
                :href="selectedProject.demoUrl"
                target="_blank"
                class="px-6 py-3 font-bold rounded-xl transition-colors flex items-center gap-2
                       bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 text-white"
              >
                View Live Demo
              </a>
              <a
                v-if="
                  selectedProject.githubUrl && selectedProject.githubUrl !== '#'
                "
                :href="selectedProject.githubUrl"
                target="_blank"
                class="px-6 py-3 font-semibold rounded-xl border transition-colors flex items-center gap-2
                       bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200
                       dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-slate-600"
              >
                Source Code
              </a>
              <!-- Internal Project Message -->
              <p
                v-if="
                  (!selectedProject.demoUrl || selectedProject.demoUrl === '#') &&
                  (!selectedProject.githubUrl ||
                    selectedProject.githubUrl === '#')
                "
                class="italic text-sm flex items-center gap-2 text-slate-400 dark:text-slate-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Proprietary internal system. Source code and live demo are
                restricted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

useHead({
  title: "Tito Adhitya Pratama | Front-End Developer",
  meta: [
    {
      name: "description",
      content:
        "Portfolio of Tito Adhitya Pratama, a Front-End Developer based in West Jakarta specializing in Vue.js and Tailwind CSS.",
    },
    {
      property: "og:title",
      content: "Tito Adhitya Pratama | Front-End Developer",
    },
    {
      property: "og:description",
      content:
        "Explore my projects, skills, and experience in building modern, responsive web interfaces.",
    },
    { property: "og:image", content: "/images/preview.png" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Tito Adhitya Pratama | Front-End Developer",
    },
    {
      name: "twitter:description",
      content:
        "Explore my projects, skills, and experience in building modern, responsive web interfaces.",
    },
    { name: "twitter:image", content: "/images/preview.png" },
  ],
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});

// --- DARK MODE ---
const isDark = ref(true);

const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
  updateHtmlClass();
};

const updateHtmlClass = () => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

onMounted(() => {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    isDark.value = false;
  } else if (saved === "dark") {
    isDark.value = true;
  } else {
    // Default to system preference
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  updateHtmlClass();
});

// --- DATA PROFIL ---
interface Profile {
  name: string;
  role: string;
  tagline: string;
  description: string;
  skills: string[];
}

const userProfile: Profile = {
  name: "Tito Adhitya Pratama",
  role: "Front-End Developer",
  tagline: "Code, Learn and Build",
  description: "Developing responsive, interactive, and modern interfaces.",
  skills: ["Vue.js", "Tailwind CSS", "JavaScript", "Nuxt.js"],
};

// Skill badge color classes — each skill gets a unique accent color
const skillColors = [
  // Vue.js — Emerald
  "bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-white dark:hover:border-emerald-500",
  // Tailwind — Cyan
  "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] dark:bg-cyan-500/10 dark:border-cyan-500/30 dark:text-cyan-400 dark:hover:bg-cyan-500 dark:hover:text-white dark:hover:border-cyan-500",
  // JavaScript — Amber
  "bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400 dark:hover:bg-amber-500 dark:hover:text-white dark:hover:border-amber-500",
  // Nuxt — Violet
  "bg-violet-50 border border-violet-200 text-violet-700 hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] dark:bg-violet-500/10 dark:border-violet-500/30 dark:text-violet-400 dark:hover:bg-violet-500 dark:hover:text-white dark:hover:border-violet-500",
];

const displayedRole = ref("");

onMounted(() => {
  let i = 0;
  const speed = 100;
  const typeWriter = setInterval(() => {
    if (i < userProfile.role.length) {
      displayedRole.value += userProfile.role.charAt(i);
      i++;
    } else {
      clearInterval(typeWriter);
    }
  }, speed);
});

// --- DATA PROYEK ---
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
}

const isModalOpen = ref(false);
const selectedProject = ref<Project | null>(null);

const currentImageIndex = ref(0);

const projects = ref<Project[]>([
  {
    id: 1,
    title: "DapurGo",
    category: "Internal Web System",
    image: "/images/dapurgo-1.png",
    gallery: [
      "/images/dapurgo-1.png",
      "/images/dapurgo-2.png",
      "/images/dapurgo-3.png",
      "/images/dapurgo-4.png",
    ],
    description:
      "An internal web application developed during my internship for employee management and a centralized food ordering system. Features include responsive interfaces, RESTful API integration for CRUD operations, and data management for products and suppliers.",
    techStack: ["Vue.js", "JavaScript", "REST API", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Laboratory Inventory Management",
    category: "Single Page Application (SPA)",
    image: "/images/inventaris-1.png",
    gallery: [
      "/images/inventaris-1.png",
      "/images/inventaris-2.png",
      "/images/inventaris-3.png",
      "/images/inventaris-4.png",
    ],
    description:
      "A web-based SPA built to replace manual asset tracking. It features Role-Based Access Control (RBAC), asset CRUD, loan management, a dark mode interface, and automated PDF/CSV reporting.",
    techStack: ["Vue.js", "Laravel", "Inertia.js", "Tailwind CSS", "MySQL"],
    githubUrl: "#",
  },
]);

// Fungsi Buka Modal
const openModal = (project: Project) => {
  selectedProject.value = project;
  currentImageIndex.value = 0;
  isModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

// Fungsi Tutup Modal
const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    selectedProject.value = null;
  }, 300);
  document.body.style.overflow = "auto";
};

// Fungsi geser gambar (Next & Prev)
const nextImage = () => {
  if (selectedProject.value) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % selectedProject.value.gallery.length;
  }
};

const prevImage = () => {
  if (selectedProject.value) {
    currentImageIndex.value =
      (currentImageIndex.value - 1 + selectedProject.value.gallery.length) %
      selectedProject.value.gallery.length;
  }
};

// --- LOGIKA COPY EMAIL ---
const emailCopied = ref(false);

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText("tapwrk1@gmail.com");
    emailCopied.value = true;

    setTimeout(() => {
      emailCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Gagal menyalin email", err);
  }
};

// --- LOGIKA SCROLL TO TOP ---
const showScrollTop = ref(false);

const checkScroll = () => {
  showScrollTop.value = window.scrollY > 400;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});

onMounted(() => {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });
});
</script>

<!-- Global styles (unscoped) for dark mode background -->
<style>
html {
  scroll-behavior: smooth;
}

/* Smooth transition for dark mode switch */
*,
*::before,
*::after {
  transition-property: background-color, border-color, color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

/* Animated background — light mode */
.bg-animated {
  background: linear-gradient(-45deg, #f8fafc, #f1f5f9, #ede9fe, #f0fdfa);
  background-size: 400% 400%;
  animation: gradientMove 15s ease infinite;
  transition: background 0.5s ease;
}

/* Animated background — dark mode */
html.dark .bg-animated {
  background: linear-gradient(-45deg, #0f172a, #1e293b, #1a1040, #0f172a);
  background-size: 400% 400%;
  animation: gradientMove 15s ease infinite;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Gradient text for hero name */
.gradient-text {
  background: linear-gradient(135deg, #8b5cf6, #06b6d4, #ec4899, #f59e0b);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientMove 8s ease infinite;
}

/* Small gradient text for footer */
.gradient-text-sm {
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}
</style>

<!-- Scoped styles for component-specific animations -->
<style scoped>
/* Animasi Muncul untuk Modal */
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Transisi untuk Tombol Scroll to Top */
.fade-up-enter-active,
.fade-up-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* --- ANIMASI SCROLL --- */

.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.delay-100 {
  transition-delay: 100ms;
}
.delay-200 {
  transition-delay: 200ms;
}
.delay-300 {
  transition-delay: 300ms;
}
</style>
