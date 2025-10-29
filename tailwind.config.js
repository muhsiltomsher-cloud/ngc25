/* eslint-disable @typescript-eslint/no-require-imports */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#A83363',
          DEFAULT: '#762240',
          dark: '#561A30',
        },
        secondary: {
          light: '#425260',
          DEFAULT: '#2B3743',
        },
        neutral: {
          lightest: '#F5F2EF',
          light: '#E6DFD5',
          DEFAULT: '#BDA98E',
          dark: '#7A6B59',
        },
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', ...defaultTheme.fontFamily.sans],
        serif: ['"Bilderberg"', ...defaultTheme.fontFamily.serif], // Ensure the serif font is Bilderberg
        mono: [...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Add the plugin here
  ],
};
