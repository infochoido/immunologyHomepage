import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import RouterComponent from "../router/router";
import AboutUs from "../components/AboutUs";

export default function Layout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <NavBar />
      <div className="relative">
        <Banner />
        <div className="-mt-[160px] relative z-10">
          <InfoCard />
        </div>
      </div>
      <AboutUs />
      <div className="mt-64"></div> {/* 간격 추가 */}      
      <Footer />
    </div>
  );
}