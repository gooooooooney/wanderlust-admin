"use client";
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
import { useState, useTransition } from "react";
import { Btn } from "@/components/btn";
import { FormError } from "../../../../components/auth/form-error";
import { FormSuccess } from "../../../../components/auth/form-success";
import { ResetSchema } from "@/schemas";
import { reset } from "@/actions/auth/reset";

export function RestForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof ResetSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="username@example.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Btn className="mt-4" disabled={isPending} type="submit">
          Send Reset Email
        </Btn>
      </form>
    </Form>
  );
}
