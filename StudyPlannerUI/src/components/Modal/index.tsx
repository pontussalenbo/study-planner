import React, { useRef, useEffect, useState } from 'react';
import { ReactComponent as CloseIcon } from 'assets/close-round-icon.svg';
import { ModalDialog, CloseButton } from './style';

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
