import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();

  // 네비게이션 구조
  const menuItems = [
    { text: "교수", 
      subItems: [
        { text : "교수", link: "/professor"}
      ],
    },
    { text: "실험실소개", 
      subItems: [
        { text : "실험실소개", link: "/introduction"}
      ],
    },
    { text: "게시글작성", 
      subItems: [
        { text : "게시글작성", link: "/board-write"}
      ],
    },
    {
      text: "구성원",
      subItems: [
        { text: "연구진", link: "/member/members" },
        { text: "네트워크", link: "/member/alumnis" },
      ],
    },
    {
      text: "연구실적",
      subItems: [
        { text: "논문", link: "/publication/paper" },
        { text: "특허", link: "/publication/patent" },
      ],
    },
    {
      text: "공지사항",
      subItems: [
        { text: "공지사항", link: "/notice" },
      ],
    },
  ];

  // 현재 URL과 매칭되는 제목 찾기
  const findCurrentMenu = (path) => {
    for (const item of menuItems) {
      if (item.link === path) return item.text;
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.link === path) return subItem.text;
        }
      }
    }
    return "메뉴"; // 기본값
  };

  // 현재 경로에 맞는 제목 설정
  const currentTitle = findCurrentMenu(location.pathname);

  // 현재 경로에 맞는 하위 메뉴 가져오기
  const currentSubMenu = menuItems.find(
    (item) => item.subItems && item.subItems.some((sub) => sub.link === location.pathname)
  );
  return (
    <div className="w-64 border-r border-gray-300">
      {/* 제목 */}
      <div className="flex justify-center h-14 bg-blue-800 items-center text-white text-2xl px-10 py-1">
        {currentTitle}
      </div>
  
      {/* 하위 메뉴 */}
      <div className="bg-white">
        {currentSubMenu?.subItems?.map((item, index) => (
          <Link
          key={index}
          to={item.link}
          className={`flex justify-between items-center w-full h-12 px-4 border-b border-gray-300 text-lg transition duration-200 
            ${location.pathname === item.link ? "bg-white" : "bg-white text-gray-800"} 
            hover:bg-blue-200`} // hover는 별도로 추가
        >
          <span>{item.text}</span>
          <svg
            className={`w-4 h-4 ${location.pathname === item.link ? "text-white" : "text-gray-600"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
          </svg>
        </Link>
        ))}
      </div>
    </div>
  );
  
  // return (
  //   <div className="basis-1/10">
  //     {/* 제목 */}
  //     <div className="flex justify-center h-14 bg-cardBlue1 items-center text-white text-3xl px-10 py-1 rounded-t-lg">
  //       {currentTitle}
  //     </div>

  //     {/* 하위 메뉴 */}
  //     {currentSubMenu?.subItems?.map((item, index) => (
  //       <Link
  //         key={index}
  //         to={item.link}
  //         className="block w-full h-14 bg-white text-gray-800 text-xl text-left border border-gray-300 px-4 py-2 rounded shadow flex items-center justify-between hover:bg-gray-100 active:bg-gray-200 transition duration-200"
  //       >
  //         <span>{item.text}</span>
  //         <svg
  //           className="w-5 h-5 text-gray-600"
  //           fill="none"
  //           stroke="currentColor"
  //           strokeWidth="2"
  //           viewBox="0 0 24 24"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
  //         </svg>
  //       </Link>
  //     ))}
  //   </div>
  // );
}
