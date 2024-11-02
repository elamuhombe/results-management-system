/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lavenderTint: '#F5F3FA',
        boxShadow: {
          'custom': '0 4px 10px rgba(106, 13, 173, 0.2)',
    },
  },
  plugins: [],
  },
},
}
