/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "base-black": "#0A0A0B",
      },
      colors: {
        "base-black": "#0A0A0B",
        "base-white": "#FAFAFA",
        "neutral-400": "#9F9C9C",
        "neutral-900": "#2B2829",
      },
      spacing: {
        base: "16px",
        xxs: "2px",
        xs: "4px",
        s: "6px",
        sm: "10px",
        m: "14px",
        ml: "20px",
        l: "28px",
        xl: "40px",
      },
    },
  },
  plugins: [],
};
