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

  return (
    <div>
      <Header open={open} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            maxWidth: '1100px'
          }}
        >
          {content}
        </div>
      </div>

      {status === 'authenticated' && (
        <BurgerMenu menus={defaultMenus} open={open} setOpen={setOpen} />
      )}
    </div>
  );
};

export default TopNavigation;
