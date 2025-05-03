import "./Toast.scss";

interface ToastType {
  message: string,
  type: "success" | "failure" | "alert"
}

interface ToastProps {
  
}

const Toast: React.FC<ToastProps> = () => {
  return (
    <div className="toast-container">
      <div className="toastBox success">
        {message}
      </div>
      <div className="toastBox success">
        {message}
      </div>
    </div>
  )
}

export default Toast;