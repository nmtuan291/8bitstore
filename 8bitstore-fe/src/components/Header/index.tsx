import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery, useGetCartQuery } from "../../store/api";
import logo from "@/assets/logo/8bitstore-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHeart, 
    faCartShopping, 
    faUser, 
    faBars, 
    faSearch,
    faUserCircle,
    faSignOutAlt,
    faCog
} from "@fortawesome/free-solid-svg-icons";
import NavMenu from "./HeaderMenu";
import axios from "../../apis/axios";
import { items } from "./MenuItem";
import './Header.scss'
import capitalizeString from "../../utils/CapitalizeString";

interface HoverStatus {
    wishlist: boolean,
    cart: boolean,
    user: boolean
}

interface NavBarProps {
    displayMobile: () => void
}

const NavBar: React.FC<NavBarProps> = ({ displayMobile }) => {
    const navigate = useNavigate();
    const { data: user, isLoading: isUserLoading } = useGetCurrentUserQuery();
    const { data: cart = [], isLoading: isCartLoading } = useGetCartQuery();
    const [searchText, setSearchText] = useState<string>('');
    const [hoverStatus, setHoverStatus] = useState<HoverStatus>({
        wishlist: false,
        cart: false,
        user: false
    });
    const [suggestion, setSuggestion] = useState<string[]>([]);
    const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
    const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);

    const searchRef = useRef<HTMLDivElement>(null);
    const userRef = useRef<HTMLDivElement>(null);

    const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newText = e.target.value;
        setSearchText(newText);

        if (newText.length <= 2) {
            setSuggestion([]);
            setShowSuggestion(false);
        } else {
            setShowSuggestion(true);
            getSuggestion(newText);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchText.trim()) {
            navigate(`/product?productName=${encodeURIComponent(capitalizeString(searchText))}`);
            setShowSuggestion(false);
        }
    };

    const handleMouseOver = (iconName: string) => {
        setHoverStatus({ ...hoverStatus, [iconName]: true });
    };

    const handleMouseOut = (iconName: string) => {
        setHoverStatus({ ...hoverStatus, [iconName]: false });
    };

    const handleIconClick = {
        profileClick: () => {
            if (!user && !isUserLoading) {
                navigate("/login");
            } else {
                navigate("/profile/detail");
            }
        },

        wishlistClick: () => {
            if (user) {
                navigate("/wishlist");
            } else {
                navigate("/login");
            }
        },

        cartClick: () => {
            if (user) {
                navigate("/cart");
            } else {
                navigate("/login");
            }
        }
    };

    const handleUserMenuClick = {
        profile: () => {
            navigate("/profile/detail");
            setShowUserDropdown(false);
        },
        settings: () => {
            navigate("/profile");
            setShowUserDropdown(false);
        },
        logout: async () => {
            try {
                // Add logout logic here
                navigate("/");
                setShowUserDropdown(false);
            } catch (error) {
                console.error("Logout error:", error);
            }
        }
    };

    const getSuggestion = async (text: string) => {
        try {
            const response = await axios.get("api/Product/get-suggestion", {
                params: {
                    query: text
                }
            });
            if (response.status === 200) {
                setSuggestion(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchClick = (name: string) => {
        setSearchText(name);
        navigate(`/product?productName=${encodeURIComponent(capitalizeString(name))}`);
        setShowSuggestion(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestion(false);
            }
            if (userRef.current && !userRef.current.contains(event.target as Node)) {
                setShowUserDropdown(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const cartItemCount = cart?.length || 0;

    return (
        <header className="header">
            {/* Top Banner */}
            <div className="header-banner">
                <div className="banner-content">
                    <div className="marquee">
                        <span>🎮 Miễn phí vận chuyển cho đơn hàng trên 1 triệu • Chính sách đổi trả 30 ngày • Ưu đãi game độc quyền! 🎮</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="header-main">
                <div className="container">
                    <div className="header-content">
                        {/* Logo */}
                        <div className="header-logo">
                            <img 
                                src={logo} 
                                alt="8bitstore Logo" 
                                onClick={() => navigate("/")}
                                className="logo-image"
                            />
                        </div>

                        {/* Search Bar */}
                        <div className="header-search" ref={searchRef}>
                            <form onSubmit={handleSearchSubmit} className="search-form">
                                <div className="search-input-wrapper">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm game, máy chơi, phụ kiện..."
                                        value={searchText}
                                        onChange={handleSearchBoxChange}
                                        className="search-input"
                                    />
                                    <button type="submit" className="search-button">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                </div>
                            </form>
                            
                            {showSuggestion && suggestion.length > 0 && (
                                <div className="search-suggestions">
                                    <ul className="suggestions-list">
                                        {suggestion.map((name, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSearchClick(name)}
                                                className="suggestion-item"
                                            >
                                                <FontAwesomeIcon icon={faSearch} className="suggestion-icon" />
                                                {name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Header Actions */}
                        <div className="header-actions">
                            {/* Wishlist */}
                            <div className="action-item">
                                <button
                                    className="action-button"
                                    onClick={handleIconClick.wishlistClick}
                                    onMouseEnter={() => handleMouseOver("wishlist")}
                                    onMouseLeave={() => handleMouseOut("wishlist")}
                                >
                                    <FontAwesomeIcon icon={faHeart} />
                                    <span className="action-label">Yêu thích</span>
                                </button>
                                {hoverStatus.wishlist && (
                                    <div className="action-tooltip">
                                        Danh sách yêu thích
                                    </div>
                                )}
                            </div>

                            {/* Cart */}
                            <div className="action-item">
                                <button
                                    className="action-button"
                                    onClick={handleIconClick.cartClick}
                                    onMouseEnter={() => handleMouseOver("cart")}
                                    onMouseLeave={() => handleMouseOut("cart")}
                                >
                                    <div className="cart-icon-wrapper">
                                        <FontAwesomeIcon icon={faCartShopping} />
                                        {cartItemCount > 0 && (
                                            <span className="cart-badge">{cartItemCount}</span>
                                        )}
                                    </div>
                                    <span className="action-label">Giỏ hàng</span>
                                </button>
                                {hoverStatus.cart && (
                                    <div className="action-tooltip">
                                        {cartItemCount} sản phẩm trong giỏ
                                    </div>
                                )}
                            </div>

                            {/* User Account */}
                            <div className="action-item user-menu" ref={userRef}>
                                <button
                                    className="action-button"
                                    onClick={handleIconClick.profileClick}
                                    onMouseEnter={() => handleMouseOver("user")}
                                    onMouseLeave={() => handleMouseOut("user")}
                                >
                                    <FontAwesomeIcon icon={user ? faUserCircle : faUser} />
                                    <span className="action-label">
                                        {user ? user.fullName || "Tài khoản" : "Đăng nhập"}
                                    </span>
                                </button>

                                {/* User Dropdown */}
                                {user && showUserDropdown && (
                                    <div className="user-dropdown">
                                        <div className="dropdown-header">
                                            <div className="user-info">
                                                <FontAwesomeIcon icon={faUserCircle} className="user-avatar" />
                                                <div className="user-details">
                                                    <span className="user-name">{user.fullName}</span>
                                                    <span className="user-email">{user.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-menu">
                                            <button
                                                className="dropdown-item"
                                                onClick={handleUserMenuClick.profile}
                                            >
                                                <FontAwesomeIcon icon={faUser} />
                                                Hồ sơ cá nhân
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                onClick={handleUserMenuClick.settings}
                                            >
                                                <FontAwesomeIcon icon={faCog} />
                                                Cài đặt
                                            </button>
                                            <hr className="dropdown-divider" />
                                            <button
                                                className="dropdown-item logout"
                                                onClick={handleUserMenuClick.logout}
                                            >
                                                <FontAwesomeIcon icon={faSignOutAlt} />
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Tooltip for non-logged in users */}
                                {!user && hoverStatus.user && (
                                    <div className="action-tooltip">
                                        Đăng nhập vào tài khoản của bạn
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Toggle */}
                            <div className="action-item mobile-only">
                                <button
                                    className="action-button mobile-menu-toggle"
                                    onClick={displayMobile}
                                >
                                    <FontAwesomeIcon icon={faBars} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="header-nav">
                <div className="container">
                    <div className="nav-menu">
                        {items.map((item, index) => (
                            <NavMenu 
                                key={index}
                                title={item.title} 
                                items={item.content}
                            />
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;