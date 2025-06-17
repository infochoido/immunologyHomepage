import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, MousePointerClick } from "lucide-react"; // 클릭 가능 아이콘

const websiteData = [
  { 
    title: "전북대학교", 
    subtitle: "JBNU Official Website", 
    link: "https://www.jbnu.ac.kr/web/index.do",
    bgImage: "/assets/homepage.png" // 배경 이미지 경로
  },
  { 
    title: "동물질병진단센터", 
    subtitle: "Veterinary Diagnostic Center", 
    link: "https://www.vetdxlab.com/index.userWeb",
    bgImage: "/assets/homepage.png"
  },
  { 
    title: "수의과대학", 
    subtitle: "JBNU College of Veterinary Medicine", 
    link: "https://vetmed.jbnu.ac.kr/vetmed/index.do",
    bgImage: "/assets/homepage.png"
  },
];

export default function HomepageSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Swiper 슬라이더 */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.2}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2.5 },
        }}
        className="px-4"
      >
        {websiteData.map((site, index) => (
          <SwiperSlide key={index}>
            {/* React에서는 Link 대신 a 태그 사용 */}
            <a href={site.link} target="_blank" rel="noopener noreferrer" className="block">
              <div 
                className="p-6 rounded-lg shadow-lg flex flex-col justify-center text-center relative cursor-pointer hover:shadow-xl transition"
                style={{
                  backgroundImage: `url(${site.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "12px", // 높이 조정 가능
                  borderRadius: "10px"
                }}
              >
                <span className="text-sm text-gray-100">{site.subtitle}</span>
                <h3 className="text-xl font-bold text-white">{site.title}</h3>

                {/* 클릭 가능 아이콘 */}
                <div className="absolute bottom-2 right-2 opacity-50 hover:opacity-100 transition">
                  <MousePointerClick className="w-5 h-5 text-white" />
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

{/* 왼쪽 화살표 버튼 */}
<button
  ref={prevRef}
  className="hidden custom-mb:flex absolute top-1/2 -left-12 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-300 hover:bg-gray-100 hover:scale-110 transition cursor-pointer z-50"
>
  <ChevronLeft className="text-gray-600 w-5 h-5" />
</button>

{/* 오른쪽 화살표 버튼 */}
<button
  ref={nextRef}
  className="hidden custom-mb:flex absolute top-1/2 -right-12 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-300 hover:bg-gray-100 hover:scale-110 transition cursor-pointer z-50"
>
  <ChevronRight className="text-gray-600 w-5 h-5" />
</button>

    </div>
  );
}
