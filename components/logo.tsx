import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Lilita_One } from "next/font/google";

const lilitaOne = Lilita_One({
  subsets: ["latin"],
  weight: ["400"],
});

const logoSizes = cva(
  "text-orange-400",
  {
    variants: {
      size: {
        default: "text-2xl",
        lg: "text-4xl",
        md: "text-3xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const Logo = ({size}: VariantProps<typeof logoSizes>) => {
  return (
    <p className={cn(logoSizes({
      size,
    }),lilitaOne.className )}>
      Wander<span className="text-sky-500">lust</span>
    </p>
  );
};
