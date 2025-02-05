import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import './NavBar.css'
import NavBarListTest from "../NavBarList/NavBarListTest";
import logo from "./8bitstore-logo.png";

const NavBar = () => {
    const [ searchText, setSearchText ] = useState('');

    const handleSearchBoxChange = (e) => {
        setSearchText(e.target.value);
    }
    return (
        <nav className="navbar">
            <div className="navbar__first-row">
            <div className="navbar-logo-container">
                <img src={logo} className="navbar__logo"/>
                <input 
                        className="navbar__search" 
                        type="text" 
                        onChange= {(e) => handleSearchBoxChange(e)} 
                        value={searchText}/>
            </div>
                   
                    <div className="navbar__icons">
                        <FontAwesomeIcon icon={faHeart} />
                        <FontAwesomeIcon icon={faHeart} />
                        <FontAwesomeIcon icon={faHeart} />
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