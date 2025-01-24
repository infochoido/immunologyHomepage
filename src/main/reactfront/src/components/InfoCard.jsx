export default function InfoCards() {
  const cards = [
    {
      title: "실험실 소개",
      subtitle: "Labatory Introduction",
      color: "bg-cardBlue1",
      image: "../assets/lab.jpg",
      link: "#",
    },
    {
      title: "연구 과정",
      subtitle: "Research Curriculum",
      color: "bg-cardBlue2",
      image: "../assets/clinical.jpg",
      link: "#",
    },
    {
      title: "참여기업",
      subtitle: "Participating Companies",
      color: "bg-cardBlue3",
      image: "../assets/company.jpg",
      link: "#",
    },
  ];

  return (
    <div className="flex gap-[5%] pb-[100px] flex-col custom-mb:flex-row custom-mb:justify-center items-center">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} relative custom-mb:w-[316.92px] custom-mb:h-[400px] w-[90%] h-32 text-white text-center shadow-lg group overflow-hidden`}
        >
          {/* 배경 이미지와 투명도 */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${card.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.3, // 모든 카드에 동일한 투명도 적용
            }}
          ></div>

          {/* 오버레이 효과 */}
          <div className="absolute inset-0 opacity-30 group-hover:bg-black group-hover:opacity-30 transition"></div>

          {/* 텍스트 영역 */}
          <div className="relative z-10 flex custom-mb:flex-col flex-row justify-center items-center h-full">
            <h2 className="text-2xl font-bold m-1">{card.title}</h2>
            <p className="text-sm m-1">{card.subtitle}</p>
            <a
              href={card.link}
              className="border-2 m-2 border-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition"
            >
              MORE VIEW
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
