import React from 'react';

import Image from 'next/image';
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
            <Image
              src="/images/logo.png"
              style={{
                marginLeft: '20px',
                width: '4rem',
                height: '3.6rem',
                cursor: 'pointer'
              }}
              alt="My Image"
              width={300}
              height={300}
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
