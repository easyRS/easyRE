import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../Button/Button';
import styles from './Header.module.css';

type HeaderProps = {
  /* eslint-disable-line*/ open: boolean;
};

const Header = (props: HeaderProps /* eslint-disable-line*/) => {
  const { status } = useSession();

  const router = useRouter();
  const onDelete = () => {
    router.push('/main');
  };

  const logOut = async () => {
    await signOut();
  };

  return (
    <header>
      <nav className={styles.container}>
        {status === 'authenticated' && (
          <Link href="/" legacyBehavior>
            <Image
              src="/images/logo.png"
              style={{
                marginLeft: '20px',
                width: '4rem',
                height: '3.6rem',
                cursor: 'pointer'
              }}
              alt="My Image"
              width={300}
              height={300}
            />
          </Link>
        )}
        {status === 'authenticated' && (
          <div className={styles.buttonsContainer}>
            <Button onClick={onDelete} type="primary" backgroundColor="white">
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderColor: 'white'
                }}
              >
                New Lease
              </div>
            </Button>
            <Button
              onClick={logOut}
              type="tertiary"
              width="6rem"
              backgroundColor="var(--primary)"
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
