/* eslint-disable */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import IProperty from '../../domain/entities/IProperty';
import DeleteModal from '../DeleteModal/DeleteModal';
import LongInputModal from '../LongInputModal/LongInputModal';
import ActionBar from './ActionBar/ActionBar';
import CoordinatesInput from './CoordinatesInput/CoordinatesInput';
import styles from './Form.module.css';
import FormCallbacks from './FormCallbacks';
import Multiline from './MultilineInput/MultilineInput';
import Password from './PasswordInput/Password';
import Readonly from './ReadonlyInput/ReadonlyInput';
import StandardInput from './StandardInput/StandardInput';
import State from './StateInput/StateInput';
import { FormProps } from './types';

const Form: NextPage<FormProps> = (propertiesProps: FormProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [multilineObj, setMultiline] = useState({
    name: '',
    value: '',
    isOpen: false
  });
  const form = propertiesProps.form ? propertiesProps.form : useForm();

  const {
    handleSubmit,
    formState: { errors }
  } = form;

  const router = useRouter();
  const { editObj, canDelete, submitTitle } = propertiesProps;
  const _submitTitle = submitTitle || 'SUBMIT';
  const { onSubmit, onDelete } = FormCallbacks(router, propertiesProps);

  const toggleDeletePopup = async () => {
    setConfirmDelete(!confirmDelete);
  };

  const openModal = (name) => {
    const values = form.getValues();
    setMultiline({ name: name, value: values[name], isOpen: true });
  };

  const closeModal = (value: string) => {
    const { reset } = form;
    const values = form.getValues() as Record<string, unknown>;
    const { name } = multilineObj;
    reset({
      ...values,
      [name]: value
    });
    setMultiline({ name: '', value: '', isOpen: false });
  };

  const editableFields = propertiesProps.formFields.editables;
  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
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
          isOpen={multilineObj.isOpen}
          onRequestClose={closeModal}
          defaultValue={multilineObj.value}
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
