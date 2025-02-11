import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Professor from "../pages/Professor";
import Members from "../pages/Members";
import Alumni from "../pages/Alumni";
import Research from "../pages/Introduction";
import Notice from "../pages/Notice";
import BoardWrite from "../pages/BoardWrite";
import BoardDetail from "../pages/BoardDetail";
import Paper from "../pages/Paper";
import Patent from "../pages/Patent";
import Achievements from "../pages/Achievements";
import BoardEdit from "../pages/BoardEdit";
import { useCookies } from "react-cookie";




function ProtectedRoute({ element }) {
  const [cookie] = useCookies();


  if (!cookie.accessToken) {
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
          
          
          <Route path="member/members" element={<Members />} />
          <Route path="member/alumnis" element={<Alumni />} />
          
          
          <Route path="/introduction" element={<Research />} />
          
          
          
          <Route path="publication/paper" element={<Paper />} />
          <Route path="publication/patent" element={<Patent />} />

          <Route path="notice" element={<Notice />} />

          <Route path="achievements" element={<Achievements />} />

          <Route path="boardDetail" element={<BoardDetail />} />

          <Route path="/board/edit/:boardNumber" element={<BoardEdit />} />
          
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>



    </Router>
  );
}
