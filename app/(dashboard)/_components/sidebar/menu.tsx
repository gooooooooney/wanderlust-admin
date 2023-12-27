"use client"
import { usePathname } from "next/navigation"
import { MenuItem } from "./menuItem"
import type { LucideIcon } from "lucide-react"
import { Navigation, navigation } from "@/lib/navigation"



export const Menu = () => {
  const pathname = usePathname()

  return (
    <ul role="list" className=" space-y-1 ">
      {navigation.map((item) => (
        <MenuItem pathname={pathname} key={item.name} item={item} />
      ))}
    </ul>
  )
}