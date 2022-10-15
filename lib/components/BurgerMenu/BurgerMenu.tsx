import classNames from 'classnames';
import Link from 'next/link';

import { Dispatch, SetStateAction } from 'react';
import HeaderButton from './HeaderButton';
import styles from './styles/BurgerMenu.module.css';

type BurguerMenuProps = {
  menus: Menu[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const BurgerMenu = ({ menus, open, setOpen }: BurguerMenuProps) => {
  const menuId = 'main-menu';

  const isHidden = !!open;
  const tabIndex = isHidden ? 0 : -1;

  const wrapperFunction = (value: boolean) => {
    setOpen(value);
  };

  return (
    <>
      <HeaderButton
        open={open}
        setOpen={wrapperFunction}
        aria-controls={menuId}
      />
      <div
        className={classNames(
          styles.container,
          open ? styles.open : styles.close
        )}
        aria-hidden={!isHidden}
      >
        {menus.map((menu) => (
          <Link key={menu.key} href={menu.link}>
            <a className={classNames(styles.a)} tabIndex={tabIndex}>
              {menu.name}
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default BurgerMenu;
