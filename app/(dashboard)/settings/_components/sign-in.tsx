"use client"
import { updateUser } from "@/actions/user";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/lib/uploadthing";
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
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState(initialSignInImage || "")



  const onRemove = () => {
    startTransition(() => {
      updateUser({ image: null })
        .then(() => {
          setImage("")
          toast.success("Image removed");
          closeRef.current?.click();
        })
        .catch(() => {
          toast.error("Something went wrong")
        });

    })
  }
  return (
    <Card className="max-w-md">
      <CardHeader>
        Setting Sign In Cover Image
      </CardHeader>
      <CardContent>
        {image ? (
          <div className="relative aspect-video rounded-xl overflow-hidden ">
            <div className="absolute top-2 right-2 z-[10]">
              <Hint label="Remove thumbnail" asChild side="left">
                <Button
                  type="button"
                  disabled={isPending}
                  onClick={onRemove}
                  className="h-auto w-auto p-1.5"
                >
                  <TrashIcon className="h-4 w-4" />
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
                closeRef?.current?.click();
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}