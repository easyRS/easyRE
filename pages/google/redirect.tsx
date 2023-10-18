import type { NextPage } from 'next';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { TopNavigation } from '../../lib/components';
import { generateEvent } from '../../lib/controllers/TaskController';

interface QueryParams extends ParsedUrlQuery {
  code: string;
  state: string;
}

const GoogleComponent: NextPage<> = () => {
  return <TopNavigation isOpen={false} content={<div>working!</div>} />;
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
