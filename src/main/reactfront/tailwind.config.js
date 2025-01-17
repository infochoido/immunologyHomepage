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
        cardBlue: "#7A91C4", // 파스텔 하늘색
        cardOrange: "#FFAA34", // 파스텔 주황색
        cardGreen: "#74D261", // 파스텔 초록색
        backgroundGreen: "#F1F8E9", // 파스텔 민트/연두색 (배경색)
      },
    },
  },
  plugins: [],
};
