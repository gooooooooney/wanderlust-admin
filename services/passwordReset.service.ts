import { db } from "@/lib/db";

export class PasswordResetService {
  static async getPasswordResetTokenByToken(token: string) {
    try {
      const passwordResetToken = await db.passwordResetToken.findUnique({
        where: { token },
      });

      return passwordResetToken;
    } catch {
      return null;
    }
  }

  static async getPasswordResetTokenByEmail(email: string) {
    try {
      const passwordResetToken = await db.passwordResetToken.findFirst({
        where: { email },
      });

      return passwordResetToken;
    } catch {
      return null;
    }
  }
  static async deletePasswordResetToken(id: string) {
    await db.passwordResetToken.delete({
      where: {
        id,
      },
    });
  }
  static async createPasswordResetToken(
    email: string,
    token: string,
    expires: Date
  ) {
    return await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
  }
}
