import styles from './Stepper.module.css';

type StepperProps = {
  titles: string[];
  current: number;
};

const Stepper = (props: StepperProps) => {
  const { titles, current } = props;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.stepperMainContainer}>
        {titles &&
          titles.map((title, index) => (
            <div className={styles.stepper}>
              <div className={styles.counterContainer}>
                <span
                  className={styles.counter}
                  style={
                    current === index
                      ? {
                          backgroundColor: 'var(--primary)',
                          boxShadow: '0 0 3px var(--primary)',
                          color: 'black',
                          opacity: '1'
                        }
                      : {}
                  }
                >
                  {index + 1}
                </span>
                {index + 1 !== titles.length && (
                  <div className={styles.horizontalLine} />
                )}
              </div>
              <span
                className={styles.title}
                style={
                  current === index
                    ? {
                        color: 'black',
                        opacity: '1'
                      }
                    : {}
                }
              >
                {title}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Stepper;
