"use server"

import { db } from "@/lib/db"
import { AuthService } from "@/services/auth.service"
import { BannerService } from "@/services/banner.service"
import { revalidatePath, revalidateTag } from "next/cache"

export const getPageInfoByUserId = async (userId: string) => {
  return await db.pageInfo.findUnique({
    where: {
      userId
    }
  })
}

export type Banner = {
  order: number;
  description?: string;
  imageUrl?: string;
  imageSrc: string;
}

export const addBanners = async ( banners: Banner[]) => {
  const user = await AuthService.getSelf()
  const result = await db.pageInfo.update({
    where: {
      userId: user.id
    },
    data: {
      banner: {
        createMany: {
          data: banners
        },
      },
      
    }
  })
  revalidatePath("/console/project")
  return result
}

export const updateBanner = async (id: string, banner: Partial<Banner>) => {
  return await BannerService.updateBanner(id, banner)
}

export const deleteBanners = async (ids: string[]) => {
  const result = await BannerService.deleteBanners(ids)
  revalidatePath("/console/project")
  return result
}