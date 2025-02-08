import { useState } from 'react';
import './NavMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

type Item = {
    category: string
}

interface NavBarListProps {
    title: string,
    items: Item[]
}

const NavMenu: React.FC<NavBarListProps> = ({ title, items }) => {
    const [mouseEnter, setMouseEnter] = useState(false);

    const handleMouseOut = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as Element;
        if (!target.matches('.navlist__container')) {
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
             </ul>
         }
     </div>
    );
}

export default NavMenu;