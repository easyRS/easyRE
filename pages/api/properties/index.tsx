import { NextApiRequest, NextApiResponse } from 'next';
import {
  createProperty,
  removeProperty,
  updateProperty
} from '../../../lib/controllers/PropertyController';

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
      response = await updateProperty(body);
      return res.json(response);
    case 'POST':
      response = await createProperty(body);
      return res.json(response);
    case 'DELETE':
      response = await removeProperty(body);
      return res.json(response);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
  return undefined;
};
