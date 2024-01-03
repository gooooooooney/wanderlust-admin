"use client"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Text } from "@/components/typography/text"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSidebar } from "@/store/use-sidebar"
import { use, useEffect, useState } from "react"
import { Navigation } from "@/lib/navigation"
import { Hint } from "@/components/hint"
import { useMediaQuery } from "usehooks-ts"


export const MenuItem = ({ item, pathname }: { pathname: string, item: Navigation }) => {
  const collapsed = useSidebar(s => s.collapsed)
  const [value, setValue] = useState("")
  const matches = useMediaQuery("(max-width: 1024px)");
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
            item.href == pathname && "bg-muted ",
            'group relative flex h-12 justify-between px-4 py-2 mx-2.5 text-base duration-200 hover:bg-muted hover:no-underline rounded-md'
          )}>
            <Hint asChild side="right" className={!collapsed ? "hidden" : ""} label={item.name}>
              <item.icon
                className={cn(
                  'h-6 w-6 shrink-0 !rotate-0',

                )}
                style={{
                  color: item.color
                }}
                aria-hidden="true"
              />
            </Hint>
            {

              <Text className={cn("absolute left-12 duration-200 ",
                !matches && collapsed && " opacity-0 transition-all duration-300"
              )}>
                {item.name}
              </Text>

            }
          </AccordionTrigger>

          <AccordionContent className="ml-4 pb-0">
            <ul role="list" className="mt-1 space-y-1">
              {item.children.map((child) => (
                <MenuItem pathname={pathname} key={child.name} item={child} />
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion >
    ) : (
      <li key={item.name}>

        <Button variant="ghost"
          asChild
          className={cn(
            "group relative flex h-12 justify-between px-4 py-4 mx-2.5 text-base duration-200 hover:bg-muted hover:no-underline rounded-md",
            item.href == pathname && "bg-muted",
          )}>
          <Link
            href={item.href}
          >
            <Hint asChild side="right" className={!collapsed ? "hidden" : ""} label={item.name}>
              <item.icon
                className={cn(
                  'h-6 w-6 shrink-0 !rotate-0',
                )}
                style={{
                  color: item.color
                }}
                aria-hidden="true"
              />
            </Hint>
            <Text className={cn("absolute left-12 duration-200 ",
              !matches && collapsed && " opacity-0 transition-all duration-300"
            )}>
              {item.name}
            </Text>

          </Link>
        </Button>

      </li>
    )
  )
}