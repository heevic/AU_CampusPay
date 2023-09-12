/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{/js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xmd': '991px',
      },
      colors: {
        'blue-custom': '#1A6FB3',
      },
    },
  },
  plugins: [],
}