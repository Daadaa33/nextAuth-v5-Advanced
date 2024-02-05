import NextAuth, { type DefaultSession } from "next-auth";
import db from "./lib/db";

import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user , account }) {

      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      if (user.id === undefined) {
        // Handle the case when user.id is undefined
        // You may want to log an error, throw an exception, or handle it accordingly
        return false;
      }

      const existingUser = await getUserById(user?.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;
     
     
      return true;
    },
    async session({ token  , session }) {
        
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const existUser = await getUserById(token.sub);
      if (!existUser) return token;

      token.role = existUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
