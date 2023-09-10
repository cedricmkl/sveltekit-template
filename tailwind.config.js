const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#BE93FD',
          200: '#845EC2',
        },
        secondary: {
          100: "#00C9A7",
          200: "#008F7A",
        },
        danger: {
          100: '#FF8066',
          200: '#C34A36',
        },
        background:{
          dark: colors["neutral"][800],
          light: colors["neutral"][100],
        }
      }
    },
  },
  plugins: [],
}

