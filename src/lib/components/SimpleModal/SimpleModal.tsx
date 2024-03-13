import React from 'react';
import { FaWindowClose } from 'react-icons/fa';
import styles from './SimpleModal.module.css';

interface SimpleModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = ({
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

export default SimpleModal;
