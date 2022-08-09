import { useEffect, useState } from 'react';
import styles from './Table.module.css';

type TableProps = {
  tableProperties: TableMapping<IPropertyTable>;
};

const Table: React.FC<TableProps> = (props: TableProps) => {
  const { tableName, arrayObj }: TableMapping<IPropertyTable> =
    props.tableProperties;
  const labels: string[] = Object.values<string>(tableName);
  const keys = Object.keys(tableName);

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;
  return (
    <div className={styles.container}>
      <table>
        <tr>
          {labels.map((label) => (
            <th>{label}</th>
          ))}
        </tr>
        {arrayObj.map((obj) => {
          return (
            <tr key={obj._id}>
              {keys.map((key) => (
                <td>{(obj as any)[key]}</td> // eslint-disable-line
              ))}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
