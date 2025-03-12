/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /^bg-/,
      variants: ["hover"],
    },
    {
      pattern: /^text-/,
      variants: ["hover"],
    },
    {
      pattern: /^border-/,
      variants: ["hover"],
    },
    "backdrop-blur",
    "backdrop-blur-lg",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-vazirmatn)"],
      },
      colors: {
        primary: {
          DEFAULT: "#00224D",
          light: "#003171",
          dark: "#001838",
        },
        secondary: {
          DEFAULT: "#5D0E41",
          light: "#7A1254",
          dark: "#400A2D",
        },
        accent: {
          DEFAULT: "#A0153E",
          light: "#CC1B4E",
          dark: "#800F31",
        },
        highlight: {
          DEFAULT: "#FF204E",
          light: "#FF4D71",
          dark: "#CC193E",
        },
        success: {
          DEFAULT: "#1F7D53",
          light: "#25A76E",
          dark: "#186642",
        },
      },
      opacity: {
        5: "0.05",
        10: "0.1",
        20: "0.2",
        30: "0.3",
        70: "0.7",
      },
    },
  },
  plugins: [],
};
