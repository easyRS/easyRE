import React from 'react';

import { FaWindowClose } from 'react-icons/fa';
import styles from './LongInputModal.module.css';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const LongInputModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children
}) => {
  const handleClose = () => {
    onRequestClose();
  };

  return (
    <div>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <FaWindowClose
              style={{ alignSelf: 'flex-end' }}
              title="Close"
              onClick={handleClose}
            />
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default LongInputModal;
