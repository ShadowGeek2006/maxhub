/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#D62828',
          dark: '#1B1B1B',
          cream: '#FFF8F0',
          gold: '#F4A300',
        },
      },
    },
  },
  plugins: [],
}
