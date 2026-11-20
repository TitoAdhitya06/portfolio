/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        paper: "var(--bg)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        hairline: "var(--border)",
        ink: "var(--text-primary)",
        "ink-secondary": "var(--text-secondary)",
        "ink-tertiary": "var(--text-tertiary)",
        "dark-ink": "var(--bg-dark)",
        "dark-surface": "var(--surface-dark)",
        "dark-border": "var(--border-dark)",
        "on-dark": "var(--text-on-dark)",
        "on-dark-muted": "var(--text-on-dark-muted)",
        vermilion: "var(--accent)",
        "vermilion-hover": "var(--accent-hover)",
        highlighter: "var(--highlight)",
        mint: "var(--mint)",
        "signal-blue": "var(--signal-blue)",
        info: "var(--info)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
      borderRadius: {
        card: "12px",
        inner: "6px",
        dialog: "16px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.23, 1, 0.32, 1)",
        sheet: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
};
