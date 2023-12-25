import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InputWithLabelProps = {
    label: string;
    id: string;
    type?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    wrapperClassName?: string;
}

export function InputWithLabel({
    label,
    id,
    type = "text",
    placeholder,
    wrapperClassName,
    value,
    onValueChange
}: InputWithLabelProps) {
  return (
    <div className={cn("grid w-full max-w-2xl items-center gap-1.5", wrapperClassName)}>
      <Label htmlFor={id}>{label}</Label>
      <Input value={value} onChange={(e) => onValueChange?.(e.target.value)} type={type} id={id} placeholder={placeholder} />
    </div>
  );
}
