import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { getBoardByCategory } from "../apis";

export default function Patent() {
  const [data, setData] = useState([]);
  const ITEMS_PER_PAGE = 10;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoardByCategory("Patent");
        if (response) { 
          const formattedData = response.categoryList.map((item) => ({
            board_number: item.boardNumber,
            title: item.title,
            viewCount: item.viewCount,
            writeDatetime: item.writeDateTime,
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      }
    };
    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="w-full">
      <PageTitle />
      <div className="px-1 custom-md:px-12">
        <table className="mt-8 table table-lg text-center min-w-full">
          <thead>
            <tr>
              <th className="px-2 text-left text-sm sm:text-xl text-black w-12">번호</th>
              <th className="px-2 text-left text-sm sm:text-xl text-black w-full">제목</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.slice(0, visibleItems).map((item, index) => (
                <tr key={index}>
                  <td className="px-2 text-left">{data.length - index}</td>
                  <td className="px-2 text-left hover:bg-gray-100">
                    <Link
                      className="cursor-pointer hover:underline text-base sm:text-base"
                      to={`/boardDetail?board_number=${item.board_number}`}
                      state={{ writeDatetime: item.writeDatetime }}
                    >
                      {item.title}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-base sm:text-base">
                  게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {data.length > visibleItems && (
          <div className="text-center my-4">
            <button
              className="mt-4 mb-16 btn bg-white text-black border border-gray-500 hover:bg-gray-100 rounded-lg text-base sm:text-base px-3 py-2"
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
