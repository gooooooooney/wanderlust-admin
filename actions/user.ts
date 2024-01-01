"use server";

import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { UserService } from "@/services/user.service";
import { AuthService } from "@/services/auth.service";

export const updateUser = async (values: Partial<User>) => {
  const self = await AuthService.getSelf();

  
  const validData = {
    name: values.name,
    image: values.image,
    isTwoFactorEnabled: values.isTwoFactorEnabled,
  };


  if (validData.name === "" || validData.name === null) {
    throw new Error("Username is require");
  }


  const user = await UserService.updateUser(self.id, validData)
  console.log({user})

  revalidatePath("/");

  return user;
};

