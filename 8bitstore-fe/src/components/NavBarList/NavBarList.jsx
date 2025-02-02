import { useState } from 'react';
import './NavBarList.css'

const NavBarList = ({ title, items }) => {
    const [mouseEnter, setMouseEnter] = useState(false);
    const [itemIndex, setItemIndex] = useState(null);
    return (
         <div 
         className='navlist__container'
         onMouseEnter={() => setMouseEnter(true)}
         onMouseLeave={() => setMouseEnter(false)}
        >
         <a 
             href="/"
             
         >{title}</a>
         {
             <ul className={`navlist__items ${!mouseEnter && "hide"}`}>
                 {items.map((item, index) => 
                     <li 
                         key={`item_${index}`}
                         onMouseEnter={() => setItemIndex(index)}
                         onMouseLeave={() => setItemIndex(null)} >
                         {item.category}
                         {
                              
                             <ul className={`item-own-list ${!(itemIndex === index) && "hide"}`}>
                                {item.contentList.map((content, index) => <li>{content}</li>)}
                             </ul>
                         }
                     </li>)}
                 {mouseEnter ? console.log("true") : console.log(false)}
             </ul>
         }
     </div>
    );
}

export default NavBarList;