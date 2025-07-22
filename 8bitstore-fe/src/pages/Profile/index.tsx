import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import "./Profile.scss";
import axios from "../../apis/axios";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useGetCurrentUserQuery } from "../../store/api";

const Profile: React.FC = () => {
  const { data: user, isLoading, error } = useGetCurrentUserQuery();
  const [isLoadingState, setIsLoadingState] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoadingState(true);
      const response = await axios.post(`api/User/logout`);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingState(false);
    }
  }
  return (
    <>
      {isLoadingState && <LoadingOverlay />}
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