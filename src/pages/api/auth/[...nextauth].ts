import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // GithubProvider({
    //   clientId: process.env.OAUTH_CLIENT_KEY as string,
    //   clientSecret: process.env.OAUTH_CLIENT_SECRET as string,
    // }),
  ],
  pages: {
    signIn: '/',
  },
};

export default NextAuth(authOptions);
