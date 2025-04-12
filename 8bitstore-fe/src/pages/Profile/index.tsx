import { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./Profile.scss";
import Order from "./Order";
import Avatar from "../../components/Avatar";

const Profile: React.FC = () => {

  return (
    <div className="profile-container">
      <div className="profile-menu">
        <div className="profile-header">
          <Avatar imgUrl="" width={200} height={200}></Avatar>
          <p>username</p>
        </div>
        <div className="profile-detail-container">
          <div className="profile-detail">
            <ul>
              <NavLink to="/profile/detail" className="nav-link top">Tài khoản</NavLink>
              <NavLink to="/profile/order" className="nav-link">Đơn hàng</NavLink>
              <NavLink to="/profile/change-pwd" className="nav-link bottom">Đổi mật khẩu</NavLink>
            </ul>
            
          </div>
        </div>
      </div>
      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;