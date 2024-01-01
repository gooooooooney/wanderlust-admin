"use server";

import { db } from "@/lib/db";
import { UserService } from "@/services/user.service";
import { VerificationTokenService } from "@/services/verificationToken.service";

export const newVerification = async (token: string) => {
  const existingToken = await VerificationTokenService.getVerificationTokenByToken(token);
  console.log(token)
  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await UserService.getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await UserService.updateUser(existingUser.id, { emailVerified: new Date(), email: existingToken.email });

  await VerificationTokenService.deleteVerificationToken(existingToken.id);

  return { success: "Email verified!" };
};
