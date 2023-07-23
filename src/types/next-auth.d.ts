import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      userType: string;
      avatar: string;
      url: string;
      image: object;
    } & DefaultSession['user'];
  }
}