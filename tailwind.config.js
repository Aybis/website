/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'right-to-left': 'right-to-left 4s linear infinite',
        'left-to-right': 'left-to-right 4s linear infinite',
        scroll: 'scroll 10s linear infinite',
        move: 'move 10s linear infinite',
      },
      keyframes: {
        'right-to-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'left-to-right': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(calc(var(200px) * var(5)* -1))' },
        },
        move: {
          from: { transform: 'translate(0, 0)' },
          to: { transform: 'translateX(-50%, 0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
