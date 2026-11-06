/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'], // body and UI
        heading: ['Playfair Display', 'serif'],   // for h1 welcome text
        sectionTitle: ['Anton', 'sans-serif'],    // for h2 and bold sections
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #ff0000, 0 0 10px #ff0000', color: '#ff0000' },
          '25%': { textShadow: '0 0 5px #00ff00, 0 0 10px #00ff00', color: '#00ff00' },
          '50%': { textShadow: '0 0 5px #0000ff, 0 0 10px #0000ff', color: '#0000ff' },
          '75%': { textShadow: '0 0 5px #ffff00, 0 0 10px #ffff00', color: '#ffff00' },
          '100%': { textShadow: '0 0 5px #ff00ff, 0 0 10px #ff00ff', color: '#ff00ff' },
        },
      },
      animation: {
        glow: 'glow 3s infinite alternate',
      },
    },
  },
  plugins: [],
};
