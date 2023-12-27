import { AuthService } from "@/services/auth.service";
import { SettingUserInfo } from "./_components/userinfo";
import { SettingSignIn } from "./_components/sign-in";
import { SettingService } from "@/services/setting.service";
import { Description, H3 } from "@/components/typography/text";
import { Separator } from "@/components/ui/separator";

export default async function SettingsPage() {
  const user = await AuthService.getSelf()
  const settings = await SettingService.getSetting()

  if (!user) return null
  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <H3>Setting</H3>
        <Description >
          Manage your Wanderlust account settings.
        </Description>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <div className="flex flex-col gap-y-4 sm:grid sm:grid-cols-2 ">
        <SettingUserInfo initialImage={user.image} initialUsername={user.name} />
        <SettingSignIn initialSignInImage={settings?.signInCoverImage} />
      </div>
    </div>
  );
}