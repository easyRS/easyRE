import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';

import { NextComponentType, NextPageContext } from 'next';

import styles from './SessionWrapper.module.css';

type SessionProps = {
  Component: NextComponentType<
    NextPageContext,
    /* eslint-disable-line*/ any,
    /* eslint-disable-line*/ any
  >;
  pageProps: /* eslint-disable-line*/ any;
};

const SessionWrapper: NextPage<SessionProps> = ({
  Component,
  pageProps
}: SessionProps) => {
  const { status } = useSession();
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/auth/signin');
  }, [status]);

  if (!pathname.includes('/auth/') && status !== 'authenticated') {
    return (
      <div
        style={{
          width: '100%',
          minHeight: '700px',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex'
        }}
      >
        <div className={styles.loader} />
      </div>
    );
  }

  return <Component {...pageProps} />;
};

export default SessionWrapper;
