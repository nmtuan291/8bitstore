import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useCart } from "../../contexts/CartProvider";
import logo from "@/assets/logo/8bitstore-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping, faUser, faBars} from "@fortawesome/free-solid-svg-icons";
import NavMenu from "./NavMenu";
import axios from "../../apis/axios";
import { items } from "./MenuItem";
import './NavBar.scss'


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
    const { user, isLoading } = useAuth();
    const [ searchText, setSearchText ] = useState<string>('');
    const [ hoverStatus, setHoverStatus ] = useState<HoverStatus>({
        wishlist: false,
        cart: false,
        user: false
    })
    const { cart } = useCart();
    const [suggestion, setSuggestion] = useState<string[]>([]);
    const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

    const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newText = e.target.value;
        setSearchText(newText);

        if (newText.length <= 2 ) {
            setSuggestion([]);
            setShowSuggestion(false);
        } else {
            setShowSuggestion(true);
            getSuggestion(newText);
        }
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
                navigate("/profile/detail")
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

    const getSuggestion = async (text: string) => {
        try {
            const response = await axios.get("api/Product/get-suggestion", {
                params: {
                    query: text
                }
            })
            if (response.status == 200) {
                setSuggestion(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearchClick = (name: string) => {
        setSearchText(name);
        navigate(`/product?productName=${encodeURIComponent(name)}`);
        setShowSuggestion(false);
    };
    

    return (
        <nav className="navbar">
            <div className="navbar-info">
                
            </div>
            <div className="navbar__first-row">
                <img src={logo} className="navbar__logo" onClick={() => navigate("/")}/>
                <div className="navbar__search">
                    <input 
                        type="text" 
                        onChange= {(e) => handleSearchBoxChange(e)} 
                        value={searchText}/>
                    {
                        showSuggestion &&
                        <div className="search-suggestion">
                            <ul>
                                {
                                    suggestion.map(name => <li onClick={() => handleSearchClick(name)}>{name}</li>)
                                }
                            </ul>
                        </div>
                    }
                </div>
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
                        {
                            cart.length > 0 &&
                            <div className="cart-count">
                                <span>{cart.length}</span>
                            </div>
                        }
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

                    <div className="icon-container">
                        <FontAwesomeIcon icon={faBars} 
                        className="sm-icon"
                        onClick={() => displayMobile()}/>
                    </div>
                </div>
            </div>
            <div className="navbar__second-row">
                {items.map(item => <NavMenu title={item.title} items={item.content}/>)}
            </div>
            
        </nav>
    );
};

export default NavBar;