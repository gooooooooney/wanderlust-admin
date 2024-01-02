"use server"

import { SettingService } from "@/services/setting.service"
import { Settings } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const updateSetting = async (values: Partial<Settings>) => {
   await SettingService.updateSetting(values)
   revalidatePath("/");
}