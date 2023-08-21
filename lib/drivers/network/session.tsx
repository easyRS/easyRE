import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials, req /* eslint-disable-line*/) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (email !== 'john@gmail.com' || password !== '1234') {
          throw new Error('Invalid credentials');
        }

        return {
          id: '1234',
          name: 'John Doe',
          email: 'john@gmail.com',
          role: 'admin'
        };
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return session;
  }

  res.status(401);
  res.end();
  return null;
};
