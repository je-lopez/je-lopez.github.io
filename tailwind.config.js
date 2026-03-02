/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#2D1B36', // Deep, elegant purple
        'brand-gold': '#D4AF37',   // Classic metallic gold
        'brand-accent': '#F9F6F1', // Off-white/Cream for high contrast
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}