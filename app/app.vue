<template>
  <!-- Background -->
  <div
    class="bg-animated min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-cyan-400 selection:text-slate-900"
  >
    <!-- ===========
         Navbar
         =========== -->
    <nav
      class="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 px-8 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
    >
      <ul
        class="flex items-center gap-6 sm:gap-10 text-sm font-semibold text-slate-300"
      >
        <li>
          <a
            href="#"
            class="hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-300"
            >Home</a
          >
        </li>
        <li>
          <a
            href="#about"
            class="hover:text-cyan-400 transition-colors duration-300"
            >About</a
          >
        </li>
        <li>
          <a
            href="#projects"
            class="hover:text-cyan-400 transition-colors duration-300"
            >Projects</a
          >
        </li>
        <li>
          <a
            href="#contact"
            class="hover:text-cyan-400 transition-colors duration-300"
            >Contact</a
          >
        </li>
      </ul>
    </nav>

    <div
      class="fixed top-10 left-10 sm:left-32 w-32 h-32 bg-cyan-600 rounded-full mix-blend-screen blur-[80px] animate-pulse pointer-events-none z-0"
    ></div>
    <div
      class="fixed bottom-10 right-10 sm:right-32 w-40 h-40 bg-blue-600 rounded-full mix-blend-screen blur-[90px] opacity-50 animate-pulse pointer-events-none z-0"
      style="animation-delay: 1s"
    ></div>

    <!-- =========================
         1. HERO SECTION 
         ========================= -->
    <section
      class="min-h-screen flex items-center justify-center p-6 sm:p-12 relative z-10"
    >
      <div
        class="relative max-w-4xl w-full flex flex-col items-center text-center space-y-8"
      >
        <div class="space-y-4">
          <p
            class="text-cyan-400 font-semibold tracking-widest uppercase text-sm md:text-base"
          >
            Hello, my name
          </p>
          <h1
            class="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg"
          >
            {{ userProfile.name }}
          </h1>
          <h2
            class="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-300 flex items-center justify-center gap-1 min-h-[40px]"
          >
            {{ displayedRole
            }}<span class="text-cyan-400 animate-pulse">|</span>
          </h2>
        </div>

        <div
          class="inline-block bg-slate-900 border border-slate-700 text-green-400 font-mono text-sm sm:text-base px-5 py-3 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 cursor-default"
        >
          > {{ userProfile.tagline
          }}<span
            class="inline-block ml-1 w-2 h-4 bg-green-400 align-middle animate-ping"
          ></span>
        </div>

        <p
          class="max-w-2xl text-base md:text-lg text-slate-300 leading-relaxed"
        >
          {{ userProfile.description }}
        </p>

        <div class="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
          <span
            v-for="(skill, index) in userProfile.skills"
            :key="index"
            class="px-5 py-2 rounded-full text-sm font-medium bg-slate-800 border border-slate-600 text-slate-100 hover:bg-cyan-500 hover:text-slate-900 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 cursor-default"
          >
            {{ skill }}
          </span>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto">
          <a
            href="#projects"
            class="w-full sm:w-auto px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.7)] hover:-translate-y-1 text-center"
          >
            View Projects
          </a>
          <button
            class="w-full sm:w-auto px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-600 transition-all duration-300 shadow-lg hover:-translate-y-1"
          >
            Download CV
          </button>
        </div>
      </div>
    </section>

    <!-- =============
         Divider
         ============= -->
    <div class="reveal relative z-10 w-full flex justify-center py-12">
      <div
        class="h-1 w-11/12 max-w-6xl bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full shadow-[0_0_20px_rgba(34,211,238,0.7)] opacity-90"
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
        <!-- Left Coloumn -->
        <div class="w-full lg:w-1/2 space-y-6">
          <div class="space-y-4">
            <h3
              class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
            >
              About Me
            </h3>
            <div class="w-20 h-1 bg-cyan-500 rounded-full"></div>
          </div>

          <div
            class="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed font-light"
          >
            <p>
              I recently graduated with a degree in Informatics and Computer
              Engineering Education from State University of Jakarta, and I am
              currently focusing on my journey as a Front-End Developer.
            </p>
            <p>
              During my studies, I completed a 4-month internship at
              <span class="text-cyan-400 font-semibold"
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

        <!-- Right Coloumn -->
        <div class="w-full lg:w-1/2 flex flex-col gap-6">
          <!-- Kartu Pengalaman Magang -->
          <div
            class="bg-slate-900/50 backdrop-blur-sm border border-slate-700 p-6 sm:p-8 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_10px_30px_rgba(34,211,238,0.1)] transition-all duration-300 group hover:-translate-y-1"
          >
            <div class="flex items-start justify-between mb-2">
              <div>
                <h4
                  class="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors"
                >
                  Front-End Developer Intern
                </h4>
                <p class="text-cyan-500 text-sm font-semibold mt-1">
                  PT. Daya Gagas Internasional
                </p>
              </div>
              <span
                class="text-xs font-semibold px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 shrink-0"
                >Mar - Jul 2025</span
              >
            </div>
            <p class="text-slate-400 text-sm leading-relaxed mt-4">
              Contributed to the DapurGo web interface, integrated RESTful APIs,
              and built reusable Vue components to ensure consistency across
              dashboard pages.
            </p>
          </div>

          <!-- Kartu Pendidikan -->
          <div
            class="bg-slate-900/50 backdrop-blur-sm border border-slate-700 p-6 sm:p-8 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_10px_30px_rgba(34,211,238,0.1)] transition-all duration-300 group hover:-translate-y-1"
          >
            <div class="flex items-start justify-between mb-2">
              <div>
                <h4
                  class="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors"
                >
                  Bachelor's Degree
                </h4>
                <p class="text-cyan-500 text-sm font-semibold mt-1">
                  State University of Jakarta
                </p>
              </div>
              <span
                class="text-xs font-semibold px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 shrink-0"
                >2022 - 2026</span
              >
            </div>
            <p class="text-slate-400 text-sm leading-relaxed mt-4">
              Majored in Informatics and Computer Engineering Education. Built a
              strong foundation in web development, algorithms, and software
              engineering principles.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- =============
         Divider
         ============= -->
    <div class="reveal relative z-10 w-full flex justify-center py-12">
      <div
        class="h-1 w-11/12 max-w-6xl bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full shadow-[0_0_20px_rgba(34,211,238,0.7)] opacity-90"
      ></div>
    </div>

    <!-- ==========================================
         2. PROJECTS GALLERY SECTION
         ========================================== -->
    <section
      id="projects"
      class="py-24 px-6 sm:px-12 max-w-6xl mx-auto relative z-10"
    >
      <!-- Judul Bagian -->
      <div class="text-center mb-16 space-y-4">
        <h3
          class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Featured Projects
        </h3>
        <div class="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        <p class="text-slate-400 text-lg">
          Some of the works I've built and contributed to.
        </p>
      </div>

      <!-- Grid Kartu Proyek -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          @click="openModal(project)"
          class="reveal group bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] hover:border-cyan-500/50 transition-all duration-300 flex flex-col"
          :class="`delay-${((index % 3) + 1) * 100}`"
        >
          <!-- Area Gambar Proyek -->
          <div class="h-56 overflow-hidden relative">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-300"
            ></div>
          </div>

          <!-- Area Teks Kartu -->
          <div class="p-6 flex-grow flex flex-col justify-between">
            <div>
              <p class="text-cyan-400 text-sm font-semibold mb-2">
                {{ project.category }}
              </p>
              <h4
                class="text-2xl font-bold text-slate-100 mb-3 group-hover:text-cyan-300 transition-colors"
              >
                {{ project.title }}
              </h4>
              <p class="text-slate-400 text-sm line-clamp-3 mb-4">
                {{ project.description }}
              </p>
            </div>

            <!-- Tech Stack Mini di Kartu -->
            <div class="flex flex-wrap gap-2 mt-auto">
              <span
                v-for="tech in project.techStack.slice(0, 3)"
                :key="tech"
                class="text-xs font-medium text-slate-300 bg-slate-800 px-3 py-1 rounded-md border border-slate-700"
              >
                {{ tech }}
              </span>
              <span
                v-if="project.techStack.length > 3"
                class="text-xs font-medium text-slate-400 bg-slate-800/50 px-3 py-1 rounded-md border border-slate-700/50"
              >
                +{{ project.techStack.length - 3 }} more
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =============
         Divider
         ============= -->
    <div class="reveal relative z-10 w-full flex justify-center py-12">
      <div
        class="h-1 w-11/12 max-w-6xl bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full shadow-[0_0_20px_rgba(34,211,238,0.7)] opacity-90"
      ></div>
    </div>

    <!-- ==========================================
         4. CONTACT SECTION
         ========================================== -->
    <section
      id="contact"
      class="reveal py-24 px-6 sm:px-12 max-w-3xl mx-auto relative z-10 text-center"
    >
      <h3
        class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4"
      >
        Get In Touch
      </h3>
      <div class="w-16 h-1 bg-cyan-500 mx-auto rounded-full mb-8"></div>

      <p class="text-slate-300 text-lg leading-relaxed mb-10">
        I am currently open to new opportunities as a Front-End Developer.
        Whether you have a question, a project proposal, or just want to say hi,
        my inbox is always open. I'll try my best to get back to you!
      </p>

      <!-- BUNGKUS TOMBOL KONTAK (Diubah menjadi flex-wrap agar tidak sempit jika layarnya kecil) -->
      <div
        class="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6"
      >
        <!-- Tombol Email (Copy to Clipboard) -->
        <button
          @click="copyEmail"
          class="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 hover:border-cyan-400 hover:bg-cyan-500 text-slate-300 hover:text-slate-900 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:-translate-y-1 w-full sm:w-auto min-w-[180px]"
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
            class="h-6 w-6 text-green-400 group-hover:text-green-700"
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
              emailCopied ? 'text-green-400 group-hover:text-green-700' : ''
            "
          >
            {{ emailCopied ? "Email Copied!" : "Email" }}
          </span>
        </button>

        <!-- Tombol WhatsApp -->
        <a
          href="https://wa.me/6281318190212"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 hover:border-green-400 hover:bg-green-500/20 text-slate-300 hover:text-green-400 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] hover:-translate-y-1 w-full sm:w-auto min-w-[180px]"
        >
          <!-- Ikon WhatsApp Asli -->
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

        <!-- Tombol LinkedIn -->
        <a
          href="https://www.linkedin.com/in/titoadhityapratama"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 hover:border-cyan-400 hover:bg-cyan-500 text-slate-300 hover:text-slate-900 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:-translate-y-1 w-full sm:w-auto min-w-[180px]"
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

    <!-- ==========================================
         5. FOOTER
         ========================================== -->
    <footer
      class="py-8 text-center border-t border-slate-800/50 relative z-10 mt-12 bg-slate-950/20 backdrop-blur-md"
    >
      <div class="flex flex-col items-center justify-center gap-2">
        <p class="text-slate-400 text-sm font-medium">
          © 2026 Tito Adhitya Pratama. All rights reserved.
        </p>
        <p class="text-slate-500 text-xs flex items-center gap-1">
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
         SCROLL TO TOP BUTTON
         ========================================== -->
    <Transition name="fade-up">
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 p-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-300 hover:-translate-y-2 group"
        aria-label="Scroll to top"
      >
        <!-- Ikon Panah ke Atas dengan efek memantul -->
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
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-slate-950/80 transition-opacity"
      @click.self="closeModal"
    >
      <div
        v-if="selectedProject"
        class="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col animate-fadeIn"
      >
        <!-- Tombol Tutup (X) -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 z-10 p-2 bg-slate-800/80 hover:bg-red-500 text-white rounded-full backdrop-blur-sm transition-colors duration-300"
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

        <!-- Gambar Modal -->
        <div class="w-full h-64 sm:h-80 lg:h-96 shrink-0 relative group">
          <img
            :src="selectedProject.gallery[currentImageIndex]"
            :alt="selectedProject.title"
            class="w-full h-full object-cover transition-all duration-500"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"
          ></div>

          <!-- Tombol Navigasi Kiri & Kanan -->
          <div
            v-if="selectedProject.gallery.length > 1"
            class="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <button
              @click="prevImage"
              class="p-2 bg-slate-900/80 hover:bg-cyan-500 text-white hover:text-slate-900 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg hover:scale-110"
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
              class="p-2 bg-slate-900/80 hover:bg-cyan-500 text-white hover:text-slate-900 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg hover:scale-110"
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

          <!-- Indikator Titik (Dots) di bagian bawah gambar -->
          <div
            v-if="selectedProject.gallery.length > 1"
            class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10"
          >
            <span
              v-for="(img, idx) in selectedProject.gallery"
              :key="idx"
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="
                idx === currentImageIndex ? 'bg-cyan-400 w-6' : 'bg-white/50'
              "
            ></span>
          </div>
        </div>

        <!-- Konten Modal -->
        <div class="p-6 sm:p-10 -mt-10 relative z-10">
          <p
            class="text-cyan-400 font-semibold uppercase tracking-wider text-sm mb-2"
          >
            {{ selectedProject.category }}
          </p>
          <h3 class="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            {{ selectedProject.title }}
          </h3>

          <p class="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
            {{ selectedProject.description }}
          </p>

          <div class="mb-8">
            <h4
              class="text-lg font-bold text-white mb-3 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-cyan-500"
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
                class="px-4 py-2 bg-slate-800 text-cyan-300 text-sm font-medium rounded-lg border border-slate-700"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Tombol Aksi (Demo/GitHub) jika ada -->
          <div class="flex flex-wrap gap-4 border-t border-slate-800 pt-6">
            <a
              v-if="selectedProject.demoUrl && selectedProject.demoUrl !== '#'"
              :href="selectedProject.demoUrl"
              target="_blank"
              class="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              View Live Demo
            </a>
            <a
              v-if="
                selectedProject.githubUrl && selectedProject.githubUrl !== '#'
              "
              :href="selectedProject.githubUrl"
              target="_blank"
              class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-600 transition-colors flex items-center gap-2"
            >
              Source Code
            </a>
            <!-- Pesan jika proyek internal -->
            <p
              v-if="
                (!selectedProject.demoUrl || selectedProject.demoUrl === '#') &&
                (!selectedProject.githubUrl ||
                  selectedProject.githubUrl === '#')
              "
              class="text-slate-500 italic text-sm flex items-center gap-2"
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
  </div>
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
    // Open Graph (Untuk Preview di WhatsApp, LinkedIn, Facebook)
    {
      property: "og:title",
      content: "Tito Adhitya Pratama | Front-End Developer",
    },
    {
      property: "og:description",
      content:
        "Explore my projects, skills, and experience in building modern, responsive web interfaces.",
    },
    { property: "og:image", content: "/images/preview.png" }, // Pastikan gambar ini ada di folder public/images
    { property: "og:type", content: "website" },
    // Twitter Card
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
  image: string; // Gambar sampul (Grid)
  gallery: string[]; // BARU: Kumpulan gambar untuk slider di dalam Modal
  description: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
}

