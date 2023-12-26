import { db } from "@/lib/db";
import { User } from "@prisma/client";


export class UserService {
  static async updateUser(id: string, values: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>) {
    return await db.user.update({
      where: { id },
      data: { ...values }
    });
  }
}