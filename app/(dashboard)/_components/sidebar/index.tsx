"use client"
import { cn } from "@/lib/utils"
import {
  HammerIcon,
  SettingsIcon,
  Wallet2Icon
} from "lucide-react"
import { Menu, NavigationProps } from "./menu"
import { useSidebar } from "@/store/use-sidebar"


const navigation: NavigationProps[] = [
  { color: "text-pink-300", name: 'Dashboard', href: '#', icon: SettingsIcon, current: false },
  {
    color: "text-red-300", name: 'Dashboard1', href: '#', icon: HammerIcon, current: true, children: [
      {
        color: "text-green-300", name: 'Dashboard1-1', href: '#', icon: Wallet2Icon, current: false, children: [
          {
            color: "text-yellow-300", name: 'Dashboard1-1-1', href: '#', icon: Wallet2Icon, current: false, children: [
              { color: "text-gray-300", name: 'Dashboard1-1-1-1', href: '#', icon: Wallet2Icon, current: false },
              { color: "text-violet-300", name: 'Dashboard1-1-1-2', href: '#', icon: Wallet2Icon, current: false },
              { color: "text-origan-300", name: 'Dashboard1-1-1-3', href: '#', icon: Wallet2Icon, current: false },
            ]
          },
          { color: "text-blue-300", name: 'Dashboard1-1-2', href: '#', icon: Wallet2Icon, current: false },
          { color: "text-yellow-200", name: 'Dashboard1-1-3', href: '#', icon: Wallet2Icon, current: false },
        ]
      },
      { color: "text-pink-200", name: 'Dashboard1-2', href: '#', icon: Wallet2Icon, current: false },
      { color: "text-green-500", name: 'Dashboard1-3', href: '#', icon: Wallet2Icon, current: false },


    ]
  }
]


export default function Sidebar() {
  const collapsed = useSidebar(s => s.collapsed)
  return (
    <div className={cn("flex max-w-64  flex-col duration-500  pt-10 overflow-y-auto  bg-background shadow-xl", collapsed ? "w-20" : "w-72")}>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <Menu navigation={navigation} />
          </li>
        </ul>
      </nav>
    </div>
  )
}
