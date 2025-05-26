import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import Avatar from "../../components/Avatar";
import "./Profile.scss";
import axios from "../../apis/axios";
import LoadingOverlay from "../../components/LoadingOverlay";

const Profile: React.FC = () => {
  const { user, storeUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`api/User/logout`);
      if (response.status === 200) {
        navigate("/");
        storeUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className="profile-container">
        <div className="profile-menu">
          <div className="profile-header">
            <Avatar imgUrl="" width={200} height={200}></Avatar>
            <p>{user?.userName}</p>
            <button onClick={handleLogout}>Đăng xuất</button>
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
    </>
  );
}

export default Profile;