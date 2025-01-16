/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#023793', // 원하는 색상
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cardBlue: "#B3E5FC", // 파스텔 하늘색
        cardOrange: "#FFE0B2", // 파스텔 주황색
        cardGreen: "#C8E6C9", // 파스텔 초록색
        backgroundGreen: "#F1F8E9", // 파스텔 민트/연두색 (배경색)
      },
    },
  },
  plugins: [],
};
