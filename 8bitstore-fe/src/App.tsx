import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home/";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProductSection from "./pages/Product/ProductSection/ProductSection";
import LatestProduct from "./pages/Home/LatestProduct/LatestProduct";
import ProductList from "./pages/Product";
import Pagination from "./components/Pagination";
import ProductDetail from "./pages/Home/ProductDetail";

function App() {
  const [currentPage, setCurrentPage] = useState(1);


  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/detail/:productId" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
