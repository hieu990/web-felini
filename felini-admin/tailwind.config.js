/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "wine-dark": "#2d0a0a",
        "wine-main": "#4a0e0e",
        "gold-accent": "#d4af37",
      },
    },
  },
  plugins: [],
};
