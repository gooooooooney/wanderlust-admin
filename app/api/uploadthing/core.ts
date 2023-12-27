import { createUploadthing, type FileRouter } from "uploadthing/next";

import { db } from "@/lib/db";
import { UserService } from "@/services/user.service";
import { AuthService } from "@/services/auth.service";
import { SettingService } from "@/services/setting.service";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1
    }
  })
    .middleware(async () => {
      const self = await AuthService.getSelf();

      return { user: self }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await UserService.updateUser(
        metadata.user.id,
        { image: file.url }
      )

      return { fileUrl: file.url };
    }),
  signInLoader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1
    }
  })
    .middleware(async () => {
      const self = await AuthService.getSelf();

      return { user: self }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await SettingService.updateSetting({
        signInCoverImage: file.url
      })

      return { fileUrl: file.url };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;