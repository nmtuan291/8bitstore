import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MobileMenu.scss";
import { BlobOptions } from "buffer";
import { User } from "../../../interfaces/interfaces";
import { DOM } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping, faUser, faBars} from "@fortawesome/free-solid-svg-icons";

interface MobileMenuProps {
  user: User | null;
  isVisible: boolean,
  setIsVisible: (visible: boolean) => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ user, isVisible, setIsVisible}) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const openMenu = () => {
    setIsVisible(true);
  }

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  }

  useEffect(() => {
    const overlay = document.querySelector(".mobile-overlay");

    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    overlay?.addEventListener("click", handleClick);

    return () => {
      overlay?.removeEventListener("click", handleClick);
    };
  }, [])

  // useEffect(() => {
  //   openMenu();
  //   setTimeout(closeMenu, 5000);
  //   setTimeout(openMenu, 7000);
  // }, [])


  
  return (
    <div className={`mobile-overlay ${isVisible ? "" : "hidden"}`}>
      <div className={`menu-container ${
          isClosing ? "slide-out" : isVisible ? "slide-in" : "" }`}
          ref={ref}>
        <ul>
          <li>
            <FontAwesomeIcon icon={faUser} className="icon"/>
            Tài khoản
          </li>
          <li>
            <FontAwesomeIcon icon={faCartShopping} className="icon"/>
            Giỏ hàng
          </li>
          <li>
            <FontAwesomeIcon icon={faHeart} className="icon"/>
            Wishlist
          </li>
        </ul>
        <ul className="product-menu">
          <li>Sản phẩm bán chạy</li>
          <li>
            Playstation
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polyline points="4,6 8,10 12,6" fill="none" stroke="#85BDB6" stroke-width="2"/>
            </svg>
          </li>
          <li>
            Xbox
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polyline points="4,6 8,10 12,6" fill="none" stroke="#85BDB6" stroke-width="2"/>
            </svg>
          </li>
          <li>
            Nintendo
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polyline points="4,6 8,10 12,6" fill="none" stroke="#85BDB6" stroke-width="2"/>
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
