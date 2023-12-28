"use client";

import { addBanners } from "@/actions/pageinfo";
import { updateSetting } from "@/actions/setting";
import { deleteFiles } from "@/actions/uploadthing";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { UploadDropzone, getUploadThingKeys } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useTransition, useState } from "react";
import { toast } from "sonner";
import { Banner } from "@prisma/client";
import EmblaCarousel from "./carousel/embla-carousel";
import { Description } from "@/components/typography/text";
import { DataTableBanners } from "./datatable";
import { DataTableDemo } from "./datatable/t";

type SettingBannerProps = {
  initialBanners?: Banner[];
};

export const SettingBanner = ({ initialBanners }: SettingBannerProps) => {
  const [isPending, startTransition] = useTransition();
  const [banners, setBanners] = useState<string[]>(
    initialBanners?.map((v) => v.imageUrl) || []
  );

  const onUpload = (res: string[]) => {
    startTransition(() => {
      addBanners(
        res.map((url, i) => ({
          imageUrl: url,
          title: "",
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

  const onRemove = () => {
    startTransition(() => {
      deleteFiles(getUploadThingKeys(banners)).then((res) => {
        if (res.success) {
          // updateSetting({ signInCoverImage: null })
          //   .then(() => {
          //     setBanners([])
          //     toast.success("");
          //   })
          //   .catch(() => {
          //     toast.error("Something went wrong")
          //   });
        } else {
          toast.error("Delete failed");
        }
      });
    });
  };
  return (
    <div>
      <Label>Set your banners</Label>
      <Description className="my-2">
        This is your banners. You can upload your banners here. You can upload up to 5 banners and each banner must be less than 5MB.
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
                console.log(res);
                onUpload(res.map((i) => i.url));
              }}
            />
          </div>
        </div>
        <div className="">
          {/* {banners.length > 0 && <EmblaCarousel banners={banners} />} */}
          {/* {banners.length > 0 && <DataTableDemo banners={initialBanners || []} />} */}
          {banners.length > 0 && <DataTableBanners banners={initialBanners || []} />}
        </div>
      </div>
    </div>
  );
  return (
    <Card>
      <CardHeader>
        <Label>Set your banners</Label>
      </CardHeader>
      <CardDescription className="px-6 mb-4">
        This is your banners.
      </CardDescription>
      <CardContent className="flex flex-col gap-y-4">
        <div className="max-w-md ">
          <div className="rounded-xl  outline-dashed outline-muted">
            <UploadDropzone
              endpoint="bannerUploader"
              className={cn([
                "ut-label:text-primary",
                "ut-allowed-content:text-primary ",
                "ut-button:bg-primary ut-button:text-primary-foreground ut-button:shadow ut-button:hover:bg-primary/90 ut-button:ut-readying:bg-primary-500/50",
              ])}
              onClientUploadComplete={(res) => {
                console.log(res);
                onUpload(res.map((i) => i.url));
              }}
            />
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          {banners.length > 0 && <EmblaCarousel banners={banners} />}
        </div>
      </CardContent>
    </Card>
  );
};
