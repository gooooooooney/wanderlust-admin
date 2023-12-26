import NextAuth from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "./lib/db"
import authConfig from './next-auth.config'
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
    async signIn({credentials}) {
     

      return true
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