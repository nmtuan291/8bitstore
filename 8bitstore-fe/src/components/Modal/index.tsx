import "./Modal.scss";

interface ModalProps {
  message: string,
  confirm: () => void,
  cancel: () => void
}

const Modal: React.FC<ModalProps> = ({ message, confirm, cancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p>{message}</p>
        <div className="modal-btn">
          <button className="confirm" onClick={() => confirm()}>Đồng ý</button>
          <button className="cancel" onClick={() => cancel()}>Hủy</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;