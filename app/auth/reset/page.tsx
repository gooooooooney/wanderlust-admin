import { Button } from "@/components/ui/button";

import { Description, Text } from "@/components/typography/text";

import Image from "next/image";
import { SettingService } from "@/services/setting.service";
import { RestForm } from "./_components/resetForm";
import Link from "next/link";
import { Logo } from "@/components/logo";

const SignInPage: React.FC = async () => {
  const setting = await SettingService.getSetting();
  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 ">
          <div>
            <Logo size="lg" />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight ">
              Reset
            </h2>
            <Description>Forget your password?</Description>
          </div>
          <div className="mt-10">
            <div>
              <RestForm />
            </div>
            <Text className="text-center text-sm mt-4">
              <Button variant="link">
                <Link href="/auth/login">Back to login</Link>
              </Button>
            </Text>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          fill
          className="absolute inset-0 h-full w-full object-cover object-top animate-vertical-move"
          src={setting?.signInCoverImage || "https://pic.imgdb.cn/item/6593a1f0c458853aef2954ea.jpg"}
          alt=""
        />
      </div>
    </div>
  );
};

export default SignInPage;
