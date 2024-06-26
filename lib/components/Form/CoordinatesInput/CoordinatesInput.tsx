import type { NextPage } from 'next';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormReturn
} from 'react-hook-form';
import styles from './CoordinatesInput.module.css';

type LabelProps = {
  displayValue: string;
  field: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  defaultValue: number;
};

const Coordinate = (props: LabelProps) => {
  const { displayValue, field, register, defaultValue, errors } = props;
  // TODO: Why required field does not work?
  return (
    <div>
      <label
        htmlFor="latitude"
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left'
        }}
      >
        {`${displayValue} `}
        <input
          className={styles.coordinateInput}
          type="number"
          step="any"
          {...register(field, { required: true })}
          defaultValue={defaultValue || 0}
        />
        {/* eslint-disable-line*/ errors[field] && <p>This is required</p>}
      </label>
    </div>
  );
};

type Props = {
  errors: FieldErrors<FieldValues>;
  fieldData: FieldData;
  defaultCoordinates?: number[] /* eslint-disable-line*/;
  form: UseFormReturn;
};

const CoordinatesInput: NextPage<Props> = (props: Props) => {
  const { fieldData, defaultCoordinates, errors, form } = props;
  const { register } = form;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
        flexDirection: 'column',
        textAlign: 'left',
        margin: '1rem 0 1rem',
        fontSize: '20px',
        fontWeight: '600'
      }}
    >
      <label htmlFor={fieldData.name}>{fieldData.display_value}</label>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Coordinate
          displayValue="Latitude"
          field="latitude"
          register={register}
          errors={errors}
          defaultValue={defaultCoordinates ? defaultCoordinates[0] : 0}
        />
        <Coordinate
          displayValue="Longitude"
          field="longitude"
          register={register}
          errors={errors}
          defaultValue={defaultCoordinates ? defaultCoordinates[1] : 0}
        />
      </div>
    </div>
  );
};

export default CoordinatesInput;
