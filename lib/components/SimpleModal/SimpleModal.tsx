import React from 'react';
import styles from './SimpleModal.module.css';

interface SimpleModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ isOpen, children }) => {
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

export default SimpleModal;
