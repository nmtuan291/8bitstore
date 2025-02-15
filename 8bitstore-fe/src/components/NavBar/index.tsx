import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
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

interface NavBarProps {
    onUserClick: () => void,
}

const NavBar: React.FC<NavBarProps> = ({ onUserClick }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [ searchText, setSearchText ] = useState<string>('');
    const [ hoverStatus, setHoverStatus ] = useState<HoverStatus>({
        wishlist: false,
        cart: false,
        user: false
    })

    console.log(hoverStatus.user);
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
            if (!user) {
                navigate("/login")
            }
        },

        wishlistClick: () => {
            if (!user) {
                navigate("/login")
            }
        }
    };
    

    return (
        <nav className="navbar">
            <div className="navbar-info">
                
            </div>
            <div className="navbar__first-row">
                <img src={logo} className="navbar__logo"/>
                <input 
                        className="navbar__search" 
                        type="text" 
                        onChange= {(e) => handleSearchBoxChange(e)} 
                        value={searchText}/>
                <div className="navbar__icons">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faHeart} 
                        className="icon"
                        onMouseOver={() => handleMouseOver("wishlist")}
                        onMouseOut={() => handleMouseOut("wishlist")}/>
                        <div className={`icon-pop triangle ${!hoverStatus.wishlist ? 'hide' : ''}`}>
                            <span>Yêu thích</span>
                        </div>
                    </div>
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCartShopping} 
                        className="icon"
                        onMouseOver={() => handleMouseOver("cart")}
                        onMouseOut={() => handleMouseOut("cart")}/>
                        <div className={`icon-pop triangle ${!hoverStatus.cart ? 'hide' : ''}`}>
                            <span>Giỏ hàng</span>
                        </div>
                    </div>
                    
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faUser} 
                        className="icon"
                        onMouseOver={() => handleMouseOver("user")}
                        onMouseOut={() => handleMouseOut("user")}
                        onClick={handleProfileClick}/>
                        <div className={`icon-pop triangle ${!hoverStatus.user ? 'hide' : ''}`}>
                            <span>Đăng nhập</span>
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