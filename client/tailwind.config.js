/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#496464",

          "secondary": "#f3b393",

          "accent": "#080517",

          "neutral": "#25796f",

          "base-100": "#4f5454",

          "info": "#83fdf2",

          "success": "#000000",

          "warning": "#b45309",

          "error": "#7f1d1d",
        },
      },
    ],
  },
}