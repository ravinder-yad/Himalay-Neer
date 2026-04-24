/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60a5fa', // blue-400
          DEFAULT: '#1e3a8a', // blue-900
          dark: '#172554', // blue-950
        },
      },
    },
  },
  plugins: [],
}
