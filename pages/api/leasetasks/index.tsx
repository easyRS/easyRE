import { NextApiRequest, NextApiResponse } from 'next';
import { generateTasks } from '../../../lib/controllers/LeaseContractController';

import sessionAuth from '../../../lib/drivers/network/session';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await sessionAuth(req, res);
  if (!session) {
    return undefined;
  }

  const { method, body } = req;
  let response;

  if (method === 'POST') {
    response = await generateTasks(body);
    return res.json(response);
  }
  return undefined;
};
