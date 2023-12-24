/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

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
