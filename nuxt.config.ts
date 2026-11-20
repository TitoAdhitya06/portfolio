import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const cvVersion = (() => {
  try {
    const fileBuffer = readFileSync(resolve(process.cwd(), "public/CV_Tito_Adhitya_Pratama.pdf"));
    return createHash("md5").update(fileBuffer).digest("hex").slice(0, 8);
  } catch {
    return Date.now().toString(36);
  }
})();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },

  runtimeConfig: {
    public: {
      web3formsAccessKey: "bbaf2b01-5caf-4c6b-b583-6bfbb80cfe06",
      cvVersion,
    },
  },

  routeRules: {
    "/CV_Tito_Adhitya_Pratama.pdf": {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        class: "scroll-smooth",
      },
      title: "Tito Adhitya Pratama | Front-End & Native Android Engineer",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Portfolio of Tito Adhitya Pratama, Front-End and Native Android Engineer based in Jakarta Barat building web applications in Vue.js, Nuxt, and Laravel alongside native Android apps in Kotlin and Jetpack Compose.",
        },
        { property: "og:title", content: "Tito Adhitya Pratama | Front-End & Native Android Engineer" },
        {
          property: "og:description",
          content:
            "Portfolio of Tito Adhitya Pratama, Front-End and Native Android Engineer based in Jakarta Barat building web applications in Vue.js, Nuxt, and Laravel alongside native Android apps in Kotlin and Jetpack Compose.",
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
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..600&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=JetBrains+Mono:wght@400;500;600&display=swap",
        },
      ],
      script: [
        {
          tagPosition: "head",
          innerHTML: `try{if(localStorage.getItem("tap-motion-paused")==="true"){document.documentElement.classList.add("motion-paused");}}catch(e){}`,
        },
      ],
    },
  },
});
