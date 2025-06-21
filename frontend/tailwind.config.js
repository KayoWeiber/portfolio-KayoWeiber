/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          DEFAULT: '#0A2342', // Azul escuro principal
          light: '#274472',   // Azul intermediário
          dark: '#050A1E',    // Preto quase absoluto
        },
        accent: {
          DEFAULT: '#1e90ff', // Azul vibrante para destaques
        },
      },
    },
  },
  plugins: [],
}
