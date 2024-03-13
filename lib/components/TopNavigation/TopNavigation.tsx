import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Header from '../Header/Header';

type TopNavigationProps = {
  content: React.ReactNode;
  isOpen: boolean;
};

const getMenus = (open: boolean) => {
  if (!open) return [];
  return [
    {
      key: '1',
      name: 'Properties',
      iconName: <div>sds</div>,
      link: '/properties'
    },
    {
      key: '2',
      name: 'Tenants',
      iconName: <div>sds</div>,
      link: '/tenants'
    },
    {
      key: '3',
      name: 'Leases',
      iconName: <div>sds</div>,
      link: '/leases'
    },
    {
      key: '4',
      name: 'Contracts',
      iconName: <div>sds</div>,
      link: '/contractdefs'
    },
    {
      key: '5',
      name: 'Profile',
      iconName: <div>sds</div>,
      link: '/profile'
    }
  ];
};

const TopNavigation = ({ content, isOpen }: TopNavigationProps) => {
  const [open, setOpen] = useState(isOpen);
  const { status } = useSession();
  const defaultMenus = useMemo(() => {
    return getMenus(open);
  }, [open]);
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
            maxWidth: '1100px',
            width: '100%'
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
