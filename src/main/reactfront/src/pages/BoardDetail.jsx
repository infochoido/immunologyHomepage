import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import axios from "axios";

export default function BoardDetail() {
  const [data, setData] = useState(null); // 서버에서 가져온 데이터를 저장
  const location = useLocation(); // 현재 URL의 정보를 가져옴
  const searchParams = new URLSearchParams(location.search); // 쿼리 문자열 파싱
  const boardNumber = searchParams.get("board_number"); // 'board_number' 값 가져오기

  useEffect(() => {
    // 서버에서 데이터 가져오기
    axios
      .get(`http://13.125.255.131:8080/api/v1/board/${boardNumber}`) // boardNumber를 동적으로 추가
      .then((res) => {
        setData(res.data); // 가져온 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  }, [boardNumber]); // boardNumber가 변경될 때마다 요청

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
          </div>
        ) : (
          <p>데이터를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
}
