"use client"
import { deleteFiles } from "@/actions/uploadthing";
import { updateUser } from "@/actions/user";
import { Btn } from "@/components/btn";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/user-avatar";
import { UploadDropzone, getUploadThingKeys } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod"

const formSchema = z.object({
  username: z.string().min(2).max(50, {
    message: "Username must be between 2 and 50 characters",
  }),
})

interface SettingAvatarProps {
  initialUsername: string | null;
  initialImage: string | null
};

export const SettingUserInfo = ({
  initialImage,
  initialUsername
}: SettingAvatarProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState(initialImage || "")
  const [field, setField] = useState<"username" | "image" | "">("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: initialUsername || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setField("username")

    startTransition(() => {
      updateUser({ name: values.username })
        .then(() => {
          toast.success("Username updated");
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }


  const onRemove = () => {
    setField("image")
    startTransition(() => {
      deleteFiles(getUploadThingKeys([image])).then(res => {
        if (res.success) {
          updateUser({ image: null })
            .then(() => {
              setImage("")
              toast.success("Image removed");
            })
            .catch(() => {
              toast.error("Something went wrong")
            });
        } else {
          toast.error("Delete failed")
        }
      })
    })
  }


  return (
    <div className="flex flex-col gap-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your username.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Btn disabled={field == "username" && isPending} type="submit">Submit</Btn>
        </form>
      </Form>

      <Card >
        <CardHeader>
          <Label>Avatar</Label>
        </CardHeader>
        <CardDescription className="px-6">
          This is your avatar.
        </CardDescription>
        <CardContent >
          <div className="max-w-md ">
            {image ? (
              <div className="relative flex items-center justify-center aspect-video rounded-xl overflow-hidden ">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove avatar" asChild side="left">
                    <Button
                      type="button"
                      disabled={field == "image" && isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      {
                        (field == "image" && isPending) ? (
                          <ReloadIcon className="h-4 w-4 animate-spin" />
                        )
                          : (
                            <TrashIcon className="h-4 w-4" />
                          )

                      }

                    </Button>
                  </Hint>
                </div>
                <UserAvatar username="" size="preview" imageUrl={image!} />
                {/* <Image
                    alt="Image"
                    src={image}
                    fill
                    className="object-cover"
                  /> */}
              </div>
            ) : (
              <div className="rounded-xl  outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="imageUploader"
                  className={cn(
                    [
                      "ut-label:text-primary",
                      "ut-allowed-content:text-primary ",
                      "ut-button:bg-primary ut-button:text-primary-foreground ut-button:shadow ut-button:hover:bg-primary/90",
                    ]
                  )}
                  onClientUploadComplete={(res) => {
                    setImage(res?.[0]?.url);
                    router.refresh()
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>


    </div>
  )
}