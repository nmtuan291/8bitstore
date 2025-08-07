import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MobileMenu.scss";
import { User } from "../../../interfaces/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping, faUser, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

interface MobileMenuProps {
  user: User | null;
  isVisible: boolean,
  setIsVisible: (visible: boolean) => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ user, isVisible, setIsVisible}) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

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

  // User avatar initials
  const getInitials = (name: string) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2);
  };
  
  return (
    <div className={`mobile-overlay ${isVisible ? "" : "hidden"}`}>
      <div className={`menu-container ${isClosing ? "slide-out" : isVisible ? "slide-in" : "" }`} ref={ref}>
        <button className="close-btn" onClick={closeMenu} aria-label="Đóng menu">
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="user-info">
          {user ? (
            <>
              <div className="avatar">{getInitials(user.fullName || user.userName)}</div>
              <span className="user-name">{user.fullName || user.userName}</span>
            </>
          ) : (
            <span className="login-signup" onClick={() => { closeMenu(); navigate('/login'); }}>
              Đăng nhập / Đăng ký
            </span>
          )}
        </div>
        <ul>
          <li onClick={() => { closeMenu(); navigate(user ? '/profile/detail' : '/login'); }}>
            <FontAwesomeIcon icon={faUser} className="icon"/>
            Tài khoản
          </li>
          <li onClick={() => { closeMenu(); navigate('/cart'); }}>
            <FontAwesomeIcon icon={faCartShopping} className="icon"/>
            Giỏ hàng
          </li>
          <li onClick={() => { closeMenu(); navigate('/wishlist'); }}>
            <FontAwesomeIcon icon={faHeart} className="icon"/>
            Wishlist
          </li>
        </ul>
        <ul className="product-menu">
          <li onClick={() => { closeMenu(); navigate('/product?sort=best-seller'); }}>Sản phẩm bán chạy</li>
          <li>
            Playstation
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polyline points="4,6 8,10 12,6" fill="none" stroke="#85BDB6" strokeWidth="2"/>
            </svg>
          </li>
          <li>
            Xbox
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polyline points="4,6 8,10 12,6" fill="none" stroke="#85BDB6" strokeWidth="2"/>
            </svg>
          </li>
          <li>
            Nintendo
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polyline points="4,6 8,10 12,6" fill="none" stroke="#85BDB6" strokeWidth="2"/>
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
