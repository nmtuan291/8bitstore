import { useEffect, useState } from "react";
import "./Toast.scss";

interface ToastType {
  message: string,
  type: "success" | "failure" | "alert"
}

interface ToastProps {
  
}

const Toast: React.FC<ToastProps> = () => {
  const [timerCount, setTimerCount] = useState<number>(9);

  useEffect(() => {
    const timer = setInterval(() => setTimerCount(prev => Math.max(prev - 1, 0)), 1000);

    return () => clearInterval(timer);
  }, []);
  
  if (timerCount === null) {
    return null;
  }

  return (
    <div className="toast-container">
      <div className="toastBox success">
        asdasdas
      </div>
    </div>
  )
}

export default Toast;