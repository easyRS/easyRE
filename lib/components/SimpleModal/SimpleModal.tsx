import Image from 'next/image';
import React from 'react';
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

export default SimpleModal;
