/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as CloseIcon } from 'assets/close-round-icon.svg';

import { CloseButton, ModalDialog } from './style';

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, hasCloseBtn = true, onClose, children }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    onClose?.();
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (!modalElement) {
      return;
    }

    if (isModalOpen) {
      document.body.style.overflowY = 'hidden';
      modalElement.showModal();
    } else {
      document.body.style.overflowY = 'auto';
      modalElement.close();
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isModalOpen]);

  return (
    <ModalDialog ref={modalRef} onKeyDown={handleKeyDown}>
      {hasCloseBtn && (
        <CloseButton onClick={handleCloseModal}>
          <CloseIcon width={24} height={24} fill='gray' />
        </CloseButton>
      )}
      {children}
    </ModalDialog>
  );
};

export default Modal;
