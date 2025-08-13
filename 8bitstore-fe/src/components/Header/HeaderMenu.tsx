import { useState } from 'react';
import './HeaderMenu.scss';
import { useNavigate } from 'react-router-dom';

type Item = {
    category: string,
    url: string
}

interface HeaderMenuProps {
    title: string;
    items: Item[];
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ title, items }) => {
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
            {
                items.length > 0 &&
                <ul className={`navlist__items ${mouseEnter ? "" : "hide"}`}>
                    {items.map((item, index) => 
                        <li key={`item_${index}`} onClick={() => navigate(`/product?${item.url}`)}>
                            {item.category}
                        </li>
                    )}
                </ul>
            }
            
         </div>
    );
};

export default HeaderMenu; 