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
          justifyContent: 'flex-end'
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
            New
          </div>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
