import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TopBanner from "../components/Top_Banner";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <TopBanner />
        <NavBar />
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="text-white">
        <Footer />
      </footer>
    </div>
  );
}
