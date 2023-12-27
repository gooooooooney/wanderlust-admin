import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { SettingService } from "@/services/setting.service";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wanderlust Admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  SettingService.initDefaultSetting()
  return (
    <html className="h-full" lang="en" suppressHydrationWarning >
      <body className={cn(inter.className, 
      "h-full"
        // "bg-[#FAF0E4] dark:bg-[#3F2E3E]"
        )}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
