import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
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

export default NextAuth(authOptions);
