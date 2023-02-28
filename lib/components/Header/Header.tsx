import { useRouter } from 'next/router';
import Button from '../Button/Button';

const Header = () => {
  const router = useRouter();
  const onDelete = () => {
    router.push('/main');
  };
  return (
    <header>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          margin: '0.5rem 0 1rem 0'
        }}
      >
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
