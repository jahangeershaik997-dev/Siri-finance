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
          blue: "#1565C0",
          green: "#2E7D32",
          orange: "#FF6F00",
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
        "gradient-hero": "linear-gradient(135deg, #E53935, #FF6F00)",
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
