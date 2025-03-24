import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/layouts/Tanstack/QueryProvider";
import { ClerkLoaded, ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import Navbar from "@/components/UI/Navbar/Navbar";
import { pageConfig } from "@/helpers/constants/pageConfig";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";

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
    <ClerkProvider touchSession={false} afterSignOutUrl={pageConfig.signIn}>
      <html lang="en" className="h-full">
        <body className={`${notoSans.variable} flex h-screen flex-col`}>
          <NextTopLoader color="#2299DD" showSpinner={false} height={3} />
          <ClerkLoaded>
            <QueryProvider>
              <Navbar>{children}</Navbar>
              <Toaster richColors />
              <GoogleOneTap cancelOnTapOutside />
              <SpeedInsights />
            </QueryProvider>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
