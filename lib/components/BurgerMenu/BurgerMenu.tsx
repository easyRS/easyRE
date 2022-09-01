import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import HeaderButton from './HeaderButton';
import styles from './styles/BurgerMenu.module.css';

const defaultMenus: Menu[] = [
  {
    key: '1',
    name: 'Properties',
    link: '/properties'
  },
  {
    key: '2',
    name: 'Tenants',
    link: '/tenants'
  },
  {
    key: '3',
    name: 'Contracts',
    link: '/'
  }
];

const BurgerMenu = ({
  menus = defaultMenus,
  isOpen = false,
  content
}: BurguerMenuProps) => {
  const [open, setOpen] = useState(isOpen);
  const menuId = 'main-menu';

  const isHidden = !!open;
  const tabIndex = isHidden ? 0 : -1;

  const style = open // eslint-disable-line
    ? {
        marginTop: '5rem',
        marginLeft: '5rem',
        transform: 'translateX(6rem)',
        transition: 'transform 0.3s ease-in-out'
      }
    : {
        marginTop: '5rem',
        marginLeft: '5rem',
        transition: 'transform 0.3s ease-in-out'
      };

  const wrapperFunction = (value: boolean) => {
    setOpen(value);
  };

  const BurgerMenuWrapper = (
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

  return (
    <>
      {BurgerMenuWrapper}
      <div style={style}>{content}</div>
    </>
  );
};

export default BurgerMenu;
