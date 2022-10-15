import { TopNavigation } from '../lib/components';

const Home = () => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <div style={{ backgroundColor: 'white' }}>
          <h1>Hello. welcome to EASY RS, this is the homepage</h1>
        </div>
      }
    />
  );
};

export default Home;
