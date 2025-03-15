import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/layouts/Tanstack/QueryProvider";
import {
  ClerkLoaded,

  ClerkProvider,
  GoogleOneTap,
} from "@clerk/nextjs";
import Navbar from "@/components/UI/Navbar/Navbar";

import { pageConfig } from "@/helpers/constants/pageConfig";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "True Sight",
  description: "Your premium business application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider  dynamic afterSignOutUrl={pageConfig.signInPage}>
      <html lang="en" className="h-full">
        <body
          className={`${notoSans.variable} flex h-screen flex-col bg-neutral-50 text-neutral-950 antialiased dark:bg-neutral-950 dark:text-neutral-50`}
        >
          
          <ClerkLoaded>
            <QueryProvider>
              <Navbar>{children}</Navbar>
              <GoogleOneTap cancelOnTapOutside />
            </QueryProvider>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
