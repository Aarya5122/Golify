/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      inset: {
        '300px': '300px',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
