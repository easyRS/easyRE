import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import {
  FaClipboardCheck,
  FaFileContract,
  FaHouseUser,
  FaPeopleCarry,
  FaUser
} from 'react-icons/fa';
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
      iconName: <FaHouseUser style={styles} />,
      link: '/properties'
    },
    {
      key: '2',
      name: 'Tenants',
      iconName: <FaPeopleCarry style={styles} />,
      link: '/tenants'
    },
    {
      key: '3',
      name: 'Leases',
      iconName: <FaClipboardCheck style={styles} />,
      link: '/leases'
    },
    {
      key: '4',
      name: 'Contracts',
      iconName: <FaFileContract style={styles} />,
      link: '/contractdefs'
    },
    {
      key: '5',
      name: 'Profile',
      iconName: <FaUser style={styles} />,
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
