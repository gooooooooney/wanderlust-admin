import { db } from "@/lib/db";

export class TwoFactorToken {
  static async getTwoFactorTokenByToken(token: string) {
    try {
      const twoFactorToken = await db.twoFactorToken.findUnique({
        where: { token },
      });

      return twoFactorToken;
    } catch {
      return null;
    }
  }

  static async getTwoFactorTokenByEmail(email: string) {
    try {
      const twoFactorToken = await db.twoFactorToken.findFirst({
        where: { email },
      });

      return twoFactorToken;
    } catch {
      return null;
    }
  }

  static async deleteTwoFactorToken(id: string) {
    await db.twoFactorToken.delete({
      where: {
        id,
      }
    });
  }

  static async createTwoFactorToken(
    email: string,
    token: string,
    expires: Date
  ) {
    return await db.twoFactorToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
  }
}
