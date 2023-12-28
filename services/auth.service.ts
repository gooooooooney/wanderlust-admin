import { db } from "@/lib/db";
import { auth } from "@/next-auth";


export class AuthService {
  static async getSelf() {
    const session = await auth();
    const self = session?.user;

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
      throw new Error("Not found");
    }
    return user;
  }

}