import { db } from "@/lib/db";


export type Banner = {
  order: number;
  title: string;
  description?: string;
  imageUrl: string;
}

export class PageInfoService {

  static async updateBanners(userId: string, banners: Banner[]) {
    return await db.pageInfo.update({
      where: {
        userId
      },
      data: {
        banner: {
          createMany: {
            data: banners
          }
        }
      }
    })
  }
}