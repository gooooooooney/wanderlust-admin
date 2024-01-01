import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";


export class AuthService {
  static async getSelf() {
    const self = await currentUser();

    if (!self || !self.email) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { id: self.id },
      include: {
        pageInfo: {
          include: {
            banner: true
          }
        },
      }
    });

    if (!user) {
      throw new Error("Unauthorized");
    }
    return user;
  }

}