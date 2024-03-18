import { NextApiRequest, NextApiResponse } from 'next';
import startMidnightDailyJob from '../../../lib/drivers/jobs/tasks';

export default async (
  req: /* eslint-disable-line*/ NextApiRequest,
  res: /* eslint-disable-line*/ NextApiResponse
) => {
  await startMidnightDailyJob();
  console.log('Sucesfully run'); /* eslint-disable-line*/
  process.exit(0);
};
