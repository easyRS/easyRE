import type { NextPage } from 'next';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { TopNavigation } from '../../lib/components';
import {
  cleanEvents,
  generateEvent
} from '../../lib/controllers/TaskController';

interface QueryParams extends ParsedUrlQuery {
  code: string;
  state: string;
}

type GoogleProps = {
  eventsGenerated: boolean;
};

const GoogleComponent: NextPage<GoogleProps> = (props: GoogleProps) => {
  const { eventsGenerated } = props;
  const message = eventsGenerated ? (
    <p
      style={{
        textAlign: 'start',
        lineHeight: '1.5rem'
      }}
    >
      Event was dsafcreated correctly. <br /> Check out your Google Calendar :D
      !{' '}
    </p>
  ) : (
    <p
      style={{
        textAlign: 'start',
        lineHeight: '1.5rem'
      }}
    >
      Ups! Something went wrong!.
    </p>
  );

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
          {message}
          <Link href="/">Go home</Link>
        </div>
      }
    />
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { code, state } = query as QueryParams;

  const eventsGenerated = await generateEvent(code, state);
  if (eventsGenerated) await cleanEvents();
  return {
    props: { eventsGenerated }
  };
}

export default GoogleComponent;
