import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: "#E53935",
          blue: "#1a56db",
          "blue-deep": "#1a56db",
          green: "#2E7D32",
          orange: "#f97316",
        },
        wizzfly: {
          blue: "#1a56db",
          orange: "#f97316",
          navy: "#0f172a",
          dark: "#0D1B3E",
          "text-primary": "#1A1A1A",
          "text-secondary": "#555555",
          "bg-light": "#F8F9FA",
        },
        sfs: {
          dark: "#0D1B3E",
          "text-primary": "#1A1A1A",
          "text-secondary": "#555555",
          "bg-light": "#F8F9FA",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #1a56db, #0f172a)",
        "gradient-hero-wizzfly": "linear-gradient(135deg, #1a56db 0%, #0f172a 100%)",
        "gradient-trust": "linear-gradient(135deg, #1565C0, #2E7D32)",
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        soft: "0 4px 14px 0 rgba(0, 0, 0, 0.08)",
        "soft-lg": "0 10px 40px -10px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
