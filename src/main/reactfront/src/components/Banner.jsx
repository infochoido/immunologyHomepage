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
    <Swiper
      className="w-full h-[600px] mx-auto relative z-0" // Tailwind 스타일 적용
      navigation={true} // 네비게이션 활성화
      pagination={{ clickable: true }} // 페이지네이션 활성화
      autoplay={{ delay: 2000, disableOnInteraction: false }} // 자동 재생 설정
      modules={[Navigation, Pagination, Autoplay]} // 필요한 모듈 추가
    >
      <SwiperSlide>
        <img src="assets/banner1.png" alt="banner1" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="assets/banner2.png" alt="banner2" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="assets/banner3.png" alt="banner3" className="w-full h-full object-cover" />
      </SwiperSlide>
    </Swiper>
  );
}
