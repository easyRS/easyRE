import React, { useEffect, useState } from 'react';
import styles from './Table.module.css';

type TableProps = {
  tableProperties: TableMapping[];
};

const Table: React.FC<TableProps> = (props: TableProps) => {
  const { tableName, arrayObj } = props.tableProperties;
  const labels: Record<string, unknown>[] = Object.values(tableName);
  const keys: Record<string, unknown>[] = Object.keys(tableName);

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
                <td>{obj[key]}</td> // eslint-disable-line
              ))}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
