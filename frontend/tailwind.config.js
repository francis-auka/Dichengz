/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00', // Orange
          dark: '#CC5500',
          light: '#FF8533'
        },
        secondary: {
          DEFAULT: '#000000', // Black
          light: '#1A1A1A',
          lighter: '#333333'
        }
      }
    },
  },
  plugins: [],
}
