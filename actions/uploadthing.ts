"use server"

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();


export const deleteFiles = async (keys: string[]) => {

  return await utapi.deleteFiles(keys);
}