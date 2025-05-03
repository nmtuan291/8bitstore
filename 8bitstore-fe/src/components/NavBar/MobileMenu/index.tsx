import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MobileMenu.scss";
import { BlobOptions } from "buffer";
import { User } from "../../../interfaces/interfaces";

interface MobileMenuProps {
  user: User | null;
}

const MobileMenu: React.FC<MobileMenuProps> = (user) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const navigate = useNavigate();

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

  // useEffect(() => {
  //   openMenu();
  //   setTimeout(closeMenu, 5000);
  //   setTimeout(openMenu, 7000);
  // }, [])


  
  return (
    <div className={`mobile-overlay ${isVisible ? "" : "hidden"}`}>
      <div className={`menu-container ${
          isClosing ? "slide-out" : isVisible ? "slide-in" : "" }`}>
        <ul>
          <li>Tài khoản</li>
          <li>Giỏ hàng</li>
          <li>Wishlist</li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
