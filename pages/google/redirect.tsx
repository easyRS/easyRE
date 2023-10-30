import type { NextPage } from 'next';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { TopNavigation } from '../../lib/components';
import { generateEvent } from '../../lib/controllers/TaskController';

interface QueryParams extends ParsedUrlQuery {
  code: string;
  state: string;
}

const GoogleComponent: NextPage = () => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <div
          style={{
            padding: '1rem 2rem',
            maxWidth: '500px',
            margin: '10px auto',
            background: 'white',
            textAlign: 'left',
            borderRadius: '1rem',
            boxShadow: '0 0 3px var(--cadet-gray)'
          }}
        >
          <p
            style={{
              textAlign: 'start',
              lineHeight: '1.5rem'
            }}
          >
            Event was created correctly. <br /> Check out your Google Calendar
            :D !{' '}
          </p>
          <Link href="/">Go home</Link>
        </div>
      }
    />
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { code, state } = query as QueryParams;

  await generateEvent(state, code);
  return {
    props: {}
  };
}

export default GoogleComponent;
