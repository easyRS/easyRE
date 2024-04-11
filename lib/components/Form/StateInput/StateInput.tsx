import type { NextPage } from 'next';
import { UseFormReturn } from 'react-hook-form';
import styles from './StateInput.module.css';

type StateProps = {
  fieldData: FieldData;
  editObj: IEntity | undefined;
  form: UseFormReturn;
  options: string[];
};

const State: NextPage<StateProps> = (props: StateProps) => {
  const { fieldData, editObj, form, options } = props;
  const { name, isRequired } = fieldData;

  const { register } = form;
  const defaultValue =
    editObj && /* eslint-disable */ editObj[name]
      ? (editObj[name as keyof IEntity] as unknown as string)
      : '';

  return (
    <div
      style={{
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
        flexDirection: 'column',
        textAlign: 'left'
      }}
    >
      <label htmlFor={fieldData.name} className={styles.labelTitle}>
        {`${fieldData.display_value}:`}
      </label>
      <select
        {...register(name, { required: isRequired })}
        defaultValue={defaultValue}
        style={{
          backgroundColor: 'white',
          minWidth: '6rem',
          borderColor: '0.134rem var(--primary-dark)',
          borderRadius: 'var(--border-radius-container)',
          padding: '8px 15px',
          fontSize: 'var(--button-font-size)'
        }}
      >
        {' '}
        {options.map((optionValue) => (
          <option value={optionValue} selected={defaultValue === optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default State;
