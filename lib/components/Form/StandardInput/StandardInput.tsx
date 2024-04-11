import type { NextPage } from 'next';
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form';
import styles from './StandardInput.module.css';

type StandardInputProps = {
  fieldData: FieldData;
  editObj: IEntity | undefined;
  errors: FieldErrors<FieldValues>;
  form: UseFormReturn;
};

const StandardInput: NextPage<StandardInputProps> = (
  props: StandardInputProps
) => {
  const { fieldData, editObj, errors, form } = props;
  const { name, isRequired } = fieldData;
  const { register } = form;

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
      <input
        type={fieldData.type}
        className={styles.textInput}
        {...register(name, { required: isRequired })}
        defaultValue={defaultValue}
      />
      {errors[name] && <p>This is required</p>}
    </div>
  );
};

export default StandardInput;
