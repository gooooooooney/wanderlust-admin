"use server"

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();


export const deleteFiles = async (keys: string[]) => {

  try {
    await utapi.deleteFiles(keys);
  } catch (error) {
    // if the image is not a loadthing's image, do nothing
  }
}