/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React, { useState } from 'react';

import Toasts from 'components/Toast';

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
