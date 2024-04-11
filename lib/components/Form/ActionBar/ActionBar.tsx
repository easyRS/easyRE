import type { NextPage } from 'next';
import { FaTrashAlt } from 'react-icons/fa';
import Button from '../../Button/Button';
import styles from './ActionBar.module.css';

type ReadonlyProps = {
  canDelete: boolean;
  editObj: IEntity | undefined;
  toggleDeletePopup: () => Promise<void>;
  submitTitle: string;
};

const ActionBar: NextPage<ReadonlyProps> = (props: ReadonlyProps) => {
  const { editObj, canDelete, toggleDeletePopup, submitTitle } = props;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '1rem',
        justifyContent: canDelete && editObj ? 'space-between' : 'right'
      }}
    >
      {canDelete && editObj && (
        <Button onClick={toggleDeletePopup} width="9rem">
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center'
            }}
          >
            <FaTrashAlt />
            DELETE
          </div>
        </Button>
      )}
      <input
        className={styles.submitButton}
        type="submit"
        value={submitTitle}
      />
    </div>
  );
};

export default ActionBar;
