import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { FaExpandArrowsAlt, FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';
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
  submitTitle?: string;
  canDelete: boolean;
  callbacks: {
    createCallback: (data: IEntity) => void;
    updateCallback: (data: IEntity) => void;
    deleteCallback: (data: IEntity) => void;
  };
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

// TODO: format this code!
const Form: NextPage<FormProps> = (propertiesProps: FormProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLTextAreaElement>(null);
  const [multilineName, setMultilineName] = useState('');
  const [multilineValue, setMultilineValue] = useState('');

  const _form = useForm();
  const form = propertiesProps.form ? propertiesProps.form : _form;
  const { register, handleSubmit } = form;
  const router = useRouter();
  const { editObj, callbacks, canDelete, onSubmit, submitTitle } =
    propertiesProps;
  const { createCallback, updateCallback, deleteCallback } = callbacks;
  const _submitTitle = submitTitle || 'SUBMIT';

  const _defaultOnSubmit = async (data: IEntity) => {
    if (editObj) await updateCallback({ ...editObj, ...data });
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

  const openModal = (name) => {
    const values = form.getValues();

    setIsOpen(true);
    setMultilineName(name);
    setMultilineValue(values[name]); /* eslint-disable-line*/
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    const { reset } = form;
    const values = form.getValues() as Record<string, unknown>;

    reset({
      ...values,
      [multilineName]: modalRef.current?.value
    });
    setMultilineName('');
    setMultilineValue('');
    setIsOpen(false);
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
          textAlign: 'left',
          borderRadius: '1rem'
        }}
        onSubmit={handleSubmit(_onSubmit)}
      >
        {editableFields.map((fieldData) => {
          const { type, name, options } = fieldData;
          if (type === 'coordinates') {
            const property = editObj as IProperty;
            const coordinates =
              property && property.coordinates
                ? (property.coordinates as number[])
                : [0, 0];
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

          if (type === 'readonly') {
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
                <label htmlFor={fieldData.name}>
                  {`${fieldData.display_value}:`}
                </label>
                <label htmlFor={fieldData.name}>{defaultValue}</label>
              </div>
            );
          }

          if (type === 'state' && options) {
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
                <label htmlFor={fieldData.name}>
                  {`${fieldData.display_value}:`}
                </label>
                <select
                  {...register(name, { required: true })}
                  defaultValue={defaultValue}
                >
                  {' '}
                  {options.map((optionValue) => (
                    <option
                      value={optionValue}
                      selected={defaultValue === optionValue}
                    >
                      {optionValue}
                    </option>
                  ))}
                </select>
              </div>
            );
          }
          if (type === 'multiline') {
            const openMultiline = () => {
              openModal(name);
            };
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
                <label htmlFor={fieldData.name}>
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
                    rows="4"
                    cols="40"
                    className={styles.textInput}
                    {...register(name, { required: true })}
                    defaultValue={defaultValue}
                  />
                  <FaExpandArrowsAlt
                    style={{
                      position: 'absolute',
                      margin: '0.3rem',
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
                defaultValue={defaultValue}
              />
            </div>
          );
        })}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '1rem',
            justifyContent: canDelete && editObj ? 'space-between' : 'right'
          }}
        >
          {canDelete && editObj && (
            <Button onClick={onDelete} width="9rem">
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
            value={_submitTitle}
          />
        </div>
      </form>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
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
              defaultValue={multilineValue}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Form;
