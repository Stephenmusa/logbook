/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{html,js,ejs}'],
  theme: {
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin')],
}
