import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBoardByCategory } from "../apis";
import { useCookies } from "react-cookie";

export default function Introduction() {
  const [labIntro, setLabIntro] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    // 세션 체크
    const checkSession = () => {
      const session = cookies.accessToken;
      setIsLoggedIn(!!session);
    };

    checkSession();
  }, [cookies.accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoardByCategory("Introduction");
        if (response && response.categoryList.length > 0) {
          setLabIntro(response.categoryList[0]);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    navigate(`/board/edit/${labIntro.boardNumber}`, {
      state: { 
        category: 'Introduction',
        content: labIntro.content
      }
    });
  };

  return (
    <div className="w-full mx-auto px-2 custom-md:px-12 py-4">
      <h1 className="text-2xl px-4 mb-4 font-bold">실험실 소개</h1>
      
      {labIntro ? (
        <div className="bg-white overflow-hidden">
          {isLoggedIn && (
            <div className="custom-md:p-4 p-2 flex justify-end">
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                수정
              </button>
            </div>
          )}
          
          <div className="p-8">
            <div 
              className="prose max-w-none ql-editor"
              dangerouslySetInnerHTML={{ __html: labIntro.content }}
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          실험실 소개 내용이 없습니다.
        </div>
      )}
    </div>
  );
}
