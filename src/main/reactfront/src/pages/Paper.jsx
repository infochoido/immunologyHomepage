import React, { useEffect, useState } from "react";
import { getBoardByCategory, deleteBoardRequest } from "../apis";
import { useCookies } from "react-cookie";

export default function Paper() {
  const [papersByYear, setPapersByYear] = useState({});
  const [cookies] = useCookies(['accessToken']);

  const handleDelete = async (boardNumber) => {
    if (window.confirm('이 논문을 삭제하시겠습니까?')) {
      try {
        const response = await deleteBoardRequest(boardNumber, cookies.accessToken);
        if (response && response.code === 'SU') {
          alert('삭제되었습니다.');
          // 페이지 새로고침
          window.location.reload();
        } else {
          alert('삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error("삭제 실패:", error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoardByCategory("Paper");
        if (response) {
          // 논문 데이터를 연도 및 월별로 정리
          const papers = response.categoryList.reduce((acc, item) => {
            const paperData = JSON.parse(item.content);
            const publishDate = new Date(paperData.publishDate);
            const year = publishDate.getFullYear();
            const month = publishDate.getMonth(); // 월 (0: 1월, 11: 12월)

            if (!acc[year]) {
              acc[year] = {};
            }

            if (!acc[year][month]) {
              acc[year][month] = [];
            }

            acc[year][month].push({
              boardNumber: item.boardNumber,
              title: paperData.paperTitle,
              authors: paperData.authors,
              link: paperData.paperLink,
              publishDate: paperData.publishDate
            });

            return acc;
          }, {});

          // 연도와 월을 내림차순으로 정렬
          const sortedPapers = Object.keys(papers)
            .sort((a, b) => b - a) // 연도 내림차순 정렬
            .reduce((acc, year) => {
              acc[year] = Object.keys(papers[year])
                .sort((a, b) => b - a) // 월 내림차순 정렬
                .reduce((yearAcc, month) => {
                  yearAcc[month] = papers[year][month];
                  return yearAcc;
                }, {});
              return acc;
            }, {});

          setPapersByYear(sortedPapers);
        }
      } catch (error) {
        console.error("논문 데이터 로딩 실패:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full mx-auto px-2 py-4">
      <h1 className="text-2xl mb-4 font-bold px-4">논문</h1>
      
      <div className="mt-12 space-y-12 custom-mb:px-12">
        {Object.entries(papersByYear)
          .sort(([yearA], [yearB]) => yearB - yearA) // 연도 내림차순 정렬
          .map(([year, months]) => (
            <div key={year} className="border-b pb-8">
              <h2 className="text-2xl font-bold text-[#023793] mb-6">
                {year}
              </h2>
              <div className="space-y-6">
                {Object.entries(months)
                  .sort(([monthA], [monthB]) => monthB - monthA) // 월 내림차순 정렬
                  .map(([month, papers]) => (
                    Array.isArray(papers) && (
                      <div key={month} className="pl-4 border-l-4 border-gray-200">
                        {/* <h3 className="text-lg font-semibold text-gray-700 mb-4">
                          {new Date(2020, month).toLocaleString('default', { month: 'long' })}
                        </h3>  월 표시*/}
                        {papers.map((paper, index) => (
                          <div key={index} className="flex justify-between items-start gap-4">
                            <div className="flex-grow">
                              <div className="text-lg font-medium mb-2">
                                {paper.link ? (
                                  <a 
                                    href={paper.link.startsWith("http") ? paper.link : `https://${paper.link}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                  >
                                    {paper.title}
                                  </a>
                                ) : (
                                  paper.title
                                )}
                              </div>
                              <div className="text-gray-600">
                                {paper.authors}
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(paper.publishDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long'
                                })}
                              </div>
                            </div>
                            {cookies.accessToken && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleDelete(paper.boardNumber)}
                                  className="text-red-500 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                                >
                                  삭제
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  ))}
              </div>
            </div>
          ))}
        
        {Object.keys(papersByYear).length === 0 && (
          <div className="text-center text-gray-500 py-12">
            등록된 논문이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
