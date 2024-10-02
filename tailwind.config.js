/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#D68F08',
        secondary: "#374151",
        "light-gray": "#C6C6C6",
      },
      screens: {
        xlg: "992px",
        xsm: "575px",
      },
      boxShadow: {
        xl: "0px 3px 10px 0px #ddd",
        '1xl': "0 2px 4px rgba(15,34,58,.12)"
      },
    },
  },
  plugins: [],
}

