import React from "react";
import Link from "next/link";
import SignUpComponent from "@/components/containers/auth/signUpComponent";
import { LogIn, UserPlus } from "lucide-react";
import { pageConfig } from "@/helpers/constants/pageConfig";

export default function SignUpPage() {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="relative flex w-full max-w-lg flex-col gap-6 bg-neutral-100 p-12 shadow-xl">
        <div className="grid w-full grid-cols-2 gap-2">
          <Link
            href={pageConfig.signIn}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-3 font-medium text-neutral-950 transition-colors hover:bg-neutral-200"
          >
            <LogIn size={18} />
            Login
          </Link>
          <div className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-neutral-800 py-3 font-medium text-neutral-50">
            <UserPlus size={18} />
            Register
          </div>
        </div>

        <SignUpComponent />
      </div>
    </div>
  );
}
