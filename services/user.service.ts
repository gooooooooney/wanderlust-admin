import { db } from "@/lib/db";
import { User } from "@prisma/client";


export class UserService {
  static async updateUser(id: string, values: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>) {
    return await db.user.update({
      where: { id },
      data: { ...values }
    });
  }
  static async getUserByEmail (email: string) {
    try {
      const user = await db.user.findUnique({ where: { email } });
  
      return user;
    } catch {
      return null;
    }
  };

  static async getUserById (id: string) {
    try {
      const user = await db.user.findUnique({ where: { id } });
  
      return user;
    } catch {
      return null;
    }
  }
}