export default function AboutUs() {
    return (
      <div className="relative bg-blue-500 py-48">
        {/* 배경 이미지 및 요소 */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 border-4 border-dashed border-white rounded-full"></div>
        </div>
  
        {/* 텍스트 내용 */}
        <div className="relative z-10 text-center text-white">
          <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">
            About Us
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold">
            전북대학교 수의과대학 면역학 실험실입니다.
          </h2>
        </div>
      </div>
    );
  }
  