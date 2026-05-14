import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3563E9",
        "primary-dark": "#54A6FF",
        canvas: "#F6F7F9",
        ink: {
          900: "#1A202C",
          700: "#1A2C3D",
          500: "#596780",
          300: "#90A3BF",
          100: "#C3D4E9",
        },
        like: "#ED3F3F",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 30px rgba(53, 99, 233, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
