import { useEffect, useState } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  border: string;
  children: React.ReactNode;
  height: string;
  width: string;
  onClick: () => void;
};

type OptionalProps = Partial<ButtonProps>;

const Button: React.FC<OptionalProps> = ({
  border = 'none',
  height = '2.5rem',
  width = '12rem',
  onClick,
  children
}: OptionalProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.button}
      style={{
        border,
        height,
        width
      }}
    >
      {children}
    </button>
  );
};

export default Button;
