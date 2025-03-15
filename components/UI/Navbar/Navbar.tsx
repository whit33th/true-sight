"use client";
import { INavbar } from "@/helpers/constants/interfaces/components";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { LogIn, Menu, X, UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { pageConfig } from "@/helpers/constants/pageConfig";

export default function Navbar({ children }: INavbar) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        href: "/dashboard",
        name: "Dashboard",
        active: pathname === "/dashboard",
      },
      { href: "/explore", name: "Explore", active: pathname === "/explore" },
      { href: "/about", name: "About", active: pathname === "/about" },
    ],
    [pathname],
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? "hidden" : "auto";
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <nav className="bg-opacity-90 relative z-30 flex h-14 bg-neutral-200 shadow-sm backdrop-blur-sm">
        <div className="flex w-full items-center justify-between px-4 py-3">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            {/* Desktop Logo and Links */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link
                href="/"
                className="group mr-10 flex items-center space-x-3"
              >
                <div className="relative h-9 w-9 overflow-hidden rounded-sm transition-transform duration-200 group-hover:opacity-90">
                  <Image
                    src="/img/posterAuthBg.webp"
                    alt="True Sight Logo"
                    width={36}
                    height={36}
                    className="aspect-square object-cover"
                    priority
                  />
                </div>
              </Link>

              <div className="flex items-center space-x-2">
                {routes.map((route) => (
                  <NavLink
                    href={route.href}
                    key={route.name}
                    active={route.active}
                  >
                    {route.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Mobile hamburger button */}
            <button
              className="rounded-sm p-2 text-neutral-700 hover:bg-neutral-200 md:hidden"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Mobile center logo */}
          <div className="flex justify-center md:hidden">
            <Link href="/" className="flex items-center">
              <div className="relative h-8 w-8 overflow-hidden rounded-sm">
                <Image
                  src="/img/posterAuthBg.webp"
                  alt="True Sight Logo"
                  width={32}
                  height={32}
                  className="aspect-square object-cover"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Right side - Search and Login */}
          <div className="flex h-full items-center space-x-4">
            <div className="relative hidden h-full w-full md:block">
              <input
                type="text"
                placeholder="Search..."
                className="h-full w-full rounded-sm border border-neutral-300 bg-neutral-100 px-4 pr-10 text-sm text-neutral-700 transition-all outline-none focus:border-neutral-400"
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500">
                <SearchIcon />
              </div>
            </div>

            {/* Desktop login button */}
            <SignedIn>
              <Link
                href={pageConfig.signInPage}
                className="hidden h-full items-center justify-center rounded-sm bg-neutral-800 px-6 text-xs font-medium text-nowrap text-white shadow-sm transition-all hover:bg-neutral-700 md:flex"
              >
                <UserPlus size={18} />
              </Link>
            </SignedIn>

            <SignedOut>
              <Link
                href="/dashboard"
                className="hidden h-full items-center justify-center rounded-sm bg-neutral-800 px-6 text-xs font-medium text-nowrap text-white shadow-sm transition-all hover:bg-neutral-700 md:flex"
              >
                Log in
              </Link>
            </SignedOut>

            {/* Mobile login icon */}
            <button
              className="rounded-sm p-2 text-neutral-700 hover:bg-neutral-200 md:hidden"
              aria-label="Login"
            >
              <LogIn size={20} />
            </button>
          </div>
        </div>

        {/* Mobile full-height menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex flex-col bg-neutral-100 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex items-center justify-between border-b border-neutral-200 p-4">
                <Link
                  href="/"
                  className="flex items-center space-x-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="relative h-8 w-8 overflow-hidden rounded-sm">
                    <Image
                      src="/img/posterAuthBg.webp"
                      alt="True Sight Logo"
                      width={32}
                      height={32}
                      className="aspect-square object-cover"
                      priority
                    />
                  </div>
                  <span className="text-base font-medium tracking-wide text-neutral-800">
                    TRUE SIGHT
                  </span>
                </Link>
                <button
                  className="rounded-sm p-2 text-neutral-700 hover:bg-neutral-200"
                  onClick={toggleMobileMenu}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="relative mb-8">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="h-11 w-full rounded-sm border border-neutral-300 bg-white/80 px-4 pr-10 text-sm text-neutral-700 outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-400"
                  />
                  <div className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500">
                    <SearchIcon />
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  {routes.map((route) => (
                    <MobileNavLink
                      href={route.href}
                      key={route.name}
                      active={pathname === route.href}
                    >
                      {route.name}
                    </MobileNavLink>
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-200 p-6">
                <button className="w-full rounded-sm bg-neutral-800 py-3 text-center font-medium text-white transition-colors hover:bg-neutral-700">
                  Login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="w-full flex-1">{children}</main>
    </div>
  );
}

function NavLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative rounded-xs px-2 py-1.5 text-sm font-medium text-neutral-600 transition-colors duration-200 ${
        active ? "border border-neutral-300 bg-neutral-300" : ""
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative block px-3 py-4 text-base transition-colors duration-200 ${
        active
          ? "bg-neutral-200 font-medium text-neutral-800"
          : "text-neutral-600 hover:bg-neutral-200/70 hover:text-neutral-800"
      }`}
    >
      {children}
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}
