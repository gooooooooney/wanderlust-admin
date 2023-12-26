"use server"

import { db } from "@/lib/db"
import { signIn } from "@/next-auth"
import * as bcrypt from "bcryptjs"

const slat = bcrypt.genSaltSync(Number(process.env.HASH_SALT))

export const NextSignIn = signIn


export const SignUp = async ({ username, email, password }: {
  username: string,
  email: string,
  password: string
}) => {
  return await db.$transaction(async prisma => {
    const hasExistingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (hasExistingUser) {
      throw new Error("Email already exists")
    }
    return prisma.user.create({
      data: {
        name: username,
        email,
        hashedPassword: bcrypt.hashSync(password, slat),
        pageInfo: {
          create: {}
        },
        accounts: {
          create: {
            type: "email",
            provider: "credentials",
            providerAccountId: email,
          },
        }
      },
    })
  })
}