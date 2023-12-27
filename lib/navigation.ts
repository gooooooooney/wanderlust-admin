import {
  LayoutDashboardIcon,
  LucideIcon,
  SettingsIcon,
  FolderKanbanIcon,
  LayoutTemplateIcon,
  RocketIcon,
  UserIcon,
  BookOpenTextIcon,
} from "lucide-react";

export type Navigation = {
  name: string;
  href: string;
  color: string;
  icon: LucideIcon;
  current?: boolean;
  children?: Navigation[];
};

const tailwindColors = [
  'text-red-500',
  'text-green-500',
  'text-blue-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-indigo-500',
  'text-teal-500',
  'text-orange-500',
  'text-gray-500',
  'text-red-700',
  'text-green-700',
  'text-blue-700',
  'text-yellow-700',
  'text-purple-700',
  'text-pink-700',
  'text-indigo-700',
  'text-teal-700',
  'text-orange-700',
  'text-gray-700'
];

const randomColor = () => {
  return tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
}


export const navigation: Navigation[] = [
  {
    color: randomColor(),
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboardIcon,
  },
  {
    color: randomColor(),
    name: "Users",
    href: "/users",
    icon: UserIcon,
  },
  {
    color: randomColor(),
    name: "Setting",
    href: "/settings",
    icon: SettingsIcon,
  },
  {
    color: randomColor(),
    name: "Console",
    href: "/console",
    icon: LayoutTemplateIcon,
    children: [
      {
        color: randomColor(),
        name: "Story",
        href: "/console/story",
        icon: BookOpenTextIcon,
      },
      {
        color: randomColor(),
        name: "Introduction",
        href: "/console/introduction",
        icon: RocketIcon,
      },
      {
        color: randomColor(),
        name: "Project",
        href: "/console/project",
        icon: FolderKanbanIcon,
      },
    ],
  },
];
