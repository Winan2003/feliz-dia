/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'firework': 'firework 1s ease-out forwards',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          firework: {
            '0%': { transform: 'scale(0)', opacity: '1' },
            '100%': { transform: 'scale(1)', opacity: '0' },
          }
        }
      },
    },
    plugins: [],
  }