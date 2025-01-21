// import { Outlet, useLocation } from "react-router-dom";
// import NavBar from "../components/NavBar";
// import Footer from "../components/Footer";
// import TopBanner from "../components/Top_Banner";
// import SideBar from "../components/SideBar";
// import DetailPageGuide from "../components/DetailPageGuide";

// // 메뉴 데이터 정의
// const menuItems = [
//   { text: "Professor", link: "/professor",
//     subItems: [
//       { text: "Professor", link: "/professor" },
//     ],
//    },
//   {
//     text: "Members",
//     link: null,
//     subItems: [
//       { text: "Members", link: "/member/members" },
//       { text: "Alumnis", link: "/member/alumnis" },
//     ],
//   },
//   {
//     text: "Research",
//     link: null,
//     subItems: [
//       { text: "Research", link: "/research/research" },
//       { text: "Project", link: "/research/project" },
//     ],
//   },
//   {
//     text: "Publication",
//     link: null,
//     subItems: [
//       { text: "Cover Selection", link: "/publication/cover-selection" },
//       { text: "Refereed Journal", link: "/publication/refereed-journal" },
//     ],
//   },
//   { text: "Patent", link: "/patent" },
// ];

// export default function Layout() {
//   const location = useLocation();

//   const showSidebar = location.pathname !== "/"; // 홈 제외

//   // 현재 경로에 해당하는 메뉴 항목 찾기
//   const currentMenu = menuItems.find(
//     (menu) =>
//       location.pathname.startsWith(menu.link || "") ||
//       (menu.subItems && menu.subItems.some((sub) => location.pathname.startsWith(sub.link)))
//   );

//   return (
//     <div className="flex flex-col min-h-screen">
//       <header>
//         <TopBanner />
//         <NavBar />
//       </header>

//       {showSidebar && <DetailPageGuide />}

//       <div className={`${showSidebar ? "custom-mb:mx-36 mx-0" : "w-full"} flex flex-1`}>
//         {showSidebar && currentMenu && (
//           <aside className="w-[250px] px-4 custom-mb:block hidden">
//             <SideBar title={currentMenu.text} subMenuItems={currentMenu.subItems || []} />
//           </aside>
//         )}
//         <main className={`${showSidebar ? "w-4/5 min-w-[768px]" : "w-full"}`}>
//           <Outlet />
//         </main>
//       </div>
//       <footer className="text-white">
//         <Footer />
//       </footer>
//     </div>
//   );
// }
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TopBanner from "../components/Top_Banner";
import SideBar from "../components/SideBar";
import DetailPageGuide from "../components/DetailPageGuide";

// 메뉴 데이터 정의
const menuItems = [
  { text: "Professor", link: "/professor",
    subItems: [
      { text: "Professor", link: "/professor" },
    ],
  },
  {
    text: "Members",
    link: null,
    subItems: [
      { text: "Members", link: "/member/members" },
      { text: "Alumnis", link: "/member/alumnis" },
    ],
  },
  {
    text: "Research",
    link: null,
    subItems: [
      { text: "Research", link: "/research/research" },
      { text: "Project", link: "/research/project" },
    ],
  },
  {
    text: "Publication",
    link: null,
    subItems: [
      { text: "Cover Selection", link: "/publication/cover-selection" },
      { text: "Refereed Journal", link: "/publication/refereed-journal" },
    ],
  },
  { text: "Patent", link: "/patent",
    subItems: [
      { text: "Patent", link: "/patent" },
    ],
  },
];

export default function Layout() {
  const location = useLocation();

  const showSidebar = location.pathname !== "/"; // 홈 제외

  // 현재 경로에 해당하는 메뉴 항목 찾기
  const currentMenu = menuItems.find(
    (menu) =>
      (menu.link && location.pathname.startsWith(menu.link)) ||
      (menu.subItems && menu.subItems.some((sub) => location.pathname.startsWith(sub.link)))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <TopBanner />
        <NavBar />
      </header>

      {showSidebar && <DetailPageGuide />}

      <div className={`${showSidebar ? "custom-mb:mx-36 mx-0" : "w-full"} flex flex-1`}>
        {showSidebar && currentMenu && (
          <aside className="w-[250px] px-4 custom-mb:block hidden">
            <SideBar title={currentMenu.text} subMenuItems={currentMenu.subItems || []} />
          </aside>
        )}
        <main className={`${showSidebar ? "w-4/5 min-w-[768px]" : "w-full"}`}>
          <Outlet />
        </main>
      </div>
      <footer className="text-white">
        <Footer />
      </footer>
    </div>
  );
}
