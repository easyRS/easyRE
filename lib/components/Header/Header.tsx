import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../Button/Button';

type HeaderProps = {
  open: boolean;
};

const Header = (props: HeaderProps) => {
  const { open } = props;
  const { status } = useSession();

  const containerStyle = open // eslint-disable-line
    ? {
        marginLeft: '5rem',
        transform: 'translateX(6rem)',
        transition: 'transform 0.4s ease-in-out'
      }
    : {
        marginLeft: '3rem',
        transition: 'transform 0.4s ease-in-out'
      };
  const router = useRouter();
  const onDelete = () => {
    router.push('/main');
  };

  const logOut = async () => {
    await signOut();
  };

  return (
    <header>
      <nav
        style={{
          ...containerStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0 0 0 3rem'
        }}
      >
        {status === 'authenticated' && (
          <Link href="/" legacyBehavior>
            <Image
              src="/images/logo.png"
              style={{
                width: '5.5rem',
                height: '5.5rem'
              }}
              alt="My Image"
              width={200}
              height={200}
            />
          </Link>
        )}
        {status === 'authenticated' && (
          <div>
            <Button onClick={onDelete} type="primary">
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'center'
                }}
              >
                Create New Lease
              </div>
            </Button>
            <Button
              onClick={logOut}
              type="tertiary"
              width="6rem"
              backgroundColor="var(--primary-light)"
              margin="0 10px"
            >
              Log out
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
