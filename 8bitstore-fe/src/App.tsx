import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home/";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProductList from "./pages/Product";
import ProductDetail from "./pages/Home/ProductDetail";
import AuthProvider from "./contexts/AuthProvider";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Order from "./pages/Profile/Order";
import CartProvider from "./contexts/CartProvider";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/product" element={<ProductList />} />
                <Route path="/detail/:productId" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />}>
                  <Route path="/profile/order" element={<Order></Order>}/> 
                </Route>
            </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
