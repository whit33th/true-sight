"use client";
import React from "react";
import { useForm } from "react-hook-form";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { Lock, AtSign } from "lucide-react";
import Loader from "@/components/UI/loaders/loader";


type FormValues = {
  emailAddress: string;
  password: string;
};

export default function SignUpComponent() {
  const {
    register,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  return (
    <>
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <SignUp.Step name="start" className="flex flex-col gap-6">
              <Clerk.Field
                name="emailAddress"
                className="flex flex-col gap-1.5"
              >
                <Clerk.Label className="text-sm font-medium text-gray-700">
                  Email
                </Clerk.Label>
                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
                    <AtSign size={18} />
                  </span>
                  <Clerk.Input
                    disabled={isGlobalLoading}
                    placeholder="user@mail.com"
                    className="w-full rounded-md border border-gray-300 py-2.5 pr-4 pl-10 transition-all duration-300 outline-none focus:bg-neutral-200 focus:ring focus:ring-neutral-500"
                    {...register("emailAddress", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                <Clerk.FieldError className="text-sm text-red-600" />
              </Clerk.Field>

              <Clerk.Field name="password" className="flex flex-col gap-1.5">
                <Clerk.Label className="text-sm font-medium text-gray-700">
                  Password
                </Clerk.Label>
                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
                    <Lock size={18} />
                  </span>
                  <Clerk.Input
                    disabled={isGlobalLoading}
                    placeholder="********"
                    className="w-full rounded-md border border-gray-300 py-2.5 pr-4 pl-10 transition-all duration-300 outline-none focus:bg-neutral-200 focus:ring focus:ring-neutral-500"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                </div>
                <Clerk.FieldError className="text-sm text-red-600" />
              </Clerk.Field>

              <SignUp.Captcha />

              <SignUp.Action
                submit
                disabled={!isValid || isGlobalLoading}
                className={`clip-path-3 mt-2 flex w-full items-center justify-center rounded-md py-3 font-medium transition-colors ${
                  !isValid
                    ? "cursor-default bg-neutral-200 text-gray-400"
                    : "cursor-pointer bg-neutral-200 text-black"
                }`}
              >
                {isGlobalLoading ? <Loader /> : "Continue"}
              </SignUp.Action>

              <div className="flex gap-3 *:cursor-pointer">
                <Clerk.Connection
                  name="google"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Clerk.Loading scope="provider:google">
                    {(isLoading) => (isLoading ? <Loader /> : <Clerk.Icon />)}
                  </Clerk.Loading>
                </Clerk.Connection>

                <Clerk.Connection
                  name="facebook"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Clerk.Loading scope="provider:facebook">
                    {(isLoading) => (isLoading ? <Loader /> : <Clerk.Icon />)}
                  </Clerk.Loading>
                </Clerk.Connection>

                <Clerk.Connection
                  name="apple"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Clerk.Loading scope="provider:apple">
                    {(isLoading) => (isLoading ? <Loader /> : <Clerk.Icon />)}
                  </Clerk.Loading>
                </Clerk.Connection>
              </div>
            </SignUp.Step>
          )}
        </Clerk.Loading>

        <SignUp.Step name="verifications" className="flex flex-col gap-6">
          <h1 className="text-center text-xl font-semibold">
            Check your email for a code
          </h1>

          <Clerk.Field name="code" className="flex flex-col gap-1.5">
            <Clerk.Label className="text-sm font-medium text-gray-700">
              Email Verification Code
            </Clerk.Label>
            <div className="relative">
              <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
                <Lock size={18} />
              </span>
              <Clerk.Input className="w-full rounded-md border border-gray-300 py-2.5 pr-4 pl-10 transition-all duration-300 outline-none focus:bg-neutral-200 focus:ring focus:ring-neutral-500" />
            </div>
            <Clerk.FieldError className="text-sm text-red-600" />
          </Clerk.Field>

          <SignUp.Action
            submit
            className="clip-path-3 mt-2 w-full cursor-pointer rounded-md bg-neutral-200 py-3 font-medium text-black transition-colors"
          >
            Verify
          </SignUp.Action>
        </SignUp.Step>
      </SignUp.Root>
    </>
  );
}
