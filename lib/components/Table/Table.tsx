import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../Button';
import styles from './Table.module.css';

type TableProps = {
  tableProperties: TableMapping<ITable>;
  newTitle: string;
  newRedirectUrl: string;
  editRedirectUrl: string;
};
/*


*/
const Table: React.FC<TableProps> = (props: TableProps) => {
  const { tableName, arrayObj }: TableMapping<ITable> = props.tableProperties;
  const router = useRouter();
  const labels: string[] = Object.values<string>(tableName);
  const keys = Object.keys(tableName);

  const [isSSR, setIsSSR] = useState(true);
  const onNew = useCallback(() => {
    router.push(props.newRedirectUrl);
  }, [router, props.newRedirectUrl]);

  const onEdit = useCallback(
    (_id: string) => {
      if (!_id) return;
      router.push(props.editRedirectUrl + _id); // eslint-disable-line
    },
    [router, props.editRedirectUrl]
  );

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <div className={styles.container}>
      <Button onClick={onNew}>{props.newTitle}</Button>

      <table className={styles.table}>
        <tr className={styles.thead}>
          {labels.map((label) => (
            <th className={styles.th}>{label}</th>
          ))}
        </tr>
        {arrayObj &&
          arrayObj.map((obj) => {
            return (
              <tr
                className={styles.tbody}
                key={obj._id}
                onClick={() => {
                  onEdit(obj._id || '');
                }}
              >
                {keys.map((key) => {
                  if (key === 'coordinates') {
                    const value = (obj as any)[key] as [number]; // eslint-disable-line
                    return <td className={styles.td}>{value.join(' , ')}</td>;
                  }
                  const value = (obj as any)[key]; // eslint-disable-line
                  return <td className={styles.td}>{value}</td>;
                })}
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default Table;
