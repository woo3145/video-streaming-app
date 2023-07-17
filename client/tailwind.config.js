/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': { min: '1920px' },
        '4xl': { min: '2560px' },
      },
      maxWidth: {
        fhd: '1920px',
        qhd: '2560px',
      },
    },
  },
  plugins: [],
};
