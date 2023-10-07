import React from 'react';
import { Toast, ToastType } from 'hooks/useToast';
import {
  ErrorToast,
  NeutralToast,
  NotificationToast,
  SuccessToast,
  ToastsContainer
} from './style';

interface ToastProps {
  toasts: Toast[];
}

// TODO: strict typing
const toastTypes: Record<ToastType, any> = {
  success: SuccessToast,
  error: ErrorToast,
  neutral: NeutralToast,
  info: NotificationToast
};

const Toasts: React.FC<ToastProps> = ({ toasts }) => {
  if (!toasts || toasts.length === 0) {
    return null;
  }
  return (
    <ToastsContainer>
      {toasts.map(toast => {
        const ToastComponent = toastTypes[toast.type];
        return <ToastComponent key={toast.id}>{toast.message}</ToastComponent>;
      })}
    </ToastsContainer>
  );
};

export default Toasts;
