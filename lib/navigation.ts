import { LayoutDashboardIcon, LucideIcon, SettingsIcon, UserIcon } from "lucide-react"

export type Navigation = {
  name: string
  href: string
  color: string,
  icon: LucideIcon
  current?: boolean
  children?: Navigation[]
}

export const navigation: Navigation[] = [
  {
    color: "text-pink-300",
    name: 'Dashboard',
    href: "/",
    icon: LayoutDashboardIcon,
  },
  {
    color: "text-red-300",
    name: 'Users',
    href: "/users",
    icon: UserIcon,
  },
  {
    color: "text-green-300",
    name: 'Setting',
    href: "/settings",
    icon: SettingsIcon,
  },
]