
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { signOut } from "@/next-auth"
import { ExitIcon } from "@radix-ui/react-icons"
// import { SettingModal } from "./settings-modal"
import { UserAvatar } from "@/components/user-avatar"
import { AuthService } from "@/services/auth.service"
import { SettingModal } from "./setting-modal"
import { SheetDemo } from "./sheet"

export const UserButton = async ({ props }: any) => {

  const user = await AuthService.getSelf()

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar username={user.name!} size="md" imageSrc={user.image!} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        {/* <SettingModal initialImage={user.image} initialUsername={user.name} /> */}
        {/* <SheetDemo /> */}
        <DropdownMenuSeparator />
        <form action={async () => {
          "use server";
          await signOut({
            redirectTo: "/sign-in",
          })
        }}>
          <Button size="sm" variant="ghost" className="w-full justify-start">
            <ExitIcon className="mr-2" />
            Logout
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}