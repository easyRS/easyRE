import { NextApiRequest, NextApiResponse } from 'next';
import { createLeaseContract } from '../../../lib/controllers/LeaseContractController';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  let response;

  switch (method) {
    case 'GET':
      res.json({ method: 'GET', endpoint: 'Users' }); // TODO implement
      break;
    case 'POST':
      response = await createLeaseContract(body);
      return res.json(response);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
  return undefined;
};
