import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';
import Button from '../Button/Button';
import CoordinatesInput from './CoordinatesInput/CoordinatesInput';
import styles from './Form.module.css';

type FormProps = {
  formFields: ModelKeys;
  successRedirect: string;
  editObj?: Record<string, unknown>;
};
const Form: NextPage<FormProps> = (propertiesProps: FormProps) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { editObj } = propertiesProps;

  const onSubmit = async (data: Record<string, unknown>) => {
    const { latitude, longitude } = data;

    await fetch('/api/properties', {
      method: editObj ? 'PUT' : 'POST',
      body: JSON.stringify({
        ...data,
        coordinates: `${latitude},${longitude}`
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    router.push(propertiesProps.successRedirect);
  };

  const onDelete = async () => {
    await fetch('/api/properties', {
      method: 'DELETE',
      body: JSON.stringify(editObj),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    router.push(propertiesProps.successRedirect);
  };

  const editableFields = propertiesProps.formFields.editables;
  return (
    <div>
      <form
        style={{
          padding: '2rem',
          maxWidth: '500px',
          margin: '0 auto',
          background: 'white',
          textAlign: 'left'
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {editableFields.map((fieldData) => {
          const { type, name } = fieldData;
          if (type === 'coordinates') {
            let coordinates: Coordinates;
            if (editObj && editObj.coordinates) {
              const array = editObj.coordinates as number[];
              coordinates = {
                latitude: array[0],
                longitude: array[1]
              };
            }
            return (
              <CoordinatesInput
                register={register}
                fieldData={fieldData}
                defaultCoordinates={coordinates}
              />
            );
          }

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
              <label htmlFor={fieldData.name}>{fieldData.display_value}</label>
              <input
                type={fieldData.type}
                className={styles.textInput}
                {...register(name, { required: true })}
                defaultValue={
                  editObj
                    ? (editObj[name] as string) /* eslint-disable-line*/
                    : ''
                }
              />
            </div>
          );
        })}
        <input className={styles.submitButton} type="submit" />
        {editObj && (
          <Button onClick={onDelete}>
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
      </form>
    </div>
  );
};

export default Form;
