import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { getBoardDetail, deleteBoardRequest } from "../apis";
import { useCookies } from 'react-cookie';
import { useLoginuserStore } from "../stores/store";

export default function BoardDetail() {
  const [data, setData] = useState(null); // 서버에서 가져온 데이터를 저장
  const location = useLocation(); // 현재 URL의 정보를 가져옴
  const searchParams = new URLSearchParams(location.search); // 쿼리 문자열 파싱
  const boardNumber = searchParams.get("board_number"); // 'board_number' 값 가져오기
  const [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();
  const { loginUser } = useLoginuserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoardDetail(boardNumber);
        if (response) {
          console.log(response)
          setData(response);
          console.log('게시글 상세 데이터:', response);
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };
    
    if (boardNumber) {
      fetchData();
    }
  }, [boardNumber]); // boardNumber가 변경될 때마다 요청

  const handleEdit = () => {
    navigate(`/board/edit/${boardNumber}`);
  };

  const handleDelete = async () => {
    if (!cookies.accessToken) {
        alert('로그인이 필요합니다.');
        return;
    }

    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;

    try {
        const response = await deleteBoardRequest(boardNumber, cookies.accessToken);
        console.log('Delete response:', response);
        
        if (response.code === 'SU') {
            alert('게시글이 삭제되었습니다.');
            // 삭제 성공 시 이전 페이지로 이동하되 상태를 유지
            const prevPath = document.referrer;
            if (prevPath && prevPath.includes(window.location.origin)) {
                window.history.back();
                console.log('이전 페이지로 이동');
            } else {
                navigate('/');
            }
        } else {
            alert('게시글 삭제에 실패했습니다.');
        }
    } catch (error) {
        console.error('삭제 중 오류 발생:', error);
        if (error.response?.status === 403) {
            alert('삭제 권한이 없습니다.');
        } else {
            alert('게시글 삭제에 실패했습니다.');
        }
    }
  };

  return (
    <div>
      
        {data ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">
                {data.title}
              </h1>
              <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {data.writeDateTime ? new Date(data.writeDateTime).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : '날짜 없음'}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  조회수: {data.viewCount || 0}
                </div>
              </div>
            </div>

            {/* 컨텐츠 섹션 */}
            <div className="p-6">
              <div
                className="prose max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </div>

            {/* 버튼 섹션 */}
            {cookies.accessToken && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    수정
                  </button>
                  <button
                    onClick={handleDelete}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">데이터를 불러오는 중...</p>
          </div>
        )}
      </div>
    
  );
}
