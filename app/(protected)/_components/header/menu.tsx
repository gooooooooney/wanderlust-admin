"use client"
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/use-sidebar"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useMediaQuery } from "usehooks-ts"
import { MobileSidebar } from "../sidebar/mobile-sidebar"

export const Menu = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar(state => state)
  const matches = useMediaQuery("(max-width: 1024px)");
  return (
    <div className=" flex flex-1">
      <div className=" lg:flex lg:gap-x-12">
        {
          matches ? (
            <MobileSidebar>
              <Button variant="ghost" size="icon">
                {/* <Hint label={
              collapsed ? "Expand" : "Collapse"          
            }> */}
                <HamburgerMenuIcon className={cn("transition-all h-6 w-6",
                  {
                    "rotate-0 ": collapsed,
                    "rotate-180 ": !collapsed,
                  }
                )} />
                {/* </Hint> */}
              </Button>
            </MobileSidebar>
          ) : <Button onClick={() => {
            if (collapsed) {
              onExpand()
            } else {
              onCollapse()
            }
          }} variant="ghost" size="icon">
            {/* <Hint label={
              collapsed ? "Expand" : "Collapse"          
            }> */}
            <HamburgerMenuIcon className={cn("transition-all h-6 w-6",
              {
                "rotate-0 ": collapsed,
                "rotate-180 ": !collapsed,
              }
            )} />
            {/* </Hint> */}
          </Button>
        }

      </div>
    </div>
  )
}