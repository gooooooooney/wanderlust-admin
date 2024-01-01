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
  static async deleteTwoFactorConfirmation(id: string) {
    await db.twoFactorConfirmation.delete({
      where: {
        id,
      },
    });
  }
    static async createTwoFactorConfirmation(
        userId: string,
    ) {
        return await db.twoFactorConfirmation.create({
            data: {
              userId,
            }
          });
    }
}
