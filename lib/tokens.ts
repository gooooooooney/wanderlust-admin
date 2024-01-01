import { VerificationTokenService } from "@/services/verificationToken.service";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { TwoFactorToken } from "@/services/twoFactorToken.service";
import { PasswordResetService } from "@/services/passwordReset.service";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  // 5 minutes
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await TwoFactorToken.getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await TwoFactorToken.deleteTwoFactorToken(existingToken.id);
  }

  const twoFactorToken = await TwoFactorToken.createTwoFactorToken(
    email,
    token,
    expires
  );

  return twoFactorToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  // 1 hour
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken =
    await VerificationTokenService.getVerificationTokenByEmail(email);

  if (existingToken) {
    VerificationTokenService.deleteVerificationToken(existingToken.id);
  }

  const verficationToken =
    await VerificationTokenService.createVerificationToken(
      email,
      token,
      expires
    );

  return verficationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  // 1 hour
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await PasswordResetService.getPasswordResetTokenByEmail(
    email
  );

  if (existingToken) {
    await PasswordResetService.deletePasswordResetToken(existingToken.id);
  }

  const passwordResetToken =
    await PasswordResetService.createPasswordResetToken(email, token, expires);

  return passwordResetToken;
};
