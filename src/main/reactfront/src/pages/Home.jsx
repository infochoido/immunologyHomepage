import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import InfoCard from "../components/InfoCard";
import { getBoardByCategory } from "../apis";
import { Link } from "react-router-dom";

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
    <div className="relative">
      <Banner />
      <div className="-mt-[330px] relative z-10">
        <InfoCard />
        
        {/* Notice와 Research 섹션 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex flex-col custom-mb:flex-row gap-8">
            {/* Notice 섹션 */}
            <div className="w-full custom-mb:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">공지사항</h2>
                  <Link to="/notice" className="text-sm text-blue-600 hover:underline">더보기</Link>
                </div>
                <table className="w-full">
                  <tbody>
                    {noticeData.map((item, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="py-3">
                          <Link 
                            to={`/boardDetail?board_number=${item.board_number}`}
                            className="text-sm sm:text-base hover:text-blue-600 hover:underline"
                          >
                            {item.title}
                          </Link>
                        </td>
                        <td className="py-3 text-right text-xs sm:text-sm text-gray-500 w-24">
                          {item.writeDatetime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Research 섹션 */}
            <div className="w-full custom-mb:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">연구</h2>
                  <Link to="/research/research" className="text-sm text-blue-600 hover:underline">더보기</Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {researchData.map((item, index) => (
                    <Link 
                      key={index}
                      to={`/boardDetail?board_number=${item.board_number}`}
                      className="group"
                    >
                      <div className="aspect-w-16 aspect-h-9 mb-2">
                        <img 
                          src={item.image}
                          alt={item.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/default-research.jpg";
                          }}
                          className="w-full h-32 object-cover rounded-lg group-hover:opacity-80 transition"
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-blue-600 truncate">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  