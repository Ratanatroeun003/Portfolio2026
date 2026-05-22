import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/lib/prisma';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',

      credentials: {
        email: {},
        password: {},
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
              email: credentials.email,
            },
          });

        if (!admin) {
          return null;
        }

        // Plain password compare
        if (
          credentials.password !==
          admin.password
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

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };