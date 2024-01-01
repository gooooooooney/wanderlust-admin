"use server";

import { SALT } from "@/lib/constants";
import { db } from "@/lib/db"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { signIn } from "@/next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { TwoFactorConfirmation } from "@/services/twoFactorConfirmation.service";
import { TwoFactorToken } from "@/services/twoFactorToken.service";
import { UserService } from "@/services/user.service";
import * as bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import * as z from "zod";


// export const NextSignIn = signIn;

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await UserService.getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
    return { error: "Email does not exist!" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await TwoFactorToken.getTwoFactorTokenByEmail(
        existingUser.email
      );

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
      });

      const existingConfirmation = await TwoFactorConfirmation.getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id }
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        }
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token,
      );

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
};

// 
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, SALT);

  const existingUser = await UserService.getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      hashedPassword,
      pageInfo: {
        create: {},
      },
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};

export const SignUp = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  return await db.$transaction(async (prisma) => {
    const hasExistingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (hasExistingUser) {
      throw new Error("Email already exists");
    }
    return prisma.user.create({
      data: {
        name: username,
        email,
        hashedPassword: bcrypt.hashSync(password, SALT),
        pageInfo: {
          create: {},
        },
        accounts: {
          create: {
            type: "email",
            provider: "credentials",
            providerAccountId: email,
          },
        },
      },
    });
  });
};
