
import * as z from "zod";


export const LoginSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Please enter a password with at least 8 characters.",
    }),
    code: z.optional(z.string()),
  });

  export const RegisterSchema = z.object({
    name: z.string().min(4, {
      message: "Please enter a valid username.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Please enter a password with at least 8 characters.",
    }),
  });


  export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }),
  });
  
  export const ResetSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
  });