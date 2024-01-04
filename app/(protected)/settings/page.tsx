import { AuthService } from "@/services/auth.service";
import { SettingUserInfo } from "./_components/userinfo";
import { SettingSignIn } from "./_components/sign-in";
import { SettingService } from "@/services/setting.service";
import { Heading } from "@/components/heading";

export default async function SettingsPage() {
  const user = await AuthService.getSelf()
  const settings = await SettingService.getSetting()

  if (!user) return null
  return (
    <div>
      <Heading title="Settings" description="Manage your account settings." />
     
      <div className="flex flex-col gap-y-4">
        <SettingUserInfo initialImage={user.image} initialUsername={user.name} initialDescription={user.description} />
        <SettingSignIn initialSignInImage={settings?.signInCoverImage} />
      </div>
    </div>
  );
}