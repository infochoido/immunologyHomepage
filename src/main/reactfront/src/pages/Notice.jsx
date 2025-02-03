import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { getBoardByCategory } from "../apis";

export default function Notice() {
  const [data, setData] = useState([]); // 데이터 초기 상태를 null로 설정

  const ITEMS_PER_PAGE = 10;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoardByCategory("Notice");
        

        if (response) { 
          const formattedData = response.categoryList.map((item) => ({
            board_number: item.boardNumber,
            title: item.title,
            viewCount: item.viewCount,
            writeDatetime: item.writeDatetime,
          }));
          setData(formattedData); // 데이터 업데이트
        }

      } catch (error) {
      }
    };
    fetchData();
  }, []); // 빈 배열로 의존성 배열을 설정하여 한 번만 실행되게 설정

  // 더보기 버튼 클릭 시 표시 데이터를 증가시킴
  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div>
      <PageTitle />
      <div className="mx-16">
        <table className="mt-8 table table-lg text-center">
          <thead>
            <tr>
              <th className="px-2 text-left text-xl text-black">제목</th>
              <th className="px-2 text-right text-xl w-16 text-black">작성 시간</th>
              <th className="px-2 text-right text-xl w-2 text-black">조회수</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.slice(0, visibleItems).map((item, index) => (
                <tr key={index}>
                  <td className="px-2 text-left hover:bg-gray-100">
                    <Link
                      className="cursor-pointer hover:underline"
                      to={`/boardDetail?board_number=${item.board_number}`}
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-2 text-right w-16">{item.writeDatetime}</td>
                  <td className="px-2 text-right w-2">{item.viewCount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {data.length > visibleItems && (
          <div className="text-center my-4">
            <button
              className="mt-4 mb-16 btn bg-white text-black border border-gray-500 hover:bg-gray-100 rounded-lg"
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
