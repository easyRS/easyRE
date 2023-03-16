import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '../Button';
import styles from './Table.module.css';

type TableProps = {
  tableProperties: TableMapping<ITable>;
  newTitle?: string;
  headerTitle?: string;
  newRedirectUrl?: string;
  editRedirectUrl: string;
};

const Table: React.FC<TableProps> = (props: TableProps) => {
  const { tableName, arrayObj }: TableMapping<ITable> = props.tableProperties;
  const { headerTitle } = props;
  const router = useRouter();
  const labels: string[] = Object.values<string>(tableName);
  const keys = Object.keys(tableName);

  const [isSSR, setIsSSR] = useState(true);
  const onNew = useCallback(() => {
    if (props.newRedirectUrl) router.push(props.newRedirectUrl);
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
      <div className={styles.header}>
        {props.newTitle && <Button onClick={onNew}>{props.newTitle}</Button>}
        {headerTitle && (
          <div className={styles.headerTitle}>
            <h2>{headerTitle}</h2>
          </div>
        )}
      </div>

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
                key={obj._id?.toString()}
                onClick={() => {
                  onEdit(obj._id?.toString() || '');
                }}
              >
                {keys.map((key) => {
                  if (key === 'coordinates') {
                    const value = (obj as any)[key] as [number]; // eslint-disable-line
                    return <td className={styles.td}>{value.join(' , ')}</td>;
                  }
                  const value = (obj as any)[key]; // eslint-disable-line
                  return (
                    <td className={styles.td}>
                      {value}
                      {value === undefined && <FaWhatsapp />}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </table>
    </div>
  );
};

Table.defaultProps = {
  headerTitle: '',
  newTitle: '',
  newRedirectUrl: ''
};

export default Table;
