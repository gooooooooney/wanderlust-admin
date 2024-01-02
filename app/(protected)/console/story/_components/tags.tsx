import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { generateColor } from "@/lib/utils";
import { Tag } from "@prisma/client";
import { Cross2Icon } from "@radix-ui/react-icons";

type TagsProps = {
  tags: Tag[];
  onDeleted: (tag: Tag) => void;
};

export const Tags = ({ onDeleted,tags }: TagsProps) => {
  return (
    <ToggleGroup
      type="multiple"
      
    >
      {tags.map((tag) => (
        <ToggleGroupItem
          key={tag.id}
          size="sm"
          className="hover:bg-transparent hover:text-inherit h-6 pr-0 "
          style={{
            backgroundColor: generateColor(tag.name),
          }}
          value={tag.name}
          aria-label={`Toggle ${tag.name}`}
        >
          <div className="">{tag.name}</div>
          <div onClick={() => {
            
            onDeleted(tag)
          }} className="w-5 h-5 flex items-center justify-center mx-1 hover:text-muted-foreground">
            <Cross2Icon className="" />
          </div>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

