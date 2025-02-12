import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { getBoardByCategory, deleteBoardRequest } from "../apis";
import { useCookies } from "react-cookie";

export default function Paper() {
  const [papersByYear, setPapersByYear] = useState({});
  const [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();

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
          // 논문 데이터를 연도별로 정리
          const papers = response.categoryList.reduce((acc, item) => {
            const paperData = JSON.parse(item.content);
            const year = new Date(paperData.publishDate).getFullYear();
            
            if (!acc[year]) {
              acc[year] = [];
            }
            
            acc[year].push({
              boardNumber: item.boardNumber,
              title: paperData.paperTitle,
              authors: paperData.authors,
              link: paperData.paperLink,
              publishDate: paperData.publishDate
            });
            
            return acc;
          }, {});

          // 연도를 내림차순으로 정렬
          const sortedPapers = Object.keys(papers)
            .sort((a, b) => b - a)
            .reduce((acc, year) => {
              acc[year] = papers[year];
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
    <div className="w-full mx-auto px-2  custom-mb:px-12  py-4">
      <PageTitle />
      
      <div className="mt-12 space-y-12">
        {Object.entries(papersByYear).map(([year, papers]) => (
          <div key={year} className="border-b pb-8">
            <h2 className="text-2xl font-bold text-[#023793] mb-6">
              {year}
            </h2>
            <div className="space-y-6">
              {papers.map((paper, index) => (
                <div key={index} className="pl-4 border-l-4 border-gray-200">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-grow">
                      <div className="text-lg font-medium mb-2">
                        {paper.link ? (
                          <a 
                            href={paper.link}
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
                </div>
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
