import { Heading } from "@/components/heading";
import { SettingBanner } from "./_components/banner";
import { AuthService } from "@/services/auth.service";

const ProjectPage = async () => {
  const user = await AuthService.getSelf()
  if (!user) return null
  return (
    <div>
      <Heading title="Project" description=" this is your project" />
      <SettingBanner initialBanners={user.pageInfo?.banner} />
    </div>
  );
};

export default ProjectPage;
