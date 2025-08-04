/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  future: {
  },
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        brush: ['"Zen Antique Soft"', 'serif'],
      },
      backgroundImage: {
        'mahjong-corner': "url('/images/bg-corner.jpg')",
      },

      colors: {
        brandGreen: '#046C38',
        brandGold : '#D4AF37',
        brandRed  : '#C53030',
      },
    },
  },
  variants: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "aqua", "pastel"],
  },
}





