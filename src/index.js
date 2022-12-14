import ReactDOM from "react-dom/client";

//Cấu hình react router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import HomeTemplate from "./templates/HomeTemplate";
import QuanLySinhVien from "./pages/QuanLySinhVien/QuanLySinhVien";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="quan-ly-sinh-vien" element={<QuanLySinhVien />}></Route>
          <Route path="*" element={<Navigate to="" />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
