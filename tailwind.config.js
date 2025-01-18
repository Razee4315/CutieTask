/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cutie-pink': '#FDE2E4',
        'cutie-mint': '#B9FBC0',
        'cutie-blue': '#A0C4FF',
        'cutie-peach': '#FFAFCC',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'patrick': ['"Patrick Hand"', 'cursive'],
      },
      animation: {
        'sparkle': 'sparkle 1.5s linear infinite',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        }
      }
    },
  },
  plugins: [],
}
