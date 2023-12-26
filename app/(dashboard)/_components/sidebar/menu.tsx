import { MenuItem } from "./menuItem"
import type { LucideIcon } from "lucide-react"

export type NavigationProps = {
  name: string
  href: string
  color: string,
  icon: LucideIcon
  current?: boolean
  children?: NavigationProps[]
}

export const Menu = ({navigation}: {navigation: NavigationProps[]}) => {
  return (
    <ul role="list" className="-mx-2 space-y-1 px-6">
      {navigation.map((item) => (
        <MenuItem key={item.name} item={item} />
      ))}
    </ul>
  )
}