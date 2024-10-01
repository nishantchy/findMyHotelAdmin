/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#32986A",
        text: "#9999",
      },
      fontSize: {
        title: "62px",
        subtitle: "32px",
        header: "42px",
        "p-head": "18px",
        paragraph: "14px",
        small: "12px",
        "diff-para": "14px",
      },
      fontFamily: {
        figmaHand: ["FigmaHand", "sans-serif"],
        normal: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
