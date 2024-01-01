"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ElementRef } from "react";
import Image from "next/image"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { ReloadIcon, GearIcon, TrashIcon } from "@radix-ui/react-icons";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";

interface SettingModalProps {
  initialUsername: string | null;
  initialImage: string | null
};

export const SettingModal = ({
  initialImage,
  initialUsername
}: SettingModalProps) => {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <GearIcon className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user settings</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isPending}
          />
          {image ? (
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
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
            <div className="rounded-xl border outline-dashed outline-muted">
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
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              type="submit"
            >
              {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};