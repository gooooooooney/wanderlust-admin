import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();


export const getUploadThingKeys = (urls: string[]) => {
  return urls.map(url => {
    const u = new URL(url);
    const key = u.pathname.split("/").pop() || "";
    return key;
  })
}