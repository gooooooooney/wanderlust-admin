"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTransition } from "react";
import {  SignUp } from "@/actions/auth";
import { toast } from "sonner";
import { Btn } from "@/components/btn";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Please enter a valid username.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Please enter a password with at least 8 characters.",
  }),
});

export function SignUpForm() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      SignUp({
        username: values.username,
        email: values.email,
        password: values.password,
      })
        .then((res) => {
          toast.success("Successfully signed up.");
          router.push("/sign-in")
        })
        .catch((e) => {
          console.log(e)
          toast.error("Failed to sign up.");
        });
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid  items-center gap-1.5"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Please enter your username"
                />
              </FormControl>
              {/* <FormDescription>
                This is your username.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="Please enter your email address "
                />
              </FormControl>
              {/* <FormDescription>
                This is your email address.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="Please enter your password "
                />
              </FormControl>
              {/* <FormDescription>This is your password.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Btn disabled={isPending} type="submit">Sign up</Btn>
      </form>
    </Form>
  );
}
