import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-background': "url('/nen_web.jpg')",
      },
      colors: {
        'gradient-bg-start': '#ffd500',
        'gradient-bg-end': '#ff4300',
        'gradient-br-start': '#867001',
        'gradient-br-end': '#942500',
      },
    },
  },
  plugins: [],
};
export default config;
