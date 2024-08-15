/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : "#01d4b9",
        secondary : "#ef863e"
      },
    },
  },
  plugins: [],
}

