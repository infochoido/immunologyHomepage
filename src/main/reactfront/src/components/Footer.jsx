import { useState } from "react";

export default function Footer() {
  const [selectedUrl, setSelectedUrl] = useState(""); // 선택된 URL 상태

  const sites = [
    { name: "전북대학교 동물평가연구원", url: "https://site1.com" },
    { name: "전북대학교 동물질병진단센터", url: "https://site2.com" },
    { name: "전북대학교 홈페이지", url: "https://site3.com" },
  ];

  const handleNavigation = () => {
    if (selectedUrl) {
      window.open(selectedUrl, "_blank"); // 선택된 URL로 이동
    } else {
      alert("사이트를 선택해주세요!"); // URL이 선택되지 않았을 때 알림
    }
  };

  return (
    <div className="w-full relative">
      {/* 상단 로고 영역 */}
      <div className="bg-white h-16 sm:h-24 flex justify-center items-center">
        <img src="../assets/logo.png" alt="logo" className="h-12 sm:h-20 w-auto" />
      </div>

      {/* 텍스트 영역 */}
      <div
        className="text-white text-left py-8 sm:py-12 w-full relative"
        style={{
          backgroundColor: "#023793",
        }}
      > 
        <div className="flex flex-col custom-mb:flex-row h-auto custom-mb:h-16 border-t border-b border-gray-500 py-2">
          {/* 바로가기 섹션 */}
          <div className="flex items-center custom-mb:px-0 custom-mb:ml-[128px] custom-mb:py-4 custom-mb:py-0">
            <div className="border-l border-gray-500 h-full hidden custom-mb:block"></div>
            <div className="flex items-center text-gray-300 mx-4">

              <div className="font-bold ">바로가기 </div>
              <div><img className="w-4 h-4 custom-mb:w-6 custom-mb:h-6" src="../assets/link.png" alt="logo" /></div>
            </div>
            <div className="border-l border-gray-500 h-full"></div>
          </div>

          {/* 찾아오시는 길 */}
          <div className="flex items-center custom-mb:justify-center custom-mb:px-0 py-4 custom-mb:py-0">
            <div className="text-gray-300 hover:text-blue-300 cursor-pointer px-4 text-sm custom-mb:text-base">
              <a href="https://map.naver.com/p/search/%EC%A0%84%EB%B6%81%EB%8C%80%ED%95%99%EA%B5%90%20%EC%88%98%EC%9D%98%EA%B3%BC%EB%8C%80%ED%95%99/place/36351898?placePath=?entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh"
                 target="_blank">찾아오시는길</a>
            </div>
            <div className="border-l border-gray-500 h-full"></div>
          </div>

          {/* 관련사이트 선택 */}
          <div className="flex items-center px-4">
            <div className="flex">
              <select
                onChange={(e) => setSelectedUrl(e.target.value)}



                className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 w-[200px]"
                value={selectedUrl}
              >
                <option value="" disabled hidden>관련사이트</option>
                {sites.map((site, index) => (
                  <option key={index} value={site.url}>{site.name}</option>
                ))}
              </select>
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition"
                onClick={handleNavigation}
              >
                이동
              </button>
            </div>
          </div>
        </div>
      
        {/* 주소 정보 */}
        <div className="text-gray-300 flex flex-col text-sm sm:text-base font-bold mt-4 px-4 sm:px-0 sm:ml-32">
          <div>[54596] 전북 익산시 고봉로 79</div> 
          <div>전북대학교 수의학과 면역학 실험실</div> 
          <div>김원일 교수 email: <span className="underline">kwi062jbnu.ac.kr</span></div>
        </div>
      </div>
    </div>
  );
}
