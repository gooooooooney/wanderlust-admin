import NextAuth from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "./lib/db"
import authConfig from './next-auth.config'
import { UserService } from "./services/user.service"
import { TwoFactorConfirmation } from "./services/twoFactorConfirmation.service"
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
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        });
      }

      return true;
    },
    async session({token, session})  {
      if (token.sub) {
        session.user.id = token.sub
      }

      if (token.username) {
        session.user.email = token.username as string
      }
      return session
    },
    async jwt({token} ) {
      const id = token.sub
      if (!id) return token

      const dbUser = await db.user.findUnique({
        where: {id},
        select: {
          email: true
        }
      })
      if (!dbUser) return token
      
      return {
        ...token,
        email: dbUser.email
      }
    }
  },
  events: {
    createUser: async ({user}) => {
      const email = user.email || ""
      // const username = generateUsername(user.name)

      // await db.user.update({
      //   where: {email},
      //   data: {
      //     username,
      //     stream: {
      //       create: {
      //         name: `${username}'s stream`
      //       }
      //     }
      //   }
      // })
      
    }
  },
  ...authConfig,
})