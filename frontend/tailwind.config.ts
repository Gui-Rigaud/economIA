import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        econDarkGreen: "#1F2421",
        econBlue: "#216869",
        econGreen: "#49A078",
        econLightGreen: "#9CC5A1",
        backgroundLightGray: "#F5F5F5",
      },
    },
  },
  plugins: [],
} satisfies Config;
