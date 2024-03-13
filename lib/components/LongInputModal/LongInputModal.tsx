import React from 'react';
import styles from './LongInputModal.module.css';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const LongInputModal: React.FC<ModalProps> = ({ isOpen, children }) => {
  return (
    <div>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default LongInputModal;
