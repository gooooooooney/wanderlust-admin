import { db } from "@/lib/db";

export class VerificationTokenService {
  static async getVerificationTokenByToken(token: string) {
    try {
      const verificationToken = await db.verificationToken.findUnique({
        where: { token },
      });

      return verificationToken;
    } catch {
      return null;
    }
  }

  static async getVerificationTokenByEmail(email: string) {
    try {
      const verificationToken = await db.verificationToken.findFirst({
        where: { email },
      });

      return verificationToken;
    } catch {
      return null;
    }
  }
  static async deleteVerificationToken(id: string) {
    await db.verificationToken.delete({
      where: {
        id,
      },
    });
  }
  static async createVerificationToken(
    email: string,
    token: string,
    expires: Date
  ) {
    return await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
  }
}
