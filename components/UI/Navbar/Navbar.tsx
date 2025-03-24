"use client";
import { INavbar } from "@/helpers/constants/interfaces/components";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { LogIn, Menu, X, Languages, Home, Gamepad2, Info } from "lucide-react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { pageConfig } from "@/helpers/constants/pageConfig";
import BorderFigure from "../figures/border";
import RatingDropdown from "../RatingDropdown/RatingDropdown";

export default function Navbar({ children }: INavbar) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        href: "/tier-list",
        name: "Tier List",
        active: pathname === "/tier-list",
        icon: <Home size={48} />,
      },
      {
        href: "/champions",
        name: "Champions",
        active: pathname === "/champions",
        icon: <Gamepad2 size={48} />,
      },
      {
        href: "/items",
        name: "Items",
        active: pathname === "/items",
        icon: <Info size={48} />,
      },
    ],
    [pathname],
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? "hidden" : "auto";
  };

  // Mock data for the second subsection
  const [activeRole, setActiveRole] = useState("All");

  const rolesIco = [
    { name: "All", icon: "/icons/roles/allGold.webp" },
    { name: "Top", icon: "/icons/roles/topGold.webp" },
    { name: "Jungle", icon: "/icons/roles/jungleGold.webp" },
    { name: "Mid", icon: "/icons/roles/midGold.webp" },
    { name: "ADC", icon: "/icons/roles/adcGold.webp" },
    { name: "Support", icon: "/icons/roles/supGold.webp" },
  ];
  const [activeRegion, setActiveRegion] = useState("EU");
  const regions = ["EU", "NA", "KR", "CN"];
  const [selectedRating, setSelectedRating] = useState("Diamond");

  const handleRatingChange = (rating: string) => {
    setSelectedRating(rating);
    // Here you can add additional logic if needed when rating changes
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <nav className="bg-opacity-90 relative z-30 flex flex-col bg-neutral-200 shadow-sm">
        {/* Main navbar */}
        <Image
          src="/img/sprite/champion1.webp"
          alt="posterAuthBg"
          width={48}
          height={48}
          className="absolute inset-0 z-[-1] h-full w-full object-cover opacity-15 blur-[20px]"
        />
        <div className="flex h-14 w-full items-center justify-between px-4 py-3">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            {/* Desktop Logo and Links */}
            <div className="hidden gap-2 md:flex md:items-center">
              <Link href="/" className="group flex items-center">
                <div className="relative flex h-full items-center justify-center gap-2 overflow-hidden rounded-sm transition-transform duration-200 group-hover:opacity-90">
                  <Image
                    src="/icons/logo3.png"
                    alt="True Sight Logo"
                    width={40}
                    height={40}
                    className="aspect-square object-contain invert-100"
                    priority
                  />
                  {/* <span className="text-[22px] font-semibold tracking-tight text-neutral-800 uppercase">
                    trueSight
                  </span> */}
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
              <div className="relative overflow-hidden rounded-sm">
                <Image
                  src="/icons/logo3.png"
                  alt="True Sight Logo"
                  width={40}
                  height={40}
                  className="aspect-square object-cover invert-100"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Right side - Search and Login */}
          <div className="flex h-full items-center gap-4">
            <form className="hidden h-full items-center gap-2 rounded-sm border border-neutral-400/30 px-2 text-neutral-600 hover:cursor-text md:flex">
              <div className="text-neutral-500">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="#Tag, Champions, Teams."
                className="h-full w-full rounded-sm bg-transparent text-sm transition-all outline-none"
              />
            </form>
            <div className="hidden items-center gap-2 *:h-full *:w-full *:rounded-sm *:p-2 *:transition *:hover:bg-neutral-400/30 *:active:scale-90 md:flex">
              <button>
                <Languages size={16} className="" />
              </button>
            </div>

            {/* Desktop login button */}
            <SignedIn>
              <Link
                href={pageConfig.profile}
                className="hidden overflow-hidden rounded-full transition hover:opacity-90 md:block"
              >
                <Image
                  alt="userLogo"
                  src="/img/champion/Aatrox_0.jpg"
                  width={32}
                  height={32}
                  className="aspect-square rounded-full border-2 border-neutral-300 object-cover"
                />
              </Link>
            </SignedIn>

            <SignedOut>
              <Link
                prefetch
                href={pageConfig.signIn}
                className="relative hidden h-full items-center justify-center rounded-sm bg-neutral-800 px-6 text-xs font-medium text-nowrap text-neutral-200 shadow-sm transition-all hover:bg-neutral-700 md:flex"
              >
                <BorderFigure />
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

        {/* Second section - roles, region, rating */}
        <div
          className={`${pathname === pageConfig.signIn || pathname === pageConfig.signUp ? "!hidden" : ""} hidden w-full border-t border-neutral-400/20 bg-neutral-200/50 px-4 py-2 md:flex md:items-center md:justify-between`}
        >
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-neutral-500">
                Roles:
              </span>
              <div className="flex gap-2">
                {rolesIco.map((role) => (
                  <div
                    onClick={() => setActiveRole(role.name)}
                    key={role.name}
                    className={`${activeRole === role.name ? "scale-110 bg-neutral-800" : "hover:scale-105 hover:bg-neutral-200 active:scale-95"} group relative rounded-xs transition`}
                  >
                    <Image
                      src={role.icon}
                      alt={role.name}
                      width={26}
                      height={26}
                      className="aspect-square transition"
                    />
                    <div className="absolute top-[calc(100%+5px)] left-1/2 hidden -translate-x-1/2 bg-neutral-200/30 px-2 py-1 group-hover:block">
                      <p className="text-xs text-neutral-700">{role.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-neutral-500">
                Region:
              </span>
              <div className="flex space-x-1">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`${activeRegion === region ? "bg-neutral-300 text-neutral-900" : ""} rounded-sm bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-600 hover:bg-neutral-300`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-neutral-500">
                Rating:
              </span>
              <RatingDropdown
                initialRating={selectedRating}
                onChange={handleRatingChange}
              />
            </div>
          </div>
        </div>

        {/* Third section - current page icon */}
        {/* <div
          className={`${pathname === pageConfig.signIn || pathname === pageConfig.signUp ? "!hidden" : ""} group hidden w-full border-t border-neutral-400/20 px-4 py-4 md:flex md:items-center`}
        >
          <div className="flex items-center gap-4 px-24">
            <div className="flex h-24 w-24 items-center justify-center rounded-sm bg-neutral-200/50 transition-transform duration-300 group-hover:scale-105">
              {getCurrentRoute().icon}
            </div>
            <span className="text-3xl font-bold text-neutral-700 transition-transform duration-300 group-hover:translate-x-1.5">
              {getCurrentRoute().name}
            </span>
          </div>
        </div> */}

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
                      src="/icon/posterAuthBg.webp"
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
                      <div className="flex items-center space-x-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-neutral-200">
                          {route.icon}
                        </div>
                        <span>{route.name}</span>
                      </div>
                    </MobileNavLink>
                  ))}
                </div>

                {/* Mobile roles, region, rating sections */}
                <div className="mt-6 border-t border-neutral-200 pt-6">
                  <h3 className="mb-3 text-sm font-semibold text-neutral-700">
                    Roles
                  </h3>
                  <div className="flex flex-wrap gap-2"></div>
                </div>

                <div className="mt-4">
                  <h3 className="mb-3 text-sm font-semibold text-neutral-700">
                    Region
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((region) => (
                      <button
                        key={region}
                        className="rounded-sm bg-neutral-200 px-3 py-1 text-sm text-neutral-600 hover:bg-neutral-300"
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="mb-3 text-sm font-semibold text-neutral-700">
                    Rating
                  </h3>
                  <RatingDropdown
                    initialRating={selectedRating}
                    onChange={handleRatingChange}
                  />
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

      <main className="w-full flex-1 bg-neutral-50 text-neutral-950 antialiased dark:bg-neutral-950 dark:text-neutral-50">
        {children}
      </main>
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
      className={`relative rounded-sm px-2 py-1.5 text-sm font-medium text-neutral-600 transition-colors duration-300 hover:text-neutral-800 ${
        active ? "bg-neutral-400/30 text-neutral-900" : ""
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
