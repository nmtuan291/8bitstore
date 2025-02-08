import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home/";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProductSection from "./pages/Product/ProductSection/ProductSection";
import LatestProduct from "./pages/Home/LatestProduct/LatestProduct";
import ProductList from "./pages/Product";

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
