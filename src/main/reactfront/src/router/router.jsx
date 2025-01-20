import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Professor from "../pages/Professor";
import BoardWrite from "../pages/BoardWrite";
import { useCookies } from "react-cookie";

function ProtectedRoute({ element, ...rest }) {
  const [cookie] = useCookies();
  
  // 로그인된 사용자만 접근 가능
  if (!cookie.accessToken) {
    // 로그인 안된 경우 로그인 페이지로 리디렉션
    return <Navigate to="/" />;
  }

  return element;
}

export default function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="professor" element={<Professor />} />
          <Route path="board-write" element={<ProtectedRoute element={<BoardWrite />} />} />
          <Route path="member" element={<>menber</>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}
