import type { AppProps } from 'next/app';

// import { Roboto } from '@next/font/google';

// const roboto = Roboto({ subsets: ['latin'], weight: '400' });

const MyApp = ({ Component }: AppProps) => {
  return <Component />;
};

export default MyApp;
