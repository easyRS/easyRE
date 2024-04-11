/* eslint-disable */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FieldValues, UseFormReturn, useForm } from 'react-hook-form';
import IProperty from '../../domain/entities/IProperty';
import DeleteModal from '../DeleteModal/DeleteModal';
import LongInputModal from '../LongInputModal/LongInputModal';
import ActionBar from './ActionBar/ActionBar';
import CoordinatesInput from './CoordinatesInput/CoordinatesInput';
import styles from './Form.module.css';
import Multiline from './MultilineInput/MultilineInput';
import Password from './PasswordInput/Password';
import Readonly from './ReadonlyInput/ReadonlyInput';
import StandardInput from './StandardInput/StandardInput';
import State from './StateInput/StateInput';

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

// TODO: format this code!
const Form: NextPage<FormProps> = (propertiesProps: FormProps) => {
  const [longTextModalIsOpen, setIsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [multilineName, setMultilineName] = useState('');
  const [multilineValue, setMultilineValue] = useState('');

  const _form = useForm();
  const form = propertiesProps.form ? propertiesProps.form : _form;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form;

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

  const toggleDeletePopup = async () => {
    setConfirmDelete(!confirmDelete);
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
    setMultilineValue(values[name]);
  };

  const closeModal = (value: string) => {
    const { reset } = form;
    const values = form.getValues() as Record<string, unknown>;

    reset({
      ...values,
      [multilineName]: value
    });
    setMultilineName('');
    setMultilineValue('');
    setIsOpen(false);
  };

  const editableFields = propertiesProps.formFields.editables;
  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit(_onSubmit)}>
        {editableFields.map((fieldData) => {
          const { type, options } = fieldData;

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
                errors={errors}
                form={form}
              />
            );
          }

          if (type === 'readonly')
            return <Readonly fieldData={fieldData} editObj={editObj} />;

          if (type === 'state' && options)
            return (
              <State
                fieldData={fieldData}
                editObj={editObj}
                options={options}
                form={form}
              />
            );

          if (type === 'password')
            return (
              <Password fieldData={fieldData} editObj={editObj} form={form} />
            );

          if (type === 'multiline')
            return (
              <Multiline
                openModal={openModal}
                fieldData={fieldData}
                editObj={editObj}
                form={form}
              />
            );

          return (
            <StandardInput
              fieldData={fieldData}
              editObj={editObj}
              form={form}
              errors={errors}
            />
          );
        })}
        <ActionBar
          canDelete={canDelete}
          editObj={editObj}
          toggleDeletePopup={toggleDeletePopup}
          submitTitle={_submitTitle}
        />
      </form>
      <div>
        <LongInputModal
          isOpen={longTextModalIsOpen}
          onRequestClose={closeModal}
          defaultValue={multilineValue}
        />
        <DeleteModal
          onDelete={onDelete}
          confirmDelete={confirmDelete}
          toggleDeletePopup={toggleDeletePopup}
        />
      </div>
    </div>
  );
};

export default Form;
