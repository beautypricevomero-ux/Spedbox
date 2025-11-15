/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        sbBackground: "#FFF4F7",
        sbSoftPink: "#FFD9DE",
        sbRoseQuartz: "#F4CCD4",
        sbPrimaryRed: "#E63946",
        sbCard: "#FFFFFF",
        sbSoftGrey: "#F0F0F0",
        sbRichBlack: "#141414"
      },
      boxShadow: {
        card: "0 8px 18px rgba(0,0,0,0.08)",
        float: "0 4px 10px rgba(0,0,0,0.18)",
        primary: "0 8px 14px rgba(230,57,70,0.35)"
      }
    }
  },
  plugins: []
};
