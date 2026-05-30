// auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
        // ✅ validate
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminName = process.env.ADMIN_NAME;

        if (!adminEmail || !adminPassword) {
          console.error('Admin credentials not set in .env');
          return null;
        }

        // ✅ compare
        if (
          credentials.email !== adminEmail ||
          credentials.password !== adminPassword
        ) {
          return null;
        }

        return {
          id: '1',
          email: adminEmail,
          name: adminName ?? 'Admin',
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 2*24*60*60,   // 2 days
    updateAge: 24 * 60 * 60,     // 1 day
  },

  pages: {
    signIn: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
});