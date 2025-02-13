import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getBoardByCategory } from "../apis";

export default function Professor() {
    const [professorContent, setProfessorContent] = useState('');
    const [boardNumber, setBoardNumber] = useState(null);
    const [cookies] = useCookies(['accessToken']);
    const navigate = useNavigate();

    // 고정된 프로필 부분
    const fixedProfile = `
        <div class="flex flex-col basis-9/10">
            <div class="flex flex-col md:flex-row items-center">
                <img
                    class="w-48 h-auto mb-4 md:mb-0"
                    src="../assets/professorimg.png"
                    alt="professor"
                />
                <div class="md:ml-4 text-xl w-full text-center md:text-left">
                    <div class="text-2xl mb-4">
                        김원일
                        <div class="text-lg text-gray-500">Kim Wonil</div>  
                    </div>
                    <table class="w-full text-left border-collapse">
                        <tbody>
                            <tr>
                                <td class="py-1 pr-4 font-semibold">전공</td>
                                <td>수의면역학</td>
                            </tr>
                            <tr>
                                <td class="py-1 pr-4 font-semibold">직위</td>
                                <td>교수</td>
                            </tr>
                            <tr>
                                <td class="py-1 pr-4 font-semibold">전화번호</td>
                                <td>063)850-0958</td>
                            </tr>
                            <tr>
                                <td class="py-1 pr-4 font-semibold">이메일</td>
                                <td>kwi0621@jbnu.ac.kr</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    useEffect(() => {
        const fetchProfessorData = async () => {
            try {
                const response = await getBoardByCategory("Professor");
                if (response && response.categoryList && response.categoryList.length > 0) {
                    const latestPost = response.categoryList[0];
                    setProfessorContent(latestPost.content);
                    setBoardNumber(latestPost.boardNumber);
                }
            } catch (error) {
                console.error("교수 정보 로딩 실패:", error);
            }
        };

        fetchProfessorData();
    }, []);

    const handleEdit = () => {
        navigate(`/board/edit/${boardNumber}`, {
            state: { 
                category: 'Professor',
                content: professorContent  // 수정 가능한 내용만 전달
            }
        });
    };

    return (
        <div className="w-full mx-auto py-8 px-1  custom-md:px-12">
            <div className="relative  mx-auto">
                {cookies.accessToken && (
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={handleEdit}
                            className="px-4 py-2 bg-[#023793] text-white rounded hover:bg-[#034ABC] transition-colors"
                        >
                            수정
                        </button>
                    </div>
                )}
                <div className="professor-content p-4">
                    <div dangerouslySetInnerHTML={{ __html: fixedProfile }} className="mb-8"/>
                    <div 
                        dangerouslySetInnerHTML={{ __html: professorContent }} 
                        className="mt-4 prose max-w-none ql-editor"
                    />
                </div>
            </div>
        </div>
    );
}
  