/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        dark: "#363853",
        primary: "#0012FF",
        green: "#67D4CA",
        red: "#ed4040",
        "dark-light": "#f8fafb",
      },
      zIndex: {
        2: "2",
      },
    },
  },
  plugins: [],
};
