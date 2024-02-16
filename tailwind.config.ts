import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          light: "#caf0f8",
          secondary: "#ade8f4",
          primary: "#03045e",
          tertiary: "#023e8a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
