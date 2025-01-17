export default function InfoCards() {
  const cards = [
    {
      title: "실험실 소개",
      subtitle: "Labatory Introduction",
      color: "bg-cardBlue", // 밝고 채도 높은 파란색 (예비 클래스)
      image: "../assets/cardimg.png",
      link: "#",
    },
    {
      title: "연구 과정",
      subtitle: "Research Curriculum",
      color: "bg-cardOrange", // 밝고 채도 높은 주황색 (예비 클래스)
      image: "../assets/cardimg.png",
      link: "#",
    },
    {
      title: "참여기업",
      subtitle: "Participating Companies",
      color: "bg-cardGreen", // 밝고 채도 높은 초록색 (예비 클래스)
      image: "../assets/cardimg.png",
      link: "#",
    },
  ];

  return (
    <div className="flex justify-center items-end gap-[73px] pb-[100px]">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} relative w-[316.92px] h-[400px] text-white text-center rounded-lg shadow-lg group overflow-hidden`}
          style={{
            backgroundImage: `url(${card.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0  opacity-30 rounded-lg group-hover:bg-black group-hover:opacity-30 transition"></div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
            <h2 className="text-2xl font-bold">{card.title}</h2>
            <p className="text-sm mt-2">{card.subtitle}</p>
            <a
              href={card.link}
              className="mt-6 border-2 border-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition"
            >
              MORE VIEW
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
