import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Toast from '../components/Toast';

interface ToastState {
  message: string;
  type: "success" | "error" | "info" | "cart" | "wishlist";
  isVisible: boolean;
  id: number;
}

interface ToastContextType {
  showToast: (message: string, type: ToastState['type']) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showCartToast: (message: string) => void;
  showWishlistToast: (message: string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: ToastState['type'] = 'info') => {
    const id = Date.now();
    setToast({
      message,
      type,
      isVisible: true,
      id
    });
  };

  const hideToast = () => {
    setToast(null);
  };

  const showSuccess = (message: string) => showToast(message, 'success');
  const showError = (message: string) => showToast(message, 'error');
  const showInfo = (message: string) => showToast(message, 'info');
  const showCartToast = (message: string) => showToast(message, 'cart');
  const showWishlistToast = (message: string) => showToast(message, 'wishlist');

  return (
    <ToastContext.Provider value={{
      showToast,
      hideToast,
      showSuccess,
      showError,
      showInfo,
      showCartToast,
      showWishlistToast
    }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}; 