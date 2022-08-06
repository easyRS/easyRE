import type { NextPage } from 'next';
import { BurgerMenu } from '../lib/components';

const Home: NextPage<HomeProps> = () => {
  return (
    <BurgerMenu
      content={
        <div>
          <h1>Hello. welcome to EASY RS, this is the homepage</h1>
        </div>
      }
    />
  );
};

export default Home;
