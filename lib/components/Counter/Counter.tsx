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
        background:
          'linear-gradient(40deg, #94C5CC 8%, #B4D2E7 18%, #F8F8F8 100%)',
        borderRadius: '1rem',
        padding: '0rem 2rem 0rem 2rem',
        minWidth: '300px',
        minHeight: '150px',
        boxShadow: '0 0 3px var(--cadet-gray)',
        fontSize: '1.3rem',
        alignItems: 'start',
        justifyContent: 'start',
        position: 'relative'
      }}
    >
      <h5>{title}</h5>
      <span
        style={{
          display: 'flex',
          fontSize: '1rem',
          alignSelf: 'start'
        }}
      >
        {value}
      </span>
    </div>
  ) : null;
};

export default Counter;
