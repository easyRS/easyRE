import type { NextPage } from 'next';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type LabelProps = {
  displayValue: string;
  field: string;
  register: UseFormRegister<FieldValues>;
  defaultValue: number;
};

const Coordinate = (props: LabelProps) => {
  const { displayValue, field, register, defaultValue } = props;
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
          type="number"
          step="any"
          {...register(field, { required: true })}
          defaultValue={defaultValue || 0}
        />
      </label>
    </div>
  );
};

type Props = {
  register: UseFormRegister<FieldValues>;
  fieldData: FieldData;
  defaultCoordinates?: Coordinates /* eslint-disable-line*/;
};

const CoordinatesInput: NextPage<Props> = (props: Props) => {
  const { register, fieldData, defaultCoordinates } = props;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
        flexDirection: 'column',
        textAlign: 'left',
        margin: '1rem 0 1rem'
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
          defaultValue={
            defaultCoordinates?.latitude
              ? parseFloat(defaultCoordinates?.latitude)
              : 0
          }
        />
        <Coordinate
          displayValue="Longitude"
          field="longitude"
          register={register}
          defaultValue={
            defaultCoordinates?.longitude
              ? parseFloat(defaultCoordinates?.longitude)
              : 0
          }
        />
      </div>
    </div>
  );
};

export default CoordinatesInput;
