import { NextApiRequest, NextApiResponse } from 'next';
import {
  createTenant,
  removeTenant,
  updateTenant
} from '../../../lib/controllers/TenantController';

import sessionAuth from '../../../lib/drivers/network/session';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await sessionAuth(req, res);
  if (!session) {
    return undefined;
  }

  const { method, body } = req;
  let response;

  switch (method) {
    case 'GET':
      res.json({ method: 'GET', endpoint: 'Users' }); // TODO implement
      break;
    case 'PUT':
      response = await updateTenant(body);
      return res.json(response);
    case 'POST':
      response = await createTenant(body);
      return res.json(response);
    case 'DELETE':
      response = await removeTenant(body);
      return res.json(response);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
  return undefined;
};
