import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { prisma } from '@/lib/prisma';

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },

        password: {
          label: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        const admin =
          await prisma.admin.findUnique({
            where: {
              email:
                credentials.email as string,
            },
          });

        if (!admin) return null;

        if (
          admin.password !==
          credentials.password
        ) {
          return null;
        }

        return {
          id: admin.id.toString(),
          email: admin.email,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge:2*24*60*60,
    updateAge:24*60*60
  },

  pages: {
    signIn: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,

  trustHost: true,
});