"use client"
import { updateUser } from "@/actions/user";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, ElementRef, useTransition, useState } from "react";
import { toast } from "sonner";


interface SettingAvatarProps {
  initialUsername: string | null;
  initialImage: string | null
};

export const SettingUserInfo = ({
  initialImage,
  initialUsername
}: SettingAvatarProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [username, setUsername] = useState(initialUsername || "");
  const [image, setImage] = useState(initialImage || "")

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({ name: username })
        .then(() => {
          toast.success("Username updated");
          closeRef.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

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
        User Info
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label className="mb-2 block" htmlFor="username">Username</Label>
            <Input placeholder="Username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isPending}
            />
          </div>
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
                endpoint="imageUploader"
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
          <div className="flex justify-between">
            <Button ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </Button>
            <Button
              disabled={isPending}
              type="submit"
            >
              {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}