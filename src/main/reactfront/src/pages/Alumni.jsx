import React, { useState, useEffect } from "react";
import { getBoardByCategory, deleteBoardRequest } from "../apis";
import { useCookies } from "react-cookie";

export default function Alumni() {
  const [members, setMembers] = useState([]);
  const [cookies] = useCookies(['accessToken']);

  

  const fetchMembers = async () => {
    try {
      const response = await getBoardByCategory("Alumni");
  
      if (response && response.categoryList) {
        const parsedMembers = response.categoryList.map(post => {
          try {
            const memberData = JSON.parse(post.content);
            return {
              boardNumber: post.boardNumber,
              name: memberData.name,
              email: memberData.email,
              degree: memberData.degree,
              image: memberData.image
            };
          } catch (error) {
            console.error('멤버 데이터 파싱 실패:', error);
            return null;
          }
        }).filter(member => member !== null);

  
        const degreeOrder = {
          "박사 과정": 0,
          "석사 과정": 1,
          "학부 과정": 2
        };
  
        // 정렬: 학위 순서 > 이름 순
        parsedMembers.sort((a, b) => {
          const degreeComparison = (degreeOrder[a.degree] ?? 99) - (degreeOrder[b.degree] ?? 99);
          if (degreeComparison !== 0) return degreeComparison;
          return a.name.localeCompare(b.name); // 이름 오름차순
        });
  
        setMembers(parsedMembers);
      }
    } catch (error) {
      console.error('멤버 데이터 로딩 실패:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (boardNumber) => {
    if (!cookies.accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!window.confirm('정말로 이 멤버를 삭제하시겠습니까?')) return;

    try {
      const response = await deleteBoardRequest(boardNumber, cookies.accessToken);
      
      if (response.code === 'SU') {
        alert('멤버가 삭제되었습니다.');
        fetchMembers();
      } else {
        alert('멤버 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      if (error.response?.status === 403) {
        alert('삭제 권한이 없습니다.');
      } else {
        alert('멤버 삭제에 실패했습니다.');
      }
    }
  };

<<<<<<< HEAD
  
=======
  // degree 별로 멤버 그룹화
  const groupedMembers = members.reduce((acc, member) => {
    const { degree } = member;
    if (!acc[degree]) {
      acc[degree] = [];
    }
    acc[degree].push(member);
    return acc;
  }, {});
>>>>>>> a46708ae3fed22194846e4998a39c114397bd832

  return (
    <div className="w-full mx-auto px-1 custom-mb:px-12 py-4">
      <div className="min-h-screen py-8">
        <div className="space-y-6">
<<<<<<< HEAD
          {members.map((member) => (
            <div
              key={member.boardNumber}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row items-center"
            >
              {/* 이미지 섹션 */}
              <div className="custom-mb:w-48 h-48 w-48 flex-shrink-0 p-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* 정보 섹션 */}
              <div className="flex-grow p-6 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-semibold mb-2">{member.name}</h2>
                  <p className="text-gray-600 mb-1">{member.email}</p>
                  <p className="text-gray-800">{member.degree}</p>
=======
          {Object.keys(groupedMembers).map((degree) => (
            <div key={degree}>
              <h2 className="text-3xl font-semibold mb-4">{degree}</h2>
              {groupedMembers[degree].map((member) => (
                <div
                  key={member.boardNumber}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row"
                >
                  {/* 이미지 섹션 */}
                  <div className="w-full md:w-48 h-48 flex-shrink-0 p-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* 정보 섹션 */}
                  <div className="flex-grow p-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left">
                      <h2 className="text-2xl font-semibold mb-2">{member.name}</h2>
                      <p className="text-gray-600 mb-1">{member.email}</p>
                      <p className="text-gray-800">{member.degree}</p>
                    </div>
                    
                    {/* 삭제 버튼 */}
                    {cookies.accessToken && (
                      <button
                        onClick={() => handleDelete(member.boardNumber)}
                        className="text-red-500 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                      >
                        삭제
                      </button>
                    )}
                  </div>
>>>>>>> a46708ae3fed22194846e4998a39c114397bd832
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
