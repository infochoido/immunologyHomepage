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
    <div className="w-full mx-auto px-1  custom-md:px-12 py-4">
      <h1 className="text-2xl font-bold px-2 mb-4">실험실 소개</h1>
      
      {labIntro ? (
        <div className="bg-white overflow-hidden">
          {isLoggedIn && (
            <div className="custom-md:p-4 p-2 flex justify-end">
              <button 
                onClick={handleEdit}
                className="px-4 py-2 bg-[#023793] text-white rounded hover:bg-[#034ABC] transition-colors"
              >
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
