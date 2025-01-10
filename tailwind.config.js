/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main": "#44d62c",
        "submain": "#555555",
        "dark": "#222222"
      }
    },
  },
  plugins: [],
}

