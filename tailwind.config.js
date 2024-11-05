/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
      "./src/js/**/*.jsx",
    "./src/*.{html, js}",
    "./src/js/*.js",
    "./src/pages/*.{html, js}",
  ],
  theme: {

    listStyleType: {
      square: 'square',
    },

    screens: {
      '3xl': '1742px',
      'desk': '1650px',
      'book': '1370px',
      ...defaultTheme.screens
    },


    extend: {},

    fontFamily: {
      'Grtsk': ['Grtsk'],
      'Armata': ['Armata']
    }
  },
  plugins: [],
}

