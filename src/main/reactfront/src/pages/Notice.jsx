import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { getBoardByCategory } from "../apis";

export default function Notice() {
  const [data, setData] = useState([]);
  const ITEMS_PER_PAGE = 12;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  // HTML 문자열에서 첫 번째 이미지 URL을 추출하는 함수
  const extractFirstImageUrl = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const firstImg = doc.querySelector('img');
    return firstImg ? firstImg.src : null; // null 반환으로 변경
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoardByCategory("Notice");
        if (response) {
          const formattedData = response.categoryList.map((item) => ({
            board_number: item.boardNumber,
            title: item.title,
            content: item.content,
            writeDatetime: item.writeDateTime,
            image: extractFirstImageUrl(item.content)
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, []);

  // HTML 태그를 제거하고 순수 텍스트만 추출하는 함수
  const stripHtmlTags = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="w-full">
      <PageTitle />
      <div className="px-1  custom-md:px-12 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data && data.length > 0 ? (
            data.slice(0, visibleItems).map((item, index) => (
              <Link
                key={index}
                to={`/boardDetail?board_number=${item.board_number}`}
                state={{ writeDatetime: item.writeDatetime }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-[400px]"
              >
                <div className="h-[200px] overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-lg">이미지 없음</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {item.writeDatetime}
                  </p>
                  <p className="text-gray-600 line-clamp-2 flex-1">
                    {stripHtmlTags(item.content)}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              게시글이 없습니다.
            </div>
          )}
        </div>
        {data.length > visibleItems && (
          <div className="text-center mt-8">
            <button
              className="btn bg-white text-black border border-gray-500 hover:bg-gray-100 rounded-lg px-6 py-2"
              onClick={handleLoadMore}
            >
              더 보기 ({visibleItems}/{data.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
