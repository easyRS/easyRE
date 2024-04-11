import type { NextPage } from 'next';
import styles from './ReadonlyInput.module.css';

type ReadonlyProps = {
  fieldData: FieldData;
  editObj: IEntity | undefined;
};

const ReadonlyInput: NextPage<ReadonlyProps> = (props: ReadonlyProps) => {
  const PRIMARY_LIGHT = 'var(--primary-light)';
  const { fieldData, editObj } = props;
  const { name } = fieldData;

  const defaultValue =
    editObj && /* eslint-disable */ editObj[name]
      ? (editObj[name as keyof IEntity] as unknown as string)
      : '';

  if (!defaultValue) return null;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
        flexDirection: 'column',
        textAlign: 'left',
        marginBottom: '15px'
      }}
    >
      <label htmlFor={fieldData.name} className={styles.labelTitle}>
        {`${fieldData.display_value}:`}
      </label>
      <label
        style={{
          marginBottom: '10px',
          backgroundColor: PRIMARY_LIGHT,
          cursor: 'not-allowed',
          borderColor: '0.134rem var(--primary-dark)',
          borderRadius: 'var(--border-radius-container)',
          padding: '15px 15px',
          fontSize: 'var(--button-font-size)',
          pointerEvents: 'none',
          opacity: '0.4'
        }}
        htmlFor={fieldData.name}
      >{`${defaultValue}`}</label>
    </div>
  );
};

export default ReadonlyInput;
