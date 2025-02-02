import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import './NavBar.css'
import NavBarListTest from "../NavBarList/NavBarListTest";

const NavBar = () => {
    const [ searchText, setSearchText ] = useState('');
    const logo = "8BITSTORE";
    const logoArray = logo.split();
    const handleSearchBoxChange = (e) => {
        setSearchText(e.target.value);
    }
    return (
        <nav className="navbar">
            <div className="navbar__first-row">
                <div>
                {
                    logoArray.map((character, index)=> <span id={`char_${index}`} className="logo-characters">{character}</span>)
                }    

                </div>
                    <input 
                        className="navbar__search" 
                        type="text" 
                        onChange= {(e) => handleSearchBoxChange(e)} 
                        value={searchText}/>
                    <div className="navbar__icons">
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>
            <div className="navbar__second-row">
                <NavBarListTest></NavBarListTest>
            </div>
            
        </nav>
    );
};

export default NavBar;