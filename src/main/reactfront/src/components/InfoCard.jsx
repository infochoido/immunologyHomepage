export default function InfoCards() {
  const cards = [
    {
      title: "교수님 소개",
      subtitle: "Professor Introduction",
      color: "bg-cardBlue1",
      image: "../assets/lab.jpg",
      link: "/professor",
    },
    {
      title: "실험실 소개",
      subtitle: "Lab Introduction",
      color: "bg-cardBlue2",
      image: "../assets/clinical.jpg",
      link: "/introduction",
    },
    {
      title: "주요 실적",
      subtitle: "Achievements",
      color: "bg-cardBlue3",
      image: "../assets/company.jpg",
      link: "/achievements",
    },
  ];

  return (
    <div className="flex gap-[5%] pb-[60px] sm:pb-[100px] flex-col custom-mb:flex-row custom-mb:justify-center items-center">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} relative custom-mb:w-[316.92px] custom-mb:h-[400px] w-[90%] h-28 sm:h-32 text-white text-center shadow-lg group overflow-hidden`}
        >
          {/* 배경 이미지와 투명도 */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${card.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.3,
            }}
          ></div>

          {/* 오버레이 효과 */}
          <div className="absolute inset-0 opacity-30 group-hover:bg-black group-hover:opacity-30 transition"></div>

          {/* 텍스트 영역 */}
          <div className="relative z-10 flex custom-mb:flex-col flex-row justify-center items-center h-full">
            <h2 className="text-lg sm:text-2xl font-bold m-1">{card.title}</h2>
            <p className="text-xs sm:text-sm m-1">{card.subtitle}</p>
            <a
              href={card.link}
              className="border border-white sm:border-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-white hover:text-black transition m-1 sm:m-2"
            >
              MORE VIEW
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
