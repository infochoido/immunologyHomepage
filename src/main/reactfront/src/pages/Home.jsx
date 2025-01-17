import Banner from "../components/Banner";
import InfoCard from "../components/InfoCard";

export default function Home() {
    return (
    <div className="relative">
        <Banner />
        <div className="-mt-[330px] relative z-10">
          <InfoCard />
        </div>
      </div>
    );
  }
  