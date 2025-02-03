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
      <PageTitle />
      <div className="mx-16 mt-8">
        {data ? (
          <div className="p-8 border border-gray-300 rounded-lg">
            <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
            <div
              className="text-gray-800 mb-4"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            {data && data.userName === loginUser && (
              <div className="flex justify-end mt-4 gap-2">
                <button 
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  수정
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>데이터를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
}
