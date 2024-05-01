import NextAuth from 'next-auth/next';
import { authOptions } from './options';

const handler = NextAuth(authOptions);
//this methods name handeler always
//nextauth methods sare option leta as parameter

export { handler as GET, handler as POST };//get post as verb likna hota 