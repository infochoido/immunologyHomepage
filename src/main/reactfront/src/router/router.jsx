import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Professor from "../pages/Professor";

export default function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="professor" element={<Professor />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}
