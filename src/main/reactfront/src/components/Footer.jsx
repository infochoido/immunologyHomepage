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
      <div className="bg-white h-24 flex justify-center items-center">
        <img src="../assets/logo.png" alt="logo" />
      </div>

      {/* 텍스트 영역 */}
      <div
        className="text-white text-left py-12 w-full relative"
        style={{
          backgroundColor: "#023793",
        }}
      > 
        <div className="flex flex-row h-16 border-t border-b border-gray-500">
          <div className="border-l border-gray-500 ml-[128px] mr-4 h-auto"></div>
          <div className="flex flex-row items-center justify-center text-gray-300">
            <div className="font-bold px-2">바로가기</div>
            <div><img className = "w-6 h-6" src = "../assets/link.png" alt ="logo"></img></div>
          </div>

          <div className="border-l border-gray-500 mx-4 h-auto"></div>
          <div className="justify-center flex flex-col text-base text-sm font-bold">
            {/* <div>개인정보처리방침</div>
            <div>이메일무단수집거부</div> */}
            <div className="text-gray-300 hover:text-blue-300 cursor-pointer"><a 
            href="https://map.naver.com/p/search/%EC%A0%84%EB%B6%81%EB%8C%80%ED%95%99%EA%B5%90%20%EC%88%98%EC%9D%98%EA%B3%BC%EB%8C%80%ED%95%99/place/36351898?placePath=?entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh"
            target="_blank">찾아오시는길</a></div>
          </div>
          <div className="border-l border-gray-500 mx-4 h-auto"></div>
          <div className="justify-center flex flex-col text-base text-sm font-bold">
            <div className="text-gray-300 hover:text-blue-300 cursor-pointer"><a href="https://www.jbnu.ac.kr/web/info/01.do" 
            target="_blank">개인정보처리방침</a></div>
            {/* <div>이메일무단수집거부</div> */}
            {/* <div>찾아오시는길</div> */}
          </div>
          <div className="border-l border-gray-500 mx-4 h-auto"></div>
          <div className="justify-center flex flex-col text-base text-sm font-bold">
            {/* <div>개인정보처리방침</div> */}
            <div className="text-gray-300 hover:text-blue-300 cursor-pointer"><a href="https://www.jbnu.ac.kr/web/info/03.do" 
            target="_blank">이메일무단수집거부</a></div>
            {/* <div>찾아오시는길</div> */}
          </div>
          <div className="border-l border-gray-500 mx-4 h-auto"></div>


          <div className="ml-auto pr-32 flex justify-center items-center">
          <select
            onChange={(e) => setSelectedUrl(e.target.value)} // 선택된 URL 업데이트
            className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
            value={selectedUrl} // 선택된 값을 반영
          >
            <option value="" disabled hidden>
              관련사이트
            </option>
            {sites.map((site, index) => (
              <option key={index} value={site.url}>
                {site.name}
              </option>
            ))}
          </select>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition"
            onClick={handleNavigation} // 버튼 클릭 시 URL로 이동
          >
            이동
          </button>
        </div>

        </div>
      
        <div className="text-gray-300 flex flex-col text-base text-sm font-bold mt-4 ml-32">
              <div>[54596] 전북 익산시 고봉로 79</div> 
              <div>전북대학교 수의학과 면역학 실험실</div> 
              <div>김원일 교수 email : <span className="underline">kwi062jbnu.ac.kr</span></div>
              {/* <div>면역학 실험실</div>
              <div>김원일 교수</div>
              <div className="underline">email : kwi062dbnu.ac.kr</div> */}
          </div>
      </div>
    </div>
  );
}
