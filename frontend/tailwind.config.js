/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  future: {
  },
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "aqua", "pastel"],
  },
}

