import type { AppProps } from 'next/app';
import '../lib/common/styles/design_tokens.css';
import '../lib/common/styles/globals.css';
import '../lib/common/styles/utilities.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
