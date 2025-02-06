import { useState } from "react";
import logo from "./8bitstore-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping, faUser} from "@fortawesome/free-solid-svg-icons";
import './NavBar.css'
import NavBarListTest from "../NavBarList/NavBarListTest";

const NavBar = () => {
    const [ searchText, setSearchText ] = useState('');
    const [ hoverStatus, setHoverStatus ] = useState({
        wishtlist: false,
        cart: false,
        user: false
    })

    console.log(hoverStatus.user);
    const handleSearchBoxChange = (e) => {
        setSearchText(e.target.value);
    }

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
                        onMouseOver={() => setHoverStatus(prev => ({...prev, wishtlist: true}))}
                        onMouseOut={() => setHoverStatus(prev => ({...prev, wishtlist: false}))}/>
                        <div className={`icon-pop triangle ${!hoverStatus.wishtlist ? 'hide' : ''}`}>
                            <span>Yêu thích</span>
                        </div>
                    </div>
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCartShopping} 
                        className="icon"
                        onMouseOver={() => setHoverStatus(prev => ({...prev, cart: true}))}
                        onMouseOut={() => setHoverStatus(prev => ({...prev, cart: false}))}/>
                        <div className={`icon-pop triangle ${!hoverStatus.cart ? 'hide' : ''}`}>
                            <span>Giỏ hàng</span>
                        </div>
                    </div>
                    
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faUser} 
                        className="icon"
                        onMouseOver={() => setHoverStatus(prev => ({...prev, user: true}))}
                        onMouseOut={() => setHoverStatus(prev => ({...prev, user: false}))}/>
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

// const NavBar = () => {
//     const [ searchText, setSearchText ] = useState('');

//     const handleSearchBoxChange = (e) => {
//         setSearchText(e.target.value);
//     }
//     return (
//         <nav className="navbar navbar-expand-lg">
//             <div className="navbar__first-row container-fluid">
//             <img src={logo} className="navbar-brand navbar__logo"/>

//                     <input 
//                         className="navbar__search" 
//                         type="text" 
//                         onChange= {(e) => handleSearchBoxChange(e)} 
//                         value={searchText}/>
//                     <div className="navbar__icons border">
//                         <FontAwesomeIcon icon={faHeart} />
//                     </div>
//             </div>
//             {/* <div className="navbar__second-row">
//                 <NavBarListTest></NavBarListTest>
//             </div> */}
            
//         </nav>
//     );
// };

export default NavBar;