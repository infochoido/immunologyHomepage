import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function Banner() {
  return (
    <div className="relative w-full h-[800px]">
      {/* 고정된 텍스트 영역 */}
      <div className="absolute inset-x-0 top-[20%] flex flex-col z-10 text-white text-center">
        <h1 className="text-6xl font-bold tracking-wide mt-[10px]">Immunology Laboratory</h1>
        <p className="text-3xl mt-[10px]">JBNU VET MEDICINE</p>
      </div>

      {/* 배너 슬라이더 */}
      <Swiper
        className="w-full h-full"
        navigation={true} // 네비게이션 활성화
        pagination={{ clickable: true }} // 페이지네이션 활성화
        autoplay={{ delay: 2000, disableOnInteraction: false }} // 자동 재생 설정
        modules={[Navigation, Pagination, Autoplay]} // 필요한 모듈 추가
      >
        <SwiperSlide>
          <img src="assets/piglet.jpg" alt="piglet" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/virus.jpg" alt="virus" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/surgery.jpg" alt="banner1" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/immunology.jpg" alt="banner2" className="w-full h-full object-cover" />
        </SwiperSlide>
        {/* <SwiperSlide>
          <img src="assets/new_banner3.jpg" alt="banner3" className="w-full h-full object-cover" />
        </SwiperSlide> */}
        
      </Swiper>
    </div>
  );
}
