import { NextApiRequest, NextApiResponse } from 'next';
import {
  createUser,
  getUsers,
  updateUser
} from '../../../lib/controllers/UserController';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  let response;

  const users = await getUsers();
  const count = users.length;
  if (method === 'POST') {
    if (count > 0) {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      return undefined;
    }
    response = await createUser({ ...body, google_tokens: '' });
    return res.json(response);
  }
  if (method === 'PUT') {
    response = await updateUser(body);
    return res.json(response);
  }
  return undefined;

  /* switch (method) {
    case 'GET':
      res.json({ method: 'GET', endpoint: 'Users' }); // TODO implement
      break;
    /* case 'PUT':
      response = await updateUser(body);
      return res.json(response); */

  /* case 'DELETE':
      response = await removeUser(body);
      return res.json(response); */
  /* default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  } */
};
