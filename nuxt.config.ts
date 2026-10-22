// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      web3formsAccessKey: "bbaf2b01-5caf-4c6b-b583-6bfbb80cfe06",
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        class: "scroll-smooth",
      },
      title: "Tito Adhitya Pratama | Front-End Developer",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Portfolio of Tito Adhitya Pratama, an entry-level Software Engineer specializing in Vue.js, Nuxt, and Android (Kotlin).",
        },
        { property: "og:title", content: "Tito Adhitya Pratama | Front-End Developer" },
        {
          property: "og:description",
          content:
            "Explore production web projects, technical capabilities, and hands-on experience built with clean architecture.",
        },
        { property: "og:type", content: "website" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
        },
      ],
      script: [
        {
          tagPosition: "head",
          innerHTML: `try{var t=localStorage.getItem("theme-preference");if(t==="dark"){document.documentElement.classList.add("dark");document.documentElement.setAttribute("data-theme","dark");}}catch(e){}`,
        },
      ],
    },
  },
});
