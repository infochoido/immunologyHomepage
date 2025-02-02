// import React, { useEffect, useState } from "react";
// import PageTitle from "../components/PageTitle";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function Notice() {
//   const [data, setData] = useState([]);
//   // 샘플 데이터를 준비합니다
//   const sampleData = Array.from({ length: 50 }, (_, i) => ({
//     id: i + 1,
//     title: `Title ${i + 1}`,
//     content: `Content ${i + 1}`,
//     datetime: `2025-01-24`,
//     category: `Category ${i % 5}`,
//     view_count: Math.floor(Math.random() * 100),
//     nickname: `User ${i + 1}`,
//   }));

//   const ITEMS_PER_PAGE = 10; // 한 번에 보여줄 데이터 개수
//   const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

//   useEffect(()=>{
    
//     axios.get("http://13.125.255.131:8080/api/v1/board/category?category=notice").then((res)=>{
//       console.log(res)
//       setData(res.data.categoryList);
//     })

//   },[])

//   // 더보기 버튼 클릭 시 표시 데이터를 증가시킴
//   const handleLoadMore = () => {
//     setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
//   };

//   return (
//     <div>
//       <PageTitle />
//       <div className="mx-16">
//         <table className="mt-8 table table-lg text-center">
//           <thead>
//             <tr>
//               <th className="px-2 text-left text-xl text-black">제목</th>
//               <th className="px-2 text-right text-xl w-16 text-black">작성 시간</th>
//               <th className="px-2 text-right text-xl w-2 text-black">조회수</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sampleData.slice(0, visibleItems).map((item, index) => (
//               <tr key={index}>
//                 <td className="px-2 text-left hover:bg-gray-100">
//                   <Link
//                     className="cursor-pointer hover:underline"
//                     to={{
//                       pathname: "/noticedetail",
//                       state: {
//                         title: item.title, // 각 item의 제목을 state로 전달
//                         content: item.content, // 추가 데이터 전달
//                         datetime: item.datetime,
//                         view_count: item.view_count,
//                         nickname: item.nickname,
//                       },
//                     }}
//                   >
//                     {item.title}
//                   </Link>
//                 </td>
//                 <td className="px-2 text-right w-16">{item.datetime}</td>
//                 <td className="px-2 text-right w-2">{item.view_count}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {visibleItems < sampleData.length && (
//           <div className="text-center my-4">
//             <button
//               className="mt-4 mb-16 btn bg-white text-black border border-gray-500 hover:bg-gray-100 rounded-lg"
//               onClick={handleLoadMore}
//             >
//               더 보기 ({visibleItems}/{sampleData.length})
//             </button>
//           </div>
//         )}
//       </div>
      
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Notice() {
  const [data, setData] = useState([]); // 서버에서 가져온 데이터를 저장
  const ITEMS_PER_PAGE = 10; // 한 번에 보여줄 데이터 개수
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE); // 현재 표시할 데이터 개수

  useEffect(() => {
    // 서버에서 데이터 가져오기
    axios
      .get("http://13.125.255.131:8080/api/v1/board/category?category=student")
      .then((res) => {
        // 응답 데이터에서 title, viewCount, writeDatetime만 추출
        const formattedData = res.data.categoryList.map((item) => ({
          board_number:item.boardNumber,
          title: item.title,
          viewCount: item.viewCount,
          writeDatetime: item.writeDatetime,
        }));
        setData(formattedData); // 추출한 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  }, []);

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
            {data.slice(0, visibleItems).map((item, index) => (
              <tr key={index}>
                <td className="px-2 text-left hover:bg-gray-100">
                <Link
                  className="cursor-pointer hover:underline"
                  to={{
                    pathname: "/boardDetail",
                    search: `?board_number=${item.board_number}`, // 쿼리 문자열 추가
                    state: {
                      title: item.title,
                      datetime: item.writeDatetime,
                      view_count: item.viewCount,
                    },
                  }}
                >
                  {item.title}
                </Link>
                </td>
                <td className="px-2 text-right w-16">{item.writeDatetime}</td>
                <td className="px-2 text-right w-2">{item.viewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleItems < data.length && (
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
