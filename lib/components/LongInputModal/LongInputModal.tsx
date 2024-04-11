import React, { useRef } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import styles from './LongInputModal.module.css';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: (value: string) => void;
  defaultValue: string;
}

const LongInputModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  defaultValue
}) => {
  const modalRef = useRef<HTMLTextAreaElement>(null);

  const handleClose = () => {
    onRequestClose(modalRef.current?.value || '');
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
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column'
              }}
            >
              <h3>Write extensively:</h3>
              <textarea
                id="my-textarea"
                rows={20}
                cols={80}
                ref={modalRef}
                className={styles.textInput}
                defaultValue={defaultValue}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LongInputModal;
