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
import { CaretSortIcon, Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { ToggleOne } from "./tag";
import { Text } from "@/components/typography/text";
import { Button, buttonVariants } from "@/components/ui/button";
import { createTag, deleteTag } from "@/actions/tags";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useGetTags } from "@/hooks/use-get-tags";

type TagsProps = {
  // children: React.ReactNode;
  selectTags?: Tag[];
  fetchTags?: () => void
  onChange?: (item: {id:string, name: string}[]) => void;
}

export const TagPopover = ({  selectTags, onChange }: TagsProps) => {
  const [inputValue, setInputValue] = React.useState("");
  const { tags, fetchTags } = useGetTags()

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>(selectTags || []);

  return (
    <Popover>
      <PopoverTrigger className="flex">
        {
          selectedTags.length > 0 ? (
            <Tags
              tags={selectedTags}
            />
          ) : (
            <div

              className={cn(buttonVariants({ variant: "outline" }), "w-[200px] justify-between")}>
              Select tags
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </div>
          )
        }
      </PopoverTrigger>
      <PopoverContent className="px-0 py-1">
        <Command>
          <CommanCustomInput
            ref={inputRef}
            onValueChange={(currentValue) => {
              setInputValue(currentValue);
            }}
            className="ml-2 border-none shadow-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-none"
          >
            <Tags
              onDeleted={(tag) => {
                setSelectedTags((prev) => {
                  const tags = prev.filter((item) => item.name !== tag.name)
                  onChange?.(tags.map((item) => ({id:item.id, name: item.name})));
                  return tags;
                });
                
                setInputValue("");
              }}
              tags={selectedTags}
            />
          </CommanCustomInput>
          {/* <CommandPrimitive.Input /> */}
          <CommandEmpty>
            {
              tags.length == 0 && !inputValue ? (
                <Text className="text-center">No tags</Text>
              ) : (
                <div onClick={() => {


                  createTag(inputValue).then(() => {
                    fetchTags?.()
                  })
                }} className="flex items-center bg-muted mx-2 px-2 py-1 gap-x-2 cursor-pointer">
                  <p>Create</p>
                  <ToggleOne name={inputValue} />
                </div>
              )
            }
          </CommandEmpty>
          <CommandGroup>
            {tags.map((tag) => (
              <CommandItem
                key={tag.id}
                value={tag.name}
                onSelect={(currentValue) => {
                  setSelectedTags((prev) => {
                    const flag = prev.some(
                      (item) => item.name === currentValue
                    );
                    if (flag) {
                      const tags = prev.filter(
                        (item) => item.name !== currentValue
                      );
                      onChange?.(
                        tags.map((item) => ({id:item.id, name: item.name}))
                      );
                      return tags;
                    }
                    onChange?.([...prev, tag].map((item) => ({id:item.id, name: item.name})));
                    return [...prev, tag];
                  });
                  inputRef.current?.focus();
                }}
                className="justify-between px-4"
              >
                <ToggleOne name={tag.name} />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="h-6 w-6" size="icon">
                      <Cross2Icon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This operation is irreversible, and all the related tags will be deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={(e) => {
                        e.stopPropagation()
                        toast.promise(deleteTag(tag.id), {
                          loading: 'Deleting tag...',
                          success: () => {
                            setSelectedTags((prev) => {
                              return prev.filter((item) => item.name !== tag.name);
                            })
                            fetchTags?.()
                            return 'Tag deleted'
                          },
                          error: 'Error deleting tag'
                        })
                      }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
