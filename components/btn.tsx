import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import { RxReload } from "react-icons/rx";
import { BeatLoader } from "react-spinners";

export const Btn = ({ children, ...props }: ButtonProps) => {
  return (
    <Button {...props}>
      <BeatLoader color="white" loading={props.disabled} size={8} />
      <span className={cn(props.disabled && "hidden")}>{children}</span>
    </Button>
  );
};
