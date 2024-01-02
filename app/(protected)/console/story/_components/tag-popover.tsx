import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { Tags } from "./tags";
import { Tag } from "@prisma/client";
import { ControllerRenderProps } from "react-hook-form";
import {
  CommanCustomInput,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { ToggleOne } from "./tag";
import { H3 } from "@/components/typography/text";

type TagsProps = {
  children: React.ReactNode;
  tags: Tag[];
} & ControllerRenderProps<
  {
    title: string;
    description: string;
    link: string;
    tags: string[];
    order: string;
    author: string;
    coverSrc: string;
  },
  "tags"
>;

export const TagPopover = ({ tags, children }: TagsProps) => {
  const [value, setValue] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="px-0 py-1">
        <div className="">
          {/* <div className="flex px-2 items-center py-2 w-full border-b">
            <ToggleIcon tags={tags} />
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border-none shadow-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-none"
            />
          </div> */}
          <div className="">
            {/* <ToggleIcon tags={tags} /> */}
            <Command>
              <CommanCustomInput
                ref={inputRef}
                onValueChange={(currentValue) => {
                  setValue(currentValue);
                }}
                className="ml-2 border-none shadow-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-none"
              >
                <Tags
                  onDeleted={(tag) => {
                    setSelectedTags((prev) => {
                      return prev.filter((item) => item.name !== tag.name);
                    });
                    setValue("");
                  }}
                  tags={selectedTags}
                />
              </CommanCustomInput>
              {/* <CommandPrimitive.Input /> */}
              <CommandEmpty>
                <div className="flex items-center bg-muted mx-2 px-2 py-1 gap-x-2 cursor-pointer">
                  <p>Create</p>
                  <ToggleOne name={value} />
                </div>
              </CommandEmpty>
              <CommandGroup>
                {tags.map((tag) => (
                  <CommandItem
                    key={tag.id}
                    value={tag.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      // setOpen(false);
                      setSelectedTags((prev) => {
                        const flag = currentValue === value;
                        if (flag) {
                          return prev.filter(
                            (item) => item.name !== currentValue
                          );
                        }
                        return [...prev, tag];
                      });
                      inputRef.current?.focus();
                    }}
                  >
                    {tag.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === tag.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
