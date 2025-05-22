import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig = {
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const { token } = credentials;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          return null;
        }

        const result = await response.json();
        const user = {
          ...result.data,
          token: token,
        };

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 10 * 24 * 60 * 60,
  },
  pages: {
    signOut: '/lk/login',
    signIn: '/lk/login',
  },
  callbacks: {
    async jwt({ trigger, token, user, account, session }) {
      if (trigger === 'update') {
        return {
          ...token,
          ...session,
        };
      }
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          full_name: user?.full_name || null,
          phone: user?.phone || null,
          email: user?.email || null,
          image: user?.image || null,
          birth: user?.birth || null,
          balance: user?.balance || 0,
          is_new: user?.is_new || false,
          is_fix: user?.is_fix || false,
          is_active_enter_code: user?.is_active_enter_code || null,
          enter_code: user?.enter_code || null,
          subscriptions: user?.subscriptions || null,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.full_name = token?.full_name || null;
      session.user.phone = token?.phone || null;
      session.user.email = token?.email || null;
      session.user.image = token?.image || null;
      session.user.birth = token?.birth || null;
      session.user.balance = token?.balance || 0;
      session.user.is_new = token?.is_new || false;
      session.user.is_fix = token?.is_fix || false;
      session.user.is_active_enter_code = token?.is_active_enter_code || null;
      session.user.enter_code = token?.enter_code || null;
      session.user.subscriptions = token?.subscriptions || null;

      return session;
    },
  },
};
