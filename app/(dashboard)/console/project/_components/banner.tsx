"use client";

import { addBanners } from "@/actions/pageinfo";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useTransition, useState } from "react";
import { toast } from "sonner";
import { Banner } from "@prisma/client";
import { Description } from "@/components/typography/text";
import { DataTableBanners } from "./datatable";

type SettingBannerProps = {
  initialBanners?: Banner[];
};

export const SettingBanner = ({ initialBanners }: SettingBannerProps) => {
  const [isPending, startTransition] = useTransition();
  const [banners, setBanners] = useState<string[]>(
    initialBanners?.map((v) => v.imageSrc) || []
  );

  const onUpload = (res: string[]) => {
    startTransition(() => {
      addBanners(
        res.map((url, i) => ({
          imageSrc: url,
          order: i,
        }))
      )
        .then((r) => {
          if (r) {
            setBanners(res);
            toast.success("Upload success");
          } else {
            toast.error("Upload failed");
          }
        })
        .catch(() => {
          toast.error("Upload failed");
        });
    });
  };

  return (
    <div>
      <Label>Set your banners</Label>
      <Description className="my-2">
        This is your banners. You can upload your banners here. You can upload
        up to 5 banners and each banner must be less than 5MB.
      </Description>
      <div className="flex flex-col gap-y-4">
        <div className="max-w-md ">
          <div className="rounded-xl  outline-dashed outline-muted">
            <UploadDropzone
              endpoint="bannerUploader"
              className={cn([
                "ut-label:text-primary",
                "after:bg-primary",
                "ut-button:bg-primary ut-button:text-primary-foreground ut-button:shadow ut-button:hover:bg-primary/90 ut-button:ut-readying:bg-primary-500/50",
              ])}
              onClientUploadComplete={(res) => {
                onUpload(res.map((i) => i.url));
              }}
            />
          </div>
        </div>
        <div>
          <DataTableBanners banners={initialBanners || []} />
        </div>
      </div>
    </div>
  );
};
