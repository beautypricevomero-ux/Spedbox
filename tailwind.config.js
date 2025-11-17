/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sbPinkLight: "#FFEFF4",
        sbPink: "#FFC9D9",
        sbPinkDeep: "#FF9BB8",
        sbRed: "#FF4B6E",
        sbTextDark: "#222222",
        sbCard: "#FFFFFF",
        sbGrey: "#F5F5F7",
      },
      boxShadow: {
        card: "0 20px 40px rgba(255,75,110,0.25)",
      },
    },
  },
  plugins: [],
};
