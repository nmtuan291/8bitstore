import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home/";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProductList from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import AuthProvider from "./contexts/AuthProvider";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Order from "./pages/Profile/Order";
import CartProvider from "./contexts/CartProvider";
import Payment from "./pages/Payment";
import PaymentProcess from "./pages/Payment/PaymentProcess";
import Wishlist from "./pages/Wishlist";
import WishlistProvider from "./contexts/WishlistProvider";
import ProductManagement from "./pages/Admin/ProductManagement";
import Layout from "./layout";
import Detail from "./pages/Profile/Detail";
import ChangePassword from "./pages/Profile/ChangePassword";
import LoadingOverlay from "./components/LoadingOverlay";
import Toast from "./components/Toast";
import Modal from "./components/Modal";
import MobileMenu from "./components/NavBar/MobileMenu";
import NotFoundPage from "./pages/404";
import PaymentResult from "./pages/Payment/PaymentResult";
import ReviewForm from "./pages/Profile/Order/ReviewForm";
import ProductFilter from "./pages/Product/ProductFilter";
import ManageProductList from "./pages/Admin/ProductManagement/ProductTable";
import OrderTable from "./pages/Admin/ProductManagement/OrderTable";
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
                    <Route path="/" element={ <Layout /> }>
                      <Route index element={<Home />} />
                      <Route path="admin/manage" element={<ProductManagement />}/>
                      <Route path="product" element={<ProductList productName=""/>} />
                      <Route path="/product/:productId" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route element={<Profile />}>
                          <Route path="/profile/order" element={<Order />}/> 
                          <Route path="/profile/detail" element={<Detail />} />
                          <Route path="/profile/change-pwd" element={<ChangePassword />} />
                      </Route>
                      
                      <Route element={<ProductManagement />}>
                        <Route path="manage/product" element={<ManageProductList />}/>
                        <Route path="manage/order" element={<OrderTable />}/>
                      </Route>
                      <Route path="/payment" element={<Payment />}/>
                      <Route path="/payment-process/:paymentMethod" element={<PaymentProcess />}></Route>
                      <Route path="/payment-result" element={<PaymentResult />}></Route>
                      <Route path="/wishlist" element={<Wishlist />}/>
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<NotFoundPage />}/>
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
