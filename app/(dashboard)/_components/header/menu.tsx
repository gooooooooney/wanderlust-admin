"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/use-sidebar"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

export const Menu = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar(state => state)
  return (
    <div className="flex flex-1">
      <div className="hidden lg:flex lg:gap-x-12">
        <Button onClick={() => {
          if (collapsed) {
            onExpand()
          } else {
            onCollapse()
          }
        }} variant="ghost" size="icon">
          <HamburgerMenuIcon className={cn("transition-all h-6 w-6",
            {
              "rotate-0 ": collapsed,
              "rotate-180 ": !collapsed,
            }
          )} />
        </Button>
      </div>
    </div>
  )
}