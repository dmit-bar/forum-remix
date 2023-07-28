import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundSize: {
      // auto: "auto",
      // cover: "cover",
      // contain: "contain",
      "150%": "150%",
      "200%": "200%",
    },
  },
  plugins: [],
} satisfies Config;
