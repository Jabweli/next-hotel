import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#038C7F",
        secondary: "#F2C641",
        tertiary: {
          dark: "#F27405",
          light: "#F2C641",
        },
        gray: "rgba(33, 37, 41, .09)",
      },
    },
  },
  plugins: [],
} satisfies Config;
