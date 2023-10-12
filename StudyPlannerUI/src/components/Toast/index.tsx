import { Toast, ToastType } from 'hooks/useToast';
import {
  ErrorToast,
  NeutralToast,
  NotificationToast,
  SuccessToast,
  ToastsContainer
} from './style';
import { FC } from 'react';
interface ToastProps {
  toasts: Toast[];
}

type ReactComponent = React.ComponentType<{ children: React.ReactNode }>;

const toastTypes: Record<ToastType, ReactComponent> = {
  success: SuccessToast,
  error: ErrorToast,
  neutral: NeutralToast,
  info: NotificationToast
};

const Toasts: FC<ToastProps> = ({ toasts }) => {
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
