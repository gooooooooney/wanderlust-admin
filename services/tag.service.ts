import { db } from "@/lib/db";
import { AuthService } from "./auth.service";
import { Tag } from "@prisma/client";

export class TagService {
  static async getTags() {
    const user = await AuthService.getSelf();

    return await db.tag.findMany({
      where: {
        userId: user.id,
      },
    });
  }
  static async createTag(name: string) {
    const user = await AuthService.getSelf();
    return await db.tag.create({
      data: {
        name,
        userId: user.id,
      },
    });
  }

  static async deleteTag(id: string) {
    return await db.tag.delete({
      where: {
        id,
      },
    });
  }
}
