import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";
// import { SettingModal } from "./settings-modal"
import { UserAvatar } from "@/components/user-avatar";
import { AuthService } from "@/services/auth.service";
import { LogoutButton } from "@/components/auth/logout-button";

export const UserButton = async ({ props }: any) => {
  const user = await AuthService.getSelf();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar username={user.name!} size="md" imageSrc={user.image!} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>{user.name}: {user.role}</DropdownMenuLabel>
        {/* <SettingModal initialImage={user.image} initialUsername={user.name} /> */}
        {/* <SheetDemo /> */}
        <DropdownMenuSeparator />

        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
