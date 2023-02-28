import styles from './Counter.module.css';

type CounterProps = {
  value: string;
  title: string;
};

const Counter = (props: CounterProps) => {
  return (
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
        <span>{props.value}</span>
      </div>
      <h5>{props.title}</h5>
    </div>
  );
};

export default Counter;
