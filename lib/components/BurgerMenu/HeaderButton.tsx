import classNames from 'classnames';
import { bool, func } from 'prop-types';
import styles from './styles/HeaderButton.module.css';

type BurguerProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const Burger = ({ open, setOpen }: BurguerProps) => {
  return (
    <div
      className={classNames(styles.container)}
      onClick={() => setOpen(!open)}
      onKeyUp={() => setOpen(!open)}
      role="button"
      tabIndex={0}
    >
      <span
        className={classNames(
          styles.span,
          open ? styles.spanOpened : styles.spanClosed
        )}
        style={
          open ? { transform: 'rotate(45deg)' } : { transform: 'rotate(0)' }
        }
      />
      <span
        className={classNames(
          styles.span,
          open ? styles.spanOpened : styles.spanClosed
        )}
        style={
          open
            ? { transform: 'translateX(20px)', opacity: '0' }
            : { transform: 'translateX(0)', opacity: '1' }
        }
      />
      <span
        className={classNames(
          styles.span,
          open ? styles.spanOpened : styles.spanClosed
        )}
        style={
          open ? { transform: 'rotate(-45deg)' } : { transform: 'rotate(0)' }
        }
      />
    </div>
  );
};

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired
};

export default Burger;
