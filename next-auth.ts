import NextAuth from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "./lib/db"
import authConfig from './next-auth.config'
import { UserService } from "./services/user.service"
import { TwoFactorConfirmation } from "./services/twoFactorConfirmation.service"
import { UserRole } from "@prisma/client"
import { AccountService } from "./services/account.service"
// import {generateUsername} from "unique-username-generator"


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: PrismaAdapter(db),
  // pages: {
  //   signIn: "/sign-in",
  // },
  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await UserService.getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await TwoFactorConfirmation.getTwoFactorConfirmationByUserId(existingUser.id);

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await TwoFactorConfirmation.deleteTwoFactorConfirmation(twoFactorConfirmation.id);
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({token} ) {
      if (!token.sub) return token;

      const existingUser = await UserService.getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await AccountService.getAccountByUserId(
        existingUser.id
      );

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    
    }
  },
  ...authConfig,
})