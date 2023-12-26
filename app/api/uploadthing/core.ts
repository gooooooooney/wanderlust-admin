import { createUploadthing, type FileRouter } from "uploadthing/next";

import { db } from "@/lib/db";
import { UserService } from "@/services/user.service";
import { AuthService } from "@/services/auth.service";

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
      await db.pageInfo.update({
        where: {
          userId: metadata.user.id,
        },
        data: {
          signInCoverImage: file.url,
        },
      });

      return { fileUrl: file.url };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;