import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SignUpForm } from "./_components/signin-form";

const SignUpPage: React.FC = () => {
  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 ">
          <div>
            <img
              className="h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up for an account
            </h2>
          </div>
          <div className="mt-10">
            <div>
              <SignUpForm />
            </div>
            {/* <div className="mt-10">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full">
                  <FcGoogle className={cn("h-4 w-4 mr-2", {})} />
                  Sign in with Google
                </Button>
              </div>
              
            </div> */}
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          fill
          className="absolute inset-0 h-full w-full object-cover object-top"
          src="/img/seaside.jpeg"
          alt=""
        />
      </div>
      {/* <div className="flex flex-col gap-y-4 bg-background p-4 rounded-md shadow-md">
        <h1 className="text-2xl text-center font-semibold my-2">Sign in</h1>
        <SignInForm />
        <Divider text="or" />

        <Button>
          <FcGoogle className={cn("h-4 w-4 mr-2", {})} />
          Sign in with Google
        </Button>
      </div> */}
    </div>
  );
};

export default SignUpPage;
