import { NextApiRequest, NextApiResponse } from 'next';
import { fakeDataFunct } from '../../../lib/drivers/database/seeder';

export default async (
  req: /* eslint-disable-line*/ NextApiRequest,
  res: /* eslint-disable-line*/ NextApiResponse
) => {
  await fakeDataFunct();
};
