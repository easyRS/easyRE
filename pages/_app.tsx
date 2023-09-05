import type { AppProps } from 'next/app';
import '../lib/common/styles/design_tokens.css';
import '../lib/common/styles/globals.css';
import '../lib/common/styles/utilities.css';

import { Roboto } from '@next/font/google';

import { SessionProvider } from 'next-auth/react';

import SessionWrapper from '../lib/components/SessionWrapper/SessionWrapper';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={roboto.className}>
      <SessionProvider session={pageProps.session}>
        <SessionWrapper Component={Component} pageProps={pageProps} />
      </SessionProvider>
    </main>
  );
};

export default MyApp;
