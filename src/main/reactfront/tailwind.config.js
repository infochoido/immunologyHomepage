/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#023793', // 원하는 색상
        cardBlue1: "#001364", // 가장 진한 파랑
        cardBlue2: "#00338E", // 중간 파랑
        cardBlue3: "#8690FB", // 약한 파랑랑
        backgroundGreen: "#F1F8E9", // 파스텔 민트/연두색 (배경색)
        customGray:'#464555',
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'ui-sans-serif', 'system-ui'],
      },
      screens: {
        'custom-mb': '1000px',
        'custom-lg': '1300px',
      },// 모바일 환경에서 css 이걸로 쓰십쇼
      fontSize: {
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      spacing: {
        // 여기서 기본 간격 설정을 확인
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
