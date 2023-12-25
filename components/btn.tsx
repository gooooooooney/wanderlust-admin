import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import { RxReload } from "react-icons/rx";

export const Btn = ({ children, ...props }: ButtonProps) => {
  return (
    <Button {...props}>
      <RxReload
        className={cn("mr-2 animate-spin", {
          hidden: !props.disabled,
        })}
      />
      {children}
    </Button>
  );
};
