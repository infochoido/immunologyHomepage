import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TopBanner from "../components/Top_Banner";
import SideBar from "../components/SideBar";
import DetailPageGuide from "../components/DetailPageGuide";

// 메뉴 데이터 정의
const menuItems = [
  {
    text: "Professor",
    link: "/professor",
    subItems: [{ text: "Professor", link: "/professor" }],
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
  {
    text: "Patent",
    link: "/patent",
    subItems: [{ text: "Patent", link: "/patent" }],
  },
  {
    text: "Notice",
    link: "/notice",
    subItems: [{ text: "Notice", link: "/notice" }],
  },
  {
    text: "BoardDetail",
    link: "/boardDetail",
    subItems: [{ text: "BoardDetail", link: "/boardDetail" }],
  },
];

export default function Layout() {
  const location = useLocation();
  const showSidebar = location.pathname !== "/";

  const currentMenu = menuItems.find(
    (menu) =>
      (menu.link && location.pathname.startsWith(menu.link)) ||
      (menu.subItems &&
        menu.subItems.some((sub) => location.pathname.startsWith(sub.link)))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <TopBanner />
        <NavBar />
      </header>

      {showSidebar && <DetailPageGuide />}

      <div
        className={`flex-1 ${
          showSidebar
            ? " px-4 py-6 flex gap-8 custom-mb:mx-[100px]"
            : "w-full"
        }`}
      >
        {showSidebar && currentMenu && (
          <aside className="w-64 flex-shrink-0 custom-mb:block hidden ">
            <div className="sticky top-24">
              <SideBar
                title={currentMenu.text}
                subMenuItems={currentMenu.subItems || []}
              />
            </div>
          </aside>
        )}
        <main
          className={`${
            showSidebar ? "w-full" : "w-full"
          } bg-white rounded-lg shadow-sm`}
        >
          <Outlet />
        </main>
      </div>

      <footer className="bg-gray-800 text-white mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
