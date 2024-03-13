/* eslint-disable */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FieldValues, UseFormReturn, useForm } from "react-hook-form";
import {
  FaExpandArrowsAlt,
  FaRegEye,
  FaRegEyeSlash,
  FaTrashAlt,
} from "react-icons/fa";
import IProperty from "../../domain/entities/IProperty";
import Button from "../Button/Button";
import LongInputModal from "../LongInputModal/LongInputModal";
import SimpleModal from "../SimpleModal/SimpleModal";
import CoordinatesInput from "./CoordinatesInput/CoordinatesInput";
import styles from "./Form.module.css";

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
  const modalRef = useRef<HTMLTextAreaElement>(null);
  const [multilineName, setMultilineName] = useState("");
  const [multilineValue, setMultilineValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const _form = useForm();
  const form = propertiesProps.form ? propertiesProps.form : _form;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const router = useRouter();
  const { editObj, callbacks, canDelete, onSubmit, submitTitle } =
    propertiesProps;
  const { createCallback, updateCallback, deleteCallback } = callbacks;
  const _submitTitle = submitTitle || "SUBMIT";
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

  const openModal = (name: string) => {
    const values = form.getValues();

    setIsOpen(true);
    setMultilineName(name);
    setMultilineValue(values[name]);
  };

  const closeModal = () => {
    const { reset } = form;
    const values = form.getValues() as Record<string, unknown>;

    reset({
      ...values,
      [multilineName]: modalRef.current?.value,
    });
    setMultilineName("");
    setMultilineValue("");
    setIsOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const editableFields = propertiesProps.formFields.editables;
  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit(_onSubmit)}>
        {editableFields.map((fieldData) => {
          const { type, name, options, isRequired } = fieldData;
          const PRIMARY_LIGHT = "var(--primary-light)";

          if (type === "coordinates") {
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
              />
            );
          }

          const defaultValue =
            // @ts-ignore
            editObj && editObj[name]
              ? (editObj[name as keyof IEntity] as unknown as string)
              : "";

          if (type === "readonly") {
            if (!defaultValue) return null;
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "left",
                  justifyContent: "left",
                  flexDirection: "column",
                  textAlign: "left",
                  marginBottom: "15px",
                }}
              >
                <label htmlFor={fieldData.name} className={styles.labelTitle}>
                  {`${fieldData.display_value}:`}
                </label>
                <label
                  style={{
                    marginBottom: "10px",
                    backgroundColor: PRIMARY_LIGHT,
                    cursor: "not-allowed",
                    borderColor: "0.134rem var(--primary-dark)",
                    borderRadius: "var(--border-radius-container)",
                    padding: "15px 15px",
                    fontSize: "var(--button-font-size)",
                    pointerEvents: "none",
                    opacity: "0.4",
                  }}
                  htmlFor={fieldData.name}
                >{`${defaultValue}`}</label>
              </div>
            );
          }

          if (type === "state" && options) {
            return (
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "left",
                  justifyContent: "left",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                <label htmlFor={fieldData.name} className={styles.labelTitle}>
                  {`${fieldData.display_value}:`}
                </label>
                <select
                  {...register(name, { required: isRequired })}
                  defaultValue={defaultValue}
                  style={{
                    backgroundColor: "white",
                    minWidth: "6rem",
                    borderColor: "0.134rem var(--primary-dark)",
                    borderRadius: "var(--border-radius-container)",
                    padding: "8px 15px",
                    fontSize: "var(--button-font-size)",
                  }}
                >
                  {" "}
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

          if (type === "password") {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "left",
                  justifyContent: "left",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                <label htmlFor={fieldData.name} className={styles.labelTitle}>
                  {fieldData.display_value}
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    className={styles.textInput}
                    {...register(name, { required: isRequired })}
                    defaultValue={defaultValue}
                  />
                  {errors[name] && <p>This is required</p>}
                  {showPassword ? (
                    <FaRegEye
                      style={{
                        zIndex: "1",
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                      }}
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaRegEyeSlash
                      style={{
                        zIndex: "1",
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>
            );
          }

          if (type === "multiline") {
            const openMultiline = () => {
              openModal(name);
            };
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "left",
                  justifyContent: "left",
                  flexDirection: "column",
                  textAlign: "left",
                  marginBottom: "12px",
                }}
              >
                <label htmlFor={fieldData.name} className={styles.labelTitle}>
                  {fieldData.display_value}
                </label>
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  {" "}
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
                      position: "absolute",
                      margin: "0.6rem",
                      top: "0",
                      right: "0",
                      zIndex: "1",
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
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                flexDirection: "column",
                textAlign: "left",
                marginBottom: "12px",
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
        })}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
            justifyContent: canDelete && editObj ? "space-between" : "right",
          }}
        >
          {canDelete && editObj && (
            <Button onClick={toggleDeletePopup} width="9rem">
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "center",
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
        <LongInputModal
          isOpen={longTextModalIsOpen}
          onRequestClose={closeModal}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
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
        </LongInputModal>
        <SimpleModal isOpen={confirmDelete} onRequestClose={toggleDeletePopup}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <h4>Are you sure you want to delete this?</h4>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={toggleDeletePopup} width="5rem" type="tertiary">
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                  }}
                >
                  Cancel
                </div>
              </Button>

              <Button onClick={onDelete} width="5rem" type="secondary">
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                  }}
                >
                  Delete
                </div>
              </Button>
            </div>
          </div>
        </SimpleModal>
      </div>
    </div>
  );
};

export default Form;
