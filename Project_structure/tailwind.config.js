// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Specify where Tailwind should look for class names
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E40AF', // Custom color example
        'secondary': '#64748B', // Another custom color example
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom font family example
      },
    },
  },
  plugins: [],
};
