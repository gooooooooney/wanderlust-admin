import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const avatarSizes = cva(
  "",
  {
    variants: {
      size: {
        default: "h-8 w-8",
        lg: "h-14 w-14",
        md: "h-9 w-9",
        preview: "h-20 w-20 border",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface UserAvatarProps
  extends VariantProps<typeof avatarSizes> {
  username: string;
  imageSrc: string;
  isLive?: boolean;
  showBadge?: boolean;
};

export const UserAvatar = ({
  username,
  imageSrc,
  size,
}: UserAvatarProps) => {

  return (
    <div className="relative">
      <Avatar
        className={cn(
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageSrc} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

interface UserAvatarSkeletonProps 
  extends VariantProps<typeof avatarSizes> {};

export const UserAvatarSkeleton = ({
  size,
}: UserAvatarSkeletonProps) => {
  return (
    <Skeleton className={cn(
      "rounded-full",
      avatarSizes({ size }),
    )} />
  );
};