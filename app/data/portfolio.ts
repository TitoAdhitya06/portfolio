export interface ProjectScreen {
  src: string;
  label: string;
  caption: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait";
  theme?: "light" | "dark";
}

export interface ProjectItem {
  id: number;
  index: string;
  slug: string;
  title: string;
  editorialHook: string;
  category: string;
  filterGroup: "web" | "android";
  context: string;
  summary: string;
  techStack: string[];
  highlights: string[];
  github?: string;
  accessLabel: string;
  isDualPortrait?: boolean;
  screens: ProjectScreen[];
}

export interface CraftTrack {
  id: "split" | "web" | "android";
  label: string;
  eyebrow: string;
  heading: string;
  summary: string;
  pillars: { title: string; detail: string; stack: string[] }[];
}

export interface CapabilityGroup {
  index: string;
  title: string;
  description: string;
  items: string[];
}

export const profile = {
  name: "Tito Adhitya Pratama",
  shortName: "Tito A. Pratama",
  role: "Front-End & Native Android Engineer",
  location: "Jakarta Barat, Indonesia",
  timezone: "UTC+7",
  availability: "Available for Front-End & Android roles",
  email: "tapwrk1@gmail.com",
  phoneDisplay: "+62 813 1819 0212",
  phoneRaw: "+6281318190212",
  phoneHref: "tel:+6281318190212",
  whatsappHref: "https://wa.me/6281318190212",
  linkedin: "https://www.linkedin.com/in/titoadhityapratama",
  github: "https://github.com/TitoAdhitya06",
};

