import React from 'react';
import Button from '../Button/Button';
import SimpleModal from '../SimpleModal/SimpleModal';

interface DeleteModalProps {
  onDelete: () => Promise<void>;
  confirmDelete: boolean;
  toggleDeletePopup: () => Promise<void>;
}

const DeleteModal: React.FC<DeleteModalProps> = (props: DeleteModalProps) => {
  const { confirmDelete, toggleDeletePopup, onDelete } = props;
  return (
    <SimpleModal isOpen={confirmDelete} onRequestClose={toggleDeletePopup}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column'
        }}
      >
        <h4>Are you sure you want to delete this?</h4>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Button onClick={toggleDeletePopup} width="5rem" type="tertiary">
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center'
              }}
            >
              Cancel
            </div>
          </Button>

          <Button onClick={onDelete} width="5rem" type="secondary">
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center'
              }}
            >
              Delete
            </div>
          </Button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default DeleteModal;
