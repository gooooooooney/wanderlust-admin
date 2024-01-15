import { Button } from "@/components/ui/button";
import NextImage from 'next/image'

import { SignInForm } from "./_components/signin-form";
import { SettingService } from "@/services/setting.service";
import { Text } from "@/components/typography/text";
import Link from "next/link";
import { Social } from "@/components/auth/social";
import { Logo } from "@/components/logo";

const SignInPage: React.FC = async () => {
  const setting = await SettingService.getSetting();
  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 ">
          <div>
            <Logo size="lg" />
            <h2 className="mt-8 text-xl font-bold leading-9 tracking-tight ">
              Welcome back
            </h2>
          </div>
          <div className="mt-10">
            <div>
              <SignInForm />
            </div>
            <div className="mt-10">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-background px-6 ">
                    Or continue with
                  </span>
                </div>
              </div>

              <Social />

              <Text className="text-center mt-4">
                <Button variant="link" size="sm">
                  <Link href="/auth/register">{"Don't"} have an account ?</Link>
                </Button>
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <NextImage
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
