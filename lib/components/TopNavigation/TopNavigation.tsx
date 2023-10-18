import { useSession } from 'next-auth/react';
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
    name: 'Profile',
    link: '/profile'
  },
  {
    key: '2',
    name: 'Properties',
    link: '/properties'
  },
  {
    key: '3',
    name: 'Tenants',
    link: '/tenants'
  },
  {
    key: '4',
    name: 'Leases',
    link: '/leases'
  },
  {
    key: '5',
    name: 'Contracts',
    link: '/contractdefs'
  }
];

const TopNavigation = ({ content, isOpen }: TopNavigationProps) => {
  const [open, setOpen] = useState(isOpen);
  const { status } = useSession();

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
      <Header open={open} />
      <div style={style}>{content}</div>
      {status === 'authenticated' && (
        <BurgerMenu menus={defaultMenus} open={open} setOpen={setOpen} />
      )}
    </>
  );
};

export default TopNavigation;
