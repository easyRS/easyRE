import NextAuth from 'next-auth';
import { authOptions } from '../../../lib/drivers/network/session';

export default NextAuth(authOptions);
