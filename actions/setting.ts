"use server"

import { SettingService } from "@/services/setting.service"
import { Settings } from "@prisma/client"

export const updateSetting = async (values: Partial<Settings>) => {
   await SettingService.updateSetting(values)
  //  revalidatePath("/");
}