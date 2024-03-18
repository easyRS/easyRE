import { NextApiRequest, NextApiResponse } from 'next';
import executeSeeder from '../../../lib/drivers/database/seeder';

export default async (
  req: /* eslint-disable-line*/ NextApiRequest,
  res: /* eslint-disable-line*/ NextApiResponse
) => {
  await executeSeeder(true, false, true);
};
