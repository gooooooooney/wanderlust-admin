import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { generateColor } from "@/lib/utils";
import { Tag } from "@prisma/client";
import { Cross2Icon } from "@radix-ui/react-icons";

type ToggleOneProps = {
  name: string;
};

export const ToggleOne = ({ name }: ToggleOneProps) => {
  return (
    <Toggle
      size="sm"
      className="hover:bg-transparent hover:text-inherit h-6 "
      style={{
        backgroundColor: generateColor(name),
      }}
      value={name}
      aria-label={`Toggle ${name}`}
    >
      {name}
    </Toggle>
  );
};
