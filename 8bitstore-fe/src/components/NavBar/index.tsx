import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import logo from "@/assets/logo/8bitstore-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping, faUser} from "@fortawesome/free-solid-svg-icons";
import './NavBar.scss'
import NavBarListTest from "./NavBarListTest";


interface HoverStatus {
    wishlist: boolean,
    cart: boolean,
    user: boolean
}

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();
    const [ searchText, setSearchText ] = useState<string>('');
    const [ hoverStatus, setHoverStatus ] = useState<HoverStatus>({
        wishlist: false,
        cart: false,
        user: false
    })

    const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchText(e.target.value);
    }

    const handleMouseOver = (iconName: string) => {
        setHoverStatus({...hoverStatus, [iconName]: true})
    } 

    const handleMouseOut = (iconName: string) => {
        setHoverStatus({...hoverStatus, [iconName]: false})
    }

    const handleIconClick = {
        profileClick: () => {
            if (!user && !isLoading) {
                navigate("/login")
            } else {
                navigate("/profile")
            }
        },

        wishlistClick: () => {
            if (user) {
                navigate("/wishlist")
            }
        },

        cartClick: () => {
            if(user) {
                navigate("/cart")
            }
        }
    };
    
    return (
        <nav className="navbar">
            <div className="navbar-info">
                
            </div>
            <div className="navbar__first-row">
                <img src={logo} className="navbar__logo" onClick={() => navigate("/")}/>
                <input 
                        className="navbar__search" 
                        type="text" 
                        onChange= {(e) => handleSearchBoxChange(e)} 
                        value={searchText}/>
                <div className="navbar__icons">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faHeart} 
                        className="icon"
                        onMouseEnter={() => handleMouseOver("wishlist")}
                        onMouseLeave={() => handleMouseOut("wishlist")}
                        onClick={handleIconClick.wishlistClick}/>
                        <div className={`icon-pop triangle ${!hoverStatus.wishlist ? 'hide' : ''}`}>
                            <span>Yêu thích</span>
                        </div>
                    </div>
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCartShopping} 
                        className="icon"
                        onMouseEnter={() => handleMouseOver("cart")}
                        onMouseLeave={() => handleMouseOut("cart")}
                        onClick={handleIconClick.cartClick}/>
                        <div className={`icon-pop triangle ${!hoverStatus.cart ? 'hide' : ''}`}>
                            <span>Giỏ hàng</span>
                        </div>
                    </div>
                    
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faUser} 
                        className="icon"
                        onMouseEnter={() => handleMouseOver("user")}
                        onMouseLeave={() => handleMouseOut("user")}
                        onClick={handleIconClick.profileClick}/>
                        <div className={`icon-pop triangle ${!hoverStatus.user ? 'hide' : ''}`}>
                            <span>{user ? "Tài khoản" : "Đăng nhập"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar__second-row">
                <NavBarListTest></NavBarListTest>
            </div>
            
        </nav>
    );
};

export default NavBar;