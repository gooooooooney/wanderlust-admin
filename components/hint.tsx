import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type HintProps = {
  label: string;
  children: React.ReactNode;
  asChild?: boolean;
  sideOffset?: number
  className?: string
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
};

export const Hint = ({
  label,
  children,
  asChild,
  side,
  align,
  className,
  sideOffset = 20,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger  asChild={asChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side={side}
          className={className}
          sideOffset={sideOffset}
          align={align}
        >
          <p className="font-semibold">
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};