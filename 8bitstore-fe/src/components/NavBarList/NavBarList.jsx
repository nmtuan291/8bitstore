import { useState } from 'react';
import './NavBarList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


const NavBarList = ({ title, items }) => {
    const [mouseEnter, setMouseEnter] = useState(false);
    const [itemIndex, setItemIndex] = useState(null);

    const handleMouseOut = (event) => {
        if (!event.target.matches('.navlist__container')) {
            setMouseEnter(false);
        }
    }
    
    return (
         <div 
         className='navlist__container'
         onMouseOver={() => setMouseEnter(true)}
         onMouseOut={handleMouseOut}
        >
         <a 
             href="/"
             className='title'
         >{title} <FontAwesomeIcon icon={faCaretDown}/></a>
         {
             <ul className={`navlist__items ${!mouseEnter && "hide"}`}>
                 {items.map((item, index) => 
                     <li key={`item_${index}`} >
                         {item.category}
                         
                     </li>)}
                 {mouseEnter ? console.log("true") : console.log(false)}
             </ul>
         }
     </div>
    );
}

export default NavBarList;