"use server"

import { db } from "@/lib/db"
import { AuthService } from "@/services/auth.service"

export const getPageInfoByUserId = async (userId: string) => {
  return await db.pageInfo.findUnique({
    where: {
      userId
    }
  })
}

export type Banner = {
  order: number;
  title: string;
  description?: string;
  imageUrl: string;
}

export const addBanners = async ( banners: Banner[]) => {
  const user = await AuthService.getSelf()
  return await db.pageInfo.update({
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
}