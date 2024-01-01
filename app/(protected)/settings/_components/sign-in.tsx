"use client"
import { updateSetting } from "@/actions/setting";
import { deleteFiles } from "@/actions/uploadthing";
import { updateUser } from "@/actions/user";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone, getUploadThingKeys } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, ElementRef, useTransition, useState } from "react";
import { toast } from "sonner";


interface SettingAvatarProps {
  initialSignInImage?: string | null
};

export const SettingSignIn = ({
  initialSignInImage,
}: SettingAvatarProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState(initialSignInImage || "")



  const onRemove = () => {
    startTransition(() => {
      deleteFiles(getUploadThingKeys([image])).then(res => {
        if (res.success) {
          updateSetting({ signInCoverImage: null })
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
    <Card >
      <CardHeader>
        <Label>Sign In Cover Image</Label>
      </CardHeader>
      <CardDescription className="px-6 mb-4">
        This is your avatar.
      </CardDescription>
      <CardContent>
        <div className="max-w-md ">
          {image ? (
            <div className="relative aspect-video rounded-xl overflow-hidden ">
              <div className="absolute top-2 right-2 z-[10]">
                <Hint label="Remove sign-in image" asChild side="left">
                  <Button
                    type="button"
                    disabled={isPending}
                    onClick={onRemove}
                    className="h-auto w-auto p-1.5"
                  >
                    {
                      isPending ? (
                        <ReloadIcon className="h-4 w-4 animate-spin" />
                      )
                        : (
                          <TrashIcon className="h-4 w-4" />
                        )

                    }
                  </Button>
                </Hint>
              </div>
              <Image
                alt="Image"
                src={image}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="rounded-xl  outline-dashed outline-muted">
              <UploadDropzone
                endpoint="signInLoader"
                className={cn(
                  [
                    "ut-label:text-primary",
                    "ut-allowed-content:text-primary ",
                    "ut-button:bg-primary ut-button:text-primary-foreground ut-button:shadow ut-button:hover:bg-primary/90 ut-button:ut-readying:bg-primary-500/50",
                  ]
                )}
                onClientUploadComplete={(res) => {
                  setImage(res?.[0]?.url);
                  router.refresh();
                }}
              />
            </div>

          )}
        </div>
      </CardContent>
    </Card>
  )
}