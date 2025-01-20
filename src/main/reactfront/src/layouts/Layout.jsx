import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TopBanner from "../components/Top_Banner";
import SideBar from "../components/SideBar";
import DetailPageGuide from "../components/DetailPageGuide";

export default function Layout() {
  const location = useLocation();

  const showSidebar = location.pathname !== "/"; // 홈 제외

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <TopBanner />
        <NavBar />
      </header>
      
      {showSidebar && (<DetailPageGuide />)}
      
      <div className={` ${showSidebar ? 'custom-mb:mx-36 mx-0' : 'w-full'} flex flex-1`}>
        {showSidebar && (
          <aside className="w-[250px] px-4 custom-mb:block hidden">
            <SideBar />
          </aside>
        )}
        <main className={` ${showSidebar ? 'w-4/5 min-w-[768px]' : 'w-full'}`}>
          <Outlet />
        </main>
      
      </div>
      <footer className="text-white">
        <Footer />
      </footer>
    </div>
  );
}
