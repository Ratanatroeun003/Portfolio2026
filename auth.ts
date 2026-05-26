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
        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminName = process.env.ADMIN_NAME;
        console.log("--- DEBUG AUTH ---");
       console.log("Input Email:", credentials.email, " | Env Email:", adminEmail);
  console.log("Input Pass:", credentials.password, " | Env Pass:", adminPassword);
  console.log("------------------");
        if (
          credentials.email !==adminEmail ||
          credentials.password !== adminPassword
        ) {
          return null;
        }

        return {
          id: '1',
          email: String(adminEmail),
          name: String(adminName),
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
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
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