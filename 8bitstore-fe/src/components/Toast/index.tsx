import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamationTriangle, faInfoCircle, faTimes, faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Toast.scss";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info" | "cart" | "wishlist";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 5000 
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onClose();
          setIsExiting(false);
        }, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: faCheck,
          className: "toast-success"
        };
      case "error":
        return {
          icon: faExclamationTriangle,
          className: "toast-error"
        };
      case "info":
        return {
          icon: faInfoCircle,
          className: "toast-info"
        };
      case "cart":
        return {
          icon: faShoppingCart,
          className: "toast-cart"
        };
      case "wishlist":
        return {
          icon: faHeart,
          className: "toast-wishlist"
        };
      default:
        return {
          icon: faInfoCircle,
          className: "toast-info"
        };
    }
  };

  if (!isVisible) return null;

  const config = getToastConfig();

  return (
    <div className={`toast-container ${isExiting ? 'exiting' : ''}`}>
      <div className={`toast ${config.className} ${isExiting ? 'slide-out' : 'slide-in'}`}>
        <div className="toast-icon">
          <FontAwesomeIcon icon={config.icon} />
        </div>
        <div className="toast-content">
          <span className="toast-message">{message}</span>
        </div>
        <button className="toast-close" onClick={() => {
          setIsExiting(true);
          setTimeout(() => {
            onClose();
            setIsExiting(false);
          }, 300);
        }}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default Toast;