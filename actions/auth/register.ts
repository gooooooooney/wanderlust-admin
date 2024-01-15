"use server"

import { SALT } from "@/lib/constants";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/schemas";
import { UserService } from "@/services/user.service";
import { z } from "zod";

import * as bcrypt from "bcryptjs";
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