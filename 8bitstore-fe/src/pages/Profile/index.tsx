import { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./Profile.scss";
import Order from "./Order";

const Profile: React.FC = () => {

  return (
    <div className="profile-container">
      <div className="profile-header">
      </div>
      <div className="profile-section">
        <div>
          <ul>
            <li><NavLink to="/profile/order" className="nav-link">Tài khoản</NavLink></li>
            <li><NavLink to="#" className="nav-link">Đơn hàng</NavLink></li>
            <li><NavLink to="#" className="nav-link">Địa chỉ</NavLink></li>
          </ul>
          <div className="">
              <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;