export const navLinks = [
  { id: "works", label: "Works" },
  { id: "craft", label: "Craft" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const projects: ProjectItem[] = [
  {
    id: 1,
    index: "01",
    slug: "dapurgo",
    title: "DapurGo Ordering & Back-Office",
    editorialHook: "Turning Figma prototypes into structured daily kitchen operations.",
    category: "Internal Web System",
    filterGroup: "web",
    context: "PT. Daya Gagas Internasional · Internship Project",
    summary:
      "Internal web application built for meal ordering, supplier coordination, and catalog administration. Translated Figma prototypes into modular Vue.js interfaces connected to RESTful APIs across daily operational modules.",
    techStack: ["Vue.js", "JavaScript", "Tailwind CSS", "REST API", "GitLab", "ClickUp"],
    highlights: [
      "Implemented responsive operational views in Vue.js and JavaScript directly from Figma prototypes.",
      "Built CRUD workflows for Product, Dish, Customer, and Supplier modules backed by RESTful APIs.",
      "Standardized shared table, filter, and modal components across multiple dashboard views.",
      "Delivered features alongside backend engineers using GitLab merge flows and ClickUp sprint tracking.",
    ],
    accessLabel: "Internal company system",
    screens: [
      {
        src: "/images/dapurgo-3.png",
        label: "Product Catalog",
        caption: "Product CRUD table with search, date filtering, unit tracking, and pagination.",
        width: 1863,
        height: 892,
        orientation: "landscape",
      },
      {
        src: "/images/dapurgo-2.png",
        label: "Customer Directory",
        caption: "Customer records view organizing account tiers, WhatsApp contacts, and delivery addresses.",
        width: 1863,
        height: 894,
        orientation: "landscape",
      },
      {
        src: "/images/dapurgo-4.png",
        label: "Dish Management",
        caption: "Dish and side-item inventory screen with author attribution and edit actions.",
        width: 1865,
        height: 887,
        orientation: "landscape",
      },
    ],
  },
  {
    id: 2,
    index: "02",
    slug: "laboratory-inventory",
    title: "Laboratory Inventory Management",
    editorialHook: "Replacing paper equipment logs with role-aware asset tracking.",
    category: "Single Page Application",
    filterGroup: "web",
    context: "SMAN 53 Jakarta Computer Lab · Web SPA",
    summary:
      "Single-page web platform built with Laravel, Inertia.js, and Vue.js to manage computer laboratory equipment, borrowing cycles, condition monitoring, and structured PDF or CSV reporting.",
    techStack: ["Vue.js", "Laravel", "Inertia.js", "Tailwind CSS", "MySQL", "Chart.js"],
    highlights: [
      "Replaced manual spreadsheet tracking with searchable asset CRUD, borrowing logs, and lifecycle history.",
      "Implemented Role-Based Access Control (RBAC) separating administrator and supervisor permissions.",
      "Built Chart.js asset condition analytics, dark mode support, and automated PDF/CSV export pipelines.",
    ],
    accessLabel: "Deployed lab system",
    screens: [
      {
        src: "/images/inventaris-1.png",
        label: "Analytics Dashboard",
        caption: "Condition breakdown chart, status summary tiles, and recent lab equipment loans.",
        width: 1843,
        height: 839,
        orientation: "landscape",
      },
      {
        src: "/images/inventaris-2.png",
        label: "Asset Registry",
        caption: "Paginated laboratory asset table with hardware location, status badges, and row actions.",
        width: 1840,
        height: 836,
        orientation: "landscape",
      },
      {
        src: "/images/inventaris-3.png",
        label: "Loan Tracking",
        caption: "Equipment checkout and return schedule tracking active and completed student loans.",
        width: 1844,
        height: 837,
        orientation: "landscape",
      },
      {
        src: "/images/inventaris-4.png",
        label: "Role Access Control",
        caption: "User management matrix assigning RBAC roles across lab staff and supervisors.",
        width: 1845,
        height: 838,
        orientation: "landscape",
      },
    ],
  },
  {
    id: 3,
    index: "03",
    slug: "clipsync",
    title: "ClipSync LAN Clipboard & Files",
    editorialHook: "Zero-setup snippet and file handoff over local Wi-Fi.",
    category: "Real-Time Web Application",
    filterGroup: "web",
    context: "Open-Source Project · Web & Mobile Browser",
    summary:
      "Real-time clipboard and file transfer tool for devices sharing a local network without external cloud accounts. Pairs phones and laptops via QR code over WebSockets, Redis pub/sub, and containerized Bun services.",
    techStack: ["Vue.js", "Nuxt", "TypeScript", "Bun", "Redis", "WebSocket", "Docker"],
    highlights: [
      "Built multi-room real-time synchronization using WebSockets and Redis pub/sub channels.",
      "Added instant QR code room pairing so mobile browsers join the exact LAN session in one scan.",
      "Supported binary file uploads up to 50 MB alongside plain code snippets with auto-expiring storage.",
      "Packaged the Bun and Redis backend with Docker for predictable self-hosted deployment.",
    ],
    github: "https://github.com/TitoAdhitya06/ClipSync",
    accessLabel: "Open-source on GitHub",
    screens: [
      {
        src: "/images/clipsync-2.png",
        label: "Live Clipboard Room",
        caption: "Shared session streaming code snippets and downloadable file cards in real time.",
        width: 1863,
        height: 926,
        orientation: "landscape",
      },
      {
        src: "/images/clipsync-4.png",
        label: "QR Code Pairing",
        caption: "Share Room modal generating scannable LAN QR links for instant mobile handoff.",
        width: 1861,
        height: 921,
        orientation: "landscape",
      },
      {
        src: "/images/clipsync-3.jpg",
        label: "Mobile Browser View",
        caption: "Phone layout running directly on local network IP with responsive snippet wrapping.",
        width: 1220,
        height: 2587,
        orientation: "portrait",
      },
    ],
  },
  {
    id: 4,
    index: "04",
    slug: "spacebridge",
    title: "SpaceBridge Notes & Drive Hub",
    editorialHook: "Bridging isolated Android Second Space notes and direct Drive uploads.",
    category: "Native Android Application",
    filterGroup: "android",
    context: "Open-Source Project · Kotlin & Jetpack Compose",
    summary:
      "Native Android app resolving note isolation across devices and Android Second Space profiles via Cloud Firestore offline persistence, paired with an in-app Google Drive catalog and resilient WorkManager chunked uploads.",
    techStack: [
      "Kotlin",
      "Jetpack Compose",
      "Material 3",
      "Cloud Firestore",
      "Google Drive API",
      "WorkManager",
      "Clean Architecture",
    ],
    highlights: [
      "Architected offline-first text and checklist notes synced through Cloud Firestore across multi-profile Android setups.",
      "Integrated Google Drive REST API v3 to browse, filter, and upload directly inside the /SpaceBridge directory.",
      "Implemented chunked resumable background uploads using AndroidX WorkManager so transfers survive network drops.",
      "Requested Drive scopes incrementally only when users open the file hub, backed by UID-scoped Firestore rules.",
    ],
    github: "https://github.com/TitoAdhitya06/SpaceBridge",
    accessLabel: "Open-source on GitHub",
    isDualPortrait: true,
    screens: [
      {
        src: "/images/SpaceBridge-2.jpeg",
        label: "Cloud Notes · Light",
        caption: "Synced note and checklist feed displaying Cloud Firestore and Drive connection status.",
        width: 610,
        height: 1286,
        orientation: "portrait",
        theme: "light",
      },
      {
        src: "/images/SpaceBridge-6.jpeg",
        label: "Drive Hub · Light",
        caption: "In-app /SpaceBridge Google Drive browser with category chips and upload trigger.",
        width: 610,
        height: 1284,
        orientation: "portrait",
        theme: "light",
      },
      {
        src: "/images/SpaceBridge-5.jpeg",
        label: "Checklist Editor · Dark",
        caption: "Dark mode checklist editor tracking completion percentage alongside quick Drive attachments.",
        width: 610,
        height: 1282,
        orientation: "portrait",
        theme: "dark",
      },
      {
        src: "/images/SpaceBridge-7.jpeg",
        label: "Drive Hub · Dark",
        caption: "Material 3 dark theme Drive catalog filtering documents, images, and spreadsheets.",
        width: 763,
        height: 1600,
        orientation: "portrait",
        theme: "dark",
      },
    ],
  },
];

export const craftTracks: CraftTrack[] = [
  {
    id: "split",
    label: "Side-by-Side",
    eyebrow: "DUAL-PLATFORM ARCHITECTURE",
    heading: "One engineering standard across browser tabs and Android threads.",
    summary:
      "Building both web front-ends and native Kotlin apps sharpens how I design state boundaries, network resilience, and visual hierarchy.",
    pillars: [
      {
        title: "Reactive Web Interfaces",
        detail:
          "Composable Vue 3 and Nuxt modules backed by typed contracts, Inertia.js server routing, and real-time WebSocket channels.",
        stack: ["Vue.js", "Nuxt", "TypeScript", "Inertia.js", "Tailwind CSS"],
      },
      {
        title: "Native Android Runtimes",
        detail:
          "Declarative Jetpack Compose UI with Material 3 theming, Cloud Firestore offline persistence, and WorkManager background jobs.",
        stack: ["Kotlin", "Jetpack Compose", "Material 3", "WorkManager", "Firestore"],
      },
    ],
  },
  {
    id: "web",
    label: "Web Systems",
    eyebrow: "FRONTEND & REAL-TIME WEB",
    heading: "Structured CRUD tables, Chart.js telemetry, and LAN WebSockets.",
    summary:
      "From back-office ordering tables at PT. Daya Gagas Internasional to Dockerized Bun + Redis rooms in ClipSync, every web UI prioritizes fast scanning and clean state.",
    pillars: [
      {
        title: "Component & CRUD Discipline",
        detail:
          "Reusable table, filter, and modal primitives engineered so multi-module dashboards share predictable keyboard and layout behavior.",
        stack: ["Vue.js", "Laravel", "MySQL", "Chart.js", "REST API"],
      },
      {
        title: "Local Network Sync",
        detail:
          "Low-friction room pairing via QR codes and Redis pub/sub streams delivering text snippets and 50 MB binary transfers across Wi-Fi.",
        stack: ["Nuxt", "Bun", "Redis", "WebSocket", "Docker"],
      },
    ],
  },
  {
    id: "android",
    label: "Native Android",
    eyebrow: "KOTLIN & JETPACK COMPOSE",
    heading: "Offline persistence paired with resumable background transfers.",
    summary:
      "SpaceBridge proves native Android strength: multi-profile Second Space synchronization, incremental OAuth Drive permissions, and chunked WorkManager uploads.",
    pillars: [
      {
        title: "Clean Architecture & State",
        detail:
          "Clear separation between Compose UI layers, ViewModel state holders, Firestore repositories, and Google Drive REST v3 services.",
        stack: ["Kotlin", "Jetpack Compose", "MVVM", "Clean Architecture"],
      },
      {
        title: "Resilient Drive Sync",
        detail:
          "Buffered chunked streaming through AndroidX WorkManager tracks transfer progress and resumes cleanly after connectivity drops.",
        stack: ["Google Drive API", "WorkManager", "Cloud Firestore", "Material 3"],
      },
    ],
  },
];

export const experience = {
  company: "PT. Daya Gagas Internasional",
  role: "Front-End Developer (Intern)",
  period: "March – July 2025",
  duration: "4 months",
  product: "DapurGo Web Platform",
  highlights: [
    "Built responsive operational pages for the DapurGo web app using Vue.js and JavaScript directly from Figma prototypes.",
    "Implemented CRUD workflows for Product, Dish, Customer, and Supplier modules integrated with RESTful APIs.",
    "Developed reusable Vue components to keep layout spacing, table behavior, and form validation consistent across dashboard screens.",
    "Collaborated across engineering and product sprints using GitLab, ClickUp, and regular design syncs.",
  ],
  stack: ["Vue.js", "JavaScript", "Tailwind CSS", "REST API", "GitLab", "ClickUp"],
};

export const capabilityGroups: CapabilityGroup[] = [
  {
    index: "01",
    title: "Web Frontend",
    description: "Component architecture, responsive grid systems, and accessible markup.",
    items: ["HTML / CSS", "JavaScript", "TypeScript", "Vue.js", "Nuxt", "Tailwind CSS", "Inertia.js"],
  },
  {
    index: "02",
    title: "Native Android",
    description: "Declarative Compose UI, offline-first sync, and background execution.",
    items: ["Kotlin", "Jetpack Compose", "Material 3", "AndroidX WorkManager", "Cloud Firestore", "Clean Architecture"],
  },
  {
    index: "03",
    title: "Backend & Data",
    description: "Server-rendered SPAs, relational schemas, pub/sub messaging, and Drive APIs.",
    items: ["Laravel", "MySQL", "Redis", "REST API", "WebSocket", "Google Drive API"],
  },
  {
    index: "04",
    title: "Tooling & Workflow",
    description: "Containerized local runtimes, version control, and cross-functional delivery.",
    items: ["Bun", "Docker", "Git & GitLab", "Chart.js", "Figma", "ClickUp", "Unit Testing"],
  },
];

export const collaborationMeta = {
  workingStyle: ["Analytical thinking", "Problem solving", "Team collaboration", "Adaptability"],
  languages: "Indonesian (native), English (intermediate)",
};
