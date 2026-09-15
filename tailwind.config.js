/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#060606',
          900: '#0B0B0B',
          800: '#141414',
          700: '#1F1F1F',
          600: '#2A2A2A',
        },
        brand: {
          red: '#E6392F',
          orange: '#FF8A00',
          darkRed: '#B9231A',
          cream: '#FFF4E6',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
