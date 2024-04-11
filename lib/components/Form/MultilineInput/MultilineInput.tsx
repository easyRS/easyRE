import type { NextPage } from 'next';
import { UseFormReturn } from 'react-hook-form';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import styles from './MultilineInput.module.css';

type MultilineProps = {
  openModal: (name: /* eslint-disable */ any) => void;
  fieldData: FieldData;
  editObj: IEntity | undefined;
  form: UseFormReturn;
};

const MultilineInput: NextPage<MultilineProps> = (props: MultilineProps) => {
  const { openModal, fieldData, editObj, form } = props;
  const { name, isRequired } = fieldData;

  const { register } = form;
  const openMultiline = () => {
    openModal(name);
  };

  const defaultValue =
    editObj && /* eslint-disable */ editObj[name]
      ? (editObj[name as keyof IEntity] as unknown as string)
      : '';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
        flexDirection: 'column',
        textAlign: 'left',
        marginBottom: '12px'
      }}
    >
      <label htmlFor={fieldData.name} className={styles.labelTitle}>
        {fieldData.display_value}
      </label>
      <div
        style={{
          position: 'relative'
        }}
      >
        {' '}
        <textarea
          id="my-textarea"
          rows={4}
          cols={40}
          className={styles.textInput}
          {...register(name, { required: isRequired })}
          defaultValue={defaultValue}
        />
        <FaExpandArrowsAlt
          style={{
            position: 'absolute',
            margin: '0.6rem',
            top: '0',
            right: '0',
            zIndex: '1'
          }}
          title={name}
          onClick={openMultiline}
        />
      </div>
    </div>
  );
};

export default MultilineInput;
