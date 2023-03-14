import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../Button/Button';

type HeaderProps = {
  open: boolean;
};

const Header = (props: HeaderProps) => {
  const { open } = props;
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

        <Button onClick={onDelete}>
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
      </nav>
    </header>
  );
};

export default Header;
