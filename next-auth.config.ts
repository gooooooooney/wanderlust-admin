import { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "@/lib/db"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import * as bcrypt from "bcryptjs"
import { LoginSchema } from "./schemas"
import { UserService } from "./services/user.service"

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
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          
          const user = await UserService.getUserByEmail(email);
          if (!user || !user.hashedPassword) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.hashedPassword,
          );

          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ]
} satisfies NextAuthConfig