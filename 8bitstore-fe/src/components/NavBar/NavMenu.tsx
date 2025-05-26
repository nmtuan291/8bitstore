import { useState } from 'react';
import './NavMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

type Item = {
    category: string,
    url: string
}

interface NavBarListProps {
    title: string;
    items: Item[];
}

const NavMenu: React.FC<NavBarListProps> = ({ title, items }) => {
    const [mouseEnter, setMouseEnter] = useState(false);
    const navigate = useNavigate();

    return (
         <div 
           className="navlist__container"
           onMouseEnter={() => setMouseEnter(true)}
           onMouseLeave={() => setMouseEnter(false)}
         >
            <a href="/" className="title">
                {title}
            </a>
            <ul className={`navlist__items ${mouseEnter ? "" : "hide"}`}>
                {items.map((item, index) => 
                    <li key={`item_${index}`} onClick={() => navigate(`/product?${item.url}`)}>
                        {item.category}
                    </li>
                )}
            </ul>
         </div>
    );
};

export default NavMenu;