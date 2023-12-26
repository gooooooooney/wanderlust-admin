"use client"
import { cn } from "@/lib/utils"
import { NavigationProps } from "./menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Text } from "@/components/catalyst/text"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSidebar } from "@/store/use-sidebar"
import { use, useEffect, useState } from "react"


export const MenuItem = ({ item }: { item: NavigationProps }) => {
  const collapsed = useSidebar(s => s.collapsed)
  const [value, setValue] = useState("")
  const [lastOpenItem, setLastOpenItem] = useState("");
  useEffect(() => {
    if (collapsed) {
      setValue("")
      setLastOpenItem(value)
    } else {
      setValue(lastOpenItem)
    }
  }, [collapsed])
  return (
    item.children ? (
      <Accordion
        type="single"
        collapsible
        value={value}
        onValueChange={setValue}
      >
        <AccordionItem className="border-none" value={item.name}>
          <AccordionTrigger showChevron={!collapsed} className={cn(
            item.current && "bg-muted ",
            'group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline rounded-md'
          )}>
            <item.icon
              className={cn(
                'h-6 w-6 shrink-0 !rotate-0',
                item.color
              )}
              aria-hidden="true"
            />
            {

              <Text className={cn("absolute left-12 duration-200 ",
                collapsed && " opacity-0 transition-all duration-300"
              )}>
                {item.name}
              </Text>

            }
          </AccordionTrigger>
          <AccordionContent className="ml-4 pb-0">
            <ul role="list" className="mt-1 space-y-1">
              {item.children.map((child) => (
                <MenuItem key={child.name} item={child} />
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ) : (
      <li key={item.name}>
        <Button variant="ghost" asChild>
          <Link
            href={item.href}
            className={cn(
              item.current && "bg-muted",
              'group relative flex !h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline w-full',

            )}
          >
            <item.icon
              className={cn(
                'h-6 w-6 shrink-0 !rotate-0',
                item.color
              )}
              aria-hidden="true"
            />
            <Text className={cn("absolute left-12 duration-200 ",
              collapsed && " opacity-0 transition-all duration-300"
            )}>
              {item.name}
            </Text>

          </Link>
        </Button>

      </li>
    )
  )
}