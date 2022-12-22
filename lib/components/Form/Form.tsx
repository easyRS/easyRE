import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';
import IProperty from '../../domain/entities/IProperty';
import Button from '../Button/Button';
import CoordinatesInput from './CoordinatesInput/CoordinatesInput';
import styles from './Form.module.css';

type FormProps = {
  formFields: ModelKeys;
  successRedirect: string;
  editObj?: IEntity;
  form?: UseFormReturn;
  onSubmit?: (data: IEntity) => void;
  canDelete: boolean;
  callbacks: {
    createCallback: (data: IEntity) => void;
    updateCallback: (data: IEntity) => void;
    deleteCallback: (data: IEntity) => void;
  };
};
const Form: NextPage<FormProps> = (propertiesProps: FormProps) => {
  const _form = useForm();
  const form = propertiesProps.form ? propertiesProps.form : _form;
  const { register, handleSubmit } = form;
  const router = useRouter();
  const { editObj, callbacks, canDelete, onSubmit } = propertiesProps;
  const { createCallback, updateCallback, deleteCallback } = callbacks;

  const _defaultOnSubmit = async (data: IEntity) => {
    if (editObj) await updateCallback(data);
    else await createCallback(data);
    router.push(propertiesProps.successRedirect);
  };

  const _onSubmit = async (data: FieldValues) => {
    const _data = data as IEntity;
    if (onSubmit) return onSubmit({ ...editObj, ..._data });

    await _defaultOnSubmit(_data);

    return 0; // eslint rule
  };

  const onDelete = async () => {
    if (editObj) {
      await deleteCallback(editObj as IEntity);
      router.push(propertiesProps.successRedirect);
    }
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
        onSubmit={handleSubmit(_onSubmit)}
      >
        {editableFields.map((fieldData) => {
          const { type, name } = fieldData;
          if (type === 'coordinates') {
            const property = editObj as IProperty;
            let coordinates: Coordinates = {
              latitude: 0,
              longitude: 0
            };

            if (property && property.coordinates) {
              const array = property.coordinates as number[];
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
          const defaultValue = editObj
            ? (editObj[
                name as keyof IEntity
              ] as unknown as string) /* eslint-disable-line*/
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
              <label htmlFor={fieldData.name}>{fieldData.display_value}</label>
              <input
                type={fieldData.type}
                className={styles.textInput}
                {...register(name, { required: true })}
                defaultValue={defaultValue}
              />
            </div>
          );
        })}
        <input className={styles.submitButton} type="submit" />
        {canDelete && editObj && (
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
