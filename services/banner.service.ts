import { db } from "@/lib/db";
import { Banner } from "@prisma/client";


export class BannerService {

  static async updateBanner(bannerId: string, banner: Partial<Pick<Banner, "order" | "title" | "description" | "imageUrl">>) {
    try {
      const result = await db.banner.update({
        where: {
          id: bannerId
        },
        data: {
          ...banner
        }
      })
      return !!result
    } catch (error) {
      return false
    }
  }

  static async deleteBanners(bannerIds: string[]) {
    try {
      const result = await db.banner.deleteMany({
        where: {
          id: {
            in: bannerIds
          }
        }
      })
      return !!result
    } catch (error) {
      return false
    }
  }
}