import type { NextPage } from 'next';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import styles from './PasswordInput.module.css';

type PasswordProps = {
  fieldData: FieldData;
  editObj: IEntity | undefined;
  form: UseFormReturn;
};

const PasswordInput: NextPage<PasswordProps> = (props: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { fieldData, editObj, form } = props;
  const { name, isRequired } = fieldData;

  const {
    register,
    formState: { errors }
  } = form;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        textAlign: 'left'
      }}
    >
      <label htmlFor={fieldData.name} className={styles.labelTitle}>
        {fieldData.display_value}
      </label>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <input
          type={showPassword ? 'text' : 'password'}
          className={styles.textInput}
          {...register(name, { required: isRequired })}
          defaultValue={defaultValue}
        />
        {errors[name] && <p>This is required</p>}
        {showPassword ? (
          <FaRegEye
            style={{
              zIndex: '1',
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)'
            }}
            onClick={togglePasswordVisibility}
          />
        ) : (
          <FaRegEyeSlash
            style={{
              zIndex: '1',
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              cursor: 'pointer'
            }}
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
