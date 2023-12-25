import { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "@/lib/db"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export default {
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

    // }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,

    // })
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        // check to see if email and password is there
        if (!credentials.email || !credentials.password) {
          throw new Error('Please enter an email and password')
        }

        // check to see if user exists
        const user = await db.user.findUnique({
          where: {
            email: credentials.email as string
          }
        });

        // if no user was found 
        if (!user || !user?.hashedPassword) {
          throw new Error('No user found')
        }

        // check to see if password matches
        // const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

        // // if password does not match
        // if (!passwordMatch) {
        //   throw new Error('Incorrect password')
        // }

        return user;
      }
    })
  ]
} satisfies NextAuthConfig