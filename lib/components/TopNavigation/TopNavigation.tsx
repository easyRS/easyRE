import { useState } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Header from '../Header/Header';

type TopNavigationProps = {
  content: React.ReactNode;
  isOpen: boolean;
};

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
    name: 'Leases',
    link: '/leases'
  },
  {
    key: '4',
    name: 'Contracts',
    link: '/contractdefs'
  }
];

const TopNavigation = ({ content, isOpen }: TopNavigationProps) => {
  const [open, setOpen] = useState(isOpen);
  const style = open // eslint-disable-line
    ? {
        marginLeft: '5rem',
        transform: 'translateX(6rem)',
        transition: 'transform 0.3s ease-in-out'
      }
    : {
        marginLeft: '5rem',
        transition: 'transform 0.3s ease-in-out'
      };
  return (
    <>
      <Header />
      <div style={style}>{content}</div>
      <BurgerMenu menus={defaultMenus} open={open} setOpen={setOpen} />
    </>
  );
};

export default TopNavigation;
