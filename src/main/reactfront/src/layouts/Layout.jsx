import NavBar from "../components/NavBar";
import RouterComponent from "../router/router";

export default function Layout() {
    return (
      <div>
        {/*네비게이션 바바 */}
        <NavBar />
  
        {/* 메인 페이지 */}
        <RouterComponent />
  

        {/* 푸터*/}
      </div>
    );
  }