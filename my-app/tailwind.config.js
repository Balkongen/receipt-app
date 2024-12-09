/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customPalette: {
          50: "#f5f7ff",
          100: "#ebefff",
          200: "#c2c9ff",
          300: "#99a3ff",
          400: "#4d56ff",
          500: "#001aff",
          600: "#0017e6",
          700: "#0011bf",
          800: "#000c99",
          900: "#00087d",
        },
      },
    },
  },
  plugins: [],
};
