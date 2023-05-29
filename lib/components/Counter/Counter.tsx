import styles from './Counter.module.css';

type CounterProps = {
  value: string;
  title: string;
};

const Counter = (props: CounterProps) => {
  const { title, value } = props;
  return title && value ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--sea-water-green)',
        borderRadius: '1rem',
        padding: '1rem 1rem 0 1rem',
        boxShadow: '0 0 4px var(--bubblegum-green)',
        fontSize: '1.3rem'
      }}
    >
      <div className={styles.circle}>
        <span>{value}</span>
      </div>
      <h5>{title}</h5>
    </div>
  ) : null;
};

export default Counter;
