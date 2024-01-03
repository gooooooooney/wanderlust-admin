import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn, generateColor } from "@/lib/utils";
import { Tag } from "@prisma/client";
import { Cross2Icon } from "@radix-ui/react-icons";

type TagsProps = {
  tags: Tag[];
  onDeleted?: (tag: Tag) => void;
  className?: string;
};

export const Tags = ({ onDeleted, tags, className }: TagsProps) => {
  
  return (
    <ToggleGroup
      type="multiple"
      className={cn("justify-start flex-wrap", className)}
    >
      {tags.map((tag) => (
        <ToggleGroupItem
          key={tag.id}
          size="sm"
          className={cn("hover:bg-transparent hover:text-inherit h-6", {
            "pr-0": onDeleted,
          })}
          style={{
            backgroundColor: generateColor(tag.name).backgroundColor,
            color: generateColor(tag.name).color,
          }}
          value={tag.name}
          aria-label={`Toggle ${tag.name}`}
        >
          <div className="">{tag.name}</div>

          {
            onDeleted &&
            <div onClick={() => {

              onDeleted(tag)
            }} className="w-5 h-5 flex items-center justify-center mx-1 hover:text-muted-foreground">
              <Cross2Icon className="" />
            </div>
          }

        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

