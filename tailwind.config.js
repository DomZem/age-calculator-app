/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryBlack: 'var(--primaryBlack)',
        primaryPurple: 'var(--primaryPurple)',
        primaryWhite: 'var(--primaryWhite)',
        primaryLightGrey: 'var(--primaryLightGrey)',
        primaryGrey: 'var(--primaryGrey)',
        primaryLine: 'var(--primaryLine)',
        primaryRed: 'var(--primaryRed)',
      },
    },
  },
  plugins: [],
};
