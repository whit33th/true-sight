import TiltedBackground from "@/components/UI/backgrounds/TiltedBackground";

import React from "react";
import { pageConfig } from "@/helpers/constants/pageConfig";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await auth();
  if (user.userId) {
    redirect(pageConfig.home);
  }
  return (
    <>
      <TiltedBackground />
      {children}
    </>
  );
}
