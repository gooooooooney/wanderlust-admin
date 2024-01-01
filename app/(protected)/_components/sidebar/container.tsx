"use client"
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

export const Container = ({ children }: React.PropsWithChildren<{}>) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const pathname = usePathname()
  const {
    collapsed,
    onCollapse,
    onExpand,
  } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand, pathname]);
  return (
    <div className={cn("hidden sm:flex max-w-64  flex-col duration-500  pt-10 overflow-y-auto  bg-background ", collapsed ? "w-20" : "w-72")}>
      {children}
    </div>
  )
}