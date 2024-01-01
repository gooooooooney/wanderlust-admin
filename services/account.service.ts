import { db } from "@/lib/db";

export class AccountService {
  static async getAccountByUserId(userId: string) {
    try {
      const account = await db.account.findFirst({
        where: { userId },
      });

      return account;
    } catch {
      return null;
    }
  }
}
