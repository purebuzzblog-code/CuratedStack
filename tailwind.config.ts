import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f5ff",
          100: "#dce6ff",
          200: "#b8ccff",
          300: "#8aa9ff",
          400: "#5c7fff",
          500: "#3654f5",
          600: "#2740d1",
          700: "#1f32a8",
          800: "#1c2c85",
          900: "#1a276b",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
