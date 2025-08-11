import "./App.css";
import { BrowserRouter, Routes, Route, data } from "react-router-dom";
import React from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home/";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProductList from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Order from "./pages/Profile/Order";
import PaymentProcess from "./pages/Payment/PaymentProcess";
import Wishlist from "./pages/Wishlist";
import ProductManagement from "./pages/Admin/ProductManagement";
import Layout from "./layout";
import Detail from "./pages/Profile/Detail";
import ChangePassword from "./pages/Profile/ChangePassword";
import NotFoundPage from "./pages/NotFound";
import PaymentResult from "./pages/Payment/PaymentResult";
import ManageProductList from "./pages/Admin/ProductManagement/ProductTable";
import OrderTable from "./pages/Admin/ProductManagement/OrderTable";
import Address from "./pages/Profile/Address";
import { ToastProvider } from "./contexts/ToastContext";

function App() {

  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Layout /> }>
            <Route index element={<Home />} />
            <Route path="admin/manage" element={<ProductManagement />}/>
            <Route path="product" element={<ProductList />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route element={<Profile />}>
                <Route path="/profile/order" element={<Order />}/> 
                <Route path="/profile/detail" element={<Detail />} />
                <Route path="/profile/change-pwd" element={<ChangePassword />} />
                <Route path="/profile/address" element={<Address />} />

            </Route>
            <Route element={<ProductManagement />}>
              <Route path="manage/product" element={<ManageProductList />}/>
              <Route path="manage/order" element={<OrderTable />}/>
            </Route>
            <Route path="/payment-process/:paymentMethod" element={<PaymentProcess />}></Route>
            <Route path="/payment-result/:status" element={<PaymentResult />}></Route>
            <Route path="/wishlist" element={<Wishlist />}/>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
