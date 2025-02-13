import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import InfoCard from "../components/InfoCard";
import { getBoardByCategory } from "../apis";
import { Link } from "react-router-dom";
import HomepageSlider from "../components/HomepageSlider"

export default function Home() {
  const [noticeData, setNoticeData] = useState([]);
  const [researchData, setResearchData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Notice 데이터 가져오기
        const noticeResponse = await getBoardByCategory("Notice");
        if (noticeResponse) {
          const formattedNoticeData = noticeResponse.categoryList
            .slice(0, 5)
            .map((item) => ({
              board_number: item.boardNumber,
              title: item.title,
              writeDatetime: item.writeDateTime ? item.writeDateTime.split('T')[0] : '-'
            }));
          setNoticeData(formattedNoticeData);
        }

        // Research 데이터 가져오기
        const researchResponse = await getBoardByCategory("Research");
        if (researchResponse) {
          const formattedResearchData = researchResponse.categoryList
            .slice(0, 4)
            .map((item) => {
              // content에서 첫 번째 이미지 URL 추출
              const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
              const imageUrl = imgMatch ? imgMatch[1] : null;

              return {
                board_number: item.boardNumber,
                title: item.title,
                image: imageUrl || "/assets/default-research.jpg",
              };
            });
          setResearchData(formattedResearchData);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="relative">
        <Banner />
        <div className = "-mt-[330px] relative z-10">
          <InfoCard />
        </div>
      </div>

      <div className = "mt-[120px] mb-[40px] relative z-10">
          <HomepageSlider />
      </div>

    </div>
  );
}
  