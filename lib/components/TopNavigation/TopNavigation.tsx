import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Header from '../Header/Header';

type TopNavigationProps = {
  content: React.ReactNode;
  isOpen: boolean;
};

const getMenus = (open: boolean) => {
  const styles = open
    ? {
        marginLeft: '5px',
        marginRight: '5px'
      }
    : {
        marginLeft: '5px'
      };
  return [
    {
      key: '1',
      name: 'Properties',
      iconName: (
        <Image
          src="/images/logo.png"
          style={styles}
          alt="My Image"
          width={300}
          height={300}
        />
      ),
      link: '/properties'
    },
    {
      key: '2',
      name: 'Tenants',
      iconName: (
        <Image
          src="/images/logo.png"
          style={styles}
          alt="My Image"
          width={300}
          height={300}
        />
      ),
      link: '/tenants'
    },
    {
      key: '3',
      name: 'Leases',
      iconName: (
        <Image
          src="/images/logo.png"
          style={styles}
          alt="My Image"
          width={300}
          height={300}
        />
      ),
      link: '/leases'
    },
    {
      key: '4',
      name: 'Contracts',
      iconName: (
        <Image
          src="/images/logo.png"
          style={styles}
          alt="My Image"
          width={300}
          height={300}
        />
      ),
      link: '/contractdefs'
    },
    {
      key: '5',
      name: 'Profile',
      iconName: (
        <Image
          src="/images/logo.png"
          style={styles}
          alt="My Image"
          width={300}
          height={300}
        />
      ),
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
