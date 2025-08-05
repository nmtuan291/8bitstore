import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Modal.scss";

interface ModalProps {
  message: string;
  confirm: () => void;
  cancel: () => void;
  type?: "warning" | "success" | "error";
  confirmText?: string;
  cancelText?: string;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  message, 
  confirm, 
  cancel, 
  type = "warning",
  confirmText = "Đồng ý",
  cancelText = "Hủy",
  title
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancel();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [cancel]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FontAwesomeIcon icon={faCheckCircle} className="modal-icon success" />;
      case "error":
        return <FontAwesomeIcon icon={faExclamationTriangle} className="modal-icon error" />;
      default:
        return <FontAwesomeIcon icon={faExclamationTriangle} className="modal-icon warning" />;
    }
  };

  const getTitle = () => {
    if (title) return title;
    switch (type) {
      case "success":
        return "Thành công";
      case "error":
        return "Lỗi";
      default:
        return "Xác nhận";
    }
  };

  return (
    <div className="modal-overlay" onClick={cancel}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            {getIcon()}
            <h3>{getTitle()}</h3>
          </div>
          <button className="modal-close" onClick={cancel}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="modal-content">
          <p>{message}</p>
        </div>
        
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={cancel}>
            {cancelText}
          </button>
          <button className={`btn btn-primary btn-${type}`} onClick={confirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;