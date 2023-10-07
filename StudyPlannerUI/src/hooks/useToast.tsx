import Toasts from 'components/Toast';
import React, { useState } from 'react';

export interface ToastContext {
  toasts: Toast[];
  showToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: number) => void;
}

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}

export type ToastType = 'success' | 'error' | 'neutral' | 'info';

const ToastContext = React.createContext<ToastContext | undefined>(undefined);

export function useToastContext() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('Toast Context must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType, duration = 5) => {
    const toast = {
      id: Date.now(),
      message,
      type,
      duration
    };

    setToasts(prevToasts => [...prevToasts, toast]);

    setTimeout(() => {
      removeToast(toast.id);
    }, duration * 1000);
  };

  const removeToast = (id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  const contextValue = {
    toasts,
    showToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={contextValue}>
      <>
        <Toasts toasts={toasts} />
        {children}
      </>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
