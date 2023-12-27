import { db } from "@/lib/db";
import { Settings } from "@prisma/client";

export class SettingService {
  static async updateSetting(values: Partial<Omit<Settings, "id" | "createdAt" | "updatedAt">>) {
    return await db.settings.update({
      where: { role: "root" },
      data: { ...values }
    });
  }

  static initDefaultSetting() {
    db.$transaction(async prisma => {
      const settings = await SettingService.getSetting();
      if (settings) return;
      await prisma.settings.create({
        data: {
          role: "root",
        }
      })
    })
  }

  static async getSetting() {
    return await db.settings.findUnique({
      where: { role: "root" }
    });
  }
}