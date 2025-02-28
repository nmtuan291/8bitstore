import { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./Profile.scss";
import Order from "./Order";

const Profile: React.FC = () => {

  return (
    <div className="profile-container">
      <div className="profile-header">
      </div>
      <div className="profile-detail-container">
        <div className="profile-detail">
          <ul>
            <NavLink to="#" className="nav-link">Tài khoản</NavLink>
            <NavLink to="/profile/order" className="nav-link">Đơn hàng</NavLink>
            <NavLink to="#" className="nav-link">Địa chỉ</NavLink>
            <NavLink to="#" className="nav-link">Đổi mật khẩu</NavLink>
          </ul>
          <div className="profile-content">
              <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;