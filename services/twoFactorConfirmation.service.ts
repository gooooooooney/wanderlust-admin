import { db } from "@/lib/db";

export class TwoFactorConfirmation {
  static async getTwoFactorConfirmationByUserId(userId: string) {
    try {
      const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
        where: { userId },
      });

      return twoFactorConfirmation;
    } catch {
      return null;
    }
  }
}
