import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      colors: {
        ink: "#0c0d0f",
        fog: "#f3f4f6",
        ocean: "#0a6cff",
        ember: "#ff5d3a",
        moss: "#0f6b3f"
      },
      boxShadow: {
        glow: "0 0 30px rgba(10,108,255,0.25)"
      }
    }
  },
  plugins: []
} satisfies Config;
