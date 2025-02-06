import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { getBoardByCategory } from "../apis";

export default function ReferredJournal() {
  const [data, setData] = useState([]);
  const ITEMS_PER_PAGE = 10;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoardByCategory("ReferredJournal");
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
      <div className="px-4">
        <table className="mt-8 table table-lg text-center min-w-full">
          <thead>
            <tr>
              <th className="px-2 text-left text-sm sm:text-xl text-black">제목</th>
              <th className="px-2 text-right text-sm sm:text-xl text-black">작성 시간</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.slice(0, visibleItems).map((item, index) => (
                <tr key={index}>
                  <td className="px-2 text-left hover:bg-gray-100">
                    <Link
                      className="cursor-pointer hover:underline text-xs sm:text-base"
                      to={`/boardDetail?board_number=${item.board_number}`}
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-2 text-right text-xs sm:text-base">{item.writeDatetime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-sm sm:text-base">
                  게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {data.length > visibleItems && (
          <div className="text-center my-4">
            <button
              className="mt-4 mb-16 btn bg-white text-black border border-gray-500 hover:bg-gray-100 rounded-lg text-xs sm:text-base px-3 py-2"
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
