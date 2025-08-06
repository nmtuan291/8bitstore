import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faShoppingBag, 
  faLock, 
  faMapMarkerAlt,
  faSignOutAlt,
  faCog,
  faEdit,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../components/Avatar";
import "./Profile.scss";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useGetCurrentUserQuery, useLogoutMutation } from "../../store/api";

interface MenuItem {
  path: string;
  label: string;
  icon: any;
  description: string;
}

const Profile: React.FC = () => {
  const { data: user, isLoading: isUserLoading } = useGetCurrentUserQuery();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log("Profile component loaded");
    console.log("User data:", user);
    console.log("Is user loading:", isUserLoading);
  }, [user, isUserLoading]);

  if (!user)
    navigate("/login");

  const menuItems: MenuItem[] = [
    {
      path: "/profile/detail",
      label: "Thông tin cá nhân",
      icon: faUser,
      description: "Quản lý thông tin tài khoản"
    },
    {
      path: "/profile/address",
      label: "Địa chỉ",
      icon: faMapMarkerAlt,
      description: "Quản lý địa chỉ giao hàng"
    },
    {
      path: "/profile/order",
      label: "Đơn hàng",
      icon: faShoppingBag,
      description: "Xem lịch sử đơn hàng"
    },
    {
      path: "/profile/change-pwd",
      label: "Đổi mật khẩu",
      icon: faLock,
      description: "Thay đổi mật khẩu bảo mật"
    }
  ];

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentPageTitle = () => {
    const currentItem = menuItems.find(item => location.pathname === item.path);
    return currentItem ? currentItem.label : "Hồ sơ cá nhân";
  };

  const getCurrentPageDescription = () => {
    const currentItem = menuItems.find(item => location.pathname === item.path);
    return currentItem ? currentItem.description : "Quản lý thông tin tài khoản của bạn";
  };

  if (isUserLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      {isLogoutLoading && <LoadingOverlay />}
      <div className="profile-page">
        <div className="profile-container">
          {/* Profile Sidebar */}
          <aside className={`profile-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {/* Profile Header */}
            <div className="profile-header">
              <div className="profile-avatar">
                <div className="avatar-container">
                  <Avatar imgUrl="" width={80} height={80} />
                  <button className="edit-avatar-btn">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>
              </div>
              <div className="profile-info">
                <h3 className="profile-name">{user?.fullName || user?.userName || "Người dùng"}</h3>
                <p className="profile-email">{user?.email}</p>
                <span className="profile-status">Thành viên</span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="profile-nav">
              <div className="nav-section">
                <h4 className="nav-section-title">Tài khoản</h4>
                <ul className="nav-menu">
                  {menuItems.map((item, index) => (
                    <li key={index} className="nav-item">
                      <NavLink 
                        to={item.path} 
                        className={({ isActive }) => 
                          `nav-link ${isActive ? 'active' : ''}`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="nav-icon">
                          <FontAwesomeIcon icon={item.icon} />
                        </div>
                        <div className="nav-content">
                          <span className="nav-label">{item.label}</span>
                          <span className="nav-description">{item.description}</span>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logout Section */}
              <div className="nav-section logout-section">
                <button className="logout-btn" onClick={handleLogout}>
                  <div className="nav-icon">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </div>
                  <div className="nav-content">
                    <span className="nav-label">Đăng xuất</span>
                    <span className="nav-description">Thoát khỏi tài khoản</span>
                  </div>
                </button>
              </div>
            </nav>
          </aside>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div 
              className="mobile-overlay"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="profile-main">
            {/* Page Header */}
            <div className="page-header">
              <div className="page-header-content">
                <button 
                  className="mobile-menu-toggle"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <FontAwesomeIcon icon={faUserCircle} />
                  Menu
                </button>
                
                <div className="page-title-section">
                  <h1 className="page-title">{getCurrentPageTitle()}</h1>
                  <p className="page-description">{getCurrentPageDescription()}</p>
                </div>

                <div className="page-actions">
                  <button className="action-btn secondary">
                    <FontAwesomeIcon icon={faCog} />
                    Cài đặt
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="content-area">
              <div className="content-wrapper">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Profile;