const isModalOpen = ref(false);
const selectedProject = ref<Project | null>(null);

// BARU: State untuk melacak gambar ke-berapa yang sedang dilihat
const currentImageIndex = ref(0);

const projects = ref<Project[]>([
  {
    id: 1,
    title: "DapurGo",
    category: "Internal Web System",
    image: "/images/dapurgo-1.png",
    // Masukkan semua nama file gambar proyek ini ke dalam array gallery
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

// Fungsi Buka Modal (Diperbarui agar index gambar kembali ke 0 setiap dibuka)
const openModal = (project: Project) => {
  selectedProject.value = project;
  currentImageIndex.value = 0; // Reset ke gambar pertama
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

// BARU: Fungsi untuk menggeser gambar (Next & Prev)
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
    // Perintah untuk menyalin teks ke clipboard perangkat
    await navigator.clipboard.writeText("tapwrk1@gmail.com");
    emailCopied.value = true;

    // Kembalikan tombol ke keadaan semula setelah 2 detik
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
  // Tombol akan muncul jika layar digulir lebih dari 400 pixel ke bawah
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
          // Tambahkan kelas 'active' saat elemen masuk ke layar
          entry.target.classList.add("active");

          // (Opsional) Jika ingin animasinya hanya terjadi sekali, aktifkan kode di bawah:
          // revealObserver.unobserve(entry.target);
        } else {
          // Hapus kelas 'active' jika elemen keluar layar (agar bisa diulang saat scroll naik turun)
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.15, // Animasi terpicu saat 15% bagian elemen sudah terlihat di layar
    },
  );

  // Cari semua elemen HTML yang memiliki kelas 'reveal' lalu pantau
  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });
});
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

.bg-animated {
  background: linear-gradient(-45deg, #0f172a, #1e293b, #172c65, #0f172a);
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

/* Animasi Muncul Halus untuk Modal */
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

/* Transisi Halus untuk Tombol Scroll to Top */
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

/* --- ANIMASI SCROLL REVEAL --- */
/* Kondisi Awal: Transparan dan turun 40px ke bawah */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}

/* Kondisi Aktif: Jelas dan kembali ke posisi semula */
.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

/* Tambahan: Memberikan jeda (delay) jika ada elemen yang berjejer agar munculnya bergantian */
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
